import { useState } from "react";
import type { PropertyData, PropertyType } from "@/types/schema";

export interface UseTypeSelectorReturn {
  /**
   * Whether the type selector is currently open
   */
  isChangingType: boolean;

  /**
   * Set whether the type selector is open
   */
  setIsChangingType: (isOpen: boolean) => void;

  /**
   * Handle type change with automatic cleanup of type-specific constraints
   */
  handleTypeChange: (newType: PropertyType) => void;

  /**
   * List of available types that can be selected
   */
  availableTypes: PropertyType[];
}

/**
 * Hook for managing property type selection with automatic constraint cleanup.
 * When changing types, automatically removes constraints that don't apply to the new type.
 *
 * @param property - The property being edited
 * @param onUpdate - Callback to update the property
 *
 * @example
 * ```tsx
 * const typeSelector = useTypeSelector(property, onUpdate);
 *
 * {typeSelector.isChangingType ? (
 *   <Select
 *     value={property.type}
 *     onValueChange={typeSelector.handleTypeChange}
 *     open={typeSelector.isChangingType}
 *     onOpenChange={typeSelector.setIsChangingType}
 *   >
 *     {typeSelector.availableTypes.map(type => (
 *       <SelectItem key={type} value={type}>{type}</SelectItem>
 *     ))}
 *   </Select>
 * ) : (
 *   <button onClick={() => typeSelector.setIsChangingType(true)}>
 *     {property.type}
 *   </button>
 * )}
 * ```
 */
export function useTypeSelector(
  property: PropertyData,
  onUpdate: (property: PropertyData) => void,
): UseTypeSelectorReturn {
  const [isChangingType, setIsChangingType] = useState(false);

  const availableTypes: PropertyType[] = [
    "string",
    "number",
    "integer",
    "boolean",
    "object",
    "array",
    "file",
  ];

  const handleTypeChange = (newType: PropertyType) => {
    const updated: PropertyData = { ...property, type: newType };

    // Clear type-specific fields when changing type
    if (newType !== "string") {
      delete updated.minLength;
      delete updated.maxLength;
      delete updated.pattern;
      delete updated.enum;
    }
    if (newType !== "number" && newType !== "integer") {
      delete updated.minimum;
      delete updated.maximum;
    }
    if (newType !== "array") {
      delete updated.minItems;
      delete updated.maxItems;
      delete updated.uniqueItems;
      delete updated.items;
    }
    if (newType !== "object") {
      delete updated.children;
    }

    onUpdate(updated);
    setIsChangingType(false);
  };

  return {
    isChangingType,
    setIsChangingType,
    handleTypeChange,
    availableTypes,
  };
}
