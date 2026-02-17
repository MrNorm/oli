import { RetroCard } from '@/components/retro';
import { OptimizedImage } from '@/components/OptimizedImage';
import { TimelineItem } from './TimelineItem';

interface ByteItemProps {
  id: number;
  date: string;
  content: string;
  attachedMedia?: {
    url?: string | null;
    alt: string;
  } | null;
  tags?: string[] | null;
  colorIndex?: number;
}

export function ByteItem({ date, content, attachedMedia, tags, colorIndex = 0 }: ByteItemProps) {
  const colors = [
    { badge: 'purple' as const, dot: 'bg-purple-500', ring: 'ring-purple-500/20', stamp: 'bg-purple-500/10 border-purple-500/30 text-purple-600 dark:text-purple-400' },
    { badge: 'teal' as const, dot: 'bg-teal-500', ring: 'ring-teal-500/20', stamp: 'bg-teal-500/10 border-teal-500/30 text-teal-600 dark:text-teal-400' },
  ];
  const colorScheme = colors[colorIndex % colors.length];

  return (
    <TimelineItem
      dotColor={colorScheme.dot}
      ringColor={colorScheme.ring}
      dateStampColor={colorScheme.stamp}
      badgeVariant={colorScheme.badge}
      badgeLabel="Byte"
      date={date}
    >
      <RetroCard className="hover:scale-[1.01] transition-all">
        <div className="space-y-3">
          <p className="text-foreground leading-relaxed">
            {content}
          </p>
          {attachedMedia && (
            <OptimizedImage 
              src={attachedMedia.url || ''} 
              alt={attachedMedia.alt}
              width={600}
              responsive="small"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="w-full h-48 object-cover rounded border-2 border-foreground/10"
            />
          )}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2 border-t border-border/50">
              {tags.map((tag, tagIndex) => (
                <span key={tagIndex} className="text-xs text-primary/80 hover:text-primary transition-colors">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </RetroCard>
    </TimelineItem>
  );
}
