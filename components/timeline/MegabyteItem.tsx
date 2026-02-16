import { RetroCard } from '@/components/retro';
import { OptimizedImage } from '@/components/OptimizedImage';
import { TimelineItem } from './TimelineItem';

interface MegabyteItemProps {
  id: number;
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  featuredImage?: {
    url: string;
    alt: string;
  };
  tags?: string[];
}

export function MegabyteItem({ id, slug, title, date, excerpt, featuredImage, tags }: MegabyteItemProps) {
  return (
    <TimelineItem
      dotColor="bg-orange-500"
      ringColor="ring-orange-500/20"
      dateStampColor="bg-orange-500/10 border-orange-500/30 text-orange-600 dark:text-orange-400"
      badgeVariant="orange"
      badgeLabel="Megabyte"
      date={date}
    >
      <RetroCard className="hover:scale-[1.01] transition-all hover:shadow-2xl">
        <div className="space-y-4">
          <h3 className="text-2xl sm:text-3xl font-bold">
            {title}
          </h3>
          {featuredImage && (
            <OptimizedImage 
              src={featuredImage.url || ''} 
              alt={featuredImage.alt}
              width={800}
              responsive="medium"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="w-full h-64 object-cover rounded border-4 border-foreground/10"
            />
          )}
          {excerpt && (
            <p className="text-muted-foreground leading-relaxed">
              {excerpt}
            </p>
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
          <a 
            href={`/megabytes/${slug}`}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
          >
            Read the full story →
          </a>
        </div>
      </RetroCard>
    </TimelineItem>
  );
}
