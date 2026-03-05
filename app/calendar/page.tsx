"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getBankHolidays } from '@/service/calendar-service';
import {
    CalendarDays,
    Sparkles,
    PlaneTakeoff,
    Clock,
    ChevronLeft,
    ChevronRight,
    Info,
    Timer,
    ArrowLeft,
    Calculator
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const parseLocalDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
};

export default function BankHolidaysPage() {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [holidays, setHolidays] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    useEffect(() => {
        async function load() {
            setLoading(true);
            try {
                const data = await getBankHolidays(selectedYear);
                setHolidays(data || []);
            } catch (error) {
                setHolidays([]);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [selectedYear]);

    // --- Logic: Find Next Holiday & Countdown ---
    const nextHoliday = React.useMemo(() => {
        return holidays
            .map(h => ({ ...h, jsDate: parseLocalDate(h.date) }))
            .find(h => h.jsDate >= today);
    }, [holidays]);

    const daysUntil = nextHoliday
        ? Math.ceil((nextHoliday.jsDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
        : null;

    // --- Logic: PTO Suggestions (Validated Bridges) ---
    const ptoSuggestions = React.useMemo(() => {
        const holidayDates = new Set(holidays.map(h => h.date));
        return holidays.map(h => {
            const d = parseLocalDate(h.date);
            const day = d.getDay();
            let ptoCandidate: Date | null = null;

            if (day === 2) ptoCandidate = new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1);
            if (day === 4) ptoCandidate = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);

            if (ptoCandidate) {
                const ptoStr = ptoCandidate.toISOString().split('T')[0];
                if (!holidayDates.has(ptoStr) && ptoCandidate >= today) {
                    return { date: ptoCandidate, ref: h.name, total: 4 };
                }
            }
            return null;
        }).filter(s => s !== null).slice(0, 3);
    }, [holidays, selectedYear]);

    return (
        <div className="max-w-[1000px] mx-auto py-8 px-4 space-y-10 relative min-h-screen">

            {/* 1. Navigation Breadcrumb */}
            <nav className="flex items-center justify-between">
                <Link
                    href="/"
                    className="group flex items-center gap-3 text-slate-500 hover:text-indigo-600 transition-all font-bold text-sm"
                >
                    <div className="p-2 bg-white border border-slate-200 rounded-xl group-hover:border-indigo-200 group-hover:bg-indigo-50 transition-all shadow-sm">
                        <ArrowLeft size={16} />
                    </div>
                    Înapoi la Calculator
                </Link>
                <Badge variant="outline" className="hidden sm:flex border-slate-200 text-slate-400 font-bold px-4 py-1 rounded-full uppercase tracking-widest text-[10px]">
                    Planner Liber 2026
                </Badge>
            </nav>

            {/* 2. Year Navigator Header */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-slate-100">
                <div className="text-left space-y-1">
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">
                        Zile Libere <span className="text-indigo-600 italic tracking-tighter">{selectedYear}</span>
                    </h2>
                    <p className="text-slate-500 text-sm font-medium">Explorează calendarul și planifică-ți punțile ideale.</p>
                </div>

                <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
                    <button
                        onClick={() => setSelectedYear(v => v - 1)}
                        className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400 hover:text-indigo-600"
                    >
                        <ChevronLeft size={24} strokeWidth={2.5} />
                    </button>
                    <div className="px-6 py-2 bg-indigo-50 rounded-xl text-indigo-700 font-black text-xl min-w-[100px] text-center">
                        {selectedYear}
                    </div>
                    <button
                        onClick={() => setSelectedYear(v => v + 1)}
                        className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400 hover:text-indigo-600"
                    >
                        <ChevronRight size={24} strokeWidth={2.5} />
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="py-32 flex flex-col items-center justify-center space-y-4">
                    <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                    <p className="text-slate-400 font-bold tracking-widest uppercase text-xs">Se încarcă anul {selectedYear}...</p>
                </div>
            ) : holidays.length === 0 ? (
                <div className="py-20 text-center bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
                    <Info className="text-slate-300 mx-auto mb-4" size={48} />
                    <h3 className="text-slate-600 font-bold">Date indisponibile</h3>
                    <p className="text-slate-400 text-sm">Nu am găsit sărbători legale pentru {selectedYear}.</p>
                </div>
            ) : (
                <>
                    {/* 3. Countdown Hero */}
                    {nextHoliday && daysUntil !== null && selectedYear === today.getFullYear() && (
                        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-indigo-200 relative overflow-hidden">
                            <Timer className="absolute -right-6 -top-6 w-48 h-48 text-white/10 -rotate-12" />
                            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="space-y-2">
                                    <p className="text-indigo-100 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                                        <Sparkles size={14} /> Următoarea pauză
                                    </p>
                                    <h3 className="text-4xl font-black tracking-tight">{nextHoliday.name}</h3>
                                    <p className="text-indigo-100/80 text-sm font-medium">
                                        {nextHoliday.jsDate.toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', weekday: 'long' })}
                                    </p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-md border border-white/20 px-8 py-5 rounded-[2rem] text-center min-w-[160px]">
                                    <span className="block text-6xl font-black mb-1 leading-none">{daysUntil}</span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-100">Zile rămase</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 4. Glassmorphism PTO Suggestions */}
                    {ptoSuggestions.length > 0 && (
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-[2.5rem] blur opacity-15"></div>
                            <div className="relative bg-white/60 backdrop-blur-2xl border border-white/50 rounded-[2.5rem] p-8 shadow-xl">
                                <div className="flex items-center gap-2 mb-6">
                                    <PlaneTakeoff size={20} className="text-indigo-600" />
                                    <h3 className="font-black text-slate-800 text-sm uppercase tracking-widest">Punți de Concediu Recomandate</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {ptoSuggestions.map((pto: any, idx) => (
                                        <div key={idx} className="bg-white/50 border border-indigo-50 p-5 rounded-3xl flex flex-col justify-between hover:bg-white transition-all shadow-sm">
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black text-indigo-500 uppercase">Solicită liber:</p>
                                                <p className="text-lg font-black text-slate-800">
                                                    {pto.date.toLocaleDateString('ro-RO', { day: 'numeric', month: 'long' })}
                                                </p>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase">{pto.date.toLocaleDateString('ro-RO', { weekday: 'long' })}</p>
                                            </div>
                                            <div className="mt-4 pt-4 border-t border-slate-50">
                         <span className="text-xs font-black text-emerald-600 uppercase tracking-tighter">
                           Vacanță de {pto.total} zile
                         </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 5. Holiday Grid (3 Columns) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {holidays.map((h, i) => {
                            const date = parseLocalDate(h.date);
                            const isPassed = date < today;
                            const isNext = nextHoliday && h.date === nextHoliday.date;

                            return (
                                <div key={i} className={`group flex flex-col p-6 rounded-[2.5rem] border transition-all duration-300 ${
                                    isPassed ? 'bg-slate-50/50 border-slate-100 opacity-60 grayscale' :
                                        isNext ? 'bg-white border-indigo-400 ring-4 ring-indigo-50 shadow-xl' : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-lg'
                                }`}>
                                    <div className="flex justify-between items-start mb-6">
                                        <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-black ${
                                            isPassed ? 'bg-slate-200 text-slate-500' : 'bg-indigo-600 text-white'
                                        }`}>
                                            <span className="text-xl leading-none">{date.getDate()}</span>
                                            <span className="text-[10px] uppercase">{date.toLocaleString('ro-RO', { month: 'short' })}</span>
                                        </div>
                                        {isNext && <span className="bg-indigo-600 text-white text-[9px] font-black px-2 py-1 rounded-lg uppercase shadow-sm">Urmează</span>}
                                    </div>
                                    <h4 className={`text-base font-black leading-tight mb-1 ${isPassed ? 'text-slate-400 line-through' : 'text-slate-900 group-hover:text-indigo-600 transition-colors'}`}>{h.name}</h4>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{date.toLocaleString('ro-RO', { weekday: 'long' })}</p>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}

            {/* 6. Mobile Floating Action Button (FAB) */}
            <div className="fixed bottom-8 right-6 md:hidden z-50">
                <Link href="/">
                    <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 active:scale-95 transition-transform border border-white/10">
                        <Calculator size={20} />
                        <span className="font-bold text-sm tracking-tight">Calculator Taxe</span>
                    </div>
                </Link>
            </div>

            {/* 7. Bottom Navigation Link */}
            <div className="pt-20 pb-10 text-center">
                <Link
                    href="/"
                    className="inline-flex items-center gap-3 text-slate-400 hover:text-indigo-600 font-black text-xs uppercase tracking-widest transition-colors bg-slate-50 px-6 py-3 rounded-2xl"
                >
                    <Calculator size={16} />
                    Revino la calculul salariului
                </Link>
            </div>
        </div>
    );
}