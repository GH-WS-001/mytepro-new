# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 web application for MyTePro's global expansion, focusing on real estate technology solutions. The project is currently in early development stages, built with TypeScript, Tailwind CSS, and Framer Motion for animations. The application features internationalization support for English, Arabic, Chinese, and Japanese languages.

## Development Commands

All development work should be done in the `mytepro-website/` directory:

```bash
cd mytepro-website
npm run dev        # Start development server on localhost:3000
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

## Architecture & Structure

### Core Framework
- **Next.js 15** with App Router and TypeScript
- **React 19** with strict mode enabled
- **Tailwind CSS 4** for styling
- **Framer Motion** for animations and interactions

### Directory Structure
```
mytepro-website/
├── src/
│   ├── app/[locale]/          # Internationalized app routes
│   │   ├── globals.css        # Global styles with Tailwind
│   │   ├── layout.tsx         # Root layout with metadata and chatbot
│   │   ├── page.tsx           # Home page with animated hero section
│   │   └── vr-digital-twin/   # VR showcase page
│   ├── components/            # Reusable components
│   │   └── Chatbot.tsx        # Basic chatbot component
│   ├── i18n/                  # Internationalization configuration
│   └── messages/              # Translation files (en, ar, zh, ja)
```

### Internationalization
- Uses `next-intl` for multi-language support
- Supported locales: English (default), Arabic, Chinese, Japanese
- Middleware handles locale routing in `src/middleware.ts`
- Translation files in JSON format in `src/messages/`

### Key Components

**Home Page (`src/app/[locale]/page.tsx`)**:
- Animated hero section with Framer Motion
- Lead capture form with email input
- Uses translation keys from `src/messages/en.json`

**VR Digital Twin Page (`src/app/[locale]/vr-digital-twin/page.tsx`)**:
- Placeholder for 3D model integration
- Currently shows basic layout with gray placeholder area

**Chatbot Component (`src/app/components/Chatbot.tsx`)**:
- Fixed position floating chat button
- Basic placeholder implementation

## Development Patterns

### Styling
- Use Tailwind CSS utility classes
- Components should use responsive design patterns
- Dark mode support is configured

### Internationalization
- Always use `useTranslations()` hook for text content
- Translation keys follow nested object structure
- Default locale is English (`en`)

### Animations
- Use Framer Motion for all animations
- Components include staggered animation delays
- Motion components wrap standard HTML elements

### Code Quality
- ESLint configuration follows Next.js core web vitals
- TypeScript strict mode enabled
- Use proper TypeScript types for all components

## Future Features (Per Technical Spec)

The project is planned to include:
- Three.js/React Three Fiber for 3D elements
- Sanity CMS for headless content management
- OpenAI GPT-4 integration for AI chatbot
- Google Analytics 4 and Facebook Pixel integration
- Service workers for caching
- Performance optimization targeting <1s load time

## Current State

The application is in early development with:
- Basic Next.js structure in place
- Internationalization configured
- Placeholder implementations for key features
- Framer Motion animations on home page
- Basic chatbot component (non-functional)

All core dependencies are installed and the development server runs successfully on localhost:3000.