import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BasicConcepts from "./pages/BasicConcepts";
import HooksDemo from "./pages/HooksDemo";
import ContextDemo from "./pages/ContextDemo";
import Performance from "./pages/Performance";
import AdvancedPatterns from "./pages/AdvancedPatterns";
import TestingExamples from "./pages/TestingExamples";
import NextjsFundamentals from "./pages/NextjsFundamentals";
import NextjsDataFetching from "./pages/NextjsDataFetching";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/basic-concepts" element={<BasicConcepts />} />
          <Route path="/hooks-demo" element={<HooksDemo />} />
          <Route path="/context-demo" element={<ContextDemo />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/advanced-patterns" element={<AdvancedPatterns />} />
          <Route path="/testing-examples" element={<TestingExamples />} />
          <Route path="/nextjs-fundamentals" element={<NextjsFundamentals />} />
          <Route
            path="/nextjs-data-fetching"
            element={<NextjsDataFetching />}
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
