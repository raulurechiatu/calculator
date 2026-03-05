// app/blog/[slug]/page.tsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import Link from "next/link";

// --- HELPER FUNCTIONS ---

function getReadingTime(text: string): number {
    const wordsPerMinute = 225;
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
}

function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

async function getAllPosts() {
    const blogDir = path.join(process.cwd(), "content/blog");
    if (!fs.existsSync(blogDir)) return [];

    const files = fs.readdirSync(blogDir);
    return files.map(filename => {
        const fileContent = fs.readFileSync(path.join(blogDir, filename), "utf8");
        const { data } = matter(fileContent);
        return {
            slug: filename.replace(/\.md$/, ""),
            title: data.title,
        };
    });
}

// --- NEXT.JS CONFIG ---

export async function generateStaticParams() {
    const blogDir = path.join(process.cwd(), "content/blog");
    if (!fs.existsSync(blogDir)) return [];
    const files = fs.readdirSync(blogDir);
    return files.map((filename) => ({
        slug: filename.replace(/\.md$/, ""),
    }));
}

// --- MAIN COMPONENT ---

export default async function PostPage(props: { params: Promise<{ slug: string }> }) {
    const { slug } = await props.params;
    const filePath = path.join(process.cwd(), "content", "blog", `${slug}.md`);

    if (!fs.existsSync(filePath)) return notFound();

    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data: frontmatter, content } = matter(fileContent);
    const readingTime = getReadingTime(content);

    const allPosts = await getAllPosts();
    const similarPosts = allPosts.filter(p => p.slug !== slug).slice(0, 3);

    // Extracts both ## and ### for the ToC
    const headingMatches = content.match(/^###?\s+(.*)$/gm);
    const tocItems = headingMatches
        ? headingMatches.map(line => {
            const level = line.split(" ")[0].length;
            const text = line.replace(/^###?\s+/, "").trim();
            return { text, level, id: slugify(text) };
        })
        : [];

    return (
        <div className="max-w-6xl mx-auto py-12 px-6 lg:flex lg:gap-16">

            {/* Sidebar - Desktop Only */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
                <div className="sticky top-24 space-y-12">

                    {/* Table of Contents */}
                    <div>
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                            În acest articol
                        </h3>
                        <nav className="flex flex-col gap-3">
                            {tocItems.map((item) => (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    className={`text-sm transition-colors hover:text-indigo-600 ${
                                        item.level === 3
                                            ? "pl-4 text-slate-400 text-xs"
                                            : "text-slate-600 font-medium"
                                    }`}
                                >
                                    {item.text}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Quick Navigation to Other Posts */}
                    <div>
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                            Alte Ghiduri
                        </h3>
                        <nav className="flex flex-col gap-4">
                            {allPosts.filter(p => p.slug !== slug).map((post) => (
                                <Link
                                    key={post.slug}
                                    href={`/blog/${post.slug}`}
                                    className="text-xs font-bold text-slate-500 hover:text-indigo-600 leading-snug transition-colors"
                                >
                                    {post.title}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <article className="flex-1 min-w-0">
                <header className="mb-10">
                    <Link href="/blog" className="text-indigo-600 text-sm font-bold mb-4 inline-block hover:underline">
                        ← Înapoi la blog
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
                        {frontmatter.title}
                    </h1>
                    <div className="flex items-center gap-4 text-slate-400 text-sm">
                        <time>{frontmatter.date}</time>
                        <span>•</span>
                        <span>{readingTime} min lectură</span>
                    </div>
                </header>

                <div className="prose prose-indigo prose-lg max-w-none prose-headings:tracking-tight prose-headings:font-black">
                    <ReactMarkdown
                        components={{
                            h2: ({ children }) => {
                                const id = slugify(children?.toString() || "");
                                return <h2 id={id} className="scroll-mt-24">{children}</h2>;
                            },
                            h3: ({ children }) => {
                                const id = slugify(children?.toString() || "");
                                return <h3 id={id} className="scroll-mt-24">{children}</h3>;
                            }
                        }}
                    >
                        {content}
                    </ReactMarkdown>
                </div>

                {/* --- SIMILAR ARTICLES LIST --- */}
                <section className="mt-20 pt-10 border-t border-slate-100">
                    <h3 className="text-xl font-black text-slate-900 mb-8 tracking-tight">
                        Articole Similare
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {similarPosts.map((post) => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="group p-6 rounded-2xl border border-slate-100 bg-white hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50 transition-all"
                            >
                                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest block mb-2">
                                    Ghid Fiscal
                                </span>
                                <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                                    {post.title}
                                </h4>
                                <div className="mt-4 flex items-center text-indigo-600 text-xs font-bold">
                                    Citește articolul
                                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Mobile Navigation List (Visible only on small screens) */}
                <div className="lg:hidden mt-16 pt-10 border-t border-slate-100">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 text-center">Citește și alte articole</h3>
                    <div className="grid gap-3">
                        {allPosts.filter(p => p.slug !== slug).map(post => (
                            <Link key={post.slug} href={`/blog/${post.slug}`} className="p-4 bg-slate-50 rounded-xl font-bold text-slate-700 text-sm hover:bg-slate-100 transition-colors">
                                {post.title}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Calculator CTA Box */}
                <section className="mt-16 p-8 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl text-white shadow-xl shadow-indigo-200">
                    <div className="max-w-xl">
                        <h3 className="text-2xl font-bold mb-3">Vrei să afli salariul tău exact?</h3>
                        <p className="text-indigo-100 mb-6 text-sm">
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
            </article>
        </div>
    );
}