import {
  RetroCard,
  RetroBadge,
  RetroDivider,
  Logo,
  VHSTapeSpine,
  Polaroid,
  ChevronPattern,
  GeometricCircle,
  GeometricTriangle,
  GeometricSquare,
} from "@/components/retro";

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
              <div className="flex flex-wrap gap-3 pt-2 sm:pt-4 justify-center lg:justify-start">
                <RetroBadge variant="teal">React</RetroBadge>
                <RetroBadge variant="orange">TypeScript</RetroBadge>
                <RetroBadge variant="purple">Design Systems</RetroBadge>
              </div>
            </div>
          </div>
        </section>

        <RetroDivider />

        {/* RECENT WRITING - Full Width Section */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
          {/* Decorative element */}
          <div className="absolute top-10 right-20 w-20 h-20 opacity-10 pointer-events-none">
            <GeometricSquare color="purple" />
          </div>
          
          <div className="space-y-10">
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Recent Writing</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Thoughts on design, development, and everything in between
              </p>
            </div>
            
            {/* Featured + Recent Grid */}
            <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
              {/* Featured Article - Left Side */}
              <RetroCard className="hover:scale-[1.02] transition-transform lg:row-span-3">
                <div className="space-y-4 h-full flex flex-col">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <RetroBadge variant="teal" className="text-xs">Featured</RetroBadge>
                    <time>Feb 2026</time>
                    <span>·</span>
                    <span>5 min</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold">
                    Building Retro Component Libraries
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed flex-1">
                    Design patterns for scalable UI systems that grow with your application. 
                    Exploring how to create reusable, accessible, and maintainable components 
                    that capture the aesthetic of retro computing while meeting modern web standards.
                  </p>
                  <a 
                    href="/writing/component-libraries" 
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    Read more →
                  </a>
                </div>
              </RetroCard>

              {/* Recent Articles - Right Side */}
              <RetroCard className="hover:scale-105 transition-transform">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <time>Jan 2026</time>
                    <span>·</span>
                    <span>7 min</span>
                  </div>
                  <h3 className="text-lg font-bold">
                    Digital Gardens
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Growing ideas organically in public, cultivating knowledge over time.
                  </p>
                </div>
              </RetroCard>

              <RetroCard className="hover:scale-105 transition-transform">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <time>Jan 2026</time>
                    <span>·</span>
                    <span>6 min</span>
                  </div>
                  <h3 className="text-lg font-bold">
                    Modern Web Stack
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Exploring frameworks and tooling that shape web development today.
                  </p>
                </div>
              </RetroCard>

              <RetroCard className="hover:scale-105 transition-transform">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <time>Dec 2025</time>
                    <span>·</span>
                    <span>8 min</span>
                  </div>
                  <h3 className="text-lg font-bold">
                    Accessibility First
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Why building inclusive experiences should be a priority from day one.
                  </p>
                </div>
              </RetroCard>
            </div>
            
            <div className="text-center">
              <a 
                href="/writing" 
                className="inline-flex items-center gap-2 text-lg text-primary hover:text-primary/80 transition-colors font-medium"
              >
                View all articles →
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
                    <Polaroid
                      image="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=400&fit=crop"
                      alt="Today's photo"
                      caption="Feb 7, 2026"
                      rotate={-2}
                    />
                  </div>
                </div>
                
                {/* Photo Details - Right side on desktop */}
                <div className="space-y-6 order-1 lg:order-2">
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-bold mb-4">Golden Hour Walk</h3>
                    <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                      Caught the perfect light during my evening walk today. The way the sun 
                      hits the trees at this time of year never gets old. Sometimes the best 
                      moments are the quiet ones. There's something magical about how ordinary 
                      scenes transform in the golden hour.
                    </p>
                  </div>
                  
                  <a 
                    href="/daily-photo" 
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
                <div className="transform hover:translate-x-4 transition-transform duration-200" style={{ transform: 'rotate(-1deg)' }}>
                  <VHSTapeSpine
                    mainText="Home Renovation"
                    mainTextColor="#4ecdc4"
                    subtitleText="Modernizing a 70s house"
                  />
                </div>
                <div className="transform hover:translate-x-4 transition-transform duration-200" style={{ transform: 'rotate(0.8deg)' }}>
                  <VHSTapeSpine
                    mainText="Digital Projects"
                    mainTextColor="#ff9a76"
                    subtitleText="Sites, blogs & events"
                  />
                </div>
                <div className="transform hover:translate-x-4 transition-transform duration-200" style={{ transform: 'rotate(-0.5deg)' }}>
                  <VHSTapeSpine
                    mainText="My Mind & Me"
                    mainTextColor="#c77dff"
                    subtitleText="ADHD discovery"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <RetroDivider />

        {/* CONNECT - Full Width Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Let's Connect</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                I'm always excited to chat about projects, ideas, and opportunities
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <RetroCard variant="bordered" className="hover:scale-105 transition-transform">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">About Me</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    I'm passionate about creating beautiful, accessible web experiences. 
                    Always learning, always building, always curious.
                  </p>
                </div>
              </RetroCard>

              <RetroCard className="hover:scale-105 transition-transform">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Find Me Online</h3>
                  <div className="flex flex-col gap-3 text-base">
                    <a href="https://github.com" className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2">
                      <span>→</span> GitHub
                    </a>
                    <a href="https://twitter.com" className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2">
                      <span>→</span> Twitter
                    </a>
                    <a href="mailto:hello@example.com" className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2">
                      <span>→</span> Email
                    </a>
                  </div>
                </div>
              </RetroCard>

              <RetroCard variant="bordered" className="hover:scale-105 transition-transform sm:col-span-2 lg:col-span-1">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Currently</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-primary">▸</span>
                      <span className="text-muted-foreground">Building retro UI components</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-primary">▸</span>
                      <span className="text-muted-foreground">Renovating a 1970s home</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-primary">▸</span>
                      <span className="text-muted-foreground">Learning about ADHD</span>
                    </div>
                  </div>
                </div>
              </RetroCard>
            </div>
          </div>
        </section>

        {/* Bottom spacer */}
        <div className="h-20"></div>
      </div>
    </div>
  );
}
