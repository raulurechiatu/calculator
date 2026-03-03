import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function TermsPage() {
    return (
        <div className="max-w-3xl mx-auto py-16 px-6">
            <Link href="/" className="flex items-center gap-2 text-indigo-600 font-bold mb-8 hover:underline">
                <ChevronLeft className="w-4 h-4" /> Înapoi la Calculator
            </Link>
            <article className="max-w-3xl mx-auto py-12 px-6 prose prose-slate">
                <h1 className="text-3xl font-black mb-6">Politica de Cookie</h1>
                <p className="text-slate-600">Acest site utilizează module cookie pentru a vă oferi o experiență mai bună.</p>

                <table className="w-full mt-8 border-collapse border border-slate-200 text-left text-sm">
                    <thead className="bg-slate-50">
                    <tr>
                        <th className="border border-slate-200 p-3">Nume</th>
                        <th className="border border-slate-200 p-3">Scop</th>
                        <th className="border border-slate-200 p-3">Durată</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="border border-slate-200 p-3 font-mono">tax-wizard-consent</td>
                        <td className="border border-slate-200 p-3">Reține dacă ați acceptat politica de cookie.</td>
                        <td className="border border-slate-200 p-3">1 an</td>
                    </tr>
                    <tr>
                        <td className="border border-slate-200 p-3 font-mono">preferred-currency</td>
                        <td className="border border-slate-200 p-3">Reține dacă ați selectat RON sau EUR ca monedă implicită.</td>
                        <td className="border border-slate-200 p-3">Sesiune/1 an</td>
                    </tr>
                    </tbody>
                </table>
            </article>
        </div>
    );
}