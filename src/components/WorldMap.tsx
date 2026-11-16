import React, { useState } from 'react';

export interface DiplomaticHub {
  id: string;
  name: string;
  country: string;
  role: string;
  x: number; // percentage in viewBox (0 to 1000)
  y: number; // percentage in viewBox (0 to 500)
  isHost?: boolean;
}

export const diplomaticHubs: DiplomaticHub[] = [
  { id: 'nita', name: 'Agartala (NIT Agartala)', country: 'India', role: 'Host Secretariat & Assembly Dais', x: 726, y: 228, isHost: true },
  { id: 'delhi', name: 'New Delhi', country: 'India', role: 'National Diplomatic Capital', x: 698, y: 215 },
  { id: 'nyc', name: 'New York', country: 'United States', role: 'UN Headquarters / Security Council', x: 275, y: 172 },
  { id: 'geneva', name: 'Geneva', country: 'Switzerland', role: 'UN Office at Geneva / UNHRC', x: 508, y: 156 },
  { id: 'london', name: 'London', country: 'United Kingdom', role: 'Commonwealth & Diplomatic Secretariat', x: 490, y: 142 },
  { id: 'nairobi', name: 'Nairobi', country: 'Kenya', role: 'UN Office at Nairobi (UNON)', x: 588, y: 295 },
  { id: 'tokyo', name: 'Tokyo', country: 'Japan', role: 'Asia-Pacific Diplomatic Forum', x: 865, y: 182 },
  { id: 'brasilia', name: 'Brasília', country: 'Brazil', role: 'South American Multilateral Hub', x: 350, y: 350 },
  { id: 'cairo', name: 'Cairo', country: 'Egypt', role: 'League of Arab States & African Union', x: 566, y: 205 },
  { id: 'sydney', name: 'Sydney', country: 'Australia', role: 'Oceania Regional Delegation', x: 885, y: 405 },
  { id: 'vienna', name: 'Vienna', country: 'Austria', role: 'UN Office at Vienna (UNOV)', x: 526, y: 148 },
  { id: 'singapore', name: 'Singapore', country: 'Singapore', role: 'Maritime Trade & ASEAN Council', x: 765, y: 285 },
];

// Great circle connection arcs (from global hubs to NIT Agartala and between major capitals)
const connectionArcs = [
  // NYC to Agartala (Host)
  { from: 'nyc', to: 'nita', curve: -60 },
  // Geneva to Agartala
  { from: 'geneva', to: 'nita', curve: -45 },
  // London to Agartala
  { from: 'london', to: 'nita', curve: -50 },
  // Nairobi to Agartala
  { from: 'nairobi', to: 'nita', curve: 35 },
  // Tokyo to Agartala
  { from: 'tokyo', to: 'nita', curve: -30 },
  // Brasilia to Agartala
  { from: 'brasilia', to: 'nita', curve: 70 },
  // Cairo to Agartala
  { from: 'cairo', to: 'nita', curve: -20 },
  // Sydney to Agartala
  { from: 'sydney', to: 'nita', curve: 40 },
  // New Delhi to Agartala
  { from: 'delhi', to: 'nita', curve: -15 },
  // Singapore to Agartala
  { from: 'singapore', to: 'nita', curve: 20 },
  // Cross arcs (NYC to Geneva, Geneva to Nairobi)
  { from: 'nyc', to: 'london', curve: -35 },
  { from: 'geneva', to: 'cairo', curve: 15 },
];

export interface WorldMapProps {
  progress?: number; // 0 to 1 for scroll progression
  className?: string;
  activeHubId?: string | null;
  onSelectHub?: (hub: DiplomaticHub | null) => void;
}

