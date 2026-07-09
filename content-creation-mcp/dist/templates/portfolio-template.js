import { slugify } from '../utils/slug.js';
import { validateStyle } from '../utils/style.js';
export function generatePortfolioProject(data) {
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
