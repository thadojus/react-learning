import React, {
  useState,
  createContext,
  useContext,
  ReactNode,
  ComponentType,
  ReactElement,
  cloneElement,
  Children,
  createPortal,
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
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Settings,
  Layers,
  AlertTriangle,
  ExternalLink,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

// Higher-Order Component (HOC) Example
interface WithLoadingProps {
  isLoading?: boolean;
}

const withLoading = <P extends object>(
  Component: ComponentType<P>,
): ComponentType<P & WithLoadingProps> => {
  return (props: P & WithLoadingProps) => {
    const { isLoading, ...rest } = props;

    if (isLoading) {
      return (
        <div className="p-4 bg-gray-100 rounded-lg animate-pulse">
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      );
    }

    return <Component {...(rest as P)} />;
  };
};

// Component to be wrapped with HOC
const UserProfile = ({ name, email }: { name: string; email: string }) => (
  <div className="p-4 bg-blue-50 rounded-lg border">
    <h4 className="font-semibold text-blue-900">User Profile</h4>
    <p>Name: {name}</p>
    <p>Email: {email}</p>
  </div>
);

const UserProfileWithLoading = withLoading(UserProfile);

// HOC with additional functionality
const withCounter = <P extends object>(Component: ComponentType<P>) => {
  return (props: P) => {
    const [count, setCount] = useState(0);

    return (
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <span className="text-sm">HOC Counter: {count}</span>
          <Button onClick={() => setCount((c) => c + 1)} size="sm">
            +
          </Button>
        </div>
        <Component {...props} />
      </div>
    );
  };
};

const SimpleComponent = () => (
  <div className="p-3 bg-green-50 rounded border">
    <p>This component is enhanced with counter functionality via HOC!</p>
  </div>
);

const SimpleComponentWithCounter = withCounter(SimpleComponent);

const HOCDemo = () => {
  const [isLoading, setIsLoading] = useState(false);

  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="p-4 bg-yellow-50 rounded-lg">
        <h4 className="font-semibold mb-3">Higher-Order Components (HOCs)</h4>
        <p className="text-sm text-gray-600 mb-4">
          HOCs are functions that take a component and return a new component
          with additional functionality.
        </p>

        <div className="space-y-4">
          <div>
            <Button onClick={simulateLoading} className="mb-3">
              Simulate Loading
            </Button>
            <UserProfileWithLoading
              name="John Doe"
              email="john@example.com"
              isLoading={isLoading}
            />
          </div>

          <div>
            <h5 className="font-medium mb-2">HOC with Counter Enhancement:</h5>
            <SimpleComponentWithCounter />
          </div>
        </div>
      </div>
    </div>
  );
};

// Render Props Pattern
interface MouseTrackerProps {
  children: (mouse: { x: number; y: number }) => ReactElement;
}

const MouseTracker = ({ children }: MouseTrackerProps) => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className="w-full h-48 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg border cursor-crosshair relative"
      onMouseMove={handleMouseMove}
    >
      {children(mouse)}
    </div>
  );
};

// Data fetcher with render props
interface DataFetcherProps<T> {
  url: string;
  children: (data: {
    data: T | null;
    loading: boolean;
    error: string | null;
  }) => ReactElement;
}

const DataFetcher = <T,>({ url, children }: DataFetcherProps<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch");
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

  return children({ data, loading, error });
};

const RenderPropsDemo = () => {
  return (
    <div className="space-y-4">
      <div className="p-4 bg-purple-50 rounded-lg">
        <h4 className="font-semibold mb-3">Render Props Pattern</h4>
        <p className="text-sm text-gray-600 mb-4">
          Share code between components using a prop whose value is a function.
        </p>

        <div className="space-y-4">
          <div>
            <h5 className="font-medium mb-2">
              Mouse Tracker with Render Props:
            </h5>
            <MouseTracker>
              {(mouse) => (
                <div className="absolute top-2 left-2 bg-white p-2 rounded shadow">
                  <p className="text-sm">
                    Mouse: ({mouse.x}, {mouse.y})
                  </p>
                  <div
                    className="w-4 h-4 bg-red-500 rounded-full absolute"
                    style={{
                      left: mouse.x - 8,
                      top: mouse.y - 8,
                      transform: "translate(-100%, -100%)",
                    }}
                  />
                </div>
              )}
            </MouseTracker>
          </div>

          <div>
            <h5 className="font-medium mb-2">
              Data Fetcher with Render Props:
            </h5>
            <DataFetcher url="https://jsonplaceholder.typicode.com/posts/1">
              {({ data, loading, error }) => {
                if (loading) return <div>Loading...</div>;
                if (error)
                  return <div className="text-red-600">Error: {error}</div>;
                return (
                  <div className="p-3 bg-white rounded border">
                    <h6 className="font-medium">{(data as any)?.title}</h6>
                    <p className="text-sm text-gray-600">
                      {(data as any)?.body}
                    </p>
                  </div>
                );
              }}
            </DataFetcher>
          </div>
        </div>
      </div>
    </div>
  );
};

