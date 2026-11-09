"use server";

import { z } from "zod";
import { prisma } from "@/lib/tenant-context";
import { getSession, setSessionCookie, SessionUser } from "@/lib/auth/session";
import { logAuditEvent } from "@/lib/auth/audit";
import { MembershipRole } from "@prisma/client";

// -----------------------------------------------------------------------------
// Schemas
// -----------------------------------------------------------------------------

const ClinicOnboardingSchema = z.object({
  name: z.string().min(2, "Clinic name must be at least 2 characters."),
  tagline: z.string().optional(),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number."),
  email: z.string().email("Please enter a valid clinic email.").optional().or(z.literal("")),
  address: z.string().min(5, "Please enter a valid address."),
  city: z.string().min(2, "City is required."),
  state: z.string().min(2, "State is required."),
  pincode: z.string().regex(/^\d{6}$/, "Please enter a valid 6-digit Indian PIN code."),
  timeZone: z.string().default("Asia/Kolkata"),
});

const DoctorProfileSchema = z.object({
  specialization: z.string().min(2, "Specialization is required."),
  qualification: z.string().optional(),
  registrationNumber: z.string().min(3, "Medical Council Registration Number is required."),
  consultationFee: z.number().min(0, "Fee cannot be negative."),
  slotDurationMinutes: z.number().min(5).max(120),
  daysOfWeek: z.array(z.number()).min(1, "Please select at least one working day."),
  startTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Time must be HH:MM"),
  endTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Time must be HH:MM"),
});

// -----------------------------------------------------------------------------
// 1. Get Onboarding State (Resumability)
// -----------------------------------------------------------------------------

