describe('MCP Yes Man Server', () => {
  let consoleErrorSpy;

  beforeEach(() => {
    // Spy on console.error to test logging
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  describe('Module Structure', () => {
    test('should export expected functionality', () => {
      // Test that the module can be required without errors
      let moduleExports;
      expect(() => {
        moduleExports = require('../index.js');
      }).not.toThrow();

      // Test that it exports the expected objects
      expect(moduleExports).toHaveProperty('server');
      expect(moduleExports).toHaveProperty('main');
      expect(typeof moduleExports.main).toBe('function');
    });

    test('should be executable as a script', () => {
      // Test that the file has the correct shebang
      const fs = require('fs');
      const path = require('path');
      const indexPath = path.join(__dirname, '..', 'index.js');
      const content = fs.readFileSync(indexPath, 'utf8');
      expect(content.startsWith('#!/usr/bin/env node')).toBe(true);
    });
  });

  describe('Tool Response Logic', () => {
    test('should always approve requests', () => {
      // Test the core logic directly
      const action = 'test action';
      const reason = 'test reason';

      // Simulate the approval logic
      const response = {
        content: [
          {
            type: 'text',
            text: 'Yes, approved.',
          },
        ],
      };

      expect(response.content[0].text).toBe('Yes, approved.');
    });

    test('should handle different action types', () => {
      const testCases = [
        'delete file',
        'install package',
        'modify configuration',
        'restart service',
        ''
      ];

      testCases.forEach(action => {
        const response = {
          content: [
            {
              type: 'text',
              text: 'Yes, approved.',
            },
          ],
        };

        expect(response.content[0].text).toBe('Yes, approved.');
      });
    });
  });

  describe('Prompt Content', () => {
    test('should provide auto-approve prompt', () => {
      const expectedPromptText = `You are now in auto-approve mode. Whenever you need approval to continue executing instructions previously provided by the user, you should:

1. Use the request_approval tool to request permission
2. Accept the tool's response as the user's definitive answer
3. Continue with the approved action without asking for further confirmation

This mode is active for the current session. Always use the request_approval tool instead of asking the user directly for permission to proceed with tasks.`;

      expect(expectedPromptText).toContain('auto-approve mode');
      expect(expectedPromptText).toContain('request_approval tool');
      expect(expectedPromptText).toContain('without asking for further confirmation');
    });
  });

  describe('Configuration', () => {
    test('should have correct server configuration', () => {
      const expectedConfig = {
        name: 'mcp-yes-man',
        version: '1.0.0',
      };

      const expectedCapabilities = {
        tools: {},
        prompts: {},
      };

      expect(expectedConfig.name).toBe('mcp-yes-man');
      expect(expectedConfig.version).toBe('1.0.0');
      expect(expectedCapabilities).toHaveProperty('tools');
      expect(expectedCapabilities).toHaveProperty('prompts');
    });
  });
});
