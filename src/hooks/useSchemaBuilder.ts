// Custom hook for managing schema builder state and operations
// INTERNAL USE ONLY - not exported to external users

import { useMemo, useCallback } from "react";
import type { PropertyData, SchemaMetadata } from "@/types/schema";
import { generateSchema } from "@/lib/schema-generator";
import { parseSchema } from "@/lib/schema-parser";
import { importJsonFile, downloadJsonFile } from "@/lib/file-utils";
import { generatePropertyId } from "@/lib/id-generator";

export interface UseSchemaBuilderReturn {
  properties: PropertyData[];
  metadata: SchemaMetadata;
  addProperty: () => PropertyData;
  updateProperty: (id: string, updated: PropertyData) => void;
  deleteProperty: (id: string) => void;
  clearAll: () => void;
  updateMetadata: (field: keyof SchemaMetadata, value: string) => void;
  importSchema: () => Promise<void>;
  downloadSchema: () => void;
}

interface UseSchemaBuilderOptions {
  schema: any;
  onChange: (schema: any) => void;
  includeMetadata?: boolean;
}

export const useSchemaBuilder = ({
  schema,
  onChange,
  includeMetadata = true,
}: UseSchemaBuilderOptions): UseSchemaBuilderReturn => {
  // Parse properties and metadata from controlled schema prop
  const { properties: parsedProperties, metadata: parsedMetadata } = useMemo(
    () => parseSchema(schema),
    [schema],
  );

  const properties = parsedProperties;
  const metadata = parsedMetadata || {
    title: "",
    description: "",
    version: "",
  };

  // Add a new property
  const addProperty = useCallback((): PropertyData => {
    const property: PropertyData = {
      id: generatePropertyId(),
      key: "",
      type: "string",
      required: false,
    };
    return property;
  }, []);

  // Update an existing property or add it if it doesn't exist
  const updateProperty = useCallback(
    (id: string, updated: PropertyData) => {
      const exists = properties.some((p) => p.id === id);
      let updatedProperties: PropertyData[];

      if (exists) {
        updatedProperties = properties.map((p) => (p.id === id ? updated : p));
      } else {
        // If property doesn't exist, add it
        updatedProperties = [...properties, updated];
      }

      const newSchema = generateSchema(
        updatedProperties,
        metadata,
        includeMetadata,
      );
      onChange(newSchema);
    },
    [properties, metadata, includeMetadata, onChange],
  );

  // Delete a property
  const deleteProperty = useCallback(
    (id: string) => {
      const updatedProperties = properties.filter((p) => p.id !== id);
      const newSchema = generateSchema(
        updatedProperties,
        metadata,
        includeMetadata,
      );
      onChange(newSchema);
    },
    [properties, metadata, includeMetadata, onChange],
  );

  // Clear all properties and reset metadata
  const clearAll = useCallback(() => {
    const emptyMetadata = { title: "", description: "", version: "" };
    const newSchema = generateSchema([], emptyMetadata, includeMetadata);
    onChange(newSchema);
  }, [includeMetadata, onChange]);

  // Update metadata field
  const updateMetadata = useCallback(
    (field: keyof SchemaMetadata, value: string) => {
      const updatedMetadata = { ...metadata, [field]: value };
      const newSchema = generateSchema(
        properties,
        updatedMetadata,
        includeMetadata,
      );
      onChange(newSchema);
    },
    [properties, metadata, includeMetadata, onChange],
  );

  // Import schema from file
  const importSchema = useCallback(async () => {
    const data = await importJsonFile();
    onChange(data);
  }, [onChange]);

  // Download schema as file
  const downloadSchema = useCallback(() => {
    downloadJsonFile(schema, "schema.json");
  }, [schema]);

  return {
    properties,
    metadata,
    addProperty,
    updateProperty,
    deleteProperty,
    clearAll,
    updateMetadata,
    importSchema,
    downloadSchema,
  };
};
