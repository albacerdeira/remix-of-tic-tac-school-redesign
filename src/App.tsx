import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PoliticaDePrivacidade from "./pages/PoliticaDePrivacidade";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import AdminAuth from "./pages/AdminAuth";
import CookieBanner from "./components/CookieBanner";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<><Index /><CookieBanner /></>} />
          <Route path="/politica-de-privacidade" element={<><PoliticaDePrivacidade /><CookieBanner /></>} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/auth" element={<AdminAuth />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
