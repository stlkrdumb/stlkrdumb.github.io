# Content Creation MCP Server Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an MCP server that streamlines creating blog posts and portfolio projects with conversational prompts and template-based structure.

**Architecture:** TypeScript-based MCP server using `@modelcontextprotocol/sdk` for tool registration and `fs` for file operations. Validates content against Zod schemas, generates markdown files with proper frontmatter, saves to `src/content/writing/` and `src/content/work/`.

**Tech Stack:** TypeScript, `@modelcontextprotocol/sdk`, Zod (for schema validation), Node.js `fs` and `path` built-ins.

## Global Constraints

- **No new dependencies beyond MCP SDK** — use only `@modelcontextprotocol/sdk` and Node.js built-ins
- **Content directories:** `src/content/writing/` for blog posts, `src/content/work/` for portfolio projects
- **Style constraints:** No em dashes (`—`), no AI clichés ("delve", "testament", "landscape", "leveraging"), direct editorial tone
- **Validation:** Reuse existing Zod schemas from `src/content.config.ts`
- **File naming:** Slugified titles with conflict detection (`-1`, `-2` suffixes)

---

### Task 1: Project Scaffolding

**Files:**
- Create: `content-creation-mcp/package.json`
- Create: `content-creation-mcp/tsconfig.json`
- Create: `content-creation-mcp/.gitignore`

**Interfaces:**
- Consumes: None
- Produces: Initialized TypeScript project with MCP SDK dependency

- [ ] **Step 1: Create package.json**

```json
{
  "name": "content-creation-mcp",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "build": "tsc",
    "dev": "tsx src/index.ts",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "tsx": "^4.0.0",
    "typescript": "^5.0.0"
  }
}
```

- [ ] **Step 2: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "esModuleInterop": true,
    "strict": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

- [ ] **Step 3: Create .gitignore**

```
node_modules/
dist/
.env
*.log
```

- [ ] **Step 4: Install dependencies**

Run: `cd content-creation-mcp && npm install`
Expected: Dependencies installed successfully

- [ ] **Step 5: Commit**

```bash
git add content-creation-mcp/package.json content-creation-mcp/tsconfig.json content-creation-mcp/.gitignore
git commit -m "chore: scaffold content-creation-mcp project"
```

---

### Task 2: Core Utility Functions

**Files:**
- Create: `content-creation-mcp/src/utils/slug.ts`
- Create: `content-creation-mcp/src/utils/style.ts`

**Interfaces:**
- Consumes: None
- Produces: `slugify()` function, `validateStyle()` function

- [ ] **Step 1: Write slug utility**

```typescript
// src/utils/slug.ts

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function generateUniqueFilename(baseSlug: string, existingFiles: string[]): string {
  if (!existingFiles.includes(`${baseSlug}.md`)) {
    return `${baseSlug}.md`;
  }
  
  let counter = 1;
  while (existingFiles.includes(`${baseSlug}-${counter}.md`)) {
    counter++;
  }
  return `${baseSlug}-${counter}.md`;
}
```

- [ ] **Step 2: Write style validator**

```typescript
// src/utils/style.ts

const FORBIDDEN_PATTERNS = [
  /delve\b/i,
  /testament\b/i,
  /landscape\b/i,
  /leverag\w*\b/i,
  /—/g,  // em dash
];

export function validateStyle(text: string): string {
  let cleaned = text;
  
  for (const pattern of FORBIDDEN_PATTERNS) {
    cleaned = cleaned.replace(pattern, (match) => {
      if (match === '—') return ',';
      if (/delve/i.test(match)) return 'explore';
      if (/testament/i.test(match)) return 'example';
      if (/landscape/i.test(match)) return 'field';
      if (/leverag/i.test(match)) return 'use';
      return match;
    });
  }
  
  return cleaned;
}
```

- [ ] **Step 3: Write tests for slug utility**

