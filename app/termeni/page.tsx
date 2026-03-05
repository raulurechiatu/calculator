import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function TermsPage() {
    return (
        <div className="max-w-3xl mx-auto py-16 px-6">
            <Link href="/" className="flex items-center gap-2 text-indigo-600 font-bold mb-8 hover:underline">
                <ChevronLeft className="w-4 h-4" /> Înapoi la Calculator
            </Link>

            <article className="max-w-3xl mx-auto py-12 px-6 prose prose-slate">
                <h1 className="text-3xl font-black mb-6">Termeni și Condiții</h1>
                <p className="text-slate-600">Ultima actualizare: {new Date().toLocaleDateString('ro-RO')}</p>

                <section className="mt-8 space-y-4">
                    <h2 className="text-xl font-bold">1. Acceptarea Termenilor</h2>
                    <p>Prin accesarea site-ului Calculator Salariu RO, sunteți de acord să respectați acești termeni de utilizare și toate legile aplicabile.</p>

                    <h2 className="text-xl font-bold">2. Exonerare de Răspundere</h2>
                    <div className="bg-amber-50 border-l-4 border-amber-400 p-4 italic text-amber-900">
                        Calculele oferite sunt simulări bazate pe legislația fiscală din {new Date().getFullYear()} și au scop informativ. Calculator Salariu RO nu oferă consultanță financiară sau juridică. Nu ne asumăm răspunderea pentru erori de calcul sau decizii luate pe baza acestor date.
                    </div>

                    <h2 className="text-xl font-bold">3. Modificări</h2>
                    <p>Ne rezervăm dreptul de a actualiza algoritmul de calcul pe măsură ce legislația fiscală (Codul Fiscal) suferă modificări.</p>
                </section>
            </article>
        </div>
    );
}