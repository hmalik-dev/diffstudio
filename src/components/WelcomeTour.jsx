import { useEffect, useRef, useState } from 'react';

const BASE_STEPS = [
  {
    id: 'welcome',
    title: 'Welcome to DiffStudio',
    subtitle: 'AI-powered lesson differentiation for every classroom.',
    content: (
      <div className="space-y-4">
        <p className="text-sm text-slate-600 leading-relaxed">
          Turn your classroom observations into ready-to-use differentiated materials in seconds — scaffolding supports, mini-lessons, practice sets, exit tickets, and more, all tailored to your students.
        </p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: '🧩', label: 'Scaffolding' },
            { icon: '👥', label: 'Mini-Lessons' },
            { icon: '✏️', label: 'Practice Sets' },
            { icon: '🎯', label: 'Exit Tickets' },
            { icon: '📖', label: 'Internalization' },
            { icon: '📊', label: 'Response Analysis' },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-1 p-2 bg-sky-50 border border-sky-100 rounded-lg">
              <span className="text-lg" aria-hidden="true">{item.icon}</span>
              <span className="text-xs text-sky-700 font-medium text-center leading-tight">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'how',
    title: 'How it works',
    subtitle: 'Three steps to your first artifact.',
    content: (
      <div className="space-y-3">
        {[
          {
            num: '1',
            title: 'Pick a grade and topic',
            desc: 'Select K–8 and type your math unit — e.g. "Multiplying Fractions" or "Place Value".',
          },
          {
            num: '2',
            title: 'Describe your students',
            desc: 'Tell the AI what you\'re seeing — missed problems, IEP needs, ELL students, specific misconceptions.',
          },
          {
            num: '3',
            title: 'Choose a mode and generate',
            desc: 'Pick scaffolding, mini-lesson, practice, exit ticket, or internalization — hit Generate and watch it stream.',
          },
        ].map((step) => (
          <div key={step.num} className="flex items-start gap-3">
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-sky-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">{step.num}</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">{step.title}</p>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
        <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl">
          <p className="text-xs text-amber-700">
            <span className="font-semibold">💡 Pro tip:</span> Click <span className="font-medium">Browse prompt library →</span> to load 20 real classroom scenarios — perfect for your first generation.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'tools',
    title: 'Two tools in one',
    subtitle: 'Lesson Studio and Response Analyzer.',
    content: (
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <p className="text-sm font-bold text-amber-800 mb-2" style={{ fontFamily: '"DM Sans", sans-serif' }}>✏️ Lesson Studio</p>
            <p className="text-xs text-amber-700 leading-relaxed">Generate scaffolding supports, mini-lessons, practice sets, exit tickets, and lesson internalization guides.</p>
          </div>
          <div className="p-4 bg-sky-50 border border-sky-200 rounded-xl">
            <p className="text-sm font-bold text-sky-800 mb-2" style={{ fontFamily: '"DM Sans", sans-serif' }}>📊 Response Analyzer</p>
            <p className="text-xs text-sky-700 leading-relaxed">Paste up to 5 student answers to identify misconceptions and get a targeted mini-lesson.</p>
          </div>
        </div>
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
          <p className="text-xs text-slate-600">
            Use the <span className="font-semibold text-slate-700">Teacher Profile</span> (person icon, top right) to personalize every generation with your class size, ELL %, and preferred scaffolding approach.
          </p>
        </div>
      </div>
    ),
  },
];

function ApiKeyStep({ apiKey, onSave }) {
  const [value, setValue] = useState('');
  const [saved, setSaved] = useState(false);

  function handleSave() {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSave(trimmed);
    setSaved(true);
  }

  if (saved || apiKey) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-green-500 flex-shrink-0">
            <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
            <path d="M6 10l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="text-sm text-green-700 font-medium">API key saved — you're ready to generate!</p>
        </div>
        <p className="text-xs text-slate-500">Your key is stored in memory only and never sent anywhere except Anthropic's API. It clears when you close the tab.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl">
        <p className="text-xs text-sky-700 leading-relaxed">
          DiffStudio uses the Anthropic API to generate content. You'll need a free API key to get started — it takes about 2 minutes to set up.
        </p>
      </div>
      <ol className="space-y-1.5 text-xs text-slate-600">
        <li className="flex gap-2"><span className="font-bold text-sky-600">1.</span> Go to <span className="font-mono text-slate-700">console.anthropic.com</span> and create a free account</li>
        <li className="flex gap-2"><span className="font-bold text-sky-600">2.</span> Open <span className="font-semibold">API Keys</span> and click <span className="font-semibold">Create Key</span></li>
        <li className="flex gap-2"><span className="font-bold text-sky-600">3.</span> Paste it below</li>
      </ol>
      <div className="flex gap-2">
        <input
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && value.trim()) handleSave(); }}
          placeholder="sk-ant-..."
          autoFocus
          className="flex-1 h-10 px-3 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-colors duration-150"
        />
        <button
          onClick={handleSave}
          disabled={!value.trim()}
          className="h-10 px-4 rounded-lg bg-sky-600 hover:bg-sky-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-sm font-semibold transition-colors duration-150"
        >
          Save
        </button>
      </div>
      <p className="text-xs text-slate-400">Your key is stored in memory only and never sent anywhere except Anthropic's API.</p>
    </div>
  );
}

