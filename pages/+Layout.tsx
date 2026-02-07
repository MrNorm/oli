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
