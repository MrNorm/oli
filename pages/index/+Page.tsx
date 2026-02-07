import {
  RetroCard,
  RetroBadge,
  RetroDivider,
  Logo,
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
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight">
                Developer, designer,
                <br />
                <span className="text-primary">digital creator</span>
              </h1>
              <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-muted-foreground leading-relaxed">
                Building web experiences with modern tools and timeless design principles. 
                Exploring the intersection of code, creativity, and craft.
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
          {/* Recent Work */}
          <section className="space-y-8">
            <div className="flex items-end justify-between">
              <h2 className="text-2xl sm:text-3xl font-bold">Recent Work</h2>
              <a href="/demo" className="text-sm text-primary hover:text-primary/80 transition-colors">
                View all →
              </a>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <RetroCard variant="highlighted">
                <div className="space-y-3">
                  <RetroBadge variant="teal">Active</RetroBadge>
                  <h3 className="text-lg font-bold">Retro Component Library</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    An 80s-inspired UI kit built with React and Tailwind. Features geometric patterns and pastel colors.
                  </p>
                  <a href="/demo" className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors pt-1">
                    Explore →
                  </a>
                </div>
              </RetroCard>

              <RetroCard>
                <div className="space-y-3">
                  <RetroBadge variant="orange">Design</RetroBadge>
                  <h3 className="text-lg font-bold">Generative Art Toolkit</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    SVG-based creative coding tools for algorithmic design and pattern generation.
                  </p>
                  <span className="inline-block text-sm text-muted-foreground/60 pt-1">Coming soon</span>
                </div>
              </RetroCard>

              <RetroCard>
                <div className="space-y-3">
                  <RetroBadge variant="purple">Research</RetroBadge>
                  <h3 className="text-lg font-bold">Animation Lab</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Experiments with modern animation techniques and interactive micro-interactions.
                  </p>
                  <span className="inline-block text-sm text-muted-foreground/60 pt-1">In progress</span>
                </div>
              </RetroCard>
            </div>
          </section>

          <RetroDivider />

          {/* Writing */}
          <section className="space-y-8">
            <h2 className="text-2xl sm:text-3xl font-bold">Recent Writing</h2>
            
            <div className="space-y-4">
              <article className="group">
                <a href="#" className="block p-5 border-2 border-border/40 rounded-lg hover:border-primary/40 transition-colors">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <time>Feb 2026</time>
                      <span>·</span>
                      <span>5 min</span>
                    </div>
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                      Building Component Libraries with Intention
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Design decisions and architecture patterns for creating scalable, maintainable UI systems.
                    </p>
                  </div>
                </a>
              </article>

              <article className="group">
                <a href="#" className="block p-5 border-2 border-border/40 rounded-lg hover:border-primary/40 transition-colors">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <time>Jan 2026</time>
                      <span>·</span>
                      <span>7 min</span>
                    </div>
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                      Digital Gardens and Learning in Public
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Why I chose to grow ideas organically rather than publish polished blog posts.
                    </p>
                  </div>
                </a>
              </article>

              <article className="group">
                <a href="#" className="block p-5 border-2 border-border/40 rounded-lg hover:border-primary/40 transition-colors">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <time>Dec 2025</time>
                      <span>·</span>
                      <span>6 min</span>
                    </div>
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                      The Modern Web Stack in 2026
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Thoughts on frameworks, tooling, and where web development is headed next.
                    </p>
                  </div>
                </a>
              </article>
            </div>
          </section>

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