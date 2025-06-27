import {
  useState,
  useEffect,
  useReducer,
  useCallback,
  useMemo,
  useRef,
  useLayoutEffect,
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
  Clock,
  Calculator,
  Focus,
  Zap,
  Eye,
  MousePointer,
} from "lucide-react";

// Custom Hook Examples
const useCounter = (initialValue: number = 0) => {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => setCount((c) => c + 1), []);
  const decrement = useCallback(() => setCount((c) => c - 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);

  return { count, increment, decrement, reset };
};

const useLocalStorage = (key: string, initialValue: string) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: string) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  return [storedValue, setValue] as const;
};

const useFetch = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

// useState Examples
const UseStateDemo = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<
    { id: number; text: string; completed: boolean }[]
  >([]);

  const addTodo = () => {
    if (text.trim()) {
      setTodos((prev) => [...prev, { id: Date.now(), text, completed: false }]);
      setText("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  return (
    <div className="space-y-4">
      <div className="p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold mb-2">Simple Counter</h4>
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => setCount((c) => c - 1)}
            variant="outline"
            size="sm"
          >
            -
          </Button>
          <span className="px-4 py-2 bg-white rounded border">{count}</span>
          <Button
            onClick={() => setCount((c) => c + 1)}
            variant="outline"
            size="sm"
          >
            +
          </Button>
          <Button onClick={() => setCount(0)} variant="ghost" size="sm">
            Reset
          </Button>
        </div>
      </div>

      <div className="p-4 bg-green-50 rounded-lg">
        <h4 className="font-semibold mb-2">Todo List with Complex State</h4>
        <div className="flex space-x-2 mb-3">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a todo..."
            onKeyPress={(e) => e.key === "Enter" && addTodo()}
          />
          <Button onClick={addTodo} size="sm">
            Add
          </Button>
        </div>
        <div className="space-y-2">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center space-x-2 p-2 bg-white rounded border"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span
                className={todo.completed ? "line-through text-gray-500" : ""}
              >
                {todo.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// useEffect Examples
const UseEffectDemo = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Window resize effect
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Document title effect
  useEffect(() => {
    document.title = `Timer: ${seconds}s`;
    return () => {
      document.title = "React Master";
    };
  }, [seconds]);

  return (
    <div className="space-y-4">
      <div className="p-4 bg-purple-50 rounded-lg">
        <h4 className="font-semibold mb-2">Timer with Cleanup</h4>
        <div className="text-2xl font-mono mb-3">{seconds}s</div>
        <div className="space-x-2">
          <Button
            onClick={() => setIsRunning(!isRunning)}
            variant={isRunning ? "destructive" : "default"}
            size="sm"
          >
            {isRunning ? "Stop" : "Start"}
          </Button>
          <Button onClick={() => setSeconds(0)} variant="outline" size="sm">
            Reset
          </Button>
        </div>
      </div>

      <div className="p-4 bg-yellow-50 rounded-lg">
        <h4 className="font-semibold mb-2">Window Resize Listener</h4>
        <p>
          Current window width: <strong>{windowWidth}px</strong>
        </p>
        <p className="text-sm text-gray-600">
          Resize the window to see this update!
        </p>
      </div>
    </div>
  );
};

// useReducer Example
interface State {
  count: number;
  step: number;
}

type Action =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "reset" }
  | { type: "setStep"; payload: number };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + state.step };
    case "decrement":
      return { ...state, count: state.count - state.step };
    case "reset":
      return { ...state, count: 0 };
    case "setStep":
      return { ...state, step: action.payload };
    default:
      return state;
  }
};

