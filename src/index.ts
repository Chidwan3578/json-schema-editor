/**
 * @packageDocumentation
 * JSON Schema Builder - A React component library for building JSON schemas visually
 */

// Main component
export { JsonSchemaBuilder } from "./components/JsonSchemaBuilder";
export type { JsonSchemaBuilderProps } from "./components/JsonSchemaBuilder";

// Context types
export type { TypeLabels } from "./contexts/TypeLabelsContext";

// Hooks for headless usage
export { useSchemaBuilder } from "./hooks/useSchemaBuilder";
export type { UseSchemaBuilderReturn } from "./hooks/useSchemaBuilder";
export { usePropertyEditor } from "./hooks/usePropertyEditor";

// Utility functions
export { generateSchema } from "./lib/schema-generator";
export { parseSchema } from "./lib/schema-parser";
export { downloadJsonFile, importJsonFile } from "./lib/file-utils";

// Types
export type {
  PropertyData,
  PropertyType,
  SchemaMetadata,
} from "./types/schema";

// Sub-components (for advanced usage)
export { default as PropertyDocument } from "./components/PropertyDocument";
export { default as PropertyEditDialog } from "./components/PropertyEditDialog";
export { default as JsonOutput } from "./components/JsonOutput";
export { default as SchemaMetadataComponent } from "./components/SchemaMetadata";
