import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SalaryFormProps {
    value: number;
    onChange: (val: number) => void;
    mode: "brut" | "net";
    onModeChange: (mode: "brut" | "net") => void;
    currency: "RON" | "EUR";
    onCurrencyChange: (currency: "RON" | "EUR") => void;
}

export const SalaryForm = ({
                               value,
                               onChange,
                               mode,
                               onModeChange,
                               currency,
                               onCurrencyChange,
                           }: SalaryFormProps) => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
            {/* Mode Switcher */}
            <div className="space-y-3">
                <Label className="text-slate-500 text-xs uppercase tracking-widest font-bold">
                    Tip Calcul
                </Label>
                <Tabs value={mode} onValueChange={(v) => onModeChange(v as any)}>
                    <TabsList className="grid w-full grid-cols-2 h-12">
                        <TabsTrigger value="brut" className="text-sm">Brut → Net</TabsTrigger>
                        <TabsTrigger value="net" className="text-sm">Net → Brut</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            {/* Amount Input */}
            <div className="space-y-3">
                <div className="flex justify-between items-end">
                    <Label htmlFor="salary-input" className="text-slate-500 text-xs uppercase tracking-widest font-bold">
                        Suma de calcul
                    </Label>
                    <div className="flex bg-slate-100 p-1 rounded-md border border-slate-200">
                        <button
                            onClick={() => onCurrencyChange("RON")}
                            className={`px-3 py-1 text-xs font-bold rounded ${
                                currency === "RON" ? "bg-white shadow-sm text-indigo-600" : "text-slate-500"
                            }`}
                        >
                            RON
                        </button>
                        <button
                            onClick={() => onCurrencyChange("EUR")}
                            className={`px-3 py-1 text-xs font-bold rounded ${
                                currency === "EUR" ? "bg-white shadow-sm text-indigo-600" : "text-slate-500"
                            }`}
                        >
                            EUR
                        </button>
                    </div>
                </div>

                <div className="relative">
                    <Input
                        id="salary-input"
                        type="number"
                        value={value || ""}
                        onChange={(e) => onChange(Number(e.target.value))}
                        className="text-3xl h-16 pt-2 font-mono font-semibold focus-visible:ring-indigo-500 border-slate-200"
                        placeholder="0"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 font-bold text-lg">
            {currency}
          </span>
                </div>
            </div>
        </div>
    );
};