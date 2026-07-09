import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { getCollection } from 'astro:content';
import { SITE_AUTHOR } from '../consts';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const interRegular = await readFile(path.join(process.cwd(), 'public/fonts/Inter-Regular.ttf'));
const spectralRegular = await readFile(path.join(process.cwd(), 'public/fonts/Spectral-Regular.ttf'));

interface Props {
  title: string;
  description?: string;
  type?: 'blog' | 'page';
}

function wrapLines(text: string, maxChars: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    if ((line + ' ' + word).trim().length > maxChars && line.trim()) {
      lines.push(line.trim());
      line = word;
    } else {
      line = (line + ' ' + word).trim();
    }
  }
  if (line.trim()) lines.push(line.trim());
  return lines;
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export async function generateOgImage({ title, description = '', type = 'page' }: Props) {
  const t = String(title || '').trim();
  const d = String(description || '').trim();
  
  let displayTitle = t.length > 85 ? t.slice(0, 82) + '\u2026' : t;
  let descriptionText = d.length > 140 ? d.slice(0, 137) + '\u2026' : d;

  const titleLines = wrapLines(displayTitle, 22);
  const descLines = descriptionText.length > 0 ? wrapLines(descriptionText, 36) : [];

  // Build HTML — text elements are wrapped in divs with explicit width:100% so Satori renders them edge-to-edge
  let html = `
    <div style="width:1200px;height:630px;display:flex;flex-direction:column;padding:48px;background-color:#141210;font-family:Inter,sans-serif;">
      <!-- Top bar -->
      <div style="display:flex;width:100%;justify-content:space-between;margin-bottom:auto;">
        <span style="font-size:14px;color:#d4a017;letter-spacing:0.2em;text-transform:uppercase;font-weight:600;">BYRAI</span>
        ${type === 'blog' ? '<span style="font-size:13px;color:#4a4742;letter-spacing:0.1em;text-transform:uppercase;">Blog Post</span>' : ''}
      </div>

      <!-- Title — wrapped in a 100% width div -->
      <div style="width:100%;margin-top:60px;margin-bottom:28px;">
        ${titleLines.map(l => `<div style="font-family:Spectral,serif;font-size:52px;font-weight:500;color:#f0ece4;line-height:1.15;letter-spacing:-0.015em;text-align:left;">${escapeHtml(l)}</div>`).join('')}
      </div>

      <!-- Description — also 100% width -->
      ${descLines.length > 0 ? `
        <div style="width:100%;margin-bottom:40px;">
          <div style="width:80%;height:1px;background:rgba(255,255,255,0.07);margin-bottom:32px;"></div>
          ${descLines.map(l => `<div style="font-size:26px;color:#7a7670;line-height:1.6;margin-bottom:8px;">${escapeHtml(l)}</div>`).join('')}
        </div>` : ''}

      <!-- Footer -->
      <div style="display:flex;width:100%;justify-content:space-between;align-items:center;margin-top:auto;padding-top:28px;border-top:1px solid rgba(255,255,255,0.06);">
        <span style="font-size:14px;color:#5a5752;letter-spacing:0.06em;">${escapeHtml(SITE_AUTHOR || '')}</span>
        ${type === 'blog' ? '<span style="font-size:14px;color:#d4a017;letter-spacing:0.12em;">Blog</span>' : ''}
      </div>
    </div>`;

  const svg = await satori(html, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Inter', data: interRegular, style: 'normal' as const, weight: 400 },
      { name: 'Spectral', data: spectralRegular, style: 'normal' as const, weight: 500 },
    ],
  });

  const resvg = new Resvg(svg, { fitTo: { type: 'width', value: 1200 } });
  return resvg.render();
}

export async function getStaticPaths() {
  const blogPosts = await getCollection('writing');
  
  return [
    { params: { slug: '__default' } as any, props: { title: 'byrai', description: 'Writing at the intersection of code & thought.', type: 'page' as const } },
    ...blogPosts.map((post) => ({
      params: { slug: post.id } as any,
      props: { title: post.data.title, description: post.data.description, type: 'blog' as const },
    })),
  ];
}
