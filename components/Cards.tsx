import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, Layers, LayoutTemplate } from "lucide-react";
import type { Project, Experience, Tool, Post } from "@/lib/data";

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-6xl font-bold leading-none sm:text-7xl">{value}</p>
      <p className="mt-4 max-w-28 text-base uppercase leading-tight text-fog">{label}</p>
    </div>
  );
}

export function FeatureCard({ tone, text, href }: { tone: "orange" | "lime"; text: string; href: string }) {
  const orange = tone === "orange";
  const Icon = orange ? Layers : LayoutTemplate;
  return (
    <Link
      href={href}
      className={`relative flex min-h-60 flex-col justify-between overflow-hidden rounded-2xl p-6 ${
        orange ? "bg-orange text-white" : "bg-lime text-ink"
      }`}
    >
      <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full opacity-30" fill="none">
        {orange ? (
          <path d="M180 -20 C 120 60, 230 120, 190 200 S 260 300, 320 260" stroke="white" strokeWidth="26" strokeLinecap="round" />
        ) : (
          <path d="M60 -10 L 110 90 L 160 -10 L 210 120 L 260 20 L 300 140 L 360 60" stroke="#6fd0d6" strokeWidth="5" />
        )}
      </svg>
      <Icon size={36} strokeWidth={1.75} className="relative" />
      <p className="relative mt-8 max-w-xs text-xl font-medium uppercase leading-tight">{text}</p>
      <span className={`relative mt-6 grid size-9 place-items-center self-end rounded-md border ${orange ? "border-white" : "border-ink"}`}>
        <ArrowRight size={18} />
      </span>
    </Link>
  );
}

export function ProjectCard({ p }: { p: Project }) {
  return (
    <Link href={p.href} className="group flex items-start gap-6">
      <div className="relative size-32 shrink-0 overflow-hidden rounded-xl bg-field">
        {p.image && <Image src={p.image} alt="" fill className="object-cover" sizes="128px" />}
      </div>
      <div className="flex-1 pt-8">
        <p className="text-2xl font-semibold">{p.title}</p>
        <p className="mt-1 text-lg text-fog">{p.category}</p>
      </div>
      <ArrowUpRight className="arrow mt-2 shrink-0" size={22} />
    </Link>
  );
}

export function ExperienceItem({ e }: { e: Experience }) {
  return (
    <Link href={e.href ?? "#"} className="group flex items-start gap-6">
      <div className="flex-1">
        <p className="text-2xl font-semibold">{e.company}</p>
        <p className="mt-3 max-w-lg text-lg leading-relaxed text-fog">{e.description}</p>
        <p className="mt-4 text-lg text-fog">{e.period}</p>
      </div>
      <ArrowUpRight className="arrow mt-2 shrink-0" size={22} />
    </Link>
  );
}

export function ToolCard({ t }: { t: Tool }) {
  return (
    <a href={t.href} target="_blank" rel="noreferrer" className="flex items-center gap-5">
      <div className="grid size-16 shrink-0 place-items-center rounded-xl bg-white text-2xl font-bold text-ink">
        {t.logo ? <Image src={t.logo} alt="" width={36} height={36} /> : t.name[0]}
      </div>
      <div>
        <p className="text-2xl font-semibold">{t.name}</p>
        <p className="text-lg text-fog">{t.kind}</p>
      </div>
    </a>
  );
}

export function BlogCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="flex items-start gap-6">
        <p className="flex-1 text-2xl font-semibold leading-snug">{post.title}</p>
        <ArrowUpRight className="arrow mt-2 shrink-0" size={22} />
      </div>
      <p className="mt-4 max-w-lg text-lg leading-relaxed text-fog">{post.excerpt}</p>
      <div className="mt-4 flex justify-between text-lg text-fog">
        <span>{post.date}</span>
        <span>{post.readTime}</span>
      </div>
    </Link>
  );
}
