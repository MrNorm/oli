import {
  RetroCard,
  RetroBadge,
  RetroDivider,
  Logo,
  VHSTapeSpine,
  Polaroid,
  RetroTV,
  ChevronPattern,
  GeometricCircle,
  GeometricTriangle,
  GeometricSquare,
} from "@/components/retro";
import { OptimizedImage } from "@/components/OptimizedImage";
import { useData } from "vike-react/useData";
import type { Data } from "./+data";

export default function Page() {
  const { homepage } = useData<Data>();
  
  // Extract data with fallbacks
  const featuredMegabyte = homepage?.featuredMegabyte?.docs?.[0];
  const recentBytes = homepage?.recentBytes?.docs || [];
  const todayPhoto = homepage?.todayPhoto?.docs?.[0];
  const aboutMe = homepage?.aboutMe;
  
  // Simple helper to extract text from Payload's rich text JSON
  const extractTextFromRichText = (content: any): string => {
    if (!content || !content.root) return '';
    
    const extractFromNode = (node: any): string => {
      if (node.type === 'text') return node.text || '';
      if (node.children) {
        return node.children.map((child: any) => extractFromNode(child)).join(' ');
      }
      return '';
    };
    
    return extractFromNode(content.root);
  };
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
        {/* Hero Section - Much Larger and More Prominent */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          {/* Decorative geometric shapes in background */}
          <div className="absolute top-20 right-10 w-32 h-32 opacity-20 pointer-events-none">
            <GeometricCircle color="teal" />
          </div>
          <div className="absolute bottom-10 left-10 w-24 h-24 opacity-15 pointer-events-none">
            <GeometricTriangle color="orange" />
          </div>
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 sm:gap-26 lg:gap-16">
            {/* Logo - Bigger */}
            <div className="flex-shrink-0 px-16 py-4">
              <a href="/" className="inline-block hover:opacity-80 transition-opacity">
                <Logo variant="header" className="scale-125 sm:scale-150 lg:scale-[1.75]" />
              </a>
            </div>
            
            {/* Hero content - More spacious */}
            <div className="space-y-6 lg:space-y-8 flex-1 max-w-3xl text-center lg:text-left">
              <h1 className="text-3xl sm:text-3xl md:text-3xl lg:text-5xl font-bold tracking-tight leading-tight">
                Code meets <span className="text-primary">curiosity.</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-muted-foreground leading-relaxed">
                Making software and hardware work for me and having fun while doing it. I explore new ideas, build things, write about them, and share what I learn along the way.
              </p>
            </div>
          </div>
        </section>

        <RetroDivider />

        {/* WHAT I'M SHARING - Full Width Section */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
          {/* Decorative element */}
          <div className="absolute top-10 right-20 w-20 h-20 opacity-10 pointer-events-none">
            <GeometricSquare color="purple" />
          </div>
          
          <div className="space-y-10">
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">What I'm Sharing</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Photos, musings, how-tos, and moments from daily life
              </p>
            </div>
            
            {/* Featured + Recent Grid */}
            <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {/* Featured Post - Left Side */}
              {featuredMegabyte && (
                <RetroCard className="hover:scale-[1.02] transition-transform lg:row-span-3">
                  <div className="space-y-4 h-full flex flex-col">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
                      <RetroBadge variant="orange" className="text-xs">Megabyte</RetroBadge>
                      <time>{new Date(featuredMegabyte.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</time>
                      {featuredMegabyte.tags && featuredMegabyte.tags.length > 0 && (
                        <>
                          <span>·</span>
                          <span>{featuredMegabyte.tags[0]}</span>
                        </>
                      )}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold">
                      {featuredMegabyte.title}
                    </h3>
                    {featuredMegabyte.featuredImage && (
                      <OptimizedImage 
                        src={featuredMegabyte.featuredImage.url || ''} 
                        alt={featuredMegabyte.featuredImage.alt}
                        width={800}
                        responsive="medium"
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="w-full h-48 object-cover rounded"
                      />
                    )}
                    <div className="flex-1" />
                    <a 
                      href={`/articles/${featuredMegabyte.id}`}
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                    >
                      Read more →
                    </a>
                  </div>
                </RetroCard>
              )}

              {/* Recent Posts - Right Side */}
              {recentBytes.slice(0, 3).map((byte) => {
                const tagColors: Record<number, 'teal' | 'purple' | 'orange'> = { 0: 'teal', 1: 'purple', 2: 'orange' };
                const index = recentBytes.indexOf(byte);
                
                return (
                  <RetroCard key={byte.id} className="hover:scale-105 transition-transform">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                        <RetroBadge variant={tagColors[index] || 'teal'} className="text-xs">
                          {byte.tags?.[0] || 'Byte'}
                        </RetroBadge>
                        <time>{new Date(byte.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
                      </div>
                      <div className="text-sm text-foreground leading-relaxed">
                        {byte.content.substring(0, 150)}{byte.content.length > 150 ? '...' : ''}
                      </div>
                      {byte.attachedMedia && (
                        <OptimizedImage 
                          src={byte.attachedMedia.url || ''} 
                          alt={byte.attachedMedia.alt}
                          width={600}
                          responsive="small"
                          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                          className="w-full h-32 object-cover rounded mt-2"
                        />
                      )}
                    </div>
                  </RetroCard>
                );
              })}
            </div>
            
            <div className="text-center">
              <a 
                href="/articles" 
                className="inline-flex items-center gap-2 text-lg text-primary hover:text-primary/80 transition-colors font-medium"
              >
                View all posts →
              </a>
            </div>
          </div>
        </section>

        <RetroDivider />

        {/* MY DAILY PHOTO - Full Width Section */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
          {/* Decorative elements */}
          <div className="absolute bottom-20 left-10 w-28 h-28 opacity-10 pointer-events-none">
            <GeometricCircle color="orange" />
          </div>
          
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">My Daily Photo</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                One photo every day. Capturing moments, big and small.
              </p>
            </div>
            
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Polaroid Photo - Left side on desktop */}
                <div className="flex justify-center lg:justify-end order-2 lg:order-1">
                  <div className="w-80 sm:w-96">
                    {todayPhoto && todayPhoto.photo && (
                      <Polaroid
                        image={todayPhoto.photo.url || ''}
                        alt={todayPhoto.photo.alt}
                        caption={new Date(todayPhoto.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        rotate={-2}
                      />
                    )}
                  </div>
                </div>
                
                {/* Photo Details - Right side on desktop */}
                <div className="space-y-6 order-1 lg:order-2">
                  {todayPhoto && (
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-bold mb-4">{todayPhoto.title}</h3>
                      {todayPhoto.caption && (
                        <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                          {todayPhoto.caption}
                        </p>
                      )}
                      {todayPhoto.location && (
                        <p className="text-sm text-muted-foreground mt-2">
                          📍 {todayPhoto.location}
                        </p>
                      )}
                    </div>
                  )}
                  
                  <a 
                    href="/photos" 
                    className="inline-flex items-center gap-2 text-lg text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    View all photos →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <RetroDivider />

        {/* PROJECT COLLECTION - Full Width Section */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
          {/* Decorative element */}
          <div className="absolute top-20 right-10 w-24 h-24 opacity-10 pointer-events-none">
            <GeometricTriangle color="pink" />
          </div>
          
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Project Collection</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Deep dives into renovation, digital creation, and personal growth
              </p>
            </div>
            
            {/* VHS Tape Stack - Centered and more prominent */}
            <div className="flex justify-center">
              <div className="space-y-4 w-full max-w-3xl">
                <a 
                  href="/projects/home-renovation"
                  className="block transform hover:translate-x-4 transition-transform duration-200" 
                  style={{ transform: 'rotate(-1deg)' }}
                >
                  <VHSTapeSpine
                    mainText="Home Renovation"
                    mainTextColor="#4ecdc4"
                    subtitleText="Modernizing a 70s house"
                  />
                </a>
                <a 
                  href="/projects/digital-projects"
                  className="block transform hover:translate-x-4 transition-transform duration-200" 
                  style={{ transform: 'rotate(0.8deg)' }}
                >
                  <VHSTapeSpine
                    mainText="Digital Projects"
                    mainTextColor="#ff9a76"
                    subtitleText="Sites, blogs & events"
                  />
                </a>
                <a 
                  href="/projects/my-mind-and-me"
                  className="block transform hover:translate-x-4 transition-transform duration-200" 
                  style={{ transform: 'rotate(-0.5deg)' }}
                >
                  <VHSTapeSpine
                    mainText="My Mind & Me"
                    mainTextColor="#c77dff"
                    subtitleText="ADHD discovery"
                  />
                </a>
              </div>
            </div>
          </div>
        </section>

        <RetroDivider />

        {/* ABOUT ME - Full Width Section */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-20 h-20 opacity-10 pointer-events-none">
            <GeometricCircle color="teal" />
          </div>
          
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">About Me</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A glimpse into who I am, beyond the code
              </p>
            </div>
            
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
                {/* Headshot - Left side on desktop - 40% width */}
                <div className="lg:col-span-2 flex flex-col items-center lg:items-start justify-between h-full space-y-8">
                  <div className="w-full">
                    {aboutMe && aboutMe.photo && (
                      <RetroTV
                        screenImage={aboutMe.photo.url || ''}
                        size="md"
                        angled={true}
                        scanlineIntensity={0.3}
                      />
                    )}
                  </div>
                  
                  {/* Stats Table */}
                  {aboutMe && aboutMe.quickStats && aboutMe.quickStats.length > 0 && (
                    <RetroCard variant="bordered" className="w-full mt-8">
                      <div className="space-y-3">
                        <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wide">Quick Stats</h4>
                        <div className="space-y-2 text-sm">
                          {aboutMe.quickStats.map((stat, index) => (
                            <div 
                              key={stat.id || index} 
                              className={`flex justify-between items-center py-1 ${
                                index < aboutMe.quickStats!.length - 1 ? 'border-b border-border/50' : ''
                              }`}
                            >
                              <span className="text-muted-foreground">{stat.key}</span>
                              <span className="font-medium">{stat.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </RetroCard>
                  )}
                </div>
                
                {/* Stats & Info - Right side on desktop - 60% width */}
                <div className="lg:col-span-3 space-y-8">
                  
                  {/* Personal Description */}
                  {aboutMe && aboutMe.content && (
                    <RetroCard className="hover:scale-[1.02] transition-transform">
                      <div className="space-y-4">
                        <h3 className="text-xl font-bold">{aboutMe.title}</h3>
                        <div className="text-base text-muted-foreground leading-relaxed">
                          {extractTextFromRichText(aboutMe.content)}
                        </div>
                      </div>
                    </RetroCard>
                  )}
                  
                  {/* Professional Career Link */}
                  <RetroCard variant="bordered" className="hover:scale-[1.02] transition-transform bg-primary/5">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold">My Professional Journey</h3>
                        <p className="text-sm text-muted-foreground">
                          Explore my career timeline, skills, and professional achievements
                        </p>
                      </div>
                      <a 
                        href="/career" 
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium rounded-sm border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] whitespace-nowrap"
                      >
                        View Career Details →
                      </a>
                    </div>
                  </RetroCard>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom spacer */}
        <div className="h-20"></div>
      </div>
    </div>
  );
}
