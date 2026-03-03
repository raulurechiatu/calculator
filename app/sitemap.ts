import {siteConfig} from "@/service/config";

export default function sitemap() {
    return [
        { url: siteConfig.url, lastModified: new Date(1772525324628) },
        { url: `${siteConfig.url}${siteConfig.links.termeni}`, lastModified: new Date(1772525324628) },
        { url: `${siteConfig.url}${siteConfig.links.cookies}`, lastModified: new Date(1772525324628) },
        { url: `${siteConfig.url}${siteConfig.links.privacy}`, lastModified: new Date(1772525324628) },
    ];
}