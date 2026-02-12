import {
  RetroCard,
  RetroBadge,
  RetroDivider,
  Polaroid,
  GeometricCircle,
  GeometricTriangle,
  GeometricSquare,
} from "@/components/retro";

// Types
interface SocialPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  image?: string;
}

interface MagazineArticle {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  slug: string;
  coverImage: string;
}

interface Editorial {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  slug: string;
  pullQuote?: string;
}

interface PhotoPost {
  id: number;
  title: string;
  caption: string;
  date: string;
  slug: string;
  image: string;
}

// Mock article data - replace with real data source later
const socialPosts: SocialPost[] = [
  {
    id: 1,
    title: "Mountain Ridge Trail",
    excerpt: "15km hike through misty mountain trails. The views at the summit made every step worth it. 🏔️📸",
    date: "2026-02-05",
    slug: "mountain-ridge-trail",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    title: "Coffee & Code",
    excerpt: "Early morning setup. There's something peaceful about coding before the world wakes up. ☕💻",
    date: "2026-01-29",
    slug: "coffee-and-code",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    title: "Finished the desk build",
    excerpt: "Three weekends of work, but it's finally done. Custom standing desk from reclaimed wood. The grain on this timber is 🔥",
    date: "2026-01-20",
    slug: "desk-build-complete"
  },
  {
    id: 4,
    title: "Found this old camera",
    excerpt: "Thrifted a Canon AE-1 Program today. Can't wait to shoot some film again. There's something about analog that just hits different.",
    date: "2026-01-12",
    slug: "vintage-camera-find"
  }
];

const magazineArticles: MagazineArticle[] = [
  {
    id: 5,
    title: "Building Retro Component Libraries",
    excerpt: "Design patterns for scalable UI systems that grow with your application. A deep dive into creating reusable, accessible, and maintainable components that capture retro computing aesthetics while meeting modern web standards.",
    date: "2026-02-12",
    readTime: "5 min read",
    slug: "component-libraries",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop"
  },
  {
    id: 6,
    title: "Setting Up a Modern Development Environment",
    excerpt: "A comprehensive guide to configuring VS Code, terminal tools, and productivity workflows. Everything you need to create an efficient, personalized development setup that makes coding a joy.",
    date: "2026-01-28",
    readTime: "8 min read",
    slug: "dev-environment-setup",
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop"
  },
  {
    id: 7,
    title: "CSS Grid Mastery: Advanced Layout Techniques",
    excerpt: "Moving beyond the basics of CSS Grid to create complex, responsive layouts with minimal code and maximum flexibility. Real-world examples and practical patterns you can use today.",
    date: "2026-01-15",
    readTime: "6 min read",
    slug: "css-grid-mastery",
    coverImage: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=600&fit=crop"
  }
];

const editorials: Editorial[] = [
  {
    id: 8,
    title: "Digital Gardens",
    excerpt: "Growing ideas organically in public, cultivating knowledge over time instead of polished perfection. What if we treated our writing less like published content and more like tended plants—watering, pruning, watching them grow?",
    date: "2026-02-03",
    readTime: "3 min read",
    slug: "digital-gardens",
    pullQuote: "Knowledge isn't static. It grows, branches, and evolves."
  },
  {
    id: 9,
    title: "The Value of Slow Work",
    excerpt: "In a world obsessed with speed and productivity, there's something to be said for taking time to think deeply and work deliberately. Sometimes the best solutions come when we stop rushing.",
    date: "2026-01-22",
    readTime: "4 min read",
    slug: "slow-work",
    pullQuote: "Speed is overrated. Depth is undervalued."
  },
  {
    id: 10,
    title: "Why I Write Code Comments",
    excerpt: "Future you will thank present you. Thoughts on documentation as a form of kindness to your future self and collaborators. Comments aren't clutter—they're context.",
    date: "2026-01-10",
    readTime: "3 min read",
    slug: "code-comments"
  }
];

const photoPosts: PhotoPost[] = [
  {
    id: 11,
    title: "Golden Hour Walk",
    caption: "Feb 7, 2026 • The light was perfect",
    date: "2026-02-07",
    slug: "golden-hour-walk",
    image: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&h=600&fit=crop"
  },
  {
    id: 12,
    title: "City Lights",
    caption: "Jan 31, 2026 • Late night exploring",
    date: "2026-01-31",
    slug: "city-lights",
    image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=600&h=600&fit=crop"
  },
  {
    id: 13,
    title: "Morning Coffee",
    caption: "Jan 24, 2026 • Simple moments",
    date: "2026-01-24",
    slug: "morning-coffee",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=600&fit=crop"
  },
  {
    id: 14,
    title: "Forest Path",
    caption: "Jan 18, 2026 • Weekend wandering",
    date: "2026-01-18",
    slug: "forest-path",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=600&fit=crop"
  }
];