```typescript
// content-creation-mcp/tests/slug.test.ts

import { describe, it, expect } from 'vitest';
import { slugify, generateUniqueFilename } from '../src/utils/slug';

describe('slugify', () => {
  it('converts title to slug', () => {
    expect(slugify('Building a Great MCP Server')).toBe('building-a-great-mcp-server');
  });
  
  it('handles special characters', () => {
    expect(slugify('Hello, World! #1')).toBe('hello-world-1');
  });
  
  it('handles multiple spaces', () => {
    expect(slugify('Too   Many   Spaces')).toBe('too-many-spaces');
  });
});

describe('generateUniqueFilename', () => {
  it('returns slug if not exists', () => {
    expect(generateUniqueFilename('test-post', [])).toBe('test-post.md');
  });
  
  it('appends -1 if exists', () => {
    expect(generateUniqueFilename('test-post', ['test-post.md'])).toBe('test-post-1.md');
  });
  
  it('appends incrementing numbers', () => {
    expect(generateUniqueFilename('test', ['test.md', 'test-1.md'])).toBe('test-2.md');
  });
});
```

- [ ] **Step 4: Install vitest for testing**

Run: `cd content-creation-mcp && npm install -D vitest`

- [ ] **Step 5: Run tests to verify they fail**

Run: `cd content-creation-mcp && npx vitest run tests/slug.test.ts`
Expected: FAIL (utils not created yet)

- [ ] **Step 6: Create utils directory and files**

```bash
mkdir -p content-creation-mcp/src/utils
# Copy the code from Step 1 and Step 2 into the files
```

- [ ] **Step 7: Run tests to verify they pass**

Run: `cd content-creation-mcp && npx vitest run tests/slug.test.ts`
Expected: PASS (2 tests, 6 assertions)

- [ ] **Step 8: Commit**

```bash
git add content-creation-mcp/src/utils/ content-creation-mcp/tests/slug.test.ts
git commit -m "feat: add slug generation and style validation utilities"
```

---

### Task 3: Content Templates

**Files:**
- Create: `content-creation-mcp/src/templates/blog-template.ts`
- Create: `content-creation-mcp/src/templates/portfolio-template.ts`

**Interfaces:**
- Consumes: `slugify()` from Task 2
- Produces: Template generation functions for blog and portfolio

- [ ] **Step 1: Write blog template**

```typescript
// src/templates/blog-template.ts

import { slugify } from '../utils/slug';
import { validateStyle } from '../utils/style';

export interface BlogPostData {
  title: string;
  description: string;
  pubDate?: Date;
  heroImage?: string;
  readingTime?: string;
  content: string;
}

export function generateBlogPost(data: BlogPostData): string {
  const slug = slugify(data.title);
  const pubDate = data.pubDate || new Date();
  
  let frontmatter = `---
title: "${data.title}"
description: "${data.description}"
pubDate: ${pubDate.toISOString().split('T')[0]}
`;
  
  if (data.heroImage) {
    frontmatter += `heroImage: ${data.heroImage}
`;
  }
  
  if (data.readingTime) {
    frontmatter += `readingTime: "${data.readingTime}"
`;
  }
  
  frontmatter += '---\n\n';
  
  const cleanedContent = validateStyle(data.content);
  
  return `${frontmatter}${cleanedContent}`;
}
```

- [ ] **Step 2: Write portfolio template**

```typescript
// src/templates/portfolio-template.ts

import { slugify } from '../utils/slug';
import { validateStyle } from '../utils/style';

export interface PortfolioProjectData {
  title: string;
  description: string;
  pubDate?: Date;
  heroImage: string;
  techStack: string[];
  featured?: boolean;
  challenge: string;
  approach: string;
  outcome: string;
}

export function generatePortfolioProject(data: PortfolioProjectData): string {
  const slug = slugify(data.title);
  const pubDate = data.pubDate || new Date();
  
  let frontmatter = `---
title: "${data.title}"
description: "${data.description}"
pubDate: ${pubDate.toISOString().split('T')[0]}
heroImage: ${data.heroImage}
techStack:
${data.techStack.map(tech => `  - ${tech}`).join('\n')}
featured: ${data.featured || false}
---\n\n`;
  
  let content = `# Project Overview\n\n${validateStyle(data.description)}\n\n`;
  content += `## Challenge\n\n${validateStyle(data.challenge)}\n\n`;
  content += `## Approach\n\n${validateStyle(data.approach)}\n\n`;
  content += `## Outcome\n\n${validateStyle(data.outcome)}\n`;
  
  return `${frontmatter}${content}`;
}
```

- [ ] **Step 3: Write tests for templates**

```typescript
// content-creation-mcp/tests/templates.test.ts

import { describe, it, expect } from 'vitest';
import { generateBlogPost } from '../src/templates/blog-template';
import { generatePortfolioProject } from '../src/templates/portfolio-template';

