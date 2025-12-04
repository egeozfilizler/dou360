# dou360

A Next.js application with 3D visualization and interactive features.

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

## Getting Started

Follow these steps to run the project locally:

### 1. Navigate to the client directory

```bash
cd client
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the `client` directory with the following variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Add any other environment variables your project needs
```

> **Note:** You'll need to sign up for [Clerk](https://clerk.com/) to get authentication keys.

### 4. Run the development server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Available Scripts

In the `client` directory, you can run:

- **`npm run dev`** - Starts the development server
- **`npm run build`** - Builds the app for production
- **`npm start`** - Runs the production build
- **`npm run lint`** - Runs ESLint to check code quality

## Tech Stack

- **Framework:** Next.js 16
- **UI:** React 19, Tailwind CSS
- **3D Graphics:** Three.js, React Three Fiber, React Three Drei
- **Animation:** GSAP, Motion
- **Authentication:** Clerk
- **Language:** TypeScript

## Project Structure

```
client/
├── app/              # Next.js app directory (pages and layouts)
├── components/       # Reusable React components
├── lib/             # Utility functions and helpers
└── public/          # Static assets
```

## Troubleshooting

- If you encounter port conflicts, you can specify a different port:
  ```bash
  PORT=3001 npm run dev
  ```

- Clear the Next.js cache if you experience build issues:
  ```bash
  rm -rf .next
  npm run dev
  ```
