import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function TermsPage() {
    return (
        <div className="max-w-3xl mx-auto py-16 px-6">
            <Link href="/" className="flex items-center gap-2 text-indigo-600 font-bold mb-8 hover:underline">
                <ChevronLeft className="w-4 h-4" /> Înapoi la Calculator
            </Link>

            <article className="max-w-3xl mx-auto py-12 px-6 prose prose-slate">
                <h1 className="text-3xl font-black mb-6">Politica de Confidențialitate</h1>

                <section className="mt-8 space-y-4 text-slate-600">
                    <h2 className="text-xl font-bold text-slate-900">Ce date colectăm?</h2>
                    <p><strong>Calculator Salariu RO nu colectează și nu stochează date cu caracter personal.</strong> Sumele introduse pentru calculul salariului sunt procesate local în browserul dumneavoastră și nu sunt trimise către serverele noastre.</p>

                    <h2 className="text-xl font-bold text-slate-900">Cookie-uri</h2>
                    <p>Folosim cookie-uri esențiale doar pentru a reține preferințele dumneavoastră (de exemplu, dacă preferați afișarea în RON sau EUR) și pentru a memora acceptul privind politica de cookie-uri.</p>

                    <h2 className="text-xl font-bold text-slate-900">Drepturile Utilizatorului</h2>
                    <p>Conform GDPR, aveți dreptul de a fi informat. Deoarece nu stocăm date, nu avem ce să vă furnizăm, rectificăm sau ștergem din bazele noastre de date.</p>
                </section>

                <section className="mt-8 space-y-4 text-slate-600">
                    <h2 className="text-xl font-bold text-slate-900">Publicitate și Cookie-uri Terțe</h2>
                    <p>
                        Folosim <strong>Google AdSense</strong> pentru a afișa reclame atunci când vizitați site-ul nostru. Google utilizează cookie-uri (precum cookie-ul DART) pentru a difuza anunțuri bazate pe vizitele anterioare ale utilizatorilor pe acest site sau pe alte site-uri de pe internet.
                    </p>
                    <ul className="list-disc ml-6 space-y-2">
                        <li>Utilizatorii pot renunța la publicitatea personalizată vizitând <a href="https://www.google.com/settings/ads" target="_blank" className="text-indigo-600 underline">Setările pentru anunțuri Google</a>.</li>
                        <li>Site-ul nostru nu are control asupra cookie-urilor folosite de terții agenți de publicitate.</li>
                    </ul>
                    <p className="text-sm italic">
                        Prin utilizarea Calculator Salariu RO, sunteți de acord cu procesarea datelor de către Google în modul și în scopurile menționate mai sus.
                    </p>
                </section>
            </article>
        </div>
    );
}