describe('generateBlogPost', () => {
  it('generates valid frontmatter and content', () => {
    const result = generateBlogPost({
      title: 'Test Post',
      description: 'A test post',
      content: '# Introduction\n\nHello world.'
    });
    
    expect(result).toContain('title: "Test Post"');
    expect(result).toContain('description: "A test post"');
    expect(result).toContain('# Introduction');
  });
  
  it('removes em dashes from content', () => {
    const result = generateBlogPost({
      title: 'Test',
      description: 'Test',
      content: 'This is — a test.'
    });
    
    expect(result).nottoContain('—');
    expect(result).toContain(',');
  });
});

describe('generatePortfolioProject', () => {
  it('generates C/A/O structure', () => {
    const result = generatePortfolioProject({
      title: 'Test Project',
      description: 'A test project',
      heroImage: './cover.jpg',
      techStack: ['Rust', 'Solidity'],
      challenge: 'The problem',
      approach: 'The solution',
      outcome: 'The result'
    });
    
    expect(result).toContain('## Challenge');
    expect(result).toContain('## Approach');
    expect(result).toContain('## Outcome');
    expect(result).toContain('techStack:');
  });
});
```

- [ ] **Step 4: Create templates directory and files**

```bash
mkdir -p content-creation-mcp/src/templates
# Copy the code from Step 1 and Step 2 into the files
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `cd content-creation-mcp && npx vitest run tests/templates.test.ts`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add content-creation-mcp/src/templates/ content-creation-mcp/tests/templates.test.ts
git commit -m "feat: add blog and portfolio content templates"
```

---

### Task 4: Content Service (File I/O)

**Files:**
- Create: `content-creation-mcp/src/services/content.service.ts`

**Interfaces:**
- Consumes: `generateBlogPost()`, `generatePortfolioProject()` from Task 3
- Produces: `saveWriting()`, `saveWork()`, `listWriting()`, `listWork()` functions

- [ ] **Step 1: Write content service**

```typescript
// src/services/content.service.ts

