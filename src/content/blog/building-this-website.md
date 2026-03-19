---
title: 'Building This Personal Website: Behind the Scenes'
description: 'Exploring the tech stack and the journey of building this minimalist portfolio site with Astro.'
pubDate: 'Mar 19 2026'
heroImage: '../../assets/building-website-hero.jpg'
---

When I set out to build this personal website, my goal was simple: **speed, minimalism, and a great writing experience.** 

I wanted a place that wasn't just a portfolio but a laboratory—a space to share ideas and projects with zero friction. After exploring several options, I landed on **Astro**, and I haven't looked back since.

## The Tech Stack: Why Astro?

Astro is a modern web framework that pioneered the "Islands Architecture." It allows me to build a content-rich site while shipping zero JavaScript by default. For a blog and portfolio site, this is a game-changer.

![Lines of code on a screen](../../assets/building-website-content.jpg)

Here's what makes it perfect for this site:

- **Lighthouse Performance:** Out of the box, the site scores a perfect 100/100 on Lighthouse. No heavy bundles, just pure HTML/CSS.
- **SEO Ready:** With the `@astrojs/sitemap` and automatic canonical URL generation, SEO is a breeze.
- **Content Collections:** Managing blog posts and portfolio items as Markdown/MDX files is incredibly intuitive. Type-safe frontmatter ensures I never miss a field.

## Design Inspiration

The aesthetic of this site is heavily inspired by [Bear Blog](https://bearblog.dev/). I love the focus on typography and readability. To make it my own, I used **Tailwind CSS** for a "disciplined" styling approach—ensuring consistent spacing and a robust dark mode experience.

## Making It Personal: The Logo & Theme

You might have noticed the new logo in the header! We recently replaced the plain "stlkrdumb" text with a custom SVG logo. Since it's an SVG, we can do some cool tricks:

- **Dark Mode Support:** Using Tailwind's `dark:invert` class, the logo automatically flips from black to white based on your theme choice.
- **Favicon Integration:** The same logo mark is used as the `favicon.svg`, providing a cohesive brand across the browser tab and the page.

## What's Next?

This site is a living document. Moving forward, I'll be sharing:
- Tutorials on web3 development.
- Deep dives into React and modern CSS.
- Updates on my latest portfolio projects.

Building this site was just the first step. Now, it's time to create.

---

*Images provided by Unsplash.*
