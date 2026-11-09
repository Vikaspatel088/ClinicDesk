import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { prisma, withTenantContext } from "../src/lib/tenant-context";
import { randomUUID } from "crypto";

describe("Live PostgreSQL Row-Level Security (RLS) Multi-Tenant Isolation", () => {
  let clinicAId: string;
  let clinicBId: string;
  let patientAId: string;
  let patientBId: string;

  beforeAll(async () => {
    // 1. Create two isolated test clinics
    const clinicA = await prisma.clinic.create({
      data: {
        name: `RLS Test Clinic Alpha-${Date.now().toString().slice(-4)}`,
        slug: `rls-alpha-${Date.now()}`,
        phone: "9100000001",
        address: "101 Alpha Medical Park",
        city: "Bengaluru",
        state: "Karnataka",
        pincode: "560001",
      },
    });
    clinicAId = clinicA.id;

    const clinicB = await prisma.clinic.create({
      data: {
        name: `RLS Test Clinic Beta-${Date.now().toString().slice(-4)}`,
        slug: `rls-beta-${Date.now()}`,
        phone: "9100000002",
        address: "202 Beta Health Square",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001",
      },
    });
    clinicBId = clinicB.id;
  });

  afterAll(async () => {
    // Clean up test clinics and cascade-associated records
    if (clinicAId) {
      await prisma.patient.deleteMany({ where: { clinicId: clinicAId } });
      await prisma.clinic.delete({ where: { id: clinicAId } });
    }
    if (clinicBId) {
      await prisma.patient.deleteMany({ where: { clinicId: clinicBId } });
      await prisma.clinic.delete({ where: { id: clinicBId } });
    }
  });

  it("permits tenant to insert and read its own records", async () => {
    const patientA = await withTenantContext(clinicAId, async (tx) => {
      return tx.patient.create({
        data: {
          clinicId: clinicAId,
          mrn: `MRN-A-${Date.now().toString().slice(-4)}`,
          name: "Aarav Verma",
          phone: "9876543201",
          gender: "MALE",
          dateOfBirth: new Date("1988-04-12"),
        },
      });
    });

    patientAId = patientA.id;
    expect(patientA.id).toBeDefined();
    expect(patientA.clinicId).toBe(clinicAId);

    // Read back in Clinic A context
    const clinicAPatients = await withTenantContext(clinicAId, async (tx) => {
      return tx.patient.findMany({ where: { clinicId: clinicAId } });
    });

    expect(clinicAPatients.some((p) => p.id === patientAId)).toBe(true);
  });

  it("CRITICAL: completely hides Clinic A patients when queried under Clinic B context", async () => {
    const clinicBPatients = await withTenantContext(clinicBId, async (tx) => {
      return tx.patient.findMany({
        where: { id: patientAId },
      });
    });

    // PostgreSQL RLS policy filters out Patient A from Clinic B's visibility
    expect(clinicBPatients.length).toBe(0);

    const directLookup = await withTenantContext(clinicBId, async (tx) => {
      return tx.patient.findUnique({
        where: { id: patientAId },
      });
    });

    expect(directLookup).toBeNull();
  });

  it("CRITICAL: rejects cross-tenant write attempts from Clinic B into Clinic A", async () => {
    // Attempting to update Clinic A's patient while in Clinic B context
    await withTenantContext(clinicBId, async (tx) => {
      const updateResult = await tx.patient.updateMany({
        where: { id: patientAId },
        data: { name: "HackedName" },
      });

      // 0 rows affected because RLS hides the row
      expect(updateResult.count).toBe(0);
    });

    // Verify patient was untouched
    const originalPatient = await withTenantContext(clinicAId, async (tx) => {
      return tx.patient.findUnique({ where: { id: patientAId } });
    });
    expect(originalPatient?.name).toBe("Aarav Verma");
  });

  it("CRITICAL: prevents Clinic B from inserting a record belonging to Clinic A (WITH CHECK enforcement)", async () => {
    // Clinic B attempts to spoof or tamper with clinicId during insert
    await expect(
      withTenantContext(clinicBId, async (tx) => {
        return tx.patient.create({
          data: {
            clinicId: clinicAId, // Spoofed clinic ID
            mrn: `MRN-SPOOF-${Date.now().toString().slice(-4)}`,
            name: "Spoofed Patient",
            phone: "9876543299",
            gender: "OTHER",
            dateOfBirth: new Date("1995-01-01"),
          },
        });
      })
    ).rejects.toThrow();
  });

  it("allows both tenants to coexist with strict data separation", async () => {
    const patientB = await withTenantContext(clinicBId, async (tx) => {
      return tx.patient.create({
        data: {
          clinicId: clinicBId,
          mrn: `MRN-B-${Date.now().toString().slice(-4)}`,
          name: "Bhavna Patel",
          phone: "9876543202",
          gender: "FEMALE",
          dateOfBirth: new Date("1992-08-20"),
        },
      });
    });
    patientBId = patientB.id;

    // Clinic A only sees Patient A
    const listA = await withTenantContext(clinicAId, async (tx) => {
      return tx.patient.findMany();
    });
    expect(listA.some((p) => p.id === patientAId)).toBe(true);
    expect(listA.some((p) => p.id === patientBId)).toBe(false);

    // Clinic B only sees Patient B
    const listB = await withTenantContext(clinicBId, async (tx) => {
      return tx.patient.findMany();
    });
    expect(listB.some((p) => p.id === patientBId)).toBe(true);
    expect(listB.some((p) => p.id === patientAId)).toBe(false);
  });

  it("CRITICAL: proves connection pooling cannot leak tenant context to subsequent queries", async () => {
    // 1. Run an operation with Clinic A tenant context
    await withTenantContext(clinicAId, async (tx) => {
      const patients = await tx.patient.findMany();
      expect(patients.some((p) => p.id === patientAId)).toBe(true);
    });

    // 2. Immediate subsequent operation on the connection pool without tenant context
    await prisma.$transaction(async (tx) => {
      const [setting] = await tx.$queryRawUnsafe<Array<{ val: string | null }>>(
        "SELECT NULLIF(current_setting('app.current_clinic_id', true), '') as val;"
      );
      // Because SET LOCAL is transaction-scoped, context is strictly cleared
      expect(setting?.val).toBeNull();

      // Tenant records are completely inaccessible when context is unset
      const uncontextedPatients = await tx.patient.findMany();
      expect(uncontextedPatients.length).toBe(0);
    });
  });
});
