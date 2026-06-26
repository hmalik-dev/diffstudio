export default function Nav({
  activeTab,
  onTabChange,
  onSettingsOpen,
  onProfileOpen,
  profileActive,
  historyCount,
  historyOpen,
  onHistoryToggle,
  artifactOpen,
  onArtifactToggle,
  hasArtifact,
  isStreaming,
}) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-12 bg-sky-900 flex items-center px-5 gap-6">
      {/* Logo */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <div
          className="w-7 h-7 rounded-md bg-amber-400 flex items-center justify-center"
          aria-hidden="true"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="5" y="1" width="4" height="9" rx="1" fill="white" />
            <polygon points="5,10 9,10 7,13.5" fill="#FDE68A" />
            <rect x="5" y="0" width="4" height="2" rx="0.5" fill="#94A3B8" />
            <line x1="7" y1="2" x2="7" y2="10" stroke="#F59E0B" strokeWidth="1" />
          </svg>
        </div>
        <span
          className="font-bold text-white text-base"
          style={{ fontFamily: '"DM Sans", sans-serif' }}
        >
          DiffStudio
        </span>
      </div>

      {/* Tabs — left aligned */}
      <div className="flex items-center gap-1">
        <NavTab
          label="Lesson Studio"
          active={activeTab === 'studio'}
          onClick={() => onTabChange('studio')}
        />
        <NavTab
          label="Response Analyzer"
          active={activeTab === 'analyzer'}
          onClick={() => onTabChange('analyzer')}
          title="Paste student answers to identify misconceptions and get a targeted mini-lesson"
          data-tour="analyzer-tab"
        />
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right controls */}
      <div className="flex items-center gap-1 flex-shrink-0">
        {/* History toggle */}
        <button
          aria-label={historyOpen ? 'Close history' : 'Open history'}
          onClick={onHistoryToggle}
          title="Generation history"
          className={`relative flex items-center gap-1.5 h-8 px-3 rounded-lg text-sm transition-colors duration-150 ${
            historyOpen
              ? 'bg-sky-700 text-white'
              : 'text-sky-300 hover:text-white hover:bg-sky-800'
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="7" cy="7" r="5.5" />
            <path d="M7 4.5V7l2 1.5" />
          </svg>
          <span className="text-xs font-medium">History</span>
          {historyCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-amber-400 text-white text-[9px] font-bold flex items-center justify-center leading-none">
              {historyCount > 9 ? '9+' : historyCount}
            </span>
          )}
        </button>

        {/* Artifact toggle */}
        <button
          aria-label={artifactOpen ? 'Close artifact' : 'View artifact'}
          onClick={onArtifactToggle}
          title={hasArtifact ? 'View generated artifact' : 'Artifact appears after generation'}
          className={`relative flex items-center gap-1.5 h-8 px-3 rounded-lg text-sm transition-colors duration-150 ${
            artifactOpen
              ? 'bg-sky-700 text-white'
              : hasArtifact
              ? 'text-white bg-sky-800 hover:bg-sky-700'
              : 'text-sky-300 hover:text-white hover:bg-sky-800'
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="1.5" width="10" height="11" rx="1.5" />
            <line x1="4.5" y1="5" x2="9.5" y2="5" />
            <line x1="4.5" y1="7.5" x2="9.5" y2="7.5" />
            <line x1="4.5" y1="10" x2="7" y2="10" />
          </svg>
          <span className="text-xs font-medium">Artifact</span>
          {isStreaming && (
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          )}
          {!isStreaming && hasArtifact && (
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          )}
        </button>

        {/* Divider */}
        <div className="w-px h-5 bg-sky-700 mx-1" />

        {/* Profile */}
        <div className="relative">
          <button
            data-tour="profile"
            aria-label="Teacher profile"
            onClick={onProfileOpen}
            title={profileActive ? 'Profile active — generations are personalized' : 'Set up your teacher profile'}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-sky-200 hover:text-white hover:bg-sky-800 transition-colors duration-150"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
              <circle cx="9" cy="6" r="3.5" />
              <path d="M2 15c0-3.3 3.1-6 7-6s7 2.7 7 6" />
            </svg>
          </button>
          {profileActive && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400 border border-sky-900" aria-hidden="true" />
          )}
        </div>

        {/* Settings */}
        <button
          data-tour="settings"
          aria-label="Open API settings"
          onClick={onSettingsOpen}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-sky-200 hover:text-white hover:bg-sky-800 transition-colors duration-150"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
            <path fillRule="evenodd" d="M9 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm0 1.5a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
            <path fillRule="evenodd" d="M7.2 1h3.6l.5 2.1a6 6 0 0 1 1.5.9l2-.8 1.8 3.1-1.6 1.3a6 6 0 0 1 0 1.8l1.6 1.3-1.8 3.1-2-.8a6 6 0 0 1-1.5.9L10.8 17H7.2l-.5-2.1a6 6 0 0 1-1.5-.9l-2 .8L1.4 11.8l1.6-1.3a6 6 0 0 1 0-1.8L1.4 7.4l1.8-3.1 2 .8a6 6 0 0 1 1.5-.9L7.2 2v-1zm1.3 1l-.4 1.7-.5.2a4.5 4.5 0 0 0-1.2.7l-.4.3-1.7-.7-.8 1.4 1.4 1.1-.1.5a4.5 4.5 0 0 0 0 1.6l.1.5-1.4 1.1.8 1.4 1.7-.7.4.3a4.5 4.5 0 0 0 1.2.7l.5.2.4 1.7h1.6l.4-1.7.5-.2a4.5 4.5 0 0 0 1.2-.7l.4-.3 1.7.7.8-1.4-1.4-1.1.1-.5a4.5 4.5 0 0 0 0-1.6l-.1-.5 1.4-1.1-.8-1.4-1.7.7-.4-.3a4.5 4.5 0 0 0-1.2-.7l-.5-.2L9.9 2H8.5z" />
          </svg>
        </button>
      </div>
    </nav>
  );
}

function NavTab({ label, active, onClick, title }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`px-3 h-8 rounded-md text-sm font-medium transition-colors duration-150 ${
        active
          ? 'text-white bg-sky-800'
          : 'text-sky-300 hover:text-white hover:bg-sky-800/60'
      }`}
    >
      {label}
    </button>
  );
}
