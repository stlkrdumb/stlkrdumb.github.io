/**
 * Calculate estimated reading time for text content.
 * Assumes an average reading speed of 200 words per minute.
 */

const WORDS_PER_MINUTE = 200;

/**
 * Extracts visible text from HTML/markdown content by removing markup.
 * @param content - The raw content string (may contain HTML/Markdown)
 * @returns Plain text without markup
 */
function stripMarkup(content: string): string {
  // Remove HTML tags
  let text = content.replace(/<[^>]*>/g, ' ');
  // Remove Markdown links [text](url)
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  // Remove Markdown images
  text = text.replace(/!\[([^\]]*)\]\([^)]+\)/g, '');
  // Remove Markdown headers
  text = text.replace(/^#{1,6}\s+/gm, '');
  // Remove code blocks
  text = text.replace(/```[\s\S]*?```/g, '');
  // Remove inline code
  text = text.replace(/`[^`]+`/g, '');
  // Remove extra whitespace
  text = text.replace(/\s+/g, ' ').trim();
  return text;
}

/**
 * Calculates the estimated reading time for a given content string.
 * @param content - The text content to calculate reading time for
 * @returns A formatted string like "5 min read" or "1 min read"
 */
export function getReadingTime(content: string): string {
  if (!content || content.trim().length === 0) {
    return '0 min read';
  }

  const plainText = stripMarkup(content);
  const wordCount = plainText.split(/\s+/).filter(word => word.length > 0).length;
  const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);

  return `${minutes} min read`;
}

/**
 * Calculates reading time and returns both the formatted string and raw minutes.
 * @param content - The text content to calculate reading time for
 * @returns An object with formatted string and raw minutes
 */
export function getReadingTimeDetails(content: string): { text: string; minutes: number } {
  if (!content || content.trim().length === 0) {
    return { text: '0 min read', minutes: 0 };
  }

  const plainText = stripMarkup(content);
  const wordCount = plainText.split(/\s+/).filter(word => word.length > 0).length;
  const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);

  return {
    text: `${minutes} min read`,
    minutes
  };
}