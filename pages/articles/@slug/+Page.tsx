import { usePageContext } from "vike-react/usePageContext";
import {
  RetroCard,
  RetroBadge,
  RetroDivider,
} from "@/components/retro";

// Types
interface ArticleBase {
  id: number;
  title: string;
  date: string;
  slug: string;
  type: "social" | "howto" | "musing" | "photo";
}

interface SocialArticle extends ArticleBase {
  type: "social";
  content: string;
  image?: string;
  location?: string;
}

interface HowToArticle extends ArticleBase {
  type: "howto";
  coverImage: string;
  readTime: string;
  content: string;
  tableOfContents?: string[];
  tags?: string[];
}

interface MusingArticle extends ArticleBase {
  type: "musing";
  readTime: string;
  content: string;
  pullQuote?: string;
}

interface PhotoArticle extends ArticleBase {
  type: "photo";
  image: string;
  caption: string;
  camera?: string;
  settings?: string;
  location?: string;
}

type Article = SocialArticle | HowToArticle | MusingArticle | PhotoArticle;

// Mock data - replace with real data fetching
const mockArticles: Record<string, Article> = {
  "mountain-ridge-trail": {
    id: 1,
    type: "social",
    title: "Mountain Ridge Trail",
    date: "2026-02-05",
    slug: "mountain-ridge-trail",
    content: "15km hike through misty mountain trails today. Started early to catch the sunrise from the summit.\n\nThe views at the summit made every step worth it. You could see for miles in every direction - layers of mountains fading into the distance.\n\nMet some fellow hikers at the top who shared their trail mix. There's something special about the camaraderie you find on the trail.\n\nLegs are tired but the mind is clear. These are the days I live for. 🏔️",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
    location: "Ridge Mountain Trail, CO"
  },
  "coffee-and-code": {
    id: 2,
    type: "social",
    title: "Coffee & Code",
    date: "2026-01-29",
    slug: "coffee-and-code",
    content: "Early morning setup. There's something peaceful about coding before the world wakes up.\n\nMy favorite time to work is between 5-8am. No notifications, no meetings, just flow state and fresh coffee.\n\nWorking on a new component library feature. The quiet helps me think through complex problems.\n\n☕💻",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&h=800&fit=crop"
  },
  "desk-build-complete": {
    id: 3,
    type: "social",
    title: "Finished the desk build",
    date: "2026-01-20",
    slug: "desk-build-complete",
    content: "Three weekends of work, but it's finally done. Custom standing desk from reclaimed wood.\n\nThe grain on this timber is absolutely beautiful. Every knot and imperfection tells a story.\n\nLearned a lot about joinery on this project. Hand-cut dovetails aren't perfect but they're mine.\n\nNow to break it in properly with some serious coding sessions. 🔨🪵",
    image: "https://images.unsplash.com/photo-1565597373006-95bc56d09a5f?w=1200&h=800&fit=crop"
  },
  "vintage-camera-find": {
    id: 4,
    type: "social",
    title: "Found this old camera",
    date: "2026-01-12",
    slug: "vintage-camera-find",
    content: "Thrifted a Canon AE-1 Program today. Can't wait to shoot some film again.\n\nThere's something about analog that just hits different. The intentionality of each shot. The anticipation of getting film developed.\n\nDigital is convenient, but film makes you think before you click.\n\nTime to stock up on Portra 400. 📷🎞️",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1200&h=800&fit=crop"
  },
  "component-libraries": {
    id: 5,
    type: "howto",
    title: "Building Retro Component Libraries",
    date: "2026-02-12",
    slug: "component-libraries",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=800&fit=crop",
    readTime: "5 min read",
    content: `# Building Retro Component Libraries

Design patterns for scalable UI systems that grow with your application.

## Introduction

Creating a component library isn't just about building reusable pieces—it's about establishing a design system that can evolve with your needs while maintaining consistency and accessibility.

## Core Principles

### 1. Composition Over Configuration

Build small, focused components that can be combined rather than large components with tons of props.

\`\`\`tsx
// Good: Composable
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>

// Avoid: Monolithic
<Card title="Title" content="Content" hasHeader />
\`\`\`

### 2. Accessibility First

Every component should be accessible by default. Use semantic HTML and ARIA attributes properly.

### 3. Style Flexibility

Allow consumers to extend and customize without fighting the system. Use CSS variables, utility classes, or styled components.

## Building a Button Component

Let's walk through creating a retro-styled button:

\`\`\`tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function RetroButton({ 
  variant = 'primary', 
  size = 'md',
  children 
}: ButtonProps) {
  return (
    <button className={cn(
      'font-bold border-2 border-foreground',
      'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
      'hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]',
      'hover:translate-x-[2px] hover:translate-y-[2px]',
      'transition-all',
      variants[variant],
      sizes[size]
    )}>
      {children}
    </button>
  );
}
\`\`\`

## Documentation Matters

Good documentation is the difference between a library that gets used and one that gets ignored. Include:

- Live examples
- Props API reference
- Common use cases
- Accessibility notes

## Conclusion

Building a component library is an investment in your development workflow. Start small, iterate based on real needs, and always prioritize the developer experience.`,
    tableOfContents: [
      "Introduction",
      "Core Principles",
      "Building a Button Component",
      "Documentation Matters",
      "Conclusion"
    ],
    tags: ["React", "TypeScript", "Design Systems", "Components"]
  },
  "dev-environment-setup": {
    id: 6,
    type: "howto",
    title: "Setting Up a Modern Development Environment",
    date: "2026-01-28",
    slug: "dev-environment-setup",
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=800&fit=crop",
    readTime: "8 min read",
    content: `# Setting Up a Modern Development Environment

A comprehensive guide to configuring VS Code, terminal tools, and productivity workflows.

## Introduction

Your development environment is your home. Make it comfortable. Make it efficient. Make it yours.

This guide covers setting up a modern development workflow that's both powerful and enjoyable to use.

## Terminal Setup

### Choose Your Shell

I recommend **zsh** with **oh-my-zsh** for maximum customization:

\`\`\`bash
# Install oh-my-zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
\`\`\`

### Essential Plugins

- \`git\` - Git aliases and helpers
- \`zsh-autosuggestions\` - Command suggestions
- \`zsh-syntax-highlighting\` - Syntax highlighting
- \`fzf\` - Fuzzy finder

## VS Code Configuration

### Must-Have Extensions

1. **ESLint** - Code quality
2. **Prettier** - Code formatting
3. **GitLens** - Git superpowers
4. **Error Lens** - Inline errors
5. **Auto Rename Tag** - HTML/JSX tag editing

### Settings Sync

Enable Settings Sync to keep your config across machines. It's built into VS Code now!

## Git Configuration

\`\`\`bash
# Set your identity
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Better diff output
git config --global diff.algorithm histogram

# Rebase by default on pull
git config --global pull.rebase true
\`\`\`

## Productivity Tools

### Task Running

Use \`tasks.json\` in VS Code for common operations:

- Build commands
- Test runners
- Development servers

### Snippets

Create custom snippets for repetitive code. Time saved compounds quickly.

## Conclusion

Your environment evolves with you. Start with these basics, then customize based on your workflow. The best setup is the one that gets out of your way and lets you focus on building.`,
    tableOfContents: [
      "Introduction",
      "Terminal Setup",
      "VS Code Configuration",
      "Git Configuration",
      "Productivity Tools",
      "Conclusion"
    ],
    tags: ["VS Code", "Terminal", "Git", "Productivity"]
  },
  "css-grid-mastery": {
    id: 7,
    type: "howto",
    title: "CSS Grid Mastery: Advanced Layout Techniques",
    date: "2026-01-15",
    slug: "css-grid-mastery",
    coverImage: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=1200&h=800&fit=crop",
    readTime: "6 min read",
    content: `# CSS Grid Mastery: Advanced Layout Techniques

Moving beyond the basics of CSS Grid to create complex, responsive layouts with minimal code and maximum flexibility.

## Introduction

CSS Grid changed the game for web layouts. But most tutorials stop at the basics. Let's go deeper.

## Named Grid Areas

Instead of tracking line numbers, use named areas:

\`\`\`css
.container {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }
\`\`\`

## Responsive Without Media Queries

Use \`auto-fit\` and \`minmax\` for responsive grids:

\`\`\`css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
\`\`\`

This creates a grid that automatically adjusts based on available space.

## Subgrid

Align nested grids with their parent:

\`\`\`css
.parent {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.child {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: span 3;
}
\`\`\`

## Dense Packing

Fill gaps in your grid automatically:

\`\`\`css
.masonry {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-flow: dense;
  gap: 1rem;
}
\`\`\`

## Practical Example

Here's a complete dashboard layout:

\`\`\`css
.dashboard {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1rem;
}

.widget-small { grid-column: span 3; }
.widget-medium { grid-column: span 6; }
.widget-large { grid-column: span 12; }

@media (max-width: 768px) {
  .widget-small,
  .widget-medium,
  .widget-large {
    grid-column: span 12;
  }
}
\`\`\`

## Conclusion

CSS Grid is incredibly powerful when you understand its advanced features. Experiment with these techniques and you'll find yourself reaching for Grid more than Flexbox.`,
    tableOfContents: [
      "Introduction",
      "Named Grid Areas",
      "Responsive Without Media Queries",
      "Subgrid",
      "Dense Packing",
      "Practical Example",
      "Conclusion"
    ],
    tags: ["CSS", "Grid", "Layout", "Responsive Design"]
  },
  "digital-gardens": {
    id: 8,
    type: "musing",
    title: "Digital Gardens",
    date: "2026-02-03",
    slug: "digital-gardens",
    readTime: "3 min read",
    pullQuote: "Knowledge isn't static. It grows, branches, and evolves.",
    content: `Growing ideas organically in public, cultivating knowledge over time instead of polished perfection.

What if we treated our writing less like published content and more like tended plants—watering, pruning, watching them grow?

## The Problem with Publishing

Traditional publishing has a finality to it. You write, you edit, you publish, and then it's done. Frozen in time. Any updates feel like admissions of failure.

But knowledge doesn't work that way. Ideas evolve. Understanding deepens. Context changes.

## Gardens vs. Streams

Social media is a stream—ephemeral, chronological, flowing away. Blog posts are snapshots—captured moments that don't change.

Digital gardens are different. They're living documents. Notes that grow and connect over time. Ideas that branch and intertwine.

## Tending the Garden

I've started treating my notes this way. Some are seedlings—rough ideas just planted. Others are mature trees—well-developed thoughts that I return to and refine.

There's something liberating about publishing incomplete thoughts. About saying "here's what I'm thinking right now" without the pressure of it being perfect or final.

## Learning in Public

The garden metaphor extends to learning. You plant seeds (questions), water them (research), watch them grow (understanding), and eventually harvest (share what you've learned).

And just like a real garden, some things don't grow. Some experiments fail. That's okay. That's part of the process.

## Cultivating Your Own

If you're interested in starting a digital garden:

- Start messy. Don't wait for the perfect system.
- Link ideas together. Connections create context.
- Update freely. There's no "published" state.
- Share early. Let others watch things grow.

The point isn't perfection. It's cultivation.`
  },
  "slow-work": {
    id: 9,
    type: "musing",
    title: "The Value of Slow Work",
    date: "2026-01-22",
    slug: "slow-work",
    readTime: "4 min read",
    pullQuote: "Speed is overrated. Depth is undervalued.",
    content: `In a world obsessed with speed and productivity, there's something to be said for taking time to think deeply and work deliberately.

Sometimes the best solutions come when we stop rushing.

## The Myth of Velocity

We celebrate shipping fast. Moving fast. Iterating quickly. But what are we sacrificing in the pursuit of speed?

Deep understanding takes time. Elegant solutions require thought. Quality work demands attention.

## Slow Doesn't Mean Lazy

Slow work isn't about procrastination or inefficiency. It's about intentionality.

It's choosing to understand the problem before jumping to solutions. It's refactoring until the code tells a clear story. It's sleeping on a design decision instead of rushing to implement.

## The Cost of Rush

When we rush, we accumulate technical debt. We ship bugs. We create code that works but nobody understands.

Fast code written slowly is better than slow code written fast.

## Finding Balance

I'm not advocating for perfectionism or endless deliberation. There's a balance between speed and depth.

Ship when ready, not when rushed. Iterate thoughtfully, not frantically. Build sustainably, not explosively.

## Making Space

To work slowly requires space:

- Time blocked for deep work
- Permission to think before doing
- Trust that quality matters
- Acceptance that some things can't be rushed

The best work happens in the gaps between the urgent and the important.

## The Long Game

Slow work compounds. The time you invest in understanding pays dividends later. The care you take today prevents chaos tomorrow.

Speed gets you there first. Depth gets you there right.`
  },
  "code-comments": {
    id: 10,
    type: "musing",
    title: "Why I Write Code Comments",
    date: "2026-01-10",
    slug: "code-comments",
    readTime: "3 min read",
    content: `Future you will thank present you. Thoughts on documentation as a form of kindness to your future self and collaborators.

Comments aren't clutter—they're context.

## The Argument Against

"Good code documents itself." You've heard this. Maybe you've said it.

And it's partially true. Clear variable names, well-structured functions, and proper abstractions do communicate intent.

But they don't tell you *why*.

## What Comments Should Explain

Not *what* the code does—that should be obvious. But:

- **Why this approach** over alternatives
- **What problem** this solves
- **What assumption** the code makes
- **What gotcha** to watch out for

## A Real Example

\`\`\`typescript
// Bad: States the obvious
// Loop through users
users.forEach(user => { ... })

// Good: Explains the why
// Process users in sequence to avoid rate limiting
// Parallel processing caused 429 errors in production
for (const user of users) { ... }
\`\`\`

## Comments as Time Travel

Every comment is a message to the future. When you return to this code in six months, will you remember:

- Why you chose this algorithm?
- What edge case you're handling?
- What you tried that didn't work?

Your future self is a collaborator. Treat them well.

## The Best Comment

Sometimes the best comment is the one that says "I know this looks weird, here's why."

It's permission for the next person (including future you) to understand without judgment.

## Write Them

Yes, they can get stale. Yes, they add lines. Yes, good naming helps.

But comments are documentation, and documentation is kindness. Be kind to your future self.`
  },
  "golden-hour-walk": {
    id: 11,
    type: "photo",
    title: "Golden Hour Walk",
    date: "2026-02-07",
    slug: "golden-hour-walk",
    image: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=1200&h=1200&fit=crop",
    caption: "The light was perfect",
    camera: "Canon AE-1 Program",
    settings: "50mm f/1.8, 1/250s, ISO 400",
    location: "Riverside Park"
  },
  "city-lights": {
    id: 12,
    type: "photo",
    title: "City Lights",
    date: "2026-01-31",
    slug: "city-lights",
    image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&h=1200&fit=crop",
    caption: "Late night exploring",
    camera: "Sony A7III",
    settings: "24mm f/2.8, 2s, ISO 1600",
    location: "Downtown"
  },
  "morning-coffee": {
    id: 13,
    type: "photo",
    title: "Morning Coffee",
    date: "2026-01-24",
    slug: "morning-coffee",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&h=1200&fit=crop",
    caption: "Simple moments",
    camera: "iPhone 14 Pro",
    settings: "Portrait mode",
    location: "Home"
  },
  "forest-path": {
    id: 14,
    type: "photo",
    title: "Forest Path",
    date: "2026-01-18",
    slug: "forest-path",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=1200&fit=crop",
    caption: "Weekend wandering",
    camera: "Canon AE-1 Program",
    settings: "50mm f/2, 1/125s, Kodak Portra 400",
    location: "Redwood Trail"
  }
};

