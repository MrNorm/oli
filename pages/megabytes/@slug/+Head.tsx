import logoUrl from "../../../assets/logo.svg";
import { useData } from "vike-react/useData";
import type { Data } from "./+data";

export function Head() {
  const { megabyte } = useData<Data>();
  
  // Use featured image if available, otherwise fallback to logo
  const imageUrl = megabyte?.featuredImage?.url || logoUrl;

  return (
    <>
      {/* Open Graph image - using featured image when available */}
      <meta property="og:type" content="article" />
      <meta property="og:image" content={imageUrl} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:image" content={imageUrl} />
    </>
  );
}
