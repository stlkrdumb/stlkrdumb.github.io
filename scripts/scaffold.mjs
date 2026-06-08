#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(__dirname, '../src/content');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ask = (query, defaultValue = '') => new Promise((resolve) => {
  rl.question(query, (answer) => {
    resolve(answer || defaultValue);
  });
});

async function scaffold() {
  console.log('\x1b[33m--- byrai Content Scaffold ---\x1b[0m');
  
  // Use command line argument if provided, otherwise prompt
  let type = process.argv[2];
  if (!type || (type !== 'blog' && type !== 'portfolio')) {
    type = await ask('Type (blog/portfolio): ');
  }
  
  if (type !== 'blog' && type !== 'portfolio') {
    console.error('Invalid type. Please enter "blog" or "portfolio".');
    process.exit(1);
  }

  const title = await ask(`Enter ${type} title: `);
  const description = await ask(`Enter ${type} description: `);
  const heroImage = await ask(`Enter hero image filename (e.g., cover.jpg): `, 'cover.jpg');
  
  let pubDate = new Date().toISOString().split('T')[0];
  
  let blogExtras = '';
  if (type === 'blog') {
    const readingTime = await ask('Enter reading time (e.g., ~5 min, press Enter to skip): ');
    blogExtras = `readingTime: "${readingTime || 'N/A'}"\n`;
  }

  let portfolioExtras = '';
  if (type === 'portfolio') {
    const stackInput = await ask('Enter tech stack (comma-separated, e.g., Rust, React, AWS): ');
    if (stackInput) {
      const techStack = stackInput.split(',').map(s => s.trim());
      portfolioExtras = `techStack: ${JSON.stringify(techStack)}\n`;
    }
  }

  const folder = type === 'blog' ? 'blog' : 'portfolio';
  const fileName = `${title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '')}.md`;
  const filePath = path.join(contentDir, folder, fileName);

  const frontmatter = `---
title: "${title}"
description: "${description}"
pubDate: ${pubDate}
heroImage: ./${heroImage}
${blogExtras}
${portfolioExtras}
---

# ${title}

Write your editorial content here.
`;

  if (fs.existsSync(filePath)) {
    console.error(`\x1b[31mError: File already exists at ${filePath}\x1b[0m`);
    process.exit(1);
  }

  fs.writeFileSync(filePath, frontmatter);
  console.log(`\n\x1b[32m✅ Successfully created ${type} at ${filePath}\x1b[0m`);
  rl.close();
}

scaffold();
