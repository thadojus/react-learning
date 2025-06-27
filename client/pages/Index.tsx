import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Code,
  Zap,
  Layers,
  TestTube,
  Cpu,
  Rocket,
  Users,
  Globe,
  Server,
  Database,
} from "lucide-react";
import { Link } from "react-router-dom";

const ConceptCard = ({
  icon: Icon,
  title,
  description,
  level,
  concepts,
  route,
}: {
  icon: any;
  title: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  concepts: string[];
  route: string;
}) => {
  const levelColors = {
    Beginner: "bg-green-100 text-green-800",
    Intermediate: "bg-yellow-100 text-yellow-800",
    Advanced: "bg-red-100 text-red-800",
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
          <Badge className={levelColors[level]}>{level}</Badge>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h4 className="font-semibold mb-2 text-sm text-muted-foreground">
            Concepts Covered:
          </h4>
          <div className="flex flex-wrap gap-1">
            {concepts.map((concept, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {concept}
              </Badge>
            ))}
          </div>
        </div>
        <Link to={route}>
          <Button className="w-full group-hover:bg-primary/90 transition-colors">
            Explore Examples
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

const Index = () => {
  const conceptSections = [
    {
      icon: BookOpen,
      title: "Basic Concepts",
      description: "Master the fundamentals of React development",
      level: "Beginner" as const,
      concepts: [
        "Components",
        "Props",
        "State",
        "Events",
        "Conditional Rendering",
        "Lists",
      ],
      route: "/basic-concepts",
    },
    {
      icon: Zap,
      title: "React Hooks",
      description: "Deep dive into React Hooks and state management",
      level: "Intermediate" as const,
      concepts: [
        "useState",
        "useEffect",
        "useContext",
        "useReducer",
        "Custom Hooks",
      ],
      route: "/hooks-demo",
    },
    {
      icon: Layers,
      title: "Context & State",
      description: "Advanced state management and data flow patterns",
      level: "Intermediate" as const,
      concepts: ["Context API", "Reducers", "Global State", "State Patterns"],
      route: "/context-demo",
    },
    {
      icon: Cpu,
      title: "Performance",
      description: "Optimization techniques and performance best practices",
      level: "Advanced" as const,
      concepts: [
        "React.memo",
        "useMemo",
        "useCallback",
        "Code Splitting",
        "Lazy Loading",
      ],
      route: "/performance",
    },
    {
      icon: Code,
      title: "Advanced Patterns",
      description: "Expert-level React patterns and architectures",
      level: "Advanced" as const,
      concepts: [
        "HOCs",
        "Render Props",
        "Compound Components",
        "Portals",
        "Error Boundaries",
      ],
      route: "/advanced-patterns",
    },
    {
      icon: TestTube,
      title: "Testing",
      description: "Comprehensive testing strategies for React applications",
      level: "Advanced" as const,
      concepts: ["Unit Tests", "Integration Tests", "Mocking", "Testing Hooks"],
      route: "/testing-examples",
    },
  ];

  const nextjsSections = [
    {
      icon: Globe,
      title: "Next.js Fundamentals",
      description: "File-based routing, layouts, and project structure",
      level: "Beginner" as const,
      concepts: [
        "File-based Routing",
        "Layouts",
        "Navigation",
        "Project Setup",
      ],
      route: "/nextjs-fundamentals",
    },
    {
      icon: Database,
      title: "Data Fetching",
      description: "SSR, SSG, ISR, and client-side data fetching patterns",
      level: "Intermediate" as const,
      concepts: ["SSR", "SSG", "ISR", "Client-Side Fetching", "SWR"],
      route: "/nextjs-data-fetching",
    },
    {
      icon: Server,
      title: "API Routes",
      description: "Build full-stack applications with API endpoints",
      level: "Intermediate" as const,
      concepts: ["API Routes", "Middleware", "Authentication", "Database"],
      route: "/nextjs-api-routes",
    },
    {
      icon: Rocket,
      title: "Deployment & Performance",
      description: "Optimize and deploy Next.js applications",
      level: "Advanced" as const,
      concepts: [
        "Vercel Deployment",
        "Performance Optimization",
        "Image Optimization",
        "Edge Functions",
      ],
      route: "/nextjs-deployment",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Rocket className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  React Master
                </h1>
                <p className="text-sm text-gray-600">
                  Complete React Learning Platform
                </p>
              </div>
            </div>
            <Badge
              variant="outline"
              className="bg-primary/10 text-primary border-primary/20"
            >
              Beginner to Professional
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Master React from
              <span className="text-primary"> Beginner to Professional</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              A comprehensive learning platform with interactive examples
              covering every React concept. From basic components to advanced
              patterns, performance optimization, and testing strategies.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>60+ Examples</span>
              </div>
              <div className="flex items-center space-x-2">
                <Code className="h-4 w-4" />
                <span>TypeScript Ready</span>
              </div>
              <div className="flex items-center space-x-2">
                <TestTube className="h-4 w-4" />
                <span>Test Coverage</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* React Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              React Learning Modules
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Master React fundamentals with comprehensive theory, practical
              examples, and interactive code demonstrations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {conceptSections.map((section, index) => (
              <ConceptCard key={index} {...section} />
            ))}
          </div>
        </div>
      </section>

      {/* Next.js Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Next.js Framework Modules
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Learn the React framework for production applications with
              server-side rendering, static generation, and modern web features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nextjsSections.map((section, index) => (
              <ConceptCard key={index} {...section} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose React Master?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-2">
                Interactive Examples
              </h4>
              <p className="text-gray-600">
                Live code examples you can modify and experiment with in
                real-time.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Layers className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-2">
                Progressive Learning
              </h4>
              <p className="text-gray-600">
                Structured curriculum that builds from basic concepts to
                advanced patterns.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TestTube className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Production Ready</h4>
              <p className="text-gray-600">
                Learn best practices, testing strategies, and optimization
                techniques.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Rocket className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">React Master</span>
          </div>
          <p className="text-gray-600">
            Complete React learning platform • From beginner concepts to
            professional patterns
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
