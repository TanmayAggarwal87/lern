  # Lern: AI-Powered Learning Platform

Lern is an innovative web application designed to revolutionize the way users acquire knowledge. Leveraging the power of Artificial Intelligence, specifically the Google Gemini API, Lern allows users to generate comprehensive and personalized learning materials from youtube video URL's allowing them to create flash cards excercises and description of a video for better learning and escaping the ` Tutorial Hell `. It aims to provide a dynamic and efficient platform for creating study guides, summaries, and educational content tailored to individual learning needs.

## ✨ Features

*   **Intelligent Content Generation:** Utilizes the Google Gemini API to produce high-quality, context-aware learning materials.
*   **Transcript-to-Learning Material:** Ability to process and transform raw transcripts (e.g., from videos) into structured educational content, making complex information digestible.
*   **Personalized Learning Paths:** Dynamic routing enables dedicated pages for each generated learning module, allowing for focused and organized study.
*   **Modern & Responsive UI:** Built with Next.js and Shadcn UI components for a seamless, intuitive, and visually appealing user experience across devices.
*   **Scalable API Architecture:** Organized API routes provide robust backend support for managing content generation and transcript processing.

## 💻 Tech Stack

*   **Frontend Framework:** [Next.js](https://nextjs.org/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **UI Library:** [React](https://react.dev/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** [Shadcn UI](https://ui.shadcn.com/)
*   **AI Integration:** [Google Gemini API](https://ai.google.dev/gemini)
*   **Code Quality:** [ESLint](https://eslint.org/)
*   **Package Manager:** [npm](https://www.npmjs.com/) / [Yarn](https://yarnpkg.com/) / [pnpm](https://pnpm.io/)

## 🚀 Installation Guide

To get Lern up and running on your local machine, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/TanmayAggarwal87/lern.git
cd lern
```

### 2. Install dependencies

Choose your preferred package manager:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set up Environment Variables

Create a `.env.local` file in the root directory of the project and add your Google Gemini API key:

```
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

You can obtain a free API key from [Google AI Studio](https://ai.google.dev/).

### 4. Run the Development Server

Start the Next.js development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
.
├── public/                      # Static assets (images, favicons, SVGs)
├── src/
│   ├── app/                     # Next.js App Router (pages and API routes)
│   │   ├── [id]/                # Dynamic route for displaying individual learning materials
│   │   │   └── page.tsx         # Page for a specific learning material ID
│   │   ├── api/                 # Backend API routes for data fetching and processing
│   │   │   ├── gemini/          # API endpoint for interacting with the Gemini AI model
│   │   │   │   └── route.ts     # Handles AI content generation requests
│   │   │   └── transcripts/     # API endpoint for processing transcripts
│   │   │       └── route.ts     # Handles transcript-related requests (e.g., parsing)
│   │   ├── favicon.ico          # Application favicon
│   │   ├── globals.css          # Global CSS styles (includes Tailwind CSS directives)
│   │   ├── layout.tsx           # Root layout component for the entire application
│   │   └── page.tsx             # The main landing page of the application
│   ├── components/              # Reusable React components
│   │   ├── LearningMaterialsDisplay.tsx # Component responsible for rendering generated learning content
│   │   └── ui/                  # Shadcn UI components (e.g., buttons, cards, inputs)
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       └── input.tsx
│   └── lib/                     # Utility functions, type definitions, and core logic
│       ├── generateLearningMaterials.ts # Core function for orchestrating AI material generation
│       ├── types.ts             # TypeScript type definitions for various data structures
│       └── utils.ts             # General utility functions and helpers
├── .gitignore                   # Specifies intentionally untracked files to ignore
├── components.json              # Configuration file for Shadcn UI components
├── eslint.config.mjs            # ESLint configuration for maintaining code quality
├── next.config.ts               # Next.js specific configuration file
├── package.json                 # Project metadata, scripts, and dependencies
├── package-lock.json            # Records the exact dependency tree (for npm)
├── postcss.config.mjs           # PostCSS configuration, typically for Tailwind CSS processing
├── tsconfig.json                # TypeScript compiler configuration
└── README.md                    # This README file
```

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file (to be created) for more details.

-- made by docify --
