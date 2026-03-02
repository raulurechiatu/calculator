import {TAX_RATES, FISCAL_2026, EXCHANGE_RATES} from './tax-constants';
import {CurrencyValue, SalaryBreakdown} from '@/types/tax';


// Helper to convert RON to EUR
const toCurrency = (ronValue: number): CurrencyValue => ({
    ron: Math.round(ronValue),
    eur: Number((ronValue / EXCHANGE_RATES.EUR_RON).toFixed(2))
});

export const calculateFromGross = (
    amount: number,
    currency: 'RON' | 'EUR' = 'RON',
    isH2: boolean = false
): SalaryBreakdown => {
    // 1. Normalize input to RON for calculation
    const grossRon = currency === 'EUR' ? amount * EXCHANGE_RATES.EUR_RON : amount;

    const period = isH2 ? FISCAL_2026.H2 : FISCAL_2026.H1;
    const appliesAllowance = grossRon >= period.MIN_WAGE && grossRon <= period.CEILING;
    const taxableBaseSocial = appliesAllowance ? Math.max(0, grossRon - period.TAX_FREE_AMOUNT) : grossRon;

    const cas = Math.round(taxableBaseSocial * TAX_RATES.CAS);
    const cass = Math.round(taxableBaseSocial * TAX_RATES.CASS);
    const deduction = grossRon <= 6000 ? 510 : 0;

    const taxableIncome = Math.max(0, grossRon - cas - cass - deduction - (appliesAllowance ? period.TAX_FREE_AMOUNT : 0));
    const incomeTax = Math.round(taxableIncome * TAX_RATES.INCOME_TAX);

    const netRon = grossRon - cas - cass - incomeTax;
    const companyTotalRon = grossRon + (grossRon * TAX_RATES.CAM);

    // 2. Wrap all results in dual currency
    return {
        gross: toCurrency(grossRon),
        net: toCurrency(netRon),
        cas: toCurrency(cas),
        cass: toCurrency(cass),
        incomeTax: toCurrency(incomeTax),
        deduction: toCurrency(deduction),
        companyTotal: toCurrency(companyTotalRon)
    };
};

export const calculateFromNet = (
    targetNet: number,
    currency: 'RON' | 'EUR' = 'RON',
    isH2: boolean = false
): SalaryBreakdown => {
    const targetNetRon = currency === 'EUR' ? targetNet * EXCHANGE_RATES.EUR_RON : targetNet;

    let low = targetNetRon;
    let high = targetNetRon * 2;
    let bestGross = low;

    for (let i = 0; i < 25; i++) {
        const mid = (low + high) / 2;
        const currentNet = calculateFromGross(mid, 'RON', isH2).net.ron;
        if (currentNet < targetNetRon) low = mid;
        else { high = mid; bestGross = mid; }
    }

    return calculateFromGross(Math.round(bestGross), 'RON', isH2);
};