export const WorldMap: React.FC<WorldMapProps> = ({
  className = '',
  onSelectHub,
}) => {
  const [hoveredHub, setHoveredHub] = useState<DiplomaticHub | null>(null);

  const handleHubHover = (hub: DiplomaticHub | null) => {
    setHoveredHub(hub);
    if (onSelectHub) onSelectHub(hub);
  };

  // Helper to generate arc path between two hubs
  const getArcPath = (fromId: string, toId: string, curve: number) => {
    const from = diplomaticHubs.find((h) => h.id === fromId);
    const to = diplomaticHubs.find((h) => h.id === toId);
    if (!from || !to) return '';

    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const midX = (from.x + to.x) / 2;
    const midY = (from.y + to.y) / 2;

    // Control point displaced perpendicular to line
    const normalX = -dy / Math.sqrt(dx * dx + dy * dy);
    const normalY = dx / Math.sqrt(dx * dx + dy * dy);

    const cpX = midX + normalX * curve;
    const cpY = midY + normalY * curve;

    return `M ${from.x} ${from.y} Q ${cpX} ${cpY} ${to.x} ${to.y}`;
  };

  return (
    <div className={`relative w-full overflow-hidden select-none ${className}`}>
      {/* SVG Container with 1000x520 aspect ratio */}
      <svg
        viewBox="0 0 1000 520"
        className="w-full h-auto max-h-[75vh] mx-auto filter drop-shadow-xs"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Interactive Diplomatic World Map"
      >
        <defs>
          {/* Subtle dotted pattern for landmass fill */}
          <pattern
            id="dottedPattern"
            width="8"
            height="8"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="4" cy="4" r="1.1" fill="#25231F" fillOpacity="0.32" />
          </pattern>

          {/* Denser pattern for prominent zones */}
          <pattern
            id="densePattern"
            width="6"
            height="6"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="3" cy="3" r="1" fill="#25231F" fillOpacity="0.45" />
          </pattern>

          {/* Crimson glow filter for host node */}
          <filter id="crimsonGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#CB1B29" floodOpacity="0.6" />
          </filter>

          {/* Linear gradient for connecting lines */}
          <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#CB1B29" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#CB1B29" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#CB1B29" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {/* 1. CARTOGRAPHIC LATITUDE & LONGITUDE GRIDS */}
        <g className="opacity-25" stroke="#25231F" strokeWidth="0.6" strokeDasharray="3 3">
          {/* Equator */}
          <line x1="40" y1="260" x2="960" y2="260" stroke="#CB1B29" strokeWidth="0.8" strokeOpacity="0.4" />
          {/* Tropic of Cancer */}
          <line x1="40" y1="198" x2="960" y2="198" />
          {/* Tropic of Capricorn */}
          <line x1="40" y1="322" x2="960" y2="322" />
          {/* Meridian lines */}
          <line x1="200" y1="40" x2="200" y2="480" />
          <line x1="350" y1="40" x2="350" y2="480" />
          <line x1="500" y1="40" x2="500" y2="480" />
          <line x1="650" y1="40" x2="650" y2="480" />
          <line x1="800" y1="40" x2="800" y2="480" />
        </g>

        {/* Technical Coordinate Indicators */}
        <g className="font-mono-tech text-[8px] fill-[#25231F]/40 select-none">
          <text x="45" y="256">00°00' EQUATOR</text>
          <text x="45" y="194">23°26' N TROPIC OF CANCER</text>
          <text x="45" y="318">23°26' S TROPIC OF CAPRICORN</text>
          <text x="504" y="50">00°00' PRIME MERIDIAN</text>
          <text x="732" y="244" fill="#CB1B29" fontWeight="600">NIT AGARTALA // 23°50'N 91°16'E</text>
        </g>

        {/* 2. WORLD CONTINENTS SILHOUETTES & DOTTED TEXTURE */}
        {/* We use precise stylized simplified paths representing world continents with dotted fills */}
        <g className="transition-opacity duration-1000 ease-out">
          {/* North America */}
          <path
            d="M 120 70 
               C 150 60, 220 50, 280 65 
               C 320 80, 310 120, 290 145 
               C 275 160, 285 185, 270 215 
               C 255 240, 225 245, 205 235 
               C 185 220, 175 180, 150 170 
               C 130 160, 110 130, 110 100 Z"
            fill="url(#dottedPattern)"
            stroke="#25231F"
            strokeWidth="0.8"
            strokeOpacity="0.25"
          />

          {/* Central America & Caribbean */}
          <path
            d="M 205 235 
               C 215 250, 230 270, 245 285 
               C 240 290, 230 280, 220 265 
               C 205 250, 195 240, 205 235 Z"
            fill="#25231F"
            fillOpacity="0.15"
          />

          {/* South America */}
          <path
            d="M 250 280 
               C 290 285, 360 300, 375 340 
               C 390 380, 350 430, 310 460 
               C 290 475, 275 450, 275 410 
               C 275 370, 240 330, 245 300 Z"
            fill="url(#dottedPattern)"
            stroke="#25231F"
            strokeWidth="0.8"
            strokeOpacity="0.25"
          />

          {/* Europe */}
          <path
            d="M 460 100 
               C 490 85, 540 85, 560 110 
               C 570 130, 550 160, 520 175 
               C 480 185, 450 160, 450 130 Z"
            fill="url(#densePattern)"
            stroke="#25231F"
            strokeWidth="0.8"
            strokeOpacity="0.3"
          />
          {/* British Isles */}
          <path
            d="M 465 115 C 475 110, 480 125, 475 135 C 470 140, 460 135, 465 115 Z"
            fill="#25231F"
            fillOpacity="0.2"
          />

          {/* Africa */}
          <path
            d="M 470 185 
               C 530 180, 580 200, 595 240 
               C 610 280, 600 340, 570 390 
               C 540 430, 510 420, 495 380 
               C 475 330, 440 260, 450 220 Z"
            fill="url(#dottedPattern)"
            stroke="#25231F"
            strokeWidth="0.8"
            strokeOpacity="0.25"
          />

          {/* Eurasia / Middle East & Russia */}
          <path
            d="M 550 90 
               C 640 70, 750 65, 870 95 
               C 910 115, 880 160, 840 175 
               C 780 190, 750 170, 700 180 
               C 640 185, 590 170, 560 130 Z"
            fill="url(#dottedPattern)"
            stroke="#25231F"
            strokeWidth="0.8"
            strokeOpacity="0.25"
          />

          {/* South Asia & Indian Subcontinent (Denser, emphasized with subtle crimson rim) */}
          <path
            d="M 670 195 
               C 700 190, 745 200, 755 230 
               C 760 250, 730 295, 715 305 
               C 700 315, 680 270, 665 240 Z"
            fill="url(#densePattern)"
            stroke="#CB1B29"
            strokeWidth="1"
            strokeOpacity="0.4"
          />

          {/* East Asia & Southeast Asia */}
          <path
            d="M 760 170 
               C 810 165, 860 180, 865 220 
               C 850 260, 800 270, 770 260 
               C 750 240, 745 200, 760 170 Z"
            fill="url(#dottedPattern)"
            stroke="#25231F"
            strokeWidth="0.8"
            strokeOpacity="0.25"
          />

          {/* Japan archipelago */}
          <path
            d="M 870 160 C 880 175, 875 195, 860 205 C 855 200, 865 180, 870 160 Z"
            fill="#25231F"
            fillOpacity="0.25"
          />

          {/* Australia & Oceania */}
          <path
            d="M 800 340 
               C 860 330, 920 350, 925 390 
               C 920 440, 860 450, 810 435 
               C 775 410, 770 365, 800 340 Z"
            fill="url(#dottedPattern)"
            stroke="#25231F"
            strokeWidth="0.8"
            strokeOpacity="0.25"
          />
        </g>

        {/* 3. DYNAMIC DOTTED MATRIX (Over 180 calibrated dots across key territory coordinates) */}
        <g className="fill-[#25231F]/35">
          {/* North America dots */}
          {[
            [160, 90], [180, 85], [200, 90], [220, 85], [240, 95], [260, 100], [280, 90],
            [150, 110], [170, 115], [190, 110], [210, 115], [230, 120], [250, 115], [270, 125],
            [170, 140], [190, 145], [210, 140], [230, 145], [250, 150], [270, 155], [290, 140],
            [190, 170], [210, 175], [230, 170], [250, 175], [270, 180],
            [210, 205], [230, 200], [250, 210]
          ].map(([x, y], i) => (
            <circle key={`na-${i}`} cx={x} cy={y} r="1.3" />
          ))}

          {/* South America dots */}
          {[
            [260, 290], [280, 295], [300, 300], [320, 310], [340, 320],
            [270, 325], [290, 330], [310, 335], [330, 345], [350, 350], [365, 345],
            [280, 360], [300, 370], [320, 380], [340, 390],
            [290, 400], [305, 415], [320, 425], [300, 440], [295, 460]
          ].map(([x, y], i) => (
            <circle key={`sa-${i}`} cx={x} cy={y} r="1.3" />
          ))}

          {/* Europe dots */}
          {[
            [470, 110], [490, 105], [510, 110], [530, 105], [550, 115],
            [465, 130], [485, 125], [505, 130], [525, 125], [545, 135],
            [470, 150], [490, 155], [510, 150], [530, 155], [550, 160]
          ].map(([x, y], i) => (
            <circle key={`eu-${i}`} cx={x} cy={y} r="1.4" fill="#25231F" fillOpacity="0.45" />
          ))}

          {/* Africa dots */}
          {[
            [460, 195], [480, 190], [500, 195], [520, 190], [540, 195], [560, 205],
            [470, 220], [490, 225], [510, 230], [530, 235], [550, 240], [570, 245], [590, 255],
            [480, 260], [500, 265], [520, 275], [540, 285], [560, 295], [580, 305],
            [490, 310], [510, 325], [530, 340], [550, 355], [570, 365],
            [510, 375], [530, 390], [550, 400], [530, 420]
          ].map(([x, y], i) => (
            <circle key={`af-${i}`} cx={x} cy={y} r="1.3" />
          ))}

          {/* Asia / Eurasia dots */}
          {[
            [580, 110], [610, 105], [640, 100], [670, 95], [700, 95], [730, 90], [760, 90], [790, 95], [820, 100],
            [590, 130], [620, 125], [650, 120], [680, 120], [710, 115], [740, 115], [770, 120], [800, 125], [830, 130],
            [600, 155], [630, 150], [660, 145], [690, 145], [720, 140], [750, 145], [780, 150], [810, 155], [840, 160],
            [610, 180], [640, 175], [670, 175], [770, 180], [800, 185], [830, 190],
            // High Density South Asia / India
            [680, 205], [700, 205], [720, 215], [740, 210],
            [685, 230], [705, 230], [725, 235], [745, 235],
            [695, 255], [715, 255], [730, 260],
            [705, 280], [715, 290]
          ].map(([x, y], i) => (
            <circle key={`as-${i}`} cx={x} cy={y} r="1.3" />
          ))}

          {/* Australia dots */}
          {[
            [800, 360], [825, 355], [850, 360], [875, 365], [900, 370],
            [795, 385], [820, 385], [845, 390], [870, 395], [895, 400],
            [810, 415], [835, 415], [860, 420], [885, 425],
            [830, 440], [855, 445]
          ].map(([x, y], i) => (
            <circle key={`au-${i}`} cx={x} cy={y} r="1.3" />
          ))}
        </g>

        {/* 4. ANIMATED DIPLOMATIC CONNECTION ARCS (Crimson lines) */}
        <g>
          {connectionArcs.map((arc, i) => {
            const pathData = getArcPath(arc.from, arc.to, arc.curve);
            if (!pathData) return null;
            return (
              <g key={`arc-${i}`}>
                {/* Background faint path */}
                <path
                  d={pathData}
                  stroke="#CB1B29"
                  strokeWidth="1.2"
                  strokeOpacity="0.22"
                  strokeDasharray="4 3"
                />
                {/* Foreground animated energy pulse */}
                <path
                  d={pathData}
                  stroke="#CB1B29"
                  strokeWidth="1.6"
                  strokeOpacity="0.75"
                  className="animate-line-flow"
                  style={{
                    animationDelay: `${i * 0.4}s`,
                    animationDuration: `${14 + (i % 5) * 3}s`,
                  }}
                />
              </g>
            );
          })}
        </g>

        {/* 5. STRATEGIC DIPLOMATIC HUBS / NODES */}
        <g>
          {diplomaticHubs.map((hub) => {
            const isHovered = hoveredHub?.id === hub.id;
            const isHost = hub.isHost;

            return (
              <g
                key={hub.id}
                className="cursor-pointer transition-transform duration-300 group focus:outline-none"
                onMouseEnter={() => handleHubHover(hub)}
                onMouseLeave={() => handleHubHover(null)}
                tabIndex={0}
                role="button"
                aria-label={`${hub.name}, ${hub.country} - ${hub.role}`}
                onFocus={() => handleHubHover(hub)}
                onBlur={() => handleHubHover(null)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleHubHover(hoveredHub?.id === hub.id ? null : hub);
                  }
                }}
              >
                {/* Host Hub (NIT Agartala) special radar wave pulse */}
                {isHost && (
                  <>
                    <circle
                      cx={hub.x}
                      cy={hub.y}
                      r="18"
                      stroke="#CB1B29"
                      strokeWidth="1"
                      strokeOpacity="0.3"
                      className="animate-ping"
                      style={{ animationDuration: '3s' }}
                    />
                    <circle
                      cx={hub.x}
                      cy={hub.y}
                      r="11"
                      stroke="#CB1B29"
                      strokeWidth="1.2"
                      strokeDasharray="2 2"
                      className="animate-spin"
                      style={{ animationDuration: '10s' }}
                    />
                  </>
                )}

                {/* Outer halo */}
                <circle
                  cx={hub.x}
                  cy={hub.y}
                  r={isHost ? 7 : isHovered ? 6 : 4}
                  fill={isHost ? '#CB1B29' : '#25231F'}
                  fillOpacity={isHost ? 0.25 : 0.15}
                  className="transition-all duration-300"
                />

                {/* Core node */}
                <circle
                  cx={hub.x}
                  cy={hub.y}
                  r={isHost ? 4.5 : isHovered ? 3.5 : 2.5}
                  fill={isHost ? '#CB1B29' : isHovered ? '#CB1B29' : '#25231F'}
                  filter={isHost ? 'url(#crimsonGlow)' : undefined}
                  className="transition-all duration-300"
                />

                {/* Host Label (Permanent diplomatic badge on map) */}
                {isHost ? (
                  <g>
                    {/* Editorial callout tag */}
                    <rect
                      x={hub.x + 12}
                      y={hub.y - 20}
                      width="135"
                      height="24"
                      fill="#F6F4EB"
                      stroke="#CB1B29"
                      strokeWidth="1"
                      rx="2"
                    />
                    <text
                      x={hub.x + 18}
                      y={hub.y - 7}
                      className="font-mono-tech text-[9px] font-bold fill-[#CB1B29] tracking-wider uppercase"
                    >
                      NIT AGARTALA (HOST)
                    </text>
                    <line
                      x1={hub.x + 5}
                      y1={hub.y - 2}
                      x2={hub.x + 12}
                      y2={hub.y - 8}
                      stroke="#CB1B29"
                      strokeWidth="1"
                    />
                  </g>
                ) : (
                  /* Standard Node Label (Visible on hover or large screens) */
                  <text
                    x={hub.x + 7}
                    y={hub.y + 3}
                    className={`font-mono-tech text-[7.5px] tracking-wide transition-opacity duration-200 select-none ${
                      isHovered
                        ? 'opacity-100 fill-[#CB1B29] font-bold'
                        : 'opacity-40 fill-[#25231F]'
                    }`}
                  >
                    {hub.name.split(' ')[0]}
                  </text>
                )}
              </g>
            );
          })}
        </g>
      </svg>

      {/* Floating Info Overlay for hovered hub */}
      {hoveredHub && (
        <div className="absolute bottom-4 left-4 sm:left-8 bg-[#F6F4EB]/95 border border-[#CB1B29] p-3 rounded-xs shadow-md backdrop-blur-md max-w-xs animate-in fade-in duration-200">
          <div className="flex items-center gap-1.5 text-[10px] font-mono-tech text-[#CB1B29] uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CB1B29] animate-pulse" />
            Diplomatic Node // {hoveredHub.country}
          </div>
          <div className="font-serif-display text-lg font-bold text-[#25231F] mt-0.5">
            {hoveredHub.name}
          </div>
          <div className="text-xs text-[#25231F]/70 font-body mt-1">
            {hoveredHub.role}
          </div>
        </div>
      )}
    </div>
  );
};
