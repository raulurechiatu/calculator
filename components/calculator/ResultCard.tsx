import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {CurrencyValue} from "@/types/tax";

export const ResultCard = ({ net }: { net: CurrencyValue }) => (
    <Card className="bg-indigo-600 text-white shadow-xl border-none">
        <CardHeader>
            <CardTitle className="text-sm font-medium opacity-80 uppercase tracking-wider">
                Salariu Net (Bani în mână)
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="text-5xl font-bold">{net.ron.toLocaleString('ro-RO')} <span className="text-2xl">RON</span></div>
            <div className="text-xs text-indigo-500 font-bold">
                {net.eur.toLocaleString('de-DE')} EUR
            </div>
        </CardContent>
    </Card>
);