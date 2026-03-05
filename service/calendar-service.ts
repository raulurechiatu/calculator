"use server";

export async function getBankHolidays(year: number) {
    try {
        const response = await fetch(`https://api.bank-holidays.ro/?year=${year}`, {
            // Next.js will cache this so you don't spam the API
            next: { revalidate: 86400 }
        });

        if (!response.ok) return [];
        return await response.json();
    } catch (error) {
        console.error("Fetch error:", error);
        return [];
    }
}