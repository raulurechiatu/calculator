import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {CookieConsent} from "@/components/ui/CookieConsent";
import {Footer} from "@/components/layout/Footer";
import Script from "next/script";
import {siteConfig} from "@/service/config";
import {AdBlockDetector} from "@/components/ads/AdBlockDetector";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: siteConfig.name,
    description: siteConfig.description,
    alternates: {
        canonical: siteConfig.url,
    },
    // Facebook / WhatsApp / LinkedIn
    openGraph: {
        title: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        siteName: siteConfig.name,
        locale: "ro_RO",
        type: "website",
        images: [
            {
                url: "/og-image.png", // Imaginea care apare la share
                width: 1200,
                height: 630,
                alt: siteConfig.name,
            },
        ],
    },

    // Twitter
    twitter: {
        card: "summary_large_image",
        title: siteConfig.name,
        description: siteConfig.description,
        images: ["/og-image.png"],
    },

    // AdSense & Others
    other: {
        "google-adsense-account": "ca-pub-5072803047179041",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ro">
        <head>
            <Script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5072803047179041"
                crossOrigin="anonymous"
                strategy="afterInteractive"
            />
            <meta name="google-adsense-account" content="ca-pub-5072803047179041"/>
        </head>
        <body>
            {children}
            <AdBlockDetector /> {/* It only renders if AdBlock is detected */}
            <Footer/>
            <CookieConsent />
        </body>
        </html>
    );
}
