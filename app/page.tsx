"use client";

import { useState, useEffect, useMemo } from "react";
import { calculateFromGross, calculateFromNet } from "@/service/tax-service";
import { getExchangeRate } from "@/service/exchange-service";
import { JsonLd } from "@/components/seo/JsonLd";
import { SalaryForm } from "@/components/calculator/SalaryForm";
import { TaxBreakdown } from "@/components/calculator/TaxBreakdown";
import { ResultCard } from "@/components/calculator/ResultCard";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, CalendarDays, PlaneTakeoff } from "lucide-react";
import Link from "next/link";

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
  const results = useMemo(() => {
    return mode === "brut"
        ? calculateFromGross(inputValue, exchangeRate, eurExchangeRate, isH2)
        : calculateFromNet(inputValue, exchangeRate, eurExchangeRate, isH2);
  }, [inputValue, mode, isH2, exchangeRate, eurExchangeRate]);

  return (
      <main className="min-h-screen bg-slate-50 py-12 px-4 md:px-8">
        <JsonLd />
        <div className="max-w-5xl mx-auto space-y-10">

          {/* Header Section */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100">
                  FISCAL {new Date().getFullYear()}
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                Calculator Salariu <span className="text-indigo-600">RO</span>
              </h1>
            </div>
            <p className="text-slate-500 text-sm md:text-right max-w-xs italic font-medium">
              Calculați salariul net și taxele conform grilei de impozitare actualizate pentru {new Date().getFullYear()}.
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

              {/* Minimalist Switch Card */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex items-center justify-between transition-all hover:border-indigo-200">
                <div className="space-y-1">
                  <Label className="font-bold text-slate-800">Varianta Iulie 2026</Label>
                  <p className="text-xs text-slate-500">Prag salariu minim (4.325 RON)</p>
                </div>
                <Switch checked={isH2} onCheckedChange={setIsH2} />
              </div>

              {/* NEW: Navigation to Calendar (The Smart Planner Card) */}
              <Link href="/calendar" className="block group">
                <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-7 rounded-[2rem] text-white shadow-xl shadow-indigo-100 relative overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] border border-white/10">
                  <CalendarDays className="absolute -right-4 -bottom-4 w-28 h-28 text-white/10 -rotate-12 group-hover:rotate-0 transition-transform duration-500" />
                  <div className="relative z-10 space-y-5">
                    <div className="bg-white/20 w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-md">
                      <PlaneTakeoff className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-black text-xl leading-tight tracking-tight">Zile Libere {new Date().getFullYear()}</h3>
                      <p className="text-indigo-100/80 text-sm mt-1 font-medium">
                        Vezi zilele libere legale și punctele de optimizare pentru {new Date().getFullYear()}.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-white text-indigo-700 w-fit px-4 py-2 rounded-xl shadow-sm">
                      Deschide Calendarul <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Results Column */}
            <div className="lg:col-span-7 space-y-6">
              <ResultCard net={results.net} />
              <TaxBreakdown data={results} />
            </div>
          </div>

          {/* Explanatory Content Section — how the calculation works */}
          <section className="pt-10 border-t border-slate-200">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Cum se calculează salariul net în România în {new Date().getFullYear()}?
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Diferența dintre salariul brut trecut în contract și suma care ajunge efectiv în cont este
                dată de trei rețineri obligatorii, aplicate de angajator direct pe statul de plată:
                Contribuția de Asigurări Sociale (<strong>CAS</strong>, 25%, destinată pensiei), Contribuția
                de Asigurări Sociale de Sănătate (<strong>CASS</strong>, 10%) și impozitul pe venit
                (<strong>10%</strong>, calculat după deducerea CAS și CASS din baza de calcul). La acestea se
                adaugă, pentru angajator, Contribuția Asiguratorie pentru Muncă (CAM, 2,25%), care nu se scade
                din salariul angajatului, dar mărește costul total suportat de firmă.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-1">CAS — Pensie</p>
                  <p className="text-sm text-slate-600">25% din brut, direcționat spre pensia publică și, parțial, spre Pilonul II de pensii private.</p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-1">CASS — Sănătate</p>
                  <p className="text-sm text-slate-600">10% din brut, către sistemul public de asigurări de sănătate.</p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-1">Impozit pe Venit</p>
                  <p className="text-sm text-slate-600">10%, aplicat pe baza rămasă după scăderea CAS, CASS și a deducerii personale.</p>
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Angajații care au copii în întreținere sau sunt sub 26 de ani pot beneficia și de o{" "}
                <Link href="/blog/deduceri-personale-2026" className="text-indigo-600 underline font-medium">
                  deducere personală
                </Link>, care reduce suplimentar baza de calcul a impozitului. Calculatorul de mai sus aplică
                automat toate aceste reguli, actualizate conform pragurilor fiscale din {new Date().getFullYear()},
                inclusiv modificarea salariului minim intrată în vigoare din iulie. Pentru o analiză detaliată a
                fiecărei componente, sau pentru situații particulare (bonusuri, tichete de masă, concediu medical,
                muncă remote sau colaborare cu firme din străinătate), consultă ghidurile din{" "}
                <Link href="/blog" className="text-indigo-600 underline font-medium">secțiunea de blog</Link>.
              </p>
            </div>
          </section>

          {/* Blog Footer Section */}
          <section className="pt-2">
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 hover:border-indigo-300 transition-all">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                  <BookOpen className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 leading-tight">Ghiduri Fiscale {new Date().getFullYear()}</h3>
                  <p className="text-slate-500 text-sm">Află cum te afectează noile modificări legislative din România.</p>
                </div>
              </div>
              <Link
                  href="/blog"
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all group shadow-lg shadow-slate-200"
              >
                Citește Blogul
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </section>
        </div>
      </main>
  );
}
