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
    
    expect(result).not.toContain('—');
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
