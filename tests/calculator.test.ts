import { describe, it, expect } from "vitest";
import {
  calculateClinicScenario,
  DEFAULT_CALCULATOR_INPUTS,
  CALCULATOR_DISCLAIMER,
} from "../src/lib/noshow-analytics";

describe("Interactive Clinic Revenue Calculator Engine", () => {
  it("calculates baseline default scenario accurately", () => {
    // Default: 120 weekly appts, 24% no-show, ₹600 fee, 40% reduction, ₹950 reminder cost
    // Monthly appts = 120 * 4.33 = 519.6 -> 520
    // Missed = 520 * 0.24 = 124.8 -> 125
    // Avoided = 520 * 0.24 * 0.40 = 49.92 -> 50
    // Associated revenue = 50 * 600 = ₹30,000
    // Net opportunity = 30000 - 950 = ₹29,050
    // Effective no-show rate = 24 * (1 - 0.40) = 14.4%
    const result = calculateClinicScenario(DEFAULT_CALCULATOR_INPUTS);

    expect(result.monthlyAppointments).toBe(520);
    expect(result.currentMissedAppointments).toBe(125);
    expect(result.appointmentsAvoided).toBe(50);
    expect(result.associatedRevenueINR).toBe(30000);
    expect(result.netOpportunityINR).toBe(29050);
    expect(result.effectiveNoShowRatePercent).toBe(14.4);
    expect(result.isCostPositive).toBe(true);
    expect(result.causalityDisclaimer).toBe(CALCULATOR_DISCLAIMER);
  });

  it("handles zero appointments gracefully", () => {
    const result = calculateClinicScenario({
      ...DEFAULT_CALCULATOR_INPUTS,
      weeklyAppointments: 0,
    });

    expect(result.monthlyAppointments).toBe(0);
    expect(result.currentMissedAppointments).toBe(0);
    expect(result.appointmentsAvoided).toBe(0);
    expect(result.associatedRevenueINR).toBe(0);
    expect(result.netOpportunityINR).toBe(-950);
    expect(result.isCostPositive).toBe(false);
  });

  it("handles zero percent no-show rate", () => {
    const result = calculateClinicScenario({
      ...DEFAULT_CALCULATOR_INPUTS,
      currentNoShowRatePercent: 0,
    });

    expect(result.currentMissedAppointments).toBe(0);
    expect(result.appointmentsAvoided).toBe(0);
    expect(result.associatedRevenueINR).toBe(0);
    expect(result.effectiveNoShowRatePercent).toBe(0);
  });

  it("handles 100% no-show rate boundary", () => {
    const result = calculateClinicScenario({
      weeklyAppointments: 10,
      currentNoShowRatePercent: 100,
      avgConsultationFeeINR: 500,
      expectedRelativeReductionPercent: 50,
      monthlyReminderCostINR: 1000,
    });

    // 10 * 4.33 = 43.3 -> 43
    // Missed = 43 * 1.0 = 43
    // Avoided = 43 * 1.0 * 0.5 = 21.5 -> 22
    // Revenue = 22 * 500 = 11000
    // Net = 11000 - 1000 = 10000
    // Effective rate = 100 * (1 - 0.5) = 50.0%
    expect(result.monthlyAppointments).toBe(43);
    expect(result.currentMissedAppointments).toBe(43);
    expect(result.appointmentsAvoided).toBe(22);
    expect(result.effectiveNoShowRatePercent).toBe(50.0);
    expect(result.associatedRevenueINR).toBe(11000);
    expect(result.netOpportunityINR).toBe(10000);
  });

  it("handles decimal percentages correctly", () => {
    const result = calculateClinicScenario({
      weeklyAppointments: 100,
      currentNoShowRatePercent: 17.5,
      avgConsultationFeeINR: 750,
      expectedRelativeReductionPercent: 33.3,
      monthlyReminderCostINR: 500,
    });

    // 100 * 4.33 = 433
    // Missed = 433 * 0.175 = 75.775 -> 76
    // Avoided = 433 * 0.175 * 0.333 = 25.233 -> 25
    // Revenue = 25 * 750 = 18750
    // Net = 18750 - 500 = 18250
    // Effective = 17.5 * (1 - 0.333) = 11.6725 -> 11.7%
    expect(result.monthlyAppointments).toBe(433);
    expect(result.currentMissedAppointments).toBe(76);
    expect(result.appointmentsAvoided).toBe(25);
    expect(result.associatedRevenueINR).toBe(18750);
    expect(result.effectiveNoShowRatePercent).toBe(11.7);
  });

  it("handles reminder cost greater than estimated revenue (negative net opportunity)", () => {
    const result = calculateClinicScenario({
      weeklyAppointments: 5,
      currentNoShowRatePercent: 10,
      avgConsultationFeeINR: 200,
      expectedRelativeReductionPercent: 20,
      monthlyReminderCostINR: 2000,
    });

    // 5 * 4.33 = 21.65 -> 22
    // Missed = 22 * 0.1 = 2.2 -> 2
    // Avoided = 22 * 0.1 * 0.2 = 0.44 -> 0
    // Revenue = 0 * 200 = 0
    // Net = 0 - 2000 = -2000
    expect(result.associatedRevenueINR).toBe(0);
    expect(result.netOpportunityINR).toBe(-2000);
    expect(result.isCostPositive).toBe(false);
  });

  it("safely clamps negative inputs and out-of-bounds percentages", () => {
    const result = calculateClinicScenario({
      weeklyAppointments: -50,
      currentNoShowRatePercent: 150, // Should clamp to 100
      avgConsultationFeeINR: -300,
      expectedRelativeReductionPercent: 250, // Should clamp to 100
      monthlyReminderCostINR: -100,
    });

    expect(result.monthlyAppointments).toBe(0);
    expect(result.currentMissedAppointments).toBe(0);
    expect(result.appointmentsAvoided).toBe(0);
    expect(result.associatedRevenueINR).toBe(0);
    expect(result.netOpportunityINR).toBe(0);
  });
});
