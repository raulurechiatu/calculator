"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Cookie, X } from "lucide-react";

export const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const consent = Cookies.get("tax-wizard-consent");
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const acceptCookies = () => {
        Cookies.set("tax-wizard-consent", "true", { expires: 365 });
        setIsVisible(false);
    };

    const declineCookies = () => {
        Cookies.set("tax-wizard-consent", "false", { expires: 365 });
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-sm z-50"
                >
                    <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl p-6 relative">
                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div className="flex items-start gap-4">
                            <div className="bg-indigo-100 p-2 rounded-lg">
                                <Cookie className="w-6 h-6 text-indigo-600" />
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-bold text-slate-900 text-sm">Politica de Cookie-uri</h4>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    Folosim cookie-uri pentru a îmbunătăți experiența de calcul și pentru a reține preferințele tale de monedă.
                                </p>
                                <div className="flex gap-2 pt-2">
                                    <Button
                                        variant="default"
                                        size="sm"
                                        className="bg-indigo-600 hover:bg-indigo-700 text-xs h-8 px-4"
                                        onClick={acceptCookies}
                                    >
                                        Accept
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-slate-500 text-xs h-8 px-4"
                                        onClick={declineCookies}
                                    >
                                        Refuz
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};