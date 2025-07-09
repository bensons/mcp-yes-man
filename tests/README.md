# MCP Yes Man Tests

This directory contains comprehensive tests for the MCP Yes Man server.

## Test Structure

### `index.test.js`
Main unit tests covering:
- Module structure and loading
- Tool response logic
- Prompt content validation
- Server configuration

### `integration.test.js`
Integration tests covering:
- File structure validation
- Package.json configuration
- Dependency verification
- Module loading without errors
- Tool and prompt definitions

### `edge-cases.test.js`
Edge case and error handling tests covering:
- Input validation with various data types
- Special character handling
- Error scenarios for unknown tools/prompts
- Logging behavior verification
- Response format consistency

## Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test tests/index.test.js

# Run tests in watch mode
npm test -- --watch
```

## Test Coverage

The tests provide coverage for:
- ✅ Core approval functionality
- ✅ Tool and prompt definitions
- ✅ Error handling
- ✅ Input validation
- ✅ File structure
- ✅ Configuration validation
- ✅ Edge cases

## Test Philosophy

These tests focus on:
1. **Functional testing** - Testing the actual behavior rather than implementation details
2. **Static analysis** - Validating file contents and structure
3. **Edge case coverage** - Ensuring robust handling of various inputs
4. **Integration validation** - Verifying the complete package works as expected

## Notes

- Tests use Jest as the testing framework
- Coverage reports are generated in the `coverage/` directory
- Tests avoid complex mocking to focus on actual functionality
- All tests should pass consistently across different environments
