import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import InitiativesPage from "./pages/Initiatives";
import ProgramsPage from "./pages/Programs";
import Events from "./pages/Events";
import ImpactPage from "./pages/ImpactPage";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import ContactPage from "./pages/ContactPage";
import Register from "./pages/Register";
import EventDetails from "./pages/EventDetails";
import ProgramDetails from "./pages/ProgramDetails";
import YouthCollaboration from "./pages/YouthCollaboration";
import ResearchLabs from "./pages/ResearchLabs";
import Startups from "./pages/Startups";
import Community from "./pages/Community";
import Resources from "./pages/Resources";
import AIFellowship from "./pages/AIFellowship";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminEventForm from "./pages/admin/AdminEventForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/initiatives" element={<InitiativesPage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/impact" element={<ImpactPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/event-details" element={<EventDetails />} />
          <Route path="/program-details" element={<ProgramDetails />} />
          <Route path="/youth-collaboration" element={<YouthCollaboration />} />
          <Route path="/research-labs" element={<ResearchLabs />} />
          <Route path="/startups" element={<Startups />} />
          <Route path="/community" element={<Community />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/ai-fellowship" element={<AIFellowship />} />

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="events/new" element={<AdminEventForm />} />
            <Route path="events/:id/edit" element={<AdminEventForm />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
