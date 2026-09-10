export const TAX_RATES = {
    CAS: 0.25,      // Social Security (Pension)
    CASS: 0.10,     // Health Insurance
    INCOME_TAX: 0.10, // Income Tax
    CAM: 0.0225,    // Employer Labor Contribution
};

/**
 * 2026 Romanian Specifics
 * Note: The legislation changes mid-year (July 1st)
 */
export const FISCAL_2026 = {
    H1: {
        label: "Ianuarie - Iunie 2026",
        MIN_WAGE: 4050,
        TAX_FREE_AMOUNT: 300, // The "300 lei scutit" rule
        CEILING: 4300,        // Max gross to benefit from the 300 deduction
    },
    H2: {
        label: "Iulie - Decembrie 2026",
        MIN_WAGE: 4325,
        TAX_FREE_AMOUNT: 200, // Reduced from 300
        CEILING: 4600,        // Ceiling adjusted for new min wage
    }
};

/**
 * Personal Deduction (Deducere personala) - no dependents.
 * Per Codul Fiscal art. 77^1 (OG 16/2022, amended by OUG 115/2023):
 * max deduction = 20% of the national minimum gross wage, reduced by
 * 0.5 percentage points for every 50 RON the gross salary exceeds
 * that minimum wage, reaching 0 once it exceeds it by PHASE_OUT_RON.
 */
export const PERSONAL_DEDUCTION = {
    BASE_PERCENT: 0.20,
    STEP_RON: 50,
    STEP_PERCENT: 0.005,
    PHASE_OUT_RON: 2000,
};