// Compound Components Pattern
interface AccordionContextType {
  openIndex: number | null;
  setOpenIndex: (index: number | null) => void;
}

const AccordionContext = createContext<AccordionContextType | null>(null);

const Accordion = ({ children }: { children: ReactNode }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <AccordionContext.Provider value={{ openIndex, setOpenIndex }}>
      <div className="space-y-2">{children}</div>
    </AccordionContext.Provider>
  );
};

const AccordionItem = ({
  index,
  children,
}: {
  index: number;
  children: ReactNode;
}) => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error("AccordionItem must be used within Accordion");

  const { openIndex, setOpenIndex } = context;
  const isOpen = openIndex === index;

  const toggle = () => {
    setOpenIndex(isOpen ? null : index);
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      {Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return cloneElement(child, { isOpen, toggle } as any);
        }
        return child;
      })}
    </div>
  );
};

const AccordionHeader = ({
  children,
  toggle,
  isOpen,
}: {
  children: ReactNode;
  toggle?: () => void;
  isOpen?: boolean;
}) => (
  <button
    onClick={toggle}
    className="w-full p-3 bg-gray-50 hover:bg-gray-100 flex items-center justify-between text-left"
  >
    <span className="font-medium">{children}</span>
    {isOpen ? (
      <ChevronDown className="h-4 w-4" />
    ) : (
      <ChevronRight className="h-4 w-4" />
    )}
  </button>
);

const AccordionContent = ({
  children,
  isOpen,
}: {
  children: ReactNode;
  isOpen?: boolean;
}) => (
  <div
    className={`overflow-hidden transition-all duration-200 ${isOpen ? "max-h-96" : "max-h-0"}`}
  >
    <div className="p-3 bg-white">{children}</div>
  </div>
);

// Custom Modal using Compound Components
const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
        {children}
      </div>
    </div>,
    document.body,
  );
};

const ModalHeader = ({ children }: { children: ReactNode }) => (
  <div className="p-4 border-b">
    <h3 className="text-lg font-semibold">{children}</h3>
  </div>
);

const ModalBody = ({ children }: { children: ReactNode }) => (
  <div className="p-4">{children}</div>
);

const ModalFooter = ({ children }: { children: ReactNode }) => (
  <div className="p-4 border-t flex justify-end space-x-2">{children}</div>
);

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

const CompoundComponentsDemo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="p-4 bg-indigo-50 rounded-lg">
        <h4 className="font-semibold mb-3">Compound Components Pattern</h4>
        <p className="text-sm text-gray-600 mb-4">
          Create components that work together to form a cohesive UI element.
        </p>

        <div className="space-y-4">
          <div>
            <h5 className="font-medium mb-2">Custom Accordion:</h5>
            <Accordion>
              <AccordionItem index={0}>
                <AccordionHeader>What is React?</AccordionHeader>
                <AccordionContent>
                  React is a JavaScript library for building user interfaces,
                  particularly web applications. It allows developers to create
                  reusable UI components.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem index={1}>
                <AccordionHeader>What are React Hooks?</AccordionHeader>
                <AccordionContent>
                  React Hooks are functions that allow you to use state and
                  other React features in functional components without writing
                  a class.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem index={2}>
                <AccordionHeader>What is the Virtual DOM?</AccordionHeader>
                <AccordionContent>
                  The Virtual DOM is a JavaScript representation of the actual
                  DOM. React uses it to optimize rendering by minimizing direct
                  DOM manipulations.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div>
            <h5 className="font-medium mb-2">
              Modal with Compound Components:
            </h5>
            <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <Modal.Header>Compound Modal</Modal.Header>
              <Modal.Body>
                <p>
                  This modal is built using the compound components pattern.
                </p>
                <p className="mt-2">
                  Each part (header, body, footer) is a separate component that
                  works together to create the complete modal experience.
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  size="sm"
                >
                  Cancel
                </Button>
                <Button onClick={() => setIsModalOpen(false)} size="sm">
                  Confirm
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

