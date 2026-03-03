import Link from "next/link";
import {siteConfig} from "@/service/config";

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-white border-t border-slate-100 py-10 mt-auto">
            <div className="max-w-5xl mx-auto px-6 space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Brand & Rights */}
                    <div className="text-center md:text-left">
                        <p className="text-slate-900 font-bold text-sm"><a href={siteConfig.url}>Calculator Salariu RO</a></p>
                        <p className="text-slate-400 text-[10px] uppercase tracking-widest mt-1">
                            © {currentYear} • Toate drepturile rezervate
                        </p>
                    </div>

                    {/* Legal Links */}
                    <nav className="flex flex-wrap justify-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-500">
                        <Link href="/confidentialitate" className="hover:text-indigo-600 transition-colors">
                            Confidențialitate
                        </Link>
                        <Link href="/termeni" className="hover:text-indigo-600 transition-colors">
                            Termeni și Condiții
                        </Link>
                        <Link href="/cookies" className="hover:text-indigo-600 transition-colors">
                            Politica Cookie
                        </Link>
                    </nav>
                </div>

                {/* ANPC Mandatory Section */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4 border-t border-slate-50">
                    <p className="text-[9px] text-slate-400 uppercase font-bold">Link-uri Utile ANPC:</p>
                    <div className="flex gap-4 items-center">
                        <a
                            href="https://anpc.ro/ce-este-sal/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all"
                        >
                            <img src="/anpc-sal.png" alt="ANPC - SAL" className="h-8 md:h-10" />
                        </a>
                        <a
                            href="https://ec.europa.eu/consumers/odr"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all"
                        >
                            <img src="/anpc-sol.png" alt="ANPC - SOL" className="h-8 md:h-10" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};