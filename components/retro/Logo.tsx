import React from 'react';
import { cn } from '@/lib/utils';
import packageJson from '../../package.json';

interface LogoProps {
  variant?: 'icon' | 'header' | 'footer' | 'logo';
  className?: string;
  showVersion?: boolean;
  animated?: 'electrocuted';
}

export const Logo: React.FC<LogoProps> = ({ 
  variant = 'header',
  className,
  showVersion = true,
  animated
}) => {
  // Horizontal line 'O' logo - dot matrix style
  const OLogo = ({ size = 'default', animated = false }: { size?: 'small' | 'default' | 'large', animated?: boolean }) => {
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
    
    const logoSvg = (
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

    // If not animated, return simple SVG
    if (!animated) {
      return logoSvg;
    }

    // Generate multiple displaced copies for segment distortion effect
    const displacedCopies = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 10,
      y: (Math.random() - 0.5) * 3,
      delay: Math.random() * 0.15,
      duration: 0.12 + Math.random() * 0.08
    }));

    return (
      <div className="relative inline-block" style={{ width, height }}>
        <style>{`
          @keyframes glitch {
            0%, 100% {
              transform: translate(0, 0) skewX(0deg);
              filter: hue-rotate(0deg) contrast(1);
            }
            10% {
              transform: translate(-2px, 1px) skewX(-1deg);
              filter: hue-rotate(90deg) contrast(1.2);
            }
            20% {
              transform: translate(2px, -1px) skewX(1deg);
              filter: hue-rotate(-90deg) contrast(0.9);
            }
            30% {
              transform: translate(-1px, -2px) skewX(2deg);
              filter: hue-rotate(45deg) contrast(1.1);
            }
            40% {
              transform: translate(1px, 2px) skewX(-2deg);
              filter: hue-rotate(-45deg) contrast(1);
            }
            50% {
              transform: translate(-2px, 0px) skewX(1deg);
              filter: hue-rotate(180deg) contrast(1.3);
            }
            60% {
              transform: translate(2px, 1px) skewX(-1deg);
              filter: hue-rotate(-180deg) contrast(0.8);
            }
            70% {
              transform: translate(0px, -1px) skewX(2deg);
              filter: hue-rotate(270deg) contrast(1.1);
            }
            80% {
              transform: translate(-1px, 1px) skewX(-2deg);
              filter: hue-rotate(-270deg) contrast(1);
            }
            90% {
              transform: translate(1px, -2px) skewX(1deg);
              filter: hue-rotate(135deg) contrast(1.2);
            }
          }

          @keyframes rgbSplit {
            0%, 100% {
              text-shadow: 0 0 0 rgba(255, 0, 0, 0);
            }
            25% {
              text-shadow: -2px 0 rgba(255, 0, 0, 0.7), 2px 0 rgba(0, 255, 255, 0.7);
            }
            50% {
              text-shadow: 2px 0 rgba(255, 0, 0, 0.7), -2px 0 rgba(0, 255, 255, 0.7);
            }
            75% {
              text-shadow: -1px 0 rgba(255, 0, 0, 0.7), 1px 0 rgba(0, 255, 255, 0.7);
            }
          }

          @keyframes staticNoise {
            0%, 100% { opacity: 0.05; }
            50% { opacity: 0.15; }
          }

          @keyframes logoShake {
            0%, 100% {
              transform: translate(0px, 0px);
            }
            10% {
              transform: translate(var(--shake-x), var(--shake-y));
            }
            20% {
              transform: translate(calc(var(--shake-x) * -0.9), calc(var(--shake-y) * -0.8));
            }
            30% {
              transform: translate(calc(var(--shake-x) * 0.8), calc(var(--shake-y) * 0.7));
            }
            40% {
              transform: translate(calc(var(--shake-x) * -0.7), calc(var(--shake-y) * -0.6));
            }
            50% {
              transform: translate(calc(var(--shake-x) * 0.6), calc(var(--shake-y) * 0.5));
            }
            60% {
              transform: translate(calc(var(--shake-x) * -0.5), calc(var(--shake-y) * -0.4));
            }
            70% {
              transform: translate(calc(var(--shake-x) * 0.4), calc(var(--shake-y) * 0.3));
            }
            80% {
              transform: translate(calc(var(--shake-x) * -0.3), calc(var(--shake-y) * -0.2));
            }
            90% {
              transform: translate(calc(var(--shake-x) * 0.2), calc(var(--shake-y) * 0.1));
            }
          }

          @keyframes flicker {
            0%, 100% { opacity: 1; }
            10% { opacity: 0.8; }
            20% { opacity: 1; }
            30% { opacity: 0.9; }
            40% { opacity: 1; }
            50% { opacity: 0.7; }
            60% { opacity: 1; }
            70% { opacity: 0.85; }
            80% { opacity: 1; }
            90% { opacity: 0.9; }
          }

          .glitch-effect {
            animation: glitch 0.3s infinite, flicker 0.5s infinite;
          }

          .rgb-split-effect {
            animation: rgbSplit 0.2s infinite;
          }

          .static-overlay {
            animation: staticNoise 0.1s infinite;
          }
        `}</style>

        {/* Multiple displaced copies for violent shake effect */}
        {displacedCopies.map((copy) => (
          <div
            key={copy.id}
            className="absolute inset-0"
            style={{
              animation: `logoShake ${copy.duration}s infinite`,
              animationDelay: `${copy.delay}s`,
              opacity: 0.4 + (copy.id === 0 ? 0.6 : 0),
              // @ts-ignore
              '--shake-x': `${copy.x}px`,
              '--shake-y': `${copy.y}px`,
            }}
          >
            {logoSvg}
          </div>
        ))}

        {/* RGB split ghost layers */}
        <div className="absolute inset-0 rgb-split-effect opacity-60" style={{ mixBlendMode: 'screen' }}>
          {logoSvg}
        </div>

        {/* Static noise overlay */}
        <div 
          className="absolute inset-0 pointer-events-none static-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            opacity: 0.15,
            mixBlendMode: 'overlay'
          }}
        />

        {/* Glow effect */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(100, 200, 255, 0.3) 0%, transparent 70%)',
            animation: 'flicker 0.3s infinite',
            filter: 'blur(8px)'
          }}
        />
      </div>
    );
  };

  // Retro version badge component with size variants
  const VersionBadge = ({ size = 'default' }: { size?: 'small' | 'default' | 'large' }) => {
    const sizeStyles = {
      small: { fontSize: '7px', padding: '1.5px 4px', borderWidth: '0px', gap: '2px' },
      default: { fontSize: '7px', padding: '1.5px 4px', borderWidth: '1px', gap: '3px' },
      large: { fontSize: '8px', padding: '2px 5px', borderWidth: '1.5px', gap: '4px' }
    };
    
    const style = sizeStyles[size];
    const hasBorder = size !== 'small';
    
    return (
      <div 
        className={cn(
          "flex items-center font-bold tracking-wider rounded-sm whitespace-nowrap",
          hasBorder && "border"
        )}
        style={{
          fontSize: style.fontSize,
          padding: style.padding,
          borderWidth: style.borderWidth,
          gap: style.gap,
          backgroundColor: 'rgba(255, 107, 157, 0.15)',
          color: 'rgba(255, 107, 157, 0.95)',
          borderColor: 'rgba(255, 107, 157, 0.5)',
          textShadow: '0 0 3px rgba(255, 107, 157, 0.6)',
          boxShadow: '0 0 4px rgba(255, 107, 157, 0.2), inset 0 0 2px rgba(255, 107, 157, 0.1)',
        }}
      >
        v{packageJson.version}
      </div>
    );
  };

  const renderVariant = () => {
    switch (variant) {
      case 'icon':
        return (
          <div className={cn("flex items-center justify-center", className)}>
            <div className="relative inline-flex items-start">
              <div className="relative" style={{ filter: animated === 'electrocuted' ? 'none' : 'drop-shadow(0 0 8px rgba(232, 230, 227, 0.4))' }}>
                <OLogo size="small" animated={animated === 'electrocuted'} />
                {animated !== 'electrocuted' && (
                  <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,rgba(0,0,0,0.15)_1px,rgba(0,0,0,0.15)_2px)]" />
                )}
              </div>
              {showVersion && (
                <div className="absolute -right-1 bottom-0 translate-x-full ml-1.5">
                  <VersionBadge size="small" />
                </div>
              )}
            </div>
          </div>
        );
      
      case 'logo':
        return (
          <div className={cn("flex items-center justify-center", className)}>
            <div className="relative inline-flex items-start">
              <div className="relative" style={{ filter: animated === 'electrocuted' ? 'none' : 'drop-shadow(0 0 15px rgba(232, 230, 227, 0.5))' }}>
                <OLogo size="large" animated={animated === 'electrocuted'} />
                {animated !== 'electrocuted' && (
                  <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,rgba(0,0,0,0.15)_1px,rgba(0,0,0,0.15)_2px)]" />
                )}
              </div>
              {showVersion && (
                <div className="absolute -right-1 bottom-0 translate-x-full ml-2">
                  <VersionBadge size="large" />
                </div>
              )}
            </div>
          </div>
        );
      
      case 'footer':
        return (
          <div className={cn("flex flex-col items-center gap-2", className)}>
            <div className="relative inline-flex items-start">
              <div className="relative" style={{ filter: animated === 'electrocuted' ? 'none' : 'drop-shadow(0 0 8px rgba(232, 230, 227, 0.4))' }}>
                <OLogo size="small" animated={animated === 'electrocuted'} />
                {animated !== 'electrocuted' && (
                  <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,rgba(0,0,0,0.15)_1px,rgba(0,0,0,0.15)_2px)]" />
                )}
              </div>
              {showVersion && (
                <div className="absolute -right-1 bottom-0 translate-x-full ml-1.5">
                  <VersionBadge size="small" />
                </div>
              )}
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
            <div className="relative inline-flex items-start">
              <div className="relative" style={{ filter: animated === 'electrocuted' ? 'none' : 'drop-shadow(0 0 15px rgba(232, 230, 227, 0.5))' }}>
                <OLogo size="large" animated={animated === 'electrocuted'} />
                {animated !== 'electrocuted' && (
                  <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,rgba(0,0,0,0.15)_1px,rgba(0,0,0,0.15)_2px)]" />
                )}
              </div>
              {showVersion && (
                <div className="absolute -right-1 bottom-0 translate-x-full ml-2">
                  <VersionBadge size="large" />
                </div>
              )}
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
