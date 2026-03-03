import { MetadataRoute } from 'next'
import {siteConfig} from "@/service/config";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: siteConfig.name,
        description: siteConfig.description,
        short_name: 'SalariuRO',
        start_url: '/',
        display: 'standalone',
        background_color: '#fff',
        theme_color: '#4f46e5',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    }
}