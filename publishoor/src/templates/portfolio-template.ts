import { slugify } from '../utils/slug.js';
import { validateStyle } from '../utils/style.js';

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
