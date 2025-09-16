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
import DoshaAssessment from "./pages/DoshaAssessment";
import PatientProfile from "./pages/PatientProfile";
import FoodSelection from "./pages/FoodSelection";
import DietChart from "./pages/DietChart";
import Reports from "./pages/Reports";
import PractitionerAuth from "./pages/PractitionerAuth";
import PractitionerDashboard from "./pages/PractitionerDashboard";
import PatientManagement from "./pages/PatientManagement";
import Consultations from "./pages/Consultations";
import ResearchReferences from "./pages/ResearchReferences";
import RecipeAnalyzer from "./pages/RecipeAnalyzer";
import IntegrationRoadmap from "./pages/IntegrationRoadmap";


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
              <Route path="/dosha-assessment" element={<DoshaAssessment />} />
              <Route path="/patient-profile" element={<PatientProfile />} />
              <Route path="/food-selection" element={<FoodSelection />} />
              <Route path="/diet-chart" element={<DietChart />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/practitioner-auth" element={<PractitionerAuth />} />
              <Route path="/practitioner-dashboard" element={<PractitionerDashboard />} />
              <Route path="/patient-management" element={<PatientManagement />} />
              <Route path="/consultations" element={<Consultations />} />
              <Route path="/research-references" element={<ResearchReferences />} />
              <Route path="/recipe-analyzer" element={<RecipeAnalyzer />} />
              <Route path="/integration-roadmap" element={<IntegrationRoadmap />} />

            

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
