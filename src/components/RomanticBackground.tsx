export function RomanticBackground() {
  const petals = Array.from({ length: 9 });
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Drifting glow blobs */}
      <div
        className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full animate-drift"
        style={{ background: "radial-gradient(circle, rgba(242,160,176,0.55), transparent 70%)" }}
      />
      <div
        className="absolute top-1/3 -right-40 h-[32rem] w-[32rem] rounded-full animate-pulse-glow"
        style={{ background: "radial-gradient(circle, rgba(253,232,236,0.9), transparent 70%)", animationDelay: "1s" }}
      />
      <div
        className="absolute -bottom-40 left-1/4 h-[26rem] w-[26rem] rounded-full animate-drift"
        style={{ background: "radial-gradient(circle, rgba(139,26,42,0.18), transparent 70%)", animationDelay: "3s" }}
      />

      {/* Subtle SVG petals */}
      <svg className="absolute top-12 left-8 h-24 w-24 opacity-30 animate-pulse-glow" viewBox="0 0 100 100" fill="none">
        <path d="M50 10 C30 30, 30 50, 50 70 C70 50, 70 30, 50 10 Z" fill="#F2A0B0" opacity="0.6"/>
        <path d="M50 30 C40 40, 40 55, 50 65 C60 55, 60 40, 50 30 Z" fill="#FDE8EC"/>
      </svg>
      <svg className="absolute bottom-16 right-12 h-32 w-32 opacity-25 animate-drift" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="20" fill="#F2A0B0" opacity="0.5"/>
        <path d="M50 30 Q65 50 50 70 Q35 50 50 30 Z" fill="#7B1D2A" opacity="0.15"/>
      </svg>

      {/* Floating petals */}
      {petals.map((_, i) => (
        <div
          key={i}
          className="absolute bottom-0 animate-float-petal"
          style={{
            left: `${(i * 11 + 5) % 95}%`,
            animationDuration: `${18 + (i % 4) * 6}s`,
            animationDelay: `${i * 2}s`,
          }}
        >
          <svg className="h-3 w-3" viewBox="0 0 20 20" fill="#F2A0B0" opacity="0.55">
            <ellipse cx="10" cy="10" rx="4" ry="9" />
          </svg>
        </div>
      ))}
    </div>
  );
}
