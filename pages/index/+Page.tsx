import {
  RetroCard,
  RetroBadge,
  RetroDivider,
  Logo,
  VHSTapeSpine,
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
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="flex flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-24">
            {/* Logo */}
            <div className="flex-shrink-0 pr-4 sm:pr-6 lg:pr-12">
              <a href="/" className="inline-block hover:opacity-80 transition-opacity">
                <Logo variant="header" className="scale-75 sm:scale-90 lg:scale-110" />
              </a>
            </div>
            
            {/* Hero content */}
            <div className="space-y-3 sm:space-y-4 lg:space-y-6 flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl  font-bold tracking-tight leading-tight">
                Engineer, tinkerer,
                <br />
                <span className="text-primary">forward thinker.</span>
              </h1>
              <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-muted-foreground leading-relaxed">
                Making software and hardware work for me and having fun while doing it. I explore new ideas, build things, write about them, and share what I learn along the way.
              </p>
              <div className="flex flex-wrap gap-2 pt-1 sm:pt-2">
                <RetroBadge variant="teal">React</RetroBadge>
                <RetroBadge variant="orange">TypeScript</RetroBadge>
                <RetroBadge variant="purple">Design Systems</RetroBadge>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-20">
          
          {/* Writing & Collection Side by Side */}
          <div className="grid lg:grid-cols-10 gap-12 lg:gap-16">
            {/* Writing */}
            <section className="space-y-6 lg:col-span-4">
                <h2 className="text-2xl sm:text-3xl font-bold">Recent Writing</h2>
                
                <div className="space-y-4">
                  <RetroCard>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <time>Feb 2026</time>
                        <span>·</span>
                        <span>5 min</span>
                      </div>
                      <h3 className="text-base font-bold">
                        Component Libraries
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Design patterns for scalable UI systems.
                      </p>
                    </div>
                  </RetroCard>

                  <RetroCard>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <time>Jan 2026</time>
                        <span>·</span>
                        <span>7 min</span>
                      </div>
                      <h3 className="text-base font-bold">
                        Digital Gardens
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Growing ideas organically.
                      </p>
                    </div>
                  </RetroCard>

                  <RetroCard>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <time>Dec 2025</time>
                        <span>·</span>
                        <span>6 min</span>
                      </div>
                      <h3 className="text-base font-bold">
                        Modern Web Stack
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Frameworks and tooling.
                      </p>
                    </div>
                  </RetroCard>
                </div>
              </section>

              {/* Collection */}
              <section className="space-y-6 lg:col-span-6">
                <h2 className="text-2xl sm:text-3xl font-bold">Project Collection</h2>
                <p className="text-sm text-muted-foreground">
                  Deep dives into renovation, digital creation, and personal growth.
                </p>
                
                {/* VHS Tape Stack */}
                <div className="space-y-3">
                  <div className="transform hover:translate-x-2 transition-transform duration-200" style={{ transform: 'rotate(-1deg)' }}>
                    <VHSTapeSpine
                      mainText="Home Renovation"
                      mainTextColor="#4ecdc4"
                      subtitleText="Modernizing a 70s house"
                    />
                  </div>
                  <div className="transform hover:translate-x-2 transition-transform duration-200" style={{ transform: 'rotate(0.8deg)' }}>
                    <VHSTapeSpine
                      mainText="Digital Projects"
                      mainTextColor="#ff9a76"
                      subtitleText="Sites, blogs & events"
                    />
                  </div>
                  <div className="transform hover:translate-x-2 transition-transform duration-200" style={{ transform: 'rotate(-0.5deg)' }}>
                    <VHSTapeSpine
                      mainText="My Mind & Me"
                      mainTextColor="#c77dff"
                      subtitleText="ADHD discovery"
                    />
                  </div>
                </div>
              </section>
            </div>

          <RetroDivider />

          {/* Connect */}
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold">Let's Connect</h2>
            
            <div className="grid sm:grid-cols-2 gap-5 max-w-3xl">
              <RetroCard variant="bordered">
                <div className="space-y-3">
                  <h3 className="text-lg font-bold">About Me</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    I'm passionate about creating beautiful, accessible web experiences. 
                    Always learning, always building.
                  </p>
                </div>
              </RetroCard>

              <RetroCard>
                <div className="space-y-3">
                  <h3 className="text-lg font-bold">Find Me Online</h3>
                  <div className="flex flex-col gap-2 text-sm">
                    <a href="https://github.com" className="text-primary hover:text-primary/80 transition-colors">
                      GitHub
                    </a>
                    <a href="https://twitter.com" className="text-primary hover:text-primary/80 transition-colors">
                      Twitter
                    </a>
                    <a href="mailto:hello@example.com" className="text-primary hover:text-primary/80 transition-colors">
                      Email
                    </a>
                  </div>
                </div>
              </RetroCard>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}