import { useState, useMemo } from 'react';
import { useData } from 'vike-react/useData';
import type { Data } from './+data';
import {
  RetroDivider,
  GeometricCircle,
  GeometricSquare,
} from '@/components/retro';
import { MegabyteItem, ByteItem, DailyPhotoItem } from '@/components/timeline';

// Combined timeline item type
type TimelineItem = {
  id: string;
  date: string;
  type: 'megabyte' | 'byte' | 'photo';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
};

export default function ActivityPage() {
  const { megabytes, bytes, dailyPhotos, selectedYear: initialYear } = useData<Data>();
  const [selectedYear, setSelectedYear] = useState<number | 'all'>(initialYear || 'all');
  const [selectedType, setSelectedType] = useState<'all' | 'megabyte' | 'byte' | 'photo'>('all');

  // Navigate to update URL when year changes
  const handleYearChange = (year: number | 'all') => {
    setSelectedYear(year);
    const newUrl = year === 'all' ? '/activity' : `/activity?year=${year}`;
    window.history.pushState({}, '', newUrl);
  };

  // Combine all items into a single timeline
  const allItems: TimelineItem[] = useMemo(() => {
    const items: TimelineItem[] = [];

    // Add megabytes
    if (megabytes && Array.isArray(megabytes)) {
      megabytes.forEach((megabyte) => {
        items.push({
          id: `megabyte-${megabyte.id}`,
          date: megabyte.date,
          type: 'megabyte',
          data: megabyte,
        });
      });
    }

    // Add bytes
    if (bytes && Array.isArray(bytes)) {
      bytes.forEach((byte) => {
        items.push({
          id: `byte-${byte.id}`,
          date: byte.date,
          type: 'byte',
          data: byte,
        });
      });
    }

    // Add daily photos
    if (dailyPhotos && Array.isArray(dailyPhotos)) {
      dailyPhotos.forEach((photo) => {
        items.push({
          id: `photo-${photo.id}`,
          date: photo.date,
          type: 'photo',
          data: photo,
        });
      });
    }

    // Sort by date descending (newest first)
    return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [megabytes, bytes, dailyPhotos]);

  // Get unique years from all items
  const availableYears = useMemo(() => {
    const years = new Set<number>();
    allItems.forEach((item) => {
      years.add(new Date(item.date).getFullYear());
    });
    return Array.from(years).sort((a, b) => b - a);
  }, [allItems]);

  // Filter items by selected year
  const filteredItems = useMemo(() => {
    let items = allItems;
    
    // Filter by year
    if (selectedYear !== 'all') {
      items = items.filter((item) => {
        return new Date(item.date).getFullYear() === selectedYear;
      });
    }
    
    // Filter by type
    if (selectedType !== 'all') {
      items = items.filter((item) => item.type === selectedType);
    }
    
    return items;
  }, [allItems, selectedYear, selectedType]);

  // Group filtered items by month
  const itemsByMonth = useMemo(() => {
    const groups: { [key: string]: TimelineItem[] } = {};
    
    filteredItems.forEach((item) => {
      const date = new Date(item.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!groups[monthKey]) {
        groups[monthKey] = [];
      }
      groups[monthKey].push(item);
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
        items: groups[key],
      }));
  }, [filteredItems]);

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
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-14 lg:pt-16 pb-6 sm:pb-8">
          {/* Decorative geometric shapes */}
          <div className="absolute top-20 right-10 w-32 h-32 opacity-10 pointer-events-none">
            <GeometricCircle color="teal" />
          </div>
          <div className="absolute bottom-10 left-10 w-28 h-28 opacity-10 pointer-events-none">
            <GeometricSquare color="orange" />
          </div>
          
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              Activity Feed
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              A complete chronicle of articles, thoughts, and daily moments - all in one place
            </p>
          </div>
        </section>

        <RetroDivider />

        {/* Year and Type Filters */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6 space-y-6">
          {/* Year Filter */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">Filter by Year</h3>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => handleYearChange('all')}
                  className={`px-3 py-1 border-2 font-mono text-sm transition-colors ${
                    selectedYear === 'all'
                      ? 'bg-primary text-primary-foreground border-foreground'
                      : 'bg-background text-foreground border-border hover:border-foreground'
                  }`}
                >
                  ALL YEARS
                </button>
                {availableYears.map((year) => (
                  <button
                    key={year}
                    onClick={() => handleYearChange(year)}
                    className={`px-3 py-1 border-2 font-mono text-sm transition-colors ${
                      selectedYear === year
                        ? 'bg-primary text-primary-foreground border-foreground'
                        : 'bg-background text-foreground border-border hover:border-foreground'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Type Filter */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">Filter by Type</h3>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setSelectedType('all')}
                  className={`px-3 py-1 border-2 font-mono text-sm transition-colors ${
                    selectedType === 'all'
                      ? 'bg-primary text-primary-foreground border-foreground'
                      : 'bg-background text-foreground border-border hover:border-foreground'
                  }`}
                >
                  ALL TYPES
                </button>
                <button
                  onClick={() => setSelectedType('megabyte')}
                  className={`px-3 py-1 border-2 font-mono text-sm transition-colors ${
                    selectedType === 'megabyte'
                      ? 'bg-orange-500 text-white border-orange-600'
                      : 'bg-background text-foreground border-border hover:border-foreground'
                  }`}
                >
                  📝 MEGABYTES
                </button>
                <button
                  onClick={() => setSelectedType('byte')}
                  className={`px-3 py-1 border-2 font-mono text-sm transition-colors ${
                    selectedType === 'byte'
                      ? 'bg-purple-500 text-white border-purple-600'
                      : 'bg-background text-foreground border-border hover:border-foreground'
                  }`}
                >
                  💬 BYTES
                </button>
                <button
                  onClick={() => setSelectedType('photo')}
                  className={`px-3 py-1 border-2 font-mono text-sm transition-colors ${
                    selectedType === 'photo'
                      ? 'bg-teal-500 text-white border-teal-600'
                      : 'bg-background text-foreground border-border hover:border-foreground'
                  }`}
                >
                  📸 PHOTOS
                </button>
              </div>
            </div>

            {/* Count */}
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredItems.length}</span> items
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-16">
          {itemsByMonth.map((monthGroup) => (
            <div key={monthGroup.key} className="space-y-8">
              {/* Month Header */}
              <div className="flex items-center gap-4">
                <h2 className="text-3xl font-bold text-foreground">{monthGroup.label}</h2>
                <div className="flex-1 h-px bg-border/40"></div>
                <span className="text-sm text-muted-foreground">
                  {monthGroup.items.length} {monthGroup.items.length === 1 ? 'item' : 'items'}
                </span>
              </div>
              
              {/* Timeline Container */}
              <div className="relative max-w-5xl">
                {/* Vertical Timeline Line - VHS tape style */}
                <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/30 via-primary/50 to-primary/30 hidden md:block" />
                
                {/* Timeline Items */}
                <div className="space-y-12 relative">
                  {monthGroup.items.map((item, index) => {
                    if (item.type === 'megabyte') {
                      return (
                        <MegabyteItem
                          key={item.id}
                          id={item.data.id}
                          slug={item.data.slug}
                          title={item.data.title}
                          date={item.data.date}
                          excerpt={item.data.excerpt}
                          featuredImage={item.data.featuredImage}
                          tags={item.data.tags}
                        />
                      );
                    } else if (item.type === 'byte') {
                      return (
                        <ByteItem
                          key={item.id}
                          id={item.data.id}
                          date={item.data.date}
                          content={item.data.content}
                          attachedMedia={item.data.attachedMedia}
                          tags={item.data.tags}
                          colorIndex={index}
                        />
                      );
                    } else if (item.type === 'photo') {
                      return (
                        <DailyPhotoItem
                          key={item.id}
                          id={item.data.id}
                          title={item.data.title}
                          date={item.data.date}
                          photo={item.data.photo}
                          caption={item.data.caption}
                          location={item.data.location}
                        />
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>
          ))}

          {/* No results */}
          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">
                No activity found for {selectedYear}.
              </p>
            </div>
          )}
        </section>

        {/* Bottom spacer */}
        <div className="h-20"></div>
      </div>
    </div>
  );
}
