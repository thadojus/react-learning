import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeSnippet } from "@/components/CodeSnippet";
import {
  TheorySection,
  Definition,
  KeyPoints,
  WhenToUse,
  ConceptCard,
} from "@/components/TheorySection";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  FolderTree,
  Route,
  Layout,
  Navigation,
  FileText,
} from "lucide-react";

const FileStructureDemo = () => {
  return (
    <div className="p-4 bg-gray-50 rounded-lg border">
      <h4 className="font-semibold text-gray-900 mb-3">
        Next.js App Router File Structure
      </h4>
      <div className="bg-white p-4 rounded border font-mono text-sm">
        <div className="space-y-1">
          <div>📁 my-nextjs-app/</div>
          <div className="ml-4">📁 app/</div>
          <div className="ml-8">📄 page.tsx (Home page - /)</div>
          <div className="ml-8">📄 layout.tsx (Root layout)</div>
          <div className="ml-8">📄 loading.tsx (Loading UI)</div>
          <div className="ml-8">📄 error.tsx (Error UI)</div>
          <div className="ml-8">📁 about/</div>
          <div className="ml-12">📄 page.tsx (About page - /about)</div>
          <div className="ml-8">📁 blog/</div>
          <div className="ml-12">📄 page.tsx (Blog listing - /blog)</div>
          <div className="ml-12">📁 [id]/</div>
          <div className="ml-16">📄 page.tsx (Blog post - /blog/123)</div>
          <div className="ml-4">📁 components/</div>
          <div className="ml-8">📄 Header.tsx</div>
          <div className="ml-8">📄 Footer.tsx</div>
          <div className="ml-4">📁 public/</div>
          <div className="ml-8">📄 favicon.ico</div>
          <div className="ml-8">🖼️ images/</div>
        </div>
      </div>
    </div>
  );
};

