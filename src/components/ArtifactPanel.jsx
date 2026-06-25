import EmptyState from './EmptyState.jsx';
import ArtifactCard from './ArtifactCard.jsx';

export default function ArtifactPanel({
  rawText,
  isStreaming,
  grade,
  topic,
  mode,
  isReadOnly,
  readOnlyTimestamp,
  generatedAt,
  modelName,
  onRegenerate,
  addToast,
}) {
  const hasContent = !!rawText || isStreaming;

  return (
    <div className="flex-1 flex flex-col p-4 min-h-0">
      {hasContent ? (
        <div className="flex-1 flex flex-col bg-white rounded-xl border border-sky-100 shadow-sm overflow-hidden min-h-0">
          <ArtifactCard
            rawText={rawText ?? ''}
            isStreaming={isStreaming}
            grade={grade}
            topic={topic}
            mode={mode}
            isReadOnly={isReadOnly}
            readOnlyTimestamp={readOnlyTimestamp}
            generatedAt={generatedAt}
            modelName={modelName}
            onRegenerate={onRegenerate}
            addToast={addToast}
          />
        </div>
      ) : (
        <div className="flex-1 relative min-h-0">
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <EmptyState />
          </div>
        </div>
      )}
    </div>
  );
}
