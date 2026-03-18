# Bantrly — Speaking Practice for Kids

A fun, K–12 speaking practice app that helps kids build confidence through interactive quests and lessons. Built with React, TypeScript, and Vite.

---

## Features

- 🗺️ **Quest Map** — A visual learning path with unlockable lessons and quests
- 🎤 **Lesson Types** — Character reads, emotion drills, pace control, tongue twisters, listen & echo, and more
- ⭐ **XP & Stars** — Earn experience points and star ratings for completed lessons
- 🌙 **Dark / Light Mode** — Theme toggle built in
- 📱 **Mobile-First Design** — Optimized for phones and tablets

---

## Tech Stack

- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [React Router v6](https://reactrouter.com/)

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)

You can check your versions by running:

```bash
node -v
npm -v
```

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/bantrly.git
cd bantrly
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

Open your browser and go to:

```
http://localhost:8080
```

The app will automatically reload when you make changes to the code.

---

## Project Structure

```
bantrly/
├── public/               # Static assets
├── src/
│   ├── assets/           # Images (mascot, blobs)
│   ├── components/       # Reusable UI components
│   │   ├── lesson/       # Lesson-specific components
│   │   └── ui/           # shadcn/ui base components
│   ├── data/
│   │   └── lessons.ts    # All curriculum data (units, quests, lessons)
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── pages/            # App pages (QuestMap, LessonScreen, etc.)
│   ├── App.tsx           # Root component and routes
│   ├── main.tsx          # App entry point
│   └── index.css         # Global styles
├── index.html
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the local development server |
| `npm run build` | Build the app for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint checks |
| `npm run test` | Run unit tests |

---

## Adding New Lesson Content

All curriculum data lives in `src/data/lessons.ts`. To add a new lesson:

1. Add a new `LessonNode` entry inside the relevant `Quest` in the `UNITS` array
2. Add the full lesson content to the `PLAYABLE_LESSONS` array using the appropriate lesson type interface
3. Set the lesson `status` to `"locked"` initially — it will unlock as previous lessons are completed

---

## Deployment

This app is deployed on [Netlify](https://netlify.com). To deploy your own copy:

1. Push the repo to GitHub
2. Connect the repo to Netlify
3. Set the build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Click Deploy

Every push to `main` will automatically trigger a new deploy.

Link to the [site](https://bantrlyharini.netlify.app/)

---

