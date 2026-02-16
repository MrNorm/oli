import type { PageContext } from 'vike/types';
import { fetchMegabyteById } from '@/lib/cms-helpers';

export type Data = Awaited<ReturnType<typeof data>>;

// Mock data for testing
const mockMegabyte = {
  id: 1,
  title: "Building Retro Component Libraries",
  date: "2026-02-12",
  excerpt: "Design patterns for scalable UI systems that grow with your application.",
  featuredImage: {
    url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1920&h=1080&fit=crop",
    alt: "Code on a computer screen"
  },
  tags: ["React", "TypeScript", "Design Systems", "UI/UX"],
  content: {
    root: {
      type: "root",
      children: [
        {
          type: "heading",
          tag: "h2",
          children: [{ type: "text", text: "Introduction" }]
        },
        {
          type: "paragraph",
          children: [
            { 
              type: "text", 
              text: "Creating a component library isn't just about building reusable pieces—it's about establishing a design system that can evolve with your needs while maintaining consistency and accessibility." 
            }
          ]
        },
        {
          type: "heading",
          tag: "h2",
          children: [{ type: "text", text: "Core Principles" }]
        },
        {
          type: "heading",
          tag: "h3",
          children: [{ type: "text", text: "1. Composition Over Configuration" }]
        },
        {
          type: "paragraph",
          children: [
            { 
              type: "text", 
              text: "Build small, focused components that can be combined rather than large components with tons of props." 
            }
          ]
        },
        {
          type: "paragraph",
          children: [
            { type: "text", text: "Good example:" }
          ]
        },
        {
          type: "paragraph",
          children: [
            { type: "text", text: "<Card>", code: true },
            { type: "text", text: " components allow for flexible composition and easy customization. Each piece has a single responsibility and can be mixed and matched." }
          ]
        },
        {
          type: "heading",
          tag: "h3",
          children: [{ type: "text", text: "2. Accessibility First" }]
        },
        {
          type: "paragraph",
          children: [
            { 
              type: "text", 
              text: "Every component should be accessible by default. Use semantic HTML and ARIA attributes properly. This includes:" 
            }
          ]
        },
        {
          type: "list",
          listType: "bullet",
          children: [
            {
              type: "listitem",
              children: [
                {
                  type: "paragraph",
                  children: [{ type: "text", text: "Proper keyboard navigation" }]
                }
              ]
            },
            {
              type: "listitem",
              children: [
                {
                  type: "paragraph",
                  children: [{ type: "text", text: "Screen reader support" }]
                }
              ]
            },
            {
              type: "listitem",
              children: [
                {
                  type: "paragraph",
                  children: [{ type: "text", text: "Focus management" }]
                }
              ]
            },
            {
              type: "listitem",
              children: [
                {
                  type: "paragraph",
                  children: [{ type: "text", text: "Color contrast ratios" }]
                }
              ]
            }
          ]
        },
        {
          type: "heading",
          tag: "h3",
          children: [{ type: "text", text: "3. Style Flexibility" }]
        },
        {
          type: "paragraph",
          children: [
            { 
              type: "text", 
              text: "Allow consumers to extend and customize without fighting the system. Use CSS variables, utility classes, or styled components." 
            }
          ]
        },
        {
          type: "heading",
          tag: "h2",
          children: [{ type: "text", text: "Building a Button Component" }]
        },
        {
          type: "paragraph",
          children: [
            { type: "text", text: "Let's walk through creating a retro-styled button. The key is to provide a solid foundation while allowing flexibility:" }
          ]
        },
        {
          type: "list",
          listType: "number",
          children: [
            {
              type: "listitem",
              children: [
                {
                  type: "paragraph",
                  children: [{ type: "text", text: "Define clear prop interfaces", bold: true }]
                }
              ]
            },
            {
              type: "listitem",
              children: [
                {
                  type: "paragraph",
                  children: [{ type: "text", text: "Provide sensible defaults", bold: true }]
                }
              ]
            },
            {
              type: "listitem",
              children: [
                {
                  type: "paragraph",
                  children: [{ type: "text", text: "Allow style overrides", bold: true }]
                }
              ]
            },
            {
              type: "listitem",
              children: [
                {
                  type: "paragraph",
                  children: [{ type: "text", text: "Include proper TypeScript types", bold: true }]
                }
              ]
            }
          ]
        },
        {
          type: "quote",
          children: [
            {
              type: "paragraph",
              children: [
                { 
                  type: "text", 
                  text: "Good design is as little design as possible. The same applies to component APIs—keep them simple and predictable.",
                  italic: true
                }
              ]
            }
          ]
        },
        {
          type: "heading",
          tag: "h2",
          children: [{ type: "text", text: "Documentation Matters" }]
        },
        {
          type: "paragraph",
          children: [
            { 
              type: "text", 
              text: "Good documentation is the difference between a library that gets used and one that gets ignored. Your documentation should include:" 
            }
          ]
        },
        {
          type: "list",
          listType: "bullet",
          children: [
            {
              type: "listitem",
              children: [
                {
                  type: "paragraph",
                  children: [{ type: "text", text: "Live examples with code snippets" }]
                }
              ]
            },
            {
              type: "listitem",
              children: [
                {
                  type: "paragraph",
                  children: [{ type: "text", text: "Props API reference" }]
                }
              ]
            },
            {
              type: "listitem",
              children: [
                {
                  type: "paragraph",
                  children: [{ type: "text", text: "Common use cases and patterns" }]
                }
              ]
            },
            {
              type: "listitem",
              children: [
                {
                  type: "paragraph",
                  children: [{ type: "text", text: "Accessibility notes and guidelines" }]
                }
              ]
            },
            {
              type: "listitem",
              children: [
                {
                  type: "paragraph",
                  children: [{ type: "text", text: "Migration guides when making breaking changes" }]
                }
              ]
            }
          ]
        },
        {
          type: "heading",
          tag: "h2",
          children: [{ type: "text", text: "Testing Strategy" }]
        },
        {
          type: "paragraph",
          children: [
            { type: "text", text: "A robust component library needs comprehensive testing:" }
          ]
        },
        {
          type: "heading",
          tag: "h3",
          children: [{ type: "text", text: "Unit Tests" }]
        },
        {
          type: "paragraph",
          children: [
            { type: "text", text: "Test individual components in isolation. Verify props, state changes, and event handlers work correctly." }
          ]
        },
        {
          type: "heading",
          tag: "h3",
          children: [{ type: "text", text: "Visual Regression Tests" }]
        },
        {
          type: "paragraph",
          children: [
            { type: "text", text: "Use tools like Chromatic or Percy to catch unintended visual changes. This is crucial for maintaining consistency." }
          ]
        },
        {
          type: "heading",
          tag: "h3",
          children: [{ type: "text", text: "Accessibility Tests" }]
        },
        {
          type: "paragraph",
          children: [
            { type: "text", text: "Automated tools like ", code: false },
            { type: "text", text: "axe-core", code: true },
            { type: "text", text: " or ", code: false },
            { type: "text", text: "jest-axe", code: true },
            { type: "text", text: " help catch common accessibility issues early.", code: false }
          ]
        },
        {
          type: "heading",
          tag: "h2",
          children: [{ type: "text", text: "Conclusion" }]
        },
        {
          type: "paragraph",
          children: [
            { 
              type: "text", 
              text: "Building a component library is an investment in your development workflow. Start small, iterate based on real needs, and always prioritize the developer experience. Remember that the best component libraries are those that get out of your way and let you focus on building great products." 
            }
          ]
        },
        {
          type: "paragraph",
          children: [
            { type: "text", text: "The key is to build with ", bold: false },
            { type: "text", text: "intention", bold: true, italic: true },
            { type: "text", text: ", document with ", bold: false },
            { type: "text", text: "clarity", bold: true, italic: true },
            { type: "text", text: ", and maintain with ", bold: false },
            { type: "text", text: "consistency", bold: true, italic: true },
            { type: "text", text: ".", bold: false }
          ]
        }
      ]
    }
  }
};

export async function data(pageContext: PageContext) {
  const id = parseInt(pageContext.routeParams.id, 10);
  
  if (isNaN(id)) {
    throw new Error('Invalid megabyte ID');
  }

  // For testing, return mock data
  // TODO: Replace with real data fetching when CMS is ready
  if (id === 1) {
    return {
      megabyte: mockMegabyte,
    };
  }

  // Try to fetch real data
  const megabyte = await fetchMegabyteById(id);

  if (!megabyte) {
    // If no real data found, you can still return mock for testing
    return {
      megabyte: mockMegabyte,
    };
  }

  // Debug: Log the content structure to see what we're getting
  console.log('Megabyte content structure:', JSON.stringify(megabyte.content, null, 2));

  return {
    megabyte,
  };
}
