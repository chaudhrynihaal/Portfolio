import Reveal from "@/components/Reveal";
import Heading from "@/components/Heading";
import ContactForm from "@/components/ContactForm";
import { Stat, FeatureCard, ProjectCard, ExperienceItem, ToolCard, BlogCard } from "@/components/Cards";
import { stats, features, projects, experience, tools, posts } from "@/lib/data";

export default function Home() {
  return (
    <>
      <section>
        <h2 className="display" style={{ fontSize: "clamp(3.5rem, 8vw, 6.9rem)" }}>
          AI &amp; Automation
          <span>Engineer</span>
        </h2>
        <p className="mt-8 max-w-lg text-xl leading-relaxed text-fog">
          I build n8n workflows, AI-powered websites, and custom dashboards as a solo technical partner for small
          businesses looking to scale faster.
        </p>
        <div className="mt-16 flex flex-wrap gap-x-14 gap-y-10">
          {stats.map((s) => <Stat key={s.label} {...s} />)}
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2">
          {features.map((f) => <FeatureCard key={f.text} {...f} />)}
        </div>
      </section>

      <Reveal>
        <Heading first="Recent" second="projects" />
        <div className="mt-14 grid gap-12">{projects.map((p) => <ProjectCard key={p.title} p={p} />)}</div>
      </Reveal>

      <Reveal>
        <Heading first="12 years of" second="experience" />
        <div className="mt-14 grid gap-14">{experience.map((e) => <ExperienceItem key={e.company} e={e} />)}</div>
      </Reveal>

      <Reveal>
        <Heading first="Premium" second="tools" />
        <div className="mt-14 grid gap-10 sm:grid-cols-2">{tools.map((t) => <ToolCard key={t.name} t={t} />)}</div>
      </Reveal>

      <Reveal>
        <Heading first="Design" second="thoughts" />
        <div className="mt-14 grid gap-16">{posts.map((p) => <BlogCard key={p.slug} post={p} />)}</div>
      </Reveal>

      <Reveal>
        <Heading first="Let's work" second="together" />
        <div className="mt-14"><ContactForm /></div>
      </Reveal>
    </>
  );
}
