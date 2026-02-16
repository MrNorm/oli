/**
 * Cloudflare Images Loader
 * 
 * This loader optimizes images using Cloudflare's image transformation service.
 * It transforms image URLs to use Cloudflare's /cdn-cgi/image/ endpoint with
 * configurable width, quality, and format parameters.
 * 
 * @see https://developers.cloudflare.com/images/transform-images/
 */

export interface ImageLoaderProps {
  src: string;
  width?: number;
  quality?: number;
  format?: 'auto' | 'webp' | 'avif' | 'jpeg' | 'png';
}

/**
 * Normalize CMS media URLs
 * Transforms URLs from the CMS (/api/media/file/) to CDN URLs
 */
const normalizeCMSUrl = (src: string): string => {
  const CDN_URL = import.meta.env.VITE_CDN_URL || '';
  
  // Check if this is a CMS media URL
  if (src.includes('/api/media/file/')) {
    // Extract the filename from the URL
    const filename = src.split('/api/media/file/')[1]?.split('?')[0];
    if (filename && CDN_URL) {
      // Return CDN URL with filename at root
      return `${CDN_URL}/${filename}`;
    }
  }
  
  return src;
};

/**
 * Normalize the image source URL
 * Removes leading slashes for consistent URL construction
 */
const normalizeSrc = (src: string): string => {
  // First, normalize CMS URLs
  const normalizedCMS = normalizeCMSUrl(src);
  
  // Then handle leading slashes for relative paths
  return normalizedCMS.startsWith('/') ? normalizedCMS.slice(1) : normalizedCMS;
};

/**
 * Cloudflare Images Loader
 * 
 * Transforms image URLs to use Cloudflare's image optimization service.
 * In development, returns the original image with query parameters.
 * In production, uses the /cdn-cgi/image/ endpoint for optimization.
 * 
 * Also handles CMS media URLs, transforming /api/media/file/ paths to CDN URLs.
 * 
 * @example
 * ```typescript
 * const url = cloudflareLoader({ 
 *   src: '/images/photo.jpg', 
 *   width: 800, 
 *   quality: 85 
 * });
 * // Production: /cdn-cgi/image/width=800,quality=85/images/photo.jpg
 * // Development: /images/photo.jpg?width=800&quality=85
 * 
 * // CMS media URL
 * const cmsUrl = cloudflareLoader({
 *   src: '/api/media/file/photo.jpg',
 *   width: 800
 * });
 * // Transforms to: /cdn-cgi/image/width=800/https://cdn-domain.com/photo.jpg
 * ```
 */
export function cloudflareLoader({ 
  src, 
  width, 
  quality, 
  format = 'auto' 
}: ImageLoaderProps): string {
  // Normalize CMS URLs first
  const normalizedSrc = normalizeCMSUrl(src);
  
  const params: string[] = [];

  // Add width parameter if specified
  if (width) {
    params.push(`width=${width}`);
  }

  // Add quality parameter if specified (1-100)
  if (quality) {
    params.push(`quality=${quality}`);
  }

  // Add format parameter
  if (format !== 'auto') {
    params.push(`format=${format}`);
  }

  // In development, serve the original image with query string
  // This allows for easier debugging without requiring Cloudflare's service
  // Can be overridden with VITE_USE_CDN_OPTIMIZATION=true for local testing
  const useCDN = import.meta.env.PROD || import.meta.env.VITE_USE_CDN_OPTIMIZATION === 'true';
  
  if (!useCDN) {
    const queryString = params.length > 0 ? `?${params.join('&')}` : '';
    return `${normalizedSrc}${queryString}`;
  }

  // In production, use Cloudflare's image transformation service
  // Format: /cdn-cgi/image/[options]/[image-path]
  return `/cdn-cgi/image/${params.join(',')}/${normalizeSrc(normalizedSrc)}`;
}

/**
 * Generate a srcset string for responsive images
 * Creates multiple image sizes for different screen densities/sizes
 * 
 * @example
 * ```typescript
 * const srcset = generateSrcSet({
 *   src: '/photos/image.jpg',
 *   widths: [320, 640, 1280]
 * });
 * // Returns: /cdn-cgi/image/width=320/photos/image.jpg 320w, /cdn-cgi/image/width=640/photos/image.jpg 640w, ...
 * ```
 */
export function generateSrcSet({
  src,
  widths,
  quality,
  format,
}: {
  src: string;
  widths: readonly number[] | number[];
  quality?: number;
  format?: 'auto' | 'webp' | 'avif' | 'jpeg' | 'png';
}): string {
  return widths
    .map((width) => {
      const url = cloudflareLoader({ src, width, quality, format });
      return `${url} ${width}w`;
    })
    .join(', ');
}

/**
 * Common responsive image widths for different use cases
 */
export const RESPONSIVE_WIDTHS = {
  // Small images (avatars, thumbnails)
  small: [64, 128, 256],
  // Medium images (cards, gallery items)
  medium: [320, 640, 960, 1280],
  // Large images (full width, hero images)
  large: [640, 1280, 1920, 2560],
  // Full bleed images (very large displays)
  xlarge: [1280, 1920, 2560, 3840],
} as const;
