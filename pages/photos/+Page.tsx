import { useState, useMemo } from "react";
import {
  Polaroid,
  RetroCard,
  RetroDivider,
  GeometricCircle,
  GeometricTriangle,
  RetroBadge,
} from "@/components/retro";

interface DailyPhoto {
  id: string;
  date: string;
  image: string;
  location: string;
  camera?: string;
  aperture?: string;
  shutter?: string;
  iso?: string;
  caption: string;
  story: string;
  year: number;
  month: number;
}

// Sample data - replace with your actual photos
// In reality, you'd fetch this from an API or database
const photos: DailyPhoto[] = [
  {
    id: "2026-02-10",
    date: "February 10, 2026",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    location: "Mountain Peak, Switzerland",
    camera: "Canon EOS R5",
    aperture: "f/8",
    shutter: "1/500s",
    iso: "100",
    caption: "Alpine Sunrise",
    story: "Woke up at 4 AM to catch this moment. The air was crisp, almost crystalline. As the sun broke over the peaks, everything turned golden. These are the moments that remind me why I carry a camera everywhere - you can't recreate this light, this feeling. The world feels infinite from up here.",
    year: 2026,
    month: 2
  },
  {
    id: "2026-02-09",
    date: "February 9, 2026",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
    location: "Downtown Café",
    camera: "Fujifilm X100V",
    aperture: "f/2.8",
    shutter: "1/125s",
    iso: "400",
    caption: "Morning Ritual",
    story: "My favorite corner table. The one with the perfect light that streams in around 8 AM. The barista knows my order by heart now. There's something meditative about this routine - the steam rising from the cup, the soft chatter of people starting their day, the way the light catches the foam.",
    year: 2026,
    month: 2
  },
  {
    id: "2026-01-15",
    date: "January 15, 2026",
    image: "https://images.unsplash.com/photo-1511884642898-4c92249e20b6",
    location: "Brooklyn Bridge, NYC",
    camera: "Sony A7 III",
    aperture: "f/11",
    shutter: "20s",
    iso: "200",
    caption: "City Lights",
    story: "The city never sleeps, they say. Standing here with my tripod at midnight, I finally understood what that means. The constant flow of light, the energy pulsing through the cables beneath my feet. Twenty seconds of exposure to capture something timeless.",
    year: 2026,
    month: 1
  },
  {
    id: "2025-12-25",
    date: "December 25, 2025",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    location: "Home Garden",
    camera: "iPhone 15 Pro",
    aperture: "f/1.8",
    shutter: "1/60s",
    iso: "80",
    caption: "First Bloom",
    story: "Sometimes the most extraordinary things happen in your own backyard. I've watched this bud for weeks, and today it finally opened. The morning dew still clinging to the petals, catching the light like tiny diamonds. Nature's timing is impeccable.",
    year: 2025,
    month: 12
  },
  {
    id: "2025-08-14",
    date: "August 14, 2025",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    location: "Pacific Coast Highway",
    camera: "Canon EOS R5",
    aperture: "f/16",
    shutter: "1/250s",
    iso: "100",
    caption: "Endless Road",
    story: "Pulled over on impulse. Sometimes the journey is more interesting than the destination. The fog was rolling in from the ocean, creating this dreamlike atmosphere. I sat on the hood of my car for twenty minutes, just watching it move.",
    year: 2025,
    month: 8
  },
  {
    id: "2024-03-20",
    date: "March 20, 2024",
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b",
    location: "Local Library",
    camera: "Fujifilm X-T4",
    aperture: "f/2",
    shutter: "1/100s",
    iso: "800",
    caption: "Quiet Hours",
    story: "There's a particular kind of silence in old libraries. Not empty silence, but full silence - heavy with stories and whispered conversations and the turning of pages. The afternoon light streaming through the tall windows created this scene. I barely breathed taking this shot.",
    year: 2024,
    month: 3
  },
  // Add more sample photos from different years...
  {
    id: "2023-07-04",
    date: "July 4, 2023",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    location: "Lake Tahoe",
    camera: "Canon EOS R5",
    aperture: "f/5.6",
    shutter: "1/1000s",
    iso: "100",
    caption: "Summer Memories",
    story: "Fourth of July at the lake. The water was so still it looked like glass. You could see the mountains perfectly reflected, and for a moment, I couldn't tell which way was up.",
    year: 2023,
    month: 7
  },
  {
    id: "2022-11-28",
    date: "November 28, 2022",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    location: "Thanksgiving Dinner",
    camera: "iPhone 14 Pro",
    aperture: "f/1.8",
    shutter: "1/60s",
    iso: "320",
    caption: "Grateful",
    story: "The whole family gathered around one table. These moments become more precious as the years pass. The laughter, the stories retold for the hundredth time, the warmth of being together.",
    year: 2022,
    month: 11
  },
  {
    id: "2021-06-15",
    date: "June 15, 2021",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
    location: "First Office Return",
    camera: "Fujifilm X100V",
    aperture: "f/2.8",
    shutter: "1/125s",
    iso: "200",
    caption: "Back to Normal",
    story: "First day back in the office after the pandemic. Everything felt the same but different. The coffee tasted better than I remembered, or maybe I just appreciated it more.",
    year: 2021,
    month: 6
  },
];

