import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-mist-border bg-midnight text-paper pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-midnight-800">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal text-midnight font-serif text-lg font-bold">
                CD
              </div>
              <span className="font-serif text-2xl font-bold text-white">
                ClinicDesk
              </span>
              <span className="rounded bg-midnight-800 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-teal">
                India Edition
              </span>
            </div>

            <p className="font-serif text-lg text-midnight-100 max-w-sm italic">
              Run your clinic, not your calendar.
            </p>

            <p className="text-xs text-midnight-300 leading-relaxed max-w-sm">
              Practice-management software designed specifically for independent Indian outpatient doctors and multi-doctor clinics (1–5 practitioners).
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-teal">
              <span className="h-2 w-2 rounded-full bg-teal animate-pulse" />
              <span>Multi-Tenant PostgreSQL RLS Architecture</span>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-midnight-300">
              Product
            </p>
            <ul className="space-y-2 text-sm text-midnight-200">
              <li>
                <Link href="/features" className="hover:text-teal transition-colors">
                  Features Overview
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-teal transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/no-show-report" className="hover:text-teal transition-colors flex items-center gap-1">
                  <span>No-Show Intelligence</span>
                  <span className="rounded bg-teal/20 px-1.5 py-0.2 text-[10px] text-teal">Signature</span>
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-teal transition-colors">
                  Subscription Plans
                </Link>
              </li>
              <li>
                <Link href="/demo" className="hover:text-teal transition-colors">
                  Interactive Demo
                </Link>
              </li>
            </ul>
          </div>

          {/* Architecture & Trust */}
          <div className="space-y-3">
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-midnight-300">
              Trust & Security
            </p>
            <ul className="space-y-2 text-sm text-midnight-200">
              <li>
                <Link href="/security" className="hover:text-teal transition-colors flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-teal" />
                  <span>Tenant Isolation (RLS)</span>
                </Link>
              </li>
              <li>
                <Link href="/security#clinical-audit" className="hover:text-teal transition-colors">
                  Clinical Audit Logging
                </Link>
              </li>
              <li>
                <Link href="/security#data-residency" className="hover:text-teal transition-colors">
                  Indian Data Residency
                </Link>
              </li>
              <li>
                <Link href="/security#rbac" className="hover:text-teal transition-colors">
                  Role-Based Access
                </Link>
              </li>
            </ul>
          </div>

          {/* Practice Support & Company */}
          <div className="space-y-3">
            <p className="font-mono text-xs font-bold uppercase tracking-wider text-midnight-300">
              Company
            </p>
            <ul className="space-y-2 text-sm text-midnight-200">
              <li>
                <Link href="/about" className="hover:text-teal transition-colors">
                  Our Mission & Story
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-teal transition-colors">
                  Contact & Enquiries
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-teal transition-colors flex items-center gap-1">
                  <span>Clinic Portal Login</span>
                  <ArrowUpRight className="h-3 w-3 text-midnight-400" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Notice */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-midnight-300">
          <p>
            © {new Date().getFullYear()} ClinicDesk. All rights reserved. Developed for Indian outpatient clinics.
          </p>

          <div className="flex items-center gap-6 text-xs text-midnight-300">
            <Link href="/privacy" className="hover:text-paper transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-paper transition-colors">
              Terms of Service
            </Link>
            <Link href="/security" className="hover:text-paper transition-colors">
              Security Practices
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
