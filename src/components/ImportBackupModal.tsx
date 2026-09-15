import React, { useState } from 'react';
import { AppState } from '../types';
import { X, Upload, AlertCircle, FileJson, Check } from 'lucide-react';

interface ImportBackupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportState: (state: AppState) => void;
}

export const ImportBackupModal: React.FC<ImportBackupModalProps> = ({
  isOpen,
  onClose,
  onImportState,
}) => {
  const [jsonText, setJsonText] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setJsonText(content || '');
    };
    reader.readAsText(file);
  };

  const handleApplyImport = () => {
    setErrorMsg(null);
    if (!jsonText.trim()) {
      setErrorMsg('Please paste JSON backup data or upload a file.');
      return;
    }

    try {
      const parsed = JSON.parse(jsonText);
      if (!parsed.settings || !parsed.residentialDeal || !parsed.townhouseDeal) {
        throw new Error('Invalid backup schema: missing settings or deal definitions.');
      }
      onImportState(parsed);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to parse JSON backup file.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(5,28,44,0.45)] backdrop-blur-sm">
      <div className="saas-card w-full max-w-lg p-6 relative shadow-2xl animate-fadeUp">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-md text-[var(--color-muted)] hover:text-[var(--color-primary)] hover:bg-[rgba(5,28,44,0.05)] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-3">
          <FileJson className="w-5 h-5 text-[var(--color-accent)]" />
          <h3 className="font-heading-title text-[20px] font-bold text-[var(--color-primary)]">
            Import JSON Backup
          </h3>
        </div>

        <p className="text-[13px] text-[var(--color-body-text)] mb-4">
          Restore complete application state (including global hurdle settings, residential models, and townhouse
          deals) from a previously exported JSON backup file.
        </p>

        <textarea
          rows={6}
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          placeholder="Paste JSON state here or select file below..."
          className="w-full px-3 py-2 text-[12px] font-mono rounded border border-[var(--color-border)] bg-[#fafafa] mb-3 focus:outline-none focus:border-[var(--color-accent)]"
        />

        <div className="mb-4">
          <label className="flex items-center gap-1.5 text-[12px] text-[var(--color-muted)] cursor-pointer hover:text-[var(--color-primary)]">
            <Upload className="w-4 h-4 text-[var(--color-accent)]" />
            <span>Select .json file from disk</span>
            <input type="file" accept=".json,application/json" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>

        {errorMsg && (
          <div className="flex items-center gap-2 p-3 mb-4 rounded bg-[#F8D7DA] text-[#721C24] text-[12px]">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="flex items-center justify-end gap-3 border-t border-[var(--color-border)] pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-[12px] font-medium text-[var(--color-muted)] hover:text-[var(--color-primary)]"
          >
            Cancel
          </button>
          <button
            onClick={handleApplyImport}
            className="px-5 py-2 bg-[var(--color-primary)] hover:bg-[#082a40] text-white rounded text-[12px] font-semibold transition-colors shadow-sm"
          >
            Restore Backup
          </button>
        </div>
      </div>
    </div>
  );
};
