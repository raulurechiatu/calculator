import { SalaryBreakdown } from "@/types/tax";

interface TaxBreakdownProps {
    data: SalaryBreakdown;
}

export const TaxBreakdown = ({ data }: TaxBreakdownProps) => {
    const taxRows = [
        { label: "CAS (Pensie 25%)", ron: data.cas.ron, eur: data.cas.eur },
        { label: "CASS (Sănătate 10%)", ron: data.cass.ron, eur: data.cass.eur },
        { label: "Impozit pe Venit (10%)", ron: data.incomeTax.ron, eur: data.incomeTax.eur },
        { label: "Deducere Personală", ron: data.deduction.ron, eur: data.deduction.eur, neutral: true },
    ];

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    Defalcare Costuri Angajat
                </h3>
            </div>

            <div className="p-6 space-y-4">
                {taxRows.map((row) => (
                    <div key={row.label} className="flex justify-between items-center group">
            <span className="text-sm text-slate-500 group-hover:text-slate-800 transition-colors">
              {row.label}
            </span>
                        <div className="text-right">
                            <div className={`font-mono font-semibold ${!row.neutral ? 'text-rose-500' : 'text-slate-600'}`}>
                                {!row.neutral && "- "}{row.ron.toLocaleString('ro-RO')} <span className="text-[10px]">RON</span>
                            </div>
                            <div className="text-[10px] text-slate-400 font-medium italic">
                                ≈ {row.eur.toLocaleString('de-DE')} EUR
                            </div>
                        </div>
                    </div>
                ))}

                <div className="pt-4 border-t border-dashed border-slate-200 mt-2">
                    <div className="flex justify-between items-center">
                        <div className="space-y-1">
                            <span className="text-sm font-bold text-slate-900">Cost Total Angajator</span>
                            <p className="text-[10px] text-slate-400 uppercase tracking-tighter">(Salariu Complet / CAM inclus)</p>
                        </div>
                        <div className="text-right">
                            <div className="font-mono font-black text-slate-900">
                                {data.companyTotal.ron.toLocaleString('ro-RO')} <span className="text-xs">RON</span>
                            </div>
                            <div className="text-xs text-indigo-500 font-bold">
                                {data.companyTotal.eur.toLocaleString('de-DE')} EUR
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};