import { Switch, Route, Router as WouterRouter } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { JsonSchemaBuilder } from "@/components/JsonSchemaBuilder";
import NotFound from "@/pages/not-found";

function SchemaBuilderPage() {
  return (
    <JsonSchemaBuilder
      typeLabels={{
        string: 'Text',
        boolean: 'Yes/No',
        object: 'Form',
        array: 'List',
      }}  
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
        <Route path="/" component={SchemaBuilderPage} />
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
