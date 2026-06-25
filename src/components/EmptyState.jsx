export default function EmptyState() {
  return (
    <div className="flex flex-col items-center text-center px-8 py-10 bg-white rounded-xl border border-sky-100 shadow-sm max-w-xs w-full">
      <svg
        width="48"
        height="48"
        viewBox="0 0 56 56"
        fill="none"
        aria-hidden="true"
        className="mb-4 text-sky-200"
      >
        <rect x="6" y="8" width="36" height="44" rx="3" stroke="currentColor" strokeWidth="2" fill="none" />
        <line x1="12" y1="18" x2="36" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="12" y1="25" x2="36" y2="25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="12" y1="32" x2="26" y2="32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <g transform="translate(28, 28) rotate(-35)">
          <rect x="-3" y="-14" width="6" height="18" rx="1" fill="#F59E0B" />
          <polygon points="-3,4 3,4 0,9" fill="#FDE68A" />
          <rect x="-3" y="-16" width="6" height="3" rx="0.5" fill="#94A3B8" />
        </g>
      </svg>

      <h2
        className="text-base font-semibold text-slate-700 mb-1.5"
        style={{ fontFamily: '"DM Sans", sans-serif' }}
      >
        Ready when you are
      </h2>
      <p className="text-xs text-slate-400 leading-relaxed mb-6">
        Fill in the three steps on the left — your artifact streams in here as it generates.
      </p>

      <div className="flex items-center gap-0">
        <StepIndicator number="1" label="Grade & topic" />
        <StepLine />
        <StepIndicator number="2" label="Describe class" />
        <StepLine />
        <StepIndicator number="3" label="Choose mode" />
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
      <span className="text-[10px] text-slate-400 text-center max-w-[56px] leading-tight">{label}</span>
    </div>
  );
}

function StepLine() {
  return <div className="w-8 h-px bg-sky-100 mb-5 mx-1" />;
}
