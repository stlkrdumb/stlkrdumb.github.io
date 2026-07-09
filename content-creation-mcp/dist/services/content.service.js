import { writeFileSync, readFileSync, readdirSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { generateBlogPost } from '../templates/blog-template';
import { generatePortfolioProject } from '../templates/portfolio-template';
import { slugify, generateUniqueFilename } from '../utils/slug';
export class ContentService {
    basePath;
    constructor(basePath) {
        this.basePath = basePath || join(process.cwd(), 'src', 'content');
    }
    async saveWriting(data) {
        const markdown = generateBlogPost(data);
        const slug = slugify(data.title);
        const writingDir = join(this.basePath, 'writing');
        if (!existsSync(writingDir)) {
            mkdirSync(writingDir, { recursive: true });
        }
        const existingFiles = readdirSync(writingDir)
            .filter(f => f.endsWith('.md'))
            .map(f => f.replace('.md', ''));
        const filename = generateUniqueFilename(slug, existingFiles);
        const filepath = join(writingDir, filename);
        writeFileSync(filepath, markdown, 'utf-8');
        return filepath;
    }
    async saveWork(data) {
        const markdown = generatePortfolioProject(data);
        const slug = slugify(data.title);
        const workDir = join(this.basePath, 'work');
        if (!existsSync(workDir)) {
            mkdirSync(workDir, { recursive: true });
        }
        const existingFiles = readdirSync(workDir)
            .filter(f => f.endsWith('.md'))
            .map(f => f.replace('.md', ''));
        const filename = generateUniqueFilename(slug, existingFiles);
        const filepath = join(workDir, filename);
        writeFileSync(filepath, markdown, 'utf-8');
        return filepath;
    }
    async listWriting() {
        const writingDir = join(this.basePath, 'writing');
        if (!existsSync(writingDir))
            return [];
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
    async listWork() {
        const workDir = join(this.basePath, 'work');
        if (!existsSync(workDir))
            return [];
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
