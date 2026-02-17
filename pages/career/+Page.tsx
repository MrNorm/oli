import {
  RetroCard,
  RetroDivider,
  GeometricCircle,
  GeometricSquare,
} from "@/components/retro";
import { OptimizedImage } from "@/components/OptimizedImage";
import { calculateYearsSince } from "@/lib/utils";
import { Compass, TrendingUp, Sprout, Target, Zap, Network, Shield, Code2, Github, MapPin, Briefcase, ExternalLink } from "lucide-react";

export default function CareerPage() {
  const yearsOfExperience = calculateYearsSince('2009-03-01');

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
                      <div className="text-3xl font-bold text-primary">{yearsOfExperience}+</div>
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


        {/* Current Position */}
        <section className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="space-y-8">
            <h2 className="text-3xl sm:text-4xl font-bold">Current Position</h2>
            
            <RetroCard variant="bordered" className="bg-gradient-to-br from-primary/5 to-secondary/5">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                {/* Company Logo - Square variation */}
                <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 bg-background border-2 border-border rounded-lg flex items-center justify-center overflow-hidden">
                  {/* For square logos (current): w-20 h-20 sm:w-24 sm:h-24 */}
                  {/* For portrait logos: w-20 h-24 sm:w-24 sm:h-32 */}
                  {/* For landscape logos: w-32 h-20 sm:w-40 sm:h-24 */}
                  <OptimizedImage
                    src="/assets/evolution_funding_ltd_logo.jpg"
                    alt="Evolution Funding Logo"
                    width={96}
                    height={96}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                
                <div className="flex-1 flex flex-col sm:flex-row justify-between gap-4">
                  {/* Company Info */}
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-bold">Head of Engineering</h3>
                      <p className="text-xl text-muted-foreground">Evolution Funding</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>Chesterfield, UK</span>
                    </div>
                  </div>
                  
                  {/* Links */}
                  <div className="flex sm:flex-col items-start sm:items-end gap-3 sm:self-end">
                    <a 
                      href="https://www.evolutionfunding.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-background border-2 border-border rounded-md hover:border-primary hover:bg-primary/5 transition-all hover:scale-105"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Website
                    </a>
                    <a 
                      href="https://www.linkedin.com/company/evolution-funding-ltd" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-background border-2 border-border rounded-md hover:border-primary hover:bg-primary/5 transition-all hover:scale-105"
                    >
                      <Briefcase className="w-5 h-5" />
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </RetroCard>
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
                engineering organisations. Here&apos;s where I create the most impact today:
              </p>
            </div>
            
            <div className="space-y-6">
              <RetroCard variant="bordered" className="bg-primary/5">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Compass className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-bold">Engineering Leadership</h3>
                  </div>
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
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-bold">Team Scaling</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Growing teams from 5 to 50+ without losing culture or quality. 
                    I have experience in hiring at scale, onboarding effectively, 
                    and maintaining excellence as complexity grows.
                  </p>
                </div>
              </RetroCard>

              <RetroCard variant="bordered" className="bg-primary/5">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Sprout className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-bold">Mentoring & Development</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Investing in people is the most important work I do. I mentor people 
                    transitioning into leadership, help engineers level up their impact, and 
                    build frameworks that support continuous growth. 
                  </p>
                </div>
              </RetroCard>

              <RetroCard variant="bordered" className="bg-primary/5">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Target className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-bold">Cross-Functional Strategy</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Aligning engineering, product, design, and business stakeholders around 
                    shared goals. I translate between technical and business contexts and ensure engineering has a seat 
                    at a strategic level, not just execution.
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
                building teams, scaling organisations, and creating lasting impact.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Card 1 */}
              <RetroCard variant="bordered" className="bg-gradient-to-br from-teal-500/5 to-teal-500/10 hover:scale-[1.02] transition-transform">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Zap className="w-8 h-8 text-foreground flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">Focusing on Leverage, Not Long Hours</h3>
                      <div className="text-muted-foreground leading-relaxed space-y-3">
                        <p>
                          I don’t believe great engineering comes from people working longer hours. It comes from building the right environment around them.
                        </p>
                        <p>
                          I invest in clever hiring, clear standards, strong delivery practices, and tooling that removes friction. When expectations and boundaries are clear, teams move faster with less stress.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </RetroCard>

              {/* Card 2 */}
              <RetroCard variant="bordered" className="bg-gradient-to-br from-purple-500/5 to-purple-500/10 hover:scale-[1.02] transition-transform">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Network className="w-8 h-8 text-foreground flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">Designing Teams on Purpose</h3>
                      <div className="text-muted-foreground leading-relaxed space-y-3">
                        <p>
                          The way teams are structured shapes the systems they produce. I think carefully about ownership, boundaries, and how work flows. Clear accountability reduces confusion and increases confidence.
                        </p>
                        <p>
                          I prefer organising around meaningful domains so teams feel responsible for outcomes, not just tasks. I prioritise reducing friction, improving collaboration, and enabling autonomy without losing alignment.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </RetroCard>

              {/* Card 3 */}
              <RetroCard variant="bordered" className="bg-gradient-to-br from-orange-500/5 to-orange-500/10 hover:scale-[1.02] transition-transform">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-8 h-8 text-foreground flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">Building a Healthy, Accountable Culture</h3>
                      <div className="text-muted-foreground leading-relaxed space-y-3">
                        <p>
                          Culture shows up in everyday behaviour: how we handle incidents, how we disagree, and whether people feel safe speaking up. 
                        </p>
                        <p>
                          I care about psychological safety, but also about accountability. Teams should be comfortable raising risks, challenging assumptions, and admitting mistakes early.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </RetroCard>

              {/* Card 4 */}
              <RetroCard variant="bordered" className="bg-gradient-to-br from-pink-500/5 to-pink-500/10 hover:scale-[1.02] transition-transform">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Code2 className="w-8 h-8 text-foreground flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">Choosing Technology with Intent</h3>
                      <div className="text-muted-foreground leading-relaxed space-y-3">
                        <p>
                          I’m pragmatic about technology. I care less about trends and more about fit, longevity, and clarity of purpose. 
                        </p>
                        <p>
                          I encourage thoughtful trade-offs, modernising where it matters, keeping things simple where it works, and investing in automation and platforms that reduce manual effort and fragility over time.
                        </p>
                      </div>
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
                organisational design, and the challenges of scaling teams. Feel free to reach out.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">

              <a
                href="https://linkedin.com/in/olivernortham"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <RetroCard className="hover:scale-105 transition-transform text-center">
                  <div className="space-y-2">
                    <Briefcase className="w-6 h-6 mx-auto text-foreground" />
                    <div className="font-medium">LinkedIn</div>
                    <div className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
                      Professional network
                    </div>
                  </div>
                </RetroCard>
              </a>

              <a
                href="https://github.com/mrnorm"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <RetroCard className="hover:scale-105 transition-transform text-center">
                  <div className="space-y-2">
                    <Github className="w-6 h-6 mx-auto text-foreground" />
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
