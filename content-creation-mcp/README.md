# Content Creation MCP Server

MCP server for creating blog posts and portfolio projects with template-based structure.

## Tools

- `create_writing` — Create new blog post
- `create_work` — Create new portfolio project
- `list_writing` — List all blog posts
- `list_work` — List all portfolio projects
- `update_writing` — Update existing blog post
- `update_work` — Update existing portfolio project

## Style Constraints

- No em dashes (`—`)
- No AI clichés: "delve", "testament", "landscape", "leveraging"
- Direct, editorial tone

## Setup

```bash
npm install
npm run build
```

Configure in your MCP client:

```json
{
  "mcpServers": {
    "content-creation-mcp": {
      "command": "node",
      "args": ["dist/index.js"]
    }
  }
}
```

## Testing

```bash
npm test
```
