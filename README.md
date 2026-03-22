# Lucas Oshan — Portfolio

Personal portfolio website built with Next.js 16, Tailwind CSS v4, and Framer Motion.

## Stack

- **Framework**: Next.js 16 (Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion (`motion/react`)
- **Package Manager**: pnpm

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/                  # Next.js app router
components/
  sections/           # Page sections (Hero, About, Projects, Services, Skills, Footer...)
  ui/                 # Reusable UI components
  icons/              # SVG icon components
  logos/              # Logo/brand components
config/
  site.ts             # Global site metadata
lib/
  utils.ts            # Shared utilities
public/               # Static assets (images, logos, project thumbnails)
```

## Sections

| Section | Description |
|---------|-------------|
| Hero | Intro + social links + scroll indicator |
| Projects | Sticky card stack with selected work |
| About | Quote, bio, and services accordion |
| Services | Horizontal scroll with 5 service cards |
| Skills | Bento grid with skill areas |
| Tech Stack | Auto-scrolling logo carousel |
| CTA | Contact call-to-action |
| Footer | Links and credits |

## License

Private — all rights reserved.
