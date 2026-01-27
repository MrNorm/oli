export function GeometricCircle({
  className = "",
  color = "teal",
}: {
  className?: string;
  color?: "teal" | "orange" | "purple" | "pink";
}) {
  const colors = {
    teal: "#4ecdc4",
    orange: "#ff9a76",
    purple: "#9b59b6",
    pink: "#ff6b9d",
  };

  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="100"
        cy="100"
        r="80"
        stroke={colors[color]}
        strokeWidth="2"
        fill="none"
        opacity="0.6"
      />
      <circle
        cx="100"
        cy="100"
        r="60"
        stroke={colors[color]}
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
      />
      <circle
        cx="100"
        cy="100"
        r="40"
        stroke={colors[color]}
        strokeWidth="1"
        fill="none"
        opacity="0.3"
      />
    </svg>
  );
}

export function GeometricTriangle({
  className = "",
  color = "orange",
}: {
  className?: string;
  color?: "teal" | "orange" | "purple" | "pink";
}) {
  const colors = {
    teal: "#4ecdc4",
    orange: "#ff9a76",
    purple: "#9b59b6",
    pink: "#ff6b9d",
  };

  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`triangleGrad-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors[color]} stopOpacity="0.2" />
          <stop offset="100%" stopColor={colors[color]} stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <path
        d="M100 20 L180 180 L20 180 Z"
        stroke={colors[color]}
        strokeWidth="2"
        fill={`url(#triangleGrad-${color})`}
        opacity="0.7"
      />
      <path
        d="M100 40 L160 160 L40 160 Z"
        stroke={colors[color]}
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}

export function GeometricSquare({
  className = "",
  color = "purple",
}: {
  className?: string;
  color?: "teal" | "orange" | "purple" | "pink";
}) {
  const colors = {
    teal: "#4ecdc4",
    orange: "#ff9a76",
    purple: "#9b59b6",
    pink: "#ff6b9d",
  };

  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="30"
        y="30"
        width="140"
        height="140"
        stroke={colors[color]}
        strokeWidth="2"
        fill="none"
        opacity="0.6"
        transform="rotate(45 100 100)"
      />
      <rect
        x="50"
        y="50"
        width="100"
        height="100"
        stroke={colors[color]}
        strokeWidth="1.5"
        fill="none"
        opacity="0.4"
        transform="rotate(45 100 100)"
      />
    </svg>
  );
}

export function BlueprintLines({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Technical drawing style lines */}
      <line x1="50" y1="50" x2="350" y2="50" stroke="#4ecdc4" strokeWidth="0.5" opacity="0.5" />
      <line x1="50" y1="150" x2="350" y2="150" stroke="#4ecdc4" strokeWidth="0.5" opacity="0.5" />
      <line x1="50" y1="250" x2="350" y2="250" stroke="#4ecdc4" strokeWidth="0.5" opacity="0.5" />
      
      <line x1="100" y1="30" x2="100" y2="270" stroke="#ff9a76" strokeWidth="0.5" opacity="0.5" />
      <line x1="200" y1="30" x2="200" y2="270" stroke="#ff9a76" strokeWidth="0.5" opacity="0.5" />
      <line x1="300" y1="30" x2="300" y2="270" stroke="#ff9a76" strokeWidth="0.5" opacity="0.5" />

      {/* Corner markers */}
      <circle cx="100" cy="50" r="3" fill="#c77dff" opacity="0.6" />
      <circle cx="200" cy="150" r="3" fill="#c77dff" opacity="0.6" />
      <circle cx="300" cy="250" r="3" fill="#c77dff" opacity="0.6" />
    </svg>
  );
}
