import { usePageContext } from "vike-react/usePageContext";
import {
  RetroCard,
  RetroBadge,
  RetroDivider,
  VHSCard,
  Polaroid,
  GeometricCircle,
  GeometricTriangle,
  GeometricSquare,
} from "@/components/retro";

interface Photo {
  url: string;
  caption: string;
}

interface Phase {
  title: string;
  period: string;
  completed: boolean;
  description: string;
  activities?: string[];
  photos?: Photo[];
}

interface Stat {
  value: string;
  label: string;
  subtitle?: string;
}

interface TimelineEvent {
  milestone: string;
  date: string;
  description: string;
  completed: boolean;
}

interface ProjectData {
  title: string;
  tagline: string;
  category: string;
  badgeVariant: "orange" | "teal" | "purple" | "pink";
  duration: string;
  status: string;
  accentColor: "orange" | "teal" | "purple" | "pink";
  vhsBrand: string;
  vhsModel: string;
  vhsFormat: string;
  vhsFooterTitle: string;
  vhsFooterSubtitle: string;
  vhsGradient: {
    top: string;
    middle: string;
    bottom: string;
  };
  overview: string[];
  goals: string[];
  challenges: string[];
  phases: Phase[];
  stats: Stat[];
  timeline: TimelineEvent[];
  tools?: string[];
}

