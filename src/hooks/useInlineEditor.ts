import { useState, useEffect } from "react";

export interface UseInlineEditorOptions {
  /**
   * Whether to allow empty values. If false, reverts to original value on blur when empty.
   * @default false
   */
  allowEmpty?: boolean;

  /**
   * Callback when editing starts
   */
  onEditStart?: () => void;

  /**
   * Callback when editing is cancelled
   */
  onEditCancel?: () => void;
}

export interface UseInlineEditorReturn {
  /**
   * Whether the field is currently being edited
   */
  isEditing: boolean;

  /**
   * The current edited value
   */
  value: string;

  /**
   * Start editing mode
   */
  startEdit: () => void;

  /**
   * Handle value changes
   */
  handleChange: (newValue: string) => void;

  /**
   * Handle blur event - saves or reverts changes
   */
  handleBlur: () => void;

  /**
   * Handle keyboard events (Enter to save, Escape to cancel)
   */
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

/**
 * Hook for managing inline editing state and behavior.
 * Handles common patterns like Enter/Escape keys, blur to save, and syncing with external value changes.
 *
 * @param initialValue - The initial/current value from props
 * @param onSave - Callback when value should be saved (on blur or Enter)
 * @param options - Optional configuration
 *
 * @example
 * ```tsx
 * const titleEditor = useInlineEditor(
 *   property.title || "",
 *   (newValue) => onUpdate({ ...property, title: newValue }),
 *   { allowEmpty: false }
 * );
 *
 * {titleEditor.isEditing ? (
 *   <Input
 *     value={titleEditor.value}
 *     onChange={(e) => titleEditor.handleChange(e.target.value)}
 *     onBlur={titleEditor.handleBlur}
 *     onKeyDown={titleEditor.handleKeyDown}
 *     autoFocus
 *   />
 * ) : (
 *   <span onClick={titleEditor.startEdit}>{property.title}</span>
 * )}
 * ```
 */
export function useInlineEditor(
  initialValue: string,
  onSave: (value: string) => void,
  options: UseInlineEditorOptions = {},
): UseInlineEditorReturn {
  const { allowEmpty = false, onEditStart, onEditCancel } = options;

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  // Keep value in sync with initialValue when not editing
  useEffect(() => {
    if (!isEditing) {
      setValue(initialValue);
    }
  }, [initialValue, isEditing]);

  const startEdit = () => {
    setValue(initialValue);
    setIsEditing(true);
    onEditStart?.();
  };

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  const handleBlur = () => {
    const trimmedValue = value.trim();

    // Don't allow empty if not permitted - revert to original
    if (!allowEmpty && !trimmedValue) {
      setValue(initialValue);
      setIsEditing(false);
      return;
    }

    // Only save if value changed
    if (trimmedValue !== initialValue) {
      onSave(trimmedValue);
    }

    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleBlur();
    } else if (e.key === "Escape") {
      setValue(initialValue);
      setIsEditing(false);
      onEditCancel?.();
    }
  };

  return {
    isEditing,
    value,
    startEdit,
    handleChange,
    handleBlur,
    handleKeyDown,
  };
}
