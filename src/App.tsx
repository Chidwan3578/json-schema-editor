import { Switch, Route, Router as WouterRouter } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { JsonSchemaEditor } from "@/components/JsonSchemaEditor";
import NotFound from "@/pages/not-found";

function SchemaEditorPage() {
  return (
    <JsonSchemaEditor
      onSchemaChange={(schema) => {
        console.log("Schema changed:", schema);
      }}
    />
  );
}

function Router() {
  const base = import.meta.env.BASE_URL;

  return (
    <WouterRouter base={base}>
      <Switch>
        <Route path="/" component={SchemaEditorPage} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Router />
    </TooltipProvider>
  );
}

export default App;
