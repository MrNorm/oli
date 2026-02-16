import { useData } from 'vike-react/useData';
import type { Data } from './+data';
import {
  RetroCard,
  RetroBadge,
} from '@/components/retro';
import { OptimizedImage } from '@/components/OptimizedImage';

/**
 * Helper to render Payload's rich text content as JSX
 * Handles Lexical editor format from Payload CMS
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderRichTextContent = (content: any) => {
  if (!content || !content.root) return null;
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderNode = (node: any, index: number): React.ReactNode => {
    // Handle text nodes
    if (node.type === 'text') {
      const text = node.text || '';
      
      // Lexical format is a bitmask: 1=bold, 2=italic, 4=strikethrough, 8=underline, 16=code
      const format = node.format || 0;
      
      let result: React.ReactNode = text;
      
      // Apply formatting - check each bit
      if (format & 16) { // code (apply first, highest precedence)
        result = <code className="px-2 py-1 bg-muted rounded text-sm font-mono">{result}</code>;
      }
      if (format & 1) { // bold
        result = <strong>{result}</strong>;
      }
      if (format & 2) { // italic
        result = <em>{result}</em>;
      }
      
      return <span key={index}>{result}</span>;
    }
    
    // Handle block nodes
    switch (node.type) {
      case 'heading': {
        const tag = node.tag || 'h2';
        const HeadingComponent = tag;
        
        // Extract text for ID
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const headingText = node.children?.map((child: any) => child.text || '').join('') || '';
        const headingId = headingText.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        
        if (tag === 'h1') {
          return (
            <HeadingComponent key={index} id={headingId} className="text-4xl font-bold mt-12 mb-6 first:mt-0 tracking-tight">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {node.children?.map((child: any, i: number) => renderNode(child, i))}
            </HeadingComponent>
          );
        } else if (tag === 'h2') {
          return (
            <HeadingComponent key={index} id={headingId} className="text-3xl font-bold mt-12 mb-6 tracking-tight">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {node.children?.map((child: any, i: number) => renderNode(child, i))}
            </HeadingComponent>
          );
        } else if (tag === 'h3') {
          return (
            <HeadingComponent key={index} id={headingId} className="text-2xl font-bold mt-8 mb-4 tracking-tight">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {node.children?.map((child: any, i: number) => renderNode(child, i))}
            </HeadingComponent>
          );
        } else {
          return (
            <HeadingComponent key={index} id={headingId} className="text-xl font-bold mt-6 mb-3 tracking-tight">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {node.children?.map((child: any, i: number) => renderNode(child, i))}
            </HeadingComponent>
          );
        }
      }
        
      case 'paragraph':
        // Skip empty paragraphs
        if (!node.children || node.children.length === 0) {
          return null;
        }
        return (
          <p key={index} className="mb-6 leading-relaxed">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {node.children?.map((child: any, i: number) => renderNode(child, i))}
          </p>
        );
        
      case 'list': {
        const ListTag = node.listType === 'number' ? 'ol' : 'ul';
        return (
          <ListTag key={index} className={`mb-6 ml-6 space-y-2 ${node.listType === 'number' ? 'list-decimal' : 'list-disc'}`}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {node.children?.map((child: any, i: number) => renderNode(child, i))}
          </ListTag>
        );
      }
        
      case 'listitem':
        return (
          <li key={index} className="leading-relaxed">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {node.children?.map((child: any, i: number) => renderNode(child, i))}
          </li>
        );
        
      case 'quote':
        return (
          <blockquote key={index} className="border-l-4 border-primary pl-6 my-8 italic text-xl text-muted-foreground">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {node.children?.map((child: any, i: number) => renderNode(child, i))}
          </blockquote>
        );
        
      case 'link':
        return (
          <a 
            key={index}
            href={node.url || node.fields?.url}
            className="text-primary hover:text-primary/80 underline transition-colors"
            target={node.newTab || node.fields?.newTab ? '_blank' : undefined}
            rel={node.newTab || node.fields?.newTab ? 'noopener noreferrer' : undefined}
          >
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {node.children?.map((child: any, i: number) => renderNode(child, i))}
          </a>
        );
        
      default:
        // Handle unknown nodes by rendering children
        if (node.children) {
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          return <div key={index}>{node.children.map((child: any, i: number) => renderNode(child, i))}</div>;
        }
        return null;
    }
  };
  
  // Return with the exact same prose classes as how-to articles
  return (
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
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {content.root.children?.map((node: any, i: number) => renderNode(node, i))}
    </div>
  );
};

/**
 * Extract headings from rich text content for table of contents
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const extractHeadings = (content: any): Array<{ text: string; tag: string }> => {
  if (!content || !content.root || !content.root.children) return [];
  
  const headings: Array<{ text: string; tag: string }> = [];
  
  // Directly iterate over root children (no need to traverse deeper)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content.root.children.forEach((node: any) => {
    if (node.type === 'heading') {
      // Extract text from heading children
      const text = node.children
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ?.map((child: any) => child.text || '')
        .join('');
      if (text) {
        headings.push({ text, tag: node.tag });
      }
    }
  });
  
  return headings;
};

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
  const tableOfContents = extractHeadings(megabyte.content);

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
                <div className="prose prose-lg max-w-none
                  prose-headings:font-bold prose-headings:tracking-tight
                  prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                  prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                  prose-p:leading-relaxed prose-p:mb-6
                  prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded
                  prose-pre:bg-muted prose-pre:border-2 prose-pre:border-border
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
                  {renderRichTextContent(megabyte.content)}
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
