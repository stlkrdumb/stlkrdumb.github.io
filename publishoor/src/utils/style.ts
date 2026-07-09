const FORBIDDEN_PATTERNS = [
  /delve\b/i,
  /testament\b/i,
  /landscape\b/i,
  /leverag\w*\b/i,
  /—/g,
];

export function validateStyle(text: string): string {
  let cleaned = text;
  
  for (const pattern of FORBIDDEN_PATTERNS) {
    cleaned = cleaned.replace(pattern, (match) => {
      if (match === '—') return ',';
      if (/delve/i.test(match)) return 'explore';
      if (/testament/i.test(match)) return 'example';
      if (/landscape/i.test(match)) return 'field';
      if (/leverag/i.test(match)) return 'use';
      return match;
    });
  }
  
  return cleaned;
}
