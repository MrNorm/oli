import { useData } from 'vike-react/useData';
import type { Data } from './+data';
import {
  RetroCard,
  RetroBadge,
} from '@/components/retro';
import { OptimizedImage } from '@/components/OptimizedImage';
import { renderLexicalContent, extractLexicalHeadings } from '@/lib/lexical-renderer';

export default function MegabytePage() {
  const { megabyte } = useData<Data>();

  if (!megabyte) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Megabyte not found</h1>
          <a href="/activity" className="text-primary hover:underline">
            ← Back to activity
          </a>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(megabyte.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // Extract table of contents from content
  const tableOfContents = extractLexicalHeadings(megabyte.content);

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
        {megabyte.featuredImage && (
          <div className="w-full h-[50vh] bg-muted relative">
            <OptimizedImage 
              src={megabyte.featuredImage.url}
              alt={megabyte.featuredImage.alt || megabyte.title}
              width={1920}
              responsive="xlarge"
              sizes="100vw"
              priority
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          </div>
        )}

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <div className="-mt-8 mb-8">
            <a 
              href="/activity" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to activity
            </a>
          </div>

          {/* Article Header */}
          <article className="space-y-8 pb-16">
            <header className="space-y-6">
              <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
                <RetroBadge variant="orange" className="text-xs">Megabyte</RetroBadge>
                <time>{formattedDate}</time>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                {megabyte.title}
              </h1>

              {megabyte.tags && megabyte.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {megabyte.tags.map((tag: string, index: number) => (
                    <span 
                      key={index}
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
              {tableOfContents.length > 0 && (
                <aside className="lg:col-span-1">
                  <div className="lg:sticky lg:top-8">
                    <RetroCard variant="bordered" className="p-6">
                      <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-4">
                        Contents
                      </h2>
                      <nav>
                        <ul className="space-y-2 text-sm">
                          {tableOfContents.map((item, index) => (
                            <li key={index} className={item.tag === 'h3' ? 'ml-3' : ''}>
                              <a 
                                href={`#${item.text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                                className="text-foreground/80 hover:text-primary transition-colors"
                              >
                                {item.text}
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
              <div className={tableOfContents.length > 0 ? "lg:col-span-3" : "lg:col-span-4"}>
                {renderLexicalContent(megabyte.content)}
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
