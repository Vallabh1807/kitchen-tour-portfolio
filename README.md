# 👨‍🍳 Kitchen Tour Portfolio

A scroll-driven, cinematic kitchen tour portfolio. The visitor scrolls through a restaurant — from the night exterior, through a door that swings open, all the way to the back kitchen and contact form.

---

## 🚀 Quick Start

```bash
npm install
npm run dev
# open http://localhost:5173
```

## 🏗️ Build for production

```bash
npm run build
# output → /dist — deploy to Vercel, Netlify, GitHub Pages
```

---

## 📁 Structure

```
src/
├── App.jsx                  # Assembles scenes in scroll order
├── main.jsx
│
├── styles/
│   └── globals.css          # Design tokens, utility classes
│
├── hooks/
│   ├── useScrollProgress.js # Scroll % engine + per-section progress
│   └── useReveal.js         # IntersectionObserver scroll-reveal
│
├── data/
│   └── index.js             # ← EDIT THIS with your real info
│
├── components/
│   ├── Cursor.jsx           # Chef hat cursor
│   ├── ProgressBar.jsx      # Top progress bar
│   ├── ScrollHint.jsx       # Bouncing scroll arrow
│   └── ProjectCard.jsx      # Project card + modal
│
└── scenes/                  # One file per scroll section
    ├── SceneOutside.jsx     # Night exterior + glowing sign
    ├── SceneDoor.jsx        # Door opens as you scroll
    ├── SceneReception.jsx   # Welcome mat + about me
    ├── SceneProjects.jsx    # Grill station — your work
    ├── ScenePantry.jsx      # Shelves with skill jars
    ├── SceneTimeline.jsx    # Career journey timeline
    ├── SceneReviews.jsx     # Client testimonials
    └── SceneContact.jsx     # Order ticket contact form
```

---

## ✏️ Customising Content

**All content is in `src/data/index.js`** — one file, clearly commented:

| Export         | What to change                              |
|----------------|---------------------------------------------|
| `CHEF`         | Name, title, bio, stats, social links       |
| `TIMELINE`     | Career milestones                           |
| `PROJECTS`     | Your projects, stack, links                 |
| `SKILLS`       | Skill shelves, % levels, colours            |
| `TESTIMONIALS` | Client reviews                              |

---

## 🎨 How the scroll works

- **SceneOutside** & **SceneDoor** use `sectionProgress()` from `useScrollProgress` — they read scroll position directly to animate in real-time (door angle, sky darkness, etc.)
- **All other scenes** use `useReveal()` — an `IntersectionObserver` that adds `.visible` to `.reveal` elements as they enter the viewport, triggering CSS transitions
- The **ProgressBar** reads global `progress` (0–1) from `useScrollProgress`

---

## 📱 Mobile

Fully responsive. Grid columns collapse to single column, font sizes use `clamp()`, touch scrolling works natively.
