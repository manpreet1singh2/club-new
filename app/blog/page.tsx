import Link from 'next/link';
import { getPosts } from '@/lib/blog';

export default async function BlogPage() {
  const posts = await getPosts();
  
  return (
    <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-velvet-200">Intelligence</p>
      <h1 className="mt-4 text-5xl font-semibold text-white">Nightlife Dispatch</h1>
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="panel-soft group p-6 transition hover:border-velvet-500/50">
              <p className="text-xs text-slate-400">{post.date}</p>
              <h2 className="mt-3 text-xl font-bold text-white group-hover:text-velvet-200">{post.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-400 line-clamp-3">{post.excerpt}</p>
              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-velvet-200">
                Read article <span>→</span>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-slate-400">No articles found yet. Check back soon.</p>
        )}
      </div>
    </div>
  );
}
