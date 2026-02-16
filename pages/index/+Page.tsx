import {
  RetroCard,
  RetroDivider,
  Logo,
  VHSTapeSpine,
  RetroTV,
  GeometricCircle,
  GeometricTriangle,
  GeometricSquare,
} from "@/components/retro";
import { MegabyteItem, ByteItem, DailyPhotoItem } from "@/components/timeline";
import { useData } from "vike-react/useData";
import type { Data } from "./+data";
import { renderLexicalContent } from "@/lib/lexical-renderer";

export default function Page() {
  const { homepage } = useData<Data>();
  
  // Extract data with fallbacks
  const featuredMegabyte = homepage?.featuredMegabyte?.docs?.[0];
  const recentBytes = homepage?.recentBytes?.docs || [];
  const todayPhoto = homepage?.todayPhoto?.docs?.[0];
  const projects = homepage?.projects?.docs || [];
  const aboutMe = homepage?.aboutMe;
  
  // Colors for VHS tapes - rotate through retro colors
  const tapeColors = ["#4ecdc4", "#ff9a76", "#c77dff", "#ffd93d", "#ff6b9d", "#95e1d3"];
  
  // Random rotation for VHS tapes
  const getRotation = (index: number) => {
    const rotations = [-1, 0.8, -0.5, 0.6, -0.8, 0.4];
    return rotations[index % rotations.length];
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

        {/* LIFE REEL - Timeline Style Section */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
          {/* Decorative elements */}
          <div className="absolute top-10 right-20 w-20 h-20 opacity-10 pointer-events-none">
            <GeometricSquare color="purple" />
          </div>
          <div className="absolute bottom-20 left-10 w-28 h-28 opacity-10 pointer-events-none">
            <GeometricCircle color="orange" />
          </div>
          
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">What I&apos;m Sharing</h2>
            </div>
            
            {/* Timeline Container */}
            <div className="relative max-w-5xl mx-auto">
              {/* Vertical Timeline Line - VHS tape style */}
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/30 via-primary/50 to-primary/30 hidden md:block" />
              
              {/* Timeline Items */}
              <div className="space-y-12 relative">
                {/* Featured Article - Timeline Item */}
                {featuredMegabyte && (
                  <MegabyteItem
                    id={featuredMegabyte.id}
                    slug={featuredMegabyte.slug}
                    title={featuredMegabyte.title}
                    date={featuredMegabyte.date}
                    excerpt={featuredMegabyte.excerpt}
                    featuredImage={featuredMegabyte.featuredImage}
                    tags={featuredMegabyte.tags}
                  />
                )}

                {/* Daily Photo - Timeline Item with Polaroid */}
                {todayPhoto && todayPhoto.photo && (
                  <DailyPhotoItem
                    id={todayPhoto.id}
                    title={todayPhoto.title}
                    date={todayPhoto.date}
                    photo={todayPhoto.photo}
                    caption={todayPhoto.caption}
                    location={todayPhoto.location}
                  />
                )}

                {/* Recent Bytes - Compact Timeline Items */}
                {recentBytes.slice(0, 2).map((byte, index) => (
                  <ByteItem
                    key={byte.id}
                    id={byte.id}
                    date={byte.date}
                    content={byte.content}
                    attachedMedia={byte.attachedMedia}
                    tags={byte.tags}
                    colorIndex={index}
                  />
                ))}
              </div>
            </div>
            
            {/* View Full Timeline CTA */}
            <div className="text-center pt-8">
              <a 
                href="/activity" 
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-bold text-lg rounded-sm border-2 border-foreground shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px]"
              >
                <span>📼</span>
                <span>View Full Timeline</span>
                <span>→</span>
              </a>
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
            </div>
            
            {/* VHS Tape Stack - Centered and more prominent */}
            <div className="flex justify-center">
              <div className="space-y-4 w-full max-w-3xl">
                {projects.map((project, index) => (
                  <a 
                    key={project.id}
                    href={`/projects/${project.slug}`}
                    className="block transform hover:translate-x-4 transition-transform duration-200" 
                    style={{ transform: `rotate(${getRotation(index)}deg)` }}
                  >
                    <VHSTapeSpine
                      mainText={project.projectName}
                      mainTextColor={tapeColors[index % tapeColors.length]}
                      subtitleText={project.caption}
                    />
                  </a>
                ))}
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
            </div>
            
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
                {/* Headshot - Left side on desktop - 40% width */}
                <div className="lg:col-span-2 flex flex-col items-center lg:items-start justify-between h-full space-y-8">
                  <div className="w-full flex justify-center lg:justify-start">
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
                        <div className="text-muted-foreground">
                          {renderLexicalContent(aboutMe.content)}
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
