# GEMINI.md

## Project Overview

This project is a Next.js web application for MyTePro's global expansion, focusing on real estate technology solutions. It's built with Next.js 14, React, TypeScript, and Tailwind CSS. The project also incorporates Framer Motion for animations, Three.js/React Three Fiber for 3D elements, and `next-intl` for internationalization.

The application is in a very early stage of development, with the main page being the default Next.js template.

## Key Features (as per TECHNICAL_SPECIFICATION.md)

*   **Interactive Hero Section**: With 3D building visualization and a lead capture form.
*   **VR Digital Twin Showcase**: Immersive 3D property tours.
*   **AI Chatbot**: Integrated with OpenAI's GPT-4.
*   **Headless CMS**: Content is managed through Sanity CMS.

## Building and Running

To get the development server running, use the following command:

```bash
npm run dev
```

This will start the development server on [http://localhost:3000](http://localhost:3000).

Other available scripts:

*   `npm run build`: Builds the application for production.
*   `npm run start`: Starts a production server.
*   `npm run lint`: Lints the project files.

## Development Conventions

*   **Styling**: The project uses Tailwind CSS for styling. The configuration can be found in `tailwind.config.ts` and the global styles in `src/app/globals.css`.
*   **TypeScript**: The project is configured to use TypeScript with strict mode enabled. The configuration can be found in `tsconfig.json`.
*   **Linting**: The project uses ESLint for linting. The configuration can be found in `eslint.config.mjs`.
*   **Components**: Components are located in the `src` directory. The main page component is `src/app/page.tsx`.
*   **Public Assets**: Static assets like images and SVGs are stored in the `public` directory.
*   **Internationalization**: The project uses `next-intl` for multi-language support (English, Arabic, Chinese, Japanese).
*   **Performance**: The project aims for a <1s load time globally, utilizing Vercel Edge Network, image optimization, code splitting, and service workers.
*   **Analytics**: The project uses Google Analytics 4, Facebook Pixel, and LinkedIn Insight Tag for tracking.