// Error Boundary
class ErrorBoundary extends React.Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2 text-red-800">
              <AlertTriangle className="h-5 w-5" />
              <h4 className="font-semibold">Something went wrong!</h4>
            </div>
            <p className="text-red-700 mt-2">
              {this.state.error?.message || "An unexpected error occurred"}
            </p>
            <Button
              onClick={() =>
                this.setState({ hasError: false, error: undefined })
              }
              variant="outline"
              size="sm"
              className="mt-3"
            >
              Try Again
            </Button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

// Component that can throw an error
const BuggyComponent = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error("Intentional error for demonstration!");
  }

  return (
    <div className="p-3 bg-green-50 rounded border">
      <p>✅ Component rendered successfully!</p>
    </div>
  );
};

const ErrorBoundaryDemo = () => {
  const [shouldThrow, setShouldThrow] = useState(false);

  return (
    <div className="space-y-4">
      <div className="p-4 bg-red-50 rounded-lg">
        <h4 className="font-semibold mb-3">Error Boundaries</h4>
        <p className="text-sm text-gray-600 mb-4">
          Error boundaries catch JavaScript errors in component trees and
          display fallback UI instead of crashing the entire app.
        </p>

        <div className="space-y-3">
          <div className="space-x-2">
            <Button
              onClick={() => setShouldThrow(false)}
              variant={!shouldThrow ? "default" : "outline"}
              size="sm"
            >
              Normal Mode
            </Button>
            <Button
              onClick={() => setShouldThrow(true)}
              variant={shouldThrow ? "destructive" : "outline"}
              size="sm"
            >
              Trigger Error
            </Button>
          </div>

          <ErrorBoundary>
            <BuggyComponent shouldThrow={shouldThrow} />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

// Portal Example
const PortalDemo = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="space-y-4">
      <div className="p-4 bg-cyan-50 rounded-lg">
        <h4 className="font-semibold mb-3">React Portals</h4>
        <p className="text-sm text-gray-600 mb-4">
          Portals provide a way to render children into a DOM node outside of
          the parent component's DOM hierarchy.
        </p>

        <div className="relative">
          <Button
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="relative"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Hover for Portal Tooltip
          </Button>

          {showTooltip &&
            createPortal(
              <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white px-3 py-2 rounded shadow-lg z-50">
                <p>This tooltip is rendered in a portal!</p>
                <p className="text-xs">It's outside the normal DOM hierarchy</p>
              </div>,
              document.body,
            )}
        </div>
      </div>
    </div>
  );
};

const AdvancedPatterns = () => {
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
              <h1 className="text-2xl font-bold">Advanced React Patterns</h1>
              <p className="text-gray-600">
                Expert-level patterns and architectural techniques
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="hoc" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5">
            <TabsTrigger value="hoc">HOCs</TabsTrigger>
            <TabsTrigger value="renderProps">Render Props</TabsTrigger>
            <TabsTrigger value="compound">Compound</TabsTrigger>
            <TabsTrigger value="errorBoundary">Error Boundary</TabsTrigger>
            <TabsTrigger value="portal">Portals</TabsTrigger>
          </TabsList>

          <TabsContent value="hoc" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Higher-Order Components</span>
                </CardTitle>
                <CardDescription>
                  Enhance components with additional functionality using HOCs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <HOCDemo />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="renderProps" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Render Props Pattern</CardTitle>
                <CardDescription>
                  Share code between components using render props
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RenderPropsDemo />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compound" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Layers className="h-5 w-5" />
                  <span>Compound Components</span>
                </CardTitle>
                <CardDescription>
                  Create flexible, composable component APIs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CompoundComponentsDemo />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="errorBoundary" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Error Boundaries</span>
                </CardTitle>
                <CardDescription>
                  Gracefully handle errors in React component trees
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ErrorBoundaryDemo />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ExternalLink className="h-5 w-5" />
                  <span>React Portals</span>
                </CardTitle>
                <CardDescription>
                  Render components outside the normal component tree
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PortalDemo />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdvancedPatterns;
