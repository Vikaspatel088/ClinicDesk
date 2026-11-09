/**
 * ClinicDesk — No-Show Intelligence Calculation Engine
 * 
 * Implements strictly defined denominators and explicit non-causal estimations.
 */

export interface AttendanceMetrics {
  totalScheduled: number;
  clinicCancellations: number;
  patientCancellations: number;
  completedVisits: number;
  noShows: number;
}

export interface NoShowAnalysisResult {
  /**
   * Evaluated denominator: Total Scheduled - Clinic Cancellations.
   * Clinic-initiated cancellations (doctor emergency, clinic holiday) are excluded
   * from the no-show denominator because the patient was never expected to attend.
   */
  evaluatedOpportunity: number;
  
  /**
   * No-Show Rate = (No-Shows / Evaluated Opportunity) * 100
   */
  noShowRatePercent: number;

  /**
   * Attendance Rate = (Completed Visits / Evaluated Opportunity) * 100
   */
  attendanceRatePercent: number;

  /**
   * Patient Cancellation Rate = (Patient Cancellations / Evaluated Opportunity) * 100
   */
  patientCancellationRatePercent: number;
}

/**
 * Calculates verifiable attendance rates with strict denominator definitions.
 */
export function calculateAttendanceMetrics(metrics: AttendanceMetrics): NoShowAnalysisResult {
  const evaluatedOpportunity = Math.max(0, metrics.totalScheduled - metrics.clinicCancellations);

  if (evaluatedOpportunity === 0) {
    return {
      evaluatedOpportunity: 0,
      noShowRatePercent: 0,
      attendanceRatePercent: 0,
      patientCancellationRatePercent: 0,
    };
  }

  const noShowRate = (metrics.noShows / evaluatedOpportunity) * 100;
  const attendanceRate = (metrics.completedVisits / evaluatedOpportunity) * 100;
  const cancellationRate = (metrics.patientCancellations / evaluatedOpportunity) * 100;

  return {
    evaluatedOpportunity,
    noShowRatePercent: Math.round(noShowRate * 10) / 10,
    attendanceRatePercent: Math.round(attendanceRate * 10) / 10,
    patientCancellationRatePercent: Math.round(cancellationRate * 10) / 10,
  };
}

export interface ComparisonPeriod {
  baselineRatePercent: number;
  postReminderRatePercent: number;
  postReminderOpportunityCount: number;
  averageConsultationFeeINR: number;
}

export interface EstimatedImprovementResult {
  rateDifferencePercent: number;
  estimatedRecoveredAppointments: number;
  estimatedRecoveredRevenueINR: number;
  isStatisticallyMeaningful: boolean;
  causalityDisclaimer: string;
}

/**
 * Estimates potential recovered appointments and practice revenue.
 * Explicitly issues a non-causal disclaimer per clinical product directive.
 */
export function estimateRecoveredValue(comparison: ComparisonPeriod): EstimatedImprovementResult {
  const rateDifference = Math.max(0, comparison.baselineRatePercent - comparison.postReminderRatePercent);
  
  // Estimated appointments recovered = (Rate difference / 100) * post reminder opportunity
  const estimatedRecoveredAppointments = Math.round(
    (rateDifference / 100) * comparison.postReminderOpportunityCount
  );

  const estimatedRecoveredRevenueINR = estimatedRecoveredAppointments * comparison.averageConsultationFeeINR;

  return {
    rateDifferencePercent: Math.round(rateDifference * 10) / 10,
    estimatedRecoveredAppointments,
    estimatedRecoveredRevenueINR,
    isStatisticallyMeaningful: comparison.postReminderOpportunityCount >= 30,
    causalityDisclaimer:
      "Estimated recovered appointments and revenue represent observational correlation following reminder system activation. External factors such as seasonal patient volume and day-of-week variation may also influence attendance.",
  };
}
