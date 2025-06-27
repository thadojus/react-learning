import React, { useState } from "react";
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
  ConceptCard,
} from "@/components/TheorySection";
import { Link } from "react-router-dom";
import { ArrowLeft, User, MessageSquare, List, ToggleLeft } from "lucide-react";

// Example 1: Basic Functional Component with Props
const WelcomeMessage = ({ name, role }: { name: string; role: string }) => {
  return (
    <div className="p-4 bg-blue-50 rounded-lg border">
      <h3 className="text-lg font-semibold text-blue-900">Welcome, {name}!</h3>
      <p className="text-blue-700">Your role: {role}</p>
    </div>
  );
};

// Example 2: Class Component (for educational purposes)
class ClassComponentExample extends React.Component<
  { title: string },
  { count: number; message: string }
> {
  constructor(props: { title: string }) {
    super(props);
    this.state = {
      count: 0,
      message: "Class component initialized!",
    };
  }

  componentDidMount() {
    console.log("Class component mounted!");
  }

  incrementCount = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1,
      message: `Count updated to ${prevState.count + 1}!`,
    }));
  };

  render() {
    return (
      <div className="p-4 bg-purple-50 rounded-lg border">
        <h3 className="text-lg font-semibold text-purple-900">
          {this.props.title}
        </h3>
        <p className="text-purple-700 mb-2">{this.state.message}</p>
        <p className="text-purple-600 mb-3">Count: {this.state.count}</p>
        <Button onClick={this.incrementCount} variant="outline" size="sm">
          Increment
        </Button>
      </div>
    );
  }
}

// Example 3: Event Handling Component
const EventHandlingDemo = () => {
  const [message, setMessage] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleButtonClick = () => {
    setMessage("Button was clicked!");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(`Form submitted with: "${inputValue}"`);
    setInputValue("");
  };

  return (
    <div className="p-4 bg-green-50 rounded-lg border space-y-3">
      <h3 className="text-lg font-semibold text-green-900">Event Handling</h3>

      <div>
        <Button onClick={handleButtonClick} className="mr-2">
          Click Me
        </Button>
        {message && <span className="text-green-700">{message}</span>}
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-2">
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type something..."
          className="bg-white"
        />
        <Button type="submit" variant="outline" size="sm">
          Submit Form
        </Button>
      </form>
    </div>
  );
};

// Example 4: Conditional Rendering
const ConditionalRenderingDemo = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<"admin" | "user" | "guest">("guest");

  return (
    <div className="p-4 bg-yellow-50 rounded-lg border space-y-3">
      <h3 className="text-lg font-semibold text-yellow-900">
        Conditional Rendering
      </h3>

      <div className="space-x-2">
        <Button
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          variant={isLoggedIn ? "destructive" : "default"}
          size="sm"
        >
          {isLoggedIn ? "Logout" : "Login"}
        </Button>

        <select
          value={userType}
          onChange={(e) =>
            setUserType(e.target.value as "admin" | "user" | "guest")
          }
          className="px-3 py-1 border rounded"
        >
          <option value="guest">Guest</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Conditional rendering examples */}
      {isLoggedIn ? (
        <div className="p-3 bg-green-100 rounded">
          <p className="text-green-800">✅ You are logged in!</p>
          {userType === "admin" && (
            <p className="text-green-700">🔧 Admin panel available</p>
          )}
          {userType === "user" && (
            <p className="text-green-700">👤 User dashboard available</p>
          )}
        </div>
      ) : (
        <div className="p-3 bg-red-100 rounded">
          <p className="text-red-800">��� Please log in to continue</p>
        </div>
      )}

      {/* Ternary operator example */}
      <p className="text-yellow-700">
        Status: {isLoggedIn ? "Active" : "Inactive"} | Permission Level:{" "}
        {userType.toUpperCase()}
      </p>
    </div>
  );
};

