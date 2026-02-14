# Projects

This directory contains individual project pages that showcase detailed information about each VHS cassette project featured on the homepage.

## Structure

Each project is accessible via `/projects/{slug}` where the slug corresponds to the project identifier:

- `/projects/home-renovation` - Home renovation project
- `/projects/digital-projects` - Digital projects and web development
- `/projects/my-mind-and-me` - ADHD journey and personal growth

## Project Page Layout

Each project page includes the following sections:

### 1. Hero/Title Section
- Breadcrumb navigation
- Project category badge
- Main title and tagline
- Featured VHS card design
- Project metadata (duration, status)

### 2. The Story (Explanation)
- Overview paragraphs explaining the project
- Goals - what the project aims to achieve
- Challenges - obstacles and difficulties faced

### 3. Breakdown & Implementation
- Detailed phases of the project
- Each phase includes:
  - Title and completion status
  - Time period
  - Description
  - Key activities list
  - Photo gallery (optional)

### 4. Timeline & Stats
- Statistical highlights (key metrics)
- Chronological timeline with milestones
- Tools and technologies used

## Adding a New Project

To add a new project:

1. Add the project data to the `getProjectData()` function in `@slug/+Page.tsx`
2. Follow the `ProjectData` interface structure
3. Add a corresponding VHS tape link on the homepage index
4. Ensure the slug in the URL matches the key in the projects object

## Data Structure

```typescript
interface ProjectData {
  title: string;
  tagline: string;
  category: string;
  badgeVariant: "orange" | "teal" | "purple" | "pink";
  duration: string;
  status: string;
  accentColor: "orange" | "teal" | "purple" | "pink";
  vhsBrand: string;
  vhsModel: string;
  vhsFormat: string;
  vhsFooterTitle: string;
  vhsFooterSubtitle: string;
  vhsGradient: { top: string; middle: string; bottom: string };
  overview: string[];
  goals: string[];
  challenges: string[];
  phases: Phase[];
  stats: Stat[];
  timeline: TimelineEvent[];
  tools?: string[];
}
```

## Future Improvements

Consider moving project data to:
- Markdown files with frontmatter
- A headless CMS (Contentful, Sanity, etc.)
- A JSON file for easier management
- A database for dynamic content
