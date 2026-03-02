"use client";

import { useState, useEffect, useMemo } from "react";
import { calculateFromGross, calculateFromNet } from "@/service/tax-service";
import { getExchangeRate } from "@/service/exchange-service";
import { SalaryForm } from "@/components/calculator/SalaryForm";
import { TaxBreakdown } from "@/components/calculator/TaxBreakdown";
import { ResultCard } from "@/components/calculator/ResultCard";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export default function CalculatorPage() {
  // --- State ---
  const [inputValue, setInputValue] = useState<number>(5000);
  const [mode, setMode] = useState<"brut" | "net">("brut");
  const [currency, setCurrency] = useState<"RON" | "EUR">("RON");
  const [isH2, setIsH2] = useState(false);
  const [exchangeRate, setExchangeRate] = useState<number>(4.97);
  const [eurExchangeRate, setEurExchangeRate] = useState<number>(4.97);
  const [isLoadingRate, setIsLoadingRate] = useState(true);

  // --- Effects ---
  useEffect(() => {
    async function updateEurRate() {
      try {
        const rate = await getExchangeRate("EUR");
        setEurExchangeRate(rate);
      } catch (error) {
        console.error("Failed to fetch rate", error);
      } finally {
        setIsLoadingRate(false);
      }
    }
    updateEurRate();
  }, []);

  // --- Effects ---
  useEffect(() => {
    async function updateRate() {
      try {
        const rate = await getExchangeRate(currency);
        setExchangeRate(rate);
      } catch (error) {
        console.error("Failed to fetch rate", error);
      } finally {
        setIsLoadingRate(false);
      }
    }
    updateRate();
  }, [currency]);

  // --- Memoized Calculation ---
  // We only re-run this heavy math when these specific dependencies change
  const results = useMemo(() => {
    console.log(calculateFromGross(inputValue, exchangeRate, eurExchangeRate, isH2));
    console.log(calculateFromNet(inputValue, exchangeRate, eurExchangeRate, isH2));
    return mode === "brut"
        ? calculateFromGross(inputValue, exchangeRate, eurExchangeRate, isH2)
        : calculateFromNet(inputValue, exchangeRate, eurExchangeRate, isH2);
  }, [inputValue, mode, isH2, exchangeRate, currency]);

  return (
      <main className="min-h-screen bg-slate-50 py-12 px-4 md:px-8">
        <div className="max-w-5xl mx-auto space-y-10">

          {/* Header Section */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100">
                  FISCAL 2026
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                Calculator Salariu <span className="text-indigo-600">RO</span>
              </h1>
            </div>
            <p className="text-slate-500 text-sm md:text-right max-w-xs italic">
              Calculați salariul net și taxele conform grilei de impozitare 2026.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Settings Column */}
            <div className="lg:col-span-5 space-y-6">
              <SalaryForm
                  value={inputValue}
                  exchangeRate={exchangeRate}
                  onChange={setInputValue}
                  mode={mode}
                  onModeChange={setMode}
                  currency={currency}
                  onCurrencyChange={setCurrency}
              />

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between transition-all hover:border-indigo-200">
                <div className="space-y-1">
                  <Label className="font-bold text-slate-800">Varianta Iulie 2026</Label>
                  <p className="text-xs text-slate-500">Ajustare prag salariu minim (4.325 RON)</p>
                </div>
                <Switch checked={isH2} onCheckedChange={setIsH2} />
              </div>
            </div>

            {/* Results Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Show Net in the currency the user preferred */}
              <ResultCard net={results.net} />

              <TaxBreakdown data={results} />
            </div>
          </div>
        </div>
      </main>
  );
}