// Social Feed Component - Timeline style
function SocialFeedSection() {
  return (
    <section className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
      <div className="absolute top-10 right-10 w-20 h-20 opacity-10 pointer-events-none">
        <GeometricCircle color="teal" />
      </div>
      
      <div className="space-y-8">
        <div className="space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold">Social</h2>
          <p className="text-lg text-muted-foreground">
            Quick updates, moments, and things happening in real time
          </p>
        </div>
        
        {/* Timeline-style feed */}
        <div className="space-y-4">
          {socialPosts.map((post) => {
            const formattedDate = new Date(post.date).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            });
            
            return (
              <a 
                key={post.id}
                href={`/articles/${post.slug}`}
                className="block group"
              >
                <RetroCard className="hover:scale-[1.01] transition-all hover:shadow-lg">
                  <div className="flex gap-4">
                    {post.image && (
                      <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded overflow-hidden bg-muted">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                    )}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <RetroBadge variant="teal" className="text-xs">Activity</RetroBadge>
                        <time>{formattedDate}</time>
                      </div>
                      <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                </RetroCard>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Magazine Articles Component - Large featured style
function MagazineSection() {
  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
      <div className="absolute bottom-10 right-10 w-28 h-28 opacity-10 pointer-events-none">
        <GeometricSquare color="orange" />
      </div>
      
      <div className="space-y-8">
        <div className="space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold">How-To & Guides</h2>
          <p className="text-lg text-muted-foreground">
            In-depth tutorials and detailed guides for building things
          </p>
        </div>
        
        {/* Magazine-style large cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {magazineArticles.map((article) => {
            const formattedDate = new Date(article.date).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            });
            
            return (
              <a 
                key={article.id}
                href={`/articles/${article.slug}`}
                className="block group"
              >
                <RetroCard className="overflow-hidden hover:scale-[1.02] transition-transform">
                  {/* Large cover image */}
                  <div className="w-full h-64 bg-muted overflow-hidden">
                    <img 
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Article info */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                      <RetroBadge variant="orange" className="text-xs">How-To</RetroBadge>
                      <time>{formattedDate}</time>
                      <span>·</span>
                      <span>{article.readTime}</span>
                    </div>
                    <h3 className="text-2xl font-bold leading-tight group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                </RetroCard>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Editorials Component - Typography-focused
function EditorialsSection() {
  return (
    <section className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
      <div className="absolute top-10 left-10 w-24 h-24 opacity-10 pointer-events-none">
        <GeometricTriangle color="purple" />
      </div>
      
      <div className="space-y-8">
        <div className="space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold">Musings</h2>
          <p className="text-lg text-muted-foreground">
            Thoughts, reflections, and short editorials on building and creating
          </p>
        </div>
        
        {/* Typography-focused editorial cards */}
        <div className="space-y-6">
          {editorials.map((editorial) => {
            const formattedDate = new Date(editorial.date).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            });
            
            return (
              <a 
                key={editorial.id}
                href={`/articles/${editorial.slug}`}
                className="block group"
              >
                <RetroCard className="hover:scale-[1.01] transition-transform">
                  <div className="p-6 sm:p-8 space-y-4">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                      <RetroBadge variant="purple" className="text-xs">Musing</RetroBadge>
                      <time>{formattedDate}</time>
                      <span>·</span>
                      <span>{editorial.readTime}</span>
                    </div>
                    
                    <h3 className="text-2xl sm:text-3xl font-bold leading-tight group-hover:text-primary transition-colors">
                      {editorial.title}
                    </h3>
                    
                    {editorial.pullQuote && (
                      <blockquote className="border-l-4 border-primary/40 pl-4 italic text-lg text-muted-foreground">
                        {editorial.pullQuote}
                      </blockquote>
                    )}
                    
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {editorial.excerpt}
                    </p>
                  </div>
                </RetroCard>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Photo Gallery Component - Visual-first grid
function PhotoGallerySection() {
  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
      <div className="absolute bottom-10 left-10 w-28 h-28 opacity-10 pointer-events-none">
        <GeometricCircle color="orange" />
      </div>
      
      <div className="space-y-8">
        <div className="space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold">Photos</h2>
          <p className="text-lg text-muted-foreground">
            Visual stories and captured moments
          </p>
        </div>
        
        {/* Photo grid with Polaroid style */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {photoPosts.map((photo, index) => {
            const rotations = [-2, 1, -1, 2, -1.5, 1.5];
            const rotation = rotations[index % rotations.length];
            
            return (
              <a 
                key={photo.id}
                href={`/articles/${photo.slug}`}
                className="block group"
              >
                <div 
                  className="hover:scale-105 hover:rotate-0 transition-all duration-300"
                  style={{ transform: `rotate(${rotation}deg)` }}
                >
                  <Polaroid
                    image={photo.image}
                    alt={photo.title}
                    caption={photo.caption}
                    rotate={0}
                  />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Subtle grid background */}
      <div className="fixed inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 19px, currentColor 19px, currentColor 20px),
                           repeating-linear-gradient(90deg, transparent, transparent 19px, currentColor 19px, currentColor 20px)`
        }} 
      />

      {/* Main content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="absolute top-10 right-10 w-24 h-24 opacity-15 pointer-events-none">
            <GeometricCircle color="teal" />
          </div>
          <div className="absolute bottom-10 left-10 w-20 h-20 opacity-10 pointer-events-none">
            <GeometricTriangle color="orange" />
          </div>
          
          <div className="space-y-6 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              All <span className="text-primary">Articles</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              From quick social updates to in-depth guides—everything I&apos;m sharing, 
              each in its own style.
            </p>
          </div>
        </section>

        <RetroDivider />

        {/* SOCIAL FEED */}
        <SocialFeedSection />

        <RetroDivider />

        {/* MAGAZINE ARTICLES */}
        <MagazineSection />

        <RetroDivider />

        {/* EDITORIALS */}
        <EditorialsSection />

        <RetroDivider />

        {/* PHOTO GALLERY */}
        <PhotoGallerySection />

        {/* Bottom spacer */}
        <div className="h-20"></div>
      </div>
    </div>
  );
}
