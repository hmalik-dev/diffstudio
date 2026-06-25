import { useState } from 'react';
import HistoryItem from './HistoryItem.jsx';

const MODE_FILTERS = [
  { label: 'All', id: null },
  { label: 'Scaffolding', id: 'scaffold' },
  { label: 'Mini-Lesson', id: 'miniLesson' },
  { label: 'Practice', id: 'practice' },
  { label: 'Exit Ticket', id: 'exitTicket' },
  { label: 'Internalize', id: 'internalize' },
  { label: 'Analysis', id: 'responseAnalysis' },
];

export default function Sidebar({
  history,
  activeId,
  onSelect,
  onPin,
  onAddTag,
  onRemoveTag,
  onDelete,
  onClear,
  collapsed,
  onToggleCollapse,
}) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [modeFilter, setModeFilter] = useState(null);
  const [confirmClear, setConfirmClear] = useState(false);

  function filtered() {
    let items = history;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (h) =>
          h.topic.toLowerCase().includes(q) ||
          h.content.toLowerCase().includes(q) ||
          h.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (modeFilter) {
      items = items.filter((h) => h.mode?.id === modeFilter);
    }
    return items;
  }

  if (collapsed) {
    return (
      <aside className="w-11 h-full flex flex-col items-center pt-3 gap-3 border-r border-sky-200 bg-sky-100/60">
        <button
          aria-label="Expand history sidebar"
          onClick={onToggleCollapse}
          title="Show history"
          className="w-8 h-8 flex items-center justify-center rounded-lg text-sky-400 hover:text-sky-700 hover:bg-sky-100 transition-colors duration-150"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 3l5 5-5 5" />
          </svg>
        </button>
        <div className="w-6 h-px bg-sky-200" />
        <button
          aria-label="Show history"
          onClick={onToggleCollapse}
          title={`${history.length} artifact${history.length !== 1 ? 's' : ''}`}
          className="relative w-8 h-8 flex items-center justify-center rounded-lg text-sky-400 hover:text-sky-700 hover:bg-sky-100 transition-colors duration-150"
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="7.5" cy="7.5" r="6" />
            <path d="M7.5 4.5v3l2 1.5" />
          </svg>
          {history.length > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-amber-400 text-white text-[9px] font-bold flex items-center justify-center">
              {history.length > 9 ? '9+' : history.length}
            </span>
          )}
        </button>
      </aside>
    );
  }

  const visible = filtered();

  return (
    <aside className="w-56 h-full flex flex-col border-r border-sky-200 bg-sky-100/60 relative">
      {/* Header */}
      <div className="flex-shrink-0 px-3 pt-3 pb-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <button
              aria-label="Collapse history sidebar"
              onClick={onToggleCollapse}
              className="w-6 h-6 flex items-center justify-center rounded text-sky-300 hover:text-sky-600 hover:bg-sky-100 transition-colors duration-150"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3L3 7l5 5" />
              </svg>
            </button>
            <h2
              className="font-semibold text-sky-900 text-sm"
              style={{ fontFamily: '"DM Sans", sans-serif' }}
            >
              History
            </h2>
          </div>
          <div className="flex items-center gap-0.5">
            <button
              aria-label={searchOpen ? 'Close search' : 'Search history'}
              onClick={() => { setSearchOpen((v) => !v); setSearchQuery(''); }}
              className="w-6 h-6 flex items-center justify-center rounded text-sky-400 hover:text-sky-700 hover:bg-sky-100 transition-colors duration-150"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <circle cx="5.5" cy="5.5" r="4" />
                <path d="M8.5 8.5L12 12" />
              </svg>
            </button>
            <button
              aria-label="Clear all history"
              onClick={() => setConfirmClear(true)}
              className="w-6 h-6 flex items-center justify-center rounded text-sky-400 hover:text-red-500 hover:bg-red-50 transition-colors duration-150"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h9M5 3V2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1M10.5 3l-.6 7.5a1 1 0 0 1-1 .9H4.1a1 1 0 0 1-1-.9L2.5 3" />
              </svg>
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="relative mb-2">
            <input
              autoFocus
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics..."
              className="w-full h-7 pl-3 pr-7 rounded-lg border border-sky-200 bg-white text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:border-sky-400 transition-colors duration-150"
            />
            {searchQuery && (
              <button
                aria-label="Clear search"
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M1 1l8 8M9 1L1 9" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Mode filter pills */}
        <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
          {MODE_FILTERS.map((f) => (
            <button
              key={f.id ?? 'all'}
              onClick={() => setModeFilter(f.id)}
              className={`flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-medium transition-colors duration-150 ${
                modeFilter === f.id
                  ? 'bg-amber-400 text-white'
                  : 'bg-white text-slate-500 border border-sky-200 hover:border-sky-300'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* History list */}
      <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-1">
        {visible.length === 0 ? (
          <SidebarEmpty hasHistory={history.length > 0} />
        ) : (
          visible.map((item) => (
            <HistoryItem
              key={item.id}
              item={item}
              isActive={item.id === activeId}
              onClick={() => onSelect(item.id)}
              onPin={() => onPin?.(item.id)}
              onAddTag={(id, tag) => onAddTag?.(id, tag)}
              onRemoveTag={(id, tag) => onRemoveTag?.(id, tag)}
              onDelete={(id) => onDelete?.(id)}
            />
          ))
        )}
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 px-3 py-2 border-t border-sky-100">
        <span className="text-xs text-sky-400">
          {history.length} artifact{history.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Confirm clear dialog */}
      {confirmClear && (
        <div className="absolute inset-0 z-10 flex items-end bg-sky-50/80 backdrop-blur-sm">
          <div className="w-full bg-white border-t border-sky-100 shadow-xl p-4 rounded-t-xl">
            <p className="text-sm text-slate-700 font-medium mb-1">
              Clear all {history.length} artifact{history.length !== 1 ? 's' : ''}?
            </p>
            <p className="text-xs text-slate-500 mb-3">This can't be undone.</p>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmClear(false)}
                className="flex-1 h-8 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors duration-150"
              >
                Cancel
              </button>
              <button
                onClick={() => { onClear?.(); setConfirmClear(false); }}
                className="flex-1 h-8 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors duration-150"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

function SidebarEmpty({ hasHistory }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-3 text-center">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-sky-300 mb-2" aria-hidden="true">
        <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="1.4" />
        <path d="M14 9v5l3.5 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <p className="font-semibold text-sky-700 text-xs" style={{ fontFamily: '"DM Sans", sans-serif' }}>
        {hasHistory ? 'No matches' : 'Nothing yet'}
      </p>
      <p className="text-xs text-sky-400 mt-0.5 leading-relaxed">
        {hasHistory ? 'Try a different filter.' : 'Generations appear here as you work.'}
      </p>
    </div>
  );
}
