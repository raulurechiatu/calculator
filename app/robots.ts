import { MetadataRoute } from 'next';
import {siteConfig} from "@/service/config";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
        },
        sitemap: `${siteConfig.url}/sitemap.xml`,
    };
}