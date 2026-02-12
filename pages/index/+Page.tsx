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
              <RetroCard className="hover:scale-[1.02] transition-transform lg:row-span-3">
                <div className="space-y-4 h-full flex flex-col">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
                    <RetroBadge variant="orange" className="text-xs">How-To</RetroBadge>
                    <time>Feb 2026</time>
                    <span>·</span>
                    <span>5 min read</span>
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
                    href="/posts/component-libraries" 
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    Read more →
                  </a>
                </div>
              </RetroCard>

              {/* Recent Posts - Right Side */}
              <RetroCard className="hover:scale-105 transition-transform">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                    <RetroBadge variant="teal" className="text-xs">Activity</RetroBadge>
                    <time>Feb 5, 2026</time>
                  </div>
                  <h3 className="text-lg font-bold">
                    Mountain Ridge Trail
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    15km hike through misty mountain trails. The views at the summit made every step worth it. 📸
                  </p>
                </div>
              </RetroCard>

              <RetroCard className="hover:scale-105 transition-transform">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                    <RetroBadge variant="purple" className="text-xs">Musing</RetroBadge>
                    <time>Feb 3, 2026</time>
                    <span>·</span>
                    <span>3 min read</span>
                  </div>
                  <h3 className="text-lg font-bold">
                    Digital Gardens
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Growing ideas organically in public, cultivating knowledge over time instead of polished perfection.
                  </p>
                </div>
              </RetroCard>

              <RetroCard className="hover:scale-105 transition-transform">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                    <RetroBadge variant="orange" className="text-xs">Photo</RetroBadge>
                    <time>Jan 29, 2026</time>
                  </div>
                  <h3 className="text-lg font-bold">
                    Coffee & Code
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Early morning setup. There's something peaceful about coding before the world wakes up. ☕
                  </p>
                </div>
              </RetroCard>
            </div>
            
            <div className="text-center">
              <a 
                href="/posts" 
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
                    <RetroTV
                      screenImage="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
                      size="md"
                      angled={true}
                      scanlineIntensity={0.3}
                    />
                  </div>
                  
                  {/* Stats Table */}
                  <RetroCard variant="bordered" className="w-full mt-8">
                    <div className="space-y-3">
                      <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wide">Quick Stats</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center py-1 border-b border-border/50">
                          <span className="text-muted-foreground">Location</span>
                          <span className="font-medium">Earth 🌍</span>
                        </div>
                        <div className="flex justify-between items-center py-1 border-b border-border/50">
                          <span className="text-muted-foreground">Current Focus</span>
                          <span className="font-medium">Building Things</span>
                        </div>
                        <div className="flex justify-between items-center py-1 border-b border-border/50">
                          <span className="text-muted-foreground">Favorite Tool</span>
                          <span className="font-medium">VS Code</span>
                        </div>
                        <div className="flex justify-between items-center py-1">
                          <span className="text-muted-foreground">Status</span>
                          <span className="font-medium flex items-center gap-1">
                            <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            Available
                          </span>
                        </div>
                      </div>
                    </div>
                  </RetroCard>
                </div>
                
                {/* Stats & Info - Right side on desktop - 60% width */}
                <div className="lg:col-span-3 space-y-8">
                  
                  {/* Personal Description */}
                  <RetroCard className="hover:scale-[1.02] transition-transform">
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold">Beyond the Keyboard</h3>
                      <p className="text-base text-muted-foreground leading-relaxed">
                        When I'm not building digital experiences, you'll find me hiking mountain 
                        trails with my camera, elbow-deep in home renovation projects, or exploring 
                        how my ADHD brain shapes the way I create and problem-solve. I believe in 
                        learning by doing, sharing the journey, and embracing the messy middle of 
                        any project.
                      </p>
                      <p className="text-base text-muted-foreground leading-relaxed">
                        When I'm not building digital experiences, you'll find me hiking mountain 
                        trails with my camera, elbow-deep in home renovation projects, or exploring 
                        how my ADHD brain shapes the way I create and problem-solve. I believe in 
                        learning by doing, sharing the journey, and embracing the messy middle of 
                        any project.
                      </p>
                      <p className="text-base text-muted-foreground leading-relaxed">
                        When I'm not building digital experiences, you'll find me hiking mountain 
                        trails with my camera, elbow-deep in home renovation projects, or exploring 
                        how my ADHD brain shapes the way I create and problem-solve. I believe in 
                        learning by doing, sharing the journey, and embracing the messy middle of 
                        any project.
                      </p>
                    </div>
                  </RetroCard>
                  
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