export default function PhotosPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<DailyPhoto | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const photosPerPage = 24; // Show 24 photos per page (4x6 grid on desktop)

  // Get unique years from photos, sorted descending
  const availableYears = useMemo(() => {
    const years = [...new Set(photos.map(p => p.year))].sort((a, b) => b - a);
    return years;
  }, []);

  // Filter photos by selected year
  const filteredPhotos = useMemo(() => {
    const filtered = selectedYear === 'all' 
      ? photos 
      : photos.filter(p => p.year === selectedYear);
    
    // Sort by date descending (newest first)
    return filtered.sort((a, b) => b.id.localeCompare(a.id));
  }, [selectedYear]);

  // Paginate filtered photos
  const totalPages = Math.ceil(filteredPhotos.length / photosPerPage);
  const paginatedPhotos = useMemo(() => {
    const startIndex = (currentPage - 1) * photosPerPage;
    return filteredPhotos.slice(startIndex, startIndex + photosPerPage);
  }, [filteredPhotos, currentPage]);

  // Group paginated photos by month
  const photosByMonth = useMemo(() => {
    const groups: { [key: string]: DailyPhoto[] } = {};
    
    paginatedPhotos.forEach(photo => {
      const monthKey = `${photo.year}-${String(photo.month).padStart(2, '0')}`;
      if (!groups[monthKey]) {
        groups[monthKey] = [];
      }
      groups[monthKey].push(photo);
    });
    
    // Sort month keys descending
    return Object.keys(groups)
      .sort((a, b) => b.localeCompare(a))
      .map(key => ({
        key,
        label: new Date(`${key}-01`).toLocaleDateString('en-US', { 
          month: 'long', 
          year: 'numeric' 
        }),
        photos: groups[key]
      }));
  }, [paginatedPhotos]);

  // Reset to page 1 when year changes
  const handleYearChange = (year: number | 'all') => {
    setSelectedYear(year);
    setCurrentPage(1);
  };

  // Get photo count for display
  const totalPhotos = photos.length;
  const filteredCount = filteredPhotos.length;

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
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16">
          {/* Decorative geometric shapes */}
          <div className="absolute top-20 right-10 w-32 h-32 opacity-10 pointer-events-none">
            <GeometricCircle color="teal" />
          </div>
          <div className="absolute bottom-10 left-10 w-28 h-28 opacity-10 pointer-events-none">
            <GeometricTriangle color="orange" />
          </div>
          
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-sm">
              <span className="text-sm font-medium text-primary">📸 My Daily Photo</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              One Frame,<br/>
              Every Day
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              A visual journal capturing life&apos;s fleeting moments. Each photograph tells a story - 
              some grand, some quiet, all meaningful.
            </p>
            <p className="text-base text-muted-foreground">
              <span className="font-semibold text-foreground">{totalPhotos.toLocaleString()}</span> photos captured since 2021
            </p>
          </div>
        </section>

        <RetroDivider />

        {/* Year Filter */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Year tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => handleYearChange('all')}
                className={`px-4 py-2 rounded-sm text-sm font-medium transition-all ${
                  selectedYear === 'all'
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-card hover:bg-card/80 text-foreground/80 hover:text-foreground border border-border/40'
                }`}
              >
                All Years
              </button>
              {availableYears.map(year => (
                <button
                  key={year}
                  onClick={() => handleYearChange(year)}
                  className={`px-4 py-2 rounded-sm text-sm font-medium transition-all ${
                    selectedYear === year
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-card hover:bg-card/80 text-foreground/80 hover:text-foreground border border-border/40'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
            
            {/* Photo count */}
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredCount}</span> {filteredCount === 1 ? 'photo' : 'photos'}
            </div>
          </div>
        </section>

        {/* Photos Grid */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-12">
          {photosByMonth.map((monthGroup) => (
            <div key={monthGroup.key} className="space-y-6">
              {/* Month Header */}
              <div className="flex items-center gap-4">
                <h3 className="text-2xl font-bold text-foreground">{monthGroup.label}</h3>
                <div className="flex-1 h-px bg-border/40"></div>
                <span className="text-sm text-muted-foreground">
                  {monthGroup.photos.length} {monthGroup.photos.length === 1 ? 'photo' : 'photos'}
                </span>
              </div>
              
              {/* Photos for this month */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 sm:gap-8 auto-rows-max">
                {monthGroup.photos.map((photo, index) => (
                  <div 
                    key={photo.id} 
                    className="flex flex-col items-center gap-2 group cursor-pointer"
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    <Polaroid
                      image={photo.image}
                      alt={photo.caption}
                      caption={photo.caption}
                      rotate={index % 3 === 0 ? -2 : index % 3 === 1 ? 1 : -1}
                      className="w-full max-w-[200px]"
                    />
                    {/* Date label below polaroid */}
                    <div className="text-sm font-medium text-foreground/90 text-center group-hover:text-foreground transition-colors">
                      {new Date(photo.id).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          {/* Empty state */}
          {paginatedPhotos.length === 0 && (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground">No photos found for {selectedYear}</p>
            </div>
          )}
        </section>

        {/* Pagination */}
        {totalPages > 1 && (
          <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-sm text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-card hover:bg-card/80 text-foreground/80 hover:text-foreground border border-border/40"
              >
                ← Previous
              </button>
              
              <div className="flex items-center gap-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // Show first page, last page, current page, and pages around current
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-sm text-sm font-medium transition-all ${
                        currentPage === pageNum
                          ? 'bg-primary text-primary-foreground shadow-md'
                          : 'bg-card hover:bg-card/80 text-foreground/80 hover:text-foreground border border-border/40'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-sm text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-card hover:bg-card/80 text-foreground/80 hover:text-foreground border border-border/40"
              >
                Next →
              </button>
            </div>
            
            <p className="text-center text-sm text-muted-foreground mt-4">
              Page {currentPage} of {totalPages}
            </p>
          </section>
        )}

        {/* Spacer */}
        <div className="h-12" />
      </div>

      {/* Modal/Overlay for selected photo */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="relative max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <RetroCard className="p-6 sm:p-8 lg:p-10">
              {/* Close button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-sm bg-muted/50 hover:bg-muted transition-colors"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
                {/* Left: Photo */}
                <div className="flex items-start justify-center">
                  <Polaroid
                    image={selectedPhoto.image}
                    alt={selectedPhoto.caption}
                    caption={selectedPhoto.caption}
                    rotate={0}
                    className="w-full max-w-[400px] cursor-default hover:translate-y-0"
                  />
                </div>

                {/* Right: Details and Story */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{selectedPhoto.caption}</h2>
                    <p className="text-lg text-muted-foreground">{selectedPhoto.date}</p>
                  </div>

                  <RetroDivider />

                  {/* Metadata */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">📍</span>
                      <span>{selectedPhoto.location}</span>
                    </div>
                    {selectedPhoto.camera && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">📷</span>
                        <span>{selectedPhoto.camera}</span>
                      </div>
                    )}
                    {(selectedPhoto.aperture || selectedPhoto.shutter || selectedPhoto.iso) && (
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        {selectedPhoto.aperture && <span>{selectedPhoto.aperture}</span>}
                        {selectedPhoto.shutter && <span>{selectedPhoto.shutter}</span>}
                        {selectedPhoto.iso && <span>ISO {selectedPhoto.iso}</span>}
                      </div>
                    )}
                  </div>

                  <RetroDivider />

                  {/* Story */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">The Story</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedPhoto.story}
                    </p>
                  </div>
                </div>
              </div>
            </RetroCard>
          </div>
        </div>
      )}
    </div>
  );
}
