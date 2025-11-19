import type { PropertyData } from "@/types/schema";
import { generatePropertyId } from "@/lib/id-generator";
import { useDialogManager } from "./useDialogManager";

export interface UseChildManagerReturn {
  /**
   * Add a new child property (opens dialog)
   */
  addChild: () => void;

  /**
   * Update an existing child property
   */
  updateChild: (childId: string, updated: PropertyData) => void;

  /**
   * Delete a child property
   */
  deleteChild: (childId: string) => void;

  /**
   * Dialog manager for adding new children
   */
  addChildDialog: {
    isOpen: boolean;
    data: PropertyData | null;
    setIsOpen: (isOpen: boolean) => void;
    confirm: (data: PropertyData) => void;
  };
}

/**
 * Hook for managing child properties (nested properties within an object).
 * Handles adding, updating, and deleting children with dialog state management.
 *
 * @param property - The parent property that contains children
 * @param onUpdate - Callback to update the parent property
 *
 * @example
 * ```tsx
 * const childManager = useChildManager(property, onUpdate);
 *
 * // Add child button
 * <Button onClick={childManager.addChild}>Add Child</Button>
 *
 * // Render children
 * {property.children?.map((child) => (
 *   <PropertyDocument
 *     key={child.id}
 *     property={child}
 *     onUpdate={(updated) => childManager.updateChild(child.id, updated)}
 *     onDelete={() => childManager.deleteChild(child.id)}
 *   />
 * ))}
 *
 * // Add child dialog
 * {childManager.addChildDialog.isOpen && childManager.addChildDialog.data && (
 *   <PropertyEditDialog
 *     property={childManager.addChildDialog.data}
 *     open={childManager.addChildDialog.isOpen}
 *     onOpenChange={childManager.addChildDialog.setIsOpen}
 *     onUpdate={childManager.addChildDialog.confirm}
 *   />
 * )}
 * ```
 */
export function useChildManager(
  property: PropertyData,
  onUpdate: (property: PropertyData) => void,
): UseChildManagerReturn {
  const addChildDialog = useDialogManager<PropertyData>({
    createInitialData: () => ({
      id: generatePropertyId(),
      key: "",
      type: "string",
      required: false,
    }),
    onConfirm: (child) => {
      onUpdate({
        ...property,
        children: [...(property.children || []), child],
      });
    },
  });

  const updateChild = (childId: string, updated: PropertyData) => {
    const newChildren = property.children!.map((c) =>
      c.id === childId ? updated : c,
    );
    onUpdate({ ...property, children: newChildren });
  };

  const deleteChild = (childId: string) => {
    const newChildren = property.children!.filter((c) => c.id !== childId);
    onUpdate({ ...property, children: newChildren });
  };

  return {
    addChild: () => addChildDialog.open(),
    updateChild,
    deleteChild,
    addChildDialog: {
      isOpen: addChildDialog.isOpen,
      data: addChildDialog.data,
      setIsOpen: addChildDialog.setIsOpen,
      confirm: addChildDialog.confirm,
    },
  };
}
