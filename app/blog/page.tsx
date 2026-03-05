// src/app/blog/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { siteConfig } from "@/service/config";
import { Calendar, ArrowRight } from "lucide-react";

// Helper to get all posts
function getPosts() {
    const blogDir = path.join(process.cwd(), "content/blog");

    // Create directory if it doesn't exist (prevents build errors)
    if (!fs.existsSync(blogDir)) return [];

    const files = fs.readdirSync(blogDir);

    const posts = files.map((filename) => {
        const slug = filename.replace(".md", "");
        const fileContent = fs.readFileSync(path.join(blogDir, filename), "utf8");
        const { data: frontmatter } = matter(fileContent);

        return {
            slug,
            frontmatter: {
                title: frontmatter.title || "Articol fără titlu",
                date: frontmatter.date || "2026-01-01",
                description: frontmatter.description || "Citește mai multe despre taxele în 2026.",
            },
        };
    });

    // Sort by date (newest first)
    return posts.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
}

export const metadata = {
    title: `Blog Fiscal 2026 | ${siteConfig.name}`,
    description: "Noutăți legislative, ghiduri PFA vs SRL și totul despre taxele salariale în România.",
};

export default function BlogPage() {
    const posts = getPosts();

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-5xl mx-auto py-20 px-6">
                {/* Hero Section */}
                <header className="mb-16 text-center">
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-4">
                        Blog Fiscal <span className="text-indigo-600">{new Date().getFullYear()}</span>
                    </h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                        Rămâi la curent cu toate modificările Codului Fiscal. Ghiduri practice pentru angajați și antreprenori.
                    </p>
                </header>

                {/* --- CALCULATOR BACKLINK SECTION --- */}
                <section className="mt-16 p-8 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl text-white shadow-xl shadow-indigo-200">
                    <div className="max-w-xl">
                        <h3 className="text-2xl font-bold mb-3">Vrei să afli salariul tău exact?</h3>
                        <p className="text-indigo-100 mb-6">
                            Folosește calculatorul nostru actualizat conform legislației din {new Date().getFullYear()} pentru a vedea exact câți bani primești în mână după taxe și deduceri.
                        </p>
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center px-8 py-4 bg-white text-indigo-600 font-black rounded-xl hover:bg-indigo-50 transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg"
                        >
                            Mergi la Calculator Salariu
                        </Link>
                    </div>
                </section>

                {/* Posts Grid */}
                <div className="grid p-10 gap-8 md:grid-cols-2 lg:grid-cols-2">
                    {posts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="group flex flex-col p-8 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300"
                        >
                            <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
                                <Calendar className="w-4 h-4" />
                                <time>{post.frontmatter.date}</time>
                            </div>

                            <h2 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 mb-3 leading-snug">
                                {post.frontmatter.title}
                            </h2>

                            <p className="text-slate-600 mb-6 flex-grow line-clamp-2">
                                {post.frontmatter.description}
                            </p>

                            <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                                Citește Articolul <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    ))}
                </div>

                {posts.length === 0 && (
                    <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed">
                        <p className="text-slate-400 font-medium">Momentan nu am publicat articole. Revino curând!</p>
                    </div>
                )}
            </div>
        </div>
    );
}