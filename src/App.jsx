import { useCallback, useEffect, useState } from 'react';
import Nav from './components/Nav.jsx';
import SettingsModal from './components/SettingsModal.jsx';
import TeacherProfile from './components/TeacherProfile.jsx';
import InputPanel from './components/InputPanel.jsx';
import ArtifactPanel from './components/ArtifactPanel.jsx';
import Sidebar from './components/Sidebar.jsx';
import StudentAnalyzer from './components/StudentAnalyzer.jsx';
import Toast from './components/Toast.jsx';
import WelcomeTour from './components/WelcomeTour.jsx';
import { useStream } from './hooks/useStream.js';
import { useHistory } from './hooks/useHistory.js';

const INITIAL_PROFILE = {
  grade: '',
  classSize: '',
  schoolYear: '',
  ellPercent: 0,
  iepPercent: 0,
  scaffoldingStyle: 'flexible',
  standingAccommodations: '',
};

function profileIsActive(profile) {
  const signals = [
    profile.grade,
    profile.classSize,
    profile.schoolYear,
    profile.scaffoldingStyle !== 'flexible' ? profile.scaffoldingStyle : '',
    profile.standingAccommodations,
    profile.ellPercent > 0 ? 'ell' : '',
    profile.iepPercent > 0 ? 'iep' : '',
  ];
  return signals.filter(Boolean).length >= 3;
}

