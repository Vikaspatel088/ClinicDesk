const { PrismaClient } = require('@prisma/client');
const { SignJWT } = require('jose/jwt/sign');

const prisma = new PrismaClient();
const SECRET_KEY = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || "clinicdesk_super_secret_development_encryption_key_32chars"
);

async function main() {
  console.log("Setting up synthetic demo account in live PostgreSQL database...");

  // 1. Create or update Demo Clinic
  const clinic = await prisma.clinic.upsert({
    where: { slug: "aarogyam-care" },
    create: {
      name: "Aarogyam Care Clinic",
      slug: "aarogyam-care",
      tagline: "Comprehensive Family Healthcare & Chronic Care Management",
      phone: "9876543210",
      email: "contact@aarogyam.in",
      address: "Suite 402, Sector 14 Medical Enclave",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560001",
      timeZone: "Asia/Kolkata",
    },
    update: {
      name: "Aarogyam Care Clinic",
    },
  });

  // 2. Create or update Demo Doctor User (Global table without RLS)
  const user = await prisma.user.upsert({
    where: { email: "doctor@aarogyam.in" },
    create: {
      name: "Dr. Vikram Sharma",
      email: "doctor@aarogyam.in",
      phone: "9876543210",
      passwordHash: "$2a$12$e80yq7KjB81Q2L3M4N5O6Pe708090102030405060708090102030", // standard dummy bcrypt hash
      isActive: true,
    },
    update: {
      name: "Dr. Vikram Sharma",
      isActive: true,
    },
  });

  // Execute tenant-scoped seeding inside transaction with SET LOCAL
  const { membership, doctor } = await prisma.$transaction(async (tx) => {
    await tx.$executeRawUnsafe(`SET LOCAL app.current_clinic_id = '${clinic.id}';`);

    // 3. Create or update ClinicMembership as OWNER
    const mem = await tx.clinicMembership.upsert({
      where: {
        userId_clinicId: {
          userId: user.id,
          clinicId: clinic.id,
        },
      },
      create: {
        userId: user.id,
        clinicId: clinic.id,
        role: "OWNER",
        isActive: true,
      },
      update: {
        role: "OWNER",
        isActive: true,
      },
    });

    // 4. Create DoctorProfile
    const doc = await tx.doctorProfile.upsert({
      where: { membershipId: mem.id },
      create: {
        clinicId: clinic.id,
        membershipId: mem.id,
        specialization: "General Medicine & Diabetology",
        qualification: "MBBS, MD (Medicine)",
        registrationNumber: "KMC-48291-KA",
        consultationFee: 800,
        slotDurationMinutes: 15,
        isActive: true,
      },
      update: {
        specialization: "General Medicine & Diabetology",
        consultationFee: 800,
        slotDurationMinutes: 15,
      },
    });

    // 5. Seed synthetic subscription
    const existingSub = await tx.subscription.findFirst({
      where: { clinicId: clinic.id }
    });

    if (!existingSub) {
      await tx.subscription.create({
        data: {
          clinicId: clinic.id,
          plan: "CLINIC",
          status: "ACTIVE",
          razorpaySubscriptionId: "sub_demo_aarogyam_001",
          currentPeriodStart: new Date(),
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      });
    }

    return { membership: mem, doctor: doc };
  });

  // 6. Sign JWT session for dashboard
  const dashboardSession = {
    id: user.id,
    email: user.email,
    name: user.name,
    phone: user.phone,
    clinicId: clinic.id,
    clinicName: clinic.name,
    clinicSlug: clinic.slug,
    role: "OWNER",
  };

  const dashboardToken = await new SignJWT(dashboardSession)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET_KEY);

  // 7. Create in-progress onboarding user (no clinic yet)
  const onboardingUser = await prisma.user.upsert({
    where: { email: "onboarding.demo@aarogyam.in" },
    create: {
      name: "Dr. Ananya Rao",
      email: "onboarding.demo@aarogyam.in",
      phone: "9876543211",
      passwordHash: "$2a$12$e80yq7KjB81Q2L3M4N5O6Pe708090102030405060708090102030",
      isActive: true,
    },
    update: {
      name: "Dr. Ananya Rao",
    },
  });

  const onboardingSession = {
    id: onboardingUser.id,
    email: onboardingUser.email,
    name: onboardingUser.name,
    phone: onboardingUser.phone,
    clinicId: null,
    clinicName: null,
    clinicSlug: null,
    role: null,
  };

  const onboardingToken = await new SignJWT(onboardingSession)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET_KEY);

  console.log("Demo Account Configured Successfully!");
  console.log("Clinic ID:", clinic.id);
  console.log("Dashboard Token:", dashboardToken);
  console.log("Onboarding Token:", onboardingToken);

  const fs = require('fs');
  fs.writeFileSync('artifacts/visual-showcase/tokens.json', JSON.stringify({
    dashboardToken,
    onboardingToken,
    clinicId: clinic.id
  }, null, 2));

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error("Error setting up demo account:", e);
  process.exit(1);
});
