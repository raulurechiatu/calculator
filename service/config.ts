// src/lib/config.ts

export const siteConfig = {
    name: "Calculator Salariu RO",
    description: "Calcul salarii brute și nete conform Codului Fiscal 2026",
    // Fallback to localhost if the variable isn't set
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    adsenseId: process.env.NEXT_PUBLIC_ADSENSE_ID || "",
    links: {
        termeni: "/termeni",
        privacy: "/confidentialitate",
        cookies: "/cookies",
    }
} as const;