// Example 5: Lists and Keys
const ListsAndKeysDemo = () => {
  const [items, setItems] = useState([
    { id: 1, name: "React", category: "Frontend" },
    { id: 2, name: "Node.js", category: "Backend" },
    { id: 3, name: "TypeScript", category: "Language" },
  ]);
  const [newItem, setNewItem] = useState("");

  const addItem = () => {
    if (newItem.trim()) {
      const newId = Math.max(...items.map((item) => item.id)) + 1;
      setItems([...items, { id: newId, name: newItem, category: "Custom" }]);
      setNewItem("");
    }
  };

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="p-4 bg-indigo-50 rounded-lg border space-y-3">
      <h3 className="text-lg font-semibold text-indigo-900">Lists and Keys</h3>

      <div className="flex space-x-2">
        <Input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add new item..."
          className="bg-white"
        />
        <Button onClick={addItem} size="sm">
          Add
        </Button>
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-2 bg-white rounded border"
          >
            <div>
              <span className="font-medium">{item.name}</span>
              <Badge variant="outline" className="ml-2 text-xs">
                {item.category}
              </Badge>
            </div>
            <Button
              onClick={() => removeItem(item.id)}
              variant="destructive"
              size="sm"
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Simple Counter Demo for State section
const SimpleCounterDemo = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prevCount) => prevCount + 1);
  const decrement = () => setCount((prevCount) => prevCount - 1);
  const reset = () => setCount(0);

  return (
    <div className="space-y-2">
      <div className="text-2xl font-mono text-center bg-white p-3 rounded border">
        {count}
      </div>
      <div className="flex space-x-2">
        <Button onClick={decrement} variant="outline" size="sm">
          -
        </Button>
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

// Multiple State Demo for State section
const MultipleStateDemo = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="space-y-3">
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
        className="bg-white"
      />

      <Input
        type="number"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
        placeholder="Enter age"
        className="bg-white"
      />

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={isVisible}
          onChange={(e) => setIsVisible(e.target.checked)}
        />
        <span className="text-sm">Show details</span>
      </label>

      {isVisible && (
        <div className="p-3 bg-white rounded border">
          <p>
            <strong>Name:</strong> {name || "Not set"}
          </p>
          <p>
            <strong>Age:</strong> {age}
          </p>
          <p>
            <strong>Can vote:</strong> {age >= 18 ? "Yes" : "No"}
          </p>
        </div>
      )}
    </div>
  );
};

// Forms and Controlled Components
const FormsDemo = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    subscribe: false,
    experience: "beginner",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Form submitted! Check console for data.");
  };

  return (
    <div className="p-4 bg-pink-50 rounded-lg border">
      <h3 className="text-lg font-semibold text-pink-900 mb-3">
        Forms & Controlled Components
      </h3>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">Name:</label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email:</label>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className="bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Experience Level:
          </label>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded bg-white"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border rounded bg-white"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="subscribe"
            checked={formData.subscribe}
            onChange={handleInputChange}
          />
          <label className="text-sm">Subscribe to newsletter</label>
        </div>

        <Button type="submit" className="w-full">
          Submit Form
        </Button>
      </form>

      <div className="mt-4 p-3 bg-white rounded border">
        <h4 className="font-medium mb-2">Form Data (Real-time):</h4>
        <pre className="text-xs text-gray-600">
          {JSON.stringify(formData, null, 2)}
        </pre>
      </div>
    </div>
  );
};

