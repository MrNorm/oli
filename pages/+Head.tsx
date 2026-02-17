// https://vike.dev/Head

import logoUrl from "../assets/logo.svg";
import { useConfig } from "vike-react/useConfig";

export function Head() {
  const config = useConfig();
  const title = config.title || "Oliver Northam";
  const description = config.description || "Developer, designer, and builder of digital experiences. Explore my projects, writings, and creative experiments.";

  return (
    <>
      {/* Page Title */}
      <title>{title}</title>
      
      {/* Favicon */}
      <link rel="icon" href={logoUrl} type="image/svg+xml" />
      <link rel="apple-touch-icon" href={logoUrl} />
      
      {/* Primary Meta Tags */}
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={logoUrl} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={logoUrl} />
      
      {/* Additional Meta */}
      <meta name="theme-color" content="#000000" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </>
  );
}
