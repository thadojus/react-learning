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
  Server,
  Globe,
  Database,
  Zap,
  Clock,
  RefreshCw,
} from "lucide-react";

const RenderingStrategyDemo = () => {
  const [selectedStrategy, setSelectedStrategy] = useState("SSR");

  const strategies = [
    {
      id: "SSR",
      name: "Server-Side Rendering",
      description: "Page is rendered on the server for each request",
      pros: ["SEO friendly", "Fast initial load", "Up-to-date data"],
      cons: ["Higher server load", "Slower navigation"],
      use: "Dynamic content that changes frequently",
    },
    {
      id: "SSG",
      name: "Static Site Generation",
      description: "Page is pre-rendered at build time",
      pros: ["Fastest performance", "CDN cacheable", "Low server cost"],
      cons: ["Data can be stale", "Rebuild needed for updates"],
      use: "Content that doesn't change often",
    },
    {
      id: "ISR",
      name: "Incremental Static Regeneration",
      description: "Static pages that can be updated after deployment",
      pros: ["Fast performance", "Fresh data", "Scalable"],
      cons: ["More complex", "Initial requests might be slower"],
      use: "Content that updates periodically",
    },
    {
      id: "CSR",
      name: "Client-Side Rendering",
      description: "Page is rendered in the browser",
      pros: ["Interactive UI", "Reduced server load", "Real-time updates"],
      cons: ["SEO challenges", "Slower initial load"],
      use: "Dashboard, admin panels, interactive apps",
    },
  ];

  const currentStrategy = strategies.find((s) => s.id === selectedStrategy);

  return (
    <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border">
      <h4 className="font-semibold text-gray-900 mb-4">
        Rendering Strategies Comparison
      </h4>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h5 className="font-medium mb-2">Select a strategy:</h5>
          <div className="space-y-2">
            {strategies.map((strategy) => (
              <Button
                key={strategy.id}
                onClick={() => setSelectedStrategy(strategy.id)}
                variant={
                  selectedStrategy === strategy.id ? "default" : "outline"
                }
                size="sm"
                className="w-full justify-start"
              >
                {strategy.name}
              </Button>
            ))}
          </div>
        </div>
        <div>
          {currentStrategy && (
            <div className="bg-white p-4 rounded border">
              <h5 className="font-semibold text-gray-900 mb-2">
                {currentStrategy.name}
              </h5>
              <p className="text-sm text-gray-600 mb-3">
                {currentStrategy.description}
              </p>
              <div className="space-y-2">
                <div>
                  <span className="text-green-600 font-medium text-sm">
                    Pros:
                  </span>
                  <ul className="text-sm text-gray-700 ml-4">
                    {currentStrategy.pros.map((pro, index) => (
                      <li key={index}>• {pro}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-red-600 font-medium text-sm">
                    Cons:
                  </span>
                  <ul className="text-sm text-gray-700 ml-4">
                    {currentStrategy.cons.map((con, index) => (
                      <li key={index}>• {con}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-blue-600 font-medium text-sm">
                    Best for:
                  </span>
                  <p className="text-sm text-gray-700">{currentStrategy.use}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const NextjsDataFetching = () => {
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
              <h1 className="text-2xl font-bold">Next.js Data Fetching</h1>
              <p className="text-gray-600">
                Master different rendering strategies and data fetching patterns
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="ssr">Server-Side</TabsTrigger>
            <TabsTrigger value="ssg">Static Generation</TabsTrigger>
            <TabsTrigger value="client">Client-Side</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <TheorySection
              title="Data Fetching in Next.js"
              description="Understanding different strategies for fetching and rendering data"
              level="Intermediate"
            >
              <Definition term="Rendering Strategies">
                Next.js provides multiple ways to fetch data and render pages,
                each optimized for different use cases. The choice depends on
                when you need the data, how often it changes, and performance
                requirements.
              </Definition>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <ConceptCard
                  type="concept"
                  title="Server-Side Rendering (SSR)"
                  description="Data is fetched and page is rendered on the server for each request. Great for dynamic, personalized content."
                />
                <ConceptCard
                  type="concept"
                  title="Static Site Generation (SSG)"
                  description="Page is pre-rendered at build time with data. Perfect for content that doesn't change often."
                />
                <ConceptCard
                  type="concept"
                  title="Incremental Static Regeneration (ISR)"
                  description="Combines benefits of SSG with the ability to update static pages after deployment."
                />
                <ConceptCard
                  type="concept"
                  title="Client-Side Rendering (CSR)"
                  description="Data is fetched in the browser after the page loads. Best for interactive, user-specific content."
                />
              </div>

              <KeyPoints
                points={[
                  "Choose the right strategy based on data freshness needs",
                  "SSR provides fresh data but higher server load",
                  "SSG offers best performance but data can be stale",
                  "ISR balances performance with data freshness",
                  "CSR is best for interactive, personalized content",
                  "Can mix strategies within the same application",
                ]}
              />
            </TheorySection>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <span>Rendering Strategies</span>
                </CardTitle>
                <CardDescription>
                  Compare different approaches to data fetching and rendering
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RenderingStrategyDemo />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ssr" className="space-y-6">
            <TheorySection
              title="Server-Side Rendering (SSR)"
              description="Fetch data and render pages on the server for each request"
              level="Intermediate"
            >
              <Definition term="Server-Side Rendering">
                SSR renders pages on the server for each request, ensuring users
                always get the most up-to-date data. The server fetches data,
                renders the HTML, and sends it to the client.
              </Definition>

              <WhenToUse
                scenarios={[
                  "Content that changes frequently (user dashboards, real-time data)",
                  "Personalized content based on user authentication",
                  "SEO-critical pages that need fresh data",
                  "Pages where data freshness is more important than speed",
                ]}
              />
            </TheorySection>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Server className="h-5 w-5" />
                  <span>Server-Side Rendering Examples</span>
                </CardTitle>
                <CardDescription>
                  Learn how to implement SSR in Next.js App Router
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <CodeSnippet
                    title="Basic SSR Page"
                    language="typescript"
                    description="A server component that fetches data on each request."
                    highlights={[
                      "Server Component",
                      "Data Fetching",
                      "Fresh Data",
                    ]}
                    code={`// app/dashboard/page.tsx
// This is a Server Component (default in App Router)

interface User {
  id: number;
  name: string;
  email: string;
  lastLogin: string;
}

// This function runs on the server for each request
async function fetchUserData(): Promise<User> {
  // This could be a database query, API call, etc.
  const response = await fetch('https://api.example.com/user', {
    // No caching - always fetch fresh data
    cache: 'no-store'
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }
  
  return response.json();
}

// Server Component - runs on the server
export default async function Dashboard() {
  // Data is fetched on the server before rendering
  const user = await fetchUserData();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      {/* This content is rendered on the server */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Welcome back!</h2>
        <div className="space-y-2">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Last Login:</strong> {user.lastLogin}</p>
        </div>
      </div>
      
      <div className="mt-6 text-sm text-gray-600">
        <p>This page was rendered on the server at: {new Date().toISOString()}</p>
      </div>
    </div>
  );
}

// Benefits:
// ✓ Always shows fresh data
// ✓ SEO friendly
// ✓ No loading states needed
// ✗ Higher server load
// ✗ Slower navigation between pages`}
                  />

                  <CodeSnippet
                    title="SSR with Dynamic Routes"
                    language="typescript"
                    description="Fetch data based on URL parameters in server components."
                    highlights={[
                      "Dynamic Routes",
                      "URL Parameters",
                      "Data Fetching",
                    ]}
                    code={`// app/posts/[id]/page.tsx
// Dynamic route with server-side rendering

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  publishedAt: string;
}

interface PostPageProps {
  params: {
    id: string;
  };
}

// Fetch post data based on the ID from URL
async function fetchPost(id: string): Promise<Post> {
  const response = await fetch(\`https://api.example.com/posts/\${id}\`, {
    // Fresh data on each request
    cache: 'no-store'
  });
  
  if (!response.ok) {
    throw new Error('Post not found');
  }
  
  return response.json();
}

// Server component with dynamic route parameter
export default async function PostPage({ params }: PostPageProps) {
  // Extract the post ID from the URL
  const { id } = params;
  
  // Fetch post data on the server
  const post = await fetchPost(id);
  
  return (
    <article className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="text-gray-600">
          <p>By {post.author}</p>
          <p>Published on {new Date(post.publishedAt).toLocaleDateString()}</p>
        </div>
      </header>
      
      <div className="prose max-w-none">
        {/* Post content rendered on server */}
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
      
      <footer className="mt-8 text-sm text-gray-500">
        Post ID: {post.id} | Rendered on server
      </footer>
    </article>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PostPageProps) {
  const post = await fetchPost(params.id);
  
  return {
    title: post.title,
    description: post.content.substring(0, 160),
  };
}

// URL Examples:
// /posts/123 → params.id = "123"
// /posts/my-blog-post → params.id = "my-blog-post"`}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ssg" className="space-y-6">
            <TheorySection
              title="Static Site Generation (SSG)"
              description="Pre-render pages at build time for maximum performance"
              level="Intermediate"
            >
              <Definition term="Static Site Generation">
                SSG generates HTML pages at build time using data fetched during
                the build process. These static pages can be cached by CDNs for
                lightning-fast delivery worldwide.
              </Definition>

              <WhenToUse
                scenarios={[
                  "Marketing pages and landing pages",
                  "Blog posts and documentation",
                  "Product catalogs with infrequent updates",
                  "Content that doesn't change often",
                  "Maximum performance and SEO requirements",
                ]}
              />

              <KeyPoints
                points={[
                  "Pages are built once and served as static HTML",
                  "Extremely fast loading times",
                  "Perfect for CDN caching",
                  "Great for SEO",
                  "Data is fetched at build time",
                  "Requires rebuild for data updates",
                ]}
              />
            </TheorySection>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>Static Site Generation Examples</span>
                </CardTitle>
                <CardDescription>
                  Learn how to implement SSG for maximum performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <CodeSnippet
                    title="Basic SSG Page"
                    language="typescript"
                    description="A page that is statically generated at build time with cached data."
                    highlights={["Static Generation", "Build Time", "Caching"]}
                    code={`// app/blog/page.tsx
// Static Site Generation example

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: string;
}

// This function runs at BUILD TIME, not on each request
async function fetchBlogPosts(): Promise<BlogPost[]> {
  const response = await fetch('https://api.example.com/posts', {
    // Cache for 1 hour during build
    next: { revalidate: 3600 }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch blog posts');
  }
  
  return response.json();
}

// This component runs at BUILD TIME
export default async function BlogPage() {
  // Data is fetched once during build
  const posts = await fetchBlogPosts();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Our Blog</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <article key={post.id} className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">
              <a href={\`/blog/\${post.id}\`} className="hover:text-blue-600">
                {post.title}
              </a>
            </h2>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <time className="text-sm text-gray-500">
              {new Date(post.publishedAt).toLocaleDateString()}
            </time>
          </article>
        ))}
      </div>
      
      <footer className="mt-8 text-sm text-gray-500">
        This page was generated at build time
      </footer>
    </div>
  );
}

// Benefits:
// ✓ Lightning fast loading
// ✓ Perfect for CDN caching
// ✓ Great SEO
// ✓ Low server costs
// ✗ Data can become stale
// ✗ Requires rebuild for updates`}
                  />

                  <CodeSnippet
                    title="ISR (Incremental Static Regeneration)"
                    language="typescript"
                    description="Combine the benefits of SSG with the ability to update content after deployment."
                    highlights={[
                      "ISR",
                      "Revalidation",
                      "Stale While Revalidate",
                    ]}
                    code={`// app/products/[id]/page.tsx
// Incremental Static Regeneration example

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  inStock: boolean;
}

interface ProductPageProps {
  params: {
    id: string;
  };
}

// Fetch product data with revalidation
async function fetchProduct(id: string): Promise<Product> {
  const response = await fetch(\`https://api.example.com/products/\${id}\`, {
    // Revalidate this data every 60 seconds
    next: { revalidate: 60 }
  });
  
  if (!response.ok) {
    throw new Error('Product not found');
  }
  
  return response.json();
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await fetchProduct(params.id);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-semibold text-green-600 mb-4">
            \${product.price}
          </p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          <div className="flex items-center space-x-4">
            <span className={\`px-3 py-1 rounded-full text-sm \${
              product.inStock 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }\`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>
        
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Product Details</h2>
          <dl className="space-y-2">
            <div>
              <dt className="font-medium">Product ID:</dt>
              <dd className="text-gray-600">{product.id}</dd>
            </div>
            <div>
              <dt className="font-medium">Availability:</dt>
              <dd className="text-gray-600">
                {product.inStock ? 'Available' : 'Sold Out'}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      
      <div className="mt-8 text-sm text-gray-500">
        This page uses ISR - it's statically generated but revalidates every 60 seconds
      </div>
    </div>
  );
}

// How ISR works:
// 1. Page is generated statically at build time
// 2. Served from cache for 60 seconds
// 3. After 60 seconds, next request triggers background regeneration
// 4. User still gets cached version while new version generates
// 5. New version replaces cache when ready

// Benefits:
// ✓ Fast performance like SSG
// ✓ Content can be updated without full rebuild
// ✓ Users always get fast responses
// ✓ Background updates don't affect user experience`}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="client" className="space-y-6">
            <TheorySection
              title="Client-Side Rendering (CSR)"
              description="Fetch data in the browser for interactive and personalized content"
              level="Beginner"
            >
              <Definition term="Client-Side Rendering">
                CSR fetches data in the browser after the page loads. This
                approach is perfect for interactive applications where data
                changes frequently or is user-specific.
              </Definition>

              <WhenToUse
                scenarios={[
                  "User dashboards and admin panels",
                  "Real-time data that updates frequently",
                  "Interactive features like chat or live feeds",
                  "Personalized content based on user interactions",
                  "When SEO is not a primary concern",
                ]}
              />
            </TheorySection>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>Client-Side Rendering Examples</span>
                </CardTitle>
                <CardDescription>
                  Learn how to fetch data on the client side effectively
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <CodeSnippet
                    title="useEffect Data Fetching"
                    language="typescript"
                    description="Traditional client-side data fetching with React hooks."
                    highlights={["useEffect", "useState", "Loading States"]}
                    code={`// components/UserProfile.tsx
'use client'; // This makes it a Client Component

import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

export function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(\`/api/users/\${userId}\`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [userId]); // Re-fetch when userId changes

  // Loading state
  if (loading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-800">Error: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  // Success state
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex items-center space-x-4">
        <img 
          src={user?.avatar} 
          alt={user?.name}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="text-xl font-semibold">{user?.name}</h2>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>
    </div>
  );
}

// Key patterns:
// ✓ Handle loading, error, and success states
// ✓ Clean up with dependency array
// ✓ Provide good user feedback
// ✗ Not SEO friendly
// ✗ Slower initial render`}
                  />

                  <CodeSnippet
                    title="SWR for Data Fetching"
                    language="typescript"
                    description="Use SWR library for efficient client-side data fetching with caching and revalidation."
                    highlights={[
                      "SWR",
                      "Caching",
                      "Revalidation",
                      "Error Handling",
                    ]}
                    code={`// components/ProductList.tsx
// Using SWR for better data fetching
'use client';

import useSWR from 'swr';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

// Fetcher function for SWR
const fetcher = (url: string) => fetch(url).then(res => res.json());

export function ProductList() {
  // SWR handles caching, revalidation, and error states
  const { data: products, error, isLoading, mutate } = useSWR<Product[]>(
    '/api/products',
    fetcher,
    {
      // Revalidate when window regains focus
      revalidateOnFocus: true,
      // Revalidate every 30 seconds
      refreshInterval: 30000,
      // Show cached data while revalidating
      revalidateOnMount: true,
    }
  );

  // Refresh data manually
  const refreshProducts = () => {
    mutate(); // Trigger revalidation
  };

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-red-800 font-semibold">Failed to load products</h3>
        <p className="text-red-600 text-sm">{error.message}</p>
        <button 
          onClick={refreshProducts}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Products</h2>
        <button
          onClick={refreshProducts}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          {isLoading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map(product => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-green-600 font-bold">\${product.price}</p>
          </div>
        ))}
      </div>

      {isLoading && products && (
        <div className="text-center text-gray-500">
          Updating products...
        </div>
      )}
    </div>
  );
}

// SWR Benefits:
// ✓ Automatic caching and deduplication
// ✓ Background revalidation
// ✓ Focus and network revalidation
// ✓ Built-in error handling
// ✓ Optimistic updates
// ✓ Pagination and infinite loading support

// Installation:
// npm install swr`}
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

export default NextjsDataFetching;
