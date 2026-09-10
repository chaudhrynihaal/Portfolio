import Heading from "@/components/Heading";
import { ProjectCard } from "@/components/Cards";
import { projects } from "@/lib/data";

export const metadata = { title: "Projects" };

export default function Projects() {
  return (
    <section>
      <Heading first="All" second="projects" />
      <div className="mt-14 grid gap-12">{projects.map((p) => <ProjectCard key={p.title} p={p} />)}</div>
    </section>
  );
}
