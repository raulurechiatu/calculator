import { CurrencyValue } from "@/types/tax";

export const TotalCostFooter = ({ total }: { total: CurrencyValue }) => (
    <div className="pt-4 border-t-2 border-indigo-500/10">
        <div className="bg-indigo-50/50 p-4 rounded-xl flex justify-between items-center border border-indigo-100/50">
            <div>
        <span className="block text-[10px] font-black text-indigo-400 uppercase tracking-tighter">
          Cost Total Angajator
        </span>
                <span className="text-[10px] text-slate-400 italic">Salariu Complet (TCO)</span>
            </div>
            <div className="text-right">
                <div className="text-xl font-black text-indigo-700">
                    {total.ron.toLocaleString('ro-RO')} <span className="text-xs">RON</span>
                </div>
                <div className="text-[10px] font-bold text-indigo-400">
                    {total.eur.toLocaleString('de-DE')} EUR
                </div>
            </div>
        </div>
    </div>
);