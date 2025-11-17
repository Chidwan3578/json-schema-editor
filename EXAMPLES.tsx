import React from 'react';
import { JsonSchemaBuilder } from './src/index';

/**
 * Example 1: Basic Usage
 */
export function BasicExample() {
  return (
    <JsonSchemaBuilder
      onSchemaChange={(schema) => {
        console.log('Schema changed:', schema);
      }}
    />
  );
}

/**
 * Example 2: With Initial Schema
 */
export function InitialSchemaExample() {
  const initialSchema = {
    type: 'object',
    title: 'User Profile',
    properties: {
      username: {
        type: 'string',
        minLength: 3,
        maxLength: 20
      },
      email: {
        type: 'string',
        pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$'
      },
      age: {
        type: 'integer',
        minimum: 18
      }
    },
    required: ['username', 'email']
  };

  return (
    <JsonSchemaBuilder
      initialSchema={initialSchema}
      onSchemaChange={(schema) => {
        // Send to API, save to localStorage, etc.
        localStorage.setItem('mySchema', JSON.stringify(schema));
      }}
    />
  );
}

/**
 * Example 3: Minimal UI
 */
export function MinimalExample() {
  return (
    <JsonSchemaBuilder
      showMetadata={false}
      showImport={false}
      showClear={false}
      className="h-[500px]"
    />
  );
}


/**
 * Example 5: Headless Usage (Custom UI)
 */
export function HeadlessExample() {
  const {
    properties,
    schema,
    addProperty,
    updateProperty,
    deleteProperty
  } = useSchemaBuilder();

  return (
    <div className="p-4">
      <h2>Custom Schema Builder</h2>
      
      <button
        onClick={() => {
          const prop = addProperty();
          updateProperty(prop.id, {
            ...prop,
            key: 'newProperty',
            type: 'string',
            required: false
          });
        }}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        Add Property
      </button>

      <div className="space-y-2">
        {properties.map(prop => (
          <div key={prop.id} className="flex items-center gap-2 p-2 border rounded">
            <span className="font-medium">{prop.key || 'Unnamed'}</span>
            <span className="text-sm text-gray-500">{prop.type}</span>
            <button
              onClick={() => deleteProperty(prop.id)}
              className="ml-auto text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <pre className="mt-4 p-4 bg-gray-100 rounded overflow-auto">
        {JSON.stringify(schema, null, 2)}
      </pre>
    </div>
  );
}

/**
 * Example 6: Controlled Component
 */
export function ControlledExample() {
  const [currentSchema, setCurrentSchema] = React.useState<any>(null);
  const [history, setHistory] = React.useState<any[]>([]);

  const handleSchemaChange = (schema: any) => {
    setCurrentSchema(schema);
    setHistory(prev => [...prev, schema].slice(-10)); // Keep last 10 versions
  };

  const undo = () => {
    if (history.length > 1) {
      const previous = history[history.length - 2];
      setCurrentSchema(previous);
      setHistory(prev => prev.slice(0, -1));
    }
  };

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <button
          onClick={undo}
          disabled={history.length <= 1}
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
        >
          Undo ({history.length} changes)
        </button>
      </div>
      
      <JsonSchemaBuilder
        initialSchema={currentSchema}
        onSchemaChange={handleSchemaChange}
      />
    </div>
  );
}

// Import the hook for headless example
import { useSchemaBuilder } from './src/index';