export default function App() {
  const [apiKey, setApiKey]             = useState('');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activeTab, setActiveTab]       = useState('studio');
  const [profileOpen, setProfileOpen]   = useState(false);
  const [profile, setProfile]           = useState(INITIAL_PROFILE);
  const [toasts, setToasts]             = useState([]);
  const [currentParams, setCurrentParams] = useState(null);
  const [activeHistoryId, setActiveHistoryId] = useState(null);
  const [tourOpen, setTourOpen] = useState(true);
  const [tourStep, setTourStep] = useState(0);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [artifactOpen, setArtifactOpen] = useState(false);

  const hasProxy = import.meta.env.VITE_USE_PROXY === 'true';

  const { generate, isStreaming, rawText, error: streamError, reset, generatedAt, modelName } = useStream(apiKey, profile);
  const {
    history, addEntry, removeEntry, clearHistory,
    addTag, removeTag, togglePin,
  } = useHistory();

  const addToast = useCallback((message, type = 'info') => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  function handleSaveProfile(newProfile) {
    setProfile(newProfile);
    addToast('Profile saved — all generations will be personalized', 'success');
  }

  function handleSaveApiKey(key) {
    setApiKey(key);
    if (key) addToast('API key saved', 'success');
  }

  async function handleGenerate(params) {
    setCurrentParams(params);
    setActiveHistoryId(null);
    const text = await generate(params);
    if (!text) {
      if (streamError) addToast(streamError, 'error');
      return;
    }
    const newId = addEntry(params, text);
    setActiveHistoryId(newId);
    // Auto-open artifact panel when generation completes
    setArtifactOpen(true);
  }

  function handleRegenerate() {
    if (currentParams) handleGenerate(currentParams);
  }

  function handleSelectHistory(id) {
    setActiveHistoryId((prev) => (prev === id ? null : id));
    setArtifactOpen(true);
    setHistoryOpen(false);
  }

  function handleClearHistory() {
    clearHistory();
    setActiveHistoryId(null);
  }

  if (typeof window !== 'undefined') {
    window.testToast = (msg, type) => addToast(msg ?? 'Test toast!', type ?? 'info');
  }

  const activeHistoryItem = history.find((h) => h.id === activeHistoryId) ?? null;
  const displayText   = activeHistoryItem?.content ?? rawText;
  const displayParams = activeHistoryItem
    ? { grade: activeHistoryItem.grade, topic: activeHistoryItem.topic, mode: activeHistoryItem.mode }
    : currentParams;
  const isReadOnly        = !!activeHistoryItem && !isStreaming;
  const readOnlyTimestamp = isReadOnly ? activeHistoryItem.timestamp : null;
  const hasArtifact       = !!(displayText || isStreaming);

  return (
    <div className="flex flex-col min-h-screen">
      <Nav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onSettingsOpen={() => setSettingsOpen(true)}
        onProfileOpen={() => setProfileOpen(true)}
        profileActive={profileIsActive(profile)}
        historyCount={history.length}
        historyOpen={historyOpen}
        onHistoryToggle={() => setHistoryOpen((v) => !v)}
        artifactOpen={artifactOpen}
        onArtifactToggle={() => setArtifactOpen((v) => !v)}
        hasArtifact={hasArtifact}
        isStreaming={isStreaming}
      />

      {/* Main content — full width */}
      <div className="flex flex-col flex-1" style={{ paddingTop: '48px' }}>
        {activeTab === 'studio' ? (
          <div className="flex-1 overflow-y-auto bg-slate-50" style={{ height: 'calc(100vh - 48px)' }}>
            <InputPanel
              apiKey={apiKey}
              addToast={addToast}
              onGenerate={handleGenerate}
              isStreaming={isStreaming}
              streamError={streamError}
              reset={reset}
              onOpenSettings={() => setSettingsOpen(true)}
            />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto bg-slate-50" style={{ height: 'calc(100vh - 48px)' }}>
            <StudentAnalyzer
              apiKey={apiKey}
              addToast={addToast}
              onAddHistoryEntry={addEntry}
            />
          </div>
        )}
      </div>

      {/* History overlay — slides in from left */}
      {historyOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20"
            onClick={() => setHistoryOpen(false)}
            aria-hidden="true"
          />
          <div
            className="fixed top-12 left-0 z-50 flex flex-col bg-white border-r border-slate-200 shadow-2xl"
            style={{ width: '280px', height: 'calc(100vh - 48px)' }}
          >
            <Sidebar
              history={history}
              activeId={activeHistoryId}
              onSelect={handleSelectHistory}
              onPin={togglePin}
              onAddTag={addTag}
              onRemoveTag={removeTag}
              onDelete={removeEntry}
              onClear={handleClearHistory}
            />
          </div>
        </>
      )}

      {/* Artifact overlay — slides in from right */}
      {artifactOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20"
            onClick={() => setArtifactOpen(false)}
            aria-hidden="true"
          />
          <div
            className="fixed top-12 right-0 z-50 flex flex-col bg-white border-l border-slate-200 shadow-2xl"
            style={{ width: '480px', height: 'calc(100vh - 48px)' }}
          >
            <ArtifactPanel
              rawText={displayText}
              isStreaming={isStreaming}
              grade={displayParams?.grade}
              topic={displayParams?.topic}
              mode={displayParams?.mode}
              isReadOnly={isReadOnly}
              readOnlyTimestamp={readOnlyTimestamp}
              generatedAt={generatedAt}
              modelName={modelName}
              onRegenerate={handleRegenerate}
              addToast={addToast}
            />
          </div>
        </>
      )}

      {settingsOpen && (
        <SettingsModal
          apiKey={apiKey}
          hasProxy={hasProxy}
          onSave={handleSaveApiKey}
          onClose={() => setSettingsOpen(false)}
        />
      )}

      {profileOpen && (
        <TeacherProfile
          profile={profile}
          onSave={handleSaveProfile}
          onClose={() => setProfileOpen(false)}
        />
      )}

      <WelcomeTour
        open={tourOpen}
        step={tourStep}
        onNext={() => setTourStep((s) => s + 1)}
        onBack={() => setTourStep((s) => s - 1)}
        onClose={() => setTourOpen(false)}
        hasProxy={hasProxy}
        apiKey={apiKey}
        onSaveApiKey={handleSaveApiKey}
      />

      <Toast toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
