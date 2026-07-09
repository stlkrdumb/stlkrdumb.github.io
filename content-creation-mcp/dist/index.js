import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { ContentService } from './services/content.service';
const contentService = new ContentService();
const server = new Server({ name: 'content-creation-mcp', version: '1.0.0' }, { capabilities: { tools: {} } });
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
                const filepath = await contentService.saveWriting(args);
                return { content: [{ type: 'text', text: `Created: ${filepath}` }] };
            }
            case 'create_work': {
                const filepath = await contentService.saveWork(args);
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
    }
    catch (error) {
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
