export default function EmptyState() {
  return (
    <div className="flex flex-col items-center text-center px-8 py-12 max-w-xs w-full">
      <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-5">
        <svg width="28" height="28" viewBox="0 0 56 56" fill="none" aria-hidden="true" className="text-slate-400">
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
      </div>

      <h2
        className="text-base font-semibold text-slate-700 mb-1.5"
        style={{ fontFamily: '"DM Sans", sans-serif' }}
      >
        Ready when you are
      </h2>
      <p className="text-sm text-slate-400 leading-relaxed mb-7">
        Complete the three steps on the left and your artifact will stream in here.
      </p>

      <div className="flex items-center gap-0 w-full justify-center">
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
      <div className="w-7 h-7 rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center">
        <span className="text-xs font-bold text-sky-600">{number}</span>
      </div>
      <span className="text-[10px] text-slate-400 text-center w-14 leading-tight">{label}</span>
    </div>
  );
}

function StepLine() {
  return <div className="w-8 h-px bg-slate-200 mb-5" />;
}
