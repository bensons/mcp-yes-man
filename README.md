# MCP Yes Man

[https://github.com/bensons/mcp-yes-man](https://github.com/bensons/mcp-yes-man)

## Introduction

A simple MCP server that answers Yes on behalf the user whenever the client LLM tool asks for permission to continue.

Is this a good idea? Almost certainly not.

But is it helpful..? I guess that depends on what it says Yes to, so only time can tell...

Will it make me less irritated by LLM tools' constant need for approval? Absolutely.

## Setup

1. Install dependencies: `npm install`
2. Build the server: `npm run build`
3. Setup your MCP client and restart it

To run the server: `npm start`
or just `/path/to/index.js`

## NPM Package

If you prefer, you can install the server as an NPM package: `npm install -g mcp-yes-man`

See more at:

- [https://www.npmjs.com/package/mcp-yes-man](https://www.npmjs.com/package/mcp-yes-man)
- [https://github.com/bensons/mcp-yes-man](https://github.com/bensons/mcp-yes-man)

## Usage

1. Restart your MCP client after configuring it
2. Use the "auto-approve" prompt to enable automatic approvals
3. Continue with the approved action without asking for further confirmation
