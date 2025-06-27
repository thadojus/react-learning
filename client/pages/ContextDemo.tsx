import React, {
  createContext,
  useContext,
  useReducer,
  useState,
  ReactNode,
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
  Users,
  Settings,
  ShoppingCart,
  Bell,
  Sun,
  Moon,
} from "lucide-react";

// Simple Theme Context
interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        className={`${
          theme === "dark" ? "dark bg-gray-900 text-white" : "bg-white"
        } transition-colors duration-300`}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button onClick={toggleTheme} variant="outline" size="sm">
      {theme === "light" ? (
        <Moon className="h-4 w-4 mr-2" />
      ) : (
        <Sun className="h-4 w-4 mr-2" />
      )}
      {theme === "light" ? "Dark" : "Light"} Mode
    </Button>
  );
};

const ThemeDemo = () => {
  const { theme } = useTheme();

  return (
    <ThemeProvider>
      <div className="p-4 rounded-lg border">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold">Theme Context Demo</h4>
          <ThemeToggle />
        </div>
        <div className="space-y-2">
          <p>Current theme: {theme}</p>
          <div className="p-3 bg-primary/10 rounded">
            <p>This content adapts to the theme!</p>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

// User Context with Reducer
interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
}

interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

type UserAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "LOGOUT" }
  | { type: "UPDATE_USER"; payload: Partial<User> };

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, isLoading: true, error: null };
    case "LOGIN_SUCCESS":
      return { ...state, isLoading: false, user: action.payload, error: null };
    case "LOGIN_FAILURE":
      return { ...state, isLoading: false, error: action.payload };
    case "LOGOUT":
      return { ...state, user: null, error: null };
    case "UPDATE_USER":
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    default:
      return state;
  }
};

