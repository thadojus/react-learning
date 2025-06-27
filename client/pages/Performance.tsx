import React, {
  useState,
  useCallback,
  useMemo,
  memo,
  useRef,
  lazy,
  Suspense,
  startTransition,
} from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeSnippet } from "@/components/CodeSnippet";
import {
  TheorySection,
  Definition,
  KeyPoints,
  WhenToUse,
} from "@/components/TheorySection";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Zap,
  Clock,
  Cpu,
  BarChart3,
  Download,
  Timer,
} from "lucide-react";

// Heavy Component for demonstration
const HeavyComponent = memo(
  ({ count, onIncrement }: { count: number; onIncrement: () => void }) => {
    console.log("HeavyComponent rendering");

    // Simulate expensive computation
    const expensiveValue = useMemo(() => {
      console.log("Calculating expensive value...");
      let result = 0;
      for (let i = 0; i < 100000; i++) {
        result += Math.random();
      }
      return result.toFixed(2);
    }, [count]);

    return (
      <div className="p-3 bg-blue-50 rounded border">
        <h4 className="font-medium mb-2">Heavy Component (Memoized)</h4>
        <p>Count: {count}</p>
        <p>Expensive calculation: {expensiveValue}</p>
        <Button onClick={onIncrement} size="sm" className="mt-2">
          Increment
        </Button>
      </div>
    );
  },
);

// Child component that should not re-render unnecessarily
const ChildComponent = memo(
  ({ name, onClick }: { name: string; onClick: () => void }) => {
    console.log("ChildComponent rendering with name:", name);

    return (
      <div className="p-2 bg-green-50 rounded border">
        <p>Hello, {name}!</p>
        <Button onClick={onClick} size="sm">
          Click me
        </Button>
      </div>
    );
  },
);

// React.memo demonstration
const MemoDemo = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("React");
  const [unrelatedState, setUnrelatedState] = useState(0);

  // Memoized callback to prevent unnecessary re-renders
  const handleIncrement = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  const handleChildClick = useCallback(() => {
    console.log("Child clicked!");
  }, []);

  return (
    <div className="space-y-4">
      <div className="p-4 bg-yellow-50 rounded-lg">
        <h4 className="font-semibold mb-3">React.memo & useCallback Demo</h4>
        <p className="text-sm text-gray-600 mb-3">
          Check the console to see which components re-render when you interact
          with different buttons.
        </p>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Name:</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-x-2">
            <Button
              onClick={() => setUnrelatedState((s) => s + 1)}
              variant="outline"
              size="sm"
            >
              Unrelated State: {unrelatedState}
            </Button>
            <Badge variant="outline">
              This should not trigger child re-renders
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <HeavyComponent count={count} onIncrement={handleIncrement} />
            <ChildComponent name={name} onClick={handleChildClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

// useMemo demonstration with expensive calculations
const UseMemoDemo = () => {
  const [items, setItems] = useState<number[]>([1, 2, 3, 4, 5]);
  const [filter, setFilter] = useState("");
  const [unrelatedCounter, setUnrelatedCounter] = useState(0);

  // Expensive calculation that should only run when items change
  const expensiveCalculation = useMemo(() => {
    console.log("Running expensive calculation...");
    return items.reduce((sum, item) => {
      // Simulate expensive work
      for (let i = 0; i < 10000; i++) {
        Math.random();
      }
      return sum + item * item;
    }, 0);
  }, [items]);

  // Filtered items - only recalculates when items or filter changes
  const filteredItems = useMemo(() => {
    console.log("Filtering items...");
    return items.filter((item) => item.toString().includes(filter));
  }, [items, filter]);

  const addRandomItem = () => {
    setItems((prev) => [...prev, Math.floor(Math.random() * 100)]);
  };

  return (
    <div className="space-y-4">
      <div className="p-4 bg-purple-50 rounded-lg">
        <h4 className="font-semibold mb-3">useMemo Optimization</h4>
        <p className="text-sm text-gray-600 mb-3">
          Expensive calculations are memoized and only run when dependencies
          change.
        </p>

        <div className="space-y-3">
          <div className="flex space-x-2">
            <Button onClick={addRandomItem} size="sm">
              Add Random Item (triggers calculation)
            </Button>
            <Button
              onClick={() => setUnrelatedCounter((c) => c + 1)}
              variant="outline"
              size="sm"
            >
              Counter: {unrelatedCounter} (no calculation)
            </Button>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Filter items:
            </label>
            <Input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Enter number to filter..."
              className="w-full"
            />
          </div>

          <div>
            <p className="font-medium">
              Expensive calculation result: {expensiveCalculation}
            </p>
            <p className="text-sm text-gray-600">Items: [{items.join(", ")}]</p>
            <p className="text-sm text-gray-600">
              Filtered: [{filteredItems.join(", ")}]
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Lazy loading demonstration
const LazyComponent = lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          default: () => (
            <div className="p-4 bg-indigo-50 rounded-lg border">
              <h4 className="font-semibold text-indigo-900 mb-2">
                Lazy Loaded Component
              </h4>
              <p className="text-indigo-700">
                This component was loaded dynamically and took 2 seconds to
                simulate a real network request.
              </p>
              <div className="mt-3 p-3 bg-white rounded">
                <p className="text-sm">Some lazy-loaded content here...</p>
                <ul className="text-sm mt-2 space-y-1">
                  <li>• Reduced initial bundle size</li>
                  <li>• Better performance for large apps</li>
                  <li>• Code splitting at route level</li>
                </ul>
              </div>
            </div>
          ),
        });
      }, 2000);
    }),
);

