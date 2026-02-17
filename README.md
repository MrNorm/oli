# oli

Personal website and blog built with Vike, React, and Tailwind CSS. Deployed on Cloudflare Pages.

## Prerequisites

- Node.js 18+
- pnpm
- PayloadCMS backend with GraphQL API

## Getting Started

### Environment Setup

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Required variables:
- `VITE_CMS_API_URL` - PayloadCMS GraphQL endpoint
- `VITE_CDN_URL` - CDN domain for media assets
- `VITE_USE_CDN_OPTIMIZATION` - Enable Cloudflare image optimization (production)

### Installation

```bash
pnpm install
```

### Development

Generate GraphQL types and start dev server:

```bash
pnpm codegen
pnpm dev
```

Watch mode for GraphQL types:

```bash
pnpm codegen:watch
```

## Building for Production

```bash
pnpm build
```

The build process:
1. Generates GraphQL types via codegen
2. Builds optimized static assets
3. Creates Cloudflare Workers bundle

## Deployment

Deploy to Cloudflare Pages:

```bash
pnpm deploy
```

Requires Wrangler authentication. See `wrangler.jsonc` for configuration.

## Project Structure

- `/pages` - Vike pages with SSR support
- `/components` - React components including custom retro-styled UI
- `/lib` - Utilities, GraphQL client, and CMS helpers
- `/assets` - Static assets

## Tech Stack

- **Framework**: Vike (SSR/SSG)
- **UI**: React 19, Tailwind CSS 4
- **Data**: Apollo Client, GraphQL Codegen
- **Hosting**: Cloudflare Pages + Workers
- **Images**: Cloudflare Images for optimization

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Production build
- `pnpm preview` - Preview production build locally
- `pnpm deploy` - Deploy to Cloudflare
- `pnpm lint` - Run ESLint
- `pnpm codegen` - Generate GraphQL types

## License

MIT