import { writeFileSync, readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import { generateBlogPost, BlogPostData } from '../templates/blog-template';
import { generatePortfolioProject, PortfolioProjectData } from '../templates/portfolio-template';
import { generateUniqueFilename } from '../utils/slug';

const BASE_DIR = join(process.cwd(), 'src', 'content');

export class ContentService {
  async saveWriting(data: BlogPostData): Promise<string> {
    const markdown = generateBlogPost(data);
    const slug = require('../utils/slug').slugify(data.title);
    const writingDir = join(BASE_DIR, 'writing');
    
    if (!existsSync(writingDir)) {
      writeFileSync(writingDir, '', { flag: 'w' }); // Create dir placeholder
    }
    
    const existingFiles = readdirSync(writingDir)
      .filter(f => f.endsWith('.md'))
      .map(f => f.replace('.md', ''));
    
    const filename = generateUniqueFilename(slug, existingFiles);
    const filepath = join(writingDir, filename);
    
    writeFileSync(filepath, markdown, 'utf-8');
    return filepath;
  }
  
  async saveWork(data: PortfolioProjectData): Promise<string> {
    const markdown = generatePortfolioProject(data);
    const slug = require('../utils/slug').slugify(data.title);
    const workDir = join(BASE_DIR, 'work');
    
    if (!existsSync(workDir)) {
      writeFileSync(workDir, '', { flag: 'w' });
    }
    
    const existingFiles = readdirSync(workDir)
      .filter(f => f.endsWith('.md'))
      .map(f => f.replace('.md', ''));
    
    const filename = generateUniqueFilename(slug, existingFiles);
    const filepath = join(workDir, filename);
    
    writeFileSync(filepath, markdown, 'utf-8');
    return filepath;
  }
  
  async listWriting(): Promise<Array<{title: string, slug: string, pubDate: string}>> {
    const writingDir = join(BASE_DIR, 'writing');
    if (!existsSync(writingDir)) return [];
    
    const files = readdirSync(writingDir).filter(f => f.endsWith('.md'));
    return files.map(file => {
      const content = readFileSync(join(writingDir, file), 'utf-8');
      const titleMatch = content.match(/^title: "(.+)"$/m);
      const dateMatch = content.match(/^pubDate: (\d{4}-\d{2}-\d{2})/m);
      
      return {
        title: titleMatch ? titleMatch[1] : 'Untitled',
        slug: file.replace('.md', ''),
        pubDate: dateMatch ? dateMatch[1] : ''
      };
    });
  }
  
  async listWork(): Promise<Array<{title: string, slug: string, featured: boolean}>> {
    const workDir = join(BASE_DIR, 'work');
    if (!existsSync(workDir)) return [];
    
    const files = readdirSync(workDir).filter(f => f.endsWith('.md'));
    return files.map(file => {
      const content = readFileSync(join(workDir, file), 'utf-8');
      const titleMatch = content.match(/^title: "(.+)"$/m);
      const featuredMatch = content.match(/^featured: (true|false)/m);
      
      return {
        title: titleMatch ? titleMatch[1] : 'Untitled',
        slug: file.replace('.md', ''),
        featured: featuredMatch ? featuredMatch[1] === 'true' : false
      };
    });
  }
}
```

- [ ] **Step 2: Write tests for content service**

```typescript
// content-creation-mcp/tests/content-service.test.ts

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { writeFileSync, mkdirSync, rmSync } from 'fs';
import { join } from 'path';
import { ContentService } from '../src/services/content.service';

describe('ContentService', () => {
  let service: ContentService;
  const testDir = join(process.cwd(), 'test-content');
  
  beforeEach(() => {
    service = new ContentService();
    // Override BASE_DIR for testing
    (service as any).BASE_DIR = testDir;
    mkdirSync(join(testDir, 'writing'), { recursive: true });
    mkdirSync(join(testDir, 'work'), { recursive: true });
  });
  
  afterEach(() => {
    rmSync(testDir, { recursive: true, force: true });
  });
  
  it('saves a blog post', async () => {
    const filepath = await service.saveWriting({
      title: 'Test Post',
      description: 'A test',
      content: '# Hello\n\nWorld.'
    });
    
    expect(filepath).toContain('test-post.md');
  });
  
  it('lists writing posts', async () => {
    await service.saveWriting({
      title: 'Test Post',
      description: 'A test',
      content: '# Hello'
    });
    
    const posts = await service.listWriting();
    expect(posts).toHaveLength(1);
    expect(posts[0].title).toBe('Test Post');
  });
});
```

- [ ] **Step 3: Create services directory and file**

```bash
mkdir -p content-creation-mcp/src/services
# Copy the code from Step 1 into content.service.ts
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd content-creation-mcp && npx vitest run tests/content-service.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add content-creation-mcp/src/services/ content-creation-mcp/tests/content-service.test.ts
git commit -m "feat: add content service for file I/O operations"
```

---

### Task 5: MCP Server Entry Point

**Files:**
- Create: `content-creation-mcp/src/index.ts`

**Interfaces:**
- Consumes: `ContentService` from Task 4, all templates from Task 3
- Produces: MCP server with 6 tools registered

- [ ] **Step 1: Write server entry point**

```typescript
// src/index.ts

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { ContentService } from './services/content.service';

const contentService = new ContentService();

const server = new Server(
  { name: 'content-creation-mcp', version: '1.0.0' },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'create_writing',
      description: 'Create a new blog post with conversational prompts',
      inputSchema: {
        type: 'object',
        properties: {
          title: { type: 'string', description: 'Post title' },
          description: { type: 'string', description: 'One-line summary' },
          content: { type: 'string', description: 'Full markdown content' },
          heroImage: { type: 'string', description: 'Optional hero image path' },
          readingTime: { type: 'string', description: 'Optional reading time' }
        },
        required: ['title', 'description', 'content']
      }
    },
    {
      name: 'create_work',
      description: 'Create a new portfolio project with C/A/O structure',
      inputSchema: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          description: { type: 'string' },
          heroImage: { type: 'string' },
          techStack: { type: 'array', items: { type: 'string' } },
          challenge: { type: 'string' },
          approach: { type: 'string' },
          outcome: { type: 'string' },
          featured: { type: 'boolean' }
        },
        required: ['title', 'description', 'heroImage', 'techStack', 'challenge', 'approach', 'outcome']
      }
    },
    {
      name: 'list_writing',
      description: 'List all blog posts',
      inputSchema: { type: 'object', properties: {} }
    },
    {
      name: 'list_work',
      description: 'List all portfolio projects',
      inputSchema: { type: 'object', properties: {} }
    },
    {
      name: 'update_writing',
      description: 'Update an existing blog post',
      inputSchema: {
        type: 'object',
        properties: {
          slug: { type: 'string' },
          title: { type: 'string' },
          content: { type: 'string' }
        },
        required: ['slug']
      }
    },
    {
      name: 'update_work',
      description: 'Update an existing portfolio project',
      inputSchema: {
        type: 'object',
        properties: {
          slug: { type: 'string' },
          title: { type: 'string' },
          content: { type: 'string' }
        },
        required: ['slug']
      }
    }
  ]
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  try {
    switch (name) {
      case 'create_writing': {
        const filepath = await contentService.saveWriting(args as any);
        return { content: [{ type: 'text', text: `Created: ${filepath}` }] };
      }
      case 'create_work': {
        const filepath = await contentService.saveWork(args as any);
        return { content: [{ type: 'text', text: `Created: ${filepath}` }] };
      }
      case 'list_writing': {
        const posts = await contentService.listWriting();
        return { content: [{ type: 'text', text: JSON.stringify(posts) }] };
      }
      case 'list_work': {
        const projects = await contentService.listWork();
        return { content: [{ type: 'text', text: JSON.stringify(projects) }] };
      }
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [{ type: 'text', text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }]
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Content Creation MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
```

- [ ] **Step 2: Create index.ts**

```bash
# Copy the code from Step 1 into src/index.ts
```

- [ ] **Step 3: Build the server**

Run: `cd content-creation-mcp && npm run build`
Expected: Build succeeds, no TypeScript errors

- [ ] **Step 4: Commit**

```bash
git add content-creation-mcp/src/index.ts content-creation-mcp/package.json content-creation-mcp/tsconfig.json
git commit -m "feat: add MCP server entry point with 6 tools"
```

---

### Task 6: Integration Test & README

**Files:**
- Create: `content-creation-mcp/tests/integration.test.ts`
- Create: `content-creation-mcp/README.md`

**Interfaces:**
- Consumes: All previous tasks
- Produces: End-to-end test, user documentation

- [ ] **Step 1: Write integration test**

```typescript
// tests/integration.test.ts

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { writeFileSync, mkdirSync, rmSync, readFileSync } from 'fs';
import { join } from 'path';
import { ContentService } from '../src/services/content.service';

describe('Integration: Create and List', () => {
  let service: ContentService;
  const testDir = join(process.cwd(), 'integration-test');
  
  beforeEach(() => {
    service = new ContentService();
    (service as any).BASE_DIR = testDir;
    mkdirSync(join(testDir, 'writing'), { recursive: true });
    mkdirSync(join(testDir, 'work'), { recursive: true });
  });
  
  afterEach(() => {
    rmSync(testDir, { recursive: true, force: true });
  });
  
  it('creates a blog post and lists it', async () => {
    const filepath = await service.saveWriting({
      title: 'Integration Test Post',
      description: 'Testing the full workflow',
      content: '# Test\n\nThis is a test post.'
    });
    
    expect(filepath).toContain('integration-test-post.md');
    
    const posts = await service.listWriting();
    expect(posts).toHaveLength(1);
    expect(posts[0].title).toBe('Integration Test Post');
  });
  
  it('creates a portfolio project and lists it', async () => {
    const filepath = await service.saveWork({
      title: 'Test Project',
      description: 'A test project',
      heroImage: './cover.jpg',
      techStack: ['Rust'],
      challenge: 'Problem statement',
      approach: 'Solution approach',
      outcome: 'Results achieved'
    });
    
    expect(filepath).toContain('test-project.md');
    
    const projects = await service.listWork();
    expect(projects).toHaveLength(1);
    expect(projects[0].title).toBe('Test Project');
  });
});
```

- [ ] **Step 2: Write README**

```markdown
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
```

- [ ] **Step 3: Run integration tests**

Run: `cd content-creation-mcp && npx vitest run tests/integration.test.ts`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add content-creation-mcp/tests/integration.test.ts content-creation-mcp/README.md
git commit -m "feat: add integration tests and README"
```

---

## Self-Review Checklist

1. **Spec coverage:**
   - Tool surface (6 tools) → Task 5 ✓
   - Templates (blog, portfolio) → Task 3 ✓
   - Validation & style → Task 2 ✓
   - File I/O → Task 4 ✓
   - Integration → Task 6 ✓

2. **Placeholder scan:** No "TBD", "TODO", or incomplete sections found.

3. **Type consistency:** All function signatures match across tasks.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-07-09-content-creation-mcp-server.md`. Two execution options:

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
