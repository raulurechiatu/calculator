"use server";

import { unstable_cache } from 'next/cache';
import { XMLParser } from "fast-xml-parser";

const BNR_URL = "https://www.bnr.ro/nbrfxrates.xml";

/**
 * Fetches the exchange rate for a specific currency.
 * Defaults to EUR. Returns 1 for RON.
 */
export async function getExchangeRate(currency: string = "EUR"): Promise<number> {
    // If the currency is RON, the multiplier is always 1.
    if (currency.toUpperCase() === "RON") return 1;

    // Otherwise, use the memoized fetch
    return getCachedRate(currency.toUpperCase());
}

const getCachedRate = unstable_cache(
    async (currency: string): Promise<number> => {
        try {
            const response = await fetch(BNR_URL);
            const xmlData = await response.text();

            const parser = new XMLParser({ ignoreAttributes: false });
            const jsonObj = parser.parse(xmlData);

            const rates = jsonObj.DataSet.Body.Cube.Rate;
            const rateObj = rates.find((r: any) => r["@_currency"] === currency);

            if (!rateObj) throw new Error(`Currency ${currency} not found`);

            return parseFloat(rateObj["#text"]);
        } catch (error) {
            console.error(`Error fetching ${currency} from BNR:`, error);
            return 4.97; // Fallback for EUR
        }
    },
    ['bnr-rates'], // Cache Key
    { revalidate: 3600 } // 1 hour TTL
);