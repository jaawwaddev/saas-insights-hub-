import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import RevenuePage from "./pages/RevenuePage";
import UsersPage from "./pages/UsersPage";
import ChurnPage from "./pages/ChurnPage";
import FunnelPage from "./pages/FunnelPage";
import CustomersPage from "./pages/CustomersPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";

const queryClient = new QueryClient();

// Initialize theme from localStorage or system preference
function ThemeInitializer() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // System preference
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeInitializer />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/revenue" element={<RevenuePage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/churn" element={<ChurnPage />} />
          <Route path="/funnel" element={<FunnelPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
