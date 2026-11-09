"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Calendar, 
  Users, 
  FileCheck2, 
  MessageSquare, 
  Receipt, 
  TrendingDown, 
  CheckCircle2, 
  Clock, 
  Search, 
  ChevronRight,
  Sparkles,
  Info,
  ShieldCheck,
  IndianRupee,
  Activity,
  ArrowRight
} from "lucide-react";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { formatINR } from "@/lib/utils";

type DemoTab = "dashboard" | "appointments" | "patients" | "reminders" | "billing" | "analytics";

const SYNTHETIC_APPOINTMENTS = [
  { id: "1", token: "#01", time: "09:30 AM", patient: "Ramesh Iyer", age: "48 M", doctor: "Dr. Rajesh Sharma", status: "COMPLETED", type: "Follow-up", fee: 600 },
  { id: "2", token: "#02", time: "09:45 AM", patient: "Sunita Verma", age: "42 F", doctor: "Dr. Rajesh Sharma", status: "COMPLETED", type: "Routine", fee: 600 },
  { id: "3", token: "#03", time: "10:00 AM", patient: "Meera Kulkarni", age: "29 F", doctor: "Dr. Ananya Roy", status: "IN_CONSULTATION", type: "New Consult", fee: 800 },
  { id: "4", token: "#04", time: "10:15 AM", patient: "Amitabh Sengupta", age: "58 M", doctor: "Dr. Rajesh Sharma", status: "CHECKED_IN", type: "Follow-up", fee: 600 },
  { id: "5", token: "#05", time: "10:30 AM", patient: "Kavita Narang", age: "34 F", doctor: "Dr. Rajesh Sharma", status: "CONFIRMED", type: "New Consult", fee: 600 },
  { id: "6", token: "#06", time: "10:45 AM", patient: "Rohan Mathur", age: "45 M", doctor: "Dr. Ananya Roy", status: "SCHEDULED", type: "Procedure", fee: 1200 },
];

