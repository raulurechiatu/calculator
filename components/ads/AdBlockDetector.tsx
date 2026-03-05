"use client";
import React, { useEffect, useState } from 'react';
import { ShieldAlert, RefreshCw, X } from 'lucide-react';

export function AdBlockDetector() {
    const [isAdBlockerActive, setIsAdBlockerActive] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // We wait 2 seconds after page load to check
        const timer = setTimeout(() => {
            checkAdBlocker();
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const checkAdBlocker = async () => {
        // Standard "bait" URL that AdBlockers always intercept
        const googleAdUrl = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';

        try {
            const response = await fetch(new Request(googleAdUrl), {
                method: 'HEAD',
                mode: 'no-cors',
            });
            // If the request fails or is redirected, AdBlock is likely active
            setIsAdBlockerActive(false);
        } catch (error) {
            setIsAdBlockerActive(true);
            setIsVisible(true);
        }
    };

    if (!isVisible || !isAdBlockerActive) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative overflow-hidden">
                {/* Decorative Background Element */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-indigo-50 rounded-full" />

                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="relative text-center">
                    <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <ShieldAlert size={32} />
                    </div>

                    <h2 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">
                        Susține Calculator Salariu RO
                    </h2>

                    <p className="text-slate-500 text-sm leading-relaxed mb-8">
                        Am observat că folosești un AdBlocker. Acest instrument este gratuit și actualizat la zi datorită susținerii voastre. Te rugăm să ne adaugi în lista de excepții pentru a ne ajuta să rămânem online.
                    </p>

                    <div className="space-y-4 text-left bg-slate-50 p-5 rounded-2xl border border-slate-100 mb-8">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Cum ne poți ajuta:</h4>
                        <ol className="text-xs text-slate-600 space-y-3">
                            <li className="flex gap-3">
                                <span className="font-bold text-indigo-600">1.</span>
                                <span>Apasă pe iconița AdBlock din bara browserului.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="font-bold text-indigo-600">2.</span>
                                <span>Selectează <strong>"Nu rula pe paginile de pe acest site"</strong> (sau Pause).</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="font-bold text-indigo-600">3.</span>
                                <span>Reîmprospătează pagina pentru a confirma.</span>
                            </li>
                        </ol>
                    </div>

                    <button
                        onClick={() => window.location.reload()}
                        className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-100"
                    >
                        <RefreshCw size={18} />
                        Am dezactivat, reîncarcă pagina
                    </button>
                </div>
            </div>
        </div>
    );
}