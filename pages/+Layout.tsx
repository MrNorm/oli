import "./Layout.css";
import "./tailwind.css";
import { Logo } from "../components/retro";
import { Link } from "../components/Link";
import { usePageContext } from "vike-react/usePageContext";
import { ApolloProvider } from "@apollo/client/react";
import { apolloClient } from "../lib/apollo-client";
import { Github, Briefcase } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pageContext = usePageContext();
  const isIndexPage = pageContext.urlPathname === '/';
  
  return (
    <ApolloProvider client={apolloClient}>
      <div className="min-h-screen flex flex-col">
        <Header isIndexPage={isIndexPage} />
        
        <main className="flex-1 w-full">
          <div id="page-container" className="w-full">
            <div id="page-content">
              {children}
            </div>
          </div>
        </main>
        
        <Footer />
        
        {/* Loading overlay during page transitions */}
        <div id="page-loading-overlay">
          <Logo variant="logo" animated="electrocuted" />
        </div>
      </div>
    </ApolloProvider>
  );
}

function Header({ isIndexPage }: { isIndexPage: boolean }) {
  return (
    <header className="w-full border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a 
            href="/" 
            className={`flex items-center hover:opacity-80 transition-all duration-300 ${
              isIndexPage ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <Logo variant="icon" />
          </a>
          <nav className={`flex items-center gap-6 transition-all duration-300 ${isIndexPage ? 'ml-auto' : ''}`}>
            <Link href="/" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/activity" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Activity
            </Link>
            <Link href="/career" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
              Career
            </Link>
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
                href="https://github.com/mrnorm" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
              <a 
                href="https://www.linkedin.com/in/olivernortham/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Briefcase className="w-6 h-6" />
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
