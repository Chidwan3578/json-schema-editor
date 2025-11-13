# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial library setup with component exports
- `JsonSchemaEditor` main component with props API
- Headless hooks: `useSchemaBuilder`, `usePropertyEditor`
- Utility functions for schema generation and parsing
- Full TypeScript support with type definitions
- Comprehensive documentation and examples

## [0.0.1] - 2025-11-12

### Added
- Initial release
- Visual JSON Schema editor component
- Support for all JSON Schema types (string, number, integer, boolean, object, array, null)
- Property constraints (minLength, maxLength, pattern, min/max, etc.)
- Nested object and array support
- Schema metadata fields (title, description, version)
- Import/export functionality
- Real-time JSON output preview
- Dark mode support
- Tailwind CSS styling with Radix UI components

[Unreleased]: https://github.com/martin-arusalu/json-schema-editor/compare/v0.0.1...HEAD
[0.0.1]: https://github.com/martin-arusalu/json-schema-editor/releases/tag/v0.0.1
