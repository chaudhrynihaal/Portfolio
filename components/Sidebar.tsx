import Image from "next/image";
import { Flame } from "lucide-react";
import { icons } from "@/components/SocialIcons";
import { profile } from "@/lib/data";


export default function Sidebar() {
  return (
    <aside className="relative overflow-hidden rounded-2xl bg-white px-8 py-8 text-center text-ink lg:sticky lg:top-10 lg:self-start">
      {/* Dashed orange arcs, top-left and mid-left */}
      <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" fill="none">
        <path d="M0 45 C 60 120, 160 100, 195 0" stroke="#f46c38" strokeWidth="3" strokeDasharray="12 10" />
        <path d="M0 500 C 60 480, 105 460, 120 430" stroke="#f46c38" strokeWidth="3" strokeDasharray="12 10" />
      </svg>

      <div className="relative mx-auto aspect-square w-full max-w-64 overflow-hidden rounded-xl bg-orange">
        <Image src={profile.photo} alt={profile.name} fill className="object-cover" sizes="256px" priority />
      </div>

      <h1 className="relative mt-8 text-4xl font-extrabold tracking-tight">{profile.name}</h1>

      <div className="relative mx-auto mt-5 grid size-10 place-items-center rounded-full bg-orange text-white">
        <Flame size={16} fill="currentColor" />
      </div>

      <p className="relative mx-auto mt-14 max-w-xs text-lg font-medium leading-snug text-fog">{profile.tagline}</p>

      <ul className="relative mt-10 flex justify-center gap-7">
        {profile.socials.map((s) => {
          const Icon = icons[s.icon];
          return (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="block text-orange hover:opacity-70">
                <Icon />
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
