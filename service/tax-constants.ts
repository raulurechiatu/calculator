export const EXCHANGE_RATES = {
    EUR_RON: 4.97, // Use a fixed rate for MVP
};

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

// Simplified Personal Deduction Table (Common for MVP)
export const PERSONAL_DEDUCTION = {
    BASE: 510,
    MAX_SALARY_THRESHOLD: 6000,
};