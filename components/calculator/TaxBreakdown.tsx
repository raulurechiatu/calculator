import { SalaryBreakdown } from "@/types/tax";
import { Separator } from "@/components/ui/separator";
import { BreakdownRow } from "./breakdown/BreakdownRow";
import { BreakdownSection } from "./breakdown/BreakdownSection";
import { TotalCostFooter } from "./breakdown/TotalCostFooter";

export const TaxBreakdown = ({ data }: { data: SalaryBreakdown }) => {
    const camRon = data.companyTotal.ron - data.gross.ron;
    const camEur = data.companyTotal.eur - data.gross.eur;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-3 border-b border-slate-200">
                <h3 className="font-bold text-slate-800 text-xs uppercase tracking-widest">
                    Analiză Detaliată Taxe
                </h3>
            </div>

            <div className="p-6 space-y-6">
                {/* Employee Section */}
                <BreakdownSection title="Deduceri Angajat">
                    <BreakdownRow label="CAS (Pensie 25%)" ron={data.cas.ron} eur={data.cas.eur} type="negative" />
                    <BreakdownRow label="CASS (Sănătate 10%)" ron={data.cass.ron} eur={data.cass.eur} type="negative" />
                    <BreakdownRow label="Impozit pe Venit (10%)" ron={data.incomeTax.ron} eur={data.incomeTax.eur} type="negative" />
                    {data.deduction.ron > 0 && (
                        <BreakdownRow label="Deducere Personală" ron={data.deduction.ron} eur={data.deduction.eur} type="bonus" />
                    )}
                </BreakdownSection>

                <Separator className="opacity-50" />

                {/* Employer Section */}
                <BreakdownSection title="Costuri Angajator">
                    <BreakdownRow label="Salariu Brut (Contract)" ron={data.gross.ron} eur={data.gross.eur} />
                    <BreakdownRow label="CAM (Muncă 2.25%)" ron={camRon} eur={camEur} />
                </BreakdownSection>

                <TotalCostFooter total={data.companyTotal} />
            </div>
        </div>
    );
};