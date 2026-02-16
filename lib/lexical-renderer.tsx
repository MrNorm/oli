import React from 'react';

/**
 * Centralized Lexical Block Editor Renderer
 * Handles Payload CMS's Lexical editor format and renders it as JSX
 * 
 * Based on the comprehensive implementation from pages/megabytes/@id/+Page.tsx
 */

export interface LexicalContent {
  root: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children?: any[];
  };
}

export interface LexicalHeading {
  text: string;
  tag: string;
}

/**
 * Renders Payload's Lexical rich text content as JSX
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function renderLexicalContent(content: any): React.ReactNode {
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
  
  // Return with prose classes consistent with the design system
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
}

/**
 * Extract headings from Lexical rich text content for table of contents
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function extractLexicalHeadings(content: any): LexicalHeading[] {
  if (!content || !content.root || !content.root.children) return [];
  
  const headings: LexicalHeading[] = [];
  
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
}

/**
 * Extract plain text from Lexical content (useful for excerpts, previews, etc.)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function extractLexicalText(content: any): string {
  if (!content || !content.root) return '';
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const extractFromNode = (node: any): string => {
    if (node.type === 'text') return node.text || '';
    if (node.children) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return node.children.map((child: any) => extractFromNode(child)).join(' ');
    }
    return '';
  };
  
  return extractFromNode(content.root);
}
