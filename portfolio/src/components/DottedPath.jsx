import './DottedPath.css';

export default function DottedPath() {
  return (
    <div className="dotted-path-container">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 6000"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Deep background glowing dashed path */}
        <path
          d="M 1150 450 C 650 900, 200 1300, 720 1700 C 1240 2100, 1100 2700, 250 3100 C -100 3600, 450 4300, 1150 4700 C 1650 5100, 950 5550, 720 5950"
          stroke="rgba(82, 3, 128, 0.12)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="12,16"
          className="dotted-line-base"
        />

        {/* Floating bright glowing dashes (the "blowing" pulse elements) */}
        <path
          d="M 1150 450 C 650 900, 200 1300, 720 1700 C 1240 2100, 1100 2700, 250 3100 C -100 3600, 450 4300, 1150 4700 C 1650 5100, 950 5550, 720 5950"
          stroke="url(#dotted-glow-gradient)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="30, 200"
          className="dotted-line-pulse"
        />

        {/* Definition for the blowing pulse gradient */}
        <defs>
          <linearGradient id="dotted-glow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
            <stop offset="50%" stopColor="#10b981" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8b2fc0" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