const RoutingDemo = () => {
  const [currentRoute, setCurrentRoute] = useState("/");

  const routes = [
    { path: "/", name: "Home", file: "app/page.tsx" },
    { path: "/about", name: "About", file: "app/about/page.tsx" },
    { path: "/blog", name: "Blog", file: "app/blog/page.tsx" },
    { path: "/blog/123", name: "Blog Post", file: "app/blog/[id]/page.tsx" },
    { path: "/dashboard", name: "Dashboard", file: "app/dashboard/page.tsx" },
  ];

  return (
    <div className="p-4 bg-blue-50 rounded-lg border">
      <h4 className="font-semibold text-blue-900 mb-3">
        Interactive Routing Demo
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h5 className="font-medium mb-2">Navigate to:</h5>
          <div className="space-y-2">
            {routes.map((route) => (
              <Button
                key={route.path}
                onClick={() => setCurrentRoute(route.path)}
                variant={currentRoute === route.path ? "default" : "outline"}
                size="sm"
                className="w-full justify-start"
              >
                {route.name} - {route.path}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <h5 className="font-medium mb-2">Current Route Info:</h5>
          <div className="bg-white p-3 rounded border">
            <p>
              <strong>URL:</strong> {currentRoute}
            </p>
            <p>
              <strong>File:</strong>{" "}
              {routes.find((r) => r.path === currentRoute)?.file}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Next.js automatically creates routes based on your file structure
              in the app directory.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const NextjsFundamentals = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Next.js Fundamentals</h1>
              <p className="text-gray-600">
                Master the React framework for production applications
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="introduction" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="introduction">Introduction</TabsTrigger>
            <TabsTrigger value="routing">Routing</TabsTrigger>
            <TabsTrigger value="layouts">Layouts</TabsTrigger>
            <TabsTrigger value="navigation">Navigation</TabsTrigger>
          </TabsList>

          <TabsContent value="introduction" className="space-y-6">
            <TheorySection
              title="What is Next.js?"
              description="Understanding the React framework for production applications"
              level="Beginner"
            >
              <Definition term="Next.js">
                Next.js is a React framework that provides additional features
                and optimizations for building production-ready web
                applications. It's built on top of React and adds powerful
                features like server-side rendering, file-based routing, and
                automatic code splitting.
              </Definition>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <ConceptCard
                  type="concept"
                  title="Framework vs Library"
                  description="React is a library for building user interfaces, while Next.js is a framework that provides structure, conventions, and additional features on top of React."
                />
                <ConceptCard
                  type="important"
                  title="Full-Stack Capabilities"
                  description="Next.js can handle both frontend and backend logic, allowing you to build complete web applications with a single framework."
                />
              </div>

              <KeyPoints
                points={[
                  "Built on top of React - all React knowledge applies",
                  "Provides file-based routing out of the box",
                  "Offers multiple rendering strategies (SSG, SSR, CSR)",
                  "Includes built-in performance optimizations",
                  "Supports API routes for backend functionality",
                  "Excellent developer experience with hot reloading",
                ]}
              />

              <WhenToUse
                scenarios={[
                  "Building production-ready React applications",
                  "Need SEO optimization with server-side rendering",
                  "Want to avoid complex routing setup",
                  "Building full-stack applications with API routes",
                  "Performance is critical for your application",
                  "Want built-in optimization features",
                ]}
              />
            </TheorySection>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Getting Started with Next.js</span>
                </CardTitle>
                <CardDescription>
                  Learn how to create and structure a Next.js application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FileStructureDemo />

                <CodeSnippet
                  title="Creating a New Next.js App"
                  language="bash"
                  description="Use the create-next-app tool to bootstrap a new Next.js project with all the necessary setup."
                  highlights={["CLI Tool", "Project Setup", "Dependencies"]}
                  code={`# Create a new Next.js app with TypeScript and Tailwind CSS
npx create-next-app@latest my-app --typescript --tailwind --app

# Navigate to the project directory
cd my-app

# Start the development server
npm run dev

# Your app will be available at http://localhost:3000

# Project structure created:
# ├── app/                 # App Router (recommended)
# │   ├── page.tsx        # Home page component
# │   ├── layout.tsx      # Root layout component
# │   └── globals.css     # Global styles
# ├── public/             # Static assets
# ├── next.config.js      # Next.js configuration
# ├── package.json        # Project dependencies
# └── tsconfig.json       # TypeScript configuration`}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="routing" className="space-y-6">
            <TheorySection
              title="File-Based Routing"
              description="Understanding how Next.js creates routes automatically from your file structure"
              level="Beginner"
            >
              <Definition term="File-Based Routing">
                In Next.js, routes are automatically created based on the file
                structure in your app directory. Each folder represents a route
                segment, and page.tsx files define the UI for that route.
              </Definition>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <ConceptCard
                  type="concept"
                  title="Conventional Routing"
                  description="No need to configure routes manually. The file system is your routing configuration."
                />
                <ConceptCard
                  type="concept"
                  title="Dynamic Routes"
                  description="Create dynamic routes using brackets [id] for parameters that change at runtime."
                />
              </div>

              <KeyPoints
                points={[
                  "page.tsx files define route components",
                  "Folders create route segments",
                  "Square brackets [param] create dynamic routes",
                  "layout.tsx files create shared layouts",
                  "loading.tsx and error.tsx provide UI states",
                  "Route groups with (folder) don't affect URL",
                ]}
              />
            </TheorySection>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Route className="h-5 w-5" />
                  <span>Routing Examples</span>
                </CardTitle>
                <CardDescription>
                  Interactive examples of how file structure maps to routes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <RoutingDemo />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <CodeSnippet
                    title="Basic Page Component"
                    language="typescript"
                    description="A simple page component that renders content for a specific route."
                    highlights={["Page Component", "Default Export", "JSX"]}
                    code={`// app/about/page.tsx
// This creates the route /about

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="text-gray-600">
        This is the about page created by the file structure.
      </p>

      {/* This content will be rendered when users visit /about */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
        <p>
          We're dedicated to making web development accessible
          and enjoyable for everyone.
        </p>
      </div>
    </div>
  );
}

// Key Points:
// 1. Must be default export
// 2. Function name can be anything (About, Page, etc.)
// 3. Returns JSX like any React component
// 4. Automatically becomes /about route`}
                  />

                  <CodeSnippet
                    title="Dynamic Route with Parameters"
                    language="typescript"
                    description="Handle dynamic routes with parameters passed through the URL."
                    highlights={[
                      "Dynamic Routes",
                      "URL Parameters",
                      "Type Safety",
                    ]}
                    code={`// app/blog/[id]/page.tsx
// This creates routes like /blog/123, /blog/my-post, etc.

interface BlogPostProps {
  params: {
    id: string; // The dynamic parameter from the URL
  };
}

export default function BlogPost({ params }: BlogPostProps) {
  const { id } = params;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        Blog Post: {id}
      </h1>

      {/* You would typically fetch data based on the id */}
      <div className="prose">
        <p>This is blog post with ID: {id}</p>
        <p>
          In a real app, you'd fetch the post data using this ID
          from your database or API.
        </p>
      </div>
    </div>
  );
}

// Examples of URLs this handles:
// /blog/123 → params.id = "123"
// /blog/my-first-post → params.id = "my-first-post"
// /blog/2024-updates → params.id = "2024-updates"`}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="layouts" className="space-y-6">
            <TheorySection
              title="Layouts in Next.js"
              description="Creating shared UI components that wrap pages"
              level="Intermediate"
            >
              <Definition term="Layout Components">
                Layouts are components that wrap page content and provide shared
                UI elements like navigation bars, footers, and common styling.
                In Next.js, layout.tsx files automatically wrap all pages in
                their route segment.
              </Definition>

              <KeyPoints
                points={[
                  "layout.tsx files create shared layouts for route segments",
                  "Layouts are preserved during navigation",
                  "Nested layouts create a layout hierarchy",
                  "Root layout is required and wraps the entire app",
                  "Layouts can have their own state and effects",
                  "Perfect for navigation, authentication checks, and common UI",
                ]}
              />
            </TheorySection>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Layout className="h-5 w-5" />
                  <span>Layout Examples</span>
                </CardTitle>
                <CardDescription>
                  Learn how to create and use layouts effectively
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <CodeSnippet
                    title="Root Layout (Required)"
                    language="typescript"
                    description="The root layout wraps your entire application and is required in every Next.js app."
                    highlights={[
                      "Root Layout",
                      "HTML Structure",
                      "Global Styles",
                    ]}
                    code={`// app/layout.tsx
// This is the root layout - required for every Next.js app

import './globals.css';

export const metadata = {
  title: 'My Next.js App',
  description: 'A sample Next.js application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Global navigation */}
        <nav className="bg-blue-600 text-white p-4">
          <div className="container mx-auto">
            <h1 className="text-xl font-bold">My App</h1>
          </div>
        </nav>

        {/* Main content area */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Global footer */}
        <footer className="bg-gray-800 text-white p-4">
          <div className="container mx-auto text-center">
            © 2024 My Next.js App
          </div>
        </footer>
      </body>
    </html>
  );
}

// Key Features:
// 1. Must include <html> and <body> tags
// 2. children prop contains page content
// 3. Can include global navigation/footer
// 4. Metadata for SEO`}
                  />

                  <CodeSnippet
                    title="Nested Layout Example"
                    language="typescript"
                    description="Create layouts for specific route segments that inherit from parent layouts."
                    highlights={["Nested Layouts", "Route Segments", "Sidebar"]}
                    code={`// app/dashboard/layout.tsx
// This layout only applies to /dashboard routes

import { Sidebar } from '@/components/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar for dashboard pages */}
      <aside className="w-64 bg-gray-100 p-4">
        <nav>
          <ul className="space-y-2">
            <li>
              <a href="/dashboard" className="block p-2 hover:bg-gray-200">
                Overview
              </a>
            </li>
            <li>
              <a href="/dashboard/analytics" className="block p-2 hover:bg-gray-200">
                Analytics
              </a>
            </li>
            <li>
              <a href="/dashboard/settings" className="block p-2 hover:bg-gray-200">
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content area for dashboard pages */}
      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  );
}

// This layout affects:
// /dashboard/page.tsx
// /dashboard/analytics/page.tsx
// /dashboard/settings/page.tsx`}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="navigation" className="space-y-6">
            <TheorySection
              title="Navigation in Next.js"
              description="Learn how to navigate between pages efficiently"
              level="Beginner"
            >
              <Definition term="Client-Side Navigation">
                Next.js provides the Link component for client-side navigation,
                which enables fast page transitions without full page reloads.
                This provides a better user experience compared to traditional
                anchor tags.
              </Definition>

              <KeyPoints
                points={[
                  "Use Link component instead of <a> tags for internal navigation",
                  "Client-side navigation is faster than full page loads",
                  "Automatic code splitting loads only needed JavaScript",
                  "Prefetching improves perceived performance",
                  "useRouter hook provides programmatic navigation",
                  "Supports both App Router and Pages Router",
                ]}
              />
            </TheorySection>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Navigation className="h-5 w-5" />
                  <span>Navigation Examples</span>
                </CardTitle>
                <CardDescription>
                  Learn different ways to navigate in Next.js applications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <CodeSnippet
                    title="Link Component Usage"
                    language="typescript"
                    description="Use the Link component for fast client-side navigation between pages."
                    highlights={[
                      "Link Component",
                      "Client Navigation",
                      "Prefetching",
                    ]}
                    code={`// components/Navigation.tsx
import Link from 'next/link';

export function Navigation() {
  return (
    <nav className="bg-white shadow p-4">
      <div className="container mx-auto flex space-x-6">
        {/* Basic link usage */}
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800"
        >
          Home
        </Link>

        {/* Link to dynamic route */}
        <Link
          href="/blog/my-first-post"
          className="text-blue-600 hover:text-blue-800"
        >
          My First Post
        </Link>

        {/* Link with query parameters */}
        <Link
          href="/search?query=nextjs"
          className="text-blue-600 hover:text-blue-800"
        >
          Search Next.js
        </Link>

        {/* External link (use regular <a> tag) */}
        <a
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 hover:text-green-800"
        >
          Next.js Docs
        </a>
      </div>
    </nav>
  );
}

// Key Benefits:
// - Fast client-side navigation
// - Automatic prefetching of linked pages
// - No full page reload
// - Preserves scroll position`}
                  />

                  <CodeSnippet
                    title="Programmatic Navigation"
                    language="typescript"
                    description="Use the useRouter hook for programmatic navigation in response to user actions."
                    highlights={[
                      "useRouter Hook",
                      "Programmatic Navigation",
                      "Route Actions",
                    ]}
                    code={`// components/LoginForm.tsx
'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (formData: FormData) => {
    setIsLoading(true);

    try {
      // Simulate login API call
      const response = await fetch('/api/login', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Navigate to dashboard after successful login
        router.push('/dashboard');
      } else {
        // Stay on current page and show error
        alert('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form action={handleLogin} className="space-y-4">
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        className="w-full p-2 border rounded"
      />

      <div className="flex space-x-2">
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        {/* Navigate back */}
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 bg-gray-600 text-white rounded"
        >
          Go Back
        </button>
      </div>
    </form>
  );
}

// Router methods:
// router.push('/path') - Navigate to new page
// router.replace('/path') - Replace current page
// router.back() - Go back in history
// router.forward() - Go forward in history
// router.refresh() - Refresh current page`}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default NextjsFundamentals;
