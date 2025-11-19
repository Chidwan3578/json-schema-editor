import React, { useState } from 'react';
import { JsonSchemaBuilder } from './src/index';

/**
 * Example 1: Basic Usage
 */
export function BasicExample() {
  const [schema, setSchema] = useState({
    type: 'object',
    properties: {},
    required: []
  });

  return (
    <JsonSchemaBuilder
      schema={schema}
      onChange={(newSchema) => {
        setSchema(newSchema);
        console.log('Schema changed:', newSchema);
      }}
    />
  );
}

/**
 * Example 2: With Initial Schema
 */
export function InitialSchemaExample() {
  const [schema, setSchema] = useState({
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
  });

  return (
    <JsonSchemaBuilder
      schema={schema}
      onChange={(newSchema) => {
        setSchema(newSchema);
        // Send to API, save to localStorage, etc.
        localStorage.setItem('mySchema', JSON.stringify(newSchema));
      }}
    />
  );
}

/**
 * Example 3: Minimal UI
 */
export function MinimalExample() {
  const [schema, setSchema] = useState({
    type: 'object',
    properties: {},
    required: []
  });

  return (
    <JsonSchemaBuilder
      schema={schema}
      onChange={setSchema}
      showMetadata={false}
      showImport={false}
      showClear={false}
      className="h-[500px]"
    />
  );
}

/**
 * Example 4: Controlled with Undo/Redo
 */
export function UndoRedoExample() {
  const [history, setHistory] = useState([{
    type: 'object',
    properties: {},
    required: []
  }]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentSchema = history[currentIndex];

  const handleSchemaChange = (newSchema: any) => {
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(newSchema);
    setHistory(newHistory);
    setCurrentIndex(currentIndex + 1);
  };

  const undo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const redo = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <button
          onClick={undo}
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
        >
          Undo
        </button>
        <button
          onClick={redo}
          disabled={currentIndex === history.length - 1}
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
        >
          Redo
        </button>
        <span className="px-4 py-2 text-gray-600">
          {currentIndex + 1} / {history.length}
        </span>
      </div>
      
      <JsonSchemaBuilder
        schema={currentSchema}
        onChange={handleSchemaChange}
      />
    </div>
  );
}

/**
 * Example 5: Custom Type Labels
 */
export function CustomLabelsExample() {
  const [schema, setSchema] = useState({
    type: 'object',
    properties: {},
    required: []
  });

  return (
    <JsonSchemaBuilder
      schema={schema}
      onChange={setSchema}
      typeLabels={{
        string: 'Text',
        boolean: 'Yes/No',
        object: 'Form',
        array: 'List',
      }}
      propertyLabel={{
        singular: 'field',
        plural: 'fields'
      }}
    />
  );
}

/**
 * Example 6: Allow Editing Property Keys
 * By default, property keys are immutable after creation to prevent breaking references.
 * Set keyEditable={true} to allow changing keys even after initialization.
 */
export function EditableKeysExample() {
  const [schema, setSchema] = useState({
    type: 'object',
    properties: {
      old_key: {
        type: 'string',
        title: 'Example Field'
      }
    },
    required: []
  });

  return (
    <JsonSchemaBuilder
      schema={schema}
      onChange={setSchema}
      keyEditable={true} // Allows editing property keys after creation
      showMetadata={false}
    />
  );
}
