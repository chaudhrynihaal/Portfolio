import Heading from "@/components/Heading";
import { ExperienceItem } from "@/components/Cards";
import { experience } from "@/lib/data";

export const metadata = { title: "Experience" };

export default function ExperiencePage() {
  return (
    <section>
      <Heading first="Work" second="experience" />
      <div className="mt-14 grid gap-12">{experience.map((e) => <ExperienceItem key={e.company} e={e} />)}</div>
    </section>
  );
}
