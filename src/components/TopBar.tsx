import React from 'react';
import { TabKey } from '../types';
import { Menu, FileSpreadsheet, Download, Upload, RotateCcw } from 'lucide-react';

interface TopBarProps {
  activeTab: TabKey;
  lastSaved: string;
  onToggleMobile: () => void;
  onOpenCsvModal: () => void;
  onExportBackup: () => void;
  onOpenImportModal: () => void;
  onOpenResetModal: () => void;
}

const TAB_TITLES: Record<TabKey, { title: string; subtitle: string }> = {
  '00_start_here': {
    title: 'Model Overview & Benchmark Case Study',
    subtitle: 'Institutional Feasibility Workflow & 4-Unit Townhouse Project',
  },
  '01_global_settings': {
    title: 'Global Hurdle & Macro Parameters',
    subtitle: 'Central Statutory, Stamp Duty, Fees & Target POC Settings',
  },
  '02_residential_deal': {
    title: 'Residential Feasibility Model',
    subtitle: 'Single Dwelling / Raw Land Subdivision Feasibility Screening',
  },
  '03_townhouse_deal': {
    title: 'Townhouse Feasibility Model',
    subtitle: 'Multi-Unit Townhouse Development Feasibility & Per-Door Metrics',
  },
  exposure_matrix: {
    title: 'Exposure & Sensitivity Matrix',
    subtitle: '2D Scenario Stress Test across Land Price vs. Terminal Retail Price',
  },
};

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  lastSaved,
  onToggleMobile,
  onOpenCsvModal,
  onExportBackup,
  onOpenImportModal,
  onOpenResetModal,
}) => {
  const currentTabInfo = TAB_TITLES[activeTab] || {
    title: 'Feasibility Engine',
    subtitle: 'Real Estate Deal Screener',
  };

  return (
    <header className="sticky top-0 z-30 h-[56px] bg-white border-b border-[var(--color-border)] px-4 sm:px-6 flex items-center justify-between shadow-xs">
      <div className="flex items-center gap-3">
        {/* Mobile menu toggle */}
        <button
          onClick={onToggleMobile}
          className="p-1.5 -ml-1 text-[var(--color-primary)] hover:bg-[rgba(5,28,44,0.05)] rounded-md md:hidden"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="font-display font-bold text-[16px] sm:text-[18px] text-[var(--color-primary)] leading-tight">
            {currentTabInfo.title}
          </h1>
          <p className="text-[11px] text-[var(--color-muted)] hidden sm:block leading-none mt-0.5">
            {currentTabInfo.subtitle}
          </p>
        </div>
      </div>

      {/* Top right quick actions */}
      <div className="flex items-center gap-2">
        <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-[var(--color-muted)] mr-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-positive)] animate-pulse"></span>
          <span>Saved: {lastSaved || 'Just now'}</span>
        </div>

        <button
          onClick={onOpenCsvModal}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded text-[11px] font-medium text-[var(--color-primary)] bg-[rgba(5,28,44,0.04)] hover:bg-[rgba(5,28,44,0.08)] transition-colors"
          title="Bulk CSV Import for Comparables"
        >
          <FileSpreadsheet className="w-3.5 h-3.5 text-[var(--color-accent)]" />
          <span className="hidden md:inline">Bulk CSV</span>
        </button>

        <button
          onClick={onExportBackup}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded text-[11px] font-medium text-[var(--color-primary)] bg-[rgba(5,28,44,0.04)] hover:bg-[rgba(5,28,44,0.08)] transition-colors"
          title="Export JSON State"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Export</span>
        </button>

        <button
          onClick={onOpenImportModal}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded text-[11px] font-medium text-[var(--color-primary)] bg-[rgba(5,28,44,0.04)] hover:bg-[rgba(5,28,44,0.08)] transition-colors"
          title="Import JSON State"
        >
          <Upload className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Import</span>
        </button>

        <button
          onClick={onOpenResetModal}
          className="flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1.5 rounded text-[11px] font-medium text-[var(--color-muted)] hover:text-[var(--color-negative)] hover:bg-[rgba(211,47,47,0.06)] transition-colors"
          title="Reset Benchmark Data"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>
    </header>
  );
};