export default function ProjectPage() {
  const pageContext = usePageContext();
  const slug = pageContext.routeParams.slug;

  // This is example data - in a real implementation, you'd fetch this based on the slug
  const project = getProjectData(slug);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Subtle grid background */}
      <div
        className="fixed inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 19px, currentColor 19px, currentColor 20px),
                           repeating-linear-gradient(90deg, transparent, transparent 19px, currentColor 19px, currentColor 20px)`,
        }}
      />

      {/* Main content */}
      <div className="relative z-10">
        {/* Hero/Title Section */}
        <section className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          {/* Decorative shapes */}
          <div className="absolute top-10 right-10 w-24 h-24 opacity-15 pointer-events-none">
            <GeometricCircle color={project.accentColor} />
          </div>

          <div className="space-y-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <a href="/" className="hover:text-foreground transition-colors">
                Home
              </a>
              <span>→</span>
              <a href="/#projects" className="hover:text-foreground transition-colors">
                Projects
              </a>
              <span>→</span>
              <span className="text-foreground">{project.title}</span>
            </nav>

            {/* Title and metadata */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <RetroBadge variant={project.badgeVariant} className="text-sm">
                  {project.category}
                </RetroBadge>
                <span className="text-sm text-muted-foreground">{project.duration}</span>
                <span className="text-sm text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">{project.status}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                {project.title}
              </h1>

              <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
                {project.tagline}
              </p>
            </div>

            {/* Featured VHS Card */}
            <div className="flex justify-center pt-4">
              <VHSCard
                brand={project.vhsBrand}
                model={project.vhsModel}
                format={project.vhsFormat}
                footerTitle={project.vhsFooterTitle}
                footerSubtitle={project.vhsFooterSubtitle}
                sphereGradient={project.vhsGradient}
              />
            </div>
          </div>
        </section>

        <RetroDivider />

        {/* Project Explanation Section */}
        <section className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="absolute bottom-10 left-10 w-20 h-20 opacity-10 pointer-events-none">
            <GeometricTriangle color={project.accentColor} />
          </div>

          <div className="space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-3xl sm:text-4xl font-bold">The Story</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                What this project is all about
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Main explanation */}
              <RetroCard className="lg:col-span-2">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Overview</h3>
                  <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                    {project.overview.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </RetroCard>

              {/* Goals */}
              <RetroCard>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    🎯 Goals
                  </h3>
                  <ul className="space-y-3">
                    {project.goals.map((goal, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-primary mt-1">▸</span>
                        <span className="text-muted-foreground">{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </RetroCard>

              {/* Challenges */}
              <RetroCard>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    🧗 Challenges
                  </h3>
                  <ul className="space-y-3">
                    {project.challenges.map((challenge, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-orange-500 mt-1">▸</span>
                        <span className="text-muted-foreground">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </RetroCard>
            </div>
          </div>
        </section>

        <RetroDivider />

        {/* Breakdown/Implementation Section */}
        <section className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="absolute top-20 right-20 w-28 h-28 opacity-10 pointer-events-none">
            <GeometricSquare color={project.accentColor} />
          </div>

          <div className="space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-3xl sm:text-4xl font-bold">Breakdown & Implementation</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                How it all came together
              </p>
            </div>

            {/* Implementation phases */}
            <div className="space-y-6">
              {project.phases.map((phase, idx) => (
                <RetroCard key={idx} className="hover:scale-[1.01] transition-transform">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-xl sm:text-2xl font-bold">{phase.title}</h3>
                          <RetroBadge
                            variant={phase.completed ? "teal" : "orange"}
                            className="text-xs"
                          >
                            {phase.completed ? "Completed" : "In Progress"}
                          </RetroBadge>
                        </div>
                        <p className="text-sm text-muted-foreground">{phase.period}</p>
                      </div>
                    </div>

                    <p className="text-base text-muted-foreground leading-relaxed">
                      {phase.description}
                    </p>

                    {/* Key activities */}
                    {phase.activities && phase.activities.length > 0 && (
                      <div className="pt-2">
                        <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wide mb-3">
                          Key Activities
                        </h4>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {phase.activities.map((activity, actIdx) => (
                            <div
                              key={actIdx}
                              className="flex items-center gap-2 text-sm text-muted-foreground"
                            >
                              <span className="text-primary">✓</span>
                              <span>{activity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Photo gallery for this phase */}
                    {phase.photos && phase.photos.length > 0 && (
                      <div className="pt-4">
                        <div className="flex gap-4 overflow-x-auto pb-2">
                          {phase.photos.map((photo, photoIdx) => (
                            <div key={photoIdx} className="flex-shrink-0">
                              <Polaroid
                                image={photo.url}
                                alt={photo.caption}
                                caption={photo.caption}
                                rotate={photoIdx % 2 === 0 ? -2 : 2}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </RetroCard>
              ))}
            </div>
          </div>
        </section>

        <RetroDivider />

        {/* Timeline and Stats Section */}
        <section className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-3xl sm:text-4xl font-bold">Timeline & Stats</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                By the numbers
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Stats cards */}
              {project.stats.map((stat, idx) => (
                <RetroCard key={idx} variant="bordered" className="text-center hover:scale-105 transition-transform">
                  <div className="space-y-2">
                    <div className="text-4xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm font-medium">{stat.label}</div>
                    {stat.subtitle && (
                      <div className="text-xs text-muted-foreground">{stat.subtitle}</div>
                    )}
                  </div>
                </RetroCard>
              ))}
            </div>

            {/* Timeline */}
            <RetroCard>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Project Timeline</h3>

                <div className="space-y-6">
                  {project.timeline.map((event, idx) => (
                    <div key={idx} className="flex gap-4">
                      {/* Timeline marker */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-4 h-4 rounded-full ${
                            event.completed ? "bg-primary" : "bg-muted-foreground/30"
                          } flex-shrink-0 mt-1`}
                        />
                        {idx < project.timeline.length - 1 && (
                          <div
                            className={`w-0.5 flex-1 mt-2 ${
                              event.completed ? "bg-primary/30" : "bg-muted-foreground/20"
                            }`}
                          />
                        )}
                      </div>

                      {/* Timeline content */}
                      <div className="flex-1 pb-8">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 flex-wrap">
                            <h4 className="font-bold text-lg">{event.milestone}</h4>
                            <span className="text-sm text-muted-foreground">{event.date}</span>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RetroCard>

            {/* Tech Stack / Tools Used */}
            {project.tools && project.tools.length > 0 && (
              <RetroCard variant="bordered">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Tools & Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool, idx) => (
                      <RetroBadge key={idx} variant="purple" className="text-sm">
                        {tool}
                      </RetroBadge>
                    ))}
                  </div>
                </div>
              </RetroCard>
            )}
          </div>
        </section>

        {/* Bottom spacer */}
        <div className="h-20"></div>
      </div>
    </div>
  );
}

