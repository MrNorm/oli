import {
  RetroCard,
  RetroBadge,
  RetroDivider,
  GeometricCircle,
  GeometricSquare,
} from "@/components/retro";

export default function CareerPage() {
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
        <section className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 lg:pb-24">
          {/* Decorative geometric shapes */}
          <div className="absolute top-20 right-10 w-32 h-32 opacity-10 pointer-events-none">
            <GeometricSquare color="teal" />
          </div>
          <div className="absolute bottom-10 left-10 w-28 h-28 opacity-10 pointer-events-none">
            <GeometricCircle color="purple" />
          </div>
          
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            {/* Left side - Title and intro - 60% */}
            <div className="lg:col-span-3 space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-sm">
                  <span className="text-sm font-medium text-primary">Head of Engineering</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                  Building Teams,<br/>
                  Scaling Impact
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  I&apos;m a Head of Engineering with a decade-plus journey from writing code to 
                  building high-performing teams. My focus has shifted from shipping features 
                  to creating the conditions where great work happens.
                </p>
              </div>
            </div>
            
            {/* Right side - Stats/Highlights - 40% */}
            <div className="lg:col-span-2">
              <RetroCard variant="bordered" className="bg-gradient-to-br from-primary/5 to-primary/10">
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wide">Experience</h3>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="text-3xl font-bold text-primary">10+</div>
                      <div className="text-sm text-muted-foreground">Years in Software Development</div>
                    </div>
                    <div className="h-px bg-border/50"></div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">▸</span>
                        <span className="text-sm">Engineering Leadership</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">▸</span>
                        <span className="text-sm">Organizational Design</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">▸</span>
                        <span className="text-sm">Team Scaling</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">▸</span>
                        <span className="text-sm">Mentoring & Strategy</span>
                      </div>
                    </div>
                  </div>
                </div>
              </RetroCard>
            </div>
          </div>
        </section>

        <RetroDivider />

        {/* What Drives Me */}
        <section className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="space-y-10">
            <h2 className="text-3xl sm:text-4xl font-bold">What Drives Me</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <RetroCard className="hover:scale-[1.02] transition-transform">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <RetroBadge variant="teal">Core Value</RetroBadge>
                  </div>
                  <h3 className="text-xl font-bold">Empathy-First Leadership</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Great engineering isn&apos;t just about technical excellence—it&apos;s about 
                    understanding people. I build cultures where engineers feel heard, 
                    challenged, and supported to do their best work.
                  </p>
                </div>
              </RetroCard>

              <RetroCard className="hover:scale-[1.02] transition-transform">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <RetroBadge variant="purple">Core Value</RetroBadge>
                  </div>
                  <h3 className="text-xl font-bold">Continuous Learning</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Technology evolves, and so should we. I&apos;m committed to staying curious, 
                    questioning assumptions, and creating environments where learning is 
                    built into the work itself.
                  </p>
                </div>
              </RetroCard>

              <RetroCard className="hover:scale-[1.02] transition-transform">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <RetroBadge variant="orange">Core Value</RetroBadge>
                  </div>
                  <h3 className="text-xl font-bold">High-Leverage Impact</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    I focus on work that multiplies: building systems that scale, making 
                    decisions that unlock teams, and investing time where it creates the 
                    most meaningful change.
                  </p>
                </div>
              </RetroCard>

              <RetroCard className="hover:scale-[1.02] transition-transform">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <RetroBadge variant="pink">Core Value</RetroBadge>
                  </div>
                  <h3 className="text-xl font-bold">Strategic Execution</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Vision without execution is just planning. I bridge product, engineering, 
                    and business goals by turning strategy into reality through clear 
                    roadmaps and cross-functional collaboration.
                  </p>
                </div>
              </RetroCard>
            </div>
          </div>
        </section>

        <RetroDivider />

        {/* My Focus Areas */}
        <section className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="absolute top-10 right-20 w-28 h-28 opacity-10 pointer-events-none">
            <GeometricSquare color="purple" />
          </div>
          
          <div className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold">My Focus Areas</h2>
              <p className="text-lg text-muted-foreground max-w-3xl">
                Over the past decade, I&apos;ve moved from individual contributor to leading 
                engineering organizations. Here&apos;s where I create the most impact today:
              </p>
            </div>
            
            <div className="space-y-6">
              <RetroCard variant="bordered" className="bg-primary/5">
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold">🧭 Engineering Leadership</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Leading engineering teams through growth, change, and complexity. I help 
                    teams build the right things the right way, balancing technical excellence 
                    with business impact. From setting technical vision to nurturing career 
                    growth, I create environments where engineers thrive.
                  </p>
                </div>
              </RetroCard>

              <RetroCard variant="bordered" className="bg-primary/5">
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold">🏗️ Organizational Design</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Building team structures that enable autonomy, ownership, and speed. I think 
                    deeply about how teams are organized, how work flows between them, and how 
                    to design systems that reduce friction and increase delivery. Conway&apos;s Law 
                    is real—let&apos;s make it work for us.
                  </p>
                </div>
              </RetroCard>

              <RetroCard variant="bordered" className="bg-primary/5">
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold">📈 Team Scaling</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Growing teams from 5 to 50+ without losing culture, quality, or velocity. 
                    I&apos;ve navigated the challenges of hiring at scale, onboarding effectively, 
                    and maintaining excellence as complexity grows. Scaling isn&apos;t just about 
                    headcount—it&apos;s about processes, culture, and communication.
                  </p>
                </div>
              </RetroCard>

              <RetroCard variant="bordered" className="bg-primary/5">
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold">🌱 Mentoring & Development</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Investing in people is the highest-leverage work I do. I mentor engineers 
                    transitioning into leadership, help senior ICs level up their impact, and 
                    build frameworks that support continuous growth. Great teams are built on 
                    great people—and great people need support to grow.
                  </p>
                </div>
              </RetroCard>

              <RetroCard variant="bordered" className="bg-primary/5">
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold">🎯 Cross-Functional Strategy</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Aligning engineering, product, design, and business stakeholders around 
                    shared goals. I translate between technical and business contexts, build 
                    roadmaps that reflect real priorities, and ensure engineering has a seat 
                    at the strategic table—not just execution.
                  </p>
                </div>
              </RetroCard>
            </div>
          </div>
        </section>

        <RetroDivider />

        {/* How I Think About Leadership */}
        <section className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="absolute bottom-10 left-10 w-24 h-24 opacity-10 pointer-events-none">
            <GeometricCircle color="orange" />
          </div>
          
          <div className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold">How I Think About Leadership</h2>
              <p className="text-lg text-muted-foreground max-w-3xl">
                Some of the mental models and frameworks that guide how I approach 
                building teams, scaling organizations, and creating lasting impact.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Card 1 */}
              <RetroCard variant="bordered" className="bg-gradient-to-br from-teal-500/5 to-teal-500/10 hover:scale-[1.02] transition-transform">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">⚡</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">Leverage Over Hours</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        The best engineering leaders multiply impact rather than just working harder. 
                        This means investing time in systems, processes, and people development—the 
                        things that create compounding returns. A great hire, a well-designed process, 
                        or a cultural norm can create value long after the initial investment.
                      </p>
                    </div>
                  </div>
                </div>
              </RetroCard>

              {/* Card 2 */}
              <RetroCard variant="bordered" className="bg-gradient-to-br from-purple-500/5 to-purple-500/10 hover:scale-[1.02] transition-transform">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">🏗️</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">Organizational Design as Strategy</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Conway&apos;s Law isn&apos;t just a fun observation—it&apos;s a design tool. How you structure 
                        teams directly impacts what they can build. I think deeply about team boundaries, 
                        communication patterns, and ownership models because getting the structure right 
                        unlocks autonomy, speed, and quality at scale.
                      </p>
                    </div>
                  </div>
                </div>
              </RetroCard>

              {/* Card 3 */}
              <RetroCard variant="bordered" className="bg-gradient-to-br from-orange-500/5 to-orange-500/10 hover:scale-[1.02] transition-transform">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">🌟</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">Culture Eats Strategy for Breakfast</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        You can have the best roadmap and the smartest engineers, but without psychological 
                        safety, trust, and shared values, execution suffers. Culture isn&apos;t ping pong tables—
                        it&apos;s how decisions get made, how feedback flows, and whether people feel empowered 
                        to take risks and learn from failure.
                      </p>
                    </div>
                  </div>
                </div>
              </RetroCard>

              {/* Card 4 */}
              <RetroCard variant="bordered" className="bg-gradient-to-br from-pink-500/5 to-pink-500/10 hover:scale-[1.02] transition-transform">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">💚</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">People First, Always</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Great products are built by great teams. Great teams are built by investing in people—
                        their growth, their autonomy, their sense of purpose. Mentoring, career development, 
                        and creating paths for people to do their best work isn&apos;t just &ldquo;nice to have&rdquo;—
                        it&apos;s the foundation of sustainable excellence.
                      </p>
                    </div>
                  </div>
                </div>
              </RetroCard>
            </div>
          </div>
        </section>

        <RetroDivider />

        {/* Connect Section */}
        <section className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="space-y-10">
            <div className="text-center space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold">Get in Touch</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                I&apos;m always interested in conversations about engineering leadership, 
                organizational design, and the challenges of scaling teams. Feel free to reach out.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <a
                href="mailto:your.email@example.com"
                className="group"
              >
                <RetroCard className="hover:scale-105 transition-transform text-center">
                  <div className="space-y-2">
                    <div className="text-2xl">✉️</div>
                    <div className="font-medium">Email</div>
                    <div className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
                      Get in touch
                    </div>
                  </div>
                </RetroCard>
              </a>

              <a
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <RetroCard className="hover:scale-105 transition-transform text-center">
                  <div className="space-y-2">
                    <div className="text-2xl">💼</div>
                    <div className="font-medium">LinkedIn</div>
                    <div className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
                      Professional network
                    </div>
                  </div>
                </RetroCard>
              </a>

              <a
                href="https://twitter.com/yourhandle"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <RetroCard className="hover:scale-105 transition-transform text-center">
                  <div className="space-y-2">
                    <div className="text-2xl">🐦</div>
                    <div className="font-medium">Twitter</div>
                    <div className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
                      Thoughts & threads
                    </div>
                  </div>
                </RetroCard>
              </a>

              <a
                href="https://github.com/yourhandle"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <RetroCard className="hover:scale-105 transition-transform text-center">
                  <div className="space-y-2">
                    <div className="text-2xl">💻</div>
                    <div className="font-medium">GitHub</div>
                    <div className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
                      Code & projects
                    </div>
                  </div>
                </RetroCard>
              </a>
            </div>
          </div>
        </section>

        {/* Bottom spacer */}
        <div className="h-20"></div>
      </div>
    </div>
  );
}
