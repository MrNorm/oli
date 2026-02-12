# Articles System

This directory contains the articles listing and detail pages with unique layouts for each content type.

## Article Types

### 1. Social Posts (Activity)
**Badge:** Teal  
**Layout Style:** Timeline/feed style with optional side images  
**Use for:** Quick updates, moments, short-form content

**Detail Page Features:**
- Compact layout optimized for quick reads
- Optional hero image
- Location metadata
- Simple paragraph formatting

### 2. How-To Guides
**Badge:** Orange  
**Layout Style:** Magazine-style with large cover images  
**Use for:** Tutorials, guides, technical content

**Detail Page Features:**
- Full-width hero image
- Table of contents sidebar (sticky)
- Code block formatting
- Tag system
- Reading time estimate

### 3. Musings (Editorials)
**Badge:** Purple  
**Layout Style:** Typography-focused, elegant  
**Use for:** Thought pieces, reflections, short essays

**Detail Page Features:**
- Centered, editorial layout
- Pull quote highlighting
- Drop cap on first paragraph
- Clean, readable typography
- Centered headings

### 4. Photos
**Badge:** Orange  
**Layout Style:** Visual-first with Polaroid aesthetic  
**Use for:** Photography, visual stories

**Detail Page Features:**
- Large square image (sticky on desktop)
- Camera/EXIF data display
- Two-column layout
- Metadata card with details

## File Structure

```
articles/
├── +Page.tsx              # Articles listing with 4 distinct sections
└── @slug/
    └── +Page.tsx          # Dynamic article detail page (renders based on type)
```

## Mock Data

Currently using mock data in both files. Replace `mockArticles` with real data fetching (CMS, markdown files, database, etc.)

## Adding New Articles

1. Add article data to the appropriate array in `/articles/+Page.tsx`
2. Add full article data to `mockArticles` in `/articles/@slug/+Page.tsx`
3. Ensure the `type` field matches one of: `"social" | "howto" | "musing" | "photo"`

## Future Enhancements

- [ ] Connect to real data source (CMS/Markdown/Database)
- [ ] Add pagination for large article lists
- [ ] Add search/filter functionality
- [ ] Add related articles section
- [ ] Add social sharing buttons
- [ ] Add comments system
- [ ] Add article series/collections
