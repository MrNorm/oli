export function ScanLines({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="scanlines"
          width="100%"
          height="4"
          patternUnits="userSpaceOnUse"
        >
          <line
            x1="0"
            y1="0"
            x2="100%"
            y2="0"
            stroke="rgba(255, 255, 255, 0.03)"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#scanlines)" />
    </svg>
  );
}
