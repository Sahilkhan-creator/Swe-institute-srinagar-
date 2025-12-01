import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Layout } from "@/components/layout";
import Home from "@/pages/home";
import ClassPage from "@/pages/class-page";
import PoemPage from "@/pages/poem-page";
import NotesLanding from "@/pages/notes-landing";
import NotesClassPage from "@/pages/notes-class-page";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/class/:id" component={ClassPage} />
        <Route path="/poem/:id" component={PoemPage} />
        <Route path="/notes" component={NotesLanding} />
        <Route path="/notes/:id" component={NotesClassPage} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
