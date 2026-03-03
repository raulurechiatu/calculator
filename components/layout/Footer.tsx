import Link from "next/link";
import { siteConfig } from "@/service/config";

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-white border-t border-slate-100 py-10 mt-auto">
            <div className="max-w-5xl mx-auto px-6 space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Brand & Rights */}
                    <div className="text-center md:text-left">
                        <p className="text-slate-900 font-bold text-sm">
                            <Link href="/">{siteConfig.name || "Calculator Salariu RO"}</Link>
                        </p>
                        <p className="text-slate-400 text-[10px] uppercase tracking-widest mt-1">
                            © {currentYear} • Toate drepturile rezervate
                        </p>
                    </div>

                    {/* Main & Legal Links */}
                    <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
                        {/* Core Links */}
                        <Link href="/" className="text-indigo-600 hover:text-indigo-700 transition-colors">
                            Calculator
                        </Link>
                        <Link href="/blog" className="text-indigo-600 hover:text-indigo-700 transition-colors">
                            Blog
                        </Link>

                        {/* Divider for Desktop */}
                        <span className="hidden md:block text-slate-200">|</span>

                        {/* Legal Links */}
                        <Link href="/confidentialitate" className="hover:text-slate-900 transition-colors">
                            Confidențialitate
                        </Link>
                        <Link href="/termeni" className="hover:text-slate-900 transition-colors">
                            Termeni și Condiții
                        </Link>
                        <Link href="/cookies" className="hover:text-slate-900 transition-colors">
                            Politica Cookie
                        </Link>
                    </nav>
                </div>

                {/* ANPC Mandatory Section */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-6 border-t border-slate-50">
                    <p className="text-[9px] text-slate-400 uppercase font-bold tracking-tight">Link-uri Utile ANPC:</p>
                    <div className="flex gap-4 items-center">
                        <a
                            href="https://anpc.ro/ce-este-sal/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                        >
                            <img src="/anpc-sal.png" alt="ANPC - SAL" className="h-7 md:h-8" />
                        </a>
                        <a
                            href="https://ec.europa.eu/consumers/odr"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                        >
                            <img src="/anpc-sol.png" alt="ANPC - SOL" className="h-7 md:h-8" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};