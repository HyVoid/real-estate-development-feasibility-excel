import React, { useState } from 'react';
import { TabKey } from '../types';
import {
  FileText,
  Sliders,
  Home,
  Building2,
  Grid,
  FileSpreadsheet,
  Download,
  Upload,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Lock,
} from 'lucide-react';

interface SidebarProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  lastSaved: string;
  onExportBackup: () => void;
  onOpenImportModal: () => void;
  onOpenCsvModal: () => void;
  onOpenResetModal: () => void;
  isMobileOpen: boolean;
  onToggleMobile: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  lastSaved,
  onExportBackup,
  onOpenImportModal,
  onOpenCsvModal,
  onOpenResetModal,
  isMobileOpen,
  onToggleMobile,
  isCollapsed,
  onToggleCollapse,
}) => {
  const navigationItems: Array<{
    key: TabKey;
    label: string;
    sheetCode: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }> = [
    {
      key: '00_start_here',
      label: 'Start Here & Guide',
      sheetCode: '00_Start_Here',
      icon: FileText,
    },
    {
      key: '01_global_settings',
      label: 'Global Parameters',
      sheetCode: '01_Global_Settings',
      icon: Sliders,
    },
    {
      key: '02_residential_deal',
      label: 'Residential Deal',
      sheetCode: '02_Residential_Deal',
      icon: Home,
    },
    {
      key: '03_townhouse_deal',
      label: 'Townhouse Deal',
      sheetCode: '03_Townhouse_Deal',
      icon: Building2,
      badge: 'Benchmark',
    },
    {
      key: 'exposure_matrix',
      label: 'Exposure Matrix',
      sheetCode: 'Sensitivity_Matrix',
      icon: Grid,
      badge: '2D Stress',
    },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-[rgba(5,28,44,0.4)] backdrop-blur-xs md:hidden"
          onClick={onToggleMobile}
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar Container */}
      <aside
        id="app-sidebar"
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-white border-r border-[var(--color-border)] shadow-sm transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-[72px]' : 'w-[260px]'
        } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        style={{ backgroundColor: 'var(--nav-bg)' }}
      >
        {/* Top Header / Brand Logo */}
        <div className="h-[64px] border-b border-[var(--color-border)] px-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-lg bg-[var(--color-primary)] flex items-center justify-center text-white shrink-0 shadow-sm">
              <span className="font-serif font-bold text-xl leading-none">D</span>
            </div>
            {!isCollapsed && (
              <div className="flex flex-col truncate">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[14px] tracking-tight text-[var(--color-primary)] font-serif uppercase truncate">
                    DEALSCREEN
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-[rgba(5,28,44,0.06)] text-[var(--color-primary)] font-semibold tracking-wider uppercase shrink-0">
                    SaaS
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-[var(--color-muted)] truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-positive)] animate-pulse shrink-0"></span>
                  <span className="truncate">Saved: {lastSaved || 'Just now'}</span>
                </div>
              </div>
            )}
          </div>

          {/* Mobile close button */}
          <button
            onClick={onToggleMobile}
            className="p-1 rounded-md text-[var(--color-muted)] hover:text-[var(--color-primary)] hover:bg-[rgba(5,28,44,0.05)] md:hidden"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          <div>
            {!isCollapsed && (
              <span className="px-2.5 text-[10px] font-bold text-[var(--color-muted)] uppercase tracking-wider block mb-2">
                Worksheet Models
              </span>
            )}
            <nav className="space-y-1">
              {navigationItems.map((item) => {
                const isActive = activeTab === item.key;
                const IconComponent = item.icon;

                return (
                  <button
                    key={item.key}
                    id={`sidebar-tab-${item.key}`}
                    onClick={() => {
                      onTabChange(item.key);
                      if (isMobileOpen) onToggleMobile();
                    }}
                    title={isCollapsed ? item.label : undefined}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all group relative ${
                      isActive
                        ? 'bg-[rgba(34,81,255,0.08)] text-[var(--color-accent)] font-semibold'
                        : 'text-[var(--color-body-text)] hover:bg-[rgba(5,28,44,0.04)] hover:text-[var(--color-primary)]'
                    } ${isCollapsed ? 'justify-center px-0' : ''}`}
                  >
                    <IconComponent
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive
                          ? 'text-[var(--color-accent)]'
                          : 'text-[var(--color-muted)] group-hover:text-[var(--color-primary)]'
                      }`}
                    />
                    {!isCollapsed && (
                      <>
                        <span className="truncate flex-1 text-left">{item.label}</span>
                        {item.badge && (
                          <span
                            className={`text-[9px] px-1.5 py-0.5 rounded font-semibold uppercase tracking-wider shrink-0 ${
                              isActive
                                ? 'bg-[var(--color-accent)] text-white'
                                : 'bg-[rgba(5,28,44,0.06)] text-[var(--color-muted)]'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}

                    {/* Active left indicator bar */}
                    {isActive && (
                      <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] bg-[var(--color-accent)] rounded-r-sm" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick Tools & Data Actions */}
          <div className="pt-2 border-t border-[var(--color-border)]">
            {!isCollapsed && (
              <span className="px-2.5 text-[10px] font-bold text-[var(--color-muted)] uppercase tracking-wider block mb-2">
                Data Tools
              </span>
            )}
            <div className="space-y-1">
              <button
                id="sidebar-btn-csv"
                onClick={() => {
                  onOpenCsvModal();
                  if (isMobileOpen) onToggleMobile();
                }}
                title={isCollapsed ? 'Bulk CSV Import' : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[12px] font-medium text-[var(--color-body-text)] hover:bg-[rgba(5,28,44,0.04)] transition-colors ${
                  isCollapsed ? 'justify-center px-0' : ''
                }`}
              >
                <FileSpreadsheet className="w-4 h-4 text-[var(--color-accent)] shrink-0" />
                {!isCollapsed && <span className="truncate">Bulk CSV Import</span>}
              </button>

              <button
                id="sidebar-btn-export"
                onClick={() => {
                  onExportBackup();
                  if (isMobileOpen) onToggleMobile();
                }}
                title={isCollapsed ? 'Export JSON Backup' : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[12px] font-medium text-[var(--color-body-text)] hover:bg-[rgba(5,28,44,0.04)] transition-colors ${
                  isCollapsed ? 'justify-center px-0' : ''
                }`}
              >
                <Download className="w-4 h-4 text-[var(--color-muted)] shrink-0" />
                {!isCollapsed && <span className="truncate">Export Backup</span>}
              </button>

              <button
                id="sidebar-btn-import"
                onClick={() => {
                  onOpenImportModal();
                  if (isMobileOpen) onToggleMobile();
                }}
                title={isCollapsed ? 'Import JSON Backup' : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[12px] font-medium text-[var(--color-body-text)] hover:bg-[rgba(5,28,44,0.04)] transition-colors ${
                  isCollapsed ? 'justify-center px-0' : ''
                }`}
              >
                <Upload className="w-4 h-4 text-[var(--color-muted)] shrink-0" />
                {!isCollapsed && <span className="truncate">Import Backup</span>}
              </button>

              <button
                id="sidebar-btn-reset"
                onClick={() => {
                  onOpenResetModal();
                  if (isMobileOpen) onToggleMobile();
                }}
                title={isCollapsed ? 'Reset Benchmark Data' : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[12px] font-medium text-[var(--color-muted)] hover:text-[var(--color-negative)] hover:bg-[rgba(211,47,47,0.06)] transition-colors ${
                  isCollapsed ? 'justify-center px-0' : ''
                }`}
              >
                <RotateCcw className="w-4 h-4 shrink-0" />
                {!isCollapsed && <span className="truncate">Reset Data</span>}
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Footer & Collapse Toggle */}
        <div className="p-3 border-t border-[var(--color-border)] bg-[rgba(5,28,44,0.01)] flex flex-col gap-2">
          {!isCollapsed && (
            <div className="flex items-center gap-1.5 text-[10px] text-[var(--color-muted)] px-1">
              <Lock className="w-3 h-3 text-[var(--color-accent)] shrink-0" />
              <span className="truncate">Local Storage Only</span>
            </div>
          )}

          {/* Desktop Toggle Collapse Button */}
          <button
            onClick={onToggleCollapse}
            className="hidden md:flex items-center justify-center w-full py-1.5 text-[11px] font-medium text-[var(--color-muted)] hover:text-[var(--color-primary)] hover:bg-[rgba(5,28,44,0.04)] rounded-md transition-colors"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <div className="flex items-center gap-1.5">
                <ChevronLeft className="w-4 h-4" />
                <span>Collapse Sidebar</span>
              </div>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};
