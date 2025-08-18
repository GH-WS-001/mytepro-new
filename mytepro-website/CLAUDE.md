# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 15 application for MyTePro's global real estate technology platform, featuring:
- Multi-language support (English, Arabic, Chinese, Japanese)
- 3D visualization with Three.js and React Three Fiber
- AI chatbot integration
- Content management with Sanity CMS
- Performance-focused architecture with Turbopack

## Development Commands

```bash
npm run dev        # Start development server (Turbopack enabled)
npm run build      # Create production build
npm run start      # Start production server
npm run lint       # Run ESLint checks
```

## Architecture & Structure

### Core Architecture
- **App Router**: Route handling via `src/app/[locale]/`
- **Internationalization**: Middleware-based routing with `next-intl`
- **3D Visualization**: React Three Fiber integration for VR/3D experiences
- **Component-Based**: Reusable components in `src/components/`

### Key Architectural Patterns
1. **Locale Handling**: 
   - Dynamic route segments (`[locale]`)
   - Fallback to English when translations missing
   - JSON message files in `src/messages/`

2. **Data Fetching**:
   - Sanity CMS integration via `@sanity/client`
   - Custom hooks (`useSanityData`) for content loading

3. **3D Integration**:
   - ModelViewer component for 3D rendering
   - Three.js scene management

4. **AI Chatbot**:
   - API route at `src/app/api/chat/route.ts`
   - Client component in `src/app/components/Chatbot.tsx`

### File Structure Highlights
```
src/
├── app/               # App router implementation
│   └── [locale]/      # Localized routes
│       ├── layout.tsx # Root layout with metadata
│       ├── page.tsx   # Home page with animations
│       └── vr-digital-twin/ # 3D showcase
├── components/        # Reusable components
│   ├── Chatbot.tsx    # AI chat interface
│   └── ModelViewer.tsx # 3D renderer
├── hooks/             # Custom hooks
├── lib/               # Utility libraries
├── messages/          # Translation files
└── middleware.ts      # Internationalization handler
```

## Technical Specifications
- **Next.js**: 15.4.6 with Turbopack
- **React**: 19.1.0 with concurrent features
- **Animation**: Framer Motion v12
- **Styling**: Tailwind CSS v4
- **i18n**: next-intl v4

## Performance Targets
- <1s load time (LCP)
- 90+ Lighthouse scores
- Service worker caching
- Dynamic imports for 3D assets