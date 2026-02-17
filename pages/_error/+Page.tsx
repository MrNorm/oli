import { usePageContext } from "vike-react/usePageContext";
import { Logo } from "../../components/retro";
import { Link } from "../../components/Link";

export default function Page() {
  const { is404 } = usePageContext();
  
  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center px-4">
      <div className="flex flex-col items-center text-center space-y-8 max-w-md">
        {/* Animated Logo */}
        <div className="mb-4">
          <Logo variant="logo" animated="electrocuted" />
        </div>
        
        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-foreground">
            {is404 ? "404" : "Error"}
          </h1>
          <h2 className="text-2xl font-semibold text-foreground/90">
            {is404 ? "Page Not Found" : "Something Went Wrong"}
          </h2>
          <p className="text-foreground/70 text-lg">
            {is404 
              ? "The page you're looking for doesn't exist or has been moved."
              : "An unexpected error occurred. Please try again later."}
          </p>
        </div>
        
        {/* Action Button */}
        <Link 
          href="/" 
          className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-foreground bg-foreground/5 hover:bg-foreground/10 border border-foreground/20 rounded-lg transition-colors duration-200"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
