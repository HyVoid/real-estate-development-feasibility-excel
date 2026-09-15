import React from 'react';
import { TabKey } from '../types';
import { Download, Upload, RotateCcw, FileSpreadsheet, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface NavbarProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  lastSaved: string;
  onExportBackup: () => void;
  onOpenImportModal: () => void;
  onOpenCsvModal: () => void;
  onOpenResetModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  lastSaved,
  onExportBackup,
  onOpenImportModal,
  onOpenCsvModal,
  onOpenResetModal,
}) => {
  const tabs: Array<{ key: TabKey; label: string; sheetCode: string }> = [
    { key: '00_start_here', label: 'Start Here & Guide', sheetCode: '00_Start_Here' },
    { key: '01_global_settings', label: 'Global Parameters', sheetCode: '01_Global_Settings' },
    { key: '02_residential_deal', label: 'Residential Deal', sheetCode: '02_Residential_Deal' },
    { key: '03_townhouse_deal', label: 'Townhouse Deal', sheetCode: '03_Townhouse_Deal' },
    { key: 'exposure_matrix', label: 'Exposure Matrix', sheetCode: 'Sensitivity_Matrix' },
  ];

  return (
    <header
      id="top-navbar"
      className="sticky top-0 z-50 bg-white border-b border-[var(--nav-border)] h-[56px] shadow-sm select-none"
      style={{ backgroundColor: 'var(--nav-bg)' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-full flex items-center justify-between gap-4">
        {/* Brand / Title & Status */}
        <div className="flex items-center gap-4 min-w-fit">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center text-white shadow-sm">
              <span className="font-serif font-bold text-lg leading-none">D</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[14px] tracking-tight text-[var(--color-primary)] font-serif uppercase">
                  DEALSCREEN
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[rgba(5,28,44,0.06)] text-[var(--color-primary)] font-semibold tracking-wider uppercase">
                  FEASIBILITY SaaS
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-[var(--color-muted)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-positive)] animate-pulse"></span>
                <span>Last saved: {lastSaved || 'Just now'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Tabs corresponding to Excel sheets */}
        <nav className="flex items-center gap-1 h-full overflow-x-auto no-scrollbar py-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                id={`tab-${tab.key}`}
                onClick={() => onTabChange(tab.key)}
                className={`relative h-full px-3.5 flex items-center gap-1.5 text-[12px] font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-[var(--color-primary)] font-semibold'
                    : 'text-[var(--nav-text-inactive)] hover:text-[var(--color-primary)]'
                }`}
              >
                <span>{tab.label}</span>
                {isActive && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-[var(--color-accent)] rounded-t-sm"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Functional Action Toolbar */}
        <div className="flex items-center gap-1.5 min-w-fit">
          <button
            id="btn-bulk-csv"
            onClick={onOpenCsvModal}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded text-[11px] font-medium text-[var(--color-primary)] bg-[rgba(5,28,44,0.05)] hover:bg-[rgba(5,28,44,0.09)] transition-colors"
            title="Bulk CSV Import for Comparables"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-[var(--color-accent)]" />
            <span className="hidden sm:inline">Bulk CSV Import</span>
          </button>

          <button
            id="btn-export-backup"
            onClick={onExportBackup}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded text-[11px] font-medium text-[var(--color-primary)] bg-[rgba(5,28,44,0.05)] hover:bg-[rgba(5,28,44,0.09)] transition-colors"
            title="Export JSON Backup"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Export Backup</span>
          </button>

          <button
            id="btn-import-backup"
            onClick={onOpenImportModal}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded text-[11px] font-medium text-[var(--color-primary)] bg-[rgba(5,28,44,0.05)] hover:bg-[rgba(5,28,44,0.09)] transition-colors"
            title="Import JSON Backup"
          >
            <Upload className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Import Backup</span>
          </button>

          <button
            id="btn-reset-data"
            onClick={onOpenResetModal}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded text-[11px] font-medium text-[var(--color-muted)] hover:text-[var(--color-negative)] hover:bg-[rgba(211,47,47,0.06)] transition-colors"
            title="Reset to Benchmark Data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Reset Data</span>
          </button>
        </div>
      </div>
    </header>
  );
};
