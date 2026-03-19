import { generateOgImage } from '../utils/og-image';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET() {
  const pngBuffer = await generateOgImage({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: 'page',
  });
  
  return new Response(pngBuffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}