const UseReducerDemo = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0, step: 1 });

  return (
    <div className="p-4 bg-indigo-50 rounded-lg">
      <h4 className="font-semibold mb-2">Complex State with useReducer</h4>
      <div className="mb-3">
        <div className="text-2xl font-mono mb-2">Count: {state.count}</div>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Step size:</label>
          <Input
            type="number"
            value={state.step}
            onChange={(e) =>
              dispatch({ type: "setStep", payload: Number(e.target.value) })
            }
            className="w-20"
          />
        </div>
        <div className="space-x-2">
          <Button onClick={() => dispatch({ type: "increment" })} size="sm">
            +{state.step}
          </Button>
          <Button onClick={() => dispatch({ type: "decrement" })} size="sm">
            -{state.step}
          </Button>
          <Button
            onClick={() => dispatch({ type: "reset" })}
            variant="outline"
            size="sm"
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

// useMemo and useCallback Examples
const UseMemoCallbackDemo = () => {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState<number[]>([1, 2, 3, 4, 5]);

  // Expensive calculation (simulated)
  const expensiveValue = useMemo(() => {
    console.log("Calculating expensive value...");
    return items.reduce((sum, item) => sum + item * item, 0);
  }, [items]);

  // Memoized callback
  const handleItemAdd = useCallback(() => {
    setItems((prev) => [...prev, prev.length + 1]);
  }, []);

  // Memoized callback with dependency
  const handleItemRemove = useCallback((index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <div className="space-y-4">
      <div className="p-4 bg-pink-50 rounded-lg">
        <h4 className="font-semibold mb-2">useMemo Example</h4>
        <p className="mb-2">
          Expensive calculation result: <strong>{expensiveValue}</strong>
        </p>
        <p className="text-sm text-gray-600 mb-3">
          Check console - calculation only runs when items change, not when
          count changes
        </p>
        <div className="space-x-2">
          <Button onClick={() => setCount((c) => c + 1)} size="sm">
            Count: {count} (doesn't trigger calculation)
          </Button>
          <Button onClick={handleItemAdd} size="sm">
            Add Item (triggers calculation)
          </Button>
        </div>
      </div>

      <div className="p-4 bg-orange-50 rounded-lg">
        <h4 className="font-semibold mb-2">useCallback Example</h4>
        <div className="flex flex-wrap gap-2 mb-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-1 bg-white px-2 py-1 rounded border"
            >
              <span>{item}</span>
              <Button
                onClick={() => handleItemRemove(index)}
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
              >
                ×
              </Button>
            </div>
          ))}
        </div>
        <Button onClick={handleItemAdd} size="sm">
          Add Item
        </Button>
      </div>
    </div>
  );
};

// useRef Examples
const UseRefDemo = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const countRef = useRef(0);
  const [, forceUpdate] = useState({});

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const incrementRefCount = () => {
    countRef.current += 1;
    console.log("Ref count:", countRef.current);
  };

  return (
    <div className="space-y-4">
      <div className="p-4 bg-cyan-50 rounded-lg">
        <h4 className="font-semibold mb-2">DOM Reference</h4>
        <div className="space-y-2">
          <Input ref={inputRef} placeholder="Click button to focus me" />
          <Button onClick={focusInput} size="sm">
            <Focus className="h-4 w-4 mr-1" />
            Focus Input
          </Button>
        </div>
      </div>

      <div className="p-4 bg-teal-50 rounded-lg">
        <h4 className="font-semibold mb-2">
          Mutable Reference (doesn't trigger re-render)
        </h4>
        <p className="mb-2">
          Ref count: {countRef.current} (check console for updates)
        </p>
        <div className="space-x-2">
          <Button onClick={incrementRefCount} size="sm">
            Increment Ref (no re-render)
          </Button>
          <Button onClick={() => forceUpdate({})} variant="outline" size="sm">
            Force Re-render
          </Button>
        </div>
      </div>
    </div>
  );
};

