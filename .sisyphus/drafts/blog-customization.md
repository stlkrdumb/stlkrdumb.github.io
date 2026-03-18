# Draft: Astro Blog Customization

## Requirements (confirmed)
- [Project]: Astro blog starter (`stlkrdumb.github.io`)
- [Stack]: Astro v6, Tailwind CSS v4, MDX
- [Priority]: Custom Branding (colors, fonts, spacing)
- [Features]: Search (Pagefind), Tags & Categories, Table of Contents (ToC)
- [Test Strategy]: Safe Build (Tests-after)

## Technical Decisions
- [Search]: Pagefind. 
    - Integration: Add `data-pagefind-body` to the main content area in `BlogPost.astro`.
    - Build script: Update `package.json` to run `pagefind` after `astro build`.
    - UI: Create a custom Search component in `src/components/Search.astro`.
- [ToC]: Use `Astro.props.headings` (available in `BlogPost.astro`) to generate a sticky Table of Contents.
- [Organization]: 
    - Schema: Add `tags` (array of strings) and `category` (string, optional) to `blog` collection in `content.config.ts`.
    - Pages: Add `src/pages/tags/[tag].astro` and `src/pages/tags/index.astro`.
- [Styling]: Tailwind CSS (v4)
    - Fonts: User to confirm preference (default suggestions: Outfit/Inter or Bricolage Grotesque/Geist).
    - Colors: User to confirm preference (monochrome + accent or earthy tones).

## Research Findings
- [Styling]: Theme colors are currently hardcoded (black/white) in `global.css`.
- [Typography]: Defaulting to 'Inter'.
- [Layout]: Simple header/main/footer structure.

## Open Questions
- What is the primary goal of the customization? (Design overhaul, new features, content migration?)
- Should the existing sample content be kept, modified, or removed?
- Is there a specific design or theme in mind?
- Do you want to set up automated testing (TDD)?

## Scope Boundaries
- INCLUDE: TBD
- EXCLUDE: TBD
