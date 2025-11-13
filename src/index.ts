/**
 * @packageDocumentation
 * JSON Schema Editor - A React component library for building JSON schemas visually
 */

// Main component
export { JsonSchemaEditor } from "./components/JsonSchemaEditor";
export type { JsonSchemaEditorProps } from "./components/JsonSchemaEditor";

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
  PropertyConstraints,
  SchemaMetadata,
} from "./types/schema";

// Sub-components (for advanced usage)
export { default as PropertyDocument } from "./components/PropertyDocument";
export { default as PropertyEditDialog } from "./components/PropertyEditDialog";
export { default as JsonOutput } from "./components/JsonOutput";
export { default as SchemaMetadataComponent } from "./components/SchemaMetadata";
