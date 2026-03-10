// ─────────────────────────────────────────────────────────────
// data/index.js  ←  EDIT THIS FILE with your real information
// ─────────────────────────────────────────────────────────────

export const CHEF = {
  name:      'Vallabh Panigrahi',
  title:     'AI, SDE and Home Chef',
  avatar:    '👨‍🍳',
  tagline:   'I build fast UIs by day, cook up AI experiments by night, and plate both with care.',
  bio:       "Fresh SDE at Capgemini with a frontend soul and an AI appetite. Started cooking code in 2023 — went from building React UIs to engineering AI systems in under 2 years. Currently growing fast, shipping real software, and obsessing over Gen AI, vibe coding, and whatever's on the stove.",
  location:  'Mumbai, India 🇮🇳',
  stats: [
    { emoji: '💻', value: '2+ yrs', label: 'Coding Journey' },
    { emoji: '🏢', value: '3',      label: 'Experiences' },
    { emoji: '🤖', value: 'Daily',  label: 'AI-Assisted Dev' },
    { emoji: '📈', value: '2023',   label: 'Started Cooking' },
  ],
  socials: {
    github:   'https://github.com/Vallabh1807',
    linkedin: 'https://www.linkedin.com/in/vallabh-panigrahi/',
    email:    'panigrahivallabh@gmail.com',
  },
}

export const TIMELINE = [
  {
    year:  '2023',
    emoji: '🌱',
    title: 'First Flame',
    desc:  'Picked up HTML, CSS and JavaScript from scratch. Wrote first React component. Broke it. Fixed it. Got completely hooked.',
  },
  {
    year:  'Early 2024',
    emoji: '🚀',
    title: 'Line Cook @ QuickFash',
    desc:  'Joined QuickFash as a Frontend Developer. Built and shipped the frontend for a quick-commerce fashion delivery platform. First real production experience.',
  },
  {
    year:  'Late 2024',
    emoji: '🤖',
    title: 'AI Kitchen — Infosys',
    desc:  'Landed an AI Engineering internship at Infosys. Dived deep into Gen AI, prompt engineering and agentic systems. The vibe coding era officially began.',
  },
  {
    year:  'Jul 2025',
    emoji: '👨‍🍳',
    title: 'Fresh Chef @ Capgemini',
    desc:  'Joined Capgemini as a fresher SDE. Day one of the big leagues — learning fast, contributing faster, and bringing the AI mindset into every task.',
  },
]

export const PROJECTS = [
  {
    id: 1, emoji: '🌮', color: '#FFE8D6', accent: '#FF6B35',
    category: "Chef's Special",
    title: 'Taco Tracker',
    subtitle: 'Real-time food ordering platform',
    desc: 'Full-stack ordering app with live kitchen updates, WebSocket order tracking, and a mobile-first UI. Handles 200+ concurrent orders per hour.',
    stack: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    difficulty: 4, year: '2024',
    live: '#', repo: '#',
  },
  {
    id: 2, emoji: '🥗', color: '#D5F5E3', accent: '#06D6A0',
    category: 'Main Course',
    title: 'FreshFeed',
    subtitle: 'AI-powered meal planner',
    desc: 'Personalised weekly meal planner powered by OpenAI. Generates menus based on dietary restrictions and taste profiles. 10,000+ active users.',
    stack: ['Next.js', 'OpenAI', 'PostgreSQL', 'Vercel'],
    difficulty: 5, year: '2024',
    live: '#', repo: '#',
  },
  {
    id: 3, emoji: '🍜', color: '#D4F1F9', accent: '#118AB2',
    category: 'Main Course',
    title: 'Ramen Dashboard',
    subtitle: 'Multi-location analytics',
    desc: 'Analytics platform for a restaurant chain tracking sales, inventory burn, and customer satisfaction across 12 locations with D3 visualisations.',
    stack: ['Vue.js', 'D3.js', 'Python', 'FastAPI'],
    difficulty: 3, year: '2023',
    live: '#', repo: '#',
  },
  {
    id: 4, emoji: '🍕', color: '#FDEBD0', accent: '#FF9900',
    category: 'Starter',
    title: 'Pizza POS',
    subtitle: 'Point-of-sale system',
    desc: 'Full-featured POS with inventory management, staff roles, shift reports, and Stripe payments. Deployed in 3 local restaurants.',
    stack: ['TypeScript', 'Prisma', 'Tailwind', 'Stripe'],
    difficulty: 3, year: '2023',
    live: '#', repo: '#',
  },
  {
    id: 5, emoji: '🌶️', color: '#FDEDEC', accent: '#E63946',
    category: "Chef's Special",
    title: 'HeatMap Reviews',
    subtitle: 'Geo-sentiment analysis',
    desc: 'Scrapes restaurant reviews, analyses sentiment with NLP, and plots results geographically with heat overlays to show customer mood by neighbourhood.',
    stack: ['Python', 'spaCy', 'Mapbox', 'Flask'],
    difficulty: 4, year: '2022',
    live: '#', repo: '#',
  },
  {
    id: 6, emoji: '🧁', color: '#F4ECF7', accent: '#9B5DE5',
    category: 'Dessert',
    title: 'Bakery CMS',
    subtitle: 'Headless CMS for bakeries',
    desc: 'Custom headless CMS with drag-and-drop product management, online orders, and gallery builder. Reduced admin time by 60%.',
    stack: ['React', 'Strapi', 'AWS S3', 'CloudFront'],
    difficulty: 2, year: '2022',
    live: '#', repo: '#',
  },
]

