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
