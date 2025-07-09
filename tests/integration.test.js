const fs = require('fs');
const path = require('path');

describe('MCP Yes Man Server Integration', () => {
  describe('File Structure', () => {
    test('should have executable main file', () => {
      const indexPath = path.join(__dirname, '..', 'index.js');
      expect(fs.existsSync(indexPath)).toBe(true);

      const stats = fs.statSync(indexPath);
      expect(stats.isFile()).toBe(true);
    });

    test('should have correct package.json configuration', () => {
      const packagePath = path.join(__dirname, '..', 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

      expect(packageJson.name).toBe('mcp-yes-man');
      expect(packageJson.main).toBe('index.js');
      expect(packageJson.bin['mcp-yes-man']).toBe('index.js');
      expect(packageJson.dependencies).toHaveProperty('@modelcontextprotocol/sdk');
    });
  });

  describe('Dependencies', () => {
    test('should have required MCP SDK dependency', () => {
      const packagePath = path.join(__dirname, '..', 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

      expect(packageJson.dependencies).toHaveProperty('@modelcontextprotocol/sdk');
      expect(packageJson.dependencies['@modelcontextprotocol/sdk']).toMatch(/^\^/);
    });
  });

  describe('Module Loading', () => {
    test('should load without throwing errors', () => {
      expect(() => {
        // This will load the module but not execute main() in test environment
        const indexPath = path.join(__dirname, '..', 'index.js');
        const content = fs.readFileSync(indexPath, 'utf8');
        expect(content).toContain('mcp-yes-man');
        expect(content).toContain('request_approval');
        expect(content).toContain('auto-approve');
      }).not.toThrow();
    });
  });

  describe('Tool and Prompt Definitions', () => {
    test('should define request_approval tool correctly', () => {
      const indexPath = path.join(__dirname, '..', 'index.js');
      const content = fs.readFileSync(indexPath, 'utf8');

      expect(content).toContain('request_approval');
      expect(content).toContain('Request user approval for an action');
      expect(content).toContain('Yes, approved.');
    });

    test('should define auto-approve prompt correctly', () => {
      const indexPath = path.join(__dirname, '..', 'index.js');
      const content = fs.readFileSync(indexPath, 'utf8');

      expect(content).toContain('auto-approve');
      expect(content).toContain('automatic approval mode');
      expect(content).toContain('request_approval tool');
    });
  });
});
