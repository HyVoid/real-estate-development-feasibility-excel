/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  TabKey,
  AppState,
  DealData,
  GlobalSettings,
  LandComp,
  RetailComp,
} from './types';
import {
  DEFAULT_APP_STATE,
  DEFAULT_GLOBAL_SETTINGS,
  DEFAULT_RESIDENTIAL_DEAL,
  DEFAULT_TOWNHOUSE_DEAL,
  calculateDeal,
} from './engine';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { StartHereView } from './components/StartHereView';
import { GlobalSettingsView } from './components/GlobalSettingsView';
import { DealView } from './components/DealView';
import { ExposureMatrixView } from './components/ExposureMatrixView';
import { BulkCsvModal } from './components/BulkCsvModal';
import { ImportBackupModal } from './components/ImportBackupModal';
import { ResetModal } from './components/ResetModal';
import { Footer } from './components/Footer';

const STORAGE_KEY = 'dealscreen_saas_feasibility_state_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('00_start_here');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Initialize state from localStorage with fallback to default benchmark data
  const [appState, setAppState] = useState<AppState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.settings && parsed.residentialDeal && parsed.townhouseDeal) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse localStorage state:', e);
    }
    return DEFAULT_APP_STATE;
  });

  const [lastSavedTime, setLastSavedTime] = useState<string>('Just now');

  // Modal visibility states
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  // Auto-save effect
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setLastSavedTime(timeStr);
    } catch (e) {
      console.error('Error saving to localStorage:', e);
    }
  }, [appState]);

  // Real-time calculation outputs for both deals
  const residentialCalc = useMemo(() => {
    return calculateDeal(appState.residentialDeal, appState.settings);
  }, [appState.residentialDeal, appState.settings]);

  const townhouseCalc = useMemo(() => {
    return calculateDeal(appState.townhouseDeal, appState.settings);
  }, [appState.townhouseDeal, appState.settings]);

  // Update handlers
  const handleSettingsChange = useCallback((newSettings: GlobalSettings) => {
    setAppState((prev) => ({
      ...prev,
      settings: newSettings,
    }));
  }, []);

  const handleResidentialDealChange = useCallback((updatedDeal: DealData) => {
    setAppState((prev) => ({
      ...prev,
      residentialDeal: updatedDeal,
    }));
  }, []);

  const handleTownhouseDealChange = useCallback((updatedDeal: DealData) => {
    setAppState((prev) => ({
      ...prev,
      townhouseDeal: updatedDeal,
    }));
  }, []);

  // Export Backup
  const handleExportBackup = useCallback(() => {
    const dataStr = JSON.stringify(appState, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const dateStr = new Date().toISOString().slice(0, 10);
    link.href = url;
    link.setAttribute('download', `dealscreen_feasibility_backup_${dateStr}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [appState]);

  // Import Backup
  const handleImportState = useCallback((importedState: AppState) => {
    setAppState(importedState);
  }, []);

  // Reset Data
  const handleResetToDefaults = useCallback(() => {
    setAppState(DEFAULT_APP_STATE);
  }, []);

  // Bulk CSV Handlers
  const handleImportLandComps = useCallback(
    (dealType: 'residential' | 'townhouse', comps: LandComp[]) => {
      setAppState((prev) => {
        if (dealType === 'residential') {
          return {
            ...prev,
            residentialDeal: { ...prev.residentialDeal, landComps: comps },
          };
        }
        return {
          ...prev,
          townhouseDeal: { ...prev.townhouseDeal, landComps: comps },
        };
      });
    },
    []
  );

  const handleImportRetailComps = useCallback(
    (dealType: 'residential' | 'townhouse', comps: RetailComp[]) => {
      setAppState((prev) => {
        if (dealType === 'residential') {
          return {
            ...prev,
            residentialDeal: { ...prev.residentialDeal, retailComps: comps },
          };
        }
        return {
          ...prev,
          townhouseDeal: { ...prev.townhouseDeal, retailComps: comps },
        };
      });
    },
    []
  );

  // Apply matrix sensitivity scenario
  const handleApplyMatrixScenario = useCallback(
    (dealType: 'residential' | 'townhouse', updatedPurchasePrice: number) => {
      setAppState((prev) => {
        if (dealType === 'residential') {
          return {
            ...prev,
            residentialDeal: {
              ...prev.residentialDeal,
              agreedPurchasePrice: updatedPurchasePrice,
            },
          };
        }
        return {
          ...prev,
          townhouseDeal: {
            ...prev.townhouseDeal,
            agreedPurchasePrice: updatedPurchasePrice,
          },
        };
      });
      // Navigate to the applied deal view
      setActiveTab(dealType === 'residential' ? '02_residential_deal' : '03_townhouse_deal');
    },
    []
  );

  return (
    <div className="min-h-screen flex bg-[var(--color-bg)] text-[var(--color-body-text)]">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        lastSaved={lastSavedTime}
        onExportBackup={handleExportBackup}
        onOpenImportModal={() => setIsImportModalOpen(true)}
        onOpenCsvModal={() => setIsCsvModalOpen(true)}
        onOpenResetModal={() => setIsResetModalOpen(true)}
        isMobileOpen={isMobileSidebarOpen}
        onToggleMobile={() => setIsMobileSidebarOpen((prev) => !prev)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
      />

      {/* Main Content Column with dynamic left margin for desktop sidebar */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? 'md:ml-[72px]' : 'md:ml-[260px]'
        }`}
      >
        {/* Top bar with mobile hamburger and quick tools */}
        <TopBar
          activeTab={activeTab}
          lastSaved={lastSavedTime}
          onToggleMobile={() => setIsMobileSidebarOpen(true)}
          onOpenCsvModal={() => setIsCsvModalOpen(true)}
          onExportBackup={handleExportBackup}
          onOpenImportModal={() => setIsImportModalOpen(true)}
          onOpenResetModal={() => setIsResetModalOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {activeTab === '00_start_here' && (
            <StartHereView
              settings={appState.settings}
              onNavigateTab={setActiveTab}
              onLoadBenchmark={handleResetToDefaults}
            />
          )}

          {activeTab === '01_global_settings' && (
            <GlobalSettingsView
              settings={appState.settings}
              onSettingsChange={handleSettingsChange}
              resCalc={residentialCalc}
              thCalc={townhouseCalc}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === '02_residential_deal' && (
            <DealView
              key="deal_res"
              deal={appState.residentialDeal}
              settings={appState.settings}
              calc={residentialCalc}
              onChange={handleResidentialDealChange}
              onNavigateToMatrix={() => setActiveTab('exposure_matrix')}
            />
          )}

          {activeTab === '03_townhouse_deal' && (
            <DealView
              key="deal_th"
              deal={appState.townhouseDeal}
              settings={appState.settings}
              calc={townhouseCalc}
              onChange={handleTownhouseDealChange}
              onNavigateToMatrix={() => setActiveTab('exposure_matrix')}
            />
          )}

          {activeTab === 'exposure_matrix' && (
            <ExposureMatrixView
              residentialDeal={appState.residentialDeal}
              townhouseDeal={appState.townhouseDeal}
              settings={appState.settings}
              onApplyScenario={handleApplyMatrixScenario}
            />
          )}
        </main>

        {/* Page Footer */}
        <Footer />
      </div>

      {/* Modals */}
      <BulkCsvModal
        isOpen={isCsvModalOpen}
        onClose={() => setIsCsvModalOpen(false)}
        residentialDeal={appState.residentialDeal}
        townhouseDeal={appState.townhouseDeal}
        onImportLandComps={handleImportLandComps}
        onImportRetailComps={handleImportRetailComps}
      />

      <ImportBackupModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImportState={handleImportState}
      />

      <ResetModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirmReset={handleResetToDefaults}
      />
    </div>
  );
}
