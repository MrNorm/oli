import { useData } from "vike-react/useData";
import { VHSCard, RetroCard, GeometricCircle, GeometricTriangle, RetroBadge, ScanLines } from "@/components/retro";
import { renderLexicalContent } from "@/lib/lexical-renderer";

export default function ProjectComingSoonPage() {
  const { project } = useData<{
    project: {
      slug: string;
      projectName: string;
      caption: string;
      projectOverview: any;
    };
  }>();

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="fixed inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 19px, currentColor 19px, currentColor 20px),
                           repeating-linear-gradient(90deg, transparent, transparent 19px, currentColor 19px, currentColor 20px)`,
        }}
      />

      {/* Scan lines overlay for VHS effect */}
      <div className="fixed inset-0 z-20 pointer-events-none">
        <ScanLines />
      </div>

      {/* Decorative shapes */}
      <div className="absolute top-20 right-10 w-32 h-32 opacity-10 pointer-events-none animate-pulse">
        <GeometricCircle color="purple" />
      </div>
      <div className="absolute bottom-20 left-10 w-24 h-24 opacity-10 pointer-events-none animate-pulse">
        <GeometricTriangle color="orange" />
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12 sm:py-16">
        <div className="max-w-5xl w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* VHS Tape Cover */}
            <div className="flex justify-center lg:justify-end order-2 lg:order-1">
              <div className="relative">
                {/* Retro "glow" effect behind VHS */}
                <div className="absolute inset-0 bg-purple-500/20 blur-3xl scale-110 animate-pulse" />
                
                <VHSCard
                  brand={project.projectName.toUpperCase()}
                  brandSubtitle="FEATURE PRESENTATION"
                  model=""
                  format="STEREO · HI-FI"
                  footerTitle="RELEASING SOON"
                  footerSubtitle=""
                  sphereGradient={{
                    top: "#c77dff",
                    middle: "#9d4edd",
                    bottom: "#5a189a",
                  }}
                />
              </div>
            </div>

            {/* Coming Soon Text */}
            <div className="space-y-8 order-1 lg:order-2">
              <div className="space-y-6">
                {/* VHS-style "Rated" badge */}
                <div className="flex items-center gap-4">
                  <div className="px-4 py-2 border-4 border-white/80 bg-black/40 backdrop-blur-sm">
                    <div className="text-white font-bold text-2xl tracking-wider">
                      COMING SOON
                    </div>
                  </div>
                </div>

                {/* Title */}
                <div className="space-y-3">
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-none tracking-tight">
                    {project.projectName}
                  </h1>
                </div>

                {/* Project Overview */}
                {project.projectOverview && (
                  <RetroCard className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-sm font-mono text-red-400">REC</span>
                      </div>
                      
                      <div className="prose prose-invert prose-sm max-w-none">
                        {renderLexicalContent(project.projectOverview)}
                      </div>
                    </div>
                  </RetroCard>
                )}
              </div>

              {/* Call to action */}
              <div className="flex flex-wrap gap-4 pt-4">
                <a href="/">
                  <button className="px-6 py-3 bg-background border-2 border-primary text-foreground font-bold rounded hover:scale-105 transition-transform">
                    ◄◄ REWIND HOME
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