const LazyLoadingDemo = () => {
  const [showLazy, setShowLazy] = useState(false);

  return (
    <div className="space-y-4">
      <div className="p-4 bg-cyan-50 rounded-lg">
        <h4 className="font-semibold mb-3">Lazy Loading & Code Splitting</h4>
        <p className="text-sm text-gray-600 mb-3">
          Components can be loaded on-demand to reduce initial bundle size.
        </p>

        <Button
          onClick={() => setShowLazy(true)}
          disabled={showLazy}
          className="mb-4"
        >
          {showLazy ? "Loading..." : "Load Component Dynamically"}
        </Button>

        {showLazy && (
          <Suspense
            fallback={
              <div className="p-4 bg-gray-100 rounded-lg animate-pulse">
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            }
          >
            <LazyComponent />
          </Suspense>
        )}
      </div>
    </div>
  );
};

// Concurrent features demonstration
const ConcurrentDemo = () => {
  const [filter, setFilter] = useState("");
  const [deferredFilter, setDeferredFilter] = useState("");
  const [isPending, setIsPending] = useState(false);

  // Large dataset to demonstrate concurrent features
  const items = useMemo(
    () => Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`),
    [],
  );

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.toLowerCase().includes(deferredFilter.toLowerCase()),
    );
  }, [items, deferredFilter]);

  const handleFilterChange = (value: string) => {
    setFilter(value);
    setIsPending(true);

    // Use startTransition to mark this update as non-urgent
    startTransition(() => {
      setDeferredFilter(value);
      setIsPending(false);
    });
  };

  return (
    <div className="space-y-4">
      <div className="p-4 bg-orange-50 rounded-lg">
        <h4 className="font-semibold mb-3">Concurrent Features</h4>
        <p className="text-sm text-gray-600 mb-3">
          Uses startTransition to keep the UI responsive during expensive
          updates.
        </p>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">
              Search 10,000 items:
            </label>
            <Input
              value={filter}
              onChange={(e) => handleFilterChange(e.target.value)}
              placeholder="Type to search..."
              className="w-full"
            />
            {isPending && (
              <Badge variant="outline" className="mt-1">
                <Timer className="h-3 w-3 mr-1" />
                Filtering...
              </Badge>
            )}
          </div>

          <div className="max-h-48 overflow-y-auto bg-white rounded border p-2">
            {filteredItems.length === 0 ? (
              <p className="text-gray-500">No items found</p>
            ) : (
              <div className="space-y-1">
                <p className="text-sm font-medium">
                  Found {filteredItems.length} items:
                </p>
                {filteredItems.slice(0, 50).map((item, index) => (
                  <div
                    key={index}
                    className="text-sm py-1 px-2 bg-gray-50 rounded"
                  >
                    {item}
                  </div>
                ))}
                {filteredItems.length > 50 && (
                  <p className="text-sm text-gray-500">
                    ... and {filteredItems.length - 50} more
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Performance measurement component
const PerformanceMeasurement = () => {
  const [renderCount, setRenderCount] = useState(0);
  const renderCountRef = useRef(0);
  const startTimeRef = useRef<number>(0);
  const [renderTime, setRenderTime] = useState(0);

  // Measure render time
  React.useLayoutEffect(() => {
    startTimeRef.current = performance.now();
  });

  React.useEffect(() => {
    renderCountRef.current += 1;
    setRenderTime(performance.now() - startTimeRef.current);
  });

  const forceRender = () => {
    setRenderCount((c) => c + 1);
  };

  return (
    <div className="space-y-4">
      <div className="p-4 bg-red-50 rounded-lg">
        <h4 className="font-semibold mb-3">Performance Measurement</h4>
        <p className="text-sm text-gray-600 mb-3">
          Monitor component render performance and optimization effects.
        </p>

        <div className="space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 bg-white rounded border text-center">
              <div className="text-lg font-bold">{renderCountRef.current}</div>
              <div className="text-sm text-gray-600">Total Renders</div>
            </div>
            <div className="p-3 bg-white rounded border text-center">
              <div className="text-lg font-bold">{renderTime.toFixed(2)}ms</div>
              <div className="text-sm text-gray-600">Last Render Time</div>
            </div>
            <div className="p-3 bg-white rounded border text-center">
              <div className="text-lg font-bold">{renderCount}</div>
              <div className="text-sm text-gray-600">Force Renders</div>
            </div>
          </div>

          <Button onClick={forceRender} className="w-full">
            Force Re-render
          </Button>

          <div className="text-xs text-gray-500">
            <p>
              • Open DevTools → Performance tab to profile component renders
            </p>
            <p>• Use React DevTools Profiler for detailed component analysis</p>
            <p>• Monitor bundle size with webpack-bundle-analyzer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Performance = () => {
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
              <h1 className="text-2xl font-bold">Performance Optimization</h1>
              <p className="text-gray-600">
                Advanced techniques for optimizing React applications
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="memo" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5">
            <TabsTrigger value="memo">React.memo</TabsTrigger>
            <TabsTrigger value="useMemo">useMemo</TabsTrigger>
            <TabsTrigger value="lazy">Lazy Loading</TabsTrigger>
            <TabsTrigger value="concurrent">Concurrent</TabsTrigger>
            <TabsTrigger value="measurement">Measurement</TabsTrigger>
          </TabsList>

          <TabsContent value="memo" className="space-y-6">
            <TheorySection
              title="React.memo & useCallback"
              description="Prevent unnecessary re-renders and optimize component performance"
              level="Advanced"
            >
              <Definition term="React.memo">
                React.memo is a higher-order component that memorizes the result
                of a component. If the component renders the same result given
                the same props, React will skip rendering the component and
                reuse the last rendered result.
              </Definition>

              <KeyPoints
                points={[
                  "React.memo only checks props changes, not state or context",
                  "Use useCallback to memoize function props",
                  "Only optimize when you have performance issues",
                  "Memoization has its own costs - don't overuse it",
                  "Works best with expensive components",
                  "Compare with React.PureComponent for class components",
                ]}
              />
            </TheorySection>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>React.memo & useCallback Examples</span>
                </CardTitle>
                <CardDescription>
                  See how memoization prevents unnecessary re-renders
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <MemoDemo />
                  </div>
                  <div>
                    <CodeSnippet
                      title="React.memo and useCallback"
                      language="typescript"
                      description="Learn how to optimize components with memoization techniques."
                      highlights={[
                        "React.memo",
                        "useCallback",
                        "Performance",
                        "Re-renders",
                      ]}
                      code={`import React, { useState, useCallback, memo } from 'react';

// Heavy component wrapped with React.memo
const HeavyComponent = memo(({
  count,
  onIncrement
}: {
  count: number;
  onIncrement: () => void;
}) => {
  console.log('HeavyComponent rendering');

  // Simulate expensive computation
  const expensiveValue = useMemo(() => {
    console.log('Calculating expensive value...');
    let result = 0;
    for (let i = 0; i < 100000; i++) {
      result += Math.random();
    }
    return result.toFixed(2);
  }, [count]); // Only recalculate when count changes

  return (
    <div className="p-3 bg-blue-50 rounded border">
      <h4 className="font-medium mb-2">Heavy Component (Memoized)</h4>
      <p>Count: {count}</p>
      <p>Expensive calculation: {expensiveValue}</p>
      <button onClick={onIncrement} className="mt-2 px-3 py-1 bg-blue-600 text-white rounded">
        Increment
      </button>
    </div>
  );
});

// Child component that should not re-render unnecessarily
const ChildComponent = memo(({
  name,
  onClick
}: {
  name: string;
  onClick: () => void;
}) => {
  console.log('ChildComponent rendering with name:', name);

  return (
    <div className="p-2 bg-green-50 rounded border">
      <p>Hello, {name}!</p>
      <button onClick={onClick} className="mt-1 px-2 py-1 bg-green-600 text-white rounded text-sm">
        Click me
      </button>
    </div>
  );
});

const MemoDemo = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("React");
  const [unrelatedState, setUnrelatedState] = useState(0);

  // Memoized callback to prevent unnecessary re-renders
  const handleIncrement = useCallback(() => {
    setCount(c => c + 1);
  }, []); // No dependencies, so this function never changes

  const handleChildClick = useCallback(() => {
    console.log('Child clicked!');
  }, []); // Stable reference

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Check the console to see which components re-render when you interact with different buttons.
      </p>

      <div>
        <label className="block text-sm font-medium mb-1">Name:</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="space-x-2">
        <button
          onClick={() => setUnrelatedState(s => s + 1)}
          className="px-3 py-1 bg-gray-600 text-white rounded text-sm"
        >
          Unrelated State: {unrelatedState}
        </button>
        <span className="text-xs text-gray-600">
          This should not trigger child re-renders
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <HeavyComponent count={count} onIncrement={handleIncrement} />
        <ChildComponent name={name} onClick={handleChildClick} />
      </div>
    </div>
  );
};

// Performance Benefits:
// ✓ React.memo prevents re-renders when props haven't changed
// ✓ useCallback ensures stable function references
// ✓ useMemo caches expensive calculations
// ✓ Console logging shows optimization effects`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="useMemo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Cpu className="h-5 w-5" />
                  <span>useMemo Optimization</span>
                </CardTitle>
                <CardDescription>
                  Optimize expensive calculations with useMemo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UseMemoDemo />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lazy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Download className="h-5 w-5" />
                  <span>Lazy Loading & Code Splitting</span>
                </CardTitle>
                <CardDescription>
                  Load components on-demand to reduce bundle size
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LazyLoadingDemo />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="concurrent" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Concurrent Features</span>
                </CardTitle>
                <CardDescription>
                  Keep UI responsive with concurrent rendering
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ConcurrentDemo />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="measurement" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Performance Measurement</span>
                </CardTitle>
                <CardDescription>
                  Monitor and measure component performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PerformanceMeasurement />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Performance;
