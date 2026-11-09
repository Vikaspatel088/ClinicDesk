import React from "react";
import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-paper text-midnight">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-20 px-6">
        <div className="max-w-md mx-auto text-center space-y-5">
          <div className="h-16 w-16 rounded-2xl bg-midnight text-teal flex items-center justify-center mx-auto shadow-editorial">
            <Compass className="h-8 w-8" />
          </div>

          <span className="font-mono text-xs uppercase text-teal font-bold tracking-wider">
            HTTP 404 • CLINICAL PAGE NOT FOUND
          </span>

          <h1 className="font-serif text-3xl font-normal text-midnight">
            This clinical record or page does not exist.
          </h1>

          <p className="text-xs text-ink leading-relaxed">
            The link you followed may be outdated or the page has been relocated within the ClinicDesk workspace.
          </p>

          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-midnight px-5 py-2.5 text-xs font-semibold text-paper hover:bg-midnight-800 transition-colors shadow-sm"
            >
              <ArrowLeft className="h-3.5 w-3.5 text-teal" />
              <span>Return to ClinicDesk Home</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
