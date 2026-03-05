// service/tax-service.ts
import {CurrencyValue, SalaryBreakdown} from "@/types/tax";
import {FISCAL_2026, TAX_RATES} from "@/service/tax-constants";

// Helper to convert RON to EUR
const toCurrency = (ronValue: number, eurExchangeRate: number): CurrencyValue => ({
    ron: Math.round(ronValue),
    eur: Number((ronValue / eurExchangeRate).toFixed(2))
});

export const calculateFromGross = (
    amount: number,
    exchangeRate: number, // This should be the rate for the input currency (1 for RON, ~4.97 for EUR)
    eurExchangeRate: number, // This is always the EUR rate for the final display conversion
    isH2: boolean = false
): SalaryBreakdown => {
    // 1. Normalize input to RON
    const grossRon = amount * exchangeRate;

    const period = isH2 ? FISCAL_2026.H2 : FISCAL_2026.H1;
    const appliesAllowance = grossRon >= period.MIN_WAGE && grossRon <= period.CEILING;

    // Taxes
    const cas = Math.round(grossRon * TAX_RATES.CAS);
    const cass = Math.round(grossRon * TAX_RATES.CASS);

    // Personal Deduction (Deducere personala) - Logic depends on Gross
    const deduction = grossRon <= 6000 ? 510 : 0;

    const taxableIncome = Math.max(0, grossRon - cas - cass - deduction - (appliesAllowance ? period.TAX_FREE_AMOUNT : 0));
    const incomeTax = Math.round(taxableIncome * TAX_RATES.INCOME_TAX);

    const netRon = grossRon - cas - cass - incomeTax;
    const companyTotalRon = grossRon + (grossRon * TAX_RATES.CAM);

    return {
        gross: toCurrency(grossRon, eurExchangeRate),
        net: toCurrency(netRon, eurExchangeRate),
        cas: toCurrency(cas, eurExchangeRate),
        cass: toCurrency(cass, eurExchangeRate),
        incomeTax: toCurrency(incomeTax, eurExchangeRate),
        deduction: toCurrency(deduction, eurExchangeRate),
        companyTotal: toCurrency(companyTotalRon, eurExchangeRate)
    };
};

export const calculateFromNet = (
    targetNet: number,
    exchangeRate: number,
    eurExchangeRate: number,
    isH2: boolean = false
): SalaryBreakdown => {
    // FIX: We must normalize the target Net to RON first!
    const targetNetRon = targetNet * exchangeRate;

    let low = targetNetRon;
    let high = targetNetRon * 3; // Gross is usually higher than net * 2 in RO
    let bestGross = low;

    // Binary search to find the gross that results in targetNetRon
    for (let i = 0; i < 25; i++) {
        const mid = (low + high) / 2;
        // When calling calculateFromGross here, we use 1 as exchangeRate
        // because 'mid' is already in RON
        const currentNet = calculateFromGross(mid, 1, eurExchangeRate, isH2).net.ron;

        if (currentNet < targetNetRon) {
            low = mid;
        } else {
            high = mid;
            bestGross = mid;
        }
    }

    // Final result: use 1 for exchangeRate because bestGross is RON
    return calculateFromGross(Math.round(bestGross), 1, eurExchangeRate, isH2);
};