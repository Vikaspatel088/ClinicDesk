import { describe, it, expect } from "vitest";
import {
  calculateAttendanceMetrics,
  estimateRecoveredValue,
} from "../src/lib/noshow-analytics";

describe("No-Show Intelligence Mathematical Engine", () => {
  it("correctly calculates no-show rate with clinic cancellations excluded from denominator", () => {
    // 100 scheduled, 10 clinic cancellations -> 90 evaluated opportunities
    // 18 no-shows -> 18 / 90 = 20.0%
    // 63 completed -> 63 / 90 = 70.0%
    // 9 patient cancellations -> 9 / 90 = 10.0%
    const result = calculateAttendanceMetrics({
      totalScheduled: 100,
      clinicCancellations: 10,
      patientCancellations: 9,
      completedVisits: 63,
      noShows: 18,
    });

    expect(result.evaluatedOpportunity).toBe(90);
    expect(result.noShowRatePercent).toBe(20.0);
    expect(result.attendanceRatePercent).toBe(70.0);
    expect(result.patientCancellationRatePercent).toBe(10.0);
  });

  it("handles zero scheduled opportunities gracefully without division by zero", () => {
    const result = calculateAttendanceMetrics({
      totalScheduled: 0,
      clinicCancellations: 0,
      patientCancellations: 0,
      completedVisits: 0,
      noShows: 0,
    });

    expect(result.evaluatedOpportunity).toBe(0);
    expect(result.noShowRatePercent).toBe(0);
  });

  it("calculates estimated recovered appointments and revenue with non-causal disclaimer", () => {
    // Baseline 25% no-show rate reduced to 10% after reminders
    // 200 post-reminder opportunities, avg fee ₹500
    // Difference: 15% -> 0.15 * 200 = 30 appointments recovered
    // Recovered revenue: 30 * 500 = ₹15,000
    const result = estimateRecoveredValue({
      baselineRatePercent: 25.0,
      postReminderRatePercent: 10.0,
      postReminderOpportunityCount: 200,
      averageConsultationFeeINR: 500,
    });

    expect(result.rateDifferencePercent).toBe(15.0);
    expect(result.estimatedRecoveredAppointments).toBe(30);
    expect(result.estimatedRecoveredRevenueINR).toBe(15000);
    expect(result.isStatisticallyMeaningful).toBe(true);
    expect(result.causalityDisclaimer).toContain("observational correlation");
  });
});
