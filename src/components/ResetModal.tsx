import React from 'react';
import { X, AlertTriangle, RotateCcw } from 'lucide-react';

interface ResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmReset: () => void;
}

export const ResetModal: React.FC<ResetModalProps> = ({
  isOpen,
  onClose,
  onConfirmReset,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(5,28,44,0.45)] backdrop-blur-sm">
      <div className="saas-card w-full max-w-md p-6 relative shadow-2xl animate-fadeUp">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-md text-[var(--color-muted)] hover:text-[var(--color-primary)] hover:bg-[rgba(5,28,44,0.05)] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-[#F8D7DA] flex items-center justify-center text-[#721C24] shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading-title text-[18px] font-bold text-[var(--color-primary)]">
              Reset Application Data?
            </h3>
            <span className="text-[11px] text-[var(--color-muted)]">Benchmark Initial State Restoration</span>
          </div>
        </div>

        <p className="text-[13px] text-[var(--color-body-text)] mb-5 leading-relaxed">
          This will restore all corporate parameters, the 4-unit benchmark townhouse project, and residential
          subdivision datasets back to factory defaults. Any unsaved custom modifications in your browser will be
          overwritten.
        </p>

        <div className="flex items-center justify-end gap-3 border-t border-[var(--color-border)] pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-[12px] font-medium text-[var(--color-muted)] hover:text-[var(--color-primary)]"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirmReset();
              onClose();
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-[var(--color-negative)] hover:bg-[#b71c1c] text-white rounded text-[12px] font-semibold transition-colors shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Confirm Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};
