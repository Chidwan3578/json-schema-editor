# JSON Schema Editor

A beautiful, interactive React component for building and editing JSON schemas visually. Built with TypeScript, Tailwind CSS, and Radix UI.

- 📖 [View demo](https://martin-arusalu.github.io/json-schema-editor)

## Features

- 🎨 **Visual Editor** - Build JSON schemas with an intuitive drag-and-drop interface
- 📝 **Full JSON Schema Support** - Support for all JSON Schema types and constraints
- 🎯 **Type-Safe** - Written in TypeScript with full type definitions
- 🎨 **Customizable** - Flexible API with extensive customization options
- 📦 **Headless Options** - Use just the hooks and utilities without UI
- 🌗 **Theme Support** - Built-in dark mode support
- ⚡ **Lightweight** - Tree-shakeable with minimal bundle size impact

## Installation

```bash
npm install json-schema-editor
# or
yarn add json-schema-editor
# or
pnpm add json-schema-editor
```

### Styling

This library uses Tailwind CSS utility classes. You'll need Tailwind CSS configured in your project and add the library to your Tailwind content paths:

**Note:** The library components will automatically use your project's Tailwind theme (colors, spacing, etc.).

## Usage

### Basic Example

```tsx
import { JsonSchemaEditor } from 'json-schema-editor';

function App() {
  const handleSchemaChange = (schema) => {
    console.log('Schema updated:', schema);
  };

  return (
    <JsonSchemaEditor 
      onSchemaChange={handleSchemaChange}
    />
  );
}
```

### With Initial Schema

```tsx
import { JsonSchemaEditor } from 'json-schema-editor';

const initialSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    age: { type: 'number' }
  },
  required: ['name']
};

function App() {
  return (
    <JsonSchemaEditor 
      initialSchema={initialSchema}
      onSchemaChange={(schema) => {
        // Save to backend, localStorage, etc.
        console.log(schema);
      }}
    />
  );
}
```

### Customized Layout

```tsx
import { JsonSchemaEditor } from 'json-schema-editor';

function App() {
  return (
    <JsonSchemaEditor
      showMetadata={true}
      showImport={false}
      showClear={true}
      showOutput={true}
      className="h-[600px]"
      headerContent={
        <div>
          <h1>My Custom Header</h1>
          <button>Custom Action</button>
        </div>
      }
    />
  );
}
```

## API Reference

### JsonSchemaEditor Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialSchema` | `object` | `undefined` | Initial JSON schema to load |
| `onSchemaChange` | `(schema: any) => void` | `undefined` | Callback when schema changes |
| `showMetadata` | `boolean` | `true` | Show metadata fields (title, description, version) |
| `showImport` | `boolean` | `true` | Show import button |
| `showClear` | `boolean` | `true` | Show clear all button |
| `showOutput` | `boolean` | `true` | Show JSON output panel |
| `headerContent` | `ReactNode` | `undefined` | Custom header content |
| `className` | `string` | `"h-screen"` | Custom className for container |

## Headless Usage

Use just the hooks and utilities without the UI components:

```tsx
import { useSchemaBuilder, generateSchema } from 'json-schema-editor';

function MyCustomEditor() {
  const {
    properties,
    metadata,
    schema,
    addProperty,
    updateProperty,
    deleteProperty,
  } = useSchemaBuilder(true);

  return (
    <div>
      {/* Build your own custom UI */}
      <button onClick={() => {
        const newProp = addProperty();
        updateProperty(newProp.id, {
          ...newProp,
          key: 'myProperty',
          type: 'string'
        });
      }}>
        Add Property
      </button>
      
      <pre>{JSON.stringify(schema, null, 2)}</pre>
    </div>
  );
}
```

## Available Exports

### Components
- `JsonSchemaEditor` - Main editor component
- `PropertyDocument` - Individual property card
- `PropertyEditDialog` - Property edit modal
- `JsonOutput` - JSON output display
- `SchemaMetadataComponent` - Schema metadata fields

### Hooks
- `useSchemaBuilder` - Main schema builder logic
- `usePropertyEditor` - Property editing logic

### Utilities
- `generateSchema` - Generate JSON schema from properties
- `parseSchema` - Parse JSON schema into properties
- `downloadJsonFile` - Download schema as JSON file
- `importJsonFile` - Import schema from file

### Types
- `PropertyData` - Property data structure
- `PropertyType` - Supported property types
- `PropertyConstraints` - Property constraint types
- `SchemaMetadata` - Schema metadata structure

## Examples

### Using Individual Components

```tsx
import { 
  PropertyDocument, 
  useSchemaBuilder 
} from 'json-schema-editor';

function CustomEditor() {
  const { properties, updateProperty, deleteProperty } = useSchemaBuilder();

  return (
    <div>
      {properties.map(property => (
        <PropertyDocument
          key={property.id}
          property={property}
          onUpdate={(updated) => updateProperty(property.id, updated)}
          onDelete={() => deleteProperty(property.id)}
        />
      ))}
    </div>
  );
}
```

### Programmatic Schema Generation

```tsx
import { generateSchema } from 'json-schema-editor';
import type { PropertyData } from 'json-schema-editor';

const properties: PropertyData[] = [
  {
    id: '1',
    key: 'username',
    type: 'string',
    required: true,
    constraints: {
      minLength: 3,
      maxLength: 20
    }
  },
  {
    id: '2',
    key: 'email',
    type: 'string',
    required: true,
    constraints: {
      pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$'
    }
  }
];

const schema = generateSchema(
  properties,
  { title: 'User Schema', description: 'User registration', version: '1.0.0' },
  true
);
```

## Development

```bash
# Install dependencies
npm install

# Run demo app in development mode
npm run dev

# Build the library
npm run build:lib

# Build the demo app
npm run build

# Deploy demo to GitHub Pages
npm run deploy
```

## License

MIT © Martin Arusalu

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

- 🐛 [Report a bug](https://github.com/martin-arusalu/json-schema-editor/issues)
- 💡 [Request a feature](https://github.com/martin-arusalu/json-schema-editor/issues)
- 📖 [View demo](https://martin-arusalu.github.io/json-schema-editor)
