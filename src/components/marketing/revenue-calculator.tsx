"use client";

import React, { useState } from "react";
import { 
  Calculator, 
  RotateCcw, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Info,
  Calendar,
  Users,
  IndianRupee,
  Percent
} from "lucide-react";
import { 
  CalculatorInputs, 
  DEFAULT_CALCULATOR_INPUTS, 
  calculateClinicScenario,
  CALCULATOR_DISCLAIMER 
} from "@/lib/noshow-analytics";
import { formatINR } from "@/lib/utils";

interface RevenueCalculatorProps {
  className?: string;
  showTitle?: boolean;
}

export function RevenueCalculator({ 
  className = "", 
  showTitle = true 
}: RevenueCalculatorProps) {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_CALCULATOR_INPUTS);

  const outputs = calculateClinicScenario(inputs);

  const handleReset = () => {
    setInputs(DEFAULT_CALCULATOR_INPUTS);
  };

  const handleInputChange = (field: keyof CalculatorInputs, value: number) => {
    setInputs((prev) => ({
      ...prev,
      [field]: isNaN(value) ? 0 : value,
    }));
  };

  return (
    <div className={`rounded-2xl border border-mist-border bg-white shadow-elevated overflow-hidden ${className}`}>
      {showTitle && (
        <div className="border-b border-mist bg-midnight px-6 py-6 text-paper">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-midnight-800 px-3 py-1 font-mono text-xs text-teal">
                <Calculator className="h-3.5 w-3.5" />
                <span>CLINICAL PRACTICE SCENARIO MODEL</span>
              </div>
              <h3 className="mt-2 font-serif text-2xl md:text-3xl font-normal text-white">
                Practice No-Show Opportunity Calculator
              </h3>
              <p className="mt-1 text-sm text-midnight-200">
                Model how timely WhatsApp and SMS reminders impact attendance and practice revenue.
              </p>
            </div>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded-lg border border-midnight-700 bg-midnight-800 px-3 py-2 text-xs font-medium text-midnight-100 hover:bg-midnight-700 hover:text-white transition-colors"
              title="Reset to typical Indian clinic averages"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Defaults</span>
            </button>
          </div>
        </div>
      )}

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column (Inputs) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center justify-between border-b border-mist pb-3">
            <h4 className="font-serif text-lg font-bold text-midnight">
              1. Your Clinic Baseline
            </h4>
            <span className="font-mono text-xs text-ink-muted">Inputs editable</span>
          </div>

          {/* Input 1: Weekly Appointments */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <label htmlFor="weekly-appts" className="font-medium text-ink flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-teal" />
                Weekly Scheduled Appointments
              </label>
              <span className="font-mono font-bold text-midnight bg-paper px-2.5 py-0.5 rounded border border-mist-border">
                {inputs.weeklyAppointments} slots / wk
              </span>
            </div>
            <input
              id="weekly-appts"
              type="range"
              min="10"
              max="500"
              step="5"
              value={inputs.weeklyAppointments}
              onChange={(e) => handleInputChange("weeklyAppointments", Number(e.target.value))}
              className="w-full accent-teal h-2 bg-mist rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-mono text-ink-muted">
              <span>10 (Solo part-time)</span>
              <span>120 (Avg. clinic)</span>
              <span>500 (Multi-doctor)</span>
            </div>
          </div>

          {/* Input 2: Current No-Show Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <label htmlFor="noshow-rate" className="font-medium text-ink flex items-center gap-1.5">
                <Percent className="h-4 w-4 text-coral" />
                Current Baseline No-Show Rate
              </label>
              <span className="font-mono font-bold text-coral bg-coral-50 px-2.5 py-0.5 rounded border border-coral-200">
                {inputs.currentNoShowRatePercent}%
              </span>
            </div>
            <input
              id="noshow-rate"
              type="range"
              min="5"
              max="60"
              step="1"
              value={inputs.currentNoShowRatePercent}
              onChange={(e) => handleInputChange("currentNoShowRatePercent", Number(e.target.value))}
              className="w-full accent-coral h-2 bg-mist rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-mono text-ink-muted">
              <span>5% (Minimal)</span>
              <span>24% (Indian Urban Avg.)</span>
              <span>60% (High Walk-In Vol.)</span>
            </div>
          </div>

          {/* Input 3: Average Consultation Fee */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <label htmlFor="consult-fee" className="font-medium text-ink flex items-center gap-1.5">
                <IndianRupee className="h-4 w-4 text-teal" />
                Average Doctor Consultation Fee
              </label>
              <span className="font-mono font-bold text-midnight bg-paper px-2.5 py-0.5 rounded border border-mist-border">
                {formatINR(inputs.avgConsultationFeeINR)}
              </span>
            </div>
            <input
              id="consult-fee"
              type="range"
              min="200"
              max="2500"
              step="50"
              value={inputs.avgConsultationFeeINR}
              onChange={(e) => handleInputChange("avgConsultationFeeINR", Number(e.target.value))}
              className="w-full accent-teal h-2 bg-mist rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-mono text-ink-muted">
              <span>₹200 (GP OPD)</span>
              <span>₹600 (Specialist Avg.)</span>
              <span>₹2,500 (Super-Specialist)</span>
            </div>
          </div>

          {/* Section: Improvement Assumptions */}
          <div className="pt-4 border-t border-mist space-y-4">
            <h4 className="font-serif text-lg font-bold text-midnight">
              2. Reminder Assumptions
            </h4>

            {/* Input 4: Expected Relative Reduction */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <label htmlFor="reduction-rate" className="font-medium text-ink flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4 text-teal" />
                  Expected Relative Reduction in No-Shows
                </label>
                <span className="font-mono font-bold text-teal bg-teal-50 px-2.5 py-0.5 rounded border border-teal-200">
                  {inputs.expectedRelativeReductionPercent}%
                </span>
              </div>
              <input
                id="reduction-rate"
                type="range"
                min="10"
                max="80"
                step="5"
                value={inputs.expectedRelativeReductionPercent}
                onChange={(e) => handleInputChange("expectedRelativeReductionPercent", Number(e.target.value))}
                className="w-full accent-teal h-2 bg-mist rounded-lg cursor-pointer"
              />
              <p className="text-xs text-ink-muted">
                Observed relative drops from automated multi-touch notifications (24h SMS + 2h WhatsApp prompt).
              </p>
            </div>

            {/* Input 5: Monthly Reminder Cost */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <label htmlFor="reminder-cost" className="font-medium text-ink">
                  Estimated Monthly Reminder Messaging Cost
                </label>
                <span className="font-mono text-xs font-semibold text-ink">
                  {formatINR(inputs.monthlyReminderCostINR)} / mo
                </span>
              </div>
              <input
                id="reminder-cost"
                type="number"
                min="0"
                max="10000"
                step="50"
                value={inputs.monthlyReminderCostINR}
                onChange={(e) => handleInputChange("monthlyReminderCostINR", Number(e.target.value))}
                className="w-full rounded-md border border-mist-border px-3 py-1.5 font-mono text-sm text-midnight focus:border-teal focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Output Column (Results & Economics) */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-mist pb-3">
              <h4 className="font-serif text-lg font-bold text-midnight">
                Scenario Economics
              </h4>
              <span className="font-mono text-xs text-teal font-semibold">Monthly Projection</span>
            </div>

            {/* Key Metric 1: Associated Revenue */}
            <div className="rounded-xl border border-teal-200 bg-teal-50/60 p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-teal-800 font-semibold">
                  Estimated Associated Revenue
                </span>
                <span className="rounded-full bg-teal-100 px-2.5 py-0.5 font-mono text-xs text-teal-900 font-bold">
                  Potential Upside
                </span>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="font-serif text-4xl sm:text-5xl font-bold text-midnight">
                  {formatINR(outputs.associatedRevenueINR)}
                </span>
                <span className="text-sm font-mono text-ink-muted">per month</span>
              </div>
              <p className="mt-2 text-xs text-teal-900">
                Derived from {outputs.appointmentsAvoided} estimated recovered appointments @ {formatINR(inputs.avgConsultationFeeINR)} avg fee.
              </p>
            </div>

            {/* Sub-Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-mist-border bg-paper p-4">
                <p className="text-xs text-ink-muted">Net Monthly Opportunity</p>
                <p className={`mt-1 font-mono text-2xl font-bold ${outputs.isCostPositive ? "text-teal-700" : "text-coral-700"}`}>
                  {formatINR(outputs.netOpportunityINR)}
                </p>
                <p className="mt-1 text-[11px] text-ink-muted">
                  After {formatINR(inputs.monthlyReminderCostINR)} reminder expense
                </p>
              </div>

              <div className="rounded-lg border border-mist-border bg-paper p-4">
                <p className="text-xs text-ink-muted">Effective No-Show Rate</p>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="font-mono text-2xl font-bold text-midnight">
                    {outputs.effectiveNoShowRatePercent}%
                  </span>
                  <span className="font-mono text-xs text-ink-muted line-through">
                    {inputs.currentNoShowRatePercent}%
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-teal-700 font-medium">
                  {inputs.expectedRelativeReductionPercent}% relative improvement
                </p>
              </div>

              <div className="rounded-lg border border-mist-border bg-paper p-4">
                <p className="text-xs text-ink-muted">Monthly Appointments</p>
                <p className="mt-1 font-mono text-2xl font-bold text-midnight">
                  {outputs.monthlyAppointments}
                </p>
                <p className="mt-1 text-[11px] text-ink-muted">
                  Based on 4.33 weeks per month
                </p>
              </div>

              <div className="rounded-lg border border-mist-border bg-paper p-4">
                <p className="text-xs text-ink-muted">Estimated Recovered Slots</p>
                <p className="mt-1 font-mono text-2xl font-bold text-teal-700">
                  {outputs.appointmentsAvoided}
                </p>
                <p className="mt-1 text-[11px] text-ink-muted">
                  from {outputs.currentMissedAppointments} baseline no-shows
                </p>
              </div>
            </div>
          </div>

          {/* Mandatory Non-Causal Legal Disclaimer */}
          <div className="rounded-xl border border-mist-border bg-mist/50 p-4 text-xs text-ink space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-midnight">
              <Info className="h-4 w-4 text-teal flex-shrink-0" />
              <span>Statistical & Non-Causal Disclaimer</span>
            </div>
            <p className="leading-relaxed text-[11px] text-ink-muted">
              {CALCULATOR_DISCLAIMER}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
