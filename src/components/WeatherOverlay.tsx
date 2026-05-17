'use client';

const SNOW_FLAKES = [
  { left: 8,  delay: 0.0, dur: 2.8, size: 3 },
  { left: 18, delay: 0.6, dur: 2.3, size: 2 },
  { left: 28, delay: 1.2, dur: 3.1, size: 4 },
  { left: 38, delay: 0.3, dur: 2.6, size: 2 },
  { left: 48, delay: 0.9, dur: 2.0, size: 3 },
  { left: 58, delay: 1.5, dur: 2.9, size: 2 },
  { left: 68, delay: 0.2, dur: 3.2, size: 4 },
  { left: 78, delay: 0.8, dur: 2.4, size: 2 },
  { left: 88, delay: 1.4, dur: 2.7, size: 3 },
  { left: 14, delay: 2.1, dur: 3.0, size: 2 },
  { left: 34, delay: 1.8, dur: 2.2, size: 4 },
  { left: 54, delay: 2.4, dur: 2.8, size: 3 },
  { left: 74, delay: 0.5, dur: 2.5, size: 2 },
  { left: 92, delay: 1.7, dur: 3.3, size: 3 },
];

const RAIN_DROPS = [
  { left: 4,  delay: 0.0, dur: 0.65 },
  { left: 10, delay: 0.3, dur: 0.55 },
  { left: 16, delay: 0.7, dur: 0.70 },
  { left: 22, delay: 0.1, dur: 0.60 },
  { left: 28, delay: 0.5, dur: 0.50 },
  { left: 34, delay: 0.9, dur: 0.65 },
  { left: 40, delay: 0.2, dur: 0.75 },
  { left: 46, delay: 0.6, dur: 0.55 },
  { left: 52, delay: 0.4, dur: 0.60 },
  { left: 58, delay: 0.8, dur: 0.70 },
  { left: 64, delay: 0.0, dur: 0.50 },
  { left: 70, delay: 1.1, dur: 0.65 },
  { left: 76, delay: 0.3, dur: 0.55 },
  { left: 82, delay: 0.7, dur: 0.70 },
  { left: 88, delay: 0.5, dur: 0.60 },
  { left: 94, delay: 1.3, dur: 0.65 },
  { left: 7,  delay: 1.0, dur: 0.55 },
  { left: 25, delay: 1.4, dur: 0.70 },
  { left: 43, delay: 0.2, dur: 0.60 },
  { left: 61, delay: 0.9, dur: 0.50 },
  { left: 79, delay: 0.4, dur: 0.65 },
  { left: 97, delay: 1.2, dur: 0.75 },
];

const SUN_RAYS = Array.from({ length: 10 }, (_, i) => i);

function SunSection({ active }: { active: boolean }) {
  const playState = active ? 'running' : 'paused';
  return (
    <div className="absolute inset-0 overflow-hidden flex items-start justify-center pt-6">
      <div
        className="relative"
        style={{
          width: 80,
          height: 80,
          animation: 'weather-spin-slow 10s linear infinite',
          animationPlayState: playState,
        }}
      >
        {SUN_RAYS.map((i) => (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 origin-bottom"
            style={{
              width: 2,
              height: 28,
              marginLeft: -1,
              marginTop: -28,
              background: 'rgba(253, 224, 71, 0.55)',
              borderRadius: 999,
              transform: `rotate(${i * 36}deg) translateY(-34px)`,
            }}
          />
        ))}
        <div
          className="absolute rounded-full"
          style={{
            width: 22,
            height: 22,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'rgba(253, 224, 71, 0.45)',
            boxShadow: '0 0 14px 6px rgba(253, 224, 71, 0.3)',
          }}
        />
      </div>
    </div>
  );
}

function SnowSection({ active }: { active: boolean }) {
  const playState = active ? 'running' : 'paused';
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {SNOW_FLAKES.map((f, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${f.left}%`,
            top: -6,
            width: f.size,
            height: f.size,
            background: 'rgba(255,255,255,0.85)',
            animation: `weather-snowfall ${f.dur}s linear infinite`,
            animationDelay: `${f.delay}s`,
            animationPlayState: playState,
          }}
        />
      ))}
    </div>
  );
}

function RainSection({ active }: { active: boolean }) {
  const playState = active ? 'running' : 'paused';
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {RAIN_DROPS.map((d, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${d.left}%`,
            top: -16,
            width: 1.5,
            height: 14,
            background: 'rgba(186, 230, 253, 0.65)',
            borderRadius: 999,
            animation: `weather-rainfall ${d.dur}s linear infinite`,
            animationDelay: `${d.delay}s`,
            animationPlayState: playState,
            transform: 'rotate(14deg)',
          }}
        />
      ))}
    </div>
  );
}

export default function WeatherOverlay({ active }: { active: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 left-0 w-1/3 h-full">
        <SunSection active={active} />
      </div>
      <div className="absolute top-0 left-1/3 w-1/3 h-full">
        <SnowSection active={active} />
      </div>
      <div className="absolute top-0 right-0 w-1/3 h-full">
        <RainSection active={active} />
      </div>
    </div>
  );
}