export default function WelcomeTour({ open, step, onNext, onBack, onClose, hasProxy, apiKey, onSaveApiKey }) {
  const modalRef = useRef(null);

  // Build step list — add API key step at end if no proxy and no key
  const needsKeyStep = !hasProxy;
  const steps = needsKeyStep
    ? [...BASE_STEPS, { id: 'apikey', title: 'One last thing', subtitle: 'Add your Anthropic API key to start generating.' }]
    : BASE_STEPS;

  useEffect(() => {
    if (!open) return;
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const current = steps[step];
  const isLast = step === steps.length - 1;
  const isApiKeyStep = current.id === 'apikey';
  // On the API key step, only allow "Get started" if key exists
  const canFinish = !isApiKeyStep || !!apiKey;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 px-4"
      role="dialog"
      aria-modal="true"
      aria-label={current.title}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
      >
        {/* Dark blue header strip */}
        <div className="bg-sky-900 px-7 pt-5 pb-4">
          {/* Progress dots */}
          <div className="flex items-center gap-2 mb-4">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-200 ${
                  i === step
                    ? 'w-6 h-2 bg-amber-400'
                    : i < step
                    ? 'w-2 h-2 bg-sky-500'
                    : 'w-2 h-2 bg-sky-700'
                }`}
              />
            ))}
          </div>
          <h2
            className="text-xl font-bold text-white"
            style={{ fontFamily: '"DM Sans", sans-serif' }}
          >
            {current.title}
          </h2>
          <p className="text-sm text-sky-300 mt-1">{current.subtitle}</p>
        </div>

        {/* Body */}
        <div className="px-7 pt-5 pb-5">
          {isApiKeyStep
            ? <ApiKeyStep apiKey={apiKey} onSave={onSaveApiKey} />
            : current.content
          }
        </div>

        {/* Footer */}
        <div className="px-7 pb-6 flex items-center justify-between border-t border-slate-100 pt-4">
          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-slate-600 transition-colors duration-150"
          >
            Skip tour
          </button>
          <div className="flex items-center gap-2">
            {step > 0 && (
              <button
                onClick={onBack}
                className="h-9 px-4 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors duration-150"
              >
                ← Back
              </button>
            )}
            <button
              onClick={isLast ? onClose : onNext}
              disabled={isLast && !canFinish}
              className="h-9 px-5 rounded-lg bg-amber-400 hover:bg-amber-500 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors duration-150"
              style={{ fontFamily: '"DM Sans", sans-serif' }}
            >
              {isLast ? 'Get started →' : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
