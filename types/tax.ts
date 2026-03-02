export interface SalaryBreakdown {
    gross: CurrencyValue;
    net: CurrencyValue;
    cas: CurrencyValue;     // Pension
    cass: CurrencyValue;    // Health
    incomeTax: CurrencyValue;
    deduction: CurrencyValue;
    companyTotal: CurrencyValue; // "Cost Complet"
}

export interface CurrencyValue {
    ron: number;
    eur: number;
}