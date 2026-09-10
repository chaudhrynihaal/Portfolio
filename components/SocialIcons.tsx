// Brand icons are not shipped in lucide-react anymore, so these are simple inline outlines.
const base = { width: 26, height: 26, fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const icons = {
  dribbble: () => (
    <svg {...base} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M19.1 5.6c-2.4 3-6 5-11.4 5.5M4.5 15.5c3.5-1.4 7.5-1.6 12.1-.4M8.5 3.2c2.9 3.2 5.2 7.6 6.5 12.4M2.1 12.6c3.9.2 8.4-.8 12.3-4.4" /></svg>
  ),
  twitter: () => (
    <svg {...base} viewBox="0 0 24 24"><path d="M22 5.8c-.7.3-1.5.5-2.3.6a4 4 0 0 0 1.8-2.2 8 8 0 0 1-2.6 1 4 4 0 0 0-6.9 3.7A11.4 11.4 0 0 1 3.7 4.7a4 4 0 0 0 1.2 5.4 4 4 0 0 1-1.8-.5v.1a4 4 0 0 0 3.2 3.9 4 4 0 0 1-1.8.1 4 4 0 0 0 3.7 2.8A8.1 8.1 0 0 1 2 18.1a11.4 11.4 0 0 0 6.2 1.8c7.4 0 11.5-6.1 11.5-11.5v-.5A8.2 8.2 0 0 0 22 5.8z" /></svg>
  ),
  instagram: () => (
    <svg {...base} viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" /></svg>
  ),
  youtube: () => (
    <svg {...base} viewBox="0 0 24 24"><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="M10 9.2v5.6l4.8-2.8L10 9.2z" fill="currentColor" stroke="none" /></svg>
  ),
  github: () => (
    <svg {...base} viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-3.16 19.5c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" fill="currentColor" stroke="none" /></svg>
  ),
  linkedin: () => (
    <svg {...base} viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M7.5 10.5v6M7.5 7.5v.01M11.5 16.5v-3.5c0-1.4.9-2.5 2.25-2.5S16 11.6 16 13v3.5" /></svg>
  ),
  email: () => (
    <svg {...base} viewBox="0 0 24 24"><rect x="2.5" y="4.5" width="19" height="15" rx="3" /><path d="M3.5 6.5l8.5 6 8.5-6" /></svg>
  ),
};