// Custom Hooks Examples
const CustomHooksDemo = () => {
  const counter = useCounter(10);
  const [name, setName] = useLocalStorage("user-name", "");
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/posts/1",
  );

  return (
    <div className="space-y-4">
      <div className="p-4 bg-emerald-50 rounded-lg">
        <h4 className="font-semibold mb-2">useCounter Hook</h4>
        <div className="flex items-center space-x-2 mb-2">
          <Button onClick={counter.decrement} variant="outline" size="sm">
            -
          </Button>
          <span className="px-3 py-1 bg-white rounded border">
            {counter.count}
          </span>
          <Button onClick={counter.increment} variant="outline" size="sm">
            +
          </Button>
          <Button onClick={counter.reset} variant="ghost" size="sm">
            Reset
          </Button>
        </div>
      </div>

      <div className="p-4 bg-amber-50 rounded-lg">
        <h4 className="font-semibold mb-2">useLocalStorage Hook</h4>
        <div className="space-y-2">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name (saved to localStorage)"
          />
          <p className="text-sm text-gray-600">
            Value is persisted in localStorage. Refresh the page to see it
            maintained!
          </p>
        </div>
      </div>

      <div className="p-4 bg-violet-50 rounded-lg">
        <h4 className="font-semibold mb-2">useFetch Hook</h4>
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-600">Error: {error}</div>}
        {data && (
          <div className="bg-white p-3 rounded border">
            <h5 className="font-medium">{(data as any).title}</h5>
            <p className="text-sm text-gray-600">{(data as any).body}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const HooksDemo = () => {
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
              <h1 className="text-2xl font-bold">React Hooks Deep Dive</h1>
              <p className="text-gray-600">
                Master all React hooks with interactive examples
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="useState" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            <TabsTrigger value="useState">useState</TabsTrigger>
            <TabsTrigger value="useEffect">useEffect</TabsTrigger>
            <TabsTrigger value="useReducer">useReducer</TabsTrigger>
            <TabsTrigger value="useMemo">useMemo</TabsTrigger>
            <TabsTrigger value="useRef">useRef</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
          </TabsList>

          <TabsContent value="useState" className="space-y-6">
            <TheorySection
              title="useState Hook"
              description="The foundation of state management in functional components"
              level="Beginner"
            >
              <Definition term="useState Hook">
                useState is a React Hook that lets you add state to functional
                components. It returns an array with two elements: the current
                state value and a function to update that state.
              </Definition>

              <KeyPoints
                points={[
                  "Returns array: [currentState, setStateFunction]",
                  "Initial state can be a value or a function",
                  "State updates trigger component re-renders",
                  "Use functional updates when new state depends on previous state",
                  "State updates are batched for performance",
                  "Each useState call creates independent state variables",
                ]}
              />

              <WhenToUse
                scenarios={[
                  "Managing form inputs and user interactions",
                  "Toggling UI elements (modals, dropdowns, etc.)",
                  "Storing component-specific data that changes over time",
                  "Implementing counters, timers, and progress indicators",
                ]}
              />
            </TheorySection>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>useState Examples</span>
                </CardTitle>
                <CardDescription>
                  See useState in action with practical, interactive examples
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <UseStateDemo />
                  </div>
                  <div>
                    <CodeSnippet
                      title="useState Hook Examples"
                      language="typescript"
                      description="Learn different patterns for using useState to manage component state."
                      highlights={[
                        "State Declaration",
                        "State Updates",
                        "Functional Updates",
                        "Complex State",
                      ]}
                      code={`import { useState } from 'react';

const UseStateDemo = () => {
  // Simple state with initial value
  const [count, setCount] = useState(0);

  // String state
  const [text, setText] = useState("");

  // Complex state with array of objects
  const [todos, setTodos] = useState<
    { id: number; text: string; completed: boolean }[]
  >([]);

  // Simple state update
  const increment = () => {
    setCount(count + 1); // Direct update
  };

  // Functional state update (recommended for counters)
  const incrementFunctional = () => {
    setCount(prevCount => prevCount + 1);
  };

  // Adding item to array state
  const addTodo = () => {
    if (text.trim()) {
      setTodos(prev => [
        ...prev, // Spread existing todos
        {
          id: Date.now(),
          text,
          completed: false
        }
      ]);
      setText(""); // Clear input
    }
  };

  // Updating array item (immutable update)
  const toggleTodo = (id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  return (
    <div>
      {/* Counter example */}
      <div>
        <p>Count: {count}</p>
        <button onClick={incrementFunctional}>
          Increment
        </button>
      </div>

      {/* Todo list example */}
      <div>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add todo..."
        />
        <button onClick={addTodo}>Add</button>

        {todos.map(todo => (
          <div key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span>{todo.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="useEffect" className="space-y-6">
            <TheorySection
              title="useEffect Hook"
              description="Manage side effects and component lifecycle in functional components"
              level="Intermediate"
            >
              <Definition term="useEffect Hook">
                useEffect lets you perform side effects in functional
                components. It serves the same purpose as componentDidMount,
                componentDidUpdate, and componentWillUnmount combined in class
                components.
              </Definition>

              <KeyPoints
                points={[
                  "Runs after every render by default",
                  "Use dependency array to control when it runs",
                  "Return cleanup function to prevent memory leaks",
                  "Empty dependency array [] runs only once (like componentDidMount)",
                  "No dependency array runs after every render",
                  "Can have multiple useEffect hooks in one component",
                ]}
              />

              <WhenToUse
                scenarios={[
                  "Fetching data from APIs",
                  "Setting up subscriptions or timers",
                  "Manually updating the DOM",
                  "Cleanup (removing event listeners, canceling requests)",
                ]}
              />
            </TheorySection>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>useEffect Examples</span>
                </CardTitle>
                <CardDescription>
                  Learn side effects and lifecycle management with interactive
                  examples
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <UseEffectDemo />
                  </div>
                  <div>
                    <CodeSnippet
                      title="useEffect Patterns"
                      language="typescript"
                      description="Common patterns for using useEffect with different dependency arrays and cleanup."
                      highlights={[
                        "Side Effects",
                        "Dependencies",
                        "Cleanup Functions",
                        "Lifecycle Events",
                      ]}
                      code={`import { useState, useEffect } from 'react';

const UseEffectDemo = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Effect with cleanup - Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }

    // Cleanup function - runs when effect is cleaned up
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]); // Only re-run when isRunning changes

  // Effect that runs only once - Window resize listener
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup - remove event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array = run once

  // Effect that runs on every render
  useEffect(() => {
    // Update document title
    document.title = \`Timer: \${seconds}s\`;

    // Cleanup function for title
    return () => {
      document.title = 'React Master';
    };
  }); // No dependency array = run after every render

  return (
    <div className="space-y-4">
      {/* Timer Section */}
      <div className="p-4 bg-purple-50 rounded-lg">
        <h4 className="font-semibold mb-2">Timer with Cleanup</h4>
        <div className="text-2xl font-mono mb-3">{seconds}s</div>
        <div className="space-x-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={\`px-4 py-2 rounded \${
              isRunning
                ? 'bg-red-600 text-white'
                : 'bg-green-600 text-white'
            }\`}
          >
            {isRunning ? 'Stop' : 'Start'}
          </button>
          <button
            onClick={() => setSeconds(0)}
            className="px-4 py-2 bg-gray-600 text-white rounded"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Window Width Section */}
      <div className="p-4 bg-yellow-50 rounded-lg">
        <h4 className="font-semibold mb-2">Window Resize Listener</h4>
        <p>Current window width: <strong>{windowWidth}px</strong></p>
        <p className="text-sm text-gray-600">
          Resize the window to see this update!
        </p>
      </div>
    </div>
  );
};

// useEffect Patterns:
// 1. useEffect(() => {}) - runs after every render
// 2. useEffect(() => {}, []) - runs once (mount/unmount)
// 3. useEffect(() => {}, [dep]) - runs when dep changes
// 4. Return cleanup function to prevent memory leaks`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="useReducer" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="h-5 w-5" />
                  <span>useReducer Hook</span>
                </CardTitle>
                <CardDescription>
                  Manage complex state logic with reducer patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UseReducerDemo />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="useMemo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>useMemo & useCallback</CardTitle>
                <CardDescription>
                  Optimize performance by memoizing values and functions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UseMemoCallbackDemo />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="useRef" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MousePointer className="h-5 w-5" />
                  <span>useRef Hook</span>
                </CardTitle>
                <CardDescription>
                  Access DOM elements and persist mutable values
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UseRefDemo />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="custom" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="h-5 w-5" />
                  <span>Custom Hooks</span>
                </CardTitle>
                <CardDescription>
                  Create reusable stateful logic with custom hooks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CustomHooksDemo />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HooksDemo;
