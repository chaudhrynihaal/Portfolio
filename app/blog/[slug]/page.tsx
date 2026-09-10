import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/lib/data";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  return { title: post?.title ?? "Post" };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <article>
      <Link href="/blog" className="text-sm text-fog hover:text-white">← All thoughts</Link>
      <p className="mt-6 text-sm text-fog">
        {post.date} <span className="mx-2">|</span> {post.readTime}
      </p>
      <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">{post.title}</h1>
      <div className="mt-8 max-w-prose space-y-5 leading-relaxed text-fog">
        {post.body.map((para, i) => <p key={i}>{para}</p>)}
      </div>
    </article>
  );
}
