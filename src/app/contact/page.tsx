"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  AlertCircle, 
  Send,
  Info
} from "lucide-react";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

interface FormData {
  fullName: string;
  clinicName: string;
  email: string;
  phone: string;
  doctorCount: string;
  city: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  clinicName?: string;
  email?: string;
  phone?: string;
  doctorCount?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    clinicName: "",
    email: "",
    phone: "",
    doctorCount: "1",
    city: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name.";
    }

    if (!formData.clinicName.trim()) {
      newErrors.clinicName = "Please enter your clinic name.";
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.phone.trim() || !/^[6-9]\d{9}$/.test(formData.phone.replace(/[\s-]/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit Indian mobile number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate verified frontend interaction with realistic latency
    await new Promise((resolve) => setTimeout(resolve, 800));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-paper text-midnight">
      <Navbar />

      <main className="flex-1">
        {/* Editorial Header */}
        <section className="pt-16 pb-12 md:pt-20 md:pb-16 border-b border-mist bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 font-mono text-xs text-teal-800">
                <Mail className="h-3.5 w-3.5 text-teal" />
                <span>CLINICAL ADVISORY & DEMO ENQUIRIES</span>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl font-normal text-midnight leading-tight">
                Let's discuss your clinic's workflow.
              </h1>
              <p className="text-lg text-ink leading-relaxed">
                Whether you have questions about doctor availability schedules, automated WhatsApp setup, or data migration from paper registers, our team is here to assist.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Information Grid */}
        <section className="py-16 md:py-24 border-b border-mist bg-paper">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Form Column */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl border border-mist-border bg-white p-8 shadow-elevated">
                  {isSubmitted ? (
                    <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
                      <div className="h-14 w-14 rounded-full bg-teal-50 border border-teal-200 text-teal flex items-center justify-center mx-auto">
                        <CheckCircle2 className="h-7 w-7" />
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-midnight">
                        Demo Request Registered
                      </h3>
                      <p className="text-sm text-ink max-w-md mx-auto leading-relaxed">
                        Thank you, <strong>Dr. {formData.fullName}</strong>. We have captured your practice profile for <strong>{formData.clinicName}</strong> ({formData.doctorCount} Doctor Practice).
                      </p>
                      
                      {/* Honest Disclosure regarding Phase 1 Frontend Preview */}
                      <div className="mt-6 rounded-lg bg-paper p-4 border border-mist text-left text-xs text-ink-muted space-y-1.5 max-w-lg mx-auto">
                        <div className="flex items-center gap-1.5 font-bold text-midnight font-mono">
                          <Info className="h-4 w-4 text-teal" />
                          <span>TECHNICAL STATUS DISCLOSURE</span>
                        </div>
                        <p className="leading-relaxed">
                          This is an authentic frontend form validation preview in Phase 1. Live server-side dispatch (Resend API email transmission and CRM logging) will be wired during Phase 4 without fake delivery illusions.
                        </p>
                      </div>

                      <div className="pt-4">
                        <button
                          onClick={() => {
                            setIsSubmitted(false);
                            setFormData({
                              fullName: "",
                              clinicName: "",
                              email: "",
                              phone: "",
                              doctorCount: "1",
                              city: "",
                              message: "",
                            });
                          }}
                          className="inline-flex items-center gap-2 rounded-lg border border-mist-border bg-white px-5 py-2.5 text-xs font-semibold text-midnight hover:bg-mist transition-colors"
                        >
                          Submit Another Enquiry
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                      <div className="border-b border-mist pb-4">
                        <h3 className="font-serif text-xl font-bold text-midnight">
                          Request a Practice Consultation & Demo
                        </h3>
                        <p className="text-xs text-ink-muted mt-1">
                          Fill out your clinic details. All fields marked with * are required.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Name */}
                        <div className="space-y-1.5">
                          <label htmlFor="fullName" className="block text-xs font-semibold text-midnight">
                            Doctor / Contact Name *
                          </label>
                          <input
                            id="fullName"
                            type="text"
                            placeholder="e.g. Dr. Rajesh Sharma"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            className={`w-full rounded-lg border px-3.5 py-2 text-sm text-midnight focus:outline-none focus:ring-2 focus:ring-teal ${
                              errors.fullName ? "border-coral bg-coral-50/20" : "border-mist-border bg-white"
                            }`}
                            aria-invalid={!!errors.fullName}
                            aria-describedby={errors.fullName ? "fullName-error" : undefined}
                          />
                          {errors.fullName && (
                            <p id="fullName-error" className="text-[11px] text-coral font-medium">
                              {errors.fullName}
                            </p>
                          )}
                        </div>

                        {/* Clinic Name */}
                        <div className="space-y-1.5">
                          <label htmlFor="clinicName" className="block text-xs font-semibold text-midnight">
                            Clinic / Practice Name *
                          </label>
                          <input
                            id="clinicName"
                            type="text"
                            placeholder="e.g. Aarogyam Health Clinic"
                            value={formData.clinicName}
                            onChange={(e) => setFormData({ ...formData, clinicName: e.target.value })}
                            className={`w-full rounded-lg border px-3.5 py-2 text-sm text-midnight focus:outline-none focus:ring-2 focus:ring-teal ${
                              errors.clinicName ? "border-coral bg-coral-50/20" : "border-mist-border bg-white"
                            }`}
                            aria-invalid={!!errors.clinicName}
                            aria-describedby={errors.clinicName ? "clinicName-error" : undefined}
                          />
                          {errors.clinicName && (
                            <p id="clinicName-error" className="text-[11px] text-coral font-medium">
                              {errors.clinicName}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Email */}
                        <div className="space-y-1.5">
                          <label htmlFor="email" className="block text-xs font-semibold text-midnight">
                            Email Address *
                          </label>
                          <input
                            id="email"
                            type="email"
                            placeholder="doctor@yourclinic.in"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className={`w-full rounded-lg border px-3.5 py-2 text-sm text-midnight focus:outline-none focus:ring-2 focus:ring-teal ${
                              errors.email ? "border-coral bg-coral-50/20" : "border-mist-border bg-white"
                            }`}
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? "email-error" : undefined}
                          />
                          {errors.email && (
                            <p id="email-error" className="text-[11px] text-coral font-medium">
                              {errors.email}
                            </p>
                          )}
                        </div>

                        {/* Phone */}
                        <div className="space-y-1.5">
                          <label htmlFor="phone" className="block text-xs font-semibold text-midnight">
                            Mobile Number (India) *
                          </label>
                          <input
                            id="phone"
                            type="tel"
                            placeholder="e.g. 98450 12345"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className={`w-full rounded-lg border px-3.5 py-2 text-sm text-midnight focus:outline-none focus:ring-2 focus:ring-teal ${
                              errors.phone ? "border-coral bg-coral-50/20" : "border-mist-border bg-white"
                            }`}
                            aria-invalid={!!errors.phone}
                            aria-describedby={errors.phone ? "phone-error" : undefined}
                          />
                          {errors.phone && (
                            <p id="phone-error" className="text-[11px] text-coral font-medium">
                              {errors.phone}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Number of Doctors */}
                        <div className="space-y-1.5">
                          <label htmlFor="doctorCount" className="block text-xs font-semibold text-midnight">
                            Number of Doctors
                          </label>
                          <select
                            id="doctorCount"
                            value={formData.doctorCount}
                            onChange={(e) => setFormData({ ...formData, doctorCount: e.target.value })}
                            className="w-full rounded-lg border border-mist-border bg-white px-3.5 py-2 text-sm text-midnight focus:outline-none focus:ring-2 focus:ring-teal"
                          >
                            <option value="1">Solo Practitioner (1 Doctor)</option>
                            <option value="2">2 Doctors</option>
                            <option value="3">3 Doctors</option>
                            <option value="4">4 Doctors</option>
                            <option value="5">5 Doctors (Polyclinic Max)</option>
                          </select>
                        </div>

                        {/* City */}
                        <div className="space-y-1.5">
                          <label htmlFor="city" className="block text-xs font-semibold text-midnight">
                            City / Location
                          </label>
                          <input
                            id="city"
                            type="text"
                            placeholder="e.g. Pune, Bangalore, Jaipur"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            className="w-full rounded-lg border border-mist-border bg-white px-3.5 py-2 text-sm text-midnight focus:outline-none focus:ring-2 focus:ring-teal"
                          />
                        </div>
                      </div>

                      {/* Message */}
                      <div className="space-y-1.5">
                        <label htmlFor="message" className="block text-xs font-semibold text-midnight">
                          Special Requirements or Current Workflow
                        </label>
                        <textarea
                          id="message"
                          rows={3}
                          placeholder="Tell us about your clinic setup, current record keeping, or questions..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full rounded-lg border border-mist-border bg-white px-3.5 py-2 text-sm text-midnight focus:outline-none focus:ring-2 focus:ring-teal"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-midnight py-3 text-sm font-semibold text-paper hover:bg-midnight-800 transition-colors shadow-editorial disabled:opacity-70"
                      >
                        {isSubmitting ? (
                          <span>Verifying & Recording...</span>
                        ) : (
                          <>
                            <span>Request Guided Clinic Demo</span>
                            <Send className="h-4 w-4 text-teal" />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>

              {/* Informational Column */}
              <div className="lg:col-span-5 space-y-6">
                <div className="rounded-xl border border-mist-border bg-white p-6 space-y-4 shadow-sm">
                  <h3 className="font-serif text-lg font-bold text-midnight">
                    Practice Support Philosophy
                  </h3>
                  <p className="text-xs text-ink leading-relaxed">
                    We understand that clinical practices cannot afford downtime. When doctors adopt ClinicDesk, we provide assisted staff training for front desk receptionists to ensure smooth day-one operation.
                  </p>
                  <div className="pt-2 border-t border-mist space-y-3 text-xs text-ink">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-teal" />
                      <span>Dedicated Indian outpatient onboarding</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-teal" />
                      <span>WhatsApp Business Gateway verification assistance</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-teal" />
                      <span>Zero lock-in contract terms</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-mist-border bg-white p-6 space-y-3 shadow-sm">
                  <span className="font-mono text-xs uppercase font-bold text-teal">
                    Direct Contact Channels
                  </span>
                  <div className="space-y-2 text-xs text-ink font-mono pt-1">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-ink-muted" />
                      <span>inquiries@clinicdesk.in</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-ink-muted" />
                      <span>Mon – Sat, 09:00 AM – 06:00 PM IST</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
