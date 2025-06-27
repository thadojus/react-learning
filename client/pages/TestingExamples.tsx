import { useState, useEffect } from "react";
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
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  TestTube,
  CheckCircle,
  XCircle,
  Play,
  Code,
  Users,
} from "lucide-react";

// Simple component for unit testing
const Calculator = () => {
  const [result, setResult] = useState(0);
  const [input, setInput] = useState("");

  const add = (a: number, b: number) => a + b;
  const subtract = (a: number, b: number) => a - b;
  const multiply = (a: number, b: number) => a * b;
  const divide = (a: number, b: number) => (b !== 0 ? a / b : "Error");

  const handleOperation = (operation: string) => {
    const num = parseFloat(input);
    if (isNaN(num)) return;

    let newResult;
    switch (operation) {
      case "add":
        newResult = add(result, num);
        break;
      case "subtract":
        newResult = subtract(result, num);
        break;
      case "multiply":
        newResult = multiply(result, num);
        break;
      case "divide":
        newResult = divide(result, num);
        break;
      default:
        return;
    }

    setResult(typeof newResult === "number" ? newResult : 0);
    setInput("");
  };

  const clear = () => {
    setResult(0);
    setInput("");
  };

  return (
    <div className="p-4 bg-blue-50 rounded-lg border">
      <h4 className="font-semibold text-blue-900 mb-3">Calculator Component</h4>
      <div className="space-y-3">
        <div className="p-3 bg-white rounded border">
          <div className="text-lg font-mono">Result: {result}</div>
        </div>

        <Input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a number"
          className="bg-white"
        />

        <div className="grid grid-cols-2 gap-2">
          <Button onClick={() => handleOperation("add")} size="sm">
            Add
          </Button>
          <Button onClick={() => handleOperation("subtract")} size="sm">
            Subtract
          </Button>
          <Button onClick={() => handleOperation("multiply")} size="sm">
            Multiply
          </Button>
          <Button onClick={() => handleOperation("divide")} size="sm">
            Divide
          </Button>
        </div>

        <Button onClick={clear} variant="outline" className="w-full">
          Clear
        </Button>
      </div>
    </div>
  );
};

// Component with async behavior for testing
const UserFetcher = ({ userId }: { userId: number }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`,
      );
      if (!response.ok) throw new Error("User not found");
      const userData = await response.json();
      setUser(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId > 0) {
      fetchUser();
    }
  }, [userId]);

  if (loading) return <div>Loading user...</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;
  if (!user) return <div>No user selected</div>;

  return (
    <div className="p-3 bg-white rounded border">
      <h5 className="font-medium">{user.name}</h5>
      <p className="text-sm text-gray-600">{user.email}</p>
      <p className="text-sm text-gray-600">{user.phone}</p>
    </div>
  );
};

// Form component for testing form interactions
const ContactForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      setFormData({ name: "", email: "", message: "" });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <Input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your email"
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your message"
          rows={3}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.message ? "border-red-500" : ""
          }`}
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full">
        Send Message
      </Button>
    </form>
  );
};

// Counter hook for testing custom hooks
const useCounter = (initialValue: number = 0) => {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
};

const CounterWithHook = () => {
  const { count, increment, decrement, reset } = useCounter(5);

  return (
    <div className="p-4 bg-green-50 rounded-lg border">
      <h4 className="font-semibold text-green-900 mb-3">
        Counter with Custom Hook
      </h4>
      <div className="flex items-center space-x-2 mb-3">
        <Button onClick={decrement} variant="outline" size="sm">
          -
        </Button>
        <span className="px-3 py-1 bg-white rounded border font-mono">
          {count}
        </span>
        <Button onClick={increment} variant="outline" size="sm">
          +
        </Button>
        <Button onClick={reset} variant="ghost" size="sm">
          Reset
        </Button>
      </div>
    </div>
  );
};

// Mock test results for demonstration
const mockTestResults = [
  {
    name: "Calculator.test.tsx",
    status: "passed",
    tests: [
      { name: "should add two numbers correctly", passed: true },
      { name: "should subtract two numbers correctly", passed: true },
      { name: "should multiply two numbers correctly", passed: true },
      { name: "should handle division by zero", passed: true },
      { name: "should clear the calculator", passed: true },
    ],
  },
  {
    name: "UserFetcher.test.tsx",
    status: "passed",
    tests: [
      { name: "should fetch user data on mount", passed: true },
      { name: "should show loading state", passed: true },
      { name: "should handle fetch errors", passed: true },
      { name: "should update when userId changes", passed: true },
    ],
  },
  {
    name: "ContactForm.test.tsx",
    status: "failed",
    tests: [
      { name: "should render form fields", passed: true },
      { name: "should validate required fields", passed: true },
      { name: "should validate email format", passed: false },
      { name: "should submit valid form data", passed: true },
      { name: "should clear form after submission", passed: true },
    ],
  },
  {
    name: "useCounter.test.tsx",
    status: "passed",
    tests: [
      { name: "should initialize with default value", passed: true },
      { name: "should increment count", passed: true },
      { name: "should decrement count", passed: true },
      { name: "should reset to initial value", passed: true },
    ],
  },
];

