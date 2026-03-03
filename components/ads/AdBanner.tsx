"use client";

import { useEffect } from "react";

interface AdBannerProps {
    dataAdSlot: string;
    dataAdFormat?: "auto" | "fluid" | "rectangle";
}

export const AdBanner = ({ dataAdSlot, dataAdFormat = "auto" }: AdBannerProps) => {
    useEffect(() => {
        try {
            ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        } catch (e) {
            console.error("AdSense error:", e);
        }
    }, []);

    return (
        <div className="w-full flex justify-center py-4 overflow-hidden">
            <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
                data-ad-slot={dataAdSlot}
                data-ad-format={dataAdFormat}
                data-full-width-responsive="true"
            />
        </div>
    );
};