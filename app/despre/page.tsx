import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import { siteConfig } from "@/service/config";

export const metadata: Metadata = {
    title: `Despre noi | ${siteConfig.name}`,
    description: "Cine a construit Calculator Salariu RO, ce date folosim și cum ținem calculul la zi cu legislația fiscală din România.",
    alternates: {
        canonical: `${siteConfig.url}/despre`,
    },
};

export default function AboutPage() {
    return (
        <div className="max-w-3xl mx-auto py-16 px-6">
            <Link href="/" className="flex items-center gap-2 text-indigo-600 font-bold mb-8 hover:underline">
                <ChevronLeft className="w-4 h-4" /> Înapoi la Calculator
            </Link>

            <article className="prose prose-slate max-w-none">
                <h1 className="text-3xl font-black mb-6 text-slate-900">Despre Calculator Salariu RO</h1>

                <p className="text-slate-600">
                    Calculator Salariu RO este un instrument independent, gratuit, creat pentru angajații,
                    freelancerii și angajatorii din România care vor să înțeleagă exact cum se traduce un
                    salariu brut într-un salariu net — și invers — conform legislației fiscale actuale.
                </p>

                <h2 className="text-xl font-bold text-slate-900 mt-8">De ce am construit acest calculator</h2>
                <p className="text-slate-600">
                    Codul Fiscal românesc s-a schimbat frecvent în ultimii ani: praguri de salariu minim
                    actualizate în etape, deduceri personale recalculate, facilități fiscale eliminate treptat
                    pentru sectoare precum IT sau construcții, reguli noi pentru concediul medical și pentru
                    munca remote. Pentru o persoană fără pregătire contabilă, este greu să țină pasul cu toate
                    aceste modificări doar citind text legislativ. Ne-am propus să facem acest calcul accesibil
                    tuturor, într-un singur loc, actualizat pe măsură ce legea se schimbă.
                </p>

                <h2 className="text-xl font-bold text-slate-900 mt-8">Cum calculăm salariul</h2>
                <p className="text-slate-600">
                    Calculatorul aplică regulile standard de calcul al salariului din România: Contribuția de
                    Asigurări Sociale (CAS, 25%), Contribuția de Asigurări Sociale de Sănătate (CASS, 10%) și
                    impozitul pe venit (10%, aplicat după deducerea CAS și CASS din baza de calcul), împreună
                    cu deducerea personală acolo unde este cazul. Poți citi explicații detaliate despre fiecare
                    componentă a taxării în{" "}
                    <Link href="/blog" className="text-indigo-600 underline">ghidurile de pe blog</Link>.
                </p>

                <h2 className="text-xl font-bold text-slate-900 mt-8">Ce NU suntem</h2>
                <p className="text-slate-600">
                    Nu suntem o firmă de contabilitate și nu oferim consultanță fiscală sau juridică
                    personalizată. Calculele afișate sunt simulări cu scop informativ, bazate pe grilele fiscale
                    publice în vigoare. Pentru situații complexe (venituri din surse multiple, activitate
                    independentă cu regim special, contracte internaționale), recomandăm consultarea unui
                    contabil autorizat sau a unui consultant fiscal.
                </p>

                <h2 className="text-xl font-bold text-slate-900 mt-8">Confidențialitate</h2>
                <p className="text-slate-600">
                    Sumele pe care le introduci în calculator sunt procesate direct în browserul tău și nu sunt
                    trimise sau stocate pe serverele noastre. Detalii complete în{" "}
                    <Link href="/confidentialitate" className="text-indigo-600 underline">politica de confidențialitate</Link>.
                </p>

                <h2 className="text-xl font-bold text-slate-900 mt-8">Contact și feedback</h2>
                <p className="text-slate-600">
                    Legislația fiscală se schimbă, iar noi actualizăm calculatorul și ghidurile pe măsură ce
                    apar modificări oficiale. Dacă observi o discrepanță între calculul afișat și legislația în
                    vigoare, ne poți contacta pentru a semnala eroarea, astfel încât să o corectăm cât mai
                    repede pentru toți utilizatorii.
                </p>
            </article>
        </div>
    );
}
