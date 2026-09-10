// Edit this file to change site content. Everything on the site reads from here.

export const profile = {
  name: "Chaudhry Nihaal",
  role: "AI & Automation Engineer",
  tagline: "AI & Automation Engineer helping small businesses scale faster.",
  photo: "https://github.com/chaudhrynihaal.png",
  email: "nihaalsif5@gmail.com",
  socials: [
    { label: "GitHub", href: "https://github.com/chaudhrynihaal", icon: "github" },
    { label: "LinkedIn", href: "https://linkedin.com/in/nihaalasif", icon: "linkedin" },
    { label: "Email", href: "https://mail.google.com/mail/?view=cm&fs=1&to=nihaalsif5@gmail.com", icon: "email" },
  ] as { label: string; href: string; icon: "github" | "linkedin" | "email" }[],
};

export const stats = [
  { value: "16+", label: "Projects delivered" },
  { value: "AI", label: "Automation specialist" },
];

export const features = [
  { tone: "orange" as const, text: "n8n workflows, AI-powered websites, custom dashboards", href: "/tools" },
  { tone: "lime" as const, text: "Python, React, TensorFlow, PyTorch, AWS", href: "/projects" },
];

export const nav = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Tools", href: "/tools" },
  { label: "Thoughts", href: "/blog" },
];

export type Project = { title: string; category: string; href: string; image?: string };
export const projects: Project[] = [
  {
    title: "Elara — Period, Pregnancy & Perimenopause Tracker",
    category: "ELARA • 2026",
    href: "https://github.com/chaudhrynihaal/elara-periods-tracker",
    image: "/case-studies/elara-dashboard.png",
  },
  {
    title: "Fintrack — Private Personal Finance Tracker for iOS",
    category: "FINTRACK • 2026",
    href: "https://github.com/chaudhrynihaal/Fintrack",
  },
  {
    title: "Everafter — All-in-One Wedding Planning Companion",
    category: "EVERAFTER • 2026",
    href: "#",
    image: "/case-studies/everafter-welcome.png",
  },
  {
    title: "Cammi — AI-Powered Marketing Automation Platform",
    category: "CAMMI • 2026",
    href: "#",
  },
  {
    title: "ZF Apparel — Dark Luxury Storefront",
    category: "ZF APPAREL • 2025",
    href: "https://github.com/chaudhrynihaal/zf-apparel",
    image: "/case-studies/zf-apparel.png",
  },
  {
    title: "SJ Academy — Cambridge O/A-Level Tutoring",
    category: "SJ ACADEMY • 2025",
    href: "https://github.com/chaudhrynihaal/sj-acdemyy",
    image: "/case-studies/sj-academy-logo.png",
  },
  {
    title: "Honest International — Stock & Ledger Tracking",
    category: "HONEST INTERNATIONAL • 2024",
    href: "https://github.com/chaudhrynihaal/Honest-International-internal-crm",
    image: "/case-studies/honest-international.png",
  },
  {
    title: "Sonata Apartamentos — Pre-Construction Real Estate",
    category: "SONATA APARTAMENTOS • 2024",
    href: "#",
  },
];

export type Experience = { company: string; role: string; period: string; description: string; href?: string };
export const experience: Experience[] = [
  {
    company: "Kavtech Solutions",
    role: "AI & Automation Engineer",
    period: "Lahore, Pakistan · Freelance",
    description:
      "Building AI-powered products, automation systems, and dashboards for startups and small businesses.",
  },
  {
    company: "Solo Technical Partner",
    role: "AI & Automation Engineer",
    period: "Remote · Freelance",
    description:
      "Workflow automation, AI websites, and custom dashboards for client businesses, delivered end-to-end as a one-person technical team.",
  },
];

export type Tool = { name: string; kind: string; href: string; logo?: string };
export const tools: Tool[] = [
  { name: "Python", kind: "Programming language", href: "https://www.python.org/" },
  { name: "React", kind: "Web framework", href: "https://react.dev/" },
  { name: "n8n", kind: "Workflow automation", href: "https://n8n.io/" },
  { name: "TensorFlow", kind: "Machine learning", href: "https://www.tensorflow.org/" },
  { name: "PyTorch", kind: "Machine learning", href: "https://pytorch.org/" },
  { name: "AWS", kind: "Cloud platform", href: "https://aws.amazon.com/" },
  { name: "Figma", kind: "Design tool", href: "https://www.figma.com/" },
  { name: "Git", kind: "Version control", href: "https://git-scm.com/" },
];

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  body: string[];
};
export const posts: Post[] = [
  {
    slug: "starting-a-career-in-web-design",
    title: "Starting and Growing a Career in Web Design",
    excerpt:
      "As the internet continues to develop and grow exponentially, jobs related to the industry do too, particularly those that relate to web design and development.",
    date: "Apr 8, 2022",
    readTime: "6 min read",
    body: [
      "Web design is one of the few fields where you can build a portfolio before anyone hires you. Every project you finish on your own is proof of work.",
      "Start small. Redesign a page you use every day, explain your decisions, and publish the result. Repeat until the explanations get sharper than the visuals.",
    ],
  },
  {
    slug: "create-a-landing-page-that-performs-great",
    title: "Create a Landing Page That Performs Great",
    excerpt:
      "Whether you work in marketing, sales, or product design, you understand the importance of a quality landing page.",
    date: "Mar 15, 2022",
    readTime: "6 min read",
    body: [
      "A landing page has one job. Everything on it either helps a visitor take the action or gets in the way.",
      "Write the headline last. Once the offer, proof, and call to action are clear, the headline usually writes itself.",
    ],
  },
  {
    slug: "how-can-designers-prepare-for-the-future",
    title: "How Can Designers Prepare for the Future?",
    excerpt:
      "Tools change every year. The habits that survive are curiosity, clear communication, and the willingness to ship.",
    date: "Feb 28, 2022",
    readTime: "6 min read",
    body: [
      "Learn the tools, but don't marry them. The designers who last are the ones who can explain a decision without pointing at a screen.",
      "Spend time with the people who use what you make. That never goes out of date.",
    ],
  },
];