export async function getOnboardingState() {
  const session = await getSession();
  if (!session?.id) {
    return { authenticated: false };
  }

  // Find user and any existing clinic ownership
  const membership = await prisma.clinicMembership.findFirst({
    where: {
      userId: session.id,
      role: "OWNER",
    },
    include: {
      clinic: true,
      doctor: {
        include: { availabilities: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!membership || !membership.clinic) {
    return {
      authenticated: true,
      user: session,
      step: "clinic",
      clinic: null,
      doctor: null,
    };
  }

  // If clinic exists but no doctor profile yet
  if (!membership.doctor) {
    return {
      authenticated: true,
      user: session,
      step: "doctor",
      clinic: membership.clinic,
      doctor: null,
    };
  }

  // If doctor exists, team step or complete
  return {
    authenticated: true,
    user: session,
    step: "team",
    clinic: membership.clinic,
    doctor: membership.doctor,
  };
}

// -----------------------------------------------------------------------------
// 2. Register Clinic (Step 2)
// -----------------------------------------------------------------------------

export async function registerClinic(formData: FormData) {
  const session = await getSession();
  if (!session?.id) {
    return { success: false, message: "Authentication required." };
  }

  const rawData = {
    name: formData.get("name"),
    tagline: formData.get("tagline") || undefined,
    phone: formData.get("phone"),
    email: formData.get("email") || undefined,
    address: formData.get("address"),
    city: formData.get("city"),
    state: formData.get("state"),
    pincode: formData.get("pincode"),
    timeZone: formData.get("timeZone") || "Asia/Kolkata",
  };

  const validation = ClinicOnboardingSchema.safeParse(rawData);
  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const data = validation.data;

  // Generate unique slug
  const baseSlug = data.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

  try {
    // Check if user already owns an in-progress clinic (prevent duplicates on refresh)
    const existingMembership = await prisma.clinicMembership.findFirst({
      where: {
        userId: session.id,
        role: "OWNER",
      },
      include: { clinic: true },
    });

    let clinic;
    if (existingMembership && existingMembership.clinic) {
      // Update existing clinic record
      clinic = await prisma.clinic.update({
        where: { id: existingMembership.clinicId },
        data: {
          name: data.name,
          tagline: data.tagline || null,
          phone: data.phone,
          email: data.email || null,
          address: data.address,
          city: data.city,
          state: data.state,
          pincode: data.pincode,
          timeZone: data.timeZone,
        },
      });
    } else {
      // Create new clinic and membership
      clinic = await prisma.clinic.create({
        data: {
          name: data.name,
          slug,
          tagline: data.tagline || null,
          phone: data.phone,
          email: data.email || null,
          address: data.address,
          city: data.city,
          state: data.state,
          pincode: data.pincode,
          timeZone: data.timeZone,
          memberships: {
            create: {
              userId: session.id,
              role: "OWNER",
            },
          },
        },
      });
    }

    // Update active session with newly registered clinic
    const updatedSession: SessionUser = {
      ...session,
      clinicId: clinic.id,
      clinicName: clinic.name,
      clinicSlug: clinic.slug,
      role: "OWNER",
    };

    await setSessionCookie(updatedSession);

    await logAuditEvent({
      userId: session.id,
      clinicId: clinic.id,
      action: "CLINIC_REGISTERED",
      entityType: "Clinic",
      entityId: clinic.id,
      metadata: { name: clinic.name, city: clinic.city },
    });

    return {
      success: true,
      clinicId: clinic.id,
      redirectUrl: "/onboarding/doctor",
    };
  } catch (error) {
    console.error("[Register Clinic Error]", error);
    return {
      success: false,
      message: "Failed to save clinic profile. Please verify all fields and retry.",
    };
  }
}

// -----------------------------------------------------------------------------
// 3. Register Doctor Profile (Step 3)
// -----------------------------------------------------------------------------

export async function setupDoctorProfile(data: {
  specialization: string;
  qualification?: string;
  registrationNumber: string;
  consultationFee: number;
  slotDurationMinutes: number;
  daysOfWeek: number[];
  startTime: string;
  endTime: string;
}) {
  const session = await getSession();
  if (!session?.id || !session?.clinicId) {
    return { success: false, message: "Active clinic session required." };
  }

  const validation = DoctorProfileSchema.safeParse(data);
  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const profileData = validation.data;

  try {
    // Find owner membership
    const membership = await prisma.clinicMembership.findUnique({
      where: {
        userId_clinicId: {
          userId: session.id,
          clinicId: session.clinicId,
        },
      },
    });

    if (!membership) {
      return { success: false, message: "Clinic membership record not found." };
    }

    // Upsert DoctorProfile
    const doctorProfile = await prisma.doctorProfile.upsert({
      where: { membershipId: membership.id },
      create: {
        clinicId: session.clinicId,
        membershipId: membership.id,
        registrationNumber: profileData.registrationNumber,
        specialization: profileData.specialization,
        qualification: profileData.qualification || null,
        consultationFee: profileData.consultationFee,
        slotDurationMinutes: profileData.slotDurationMinutes,
      },
      update: {
        registrationNumber: profileData.registrationNumber,
        specialization: profileData.specialization,
        qualification: profileData.qualification || null,
        consultationFee: profileData.consultationFee,
        slotDurationMinutes: profileData.slotDurationMinutes,
      },
    });

    // Delete existing availabilities and recreate for idempotency
    await prisma.doctorAvailability.deleteMany({
      where: { doctorId: doctorProfile.id },
    });

    // Seed Availability schedules
    await prisma.doctorAvailability.createMany({
      data: profileData.daysOfWeek.map((day) => ({
        clinicId: session.clinicId!,
        doctorId: doctorProfile.id,
        dayOfWeek: day,
        startTime: profileData.startTime,
        endTime: profileData.endTime,
        isAvailable: true,
      })),
    });

    await logAuditEvent({
      userId: session.id,
      clinicId: session.clinicId,
      action: "DOCTOR_PROFILE_CREATED",
      entityType: "DoctorProfile",
      entityId: doctorProfile.id,
      metadata: { specialization: profileData.specialization },
    });

    return {
      success: true,
      redirectUrl: "/onboarding/team",
    };
  } catch (error) {
    console.error("[Setup Doctor Error]", error);
    return {
      success: false,
      message: "Failed to configure doctor availability schedule.",
    };
  }
}

// -----------------------------------------------------------------------------
// 4. Invite Team Member (Step 4)
// -----------------------------------------------------------------------------

export async function inviteTeamMember(data: {
  fullName: string;
  email: string;
  phone?: string;
  role: "DOCTOR" | "RECEPTIONIST";
}) {
  const session = await getSession();
  if (!session?.id || !session?.clinicId) {
    return { success: false, message: "Active clinic session required." };
  }

  if (session.role !== "OWNER") {
    return { success: false, message: "Only clinic owners can invite staff." };
  }

  const normalizedEmail = data.email.toLowerCase().trim();

  try {
    // Check if user exists or create placeholder
    let invitedUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!invitedUser) {
      // Create user record with temporary unusable hash until password set
      invitedUser = await prisma.user.create({
        data: {
          name: data.fullName,
          email: normalizedEmail,
          phone: data.phone || null,
          passwordHash: "INVITED_PENDING_ACTIVATION",
        },
      });
    }

    // Check if membership already exists
    const existingMembership = await prisma.clinicMembership.findUnique({
      where: {
        userId_clinicId: {
          userId: invitedUser.id,
          clinicId: session.clinicId,
        },
      },
    });

    if (existingMembership) {
      return { success: false, message: "This user is already a member of this clinic." };
    }

    // Create membership with specified role
    await prisma.clinicMembership.create({
      data: {
        userId: invitedUser.id,
        clinicId: session.clinicId,
        role: data.role as MembershipRole,
        isActive: true,
      },
    });

    await logAuditEvent({
      userId: session.id,
      clinicId: session.clinicId,
      action: "STAFF_INVITED",
      entityType: "ClinicMembership",
      entityId: invitedUser.id,
      metadata: { invitedEmail: normalizedEmail, role: data.role },
    });

    return {
      success: true,
      message: `Invitation registered for ${data.fullName} as ${data.role}.`,
    };
  } catch (error) {
    console.error("[Invite Team Error]", error);
    return {
      success: false,
      message: "Failed to register team invitation.",
    };
  }
}

// -----------------------------------------------------------------------------
// 5. Complete Onboarding
// -----------------------------------------------------------------------------

export async function completeOnboarding() {
  const session = await getSession();
  if (!session?.id || !session?.clinicId) {
    return { success: false, message: "Active clinic session required." };
  }

  await logAuditEvent({
    userId: session.id,
    clinicId: session.clinicId,
    action: "ONBOARDING_COMPLETED",
    entityType: "Clinic",
    entityId: session.clinicId,
  });

  return {
    success: true,
    redirectUrl: "/app/dashboard",
  };
}
