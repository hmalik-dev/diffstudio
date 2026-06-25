export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full py-16 px-8 text-center">
      {/* Pencil-on-paper SVG */}
      <svg
        width="56"
        height="56"
        viewBox="0 0 56 56"
        fill="none"
        aria-hidden="true"
        className="mb-5 text-slate-300"
      >
        <rect x="6" y="8" width="36" height="44" rx="3" stroke="currentColor" strokeWidth="2" fill="none" />
        <line x1="12" y1="18" x2="36" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="12" y1="25" x2="36" y2="25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="12" y1="32" x2="26" y2="32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        {/* Pencil */}
        <g transform="translate(28, 28) rotate(-35)">
          <rect x="-3" y="-14" width="6" height="18" rx="1" fill="#F59E0B" />
          <polygon points="-3,4 3,4 0,9" fill="#FDE68A" />
          <rect x="-3" y="-16" width="6" height="3" rx="0.5" fill="#94A3B8" />
        </g>
      </svg>

      <h2
        className="text-lg font-semibold text-slate-700 mb-2"
        style={{ fontFamily: '"DM Sans", sans-serif' }}
      >
        Ready when you are
      </h2>
      <p className="text-sm text-slate-500 max-w-xs mb-8">
        Fill in the form on the left — your artifact streams in here as it generates.
      </p>

      {/* Numbered step indicators */}
      <div className="flex items-center gap-0">
        <StepIndicator number="1" label="Pick a grade" />
        <StepLine />
        <StepIndicator number="2" label="Describe your class" />
        <StepLine />
        <StepIndicator number="3" label="Choose a mode" />
      </div>
    </div>
  );
}

function StepIndicator({ number, label }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="w-6 h-6 rounded-full bg-sky-100 flex items-center justify-center">
        <span className="text-xs font-bold text-sky-600">{number}</span>
      </div>
      <span className="text-xs text-slate-400 text-center max-w-[64px] leading-tight">{label}</span>
    </div>
  );
}

function StepLine() {
  return <div className="w-10 h-px bg-slate-200 mb-5 mx-1" />;
}
