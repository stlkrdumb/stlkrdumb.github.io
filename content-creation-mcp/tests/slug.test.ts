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
