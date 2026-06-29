import { MOCK_NEWS } from "@/lib/mockData";
import Link from "next/link";

export default function NewsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black mb-2">Latest News</h1>
        <p className="text-[var(--text-secondary)]">Stay up to date with the latest from the football world.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_NEWS.map((news) => (
          <Link key={news.id} href={`/news/${news.id}`} className="group block">
            <div className="bg-[var(--card)] rounded-2xl overflow-hidden border border-[var(--divider)] hover:border-[var(--primary)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 flex flex-col h-full">
              <div className="aspect-[16/9] relative overflow-hidden bg-[var(--background)]">
                <img src={news.image} alt={news.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out" />
                <div className="absolute top-4 left-4 bg-[var(--primary)] text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
                  {news.category}
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="text-xs text-[var(--text-secondary)] font-medium mb-2">
                  {new Date(news.date).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                <h3 className="text-lg font-bold mb-3 group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                  {news.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] line-clamp-3 leading-relaxed mt-auto">
                  {news.excerpt}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
