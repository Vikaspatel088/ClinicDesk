"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Features", href: "/features" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "No-Show Intelligence", href: "/no-show-report", badge: "Signature" },
  { label: "Pricing", href: "/pricing" },
  { label: "Security", href: "/security" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close mobile drawer when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Handle escape key to close drawer and return focus
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-mist-border bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Logo & Brand Identity */}
          <Link 
            href="/" 
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded-lg p-1"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-midnight text-teal font-serif text-xl font-bold shadow-sm group-hover:bg-midnight-800 transition-colors">
              CD
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-2xl font-bold tracking-tight text-midnight">
                  ClinicDesk
                </span>
                <span className="rounded bg-mist px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-ink">
                  India
                </span>
              </div>
              <p className="text-[11px] text-ink-muted hidden sm:block -mt-0.5 font-sans">
                Run your clinic, not your calendar.
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav 
            className="hidden lg:flex items-center gap-7 text-sm font-medium text-ink"
            aria-label="Main Navigation"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 py-1.5 transition-colors hover:text-teal focus:outline-none focus-visible:ring-2 focus-visible:ring-teal rounded ${
                    isActive ? "text-teal font-semibold" : "text-ink"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="rounded-full bg-teal-50 px-2 py-0.5 text-[10px] font-mono font-bold text-teal-800 border border-teal-200">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/contact"
              className="px-3.5 py-2 text-sm font-medium text-midnight hover:text-teal transition-colors rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-teal"
            >
              Contact
            </Link>
            <Link
              href="/login"
              className="px-3.5 py-2 text-sm font-medium text-midnight hover:text-teal transition-colors rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-teal"
            >
              Sign In
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center gap-1.5 rounded-lg bg-midnight px-4 py-2 text-sm font-medium text-paper hover:bg-midnight-800 transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-teal"
            >
              <span>Book Demo</span>
              <ArrowRight className="h-4 w-4 text-teal" />
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <Link
              href="/demo"
              className="rounded-lg bg-midnight px-3 py-1.5 text-xs font-medium text-paper"
            >
              Demo
            </Link>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-midnight hover:text-teal rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-teal"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={mobileMenuOpen ? "Close menu" : "Open main menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Accessible Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          id="mobile-navigation-drawer"
        >
          {/* Backdrop Overlay */}
          <div 
            className="fixed inset-0 bg-midnight/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Content */}
          <div 
            ref={drawerRef}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-paper p-6 shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-mist-border animate-in slide-in-from-right duration-200"
          >
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-mist">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-midnight text-teal font-serif text-lg font-bold">
                    CD
                  </div>
                  <span className="font-serif text-xl font-bold text-midnight">
                    ClinicDesk
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg p-1.5 text-ink hover:bg-mist focus:outline-none focus:ring-2 focus:ring-teal"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="mt-6 flex flex-col gap-1">
                {NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                        isActive 
                          ? "bg-midnight text-paper" 
                          : "text-ink hover:bg-mist hover:text-midnight"
                      }`}
                    >
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="rounded-full bg-teal-50 px-2 py-0.5 text-[10px] font-mono font-bold text-teal-800 border border-teal-200">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    pathname === "/contact" ? "bg-midnight text-paper" : "text-ink hover:bg-mist"
                  }`}
                >
                  Contact & Inquiries
                </Link>
              </nav>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="pt-6 border-t border-mist space-y-3">
              <Link
                href="/demo"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-midnight py-3 text-sm font-semibold text-paper hover:bg-midnight-800 transition-colors shadow-sm"
              >
                <span>Book a Demo</span>
                <ArrowRight className="h-4 w-4 text-teal" />
              </Link>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center rounded-lg border border-mist-border bg-white py-2.5 text-sm font-medium text-midnight hover:bg-mist transition-colors"
              >
                Clinic Sign In
              </Link>
              <p className="text-center font-mono text-[11px] text-ink-muted pt-2">
                Independent Indian Clinics (1–5 Doctors)
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
