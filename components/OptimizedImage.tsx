/**
 * OptimizedImage Component
 * 
 * A React component that uses Cloudflare Images for automatic image optimization.
 * Supports responsive images, lazy loading, and modern image formats.
 */

import { ImgHTMLAttributes } from 'react';
import { 
  cloudflareLoader, 
  generateSrcSet, 
  RESPONSIVE_WIDTHS, 
  type ImageLoaderProps 
} from '@/lib/image-loader';
import { cn } from '@/lib/utils';

export interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> {
  /** Image source URL */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Target width for the image (used for optimization) */
  width?: number;
  /** Target height for the image (for aspect ratio) */
  height?: number;
  /** Image quality (1-100, default: 85) */
  quality?: number;
  /** Image format (default: 'auto') */
  format?: 'auto' | 'webp' | 'avif' | 'jpeg' | 'png';
  /** Preset for responsive widths */
  responsive?: 'small' | 'medium' | 'large' | 'xlarge' | false;
  /** Custom srcset widths (overrides responsive preset) */
  srcSetWidths?: readonly number[] | number[];
  /** Sizes attribute for responsive images */
  sizes?: string;
  /** Enable lazy loading (default: true) */
  lazy?: boolean;
  /** Priority loading (disables lazy loading, useful for above-the-fold images) */
  priority?: boolean;
}

/**
 * OptimizedImage component using Cloudflare Images
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <OptimizedImage 
 *   src="/photos/image.jpg" 
 *   alt="Description" 
 *   width={800} 
 * />
 * 
 * // With responsive images
 * <OptimizedImage 
 *   src="/photos/hero.jpg" 
 *   alt="Hero"
 *   responsive="large"
 *   sizes="100vw"
 * />
 * 
 * // Priority loading (for above-the-fold images)
 * <OptimizedImage 
 *   src="/photos/featured.jpg" 
 *   alt="Featured" 
 *   priority 
 * />
 * ```
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  quality = 85,
  format = 'auto',
  responsive = 'medium',
  srcSetWidths,
  sizes,
  lazy = true,
  priority = false,
  className,
  ...props
}: OptimizedImageProps) {
  // Determine if we should use responsive images
  const shouldUseResponsive = responsive !== false;
  
  // Get the widths for srcset
  const widths = srcSetWidths || (shouldUseResponsive && responsive ? RESPONSIVE_WIDTHS[responsive] : undefined);

  // Generate the main src URL
  const optimizedSrc = cloudflareLoader({
    src,
    width: width || (widths && widths[widths.length - 1]) || undefined,
    quality,
    format,
  });

  // Generate srcset if widths are provided
  const srcSet = widths
    ? generateSrcSet({
        src,
        widths,
        quality,
        format,
      })
    : undefined;

  // Determine loading strategy
  const loading = priority ? 'eager' : (lazy ? 'lazy' : 'eager');
  
  // Add fetchpriority for priority images
  const fetchPriority = priority ? 'high' : undefined;

  return (
    <img
      src={optimizedSrc}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
      className={cn('transition-opacity duration-300', className)}
      {...props}
    />
  );
}

/**
 * Hook to get an optimized image URL
 * Useful when you need just the URL without the component
 * 
 * @example
 * ```tsx
 * const Component = () => {
 *   const imageUrl = useOptimizedImage({
 *     src: '/photo.jpg',
 *     width: 800
 *   });
 *   
 *   return <div style={{ backgroundImage: `url(${imageUrl})` }} />;
 * };
 * ```
 */
export function useOptimizedImage(props: ImageLoaderProps): string {
  return cloudflareLoader(props);
}
