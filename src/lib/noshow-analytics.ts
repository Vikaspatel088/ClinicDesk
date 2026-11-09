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

// -----------------------------------------------------------------------------
// Interactive Clinic Revenue Calculator Engine
// -----------------------------------------------------------------------------

export interface CalculatorInputs {
  weeklyAppointments: number;
  currentNoShowRatePercent: number;
  avgConsultationFeeINR: number;
  expectedRelativeReductionPercent: number;
  monthlyReminderCostINR: number;
}

export interface CalculatorOutputs {
  monthlyAppointments: number;
  currentMissedAppointments: number;
  appointmentsAvoided: number;
  associatedRevenueINR: number;
  netOpportunityINR: number;
  effectiveNoShowRatePercent: number;
  isCostPositive: boolean;
  causalityDisclaimer: string;
}

export const DEFAULT_CALCULATOR_INPUTS: CalculatorInputs = {
  weeklyAppointments: 120,
  currentNoShowRatePercent: 24,
  avgConsultationFeeINR: 600,
  expectedRelativeReductionPercent: 40,
  monthlyReminderCostINR: 950,
};

export const CALCULATOR_DISCLAIMER =
  "These are scenario estimates based on your inputs, not guaranteed outcomes. Actual results vary by clinic, patient behavior, reminder delivery and operational factors. Avoid interpreting the estimate as proven causal impact.";

/**
 * Calculates interactive practice revenue recovery scenario with safe bounds checking.
 */
export function calculateClinicScenario(rawInputs: CalculatorInputs): CalculatorOutputs {
  // Safe normalization and bounds checking
  const weeklyAppointments = Math.max(0, Number(rawInputs.weeklyAppointments) || 0);
  const baselineRate = Math.min(100, Math.max(0, Number(rawInputs.currentNoShowRatePercent) || 0));
  const avgFee = Math.max(0, Number(rawInputs.avgConsultationFeeINR) || 0);
  const reductionRate = Math.min(100, Math.max(0, Number(rawInputs.expectedRelativeReductionPercent) || 0));
  const reminderCost = Math.max(0, Number(rawInputs.monthlyReminderCostINR) || 0);

  // Average monthly appointments = Weekly appointments * 4.33
  const monthlyAppointments = Math.round(weeklyAppointments * 4.33);

  // Current estimated missed appointments = Monthly appointments * (baseline / 100)
  const currentMissedAppointments = Math.round(monthlyAppointments * (baselineRate / 100));

  // Estimated appointments avoided = Monthly appointments * (baseline / 100) * (reduction / 100)
  const appointmentsAvoided = Math.round(
    monthlyAppointments * (baselineRate / 100) * (reductionRate / 100)
  );

  // Estimated associated revenue = Estimated appointments avoided * average consultation fee
  const associatedRevenueINR = appointmentsAvoided * avgFee;

  // Estimated net opportunity = Associated revenue - reminder cost
  const netOpportunityINR = associatedRevenueINR - reminderCost;

  // Effective no-show rate under scenario = baseline * (1 - reduction / 100)
  const effectiveNoShowRatePercent =
    Math.round(baselineRate * (1 - reductionRate / 100) * 10) / 10;

  return {
    monthlyAppointments,
    currentMissedAppointments,
    appointmentsAvoided,
    associatedRevenueINR,
    netOpportunityINR,
    effectiveNoShowRatePercent,
    isCostPositive: netOpportunityINR >= 0,
    causalityDisclaimer: CALCULATOR_DISCLAIMER,
  };
}
