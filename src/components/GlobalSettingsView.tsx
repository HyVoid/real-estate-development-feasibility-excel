import React from 'react';
import { GlobalSettings, DealData, CalculatedDeal } from '../types';
import { formatCurrency, formatPercent, DEFAULT_GLOBAL_SETTINGS } from '../engine';
import { Sliders, RotateCcw, ShieldAlert, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';

interface GlobalSettingsViewProps {
  settings: GlobalSettings;
  onSettingsChange: (settings: GlobalSettings) => void;
  resCalc: CalculatedDeal;
  thCalc: CalculatedDeal;
  onNavigateTab: (tab: '02_residential_deal' | '03_townhouse_deal') => void;
}

export const GlobalSettingsView: React.FC<GlobalSettingsViewProps> = ({
  settings,
  onSettingsChange,
  resCalc,
  thCalc,
  onNavigateTab,
}) => {
  const currency = settings.currencySymbol;

  const updateSetting = <K extends keyof GlobalSettings>(key: K, value: GlobalSettings[K]) => {
    onSettingsChange({
      ...settings,
      [key]: value,
    });
  };

  const handleReset = () => {
    onSettingsChange(DEFAULT_GLOBAL_SETTINGS);
  };

  return (
    <div className="animate-fadeUp space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-[26px] font-bold text-[var(--color-primary)]">
              01_Global_Settings: Central Parameter Control Center
            </h1>
            <span className="text-[11px] px-2 py-0.5 rounded bg-[rgba(5,28,44,0.06)] text-[var(--color-primary)] font-semibold uppercase">
              Zero Hardcoding
            </span>
          </div>
          <p className="text-[13px] text-[var(--color-muted)] mt-0.5">
            Single point of truth for corporate hurdle rates, statutory taxes, and baseline allowances. Every change
            instantly re-evaluates all active deals.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[var(--color-border)] hover:bg-[var(--color-bg)] text-[var(--color-primary)] rounded text-[12px] font-semibold transition-colors self-start md:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restore Default Parameters</span>
        </button>
      </div>

      {/* Parameter Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 1. Base Currency Symbol */}
        <div className="saas-card p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="label-uppercase text-[11px] text-[var(--color-muted)]">
              Cell C4: Currency Symbol
            </span>
            <span className="text-[11px] font-mono text-[var(--color-accent)] font-semibold">
              CFG_CURRENCY_SYMBOL
            </span>
          </div>
          <p className="text-[12px] text-[var(--color-body-text)] mb-3 leading-normal">
            Base currency prefix applied dynamically across all financial reports, tables, and exported metrics.
          </p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={settings.currencySymbol}
              maxLength={4}
              onChange={(e) => updateSetting('currencySymbol', e.target.value)}
              className="cell-editable w-20 px-3 py-2 text-[14px] text-center rounded border border-amber-200 font-bold"
            />
            <div className="flex gap-1">
              {['$', 'A$', '£', '€', '¥'].map((sym) => (
                <button
                  key={sym}
                  onClick={() => updateSetting('currencySymbol', sym)}
                  className={`px-2.5 py-1.5 text-[12px] rounded border transition-colors ${
                    settings.currencySymbol === sym
                      ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                      : 'bg-white text-[var(--color-primary)] border-[var(--color-border)] hover:bg-[var(--color-bg)]'
                  }`}
                >
                  {sym}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Target POC Hurdle Threshold */}
        <div className="saas-card p-5 border-l-4 border-[var(--color-accent)]">
          <div className="flex items-center justify-between mb-2">
            <span className="label-uppercase text-[11px] text-[var(--color-muted)]">
              Cell C5: Target POC Hurdle
            </span>
            <span className="text-[11px] font-mono text-[var(--color-accent)] font-semibold">
              CFG_TARGET_POC_THRESHOLD
            </span>
          </div>
          <p className="text-[12px] text-[var(--color-body-text)] mb-3 leading-normal">
            Corporate return on cost hurdle rate. Projects with POC ≥ this hurdle trigger <strong>PASS</strong>; below triggers <strong>FAIL</strong>.
          </p>
          <div className="flex items-center gap-3">
            <div className="relative w-32">
              <input
                type="number"
                step="0.5"
                value={(settings.targetPocThreshold * 100).toFixed(2)}
                onChange={(e) => updateSetting('targetPocThreshold', (parseFloat(e.target.value) || 0) / 100)}
                className="cell-editable w-full px-3 py-2 text-[16px] rounded border border-amber-200 font-bold font-mono text-[var(--color-primary)] pr-8"
              />
              <span className="absolute right-3 top-2.5 text-[14px] font-bold text-[var(--color-muted)]">%</span>
            </div>
            <div className="flex gap-1">
              {[0.20, 0.25, 0.28, 0.30].map((rate) => (
                <button
                  key={rate}
                  onClick={() => updateSetting('targetPocThreshold', rate)}
                  className={`px-2 py-1 text-[11px] font-mono rounded border transition-colors ${
                    Math.abs(settings.targetPocThreshold - rate) < 0.001
                      ? 'bg-[var(--color-accent)] text-white border-[var(--color-accent)] font-bold'
                      : 'bg-white text-[var(--color-primary)] border-[var(--color-border)] hover:bg-[var(--color-bg)]'
                  }`}
                >
                  {(rate * 100).toFixed(0)}%
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Statutory Stamp Duty Rate */}
        <div className="saas-card p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="label-uppercase text-[11px] text-[var(--color-muted)]">
              Cell C6: Stamp Duty Rate
            </span>
            <span className="text-[11px] font-mono text-[var(--color-accent)] font-semibold">
              CFG_DEFAULT_STAMP_DUTY
            </span>
          </div>
          <p className="text-[12px] text-[var(--color-body-text)] mb-3 leading-normal">
            Statutory conveyance duty rate applied to agreed land acquisition consideration.
          </p>
          <div className="relative w-32">
            <input
              type="number"
              step="0.1"
              value={(settings.defaultStampDutyRate * 100).toFixed(2)}
              onChange={(e) => updateSetting('defaultStampDutyRate', (parseFloat(e.target.value) || 0) / 100)}
              className="cell-editable w-full px-3 py-2 text-[14px] rounded border border-amber-200 font-medium font-mono pr-8"
            />
            <span className="absolute right-3 top-2 text-[13px] text-[var(--color-muted)]">%</span>
          </div>
        </div>

        {/* 4. Consultant Professional Rate */}
        <div className="saas-card p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="label-uppercase text-[11px] text-[var(--color-muted)]">
              Cell C7: Consultant Fee Rate
            </span>
            <span className="text-[11px] font-mono text-[var(--color-accent)] font-semibold">
              CFG_PROFESSIONAL_RATE
            </span>
          </div>
          <p className="text-[12px] text-[var(--color-body-text)] mb-3 leading-normal">
            Planning consultants, architects, structural engineers, and project management (% of Total Build Cost).
          </p>
          <div className="relative w-32">
            <input
              type="number"
              step="0.5"
              value={(settings.defaultProfessionalRate * 100).toFixed(2)}
              onChange={(e) => updateSetting('defaultProfessionalRate', (parseFloat(e.target.value) || 0) / 100)}
              className="cell-editable w-full px-3 py-2 text-[14px] rounded border border-amber-200 font-medium font-mono pr-8"
            />
            <span className="absolute right-3 top-2 text-[13px] text-[var(--color-muted)]">%</span>
          </div>
        </div>

        {/* 5. Construction Contingency Rate */}
        <div className="saas-card p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="label-uppercase text-[11px] text-[var(--color-muted)]">
              Cell C8: Baseline Contingency
            </span>
            <span className="text-[11px] font-mono text-[var(--color-accent)] font-semibold">
              CFG_CONTINGENCY_RATE
            </span>
          </div>
          <p className="text-[12px] text-[var(--color-body-text)] mb-3 leading-normal">
            Construction risk buffer for unexpected site variations and raw material indexation (% of Total Build Cost).
          </p>
          <div className="relative w-32">
            <input
              type="number"
              step="0.5"
              value={(settings.defaultContingencyRate * 100).toFixed(2)}
              onChange={(e) => updateSetting('defaultContingencyRate', (parseFloat(e.target.value) || 0) / 100)}
              className="cell-editable w-full px-3 py-2 text-[14px] rounded border border-amber-200 font-medium font-mono pr-8"
            />
            <span className="absolute right-3 top-2 text-[13px] text-[var(--color-muted)]">%</span>
          </div>
        </div>

        {/* 6. Selling Agent Commission Rate */}
        <div className="saas-card p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="label-uppercase text-[11px] text-[var(--color-muted)]">
              Cell C9: Sales Agent Comm
            </span>
            <span className="text-[11px] font-mono text-[var(--color-accent)] font-semibold">
              CFG_AGENT_COMM_RATE
            </span>
          </div>
          <p className="text-[12px] text-[var(--color-body-text)] mb-3 leading-normal">
            Channel brokerage fee and disposal agency commissions (% of Gross Realisation).
          </p>
          <div className="relative w-32">
            <input
              type="number"
              step="0.1"
              value={(settings.defaultAgentCommRate * 100).toFixed(2)}
              onChange={(e) => updateSetting('defaultAgentCommRate', (parseFloat(e.target.value) || 0) / 100)}
              className="cell-editable w-full px-3 py-2 text-[14px] rounded border border-amber-200 font-medium font-mono pr-8"
            />
            <span className="absolute right-3 top-2 text-[13px] text-[var(--color-muted)]">%</span>
          </div>
        </div>
      </div>

      {/* Live Global Re-calculation Synchronizer Impact */}
      <section className="saas-card p-6">
        <div className="flex items-center gap-2 mb-4 border-b border-[var(--color-border)] pb-3">
          <Sliders className="w-4 h-4 text-[var(--color-accent)]" />
          <h2 className="font-heading-title text-[18px] font-bold text-[var(--color-primary)]">
            Live Parameter Synchronization Matrix (Single-Point Propagation)
          </h2>
        </div>

        <p className="text-[13px] text-[var(--color-muted)] mb-4">
          Modifying any value in <code>01_Global_Settings</code> immediately alters the decision status in both Deal
          Engines without requiring any manual re-calculation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Residential Deal Live State */}
          <div className="p-4 rounded-lg bg-[rgba(5,28,44,0.02)] border border-[var(--color-border)] flex items-center justify-between">
            <div>
              <span className="text-[11px] text-[var(--color-muted)] uppercase tracking-wider font-semibold block">
                02_Residential_Deal Status
              </span>
              <div className="text-[16px] font-bold text-[var(--color-primary)] mt-0.5 font-display">
                POC: {formatPercent(resCalc.profitOnCostPoc)} vs Hurdle {formatPercent(settings.targetPocThreshold)}
              </div>
              <div className="text-[11px] text-[var(--color-muted)] mt-1">
                Net Profit: {formatCurrency(resCalc.netDevelopmentProfit, currency)} | Cost:{' '}
                {formatCurrency(resCalc.totalProjectCost, currency)}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`status-pill ${
                  resCalc.verdictCode === 'PASS'
                    ? 'bg-[#D4EDDA] text-[#155724]'
                    : resCalc.verdictCode === 'FAIL'
                    ? 'bg-[#F8D7DA] text-[#721C24]'
                    : 'bg-[#FFF3CD] text-[#856404]'
                }`}
              >
                {resCalc.dealVerdict}
              </span>
              <button
                onClick={() => onNavigateTab('02_residential_deal')}
                className="p-1.5 rounded hover:bg-[rgba(5,28,44,0.06)] text-[var(--color-accent)]"
                title="View Deal"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Townhouse Deal Live State */}
          <div className="p-4 rounded-lg bg-[rgba(5,28,44,0.02)] border border-[var(--color-border)] flex items-center justify-between">
            <div>
              <span className="text-[11px] text-[var(--color-muted)] uppercase tracking-wider font-semibold block">
                03_Townhouse_Deal Status
              </span>
              <div className="text-[16px] font-bold text-[var(--color-primary)] mt-0.5 font-display">
                POC: {formatPercent(thCalc.profitOnCostPoc)} vs Hurdle {formatPercent(settings.targetPocThreshold)}
              </div>
              <div className="text-[11px] text-[var(--color-muted)] mt-1">
                Net Profit: {formatCurrency(thCalc.netDevelopmentProfit, currency)} | Cost:{' '}
                {formatCurrency(thCalc.totalProjectCost, currency)}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`status-pill ${
                  thCalc.verdictCode === 'PASS'
                    ? 'bg-[#D4EDDA] text-[#155724]'
                    : thCalc.verdictCode === 'FAIL'
                    ? 'bg-[#F8D7DA] text-[#721C24]'
                    : 'bg-[#FFF3CD] text-[#856404]'
                }`}
              >
                {thCalc.dealVerdict}
              </span>
              <button
                onClick={() => onNavigateTab('03_townhouse_deal')}
                className="p-1.5 rounded hover:bg-[rgba(5,28,44,0.06)] text-[var(--color-accent)]"
                title="View Deal"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