// Social Post Layout
function SocialPostLayout({ article }: { article: SocialArticle }) {
  const formattedDate = new Date(article.date).toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="fixed inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 19px, currentColor 19px, currentColor 20px),
                           repeating-linear-gradient(90deg, transparent, transparent 19px, currentColor 19px, currentColor 20px)`
        }} 
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Back link */}
        <a 
          href="/articles" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          ← Back to articles
        </a>

        <RetroCard className="overflow-hidden">
          {/* Header */}
          <div className="p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
              <RetroBadge variant="teal" className="text-xs">Activity</RetroBadge>
              <time>{formattedDate}</time>
              {article.location && (
                <>
                  <span>·</span>
                  <span>📍 {article.location}</span>
                </>
              )}
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold">{article.title}</h1>
          </div>

          {/* Image if present */}
          {article.image && (
            <div className="w-full aspect-video bg-muted">
              <img 
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="p-6 sm:p-8">
            <div className="prose prose-lg max-w-none">
              {article.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-base leading-relaxed mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </RetroCard>
      </div>
    </div>
  );
}

// How-To/Magazine Layout
function HowToLayout({ article }: { article: HowToArticle }) {
  const formattedDate = new Date(article.date).toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="fixed inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 19px, currentColor 19px, currentColor 20px),
                           repeating-linear-gradient(90deg, transparent, transparent 19px, currentColor 19px, currentColor 20px)`
        }} 
      />

      <div className="relative z-10">
        {/* Hero Image */}
        <div className="w-full h-[50vh] bg-muted relative">
          <img 
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <div className="-mt-8 mb-8">
            <a 
              href="/articles" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to articles
            </a>
          </div>

          {/* Article Header */}
          <article className="space-y-8 pb-16">
            <header className="space-y-6">
              <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
                <RetroBadge variant="orange" className="text-xs">How-To</RetroBadge>
                <time>{formattedDate}</time>
                <span>·</span>
                <span>{article.readTime}</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                {article.title}
              </h1>

              {article.tags && (
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 text-xs font-medium bg-muted rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {/* Two column layout for large screens */}
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Table of Contents - Sidebar */}
              {article.tableOfContents && (
                <aside className="lg:col-span-1">
                  <div className="lg:sticky lg:top-8">
                    <RetroCard variant="bordered" className="p-6">
                      <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-4">
                        Contents
                      </h2>
                      <nav>
                        <ul className="space-y-2 text-sm">
                          {article.tableOfContents.map((item, index) => (
                            <li key={index}>
                              <a 
                                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                                className="text-foreground/80 hover:text-primary transition-colors"
                              >
                                {item}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </nav>
                    </RetroCard>
                  </div>
                </aside>
              )}

              {/* Main Content */}
              <div className={article.tableOfContents ? "lg:col-span-3" : "lg:col-span-4"}>
                <RetroCard className="p-8 sm:p-12">
                  <div 
                    className="prose prose-lg max-w-none
                      prose-headings:font-bold prose-headings:tracking-tight
                      prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                      prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                      prose-p:leading-relaxed prose-p:mb-6
                      prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded
                      prose-pre:bg-muted prose-pre:border-2 prose-pre:border-border
                      prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
                  >
                    {article.content.split('\n\n').map((block, index) => {
                      if (block.startsWith('# ')) {
                        return <h1 key={index}>{block.slice(2)}</h1>;
                      } else if (block.startsWith('## ')) {
                        return <h2 key={index}>{block.slice(3)}</h2>;
                      } else if (block.startsWith('### ')) {
                        return <h3 key={index}>{block.slice(4)}</h3>;
                      } else if (block.startsWith('```')) {
                        const code = block.slice(block.indexOf('\n') + 1, block.lastIndexOf('```'));
                        return (
                          <pre key={index}>
                            <code>{code}</code>
                          </pre>
                        );
                      } else {
                        return <p key={index}>{block}</p>;
                      }
                    })}
                  </div>
                </RetroCard>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

// Musing/Editorial Layout
function MusingLayout({ article }: { article: MusingArticle }) {
  const formattedDate = new Date(article.date).toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="fixed inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 19px, currentColor 19px, currentColor 20px),
                           repeating-linear-gradient(90deg, transparent, transparent 19px, currentColor 19px, currentColor 20px)`
        }} 
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Back link */}
        <a 
          href="/articles" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
        >
          ← Back to articles
        </a>

        <article className="space-y-8">
          {/* Header - More editorial style */}
          <header className="text-center space-y-6 py-8 border-b-2 border-border">
            <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
              <RetroBadge variant="purple" className="text-xs">Musing</RetroBadge>
              <time>{formattedDate}</time>
              <span>·</span>
              <span>{article.readTime}</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight max-w-2xl mx-auto">
              {article.title}
            </h1>
          </header>

          {/* Pull Quote */}
          {article.pullQuote && (
            <div className="py-12">
              <blockquote className="text-center text-2xl sm:text-3xl font-bold italic text-primary border-y-4 border-primary/20 py-8">
                &ldquo;{article.pullQuote}&rdquo;
              </blockquote>
            </div>
          )}

          {/* Content - Clean, readable typography */}
          <div className="prose prose-xl max-w-none
            prose-headings:font-bold prose-headings:tracking-tight
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-center
            prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
            prose-p:first-letter:text-5xl prose-p:first-letter:font-bold 
            prose-p:first-letter:float-left prose-p:first-letter:mr-3 
            prose-p:first-letter:leading-none prose-p:first-letter:mt-1"
          >
            {article.content.split('\n\n').map((block, index) => {
              if (block.startsWith('## ')) {
                return <h2 key={index}>{block.slice(3)}</h2>;
              } else if (block.startsWith('- ') || block.includes('\n- ')) {
                const items = block.split('\n').filter(line => line.startsWith('- '));
                return (
                  <ul key={index} className="space-y-2 my-6">
                    {items.map((item, i) => (
                      <li key={i}>{item.slice(2)}</li>
                    ))}
                  </ul>
                );
              } else {
                return <p key={index}>{block}</p>;
              }
            })}
          </div>

          {/* Closing */}
          <div className="pt-12 border-t-2 border-border text-center">
            <p className="text-muted-foreground italic">
              Thanks for reading. These thoughts are always evolving.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}

// Photo Layout
function PhotoLayout({ article }: { article: PhotoArticle }) {
  const formattedDate = new Date(article.date).toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="fixed inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 19px, currentColor 19px, currentColor 20px),
                           repeating-linear-gradient(90deg, transparent, transparent 19px, currentColor 19px, currentColor 20px)`
        }} 
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Back link */}
        <a 
          href="/articles" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          ← Back to articles
        </a>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Large Photo - Left side */}
          <div className="lg:sticky lg:top-8">
            <div className="w-full aspect-square bg-muted rounded-lg overflow-hidden shadow-2xl">
              <img 
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Photo Details - Right side */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <RetroBadge variant="orange" className="text-xs">Photo</RetroBadge>
                <time>{formattedDate}</time>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
                {article.title}
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed">
                {article.caption}
              </p>
            </div>

            <RetroDivider />

            {/* Photo Metadata */}
            <RetroCard variant="bordered" className="p-6">
              <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-4">
                Details
              </h2>
              <dl className="space-y-3 text-sm">
                {article.camera && (
                  <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <dt className="text-muted-foreground">Camera</dt>
                    <dd className="font-medium">{article.camera}</dd>
                  </div>
                )}
                {article.settings && (
                  <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <dt className="text-muted-foreground">Settings</dt>
                    <dd className="font-medium">{article.settings}</dd>
                  </div>
                )}
                {article.location && (
                  <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <dt className="text-muted-foreground">Location</dt>
                    <dd className="font-medium">{article.location}</dd>
                  </div>
                )}
                <div className="flex justify-between items-center py-2">
                  <dt className="text-muted-foreground">Date</dt>
                  <dd className="font-medium">{formattedDate}</dd>
                </div>
              </dl>
            </RetroCard>

            {/* Navigation to other photos could go here */}
            <div className="pt-8">
              <a 
                href="/photos" 
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
              >
                View all photos →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const pageContext = usePageContext();
  const slug = pageContext.routeParams.slug;
  
  // In a real app, fetch the article data based on slug
  const article = mockArticles[slug];

  if (!article) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Article not found</h1>
          <a href="/articles" className="text-primary hover:underline">
            ← Back to articles
          </a>
        </div>
      </div>
    );
  }

  // Render appropriate layout based on article type
  switch (article.type) {
    case "social":
      return <SocialPostLayout article={article} />;
    case "howto":
      return <HowToLayout article={article} />;
    case "musing":
      return <MusingLayout article={article} />;
    case "photo":
      return <PhotoLayout article={article} />;
    default:
      return <div>Unknown article type</div>;
  }
}
