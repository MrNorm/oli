import { Polaroid } from '@/components/retro';
import { TimelineItem } from './TimelineItem';

interface DailyPhotoItemProps {
  id: number;
  title: string;
  date: string;
  photo: {
    url: string;
    alt: string;
  };
  caption?: string;
  location?: string;
}

export function DailyPhotoItem({ title, date, photo, caption, location }: DailyPhotoItemProps) {
  return (
    <TimelineItem
      dotColor="bg-teal-500"
      ringColor="ring-teal-500/20"
      dateStampColor="bg-teal-500/10 border-teal-500/30 text-teal-600 dark:text-teal-400"
      badgeVariant="teal"
      badgeLabel="📸 Daily Snapshot"
      date={date}
    >
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        {/* Story beside photo */}
        <div className="flex-1 space-y-3 pt-4 order-2 sm:order-1">
          <h3 className="text-2xl font-bold">{title}</h3>
          {caption && (
            <p className="text-muted-foreground leading-relaxed italic">
              &quot;{caption}&quot;
            </p>
          )}
          {location && (
            <p className="text-sm text-muted-foreground">
              📍 {location}
            </p>
          )}
        </div>
        
        {/* Polaroid photo */}
        <div className="flex-shrink-0 w-64 sm:w-72 order-1 sm:order-2" style={{ transform: 'rotate(3deg)' }}>
          <Polaroid
            image={photo.url || ''}
            alt={photo.alt}
            caption={new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            rotate={0}
          />
        </div>
      </div>
    </TimelineItem>
  );
}
