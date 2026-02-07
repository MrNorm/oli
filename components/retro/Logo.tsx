import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'icon' | 'header' | 'footer';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  variant = 'header',
  className 
}) => {
  // Horizontal line 'O' logo - dot matrix style
  const OLogo = ({ size = 'default' }: { size?: 'small' | 'default' | 'large' }) => {
    const dimensions = {
      small: { width: 32, height: 44, barHeight: 3, gap: 2 },
      default: { width: 48, height: 66, barHeight: 5, gap: 3 },
      large: { width: 80, height: 110, barHeight: 7, gap: 4 }
    };
    
    const { width, height, barHeight, gap } = dimensions[size];
    
    // Calculate widths for rounded shape
    const width90 = width * 0.9;
    const width100 = width;
    const sideSegment = width * 0.3;
    const hollowGap = width * 0.4;
    
    return (
      <svg 
        width={width} 
        height={height} 
        viewBox={`0 0 ${width} ${height}`}
        className="fill-[#E8E6E3]"
      >
        {/* Row 1 - 90% width (rounded top) */}
        <rect x={(width - width90) / 2} y="0" width={width90} height={barHeight} rx={2} />
        
        {/* Row 2 - 100% width */}
        <rect x="0" y={barHeight + gap} width={width100} height={barHeight} rx={2} />
        
        {/* Row 3 - 30% / 40% hollow / 30% */}
        <rect x="0" y={(barHeight + gap) * 2} width={sideSegment} height={barHeight} rx={2} />
        <rect x={width - sideSegment} y={(barHeight + gap) * 2} width={sideSegment} height={barHeight} rx={2} />
        
        {/* Row 4 - 30% / 40% hollow / 30% */}
        <rect x="0" y={(barHeight + gap) * 3} width={sideSegment} height={barHeight} rx={2} />
        <rect x={width - sideSegment} y={(barHeight + gap) * 3} width={sideSegment} height={barHeight} rx={2} />
        
        {/* Row 5 - 30% / 40% hollow / 30% */}
        <rect x="0" y={(barHeight + gap) * 4} width={sideSegment} height={barHeight} rx={2} />
        <rect x={width - sideSegment} y={(barHeight + gap) * 4} width={sideSegment} height={barHeight} rx={2} />
        
        {/* Row 6 - 30% / 40% hollow / 30% */}
        <rect x="0" y={(barHeight + gap) * 5} width={sideSegment} height={barHeight} rx={2} />
        <rect x={width - sideSegment} y={(barHeight + gap) * 5} width={sideSegment} height={barHeight} rx={2} />
        
        {/* Row 7 - 30% / 40% hollow / 30% */}
        <rect x="0" y={(barHeight + gap) * 6} width={sideSegment} height={barHeight} rx={2} />
        <rect x={width - sideSegment} y={(barHeight + gap) * 6} width={sideSegment} height={barHeight} rx={2} />
        
        {/* Row 8 - 100% width */}
        <rect x="0" y={(barHeight + gap) * 7} width={width100} height={barHeight} rx={2} />
        
        {/* Row 9 - 90% width (rounded bottom) */}
        <rect x={(width - width90) / 2} y={(barHeight + gap) * 8} width={width90} height={barHeight} rx={2} />
      </svg>
    );
  };

  const renderVariant = () => {
    switch (variant) {
      case 'icon':
        return (
          <div className={cn("flex items-center justify-center", className)}>
            <div className="relative" style={{ filter: 'drop-shadow(0 0 8px rgba(232, 230, 227, 0.4))' }}>
              <OLogo size="small" />
              {/* VHS scan lines overlay */}
              <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,rgba(0,0,0,0.15)_1px,rgba(0,0,0,0.15)_2px)]" />
            </div>
          </div>
        );
      
      case 'footer':
        return (
          <div className={cn("flex flex-col items-center gap-2", className)}>
            <div className="relative" style={{ filter: 'drop-shadow(0 0 8px rgba(232, 230, 227, 0.4))' }}>
              <OLogo size="small" />
              {/* VHS scan lines overlay */}
              <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,rgba(0,0,0,0.15)_1px,rgba(0,0,0,0.15)_2px)]" />
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="text-[#E8E6E3] text-sm font-bold italic tracking-wide mb-0.5" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', textShadow: '0 0 12px rgba(232, 230, 227, 0.6)' }}>
                OLIVER
              </div>
              <div className="h-px w-14 bg-[#C8C6C3] opacity-50 mb-0.5" />
              <div className="text-[#C8C6C3] text-[10px] font-medium italic tracking-wider" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', textShadow: '0 0 10px rgba(200, 198, 195, 0.5)' }}>
                NORTHAM
              </div>
            </div>
          </div>
        );
      
      case 'header':
      default:
        return (
          <div className={cn("flex flex-col items-center gap-2", className)}>
            <div className="relative" style={{ filter: 'drop-shadow(0 0 15px rgba(232, 230, 227, 0.5))' }}>
              <OLogo size="large" />
              {/* VHS scan lines overlay */}
              <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,rgba(0,0,0,0.15)_1px,rgba(0,0,0,0.15)_2px)]" />
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="text-[#E8E6E3] text-4xl font-bold italic tracking-wide mb-1" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', textShadow: '0 0 20px rgba(232, 230, 227, 0.6), 0 0 40px rgba(232, 230, 227, 0.3)' }}>
                OLIVER
              </div>
              <div className="h-px w-28 bg-[#C8C6C3] opacity-60 mb-1" />
              <div className="text-[#C8C6C3] text-lg font-medium italic tracking-wider" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', textShadow: '0 0 15px rgba(200, 198, 195, 0.6), 0 0 30px rgba(200, 198, 195, 0.3)' }}>
                NORTHAM
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="relative">
      {renderVariant()}
      {/* VHS static/noise effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};
