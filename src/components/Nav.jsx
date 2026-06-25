export default function Nav({ activeTab, onTabChange, onSettingsOpen, onProfileOpen, profileActive, sidebarHidden, onSidebarToggle }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-12 bg-sky-900 flex items-center px-4 gap-4">
      {/* Hamburger for mobile sidebar */}
      {sidebarHidden && (
        <button
          aria-label="Toggle history sidebar"
          onClick={onSidebarToggle}
          className="lg:hidden text-sky-200 hover:text-white transition-colors duration-150 mr-1"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
            <rect y="3" width="18" height="2" rx="1" />
            <rect y="8" width="18" height="2" rx="1" />
            <rect y="13" width="18" height="2" rx="1" />
          </svg>
        </button>
      )}

      {/* Logo */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <div
          className="w-7 h-7 rounded-md bg-amber-400 flex items-center justify-center"
          aria-hidden="true"
        >
          {/* Pencil icon */}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="5" y="1" width="4" height="9" rx="1" fill="white" />
            <polygon points="5,10 9,10 7,13.5" fill="#FDE68A" />
            <rect x="5" y="0" width="4" height="2" rx="0.5" fill="#94A3B8" />
            <line x1="7" y1="2" x2="7" y2="10" stroke="#F59E0B" strokeWidth="1" />
          </svg>
        </div>
        <span
          className="font-bold text-white text-base hidden sm:block"
          style={{ fontFamily: '"DM Sans", sans-serif' }}
        >
          DiffStudio
        </span>
      </div>

      {/* Center tabs */}
      <div className="flex-1 flex justify-center">
        <div className="flex gap-1">
          <NavTab
            label="Lesson Studio"
            active={activeTab === 'studio'}
            onClick={() => onTabChange('studio')}
            accentColor="bg-amber-400"
          />
          <NavTab
            label="Response Analyzer"
            active={activeTab === 'analyzer'}
            onClick={() => onTabChange('analyzer')}
            title="Paste student answers to identify misconceptions and get a targeted mini-lesson"
            accentColor="bg-sky-400"
          />
        </div>
      </div>

      {/* Right icons */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <div className="relative">
          <button
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
            <span
              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400 border border-sky-900"
              aria-hidden="true"
            />
          )}
        </div>

        <button
          aria-label="Open API settings"
          onClick={onSettingsOpen}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-sky-200 hover:text-white hover:bg-sky-800 transition-colors duration-150"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M9 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm0 1.5a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"
            />
            <path
              fillRule="evenodd"
              d="M7.2 1h3.6l.5 2.1a6 6 0 0 1 1.5.9l2-.8 1.8 3.1-1.6 1.3a6 6 0 0 1 0 1.8l1.6 1.3-1.8 3.1-2-.8a6 6 0 0 1-1.5.9L10.8 17H7.2l-.5-2.1a6 6 0 0 1-1.5-.9l-2 .8L1.4 11.8l1.6-1.3a6 6 0 0 1 0-1.8L1.4 7.4l1.8-3.1 2 .8a6 6 0 0 1 1.5-.9L7.2 2v-1zm1.3 1l-.4 1.7-.5.2a4.5 4.5 0 0 0-1.2.7l-.4.3-1.7-.7-.8 1.4 1.4 1.1-.1.5a4.5 4.5 0 0 0 0 1.6l.1.5-1.4 1.1.8 1.4 1.7-.7.4.3a4.5 4.5 0 0 0 1.2.7l.5.2.4 1.7h1.6l.4-1.7.5-.2a4.5 4.5 0 0 0 1.2-.7l.4-.3 1.7.7.8-1.4-1.4-1.1.1-.5a4.5 4.5 0 0 0 0-1.6l-.1-.5 1.4-1.1-.8-1.4-1.7.7-.4-.3a4.5 4.5 0 0 0-1.2-.7l-.5-.2L9.9 2H8.5z"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}

function NavTab({ label, active, onClick, title, accentColor = 'bg-amber-400' }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`relative px-4 h-12 text-sm font-medium transition-colors duration-150 ${
        active ? 'text-white' : 'text-sky-300 hover:text-white'
      }`}
    >
      {label}
      {active && (
        <span className={`absolute bottom-0 left-0 right-0 h-0.5 ${accentColor} rounded-t`} />
      )}
    </button>
  );
}
