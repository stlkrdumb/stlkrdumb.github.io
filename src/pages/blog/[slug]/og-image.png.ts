import { generateOgImage } from '../../../utils/og-image';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const blogPosts = await getCollection('blog');
  
  return blogPosts.map((post) => ({
    params: { slug: post.id },
    props: {
      title: post.data.title,
      description: post.data.description,
      type: 'blog' as const,
    },
  }));
}

export async function GET({ props }: { props: { title: string; description: string; type: 'blog' | 'page' } }) {
  const pngBuffer = await generateOgImage(props);
  
  return new Response(pngBuffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}