import {siteConfig} from "@/service/config";

// In JsonLd.tsx
export const JsonLd = ({ year = 2026 }: { year?: number }) => {
    const data = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": `${siteConfig.name} ${year}`,
        "operatingSystem": "Any",
        "applicationCategory": "FinanceApplication",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "120"
        }
    };
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
};