#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const os = require('os');

function getAugmentCodeConfigPath() {
  const platform = os.platform();
  const homeDir = os.homedir();
  
  switch (platform) {
    case 'darwin': // macOS
      return path.join(homeDir, 'Library', 'Application Support', 'Augment', 'augment_code_config.json');
    case 'win32': // Windows
      return path.join(homeDir, 'AppData', 'Roaming', 'Augment', 'augment_code_config.json');
    case 'linux':
      return path.join(homeDir, '.config', 'augment', 'augment_code_config.json');
    default:
      throw new Error(`Unsupported platform: ${platform}`);
  }
}

function ensureConfigDir(configPath) {
  const configDir = path.dirname(configPath);
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
    console.log(`Created config directory: ${configDir}`);
  }
}

function main() {
  try {
    const configPath = getAugmentCodeConfigPath();
    console.log(`Augment Code config path: ${configPath}`);
    
    // Ensure config directory exists
    ensureConfigDir(configPath);
    
    // Read existing config or create empty one
    let config = {};
    if (fs.existsSync(configPath)) {
      const configContent = fs.readFileSync(configPath, 'utf8');
      config = JSON.parse(configContent);
      console.log('Found existing Augment Code configuration');
    } else {
      console.log('Creating new Augment Code configuration');
    }
    
    // Ensure mcpServers object exists
    if (!config.mcpServers) {
      config.mcpServers = {};
    }
    
    // Get the path to this server
    const serverPath = path.resolve(__dirname, 'index.js');
    
    // Add or update the mcp-yes-man server configuration
    config.mcpServers['mcp-yes-man'] = {
      command: 'node',
      args: [serverPath],
      env: {}
    };
    
    // Write the updated config
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log('\n✅ Successfully added mcp-yes-man to Augment Code configuration!');
    console.log('\nServer configuration:');
    console.log(`  Name: mcp-yes-man`);
    console.log(`  Command: node ${serverPath}`);
    console.log('\n📝 Next steps:');
    console.log('  1. Restart Augment Code app');
    console.log('  2. The mcp-yes-man server will be available');
    console.log('  3. Use the "auto-approve" prompt to enable automatic approvals');
    
  } catch (error) {
    console.error('❌ Error setting up Augment Code configuration:', error.message);
    process.exit(1);
  }
}

main();