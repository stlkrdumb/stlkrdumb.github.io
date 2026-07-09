import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdirSync, rmSync } from 'fs';
import { join } from 'path';
import { ContentService } from '../src/services/content.service';

describe('ContentService', () => {
  let service: ContentService;
  const testDir = join(process.cwd(), 'test-content');
  
  beforeEach(() => {
    service = new ContentService(testDir);
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
