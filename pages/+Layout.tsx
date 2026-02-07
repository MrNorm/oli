import "./Layout.css";
import "./tailwind.css";
import { Logo } from "../components/retro";
import { Link } from "../components/Link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
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

function Header() {
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
          </nav>
        </div>
      </div>
    </header>
  );
}
