import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CurrencyValue } from "@/types/tax";

export const ResultCard = ({ net }: { net: CurrencyValue }) => (
    <Card className="bg-indigo-600 text-white shadow-xl border-none overflow-hidden relative">
        {/* Subtle background decoration */}
        <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-white/10 rounded-full blur-3xl" />

        <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold opacity-70 uppercase tracking-[0.2em]">
                Salariu Net (Bani în mână)
            </CardTitle>
        </CardHeader>

        <CardContent className="space-y-1">
            <div className="text-5xl font-black tracking-tight">
                {net.ron.toLocaleString('ro-RO')}
                <span className="text-xl ml-2 font-light opacity-80">RON</span>
            </div>

            {/* Changed text-indigo-500 to text-indigo-200 for better contrast on dark background */}
            <div className="text-sm font-medium text-indigo-200/80 flex items-center gap-1">
                ≈ {net.eur.toLocaleString('de-DE')}
                <span className="text-[10px]">EUR</span>
            </div>
        </CardContent>
    </Card>
);