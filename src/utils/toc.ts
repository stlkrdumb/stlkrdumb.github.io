/**
 * Table of Contents utility for extracting headings from markdown content.
 * Generates heading slugs compatible with Astro's default heading ID generation.
 */

export interface Heading {
  /** Heading level (2 for h2, 3 for h3) */
  depth: number;
  /** URL-safe slug for the heading */
  slug: string;
  /** The heading text */
  text: string;
}

/**
 * Generates a URL-safe slug from heading text.
 * Matches Astro's default slug generation pattern.
 * @param text - The heading text
 * @returns A URL-safe slug
 */
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    // Remove special characters except hyphens and spaces
    .replace(/[^\w\s-]/g, '')
    // Replace spaces and underscores with hyphens
    .replace(/[\s_]+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, '');
}

/**
 * Extracts h2 and h3 headings from markdown content.
 * @param content - The markdown content to parse
 * @returns Array of Heading objects with depth, slug, and text
 */
export function extractHeadings(content: string): Heading[] {
  if (!content) {
    return [];
  }

  const headings: Heading[] = [];
  
  // Match markdown headings: ## Heading or ### Heading
  // Also match HTML headings: <h2>Heading</h2> or <h3>Heading</h3>
  const markdownHeadingRegex = /^(#{2,3})\s+(.+)$/gm;
  const htmlHeadingRegex = /<h([23])[^>]*>(.*?)<\/h\1>/gi;

  // Extract markdown headings
  let match;
  while ((match = markdownHeadingRegex.exec(content)) !== null) {
    const depth = match[1].length;
    const text = match[2].trim();
    const slug = generateSlug(text);
    
    headings.push({ depth, slug, text });
  }

  // Extract HTML headings (if any)
  while ((match = htmlHeadingRegex.exec(content)) !== null) {
    const depth = parseInt(match[1], 10);
    const text = match[2].trim();
    const slug = generateSlug(text);
    
    // Avoid duplicates if both markdown and HTML versions exist
    if (!headings.some(h => h.slug === slug)) {
      headings.push({ depth, slug, text });
    }
  }

  return headings;
}

/**
 * Groups headings into a hierarchical structure.
 * h2 headings become top-level, h3 headings are nested under the previous h2.
 * @param headings - Flat array of headings
 * @returns Nested structure with children for h3s
 */
export function groupHeadings(headings: Heading[]): Array<Heading & { children?: Heading[] }> {
  const result: Array<Heading & { children?: Heading[] }> = [];
  let currentH2: (Heading & { children?: Heading[] }) | null = null;

  for (const heading of headings) {
    if (heading.depth === 2) {
      currentH2 = { ...heading, children: [] };
      result.push(currentH2);
    } else if (heading.depth === 3 && currentH2) {
      currentH2.children!.push(heading);
    } else if (heading.depth === 3) {
      // h3 without preceding h2 - add as top level
      result.push({ ...heading });
    }
  }

  return result;
}