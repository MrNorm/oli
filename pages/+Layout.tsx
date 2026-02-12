import "./Layout.css";
import "./tailwind.css";
import { Logo } from "../components/retro";
import { Link } from "../components/Link";
import { usePageContext } from "vike-react/usePageContext";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pageContext = usePageContext();
  const isIndexPage = pageContext.urlPathname === '/';
  const [isHeaderVisible, setIsHeaderVisible] = useState(!isIndexPage);
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with slide animation */}
      <div 
        className="transition-all duration-300 ease-in-out overflow-hidden"
        style={{ 
          maxHeight: isHeaderVisible ? '200px' : '0px',
          opacity: isHeaderVisible ? 1 : 0
        }}
      >
        <Header onToggle={() => setIsHeaderVisible(!isHeaderVisible)} />
      </div>
      
      {/* Show toggle when header is hidden */}
      {!isHeaderVisible && (
        <button
          onClick={() => setIsHeaderVisible(true)}
          className="fixed top-4 right-4 z-50 p-2.5 rounded-lg bg-card border-2 border-primary/60 hover:border-primary transition-all hover:scale-105 shadow-xl"
          aria-label="Show navigation"
          title="Show navigation"
        >
          <svg 
            className="w-5 h-5 text-primary"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}
      
      <main className="flex-1 w-full">
        <div id="page-container" className="w-full">
          <div id="page-content">
            {children}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

function Header({ onToggle }: { onToggle: () => void }) {
  return (
    <header className="w-full border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <Logo variant="icon" />
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/career" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Career
            </Link>
            <Link href="/photos" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Photos
            </Link>
            <Link href="/demo" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Components
            </Link>
            <button
              onClick={onToggle}
              className="ml-2 p-2 rounded-lg hover:bg-card/50 border border-border/40 hover:border-primary/60 transition-all"
              aria-label="Hide navigation"
              title="Hide navigation"
            >
              <svg 
                className="w-5 h-5 text-foreground/60 hover:text-primary transition-colors"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full border-t border-border/40 bg-background/80 backdrop-blur-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Logo and tagline */}
          <div className="flex flex-col items-center md:items-start">
            <Logo variant="footer" />
          </div>
          
          {/* Social links */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-sm font-semibold text-foreground mb-4 tracking-wide">Connect</h3>
            <div className="flex gap-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border/40">
          <p className="text-center text-sm text-foreground/50">
            © {currentYear} Oliver Northam. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