const TestResults = () => {
  const [selectedTest, setSelectedTest] = useState<string | null>(null);

  const selectedTestData = mockTestResults.find(
    (test) => test.name === selectedTest,
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold mb-3">Test Suites</h4>
          <div className="space-y-2">
            {mockTestResults.map((test, index) => (
              <button
                key={index}
                onClick={() => setSelectedTest(test.name)}
                className={`w-full p-3 rounded-lg border text-left transition-colors ${
                  selectedTest === test.name
                    ? "bg-blue-50 border-blue-200"
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{test.name}</span>
                  {test.status === "passed" ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  {test.tests.filter((t) => t.passed).length}/
                  {test.tests.length} tests passed
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Test Details</h4>
          {selectedTestData ? (
            <div className="bg-white rounded-lg border p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Code className="h-5 w-5" />
                <span className="font-medium">{selectedTestData.name}</span>
                <Badge
                  variant={
                    selectedTestData.status === "passed"
                      ? "default"
                      : "destructive"
                  }
                >
                  {selectedTestData.status}
                </Badge>
              </div>
              <div className="space-y-2">
                {selectedTestData.tests.map((test, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    {test.passed ? (
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                    )}
                    <span className="text-sm">{test.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg border p-4 text-center text-gray-600">
              Select a test suite to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const TestingExamples = () => {
  const [submittedData, setSubmittedData] = useState<any>(null);
  const [selectedUserId, setSelectedUserId] = useState(1);

  const handleFormSubmit = (data: any) => {
    setSubmittedData(data);
    console.log("Form submitted:", data);
  };

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
              <h1 className="text-2xl font-bold">Testing React Applications</h1>
              <p className="text-gray-600">
                Comprehensive testing strategies and examples
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="components" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="hooks">Hooks</TabsTrigger>
            <TabsTrigger value="integration">Integration</TabsTrigger>
            <TabsTrigger value="results">Test Results</TabsTrigger>
          </TabsList>

          <TabsContent value="components" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TestTube className="h-5 w-5" />
                  <span>Component Testing</span>
                </CardTitle>
                <CardDescription>
                  Test individual components and their behavior
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Calculator />

                  <div className="space-y-4">
                    <h4 className="font-semibold">
                      Test Scenarios for Calculator:
                    </h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>
                        • Test arithmetic operations (add, subtract, multiply,
                        divide)
                      </li>
                      <li>
                        • Test edge cases (division by zero, invalid input)
                      </li>
                      <li>
                        • Test UI interactions (button clicks, input changes)
                      </li>
                      <li>
                        • Test state management (result updates, clearing)
                      </li>
                      <li>
                        • Test accessibility (keyboard navigation, screen
                        readers)
                      </li>
                    </ul>

                    <div className="p-3 bg-gray-100 rounded text-sm">
                      <code>
                        {`// Example test
test('should add two numbers', () => {
  render(<Calculator />);
  const input = screen.getByPlaceholderText('Enter a number');
  const addButton = screen.getByText('Add');
  
  fireEvent.change(input, { target: { value: '5' } });
  fireEvent.click(addButton);
  
  expect(screen.getByText('Result: 5')).toBeInTheDocument();
});`}
                      </code>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hooks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Custom Hook Testing</CardTitle>
                <CardDescription>
                  Test custom hooks and their behavior in isolation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <CounterWithHook />

                  <div className="space-y-4">
                    <h4 className="font-semibold">
                      Test Scenarios for useCounter Hook:
                    </h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>
                        • Test initial state with default and custom values
                      </li>
                      <li>• Test increment functionality</li>
                      <li>• Test decrement functionality</li>
                      <li>• Test reset functionality</li>
                      <li>• Test hook in different component contexts</li>
                    </ul>

                    <div className="p-3 bg-gray-100 rounded text-sm">
                      <code>
                        {`// Example hook test
test('should increment count', () => {
  const { result } = renderHook(() => useCounter(0));
  
  act(() => {
    result.current.increment();
  });
  
  expect(result.current.count).toBe(1);
});`}
                      </code>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integration" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Async Component Testing</span>
                  </CardTitle>
                  <CardDescription>
                    Test components with async operations and API calls
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Select User ID:
                      </label>
                      <select
                        value={selectedUserId}
                        onChange={(e) =>
                          setSelectedUserId(Number(e.target.value))
                        }
                        className="w-full px-3 py-2 border rounded-md"
                      >
                        {[1, 2, 3, 4, 5].map((id) => (
                          <option key={id} value={id}>
                            User {id}
                          </option>
                        ))}
                      </select>
                    </div>
                    <UserFetcher userId={selectedUserId} />

                    <div className="text-sm text-gray-600">
                      <p>
                        <strong>Testing async components:</strong>
                      </p>
                      <ul className="space-y-1 mt-1">
                        <li>• Mock API calls with MSW or jest.mock</li>
                        <li>• Test loading states</li>
                        <li>• Test error handling</li>
                        <li>• Use waitFor() for async assertions</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Form Testing</CardTitle>
                  <CardDescription>
                    Test form validation, submission, and user interactions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <ContactForm onSubmit={handleFormSubmit} />

                    {submittedData && (
                      <div className="p-3 bg-green-50 rounded border">
                        <h5 className="font-medium text-green-900">
                          Form Submitted!
                        </h5>
                        <pre className="text-sm mt-1">
                          {JSON.stringify(submittedData, null, 2)}
                        </pre>
                      </div>
                    )}

                    <div className="text-sm text-gray-600">
                      <p>
                        <strong>Form testing strategies:</strong>
                      </p>
                      <ul className="space-y-1 mt-1">
                        <li>• Test validation messages</li>
                        <li>• Test form submission</li>
                        <li>• Test field interactions</li>
                        <li>• Test accessibility</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Play className="h-5 w-5" />
                  <span>Mock Test Results</span>
                </CardTitle>
                <CardDescription>
                  Simulated test results showing passed and failed tests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TestResults />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TestingExamples;