export const SKILLS = [
  {
    shelf: '🤖 AI & Vibe Coding',
    items: [
      { name: 'Prompt Eng.',  pct: 88, color: '#A78BFA' },
      { name: 'Agentic AI',   pct: 80, color: '#818CF8' },
      { name: 'Gen AI',       pct: 85, color: '#6EE7B7' },
      { name: 'No-Code',      pct: 78, color: '#FCD34D' },
      { name: 'Vibe Coding',  pct: 90, color: '#F472B6' },
      { name: 'RAG / LLMs',   pct: 75, color: '#67E8F9' },
      { name: 'AI Agents',    pct: 72, color: '#C4B5FD' },
    ],
  },
  {
    shelf: '⚡ Frontend',
    items: [
      { name: 'React',        pct: 92, color: '#61DAFB' },
      { name: 'TypeScript',   pct: 85, color: '#3178C6' },
      { name: 'Next.js',      pct: 88, color: '#555' },
      { name: 'CSS/Tailwind', pct: 95, color: '#38BDF8' },
      { name: 'Vue.js',       pct: 78, color: '#4FC08D' },
    ],
  },
  {
    shelf: '🔧 Backend',
    items: [
      { name: 'Node.js',    pct: 88, color: '#68A063' },
      { name: 'Python',     pct: 82, color: '#306998' },
      { name: 'PostgreSQL', pct: 78, color: '#336791' },
      { name: 'MongoDB',    pct: 75, color: '#47A248' },
      { name: 'Redis',      pct: 68, color: '#DC382D' },
    ],
  },
  {
    shelf: '☁️ Tools',
    items: [
      { name: 'Git',    pct: 94, color: '#F05032' },
      { name: 'Docker', pct: 72, color: '#2496ED' },
      { name: 'AWS',    pct: 68, color: '#FF9900' },
      { name: 'Figma',  pct: 80, color: '#A259FF' },
    ],
  },
]

export const TESTIMONIALS = [
  { name: 'Sarah Chen',   role: 'CTO @ TastyByte',      avatar: '👩‍💼', rating: 5, text: 'Alex delivered our ordering platform in 6 weeks. Clean, documented, scalable code. Our team inherited it with zero friction.', project: 'Taco Tracker' },
  { name: 'Marco Rossi',  role: 'Founder @ PizzaPalace', avatar: '👨‍🍳', rating: 5, text: 'The POS system saved us hours every single day. Same-day responses whenever we needed changes. Truly cares about your product.', project: 'Pizza POS' },
  { name: 'Priya Mehta',  role: 'PM @ NourishCo',        avatar: '👩‍💻', rating: 5, text: 'FreshFeed went from idea to 10k users in 3 months. Alex ships fast without sacrificing quality. The AI integration is seamless.', project: 'FreshFeed' },
  { name: 'Yuki Tanaka',  role: 'Data Lead @ RamenGroup', avatar: '👨‍🔬', rating: 5, text: 'The dashboard surfaces insights we never had before. D3 charts that are actually readable. Beautiful code. Would hire again instantly.', project: 'Ramen Dashboard' },
]

export const RESUME = {
  downloadLink: 'https://example.com/resume.pdf',
  highlights: [
    { label: "Today's Special", value: "Senior Full-Stack Developer" },
    { label: "Years of Experience", value: "5+ Years" },
    { label: "Location", value: "Mumbai, India" },
    { label: "Open to", value: "Remote / Hybrid / On-site" },
  ]
}

export const CREDENTIALS = [
  { name: 'AWS Cloud Practitioner', issuer: 'Amazon', year: '2024', emoji: '☁️', link: '#' },
  { name: 'Meta Front-End Developer', issuer: 'Meta', year: '2023', emoji: '⚛️', link: '#' },
  { name: 'Google UX Design', issuer: 'Google', year: '2023', emoji: '🎨', link: '#' },
  { name: 'MongoDB Associate', issuer: 'MongoDB', year: '2022', emoji: '🍃', link: '#' },
  { name: 'Node.js Certification', issuer: 'OpenJS Foundation', year: '2022', emoji: '🟢', link: '#' },
]
