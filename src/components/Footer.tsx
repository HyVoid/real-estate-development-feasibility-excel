import React from 'react';
import { Shield, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-[var(--color-border)] py-8 bg-transparent">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-[var(--color-primary)] text-white flex items-center justify-center text-[10px] font-bold font-serif">
            D
          </div>
          <span className="text-[12px] font-semibold text-[var(--color-primary)]">
            DealScreen Institutional Feasibility Engine
          </span>
          <span className="text-[11px] text-[var(--color-muted)]">
            • Excel Feasibility Study Web Edition
          </span>
        </div>

        {/* Required Privacy / LocalStorage Notice */}
        <div className="flex items-center gap-2 text-[11px] text-[var(--color-muted)] text-center sm:text-right max-w-xl">
          <Lock className="w-3.5 h-3.5 text-[var(--color-accent)] shrink-0 hidden sm:inline" />
          <span>
            All storage in this tool is maintained locally in your browser's localStorage. The application does not collect, store, or transmit any user data.
          </span>
        </div>
      </div>
    </footer>
  );
};
