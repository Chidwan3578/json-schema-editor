# JSON Schema Builder - Copilot Instructions

## Project Overview

This is a **dual-mode React component library** that builds visual JSON schema editors. It operates as both:
1. A **publishable NPM library** (`json-schema-builder-react`) with controlled component exports
2. A **demo application** deployed to GitHub Pages at `martin-arusalu.github.io/json-schema-editor`

**Key principle**: The library exports a controlled component (`JsonSchemaBuilder`) that consumers integrate into their own state management. The demo (`App.tsx`) is NOT part of the library build.

## Architecture & Data Flow

### State Management Pattern
- **Controlled component model**: `JsonSchemaBuilder` receives `schema` prop and calls `onChange(schema)` callback
- **Dual representation**: Internally converts between:
  - `PropertyData[]` (UI-friendly flat structure with IDs, titles, keys)
  - Standard `JSONSchema7` (output format)
- Conversion happens in `lib/schema-parser.ts` (JSON → PropertyData) and `lib/schema-generator.ts` (PropertyData → JSON)

### Core Hook: `useSchemaBuilder`
Located in `hooks/useSchemaBuilder.ts`, this hook:
- Parses incoming `schema` prop into `PropertyData[]` using `parseSchema()`
- Provides CRUD operations that immediately generate new schemas via `generateSchema()`
- Calls `onChange()` with updated JSON schema on every mutation
- **Not exported** to library consumers - internal implementation detail

### Custom Type: "file"
- Extends JSON Schema with custom `type: "file"` for UI purposes
- Serialized as `type: "string"` with `format: "filename"` in output JSON
- See `types/schema.ts` for `PropertyType` definition

## Development Workflows

### Local Development
```bash
npm run dev              # Start Vite dev server for demo app (port 5173)
npm run check            # TypeScript type checking (no emit)
npm run lint             # ESLint check
npm run format           # Prettier formatting
```

### Library Building
```bash
npm run build:lib        # Builds library to dist-lib/ (ES + CJS + types)
BUILD_MODE=library       # Environment variable that switches Vite config
```

**Important**: `vite.config.ts` has conditional logic based on `BUILD_MODE`:
- Library mode: Builds `src/index.ts` as entry, externalizes React deps, outputs to `dist-lib/`
- App mode: Builds full demo app to `dist/` for GitHub Pages

### Publishing
Follow `PUBLISHING.md` checklist:
1. `npm version [patch|minor|major]` - Auto-commits, tags, updates package.json
2. `npm run build:lib` - Generates dist-lib with type declarations
3. `npm publish` - Publishes to NPM (triggers `prepublishOnly` hook)

### Deployment
```bash
npm run deploy           # Builds app and deploys to gh-pages branch
```

## Code Conventions

### File Organization
- `src/components/` - React components (both internal and exported)
- `src/hooks/` - Custom hooks (some exported via `index.ts`, some internal)
- `src/lib/` - Pure utility functions (schema conversion, file I/O, string utils)
- `src/types/schema.ts` - Domain type definitions extending `JSONSchema7`

### Component Patterns
- **UI components** (`components/ui/*`): shadcn/ui components, use Radix primitives
- **Feature components**: Compose UI components, manage local state with custom hooks
- Example: `PropertyEditDialog` uses `usePropertyEditor` hook for form state management

### Hook Patterns
1. **Inline editing**: `useInlineEditor` manages temporary edit state with save/cancel/revert logic
2. **Dialog management**: `useDialogManager` generic hook for modal workflows (open/close/confirm)
3. **Property editing**: `usePropertyEditor` handles form field changes with auto-key-generation (title → snake_case key)

### Type Safety
- Uses `json-schema` package's `JSONSchema7` types as base
- Internal `PropertyData` extends schema types with UI metadata (`id`, `key`, `required` flag)
- All hooks export typed return interfaces (e.g., `UseSchemaBuilderReturn`)

### Auto-Generation Patterns
- **Property IDs**: `generatePropertyId()` uses `Date.now() + Math.random()` for unique keys
- **Property keys**: `toSnakeCase()` converts titles like "User Name" → "user_name" on blur
- **Key generation only for new properties**: `isNewProperty` flag controls editability
- **Key editability**: `keyEditable` prop allows changing keys after initialization (defaults to false for safety)

## Styling & Theming

### Tailwind Configuration
- Uses **shadcn/ui v2 style** with CSS variables for theming
- Config in `components.json`: New York style, `@/` path aliases
- Custom color tokens in `tailwind.config.ts` extend HSL variables (`--background`, `--foreground`, etc.)
- Dark mode via `class` strategy (see `ThemeToggle` component)

### Component Styling Rules
- All library components assume Tailwind is configured by consumer
- No CSS imports in library build - styles via utility classes only
- `package.json` sideEffects: consumers must import Tailwind directives themselves

## Key Integrations

### Radix UI Dependencies
All dialogs, selects, checkboxes, tooltips use Radix primitives:
- `@radix-ui/react-dialog` - Modal dialogs
- `@radix-ui/react-select` - Type dropdowns
- `@radix-ui/react-checkbox` - Required toggles
- `@radix-ui/react-tooltip` - Help tooltips

### lucide-react Icons
- Used throughout (`Plus`, `Upload`, `Trash2`, `Pencil`, etc.)
- Externalized in library build (peer dependency)

## Common Gotchas

1. **Two build outputs**: Always check if changes affect library build (`dist-lib/`) vs demo app (`dist/`)
2. **Schema mutations**: Every update must go through `generateSchema()` → `onChange()` cycle
3. **Property keys immutable by default**: Once a property is saved, its key cannot be changed unless `keyEditable={true}` is set (to prevent system breakage)
4. **Recursive structures**: Objects and arrays support nested `PropertyData` via `children` and `items` fields
5. **Required array management**: Required flags stored in `PropertyData.required` boolean, but serialized to root-level `required: string[]` array

## Testing & Quality

- **No test suite** currently exists (consider adding for library stability)
- Use `npm run check` before commits to catch type errors
- Demo app serves as integration test - verify changes don't break the UI

## Context Providers

### TypeLabelsContext
Allows customizing type display labels:
```tsx
<JsonSchemaBuilder 
  typeLabels={{ string: 'Text', object: 'Form', array: 'List' }}
/>
```
Provider wraps entire component tree, accessed via `useTypeLabels()` hook.
