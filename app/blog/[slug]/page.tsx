import { getPostBySlug } from '@/lib/blog';
import { notFound } from 'next/navigation';

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 md:px-8">
      <header className="space-y-4">
        <p className="text-sm font-medium text-velvet-200">{post.date} • {post.readingTime}</p>
        <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">{post.title}</h1>
      </header>
      <div className="prose prose-invert mt-12 max-w-none text-slate-300 leading-8">
        {post.content.split('\n').map((para, i) => (
          para.trim() ? <p key={i} className="mb-4">{para}</p> : <br key={i} />
        ))}
      </div>
    </article>
  );
}
