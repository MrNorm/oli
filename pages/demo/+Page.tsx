import {
  RetroButton,
  RetroCard,
  RetroBadge,
  RetroInput,
  RetroTextarea,
  RetroDivider,
  VHSCard,
  VHSTapeSpine,
  Logo,
  ChevronPattern,
  GridPattern,
  ScanLines,
  GeometricCircle,
  GeometricTriangle,
  GeometricSquare,
  BlueprintLines,
  Polaroid,
  RetroTV,
} from "@/components/retro";

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Background elements */}
      <div className="fixed inset-0 z-0 opacity-30">
        <GridPattern />
      </div>
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ScanLines />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 space-y-16">
        {/* Header */}
        <header className="text-center space-y-6">
          <div className="relative inline-block">
            <ChevronPattern className="w-64 h-32 mx-auto opacity-70" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              RETRO COMPONENT LIBRARY
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A collection of 80s-inspired UI components with pastel colors,
            geometric shapes, and subtle blueprint aesthetics
          </p>
        </header>

        <RetroDivider variant="gradient" />

        {/* VHS Logo Showcase */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold uppercase tracking-wide text-center">
            VHS Logo Components
          </h2>
          
          {/* Icon Only */}
          <div className="flex flex-col items-center gap-4 p-8 bg-black/50 rounded-lg border border-primary/30">
            <h3 className="text-xl font-bold text-primary">Icon Variant</h3>
            <Logo variant="icon" />
          </div>

          {/* Header Variant */}
          <div className="flex flex-col items-center gap-4 p-12 bg-black/50 rounded-lg border border-secondary/30">
            <h3 className="text-xl font-bold text-secondary">Header Variant</h3>
            <Logo variant="header" />
          </div>

          {/* Footer Variant */}
          <div className="flex flex-col items-center gap-4 p-8 bg-black/50 rounded-lg border border-accent/30">
            <h3 className="text-xl font-bold text-accent">Footer Variant</h3>
            <Logo variant="footer" />
          </div>
        </section>

        <RetroDivider variant="gradient" />

        {/* Colors Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold uppercase tracking-wide">
            Color Palette
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-32 bg-primary rounded border-2 border-primary shadow-[0_0_20px_rgba(78,205,196,0.4)]" />
              <p className="text-sm font-mono text-center">Teal</p>
            </div>
            <div className="space-y-2">
              <div className="h-32 bg-secondary rounded border-2 border-secondary shadow-[0_0_20px_rgba(255,154,118,0.4)]" />
              <p className="text-sm font-mono text-center">Orange</p>
            </div>
            <div className="space-y-2">
              <div className="h-32 bg-accent rounded border-2 border-accent shadow-[0_0_20px_rgba(199,125,255,0.4)]" />
              <p className="text-sm font-mono text-center">Purple</p>
            </div>
            <div className="space-y-2">
              <div className="h-32 bg-[#ff6b9d] rounded border-2 border-[#ff6b9d] shadow-[0_0_20px_rgba(255,107,157,0.4)]" />
              <p className="text-sm font-mono text-center">Pink</p>
            </div>
          </div>
        </section>

        <RetroDivider />

        {/* Buttons Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold uppercase tracking-wide">
            Buttons
          </h2>
          <div className="flex flex-wrap gap-4">
            <RetroButton>Default</RetroButton>
            <RetroButton borderColor="#4ECDC4">Teal Border</RetroButton>
            <RetroButton borderColor="#FF9A76">Orange Border</RetroButton>
            <RetroButton borderColor="#C77DFF">Purple Border</RetroButton>
            <RetroButton borderColor="#FF6B9D">Pink Border</RetroButton>
          </div>
          <div className="flex flex-wrap gap-4">
            <RetroButton size="sm">
              Small
            </RetroButton>
            <RetroButton size="md">
              Medium
            </RetroButton>
            <RetroButton size="lg">
              Large
            </RetroButton>
          </div>
        </section>

        <RetroDivider />

        {/* Cards Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold uppercase tracking-wide">Cards</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <RetroCard variant="default">
              <h3 className="text-xl font-bold mb-2">Default Card</h3>
              <p className="text-muted-foreground">
                A standard card with corner accent marks and subtle border.
              </p>
            </RetroCard>
            <RetroCard variant="highlighted">
              <h3 className="text-xl font-bold mb-2 text-primary">
                Highlighted Card
              </h3>
              <p className="text-muted-foreground">
                Features a glowing teal border for emphasis.
              </p>
            </RetroCard>
            <RetroCard variant="bordered">
              <h3 className="text-xl font-bold mb-2 text-secondary">
                Bordered Card
              </h3>
              <p className="text-muted-foreground">
                Styled with an orange glow effect.
              </p>
            </RetroCard>
          </div>
        </section>

        <RetroDivider />

        {/* Badges Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold uppercase tracking-wide">
            Badges
          </h2>
          <div className="flex flex-wrap gap-3">
            <RetroBadge variant="teal">Teal Badge</RetroBadge>
            <RetroBadge variant="orange">Orange Badge</RetroBadge>
            <RetroBadge variant="purple">Purple Badge</RetroBadge>
            <RetroBadge variant="pink">Pink Badge</RetroBadge>
          </div>
        </section>

        <RetroDivider />

        {/* VHS Cards Section */}
        <section className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold uppercase tracking-wide mb-2">
              VHS Tape Covers
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Authentic 80s VHS cassette cover design with faded aesthetics
            </p>
          </div>
          
          <div className="flex flex-wrap gap-8">
            <VHSCard
              brand="Scotch"
              model="EG"
              format="T-120"
              footerTitle="EVERYDAY"
              footerSubtitle="Low noise for improved recording"
              sphereGradient={{
                top: "#FFD700",
                middle: "#FF6B35",
                bottom: "#6B4FBB"
              }}
            />
            <VHSCard
              brand="Retro"
              model="HS"
              format="E-180"
              footerTitle="HIGH STANDARD"
              footerSubtitle="Premium quality extended play"
              sphereGradient={{
                top: "#4ecdc4",
                middle: "#2a9d8f",
                bottom: "#1a5f5a"
              }}
            />
            <VHSCard
              brand="Digital"
              model="VX"
              format="T-120"
              footerTitle="ARCHIVE"
              footerSubtitle="Professional grade recording"
              sphereGradient={{
                top: "#c77dff",
                middle: "#9b59b6",
                bottom: "#5a189a"
              }}
            />
          </div>
        </section>

        <RetroDivider />

        {/* VHS Tape Spines Section */}
        <section className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold uppercase tracking-wide mb-2">
              VHS Tape Spines
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Video tape spine with handwritten labels, VHS logo, and random stickers
            </p>
          </div>
          
          <div className="space-y-6">
            <VHSTapeSpine
              mainText="Mark & Kathy"
              mainTextColor="#ff6b9d"
              subtitleText="Wedding 1985"
            />
            <VHSTapeSpine
              mainText="Summer Vacation"
              mainTextColor="#4ecdc4"
              subtitleText="Florida '87"
            />
            <VHSTapeSpine
              mainText="Kids Birthday"
              mainTextColor="#ff9a76"
              subtitleText="Michael - Age 5"
            />
            <VHSTapeSpine
              mainText="Christmas Special"
              mainTextColor="#c77dff"
            />
            <VHSTapeSpine
              mainText="Beach Trip '88"
              mainTextColor="#ff9a76"
              subtitleText="California"
              upsideDown={true}
            />
          </div>
        </section>

        <RetroDivider />

        {/* Form Inputs Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold uppercase tracking-wide">
            Form Inputs
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
            <RetroInput
              label="Name"
              placeholder="Enter your name..."
              defaultValue=""
            />
            <RetroInput
              label="Email"
              type="email"
              placeholder="your@email.com"
              defaultValue=""
            />
          </div>
          <div className="max-w-3xl">
            <RetroTextarea
              label="Message"
              placeholder="Type your message here..."
              defaultValue=""
            />
          </div>
        </section>

        <RetroDivider />

        {/* Polaroid Photos Section */}
        <section className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold uppercase tracking-wide mb-2">
              Polaroid Photos
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Realistic Polaroid-style photos with aged effects, slight rotations, and handwritten captions
            </p>
          </div>
          
          <div className="flex flex-wrap gap-12 justify-center items-end">
            <div className="w-80">
              <Polaroid
                image="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=400&fit=crop"
                alt="Sunset landscape"
                caption="Summer '85"
                rotate={-2}
              />
            </div>
            <div className="w-80">
              <Polaroid
                image="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop"
                alt="Ocean waves"
                caption="Beach Day - July 12"
                rotate={1.5}
              />
            </div>
            <div className="w-80">
              <Polaroid
                image="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop"
                alt="Mountain view"
                caption="Mountain Trip"
                rotate={-1}
              />
            </div>
            <div className="w-80">
              <Polaroid
                image="https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=400&h=400&fit=crop"
                alt="Desert landscape"
                caption="Road Trip"
                rotate={2}
              />
            </div>
          </div>

          {/* Small variants */}
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-6 text-center">Small Size Variant</h3>
            <div className="flex flex-wrap gap-8 justify-center items-end">
              <div className="w-48">
                <Polaroid
                  image="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=200&h=200&fit=crop"
                  alt="Sunset"
                  caption="Summer"
                  rotate={-3}
                />
              </div>
              <div className="w-48">
                <Polaroid
                  image="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=200&h=200&fit=crop"
                  alt="Ocean"
                  caption="July 12"
                  rotate={2}
                />
              </div>
              <div className="w-48">
                <Polaroid
                  image="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&h=200&fit=crop"
                  alt="Mountains"
                  caption="Aug '86"
                  rotate={-1.5}
                />
              </div>
            </div>
          </div>
        </section>

        <RetroDivider />

        {/* Retro TV Section */}
        <section className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold uppercase tracking-wide mb-2">
              Retro Television
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Ferguson Colorstar-inspired wood grain TV with 3D perspective, CRT screen effects, and scanlines
            </p>
          </div>
          
          <div className="flex flex-col gap-12 items-center">
            {/* TV with image */}
            <div className="flex flex-col items-center gap-4">
              <h3 className="text-xl font-bold text-primary">With Custom Image</h3>
              <RetroTV
                screenImage="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&h=600&fit=crop"
                angled={true}
                size="lg"
                scanlineIntensity={0.6}
              />
            </div>

            {/* TV with different image */}
            <div className="flex flex-col items-center gap-4">
              <h3 className="text-xl font-bold text-secondary">Beach Scene</h3>
              <RetroTV
                screenImage="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop"
                angled={true}
                size="md"
                scanlineIntensity={0.7}
              />
            </div>

            {/* Smaller TV */}
            <div className="flex flex-col items-center gap-4">
              <h3 className="text-xl font-bold text-accent">Smallest Size (Min Scale)</h3>
              <p className="text-sm text-muted-foreground">Components maintain proportions at minimum size</p>
              <RetroTV
                screenImage="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop"
                angled={true}
                size="sm"
                scanlineIntensity={0.5}
              />
            </div>

            {/* TV without angle */}
            <div className="flex flex-col items-center gap-4">
              <h3 className="text-xl font-bold" style={{ color: "#ff6b9d" }}>No Angle View</h3>
              <RetroTV
                screenImage="https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=800&h=600&fit=crop"
                angled={false}
                size="md"
                scanlineIntensity={0.4}
              />
            </div>
          </div>
        </section>

        <RetroDivider />

        {/* Geometric Shapes Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold uppercase tracking-wide">
            Geometric Elements
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center space-y-2">
              <GeometricCircle className="w-32 h-32" color="teal" />
              <p className="text-sm">Circles</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <GeometricTriangle className="w-32 h-32" color="orange" />
              <p className="text-sm">Triangles</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <GeometricSquare className="w-32 h-32" color="purple" />
              <p className="text-sm">Squares</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <GeometricCircle className="w-32 h-32" color="pink" />
              <p className="text-sm">Circles</p>
            </div>
          </div>
        </section>

        <RetroDivider />

        {/* Blueprint Lines Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold uppercase tracking-wide">
            Blueprint Style
          </h2>
          <RetroCard>
            <BlueprintLines className="w-full h-48 opacity-70" />
          </RetroCard>
        </section>

        <RetroDivider />

        {/* Chevron Pattern Showcase */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold uppercase tracking-wide">
            Chevron Pattern
          </h2>
          <RetroCard className="overflow-hidden">
            <ChevronPattern className="w-full h-64" />
          </RetroCard>
        </section>

        {/* Footer */}
        <footer className="text-center py-12 space-y-4">
          <RetroDivider variant="gradient" />
          <p className="text-muted-foreground">
            Built with Vite + Vike + React + Tailwind CSS
          </p>
          <div className="flex justify-center gap-2">
            <RetroBadge variant="teal">80s Inspired</RetroBadge>
            <RetroBadge variant="orange">Pastel Colors</RetroBadge>
            <RetroBadge variant="purple">SVG Graphics</RetroBadge>
          </div>
        </footer>
      </div>
    </div>
  );
}
