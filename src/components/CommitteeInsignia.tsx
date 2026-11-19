import React from 'react';

interface InsigniaProps {
  id: string; // 'unsc' | 'unhrc' | 'uncsw' | 'aippm'
  className?: string;
  size?: number | string;
}

export const CommitteeInsignia: React.FC<InsigniaProps> = ({ id, className = '', size = '100%' }) => {
  switch (id.toLowerCase()) {
    case 'unsc':
      // United Nations Security Council: Globe with latitude/longitude, double diplomatic ring, laurel branches, and 5 Security Council stars
      return (
        <svg
          viewBox="0 0 200 200"
          fill="none"
          stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          style={{ width: size, height: size }}
          aria-hidden="true"
        >
          {/* Outer Diplomatic Compass Ring */}
          <circle cx="100" cy="100" r="92" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
          <circle cx="100" cy="100" r="84" strokeWidth="1" />
          <circle cx="100" cy="100" r="80" strokeWidth="0.75" opacity="0.4" />

          {/* Central Globe */}
          <circle cx="100" cy="100" r="48" strokeWidth="1.5" />
          {/* Equator & Latitude Lines */}
          <line x1="52" y1="100" x2="148" y2="100" strokeWidth="1" />
          <ellipse cx="100" cy="100" rx="48" ry="24" strokeWidth="1" strokeDasharray="2 2" />
          <ellipse cx="100" cy="100" rx="48" ry="12" strokeWidth="0.75" />
          {/* Longitude Meridian Lines */}
          <line x1="100" y1="52" x2="100" y2="148" strokeWidth="1" />
          <ellipse cx="100" cy="100" rx="24" ry="48" strokeWidth="1" />
          <ellipse cx="100" cy="100" rx="38" ry="48" strokeWidth="0.75" strokeDasharray="2 2" />

          {/* Laurel Olive Wreath Left */}
          <path
            d="M 68 152 C 45 138 40 100 46 76 C 48 68 53 60 58 54"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="M 44 88 C 38 84 36 78 40 74 C 44 70 50 74 50 80" strokeWidth="1.2" fill="currentColor" fillOpacity="0.15" />
          <path d="M 42 108 C 36 106 34 100 38 96 C 42 92 48 96 48 102" strokeWidth="1.2" fill="currentColor" fillOpacity="0.15" />
          <path d="M 46 128 C 40 126 38 120 42 116 C 46 112 52 116 52 122" strokeWidth="1.2" fill="currentColor" fillOpacity="0.15" />
          <path d="M 54 144 C 48 144 46 138 50 134 C 54 130 60 134 60 140" strokeWidth="1.2" fill="currentColor" fillOpacity="0.15" />

          {/* Laurel Olive Wreath Right */}
          <path
            d="M 132 152 C 155 138 160 100 154 76 C 152 68 147 60 142 54"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="M 156 88 C 162 84 164 78 160 74 C 156 70 150 74 150 80" strokeWidth="1.2" fill="currentColor" fillOpacity="0.15" />
          <path d="M 158 108 C 164 106 166 100 162 96 C 158 92 152 96 152 102" strokeWidth="1.2" fill="currentColor" fillOpacity="0.15" />
          <path d="M 154 128 C 160 126 162 120 158 116 C 154 112 148 116 148 122" strokeWidth="1.2" fill="currentColor" fillOpacity="0.15" />
          <path d="M 146 144 C 152 144 154 138 150 134 C 146 130 140 134 140 140" strokeWidth="1.2" fill="currentColor" fillOpacity="0.15" />

          {/* Five Permanent Security Council Stars atop crest */}
          <g transform="translate(100, 32)">
            {/* Center Star */}
            <polygon points="0,-7 2,-2 7,-2 3,1 5,6 0,3 -5,6 -3,1 -7,-2 -2,-2" fill="currentColor" strokeWidth="0.5" />
            {/* Left Stars */}
            <polygon points="-16,-4 -14,0 -10,0 -13,2 -11,6 -15,4 -19,6 -18,2 -21,0 -17,0" fill="currentColor" strokeWidth="0.5" />
            <polygon points="-30,3 -28,7 -24,7 -27,9 -25,13 -29,11 -33,13 -32,9 -35,7 -31,7" fill="currentColor" strokeWidth="0.5" />
            {/* Right Stars */}
            <polygon points="16,-4 18,0 22,0 19,2 21,6 17,4 13,6 14,2 11,0 15,0" fill="currentColor" strokeWidth="0.5" />
            <polygon points="30,3 32,7 36,7 33,9 35,13 31,11 27,13 28,9 25,7 29,7" fill="currentColor" strokeWidth="0.5" />
          </g>

          {/* Crossed Gavel & Key of Peace at bottom */}
          <path d="M 88 160 L 112 160" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="100" cy="160" r="3" fill="currentColor" />
        </svg>
      );

    case 'unhrc':
      // United Nations Human Rights Council: Classical Scales of Universal Justice, Pillar of Law, Flame of Human Dignity
      return (
        <svg
          viewBox="0 0 200 200"
          fill="none"
          stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          style={{ width: size, height: size }}
          aria-hidden="true"
        >
          {/* Outer Framing Octagon / Seal */}
          <circle cx="100" cy="100" r="92" strokeWidth="1" strokeDasharray="4 2" opacity="0.6" />
          <circle cx="100" cy="100" r="85" strokeWidth="1.5" />

          {/* Central Pillar of Justice */}
          <line x1="100" y1="42" x2="100" y2="152" strokeWidth="3" strokeLinecap="round" />
          {/* Pillar Pedestal / Base */}
          <path d="M 72 152 L 128 152" strokeWidth="3" strokeLinecap="round" />
          <path d="M 80 146 L 120 146" strokeWidth="1.5" />
          <path d="M 86 140 L 114 140" strokeWidth="1" />

          {/* Top Finial & Flame */}
          <circle cx="100" cy="40" r="6" strokeWidth="2" fill="currentColor" fillOpacity="0.2" />
          <path d="M 100 28 C 96 34 100 37 100 40 C 100 37 104 34 100 28 Z" fill="currentColor" />

          {/* Balanced Balance Beam */}
          <path d="M 52 64 Q 100 68 148 64" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="52" cy="64" r="3" fill="currentColor" />
          <circle cx="148" cy="64" r="3" fill="currentColor" />
          <circle cx="100" cy="66" r="4" fill="currentColor" />

          {/* Left Scale Pan */}
          <line x1="52" y1="64" x2="38" y2="106" strokeWidth="1" strokeDasharray="2 1" />
          <line x1="52" y1="64" x2="66" y2="106" strokeWidth="1" strokeDasharray="2 1" />
          <path d="M 34 106 C 34 118 70 118 70 106 Z" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />

          {/* Right Scale Pan */}
          <line x1="148" y1="64" x2="134" y2="106" strokeWidth="1" strokeDasharray="2 1" />
          <line x1="148" y1="64" x2="162" y2="106" strokeWidth="1" strokeDasharray="2 1" />
          <path d="M 130 106 C 130 118 166 118 166 106 Z" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />

          {/* Rays of Universal Liberties Behind Top */}
          <line x1="100" y1="20" x2="100" y2="12" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          <line x1="84" y1="24" x2="78" y2="18" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
          <line x1="116" y1="24" x2="122" y2="18" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
          <line x1="72" y1="34" x2="65" y2="30" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
          <line x1="128" y1="34" x2="135" y2="30" strokeWidth="1" strokeLinecap="round" opacity="0.4" />

          {/* Human Dignity Silhouette Profile in background */}
          <circle cx="100" cy="102" r="16" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
          <path d="M 80 134 C 80 120 120 120 120 134" strokeWidth="1" opacity="0.4" strokeDasharray="2 2" />
        </svg>
      );

    case 'uncsw':
      // United Nations Commission on the Status of Women: Venus Equality Symbol, Radiant Sun, Dove of Multilateral Peace
      return (
        <svg
          viewBox="0 0 200 200"
          fill="none"
          stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          style={{ width: size, height: size }}
          aria-hidden="true"
        >
          {/* Outer Sunburst & Diplomatic Border */}
          <circle cx="100" cy="100" r="92" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
          <circle cx="100" cy="100" r="85" strokeWidth="1.5" />

          {/* Prominent Venus / Gender Equality Symbol */}
          <circle cx="100" cy="80" r="38" strokeWidth="3" />
          <line x1="100" y1="118" x2="100" y2="168" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="82" y1="140" x2="118" y2="140" strokeWidth="3.5" strokeLinecap="round" />

          {/* Mathematical Equals Sign within circle */}
          <line x1="88" y1="76" x2="112" y2="76" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="88" y1="84" x2="112" y2="84" strokeWidth="2.5" strokeLinecap="round" />

          {/* Dove of Peace Wing Silhouette within the Upper Arc */}
          <path
            d="M 64 68 C 76 46 112 40 126 52 C 114 56 102 64 96 74"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="currentColor"
            fillOpacity="0.1"
          />
          <path
            d="M 126 52 C 136 44 148 44 154 50 C 146 56 138 60 130 64"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* Laurel Branch of Socioeconomic Empowerment (Right side) */}
          <path d="M 144 140 C 158 126 160 98 154 78" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
          <path d="M 152 90 C 158 88 162 82 158 80 C 154 78 148 82 148 88" strokeWidth="1" fill="currentColor" fillOpacity="0.2" />
          <path d="M 156 108 C 162 106 166 100 162 98 C 158 96 152 100 152 106" strokeWidth="1" fill="currentColor" fillOpacity="0.2" />
          <path d="M 154 126 C 160 124 164 118 160 116 C 156 114 150 118 150 124" strokeWidth="1" fill="currentColor" fillOpacity="0.2" />

          {/* Radiating Equality Ticks */}
          <circle cx="100" cy="80" r="48" strokeWidth="0.75" strokeDasharray="2 4" opacity="0.4" />
        </svg>
      );

    case 'aippm':
      // All India Political Parties Meet: Ashoka Chakra with 24 Spokes & Parliament (Sansad Bhavan) Colonnade Architecture
      return (
        <svg
          viewBox="0 0 200 200"
          fill="none"
          stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          style={{ width: size, height: size }}
          aria-hidden="true"
        >
          {/* Outer Sovereign Framing Border */}
          <circle cx="100" cy="100" r="92" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
          <circle cx="100" cy="100" r="85" strokeWidth="1.5" />

          {/* Architectural Colonnade of Indian Parliament (Upper Semi-Circle) */}
          <path d="M 40 82 A 65 65 0 0 1 160 82" strokeWidth="2.5" />
          <path d="M 44 88 A 60 60 0 0 1 156 88" strokeWidth="1" strokeDasharray="2 2" />
          
          {/* Parliamentary Pillars */}
          {[-50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50].map((angle, idx) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 100 + 56 * Math.sin(rad);
            const y1 = 86 - 56 * Math.cos(rad);
            const x2 = 100 + 44 * Math.sin(rad);
            const y2 = 86 - 44 * Math.cos(rad);
            return <line key={idx} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="1.5" strokeLinecap="round" />;
          })}

          {/* The Ashoka Chakra (Central 24-spoke Dharma wheel) */}
          <g transform="translate(100, 115)">
            <circle cx="0" cy="0" r="32" strokeWidth="2.5" />
            <circle cx="0" cy="0" r="28" strokeWidth="0.75" />
            <circle cx="0" cy="0" r="6" strokeWidth="2" fill="currentColor" fillOpacity="0.2" />

            {/* 24 Spokes rendered geometrically */}
            {Array.from({ length: 24 }).map((_, i) => {
              const deg = i * 15;
              const rad = (deg * Math.PI) / 180;
              const x2 = 28 * Math.cos(rad);
              const y2 = 28 * Math.sin(rad);
              return (
                <line
                  key={i}
                  x1="0"
                  y1="0"
                  x2={x2}
                  y2={y2}
                  strokeWidth={i % 2 === 0 ? '1.2' : '0.8'}
                  opacity={i % 2 === 0 ? '0.9' : '0.6'}
                />
              );
            })}
          </g>

          {/* National Lotus Petal Base Motifs */}
          <path
            d="M 70 156 C 80 148 95 152 100 162 C 105 152 120 148 130 156"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line x1="60" y1="164" x2="140" y2="164" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    default:
      return null;
  }
};
