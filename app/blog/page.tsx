import Heading from "@/components/Heading";
import { BlogCard } from "@/components/Cards";
import { posts } from "@/lib/data";

export const metadata = { title: "Thoughts" };

export default function Blog() {
  return (
    <section>
      <Heading first="Design" second="thoughts" />
      <div className="mt-14 grid gap-12">{posts.map((p) => <BlogCard key={p.slug} post={p} />)}</div>
    </section>
  );
}
