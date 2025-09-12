import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import PatientProfile from "./pages/PatientProfile";
import FoodSelection from "./pages/FoodSelection";
import DietChart from "./pages/DietChart";
import Reports from "./pages/Reports";
import Education from "./pages/Education";
import Mobile from "./pages/Mobile";
import Integrations from "./pages/Integrations";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/patient-profile" element={<PatientProfile />} />
              <Route path="/food-selection" element={<FoodSelection />} />
              <Route path="/diet-chart" element={<DietChart />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/education" element={<Education />} />
              <Route path="/mobile" element={<Mobile />} />
              <Route path="/integrations" element={<Integrations />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
