"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Folder, Briefcase, Wrench, PenSquare } from "lucide-react";

const items = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/projects", label: "Projects", Icon: Folder },
  { href: "/experience", label: "Experience", Icon: Briefcase },
  { href: "/tools", label: "Tools", Icon: Wrench },
  { href: "/blog", label: "Thoughts", Icon: PenSquare },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="mx-auto flex w-fit gap-2 rounded-2xl bg-white/10 p-3 backdrop-blur">
      {items.map(({ href, label, Icon }) => {
        const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-label={label}
            title={label}
            className={`grid size-10 place-items-center rounded-xl transition-colors focus-visible:outline-2 focus-visible:outline-orange ${
              active ? "bg-white/15 text-white" : "text-white/80 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon size={20} strokeWidth={1.75} />
          </Link>
        );
      })}
    </nav>
  );
}
