import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdirSync, rmSync, readdirSync } from 'fs';
import { join } from 'path';
import { ContentService } from '../src/services/content.service';

describe('Integration: Create and List', () => {
  let service: ContentService;
  const testDir = join(process.cwd(), 'integration-test');
  
  beforeEach(() => {
    // Clean up any existing test directory
    rmSync(testDir, { recursive: true, force: true });
    
    service = new ContentService(testDir);
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
