import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_AUTHOR } from '../consts';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const interRegular = await readFile(path.join(process.cwd(), 'public/fonts/Inter-Regular.ttf'));
const interSemiBold = await readFile(path.join(process.cwd(), 'public/fonts/Inter-SemiBold.ttf'));

interface Props {
  title: string;
  description?: string;
  type?: 'blog' | 'page';
}

export async function generateOgImage({ title, description = '', type = 'page' }: Props) {
  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#000000',
          padding: '80px',
          fontFamily: 'Inter, sans-serif',
        },
        children: [
          // Logo/Brand
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                marginBottom: '60px',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '48px',
                      fontWeight: '600',
                      color: '#ffffff',
                    },
                    children: SITE_TITLE,
                  },
                },
              ],
            },
          },
          // Title
          {
            type: 'div',
            props: {
              style: {
                fontSize: '64px',
                fontWeight: '600',
                color: '#ffffff',
                lineHeight: '1.2',
                marginBottom: '24px',
                maxWidth: '900px',
              },
              children: title.length > 60 ? title.slice(0, 57) + '...' : title,
            },
          },
          // Description
          description && {
            type: 'div',
            props: {
              style: {
                fontSize: '28px',
                color: '#a3a3a3',
                lineHeight: '1.4',
                maxWidth: '800px',
                marginBottom: 'auto',
              },
              children: description.length > 120 ? description.slice(0, 117) + '...' : description,
            },
          },
          // Footer
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 'auto',
                paddingTop: '40px',
                borderTop: '1px solid #262626',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '24px',
                      color: '#525252',
                    },
                    children: SITE_AUTHOR,
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '24px',
                      color: '#525252',
                      padding: '8px 24px',
                      border: '1px solid #262626',
                      borderRadius: '8px',
                    },
                    children: type === 'blog' ? 'Blog' : 'Portfolio',
                  },
                },
              ],
            },
          },
        ].filter(Boolean),
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: interRegular,
          style: 'normal',
          weight: 400,
        },
        {
          name: 'Inter',
          data: interSemiBold,
          style: 'normal',
          weight: 600,
        },
      ],
    }
  );

  const resvg = new Resvg(svg, {
    fitTo: {
      type: 'width',
      value: 1200,
    },
  });

  const pngData = resvg.render();
  return pngData.asPng();
}

// Static paths for build-time generation
export async function getStaticPaths() {
  const blogPosts = await getCollection('blog');
  
  return blogPosts.map((post) => ({
    params: { slug: post.id },
    props: {
      title: post.data.title,
      description: post.data.description,
      type: 'blog',
    },
  }));
}