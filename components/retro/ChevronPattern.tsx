export function ChevronPattern({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 800 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="chevronGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4ecdc4" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#95e1d3" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="chevronGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ff9a76" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ffb88c" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="chevronGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#c77dff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#9b59b6" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* Layered chevron stripes */}
      <path
        d="M0 200 L400 0 L800 200 L800 210 L400 10 L0 210 Z"
        fill="url(#chevronGrad3)"
      />
      <path
        d="M0 220 L400 20 L800 220 L800 230 L400 30 L0 230 Z"
        fill="url(#chevronGrad3)"
        fillOpacity="0.8"
      />
      <path
        d="M0 240 L400 40 L800 240 L800 250 L400 50 L0 250 Z"
        fill="url(#chevronGrad2)"
      />
      <path
        d="M0 260 L400 60 L800 260 L800 270 L400 70 L0 270 Z"
        fill="url(#chevronGrad2)"
        fillOpacity="0.8"
      />
      <path
        d="M0 280 L400 80 L800 280 L800 290 L400 90 L0 290 Z"
        fill="url(#chevronGrad1)"
      />
      <path
        d="M0 300 L400 100 L800 300 L800 310 L400 110 L0 310 Z"
        fill="url(#chevronGrad1)"
        fillOpacity="0.8"
      />
      <path
        d="M0 320 L400 120 L800 320 L800 330 L400 130 L0 330 Z"
        fill="url(#chevronGrad1)"
        fillOpacity="0.6"
      />
    </svg>
  );
}