// Example data structure - replace with actual data fetching
function getProjectData(slug: string): ProjectData {
  // This would normally fetch from a CMS, markdown files, or API
  const projects: Record<string, ProjectData> = {
    "home-renovation": {
      title: "Home Renovation",
      tagline: "Modernizing a 70s house into a contemporary living space",
      category: "Renovation",
      badgeVariant: "teal",
      duration: "2024 - Present",
      status: "In Progress",
      accentColor: "teal",
      vhsBrand: "HOME PROJECT",
      vhsModel: "RENOVATION 2024",
      vhsFormat: "EP MODE",
      vhsFooterTitle: "70s Revival",
      vhsFooterSubtitle: "Modern Makeover",
      vhsGradient: {
        top: "#4ecdc4",
        middle: "#556270",
        bottom: "#2c3e50",
      },
      overview: [
        "When we bought our 1970s house, it had all the charm of that era—wood paneling, shag carpeting, and an avocado-green bathroom. While nostalgic, it wasn't quite livable for modern life. This project documents our journey to transform the space while respecting its architectural bones.",
        "The goal isn't to erase the 70s character entirely, but to update it thoughtfully. We're keeping the mid-century elements that work—the exposed beams, the large windows, the open floor plan—while modernizing the finishes, improving energy efficiency, and creating spaces that work for how we actually live.",
      ],
      goals: [
        "Preserve the mid-century architectural features",
        "Improve energy efficiency and insulation",
        "Create an open, functional kitchen space",
        "Update bathrooms with modern fixtures",
        "Refinish original hardwood floors",
        "Add smart home features throughout",
      ],
      challenges: [
        "Working with outdated electrical systems",
        "Discovering (and fixing) hidden water damage",
        "Sourcing materials that match the aesthetic",
        "Balancing DIY work with professional contractors",
        "Staying on budget while maintaining quality",
      ],
      phases: [
        {
          title: "Phase 1: Assessment & Planning",
          period: "January - March 2024",
          completed: true,
          description:
            "Started with a comprehensive assessment of the house's condition. Brought in inspectors, contractors, and designers to understand what we were working with. Created detailed plans and budgets for each room.",
          activities: [
            "Full home inspection",
            "Electrical system audit",
            "Plumbing assessment",
            "Architectural measurements",
            "Budget planning",
            "Design mockups",
          ],
          photos: [
            {
              url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=400&fit=crop",
              caption: "Original living room",
            },
            {
              url: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=400&h=400&fit=crop",
              caption: "Kitchen before",
            },
          ],
        },
        {
          title: "Phase 2: Kitchen Renovation",
          period: "April - July 2024",
          completed: true,
          description:
            "Completely gutted and rebuilt the kitchen. Removed a non-load-bearing wall to open up the space to the dining area. Installed new cabinets, countertops, and appliances. Updated all plumbing and electrical to modern standards.",
          activities: [
            "Demolition and disposal",
            "Wall removal and framing",
            "Electrical rewiring",
            "Plumbing updates",
            "Cabinet installation",
            "Countertop fabrication",
            "Appliance integration",
            "Flooring installation",
          ],
          photos: [
            {
              url: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=400&h=400&fit=crop",
              caption: "Mid-construction",
            },
            {
              url: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=400&h=400&fit=crop",
              caption: "Finished kitchen",
            },
          ],
        },
        {
          title: "Phase 3: Bathroom Upgrades",
          period: "August - October 2024",
          completed: false,
          description:
            "Currently working on the main bathroom. Keeping the original cast-iron tub (it's a beauty!) but replacing everything else. Installing heated floors, a walk-in shower, and modern fixtures while maintaining a vintage aesthetic.",
          activities: [
            "Tile removal",
            "Heated floor installation",
            "Shower enclosure build",
            "Vanity replacement",
            "Lighting upgrades",
          ],
          photos: [],
        },
        {
          title: "Phase 4: Living Spaces & Finishing",
          period: "November 2024 - February 2025",
          completed: false,
          description:
            "Final phase includes refinishing the hardwood floors throughout, painting all walls and trim, updating light fixtures, and adding smart home features. This is where the house really comes together.",
          activities: [
            "Floor sanding and refinishing",
            "Interior painting",
            "Trim and molding updates",
            "Smart thermostat installation",
            "Lighting automation",
            "Final touches",
          ],
          photos: [],
        },
      ],
      stats: [
        {
          value: "9",
          label: "Months",
          subtitle: "So far",
        },
        {
          value: "3",
          label: "Rooms",
          subtitle: "Completed",
        },
        {
          value: "∞",
          label: "Trips to Home Depot",
          subtitle: "And counting...",
        },
      ],
      timeline: [
        {
          milestone: "Project Kickoff",
          date: "January 2024",
          description: "Closed on the house and began planning the renovation journey.",
          completed: true,
        },
        {
          milestone: "Kitchen Complete",
          date: "July 2024",
          description: "Finished the kitchen renovation—our first major milestone!",
          completed: true,
        },
        {
          milestone: "Bathroom Renovation",
          date: "October 2024",
          description: "Main bathroom updates in progress. Expected completion late October.",
          completed: false,
        },
        {
          milestone: "Floor Refinishing",
          date: "December 2024",
          description: "Scheduled to refinish all hardwood floors throughout the house.",
          completed: false,
        },
        {
          milestone: "Final Walkthrough",
          date: "February 2025",
          description: "Projected completion date for all major renovation work.",
          completed: false,
        },
      ],
      tools: [
        "SketchUp",
        "Contractor Pro",
        "Various Power Tools",
        "YouTube University",
        "Coffee (lots of it)",
      ],
    },
    "digital-projects": {
      title: "Digital Projects",
      tagline: "Building websites, blogs, and digital experiences",
      category: "Technology",
      badgeVariant: "orange",
      duration: "Ongoing",
      status: "Active",
      accentColor: "orange",
      vhsBrand: "DIGITAL LIFE",
      vhsModel: "WEB PROJECTS",
      vhsFormat: "INTERACTIVE",
      vhsFooterTitle: "Code & Create",
      vhsFooterSubtitle: "Sites & Events",
      vhsGradient: {
        top: "#ff9a76",
        middle: "#f76b8a",
        bottom: "#6b4f8a",
      },
      overview: [
        "This is an umbrella project covering all my digital creations—websites, blogs, side projects, and digital experiments. Each one teaches me something new about web development, design, or just how to ship things faster.",
        "From personal blogs to event websites to experimental UI libraries, this collection represents years of tinkering, learning, and building in public.",
      ],
      goals: [
        "Build and ship multiple web projects each year",
        "Experiment with new technologies and frameworks",
        "Share knowledge through blog posts and tutorials",
        "Create reusable components and tools",
        "Maintain and improve existing projects",
      ],
      challenges: [
        "Finding time to maintain all projects",
        "Keeping up with rapidly changing web technologies",
        "Balancing perfectionism with shipping",
        "Managing multiple codebases",
        "Staying motivated on long-term projects",
      ],
      phases: [
        {
          title: "Personal Portfolio Sites",
          period: "2020 - Present",
          completed: false,
          description:
            "Multiple iterations of personal portfolio sites, each one exploring different design aesthetics and technical approaches. The current retro-themed version is iteration #7.",
          activities: [
            "React & Vite setup",
            "Component library development",
            "Responsive design",
            "Performance optimization",
            "Content management",
          ],
          photos: [],
        },
        {
          title: "Blog Platform",
          period: "2021 - Present",
          completed: false,
          description:
            "Built a custom blog platform for sharing long-form content. Supports markdown, syntax highlighting, and a reading time estimator. Regularly publish articles about development and life.",
          activities: [
            "Markdown parser integration",
            "Syntax highlighting",
            "SEO optimization",
            "RSS feed generation",
            "Comment system",
          ],
          photos: [],
        },
        {
          title: "Event Websites",
          period: "2022 - 2024",
          completed: true,
          description:
            "Created several websites for local events and conferences. Focused on quick load times, mobile-first design, and easy content updates for non-technical organizers.",
          activities: [
            "Headless CMS integration",
            "Registration systems",
            "Schedule builders",
            "Sponsor showcases",
            "Photo galleries",
          ],
          photos: [],
        },
      ],
      stats: [
        {
          value: "12+",
          label: "Projects",
          subtitle: "Shipped to production",
        },
        {
          value: "7",
          label: "Technologies",
          subtitle: "Actively using",
        },
        {
          value: "∞",
          label: "Ideas",
          subtitle: "In the backlog",
        },
      ],
      timeline: [
        {
          milestone: "First Portfolio",
          date: "June 2020",
          description: "Launched my first personal portfolio site using vanilla HTML/CSS/JS.",
          completed: true,
        },
        {
          milestone: "Blog Launch",
          date: "March 2021",
          description: "Started writing regularly and built a custom blog platform.",
          completed: true,
        },
        {
          milestone: "Component Library",
          date: "September 2023",
          description: "Created a reusable retro component library for faster project starts.",
          completed: true,
        },
        {
          milestone: "Current Portfolio",
          date: "February 2026",
          description: "Latest iteration with VHS aesthetics and improved performance.",
          completed: true,
        },
      ],
      tools: [
        "React",
        "TypeScript",
        "Vite",
        "Tailwind CSS",
        "Vercel",
        "Figma",
        "VS Code",
        "Git",
      ],
    },
    "my-mind-and-me": {
      title: "My Mind & Me",
      tagline: "Navigating life with ADHD and sharing what I learn",
      category: "Personal Growth",
      badgeVariant: "purple",
      duration: "2022 - Present",
      status: "Ongoing",
      accentColor: "purple",
      vhsBrand: "SELF DISCOVERY",
      vhsModel: "ADHD JOURNEY",
      vhsFormat: "REFLECTION",
      vhsFooterTitle: "Brain Matters",
      vhsFooterSubtitle: "Understanding Me",
      vhsGradient: {
        top: "#c77dff",
        middle: "#9d4edd",
        bottom: "#5a189a",
      },
      overview: [
        "Getting diagnosed with ADHD in my late twenties changed everything. Suddenly, so many struggles made sense—the difficulty focusing, the constant feeling of being overwhelmed, the tendency to hyperfocus on projects and burn out.",
        "This 'project' isn't about building something tangible. It's about understanding myself better, developing systems that work with my brain instead of against it, and sharing what I learn along the way to help others who might be on a similar journey.",
      ],
      goals: [
        "Develop sustainable productivity systems",
        "Build better habits and routines",
        "Understand my triggers and patterns",
        "Share experiences to help others",
        "Reduce stigma around ADHD",
        "Find the right combination of strategies and support",
      ],
      challenges: [
        "Inconsistent energy levels and focus",
        "Executive dysfunction during low periods",
        "Finding the right medication balance",
        "Avoiding burnout from hyperfocus",
        "Managing time blindness",
        "Dealing with RSD (Rejection Sensitive Dysphoria)",
      ],
      phases: [
        {
          title: "Recognition & Diagnosis",
          period: "January - June 2022",
          completed: true,
          description:
            "After years of struggling and thinking 'everyone has these problems,' I finally sought an evaluation. The diagnosis was both validating and overwhelming—validating because it explained so much, overwhelming because now I had to learn how to work with it.",
          activities: [
            "Initial psychological evaluation",
            "Comprehensive ADHD testing",
            "Medical history review",
            "Diagnosis confirmation",
            "Started researching ADHD",
            "Joined support communities",
          ],
          photos: [],
        },
        {
          title: "Trial & Error",
          period: "July 2022 - December 2023",
          completed: true,
          description:
            "Spent over a year trying different approaches—medications, therapy, productivity systems, lifestyle changes. Some things helped, many didn't. Learned that what works for others might not work for me, and that's okay.",
          activities: [
            "Medication trials",
            "Cognitive Behavioral Therapy",
            "Bullet journaling experiments",
            "App-based task management",
            "Sleep routine optimization",
            "Diet and exercise changes",
          ],
          photos: [],
        },
        {
          title: "Finding What Works",
          period: "January 2024 - Present",
          completed: false,
          description:
            "Starting to find a rhythm that works. Combination of medication, external structure, body-doubling for difficult tasks, and being more compassionate with myself on rough days. Still learning, still adjusting.",
          activities: [
            "Stable medication routine",
            "Regular therapy check-ins",
            "Time-blocking strategies",
            "Environment optimization",
            "Regular exercise schedule",
            "Community engagement",
          ],
          photos: [],
        },
      ],
      stats: [
        {
          value: "2+",
          label: "Years",
          subtitle: "Since diagnosis",
        },
        {
          value: "8",
          label: "Strategies",
          subtitle: "That actually work",
        },
        {
          value: "∞",
          label: "Learning",
          subtitle: "Every single day",
        },
      ],
      timeline: [
        {
          milestone: "Initial Assessment",
          date: "February 2022",
          description: "First appointment with psychologist to discuss ADHD symptoms.",
          completed: true,
        },
        {
          milestone: "Official Diagnosis",
          date: "June 2022",
          description: "Received formal ADHD diagnosis after comprehensive testing.",
          completed: true,
        },
        {
          milestone: "Starting Medication",
          date: "August 2022",
          description: "Began medication trials to find what works best.",
          completed: true,
        },
        {
          milestone: "Therapy Breakthrough",
          date: "March 2023",
          description: "Major insights in therapy about past behaviors and coping mechanisms.",
          completed: true,
        },
        {
          milestone: "System That Works",
          date: "January 2024",
          description: "Found a sustainable combination of strategies and support.",
          completed: true,
        },
        {
          milestone: "Ongoing Journey",
          date: "Present",
          description: "Continuous learning and adaptation. It's not perfect, but it's progress.",
          completed: false,
        },
      ],
      tools: [
        "Therapy",
        "Medication",
        "Notion",
        "Calendar blocking",
        "Pomodoro technique",
        "White noise apps",
        "Support groups",
        "Journaling",
      ],
    },
  };

  return projects[slug] || projects["home-renovation"];
}
