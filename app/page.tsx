"use client";

import { useState } from "react";
import { calculateFromGross, calculateFromNet } from "@/service/tax-service";
import { SalaryForm } from "@/components/calculator/SalaryForm";
import { TaxBreakdown } from "@/components/calculator/TaxBreakdown";
import { ResultCard } from "@/components/calculator/ResultCard";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function CalculatorPage() {
  // 1. State Management
  const [inputValue, setInputValue] = useState<number>(5000);
  const [mode, setMode] = useState<"brut" | "net">("brut");
  const [currency, setCurrency] = useState<"RON" | "EUR">("RON");
  const [isH2, setIsH2] = useState(false);

  // 2. Logic Orchestration
  // We calculate the breakdown on every render based on the current state.
  const results = mode === "brut"
      ? calculateFromGross(inputValue, currency, isH2)
      : calculateFromNet(inputValue, currency, isH2);

  return (
      <main className="min-h-screen bg-slate-50 py-12 px-4 md:px-8">
        <div className="max-w-5xl mx-auto space-y-10">

          {/* Header Section */}
          <header className="text-center md:text-left space-y-2">
            <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full mb-2">
              FISCAL 2026 UPDATE
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              Calculator Salariu  <span className="text-indigo-600">Romania</span>
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl">
              Calculați salariul net, taxele și costurile totale de angajare conform
              Codului Fiscal actualizat (CIM).
            </p>
          </header>

          {/* Calculator Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left Column: Configuration (5 units wide) */}
            <div className="lg:col-span-5 space-y-6">
              <SalaryForm
                  value={inputValue}
                  onChange={setInputValue}
                  mode={mode}
                  onModeChange={setMode}
                  currency={currency}
                  onCurrencyChange={setCurrency}
              />

              {/* Fiscal Period Switcher */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="font-bold text-slate-800">Varianta Iulie 2026</Label>
                  <p className="text-xs text-slate-500">Include pragul de 4.325 RON brut.</p>
                </div>
                <Switch checked={isH2} onCheckedChange={setIsH2} />
              </div>

              <p className="text-[11px] text-slate-400 italic px-2">
                * Acest calculator oferă o estimare bazată pe valorile standard de deducere personală
                și cotele de CAS, CASS și Impozit pe Venit pentru anul 2026.
              </p>
            </div>

            {/* Right Column: Results (7 units wide) */}
            <div className="lg:col-span-7 space-y-6">
              {/* The ResultCard highlights the "Money in Hand" */}
              <ResultCard net={results.net} />

              {/* Detailed table of all tax subtractions */}
              <TaxBreakdown data={results} />

              {/* Quick Conversion Info for User Context */}
              {currency === 'RON' && (
                  <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl text-center">
                    <p className="text-sm text-indigo-600 font-medium">
                      Salariul tău valorează aproximativ <span className="font-bold">{results.net.eur} EUR</span> lunar.
                    </p>
                  </div>
              )}
            </div>
          </div>
        </div>
      </main>
  );
}