const BasicConcepts = () => {
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
              <h1 className="text-2xl font-bold">Basic React Concepts</h1>
              <p className="text-gray-600">
                Fundamental building blocks of React development
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="components" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="conditional">Conditional</TabsTrigger>
            <TabsTrigger value="lists">Lists</TabsTrigger>
            <TabsTrigger value="forms">Forms</TabsTrigger>
            <TabsTrigger value="state">State</TabsTrigger>
          </TabsList>

          <TabsContent value="components" className="space-y-6">
            <TheorySection
              title="React Components & Props"
              description="Understanding the building blocks of React applications"
              level="Beginner"
            >
              <Definition term="React Component">
                A React component is a reusable piece of UI that can accept
                inputs (called "props") and return React elements describing
                what should appear on the screen. Components let you split the
                UI into independent, reusable pieces.
              </Definition>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <ConceptCard
                  type="concept"
                  title="Functional Components"
                  description="Modern way to create components using JavaScript functions. They are simpler and easier to test."
                />
                <ConceptCard
                  type="concept"
                  title="Props (Properties)"
                  description="Data passed from parent components to child components. Props are read-only and help make components reusable."
                />
              </div>

              <KeyPoints
                points={[
                  "Components must start with a capital letter (e.g., MyComponent)",
                  "Props are passed down from parent to child components",
                  "Props are read-only - components should never modify their props",
                  "Components can return JSX, which is a syntax extension for JavaScript",
                  "Components can be reused throughout your application",
                  "Use TypeScript interfaces to define prop types for better development experience",
                ]}
              />

              <WhenToUse
                scenarios={[
                  "Creating reusable UI elements (buttons, cards, forms)",
                  "Breaking down complex UIs into smaller, manageable pieces",
                  "Sharing data between different parts of your application",
                  "Building consistent design systems",
                ]}
              />
            </TheorySection>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Practical Examples</span>
                </CardTitle>
                <CardDescription>
                  See components and props in action with interactive examples
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <WelcomeMessage name="John Doe" role="Developer" />
                    <ClassComponentExample title="Class Component Example" />
                  </div>
                  <div className="space-y-4">
                    <CodeSnippet
                      title="Functional Component with Props"
                      language="typescript"
                      description="A simple functional component that accepts props and renders them."
                      highlights={["Props Interface", "Destructuring", "JSX"]}
                      code={`// Functional component with typed props
interface WelcomeProps {
  name: string;
  role: string;
}

const WelcomeMessage = ({ name, role }: WelcomeProps) => {
  return (
    <div className="p-4 bg-blue-50 rounded-lg border">
      {/* Display the name prop */}
      <h3 className="text-lg font-semibold text-blue-900">
        Welcome, {name}!
      </h3>
      {/* Display the role prop */}
      <p className="text-blue-700">Your role: {role}</p>
    </div>
  );
};

// Usage:
// <WelcomeMessage name="John Doe" role="Developer" />`}
                    />

                    <CodeSnippet
                      title="Class Component Example"
                      language="typescript"
                      description="A class component demonstrating state management and lifecycle methods."
                      highlights={[
                        "Class Component",
                        "State",
                        "Lifecycle",
                        "Event Handling",
                      ]}
                      code={`// Class component with state and lifecycle
class ClassComponentExample extends React.Component<
  { title: string }, // Props type
  { count: number; message: string } // State type
> {
  constructor(props: { title: string }) {
    super(props);
    // Initialize state
    this.state = {
      count: 0,
      message: "Class component initialized!",
    };
  }

  // Lifecycle method - runs after component mounts
  componentDidMount() {
    console.log("Class component mounted!");
  }

  // Event handler with arrow function (auto-binds this)
  incrementCount = () => {
    // Use setState to update state
    this.setState((prevState) => ({
      count: prevState.count + 1,
      message: \`Count updated to \${prevState.count + 1}!\`,
    }));
  };

  render() {
    return (
      <div className="p-4 bg-purple-50 rounded-lg border">
        <h3 className="text-lg font-semibold text-purple-900">
          {this.props.title}
        </h3>
        <p className="text-purple-700 mb-2">{this.state.message}</p>
        <p className="text-purple-600 mb-3">Count: {this.state.count}</p>
        <button onClick={this.incrementCount}>
          Increment
        </button>
      </div>
    );
  }
}`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>Event Handling</span>
                </CardTitle>
                <CardDescription>
                  Handle user interactions with event handlers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <EventHandlingDemo />
                  </div>
                  <div>
                    <CodeSnippet
                      title="Event Handling Component"
                      language="typescript"
                      description="Demonstrates various event handling patterns in React."
                      highlights={[
                        "Event Handlers",
                        "Form Events",
                        "State Updates",
                        "Event Objects",
                      ]}
                      code={`const EventHandlingDemo = () => {
  const [message, setMessage] = useState("");
  const [inputValue, setInputValue] = useState("");

  // Simple button click handler
  const handleButtonClick = () => {
    setMessage("Button was clicked!");
  };

  // Input change handler with event object
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Extract value from event target
    setInputValue(e.target.value);
  };

  // Form submission handler
  const handleFormSubmit = (e: React.FormEvent) => {
    // Prevent default form submission
    e.preventDefault();
    setMessage(\`Form submitted with: "\${inputValue}"\`);
    setInputValue(""); // Clear input
  };

  return (
    <div className="space-y-3">
      {/* Button click event */}
      <button onClick={handleButtonClick}>
        Click Me
      </button>

      {/* Display message */}
      {message && <span>{message}</span>}

      {/* Form with controlled input */}
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type something..."
        />
        <button type="submit">Submit Form</button>
      </form>
    </div>
  );
};`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="conditional" className="space-y-6">
            <TheorySection
              title="Conditional Rendering"
              description="Control what gets displayed based on application state and conditions"
              level="Beginner"
            >
              <Definition term="Conditional Rendering">
                Conditional rendering in React allows you to render different
                elements or components based on certain conditions. It's like if
                statements, but for JSX elements.
              </Definition>

              <KeyPoints
                points={[
                  "Use ternary operator (condition ? true : false) for simple conditions",
                  "Use logical AND (&&) operator for showing/hiding elements",
                  "Use if statements before return for complex logic",
                  "Can conditionally render entire components or just content",
                  "Helps create dynamic and interactive user interfaces",
                ]}
              />
            </TheorySection>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ToggleLeft className="h-5 w-5" />
                  <span>Conditional Rendering Examples</span>
                </CardTitle>
                <CardDescription>
                  Learn different ways to conditionally show content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <ConditionalRenderingDemo />
                  </div>
                  <div>
                    <CodeSnippet
                      title="Conditional Rendering Patterns"
                      language="typescript"
                      description="Different ways to conditionally render content in React."
                      highlights={[
                        "Ternary Operator",
                        "Logical AND",
                        "If Statements",
                        "Multiple Conditions",
                      ]}
                      code={`const ConditionalRenderingDemo = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<"admin" | "user" | "guest">("guest");

  return (
    <div className="space-y-3">
      {/* Button to toggle login state */}
      <button
        onClick={() => setIsLoggedIn(!isLoggedIn)}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {isLoggedIn ? "Logout" : "Login"}
      </button>

      {/* User type selector */}
      <select
        value={userType}
        onChange={(e) => setUserType(e.target.value as "admin" | "user" | "guest")}
        className="px-3 py-1 border rounded"
      >
        <option value="guest">Guest</option>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      {/* Conditional rendering with ternary operator */}
      {isLoggedIn ? (
        <div className="p-3 bg-green-100 rounded">
          <p className="text-green-800">✅ You are logged in!</p>

          {/* Nested conditional rendering */}
          {userType === "admin" && (
            <p className="text-green-700">🔧 Admin panel available</p>
          )}

          {userType === "user" && (
            <p className="text-green-700">👤 User dashboard available</p>
          )}
        </div>
      ) : (
        <div className="p-3 bg-red-100 rounded">
          <p className="text-red-800">❌ Please log in to continue</p>
        </div>
      )}

      {/* Inline ternary for simple text */}
      <p className="text-gray-700">
        Status: {isLoggedIn ? "Active" : "Inactive"} |
        Permission Level: {userType.toUpperCase()}
      </p>
    </div>
  );
};

// Key Patterns:
// 1. Ternary operator: condition ? trueElement : falseElement
// 2. Logical AND: condition && element (shows element if condition is true)
// 3. Multiple conditions with nested ternary or if statements
// 4. Can return null to render nothing`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lists" className="space-y-6">
            <TheorySection
              title="Lists and Keys"
              description="Efficiently render dynamic collections of data"
              level="Beginner"
            >
              <Definition term="Lists and Keys">
                When rendering lists of elements, React needs a way to track
                which items have changed, been added, or removed. Keys help
                React identify list items and optimize re-rendering.
              </Definition>

              <KeyPoints
                points={[
                  "Use map() to transform arrays into JSX elements",
                  "Each list item must have a unique 'key' prop",
                  "Keys help React optimize re-rendering performance",
                  "Use stable, predictable keys (like IDs, not array indices)",
                  "Keys must be unique among siblings, not globally",
                  "Don't use array indices as keys if list order can change",
                ]}
              />

              <WhenToUse
                scenarios={[
                  "Displaying lists of products, users, or posts",
                  "Creating navigation menus from data",
                  "Rendering search results or filtered content",
                  "Building dynamic forms with multiple inputs",
                ]}
              />
            </TheorySection>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <List className="h-5 w-5" />
                  <span>Lists and Keys Examples</span>
                </CardTitle>
                <CardDescription>
                  Learn how to render and manage dynamic lists efficiently
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <ListsAndKeysDemo />
                  </div>
                  <div>
                    <CodeSnippet
                      title="Lists and Keys Implementation"
                      language="typescript"
                      description="Complete example of rendering and managing dynamic lists with proper key usage."
                      highlights={[
                        "Array.map()",
                        "Unique Keys",
                        "State Updates",
                        "List Operations",
                      ]}
                      code={`const ListsAndKeysDemo = () => {
  const [items, setItems] = useState([
    { id: 1, name: "React", category: "Frontend" },
    { id: 2, name: "Node.js", category: "Backend" },
    { id: 3, name: "TypeScript", category: "Language" },
  ]);
  const [newItem, setNewItem] = useState("");

  // Add new item to the list
  const addItem = () => {
    if (newItem.trim()) {
      // Generate unique ID for new item
      const newId = Math.max(...items.map(item => item.id)) + 1;

      setItems(prevItems => [
        ...prevItems, // Spread existing items
        {
          id: newId,
          name: newItem,
          category: "Custom"
        }
      ]);

      setNewItem(""); // Clear input
    }
  };

  // Remove item from list
  const removeItem = (id: number) => {
    setItems(prevItems =>
      prevItems.filter(item => item.id !== id)
    );
  };

  return (
    <div className="space-y-4">
      {/* Add new item form */}
      <div className="flex space-x-2">
        <input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add new item..."
          className="flex-1 px-3 py-2 border rounded"
        />
        <button
          onClick={addItem}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add
        </button>
      </div>

      {/* Render list of items */}
      <div className="space-y-2">
        {items.map(item => (
          <div
            key={item.id} // Unique key for each item
            className="flex items-center justify-between p-3 bg-white rounded border"
          >
            <div>
              <span className="font-medium">{item.name}</span>
              <span className="ml-2 px-2 py-1 bg-gray-100 rounded text-sm">
                {item.category}
              </span>
            </div>

            <button
              onClick={() => removeItem(item.id)}
              className="px-3 py-1 bg-red-600 text-white rounded text-sm"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Display count */}
      <p className="text-sm text-gray-600">
        Total items: {items.length}
      </p>
    </div>
  );
};

// Key Concepts:
// ✓ Each item has unique 'key' prop
// ✓ Use item.id (stable) instead of array index
// ✓ Immutable updates with spread operator
// ✓ Filter for removal, concat/spread for addition`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="forms" className="space-y-6">
            <TheorySection
              title="Forms & Controlled Components"
              description="Build interactive forms that React controls"
              level="Beginner"
            >
              <Definition term="Controlled Components">
                A controlled component is a form element whose value is
                controlled by React state. The input's value is always driven by
                React state, making React the "single source of truth."
              </Definition>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <ConceptCard
                  type="concept"
                  title="Controlled vs Uncontrolled"
                  description="Controlled components store their state in React. Uncontrolled components store their state in the DOM."
                />
                <ConceptCard
                  type="important"
                  title="Single Source of Truth"
                  description="React state becomes the single source of truth for form values, making them predictable and easy to manage."
                />
              </div>

              <KeyPoints
                points={[
                  "Use value prop to control input value from state",
                  "Use onChange handler to update state when input changes",
                  "Controlled components make form validation easier",
                  "All form data is available in React state",
                  "Can implement real-time validation and formatting",
                  "Form submission can access all values from state",
                ]}
              />
            </TheorySection>

            <Card>
              <CardHeader>
                <CardTitle>Forms & Controlled Components Examples</CardTitle>
                <CardDescription>
                  Learn how to build and manage interactive forms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <FormsDemo />
                  </div>
                  <div>
                    <CodeSnippet
                      title="Controlled Form Component"
                      language="typescript"
                      description="Complete form implementation with controlled inputs and validation."
                      highlights={[
                        "Controlled Inputs",
                        "Form Validation",
                        "State Management",
                        "Event Handling",
                      ]}
                      code={`const FormsDemo = () => {
  // Form state - single source of truth
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    subscribe: false,
    experience: "beginner",
  });

  // Handle input changes - updates state
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      // Handle checkbox differently than text inputs
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload

    // Form data is available in state
    console.log("Form submitted:", formData);
    alert("Form submitted! Check console for data.");

    // Could send to API here
    // await fetch('/api/submit', {
    //   method: 'POST',
    //   body: JSON.stringify(formData)
    // });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Controlled text input */}
      <div>
        <label className="block text-sm font-medium mb-1">Name:</label>
        <input
          name="name"
          value={formData.name} // Controlled by state
          onChange={handleInputChange} // Updates state
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>

      {/* Controlled email input */}
      <div>
        <label className="block text-sm font-medium mb-1">Email:</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>

      {/* Controlled select */}
      <div>
        <label className="block text-sm font-medium mb-1">Experience:</label>
        <select
          name="experience"
          value={formData.experience}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      {/* Controlled textarea */}
      <div>
        <label className="block text-sm font-medium mb-1">Message:</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          rows={3}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      {/* Controlled checkbox */}
      <div className="flex items-center space-x-2">
        <input
          name="subscribe"
          type="checkbox"
          checked={formData.subscribe}
          onChange={handleInputChange}
        />
        <label className="text-sm">Subscribe to newsletter</label>
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Submit Form
      </button>

      {/* Show current form state */}
      <div className="mt-4 p-3 bg-gray-100 rounded">
        <h4 className="font-medium mb-2">Form State (Real-time):</h4>
        <pre className="text-xs text-gray-600">
          {JSON.stringify(formData, null, 2)}
        </pre>
      </div>
    </form>
  );
};

// Benefits of Controlled Components:
// ✓ React state is the single source of truth
// ✓ Easy to implement validation
// ✓ Can format input values in real-time
// ✓ Form data always available in component state
// ✓ Easy to reset or populate forms programmatically`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="state" className="space-y-6">
            <TheorySection
              title="React State Management"
              description="Understanding how React components maintain and update data"
              level="Beginner"
            >
              <Definition term="React State">
                State is data that can change over time in your component. When
                state changes, React automatically re-renders the component to
                reflect the new data. State is what makes your UI interactive
                and dynamic.
              </Definition>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <ConceptCard
                  type="concept"
                  title="useState Hook"
                  description="The primary way to add state to functional components. Returns current state and a setter function."
                />
                <ConceptCard
                  type="important"
                  title="Immutable Updates"
                  description="Always create new state objects instead of modifying existing ones. This helps React detect changes."
                />
              </div>

              <KeyPoints
                points={[
                  "State is private to each component instance",
                  "Changing state triggers a re-render",
                  "State updates are asynchronous",
                  "Use functional updates for state that depends on previous state",
                  "State should be the minimal representation of your UI",
                  "Lift state up when multiple components need the same data",
                ]}
              />
            </TheorySection>

            <Card>
              <CardHeader>
                <CardTitle>State Management Examples</CardTitle>
                <CardDescription>
                  See how state works in practice with interactive examples
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {/* Simple Counter Example */}
                    <div className="p-4 bg-blue-50 rounded-lg border">
                      <h4 className="font-semibold text-blue-900 mb-3">
                        Simple Counter State
                      </h4>
                      <SimpleCounterDemo />
                    </div>

                    {/* Multiple State Values */}
                    <div className="p-4 bg-green-50 rounded-lg border">
                      <h4 className="font-semibold text-green-900 mb-3">
                        Multiple State Values
                      </h4>
                      <MultipleStateDemo />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <CodeSnippet
                      title="Basic State Management"
                      language="typescript"
                      description="Essential patterns for managing component state with useState."
                      highlights={[
                        "useState Hook",
                        "State Updates",
                        "Functional Updates",
                        "Multiple State",
                      ]}
                      code={`import { useState } from 'react';

const SimpleCounterDemo = () => {
  // Initialize state with useState hook
  const [count, setCount] = useState(0);

  // Simple state update
  const increment = () => {
    setCount(count + 1);
  };

  // Functional state update (recommended for counters)
  const incrementFunctional = () => {
    setCount(prevCount => prevCount + 1);
  };

  // Decrement with functional update
  const decrement = () => {
    setCount(prevCount => prevCount - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="space-y-2">
      <div className="text-2xl font-mono text-center">{count}</div>
      <div className="flex space-x-2">
        <button onClick={decrement}>-</button>
        <button onClick={incrementFunctional}>+</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

const MultipleStateDemo = () => {
  // Multiple state variables
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Object state (be careful with updates!)
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });

  // Update object state immutably
  const updateUserName = (firstName: string) => {
    setUser(prevUser => ({
      ...prevUser, // Spread existing properties
      firstName    // Update only firstName
    }));
  };

  return (
    <div className="space-y-3">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />

      <input
        type="number"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
        placeholder="Enter age"
      />

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={isVisible}
          onChange={(e) => setIsVisible(e.target.checked)}
        />
        <span>Show details</span>
      </label>

      {isVisible && (
        <div className="p-2 bg-white rounded border">
          <p>Name: {name}</p>
          <p>Age: {age}</p>
          <p>Can vote: {age >= 18 ? "Yes" : "No"}</p>
        </div>
      )}
    </div>
  );
};

// Key State Principles:
// 1. State is local to component
// 2. setState triggers re-render
// 3. Use functional updates for dependent state
// 4. Keep state minimal and derived data in render
// 5. Lift state up when sharing between components`}
                    />

                    <div className="text-center p-4 bg-gray-50 rounded">
                      <p className="text-gray-600 mb-4">
                        Ready for more advanced state management?
                      </p>
                      <Link to="/hooks-demo">
                        <Button>Explore React Hooks</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BasicConcepts;
