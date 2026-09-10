import Heading from "@/components/Heading";
import { ToolCard } from "@/components/Cards";
import { tools } from "@/lib/data";

export const metadata = { title: "Tools" };

export default function ToolsPage() {
  return (
    <section>
      <Heading first="Tools I" second="use" />
      <div className="mt-14 grid gap-10 sm:grid-cols-2">{tools.map((t) => <ToolCard key={t.name} t={t} />)}</div>
    </section>
  );
}
