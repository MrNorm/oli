import { ReactNode } from 'react';
import { RetroBadge } from '@/components/retro';

interface TimelineItemProps {
  dotColor: string;
  ringColor: string;
  dateStampColor: string;
  badgeVariant: 'orange' | 'teal' | 'purple';
  badgeLabel: ReactNode;
  date: string;
  children: ReactNode;
}

export function TimelineItem({
  dotColor,
  ringColor,
  dateStampColor,
  badgeVariant,
  badgeLabel,
  date,
  children,
}: TimelineItemProps) {
  return (
    <div className="md:pl-20 relative group">
      {/* Timeline dot */}
      <div className={`hidden md:flex absolute left-6 top-3 w-5 h-5 ${dotColor} border-4 border-background rounded-full shadow-lg z-10 ring-2 ${ringColor}`} />
      
      {/* Date stamp */}
      <div className="mb-3 flex items-center gap-3">
        <div className={`inline-flex items-center gap-2 px-3 py-1 border-2 font-mono text-sm ${dateStampColor}`}>
          {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()}
        </div>
        <RetroBadge variant={badgeVariant} className="text-xs">
          {badgeLabel}
        </RetroBadge>
      </div>
      
      {children}
    </div>
  );
}
