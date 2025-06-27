import { LearningTopic } from "@/components/ProgressTracker";

export const learningTopics: LearningTopic[] = [
  // Basic Concepts
  {
    id: "components-props",
    title: "Components & Props",
    description: "Learn to create reusable components and pass data with props",
    category: "Beginner",
    concepts: [
      "Functional Components",
      "Props",
      "JSX",
      "Component Composition",
    ],
  },
  {
    id: "state-events",
    title: "State & Events",
    description: "Manage component state and handle user interactions",
    category: "Beginner",
    concepts: ["useState", "Event Handlers", "Controlled Components"],
  },
  {
    id: "conditional-rendering",
    title: "Conditional Rendering",
    description: "Show/hide elements based on conditions and state",
    category: "Beginner",
    concepts: ["Ternary Operator", "Logical AND", "If Statements"],
  },
  {
    id: "lists-keys",
    title: "Lists & Keys",
    description: "Render dynamic lists with proper key management",
    category: "Beginner",
    concepts: ["map()", "Keys", "Dynamic Rendering", "List Updates"],
  },
  {
    id: "forms-inputs",
    title: "Forms & Inputs",
    description: "Build interactive forms with controlled inputs",
    category: "Beginner",
    concepts: ["Controlled Inputs", "Form Validation", "Form Submission"],
  },

  // Hooks
  {
    id: "usestate-hook",
    title: "useState Hook",
    description: "Master state management in functional components",
    category: "Intermediate",
    concepts: ["State Updates", "Functional Updates", "State Batching"],
  },
  {
    id: "useeffect-hook",
    title: "useEffect Hook",
    description: "Handle side effects and component lifecycle",
    category: "Intermediate",
    concepts: ["Side Effects", "Cleanup", "Dependencies", "Lifecycle"],
  },
  {
    id: "usecontext-hook",
    title: "useContext Hook",
    description: "Access context values without prop drilling",
    category: "Intermediate",
    concepts: ["Context API", "Provider", "Consumer", "Global State"],
  },
  {
    id: "usereducer-hook",
    title: "useReducer Hook",
    description: "Manage complex state logic with reducers",
    category: "Intermediate",
    concepts: ["Reducers", "Actions", "Complex State", "State Machines"],
  },
  {
    id: "usememo-hook",
    title: "useMemo Hook",
    description: "Optimize expensive calculations with memoization",
    category: "Advanced",
    concepts: ["Memoization", "Performance", "Dependencies", "Optimization"],
  },
  {
    id: "usecallback-hook",
    title: "useCallback Hook",
    description: "Memoize function references for performance",
    category: "Advanced",
    concepts: ["Function Memoization", "Re-renders", "Performance"],
  },
  {
    id: "useref-hook",
    title: "useRef Hook",
    description: "Access DOM elements and persist mutable values",
    category: "Intermediate",
    concepts: ["DOM References", "Mutable Values", "Imperative API"],
  },
  {
    id: "custom-hooks",
    title: "Custom Hooks",
    description: "Create reusable stateful logic with custom hooks",
    category: "Advanced",
    concepts: ["Hook Composition", "Reusable Logic", "State Encapsulation"],
  },

  // Context & State Management
  {
    id: "context-api",
    title: "Context API",
    description: "Share state across component trees without prop drilling",
    category: "Intermediate",
    concepts: ["Context Provider", "Context Consumer", "Global State"],
  },
  {
    id: "state-patterns",
    title: "State Management Patterns",
    description: "Advanced patterns for managing application state",
    category: "Advanced",
    concepts: ["State Machines", "Flux Pattern", "State Normalization"],
  },
  {
    id: "reducer-patterns",
    title: "Reducer Patterns",
    description: "Complex state updates with reducer patterns",
    category: "Advanced",
    concepts: ["Action Creators", "State Immutability", "Reducer Composition"],
  },

  // Performance
  {
    id: "react-memo",
    title: "React.memo",
    description: "Prevent unnecessary re-renders with memoization",
    category: "Advanced",
    concepts: ["Component Memoization", "Shallow Comparison", "Re-renders"],
  },
  {
    id: "performance-optimization",
    title: "Performance Optimization",
    description: "Techniques to optimize React application performance",
    category: "Advanced",
    concepts: ["Bundle Splitting", "Lazy Loading", "Performance Profiling"],
  },
  {
    id: "concurrent-features",
    title: "Concurrent Features",
    description: "Use React 18 concurrent features for better UX",
    category: "Advanced",
    concepts: ["Concurrent Rendering", "Suspense", "Time Slicing"],
  },

  // Advanced Patterns
  {
    id: "higher-order-components",
    title: "Higher-Order Components",
    description: "Enhance components with additional functionality",
    category: "Advanced",
    concepts: ["HOCs", "Component Enhancement", "Code Reuse"],
  },
  {
    id: "render-props",
    title: "Render Props",
    description: "Share code between components using render props",
    category: "Advanced",
    concepts: ["Function as Children", "Dynamic Rendering", "Code Sharing"],
  },
  {
    id: "compound-components",
    title: "Compound Components",
    description: "Create flexible, composable component APIs",
    category: "Advanced",
    concepts: ["Component Composition", "Flexible APIs", "Design Patterns"],
  },
  {
    id: "error-boundaries",
    title: "Error Boundaries",
    description: "Gracefully handle errors in React component trees",
    category: "Advanced",
    concepts: ["Error Handling", "Fallback UI", "Error Recovery"],
  },
  {
    id: "react-portals",
    title: "React Portals",
    description: "Render components outside the normal component tree",
    category: "Advanced",
    concepts: ["DOM Portals", "Modal Rendering", "Event Bubbling"],
  },

  // Testing
  {
    id: "component-testing",
    title: "Component Testing",
    description: "Test React components behavior and interactions",
    category: "Advanced",
    concepts: ["Unit Testing", "Integration Testing", "Test Utilities"],
  },
  {
    id: "hook-testing",
    title: "Hook Testing",
    description: "Test custom hooks in isolation",
    category: "Advanced",
    concepts: ["Hook Testing", "Test Isolation", "Mock Dependencies"],
  },
  {
    id: "async-testing",
    title: "Async Testing",
    description: "Test components with async operations and API calls",
    category: "Advanced",
    concepts: ["Async Testing", "Mock APIs", "Testing Library"],
  },
  {
    id: "testing-strategies",
    title: "Testing Strategies",
    description: "Comprehensive testing approaches for React apps",
    category: "Advanced",
    concepts: ["Test Pyramid", "E2E Testing", "Visual Testing"],
  },
];

export const getTopicsByRoute = (route: string): string[] => {
  const routeMapping: Record<string, string[]> = {
    "/basic-concepts": [
      "components-props",
      "state-events",
      "conditional-rendering",
      "lists-keys",
      "forms-inputs",
    ],
    "/hooks-demo": [
      "usestate-hook",
      "useeffect-hook",
      "usereducer-hook",
      "usememo-hook",
      "usecallback-hook",
      "useref-hook",
      "custom-hooks",
    ],
    "/context-demo": [
      "usecontext-hook",
      "context-api",
      "state-patterns",
      "reducer-patterns",
    ],
    "/performance": [
      "react-memo",
      "usememo-hook",
      "usecallback-hook",
      "performance-optimization",
      "concurrent-features",
    ],
    "/advanced-patterns": [
      "higher-order-components",
      "render-props",
      "compound-components",
      "error-boundaries",
      "react-portals",
    ],
    "/testing-examples": [
      "component-testing",
      "hook-testing",
      "async-testing",
      "testing-strategies",
    ],
  };

  return routeMapping[route] || [];
};