const SYNTHETIC_PATIENTS = [
  { mrn: "MRN-2026-089", name: "Sunita Verma", phone: "+91 98201 44556", age: "42 F", lastVisit: "Today", allergy: "None reported", chronic: "Hypertension (3 yrs)" },
  { mrn: "MRN-2026-114", name: "Amitabh Sengupta", phone: "+91 97654 33221", age: "58 M", lastVisit: "14 Oct 2026", allergy: "Penicillin", chronic: "Type 2 Diabetes, Dyslipidemia" },
  { mrn: "MRN-2026-142", name: "Meera Kulkarni", phone: "+91 98450 99887", age: "29 F", lastVisit: "02 Sep 2026", allergy: "Sulfa Drugs", chronic: "PCOS" },
  { mrn: "MRN-2026-198", name: "Ramesh Iyer", phone: "+91 99001 77665", age: "48 M", lastVisit: "Today", allergy: "Aspirin", chronic: "GERD" },
];

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState<DemoTab>("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [tokenCounter, setTokenCounter] = useState(3);

  return (
    <div className="flex min-h-screen flex-col bg-paper text-midnight">
      <Navbar />

      <main className="flex-1">
        {/* Banner: Clear Sandbox Notice */}
        <div className="border-b border-mist bg-teal-50 px-4 py-2.5 text-xs text-teal-900">
          <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-2 font-mono">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-teal animate-pulse" />
              <span>INTERACTIVE CLINICDESK SANDBOX PREVIEW (100% SYNTHETIC DATA)</span>
            </div>
            <span className="text-[11px] text-teal-800">
              Zero live SMS or payment transactions executed
            </span>
          </div>
        </div>

        {/* Demo Navigation & Practice Selector */}
        <section className="bg-white border-b border-mist py-4">
          <div className="mx-auto max-w-7xl px-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-midnight text-teal font-serif text-lg font-bold">
                AF
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-serif text-lg font-bold text-midnight">
                    Aarogyam Family Health Clinic
                  </h2>
                  <span className="bg-paper border border-mist-border px-2 py-0.5 rounded font-mono text-[10px] text-ink-muted">
                    Mumbai OPD
                  </span>
                </div>
                <p className="text-xs text-ink-muted">
                  Dr. Rajesh Sharma (MD) & Dr. Ananya Roy (DNB) • Shift: Morning OPD
                </p>
              </div>
            </div>

            {/* Quick Demo Action */}
            <div className="flex items-center gap-2 text-xs">
              <span className="font-mono text-ink-muted hidden sm:inline">Active Token:</span>
              <button
                onClick={() => setTokenCounter((prev) => (prev >= 6 ? 1 : prev + 1))}
                className="inline-flex items-center gap-1.5 rounded-lg bg-midnight px-3 py-1.5 font-mono text-xs font-bold text-teal hover:bg-midnight-800 transition-colors"
                title="Simulate calling the next patient into the cabin"
              >
                <span>Call Next Token (#{tokenCounter.toString().padStart(2, "0")})</span>
              </button>
            </div>
          </div>
        </section>

        {/* Interactive Workspace Body */}
        <section className="py-8 md:py-12 bg-paper">
          <div className="mx-auto max-w-7xl px-6">
            {/* Tab Bar */}
            <div className="flex overflow-x-auto border-b border-mist bg-white rounded-t-xl px-4 pt-2 gap-2 text-xs font-medium">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`flex items-center gap-2 py-3 px-3.5 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === "dashboard"
                    ? "border-teal text-teal font-bold"
                    : "border-transparent text-ink hover:text-midnight"
                }`}
              >
                <Activity className="h-4 w-4" />
                <span>Today's Dashboard</span>
              </button>

              <button
                onClick={() => setActiveTab("appointments")}
                className={`flex items-center gap-2 py-3 px-3.5 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === "appointments"
                    ? "border-teal text-teal font-bold"
                    : "border-transparent text-ink hover:text-midnight"
                }`}
              >
                <Calendar className="h-4 w-4" />
                <span>Queue & Appointments</span>
              </button>

              <button
                onClick={() => setActiveTab("patients")}
                className={`flex items-center gap-2 py-3 px-3.5 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === "patients"
                    ? "border-teal text-teal font-bold"
                    : "border-transparent text-ink hover:text-midnight"
                }`}
              >
                <Users className="h-4 w-4" />
                <span>Patient Registry (MRN)</span>
              </button>

              <button
                onClick={() => setActiveTab("reminders")}
                className={`flex items-center gap-2 py-3 px-3.5 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === "reminders"
                    ? "border-teal text-teal font-bold"
                    : "border-transparent text-ink hover:text-midnight"
                }`}
              >
                <MessageSquare className="h-4 w-4" />
                <span>WhatsApp Pipeline</span>
              </button>

              <button
                onClick={() => setActiveTab("billing")}
                className={`flex items-center gap-2 py-3 px-3.5 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === "billing"
                    ? "border-teal text-teal font-bold"
                    : "border-transparent text-ink hover:text-midnight"
                }`}
              >
                <Receipt className="h-4 w-4" />
                <span>Invoicing & UPI</span>
              </button>

              <button
                onClick={() => setActiveTab("analytics")}
                className={`flex items-center gap-2 py-3 px-3.5 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === "analytics"
                    ? "border-teal text-teal font-bold"
                    : "border-transparent text-ink hover:text-midnight"
                }`}
              >
                <TrendingDown className="h-4 w-4 text-teal" />
                <span>No-Show Intelligence</span>
              </button>
            </div>

            {/* Tab Container */}
            <div className="rounded-b-xl border-x border-b border-mist-border bg-white p-6 shadow-editorial min-h-[450px]">
              {/* TAB 1: DASHBOARD */}
              {activeTab === "dashboard" && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  {/* Top Stats Row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="rounded-xl border border-mist-border bg-paper p-4">
                      <p className="text-xs text-ink-muted">Today's Total Slots</p>
                      <p className="mt-1 font-mono text-2xl font-bold text-midnight">24</p>
                      <p className="mt-1 text-[11px] text-teal font-medium">18 Booked • 6 Walk-ins</p>
                    </div>

                    <div className="rounded-xl border border-mist-border bg-paper p-4">
                      <p className="text-xs text-ink-muted">Waiting in Lounge</p>
                      <p className="mt-1 font-mono text-2xl font-bold text-midnight">3</p>
                      <p className="mt-1 text-[11px] text-ink-muted">Avg wait time: 11 mins</p>
                    </div>

                    <div className="rounded-xl border border-mist-border bg-paper p-4">
                      <p className="text-xs text-ink-muted">Collected Fees (Today)</p>
                      <p className="mt-1 font-mono text-2xl font-bold text-teal">₹8,400</p>
                      <p className="mt-1 text-[11px] text-ink-muted">14 Visits reconciled</p>
                    </div>

                    <div className="rounded-xl border border-mist-border bg-paper p-4">
                      <p className="text-xs text-ink-muted">No-Show Rate (30D)</p>
                      <p className="mt-1 font-mono text-2xl font-bold text-midnight">8.8%</p>
                      <p className="mt-1 text-[11px] text-teal font-medium">↓ from 24.2% baseline</p>
                    </div>
                  </div>

                  {/* Live Activity Breakdown */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-8 space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-mist">
                        <h4 className="font-serif font-bold text-midnight text-base">
                          Current Morning Queue Progression
                        </h4>
                        <span className="font-mono text-xs text-ink-muted">Dr. Rajesh Sharma's Cabin</span>
                      </div>

                      <div className="space-y-2 text-xs">
                        {SYNTHETIC_APPOINTMENTS.slice(0, 4).map((item) => (
                          <div 
                            key={item.id} 
                            className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                              item.status === "IN_CONSULTATION" 
                                ? "bg-teal-50 border-teal-300" 
                                : "bg-paper border-mist"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="font-mono font-bold bg-white px-2 py-1 rounded border border-mist-border text-midnight">
                                {item.token}
                              </span>
                              <div>
                                <p className="font-semibold text-midnight">{item.patient} ({item.age})</p>
                                <p className="text-ink-muted text-[11px]">{item.doctor} • {item.type}</p>
                              </div>
                            </div>
                            <span className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold ${
                              item.status === "COMPLETED" ? "bg-mist text-ink" :
                              item.status === "IN_CONSULTATION" ? "bg-teal text-white" :
                              "bg-emerald-50 text-emerald-800 border border-emerald-200"
                            }`}>
                              {item.status.replace("_", " ")}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-4 space-y-3">
                      <div className="pb-2 border-b border-mist">
                        <h4 className="font-serif font-bold text-midnight text-base">
                          WhatsApp Automation Feed
                        </h4>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-emerald-950">
                          <p className="font-mono text-[10px] text-emerald-800">10:02 AM • Confirmation Received</p>
                          <p className="mt-1 font-semibold">Amitabh Sengupta replied "1"</p>
                          <p className="text-[11px] text-emerald-800">Status changed to Confirmed.</p>
                        </div>
                        <div className="rounded-lg bg-paper border border-mist p-3 text-ink">
                          <p className="font-mono text-[10px] text-ink-muted">09:45 AM • Reminder Dispatched</p>
                          <p className="mt-1 font-semibold">SMS sent to Kavita Narang</p>
                          <p className="text-[11px] text-ink-muted">Scheduled for 10:30 AM.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: APPOINTMENTS */}
              {activeTab === "appointments" && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-mist">
                    <div>
                      <h4 className="font-serif font-bold text-midnight text-lg">
                        Today's Scheduled Appointments & Walk-ins
                      </h4>
                      <p className="text-xs text-ink-muted">09 Nov 2026 • 2 Doctors Active</p>
                    </div>
                    <button
                      onClick={() => alert("Walk-In Modal: Available in Phase 3 full workspace.")}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-midnight px-3 py-1.5 text-xs font-semibold text-paper"
                    >
                      <span>+ Register Walk-In</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-mist font-mono text-ink-muted">
                          <th className="py-2.5">Token</th>
                          <th className="py-2.5">Time</th>
                          <th className="py-2.5">Patient</th>
                          <th className="py-2.5">Doctor</th>
                          <th className="py-2.5">Type</th>
                          <th className="py-2.5">Status</th>
                          <th className="py-2.5 text-right">Fee</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-mist/60 font-sans">
                        {SYNTHETIC_APPOINTMENTS.map((appt) => (
                          <tr key={appt.id} className="hover:bg-paper/60">
                            <td className="py-3 font-mono font-bold text-midnight">{appt.token}</td>
                            <td className="py-3 font-mono text-ink-muted">{appt.time}</td>
                            <td className="py-3 font-semibold text-midnight">{appt.patient} ({appt.age})</td>
                            <td className="py-3 text-ink">{appt.doctor}</td>
                            <td className="py-3 text-ink-muted">{appt.type}</td>
                            <td className="py-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                                appt.status === "COMPLETED" ? "bg-mist text-ink" :
                                appt.status === "IN_CONSULTATION" ? "bg-teal text-white" :
                                appt.status === "CHECKED_IN" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" :
                                "bg-amber-50 text-amber-800 border border-amber-200"
                              }`}>
                                {appt.status.replace("_", " ")}
                              </span>
                            </td>
                            <td className="py-3 text-right font-mono font-bold text-midnight">{formatINR(appt.fee)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 3: PATIENTS */}
              {activeTab === "patients" && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-mist">
                    <div>
                      <h4 className="font-serif font-bold text-midnight text-lg">
                        Patient Medical Registry
                      </h4>
                      <p className="text-xs text-ink-muted">Search by 10-digit mobile number or patient MRN</p>
                    </div>
                    <div className="relative">
                      <Search className="h-4 w-4 absolute left-3 top-2.5 text-ink-muted" />
                      <input
                        type="text"
                        placeholder="Search phone or name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="rounded-lg border border-mist-border pl-9 pr-4 py-1.5 text-xs text-midnight focus:outline-none focus:ring-2 focus:ring-teal"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {SYNTHETIC_PATIENTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.phone.includes(searchQuery)).map((p) => (
                      <div key={p.mrn} className="rounded-xl border border-mist-border bg-paper p-4 space-y-2">
                        <div className="flex items-center justify-between border-b border-mist pb-2">
                          <div>
                            <span className="font-serif font-bold text-midnight text-sm">{p.name}</span>
                            <span className="ml-2 font-mono text-[11px] text-ink-muted">({p.age})</span>
                          </div>
                          <span className="font-mono text-xs font-semibold text-teal">{p.mrn}</span>
                        </div>
                        <div className="text-xs space-y-1 text-ink">
                          <p><strong className="text-midnight">Phone:</strong> <span className="font-mono">{p.phone}</span></p>
                          <p><strong className="text-coral">Allergies:</strong> {p.allergy}</p>
                          <p><strong className="text-midnight">Chronic Conditions:</strong> {p.chronic}</p>
                          <p className="text-[11px] text-ink-muted pt-1">Last Visit: {p.lastVisit}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: REMINDERS */}
              {activeTab === "reminders" && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="pb-3 border-b border-mist">
                    <h4 className="font-serif font-bold text-midnight text-lg">
                      Automated Multi-Channel Reminder Pipeline
                    </h4>
                    <p className="text-xs text-ink-muted">Dispatches via WhatsApp & SMS at 24-hour and 2-hour thresholds</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="rounded-xl border border-mist-border bg-paper p-5 space-y-3">
                      <span className="font-mono text-xs font-bold text-teal uppercase">Template 01: 24h WhatsApp Notice</span>
                      <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4 text-xs text-emerald-950 font-sans leading-relaxed">
                        "Namaste Amitabh Ji, this is a reminder from Aarogyam Health Clinic for your follow-up appointment with Dr. Rajesh Sharma tomorrow at 10:15 AM (Token #04). Please reply 1 to Confirm or 9 to Reschedule."
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-ink-muted">
                        <span>Delivery: WhatsApp Business API</span>
                        <span className="text-emerald-700 font-bold">Confirmed via Reply</span>
                      </div>
                    </div>

                    <div className="rounded-xl border border-mist-border bg-paper p-5 space-y-3">
                      <span className="font-mono text-xs font-bold text-teal uppercase">Template 02: 2h SMS Route</span>
                      <div className="rounded-lg bg-white border border-mist p-4 text-xs text-ink font-sans leading-relaxed">
                        "Aarogyam Clinic: Your appointment is in 2 hours at 10:30 AM with Dr. Sharma (Token #05). Address: 2nd Floor, Linking Road, Bandra. Kindly arrive 10 mins prior."
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-ink-muted">
                        <span>Delivery: SMS Gateway (DLT Approved)</span>
                        <span className="text-teal font-bold">Delivered</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: BILLING */}
              {activeTab === "billing" && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between pb-3 border-b border-mist">
                    <div>
                      <h4 className="font-serif font-bold text-midnight text-lg">
                        Daily Invoicing & Payment Reconciliation
                      </h4>
                      <p className="text-xs text-ink-muted">Aarogyam Clinic • GSTIN: 27AABCA1234F1Z0</p>
                    </div>
                    <span className="font-mono text-xs font-bold text-teal bg-teal-50 px-2.5 py-1 rounded border border-teal-200">
                      Today: ₹8,400 Reconciled
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="rounded-lg border border-mist-border bg-paper p-3">
                      <p className="text-ink-muted">UPI (PhonePe / GPay)</p>
                      <p className="font-mono text-xl font-bold text-midnight mt-1">₹6,200</p>
                      <p className="text-[10px] text-ink-muted mt-0.5">10 Transactions</p>
                    </div>
                    <div className="rounded-lg border border-mist-border bg-paper p-3">
                      <p className="text-ink-muted">Cash Collected</p>
                      <p className="font-mono text-xl font-bold text-midnight mt-1">₹2,200</p>
                      <p className="text-[10px] text-ink-muted mt-0.5">4 Transactions</p>
                    </div>
                    <div className="rounded-lg border border-mist-border bg-paper p-3">
                      <p className="text-ink-muted">Unpaid / Outstanding</p>
                      <p className="font-mono text-xl font-bold text-coral mt-1">₹0.00</p>
                      <p className="text-[10px] text-ink-muted mt-0.5">All cleared today</p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: ANALYTICS */}
              {activeTab === "analytics" && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between pb-3 border-b border-mist">
                    <div>
                      <h4 className="font-serif font-bold text-midnight text-lg">
                        No-Show Intelligence Executive Summary
                      </h4>
                      <p className="text-xs text-ink-muted">Comparison: 30 Days Pre-Reminder vs. 30 Days Post-Reminder</p>
                    </div>
                    <span className="rounded bg-paper border border-mist-border px-2.5 py-0.5 font-mono text-xs text-ink-muted">
                      Formula-Verified
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="rounded-xl border border-mist-border bg-paper p-4">
                      <span className="text-xs text-ink-muted">Pre-Reminder Baseline</span>
                      <p className="font-serif text-3xl font-bold text-midnight mt-1">24.2%</p>
                      <p className="text-[11px] text-coral mt-1">98 no-shows in 405 slots</p>
                    </div>
                    <div className="rounded-xl border border-teal-200 bg-teal-50/50 p-4">
                      <span className="text-xs text-teal-800 font-semibold">Post-Reminder Performance</span>
                      <p className="font-serif text-3xl font-bold text-teal mt-1">8.8%</p>
                      <p className="text-[11px] text-teal-900 mt-1">36 no-shows in 412 slots</p>
                    </div>
                    <div className="rounded-xl border border-mist-border bg-paper p-4">
                      <span className="text-xs text-ink-muted">Relative Attrition Reduction</span>
                      <p className="font-serif text-3xl font-bold text-midnight mt-1">63.6%</p>
                      <p className="text-[11px] text-teal font-medium mt-1">₹42,600 est. practice upside</p>
                    </div>
                  </div>

                  <div className="rounded-lg bg-mist/50 p-3 text-xs text-ink-muted flex items-start gap-2">
                    <Info className="h-4 w-4 text-teal mt-0.5 flex-shrink-0" />
                    <span>
                      All figures derived from audited fixture records. Denominators exclude clinic cancellations.
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Demo Bottom Guidance */}
        <section className="py-12 bg-white border-t border-mist">
          <div className="mx-auto max-w-4xl px-6 text-center space-y-4">
            <h3 className="font-serif text-2xl font-bold text-midnight">
              Ready to onboard your doctors and staff?
            </h3>
            <p className="text-xs text-ink max-w-md mx-auto">
              Our clinical implementation leads assist independent clinics with data migration and receptionist training.
            </p>
            <div className="pt-2 flex justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-midnight px-6 py-2.5 text-xs font-semibold text-paper hover:bg-midnight-800 transition-colors shadow-sm"
              >
                <span>Book Full Practice Consultation</span>
                <ArrowRight className="h-3.5 w-3.5 text-teal" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