interface UserContextType {
  state: UserState;
  login: (credentials: { email: string; password: string }) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, {
    user: null,
    isLoading: false,
    error: null,
  });

  const login = async (credentials: { email: string; password: string }) => {
    dispatch({ type: "LOGIN_START" });

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (credentials.email === "admin@example.com") {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            id: 1,
            name: "John Admin",
            email: credentials.email,
            role: "admin",
          },
        });
      } else if (credentials.email === "user@example.com") {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            id: 2,
            name: "Jane User",
            email: credentials.email,
            role: "user",
          },
        });
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: "Invalid email or password",
      });
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const updateUser = (updates: Partial<User>) => {
    dispatch({ type: "UPDATE_USER", payload: updates });
  };

  return (
    <UserContext.Provider value={{ state, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state, login } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  if (state.user) {
    return (
      <div className="p-4 bg-green-50 rounded-lg border">
        <h4 className="font-semibold text-green-900 mb-2">Welcome back!</h4>
        <div className="space-y-2">
          <p>Name: {state.user.name}</p>
          <p>Email: {state.user.email}</p>
          <Badge
            variant={state.user.role === "admin" ? "default" : "secondary"}
          >
            {state.user.role.toUpperCase()}
          </Badge>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium mb-1">Email:</label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Try: admin@example.com or user@example.com"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Password:</label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Any password"
          required
        />
      </div>
      {state.error && <div className="text-red-600 text-sm">{state.error}</div>}
      <Button type="submit" disabled={state.isLoading} className="w-full">
        {state.isLoading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};

const UserProfile = () => {
  const { state, logout, updateUser } = useUser();
  const [name, setName] = useState(state.user?.name || "");

  if (!state.user) {
    return <div>Please log in to view profile.</div>;
  }

  const handleNameUpdate = () => {
    updateUser({ name });
  };

  return (
    <div className="space-y-4">
      <div className="p-4 bg-blue-50 rounded-lg border">
        <h4 className="font-semibold text-blue-900 mb-2">User Profile</h4>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Name:</label>
            <div className="flex space-x-2">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleNameUpdate} size="sm">
                Update
              </Button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email:</label>
            <p className="text-gray-600">{state.user.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Role:</label>
            <Badge
              variant={state.user.role === "admin" ? "default" : "secondary"}
            >
              {state.user.role.toUpperCase()}
            </Badge>
          </div>
          <Button onClick={logout} variant="destructive" size="sm">
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

// Shopping Cart Context
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (newItem: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existingItem = prev.find((item) => item.id === newItem.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

const ProductList = () => {
  const { addItem } = useCart();

  const products = [
    { id: 1, name: "React Handbook", price: 29.99 },
    { id: 2, name: "TypeScript Guide", price: 39.99 },
    { id: 3, name: "Node.js Essentials", price: 34.99 },
  ];

  return (
    <div className="space-y-2">
      <h4 className="font-semibold">Products</h4>
      {products.map((product) => (
        <div
          key={product.id}
          className="flex items-center justify-between p-2 bg-white rounded border"
        >
          <div>
            <span className="font-medium">{product.name}</span>
            <span className="text-gray-600 ml-2">${product.price}</span>
          </div>
          <Button onClick={() => addItem(product)} size="sm">
            Add to Cart
          </Button>
        </div>
      ))}
    </div>
  );
};

const Cart = () => {
  const { items, updateQuantity, removeItem, clearCart, total } = useCart();

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">Shopping Cart</h4>
        {items.length > 0 && (
          <Button onClick={clearCart} variant="outline" size="sm">
            Clear Cart
          </Button>
        )}
      </div>

      {items.length === 0 ? (
        <p className="text-gray-600">Your cart is empty</p>
      ) : (
        <>
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-2 bg-white rounded border"
            >
              <div>
                <span className="font-medium">{item.name}</span>
                <span className="text-gray-600 ml-2">
                  ${item.price} x {item.quantity}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  variant="outline"
                  size="sm"
                >
                  -
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  variant="outline"
                  size="sm"
                >
                  +
                </Button>
                <Button
                  onClick={() => removeItem(item.id)}
                  variant="destructive"
                  size="sm"
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
          <div className="font-semibold text-lg">
            Total: ${total.toFixed(2)}
          </div>
        </>
      )}
    </div>
  );
};

const ContextDemo = () => {
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
              <h1 className="text-2xl font-bold">
                Context API & State Management
              </h1>
              <p className="text-gray-600">
                Advanced state management patterns with React Context
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="theme" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="theme">Theme Context</TabsTrigger>
            <TabsTrigger value="user">User Management</TabsTrigger>
            <TabsTrigger value="cart">Shopping Cart</TabsTrigger>
          </TabsList>

          <TabsContent value="theme" className="space-y-6">
            <TheorySection
              title="React Context API"
              description="Share state across component trees without prop drilling"
              level="Intermediate"
            >
              <Definition term="React Context">
                React Context provides a way to pass data through the component
                tree without having to pass props down manually at every level.
                It's designed to share data that is "global" for a tree of React
                components.
              </Definition>

              <KeyPoints
                points={[
                  "Context provides a way to share values between components",
                  "Avoids 'prop drilling' - passing props through intermediate components",
                  "Consumer components re-render when context value changes",
                  "Use createContext() to create a context",
                  "Wrap components with Provider to give them access to context",
                  "Use useContext() hook to consume context values",
                ]}
              />

              <WhenToUse
                scenarios={[
                  "Theme data (like dark/light mode)",
                  "Current authenticated user",
                  "Locale preference for internationalization",
                  "Shopping cart state in e-commerce apps",
                ]}
              />
            </TheorySection>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Theme Context Example</span>
                </CardTitle>
                <CardDescription>
                  Learn how to implement a simple theme context
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <ThemeDemo />
                  </div>
                  <div>
                    <CodeSnippet
                      title="Theme Context Implementation"
                      language="typescript"
                      description="Complete implementation of a theme context with provider and consumer."
                      highlights={[
                        "createContext",
                        "Context Provider",
                        "useContext Hook",
                        "Custom Hook",
                      ]}
                      code={`import React, { createContext, useContext, useState, ReactNode } from 'react';

// 1. Define the context type
interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

// 2. Create the context with default value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 3. Create the Provider component
const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  // Provide the context value to children
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={\`\${theme === "dark" ? "dark bg-gray-900 text-white" : "bg-white"} transition-colors duration-300\`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// 4. Create a custom hook for consuming context
const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

// 5. Component that uses the context
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 bg-blue-600 text-white rounded"
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"} Mode
    </button>
  );
};

// 6. App component with provider
const App = () => {
  return (
    <ThemeProvider>
      <div className="p-4">
        <h1>Theme Context Demo</h1>
        <ThemeToggle />
        <div className="mt-4 p-4 bg-primary/10 rounded">
          <p>This content adapts to the theme!</p>
        </div>
      </div>
    </ThemeProvider>
  );
};

// Key Benefits:
// ✓ No prop drilling required
// ✓ Clean separation of concerns
// ✓ Custom hook provides type safety
// ✓ Error handling for missing provider
// ✓ Automatic re-rendering when context changes`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="user" className="space-y-6">
            <UserProvider>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="h-5 w-5" />
                      <span>User Authentication</span>
                    </CardTitle>
                    <CardDescription>
                      Context with useReducer for complex state management
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <LoginForm />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>User Profile</CardTitle>
                    <CardDescription>
                      Access and modify user state from any component
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <UserProfile />
                  </CardContent>
                </Card>
              </div>
            </UserProvider>
          </TabsContent>

          <TabsContent value="cart" className="space-y-6">
            <CartProvider>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <ShoppingCart className="h-5 w-5" />
                      <span>Product Catalog</span>
                    </CardTitle>
                    <CardDescription>
                      Add items to a global shopping cart state
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ProductList />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Shopping Cart</CardTitle>
                    <CardDescription>
                      Cart state is shared across all components
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Cart />
                  </CardContent>
                </Card>
              </div>
            </CartProvider>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ContextDemo;
