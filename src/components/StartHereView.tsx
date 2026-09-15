import React from 'react';
import { GlobalSettings, TabKey } from '../types';
import { formatCurrency, formatPercent } from '../engine';
import {
  Compass,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  HelpCircle,
  Check,
  FileSpreadsheet,
  Workflow,
  Sparkles,
} from 'lucide-react';

interface StartHereViewProps {
  settings: GlobalSettings;
  onNavigateTab: (tab: TabKey) => void;
  onLoadBenchmark: () => void;
}

export const StartHereView: React.FC<StartHereViewProps> = ({
  settings,
  onNavigateTab,
  onLoadBenchmark,
}) => {
  const currency = settings.currencySymbol;

  return (
    <div className="animate-fadeUp space-y-8">
      {/* Hero Welcome Banner */}
      <div className="saas-card p-8 relative overflow-hidden bg-gradient-to-r from-white via-white to-[rgba(34,81,255,0.03)]">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="p-1.5 rounded-lg bg-[rgba(5,28,44,0.06)] text-[var(--color-primary)]">
              <Compass className="w-5 h-5 text-[var(--color-accent)]" />
            </span>
            <span className="label-uppercase text-[12px] text-[var(--color-primary)] tracking-wider">
              Feasibility Standard Operating Procedure (SOP)
            </span>
          </div>

          <h1 className="font-display text-[32px] font-bold text-[var(--color-primary)] leading-tight mb-3">
            Real Estate Development Deal Screening System
          </h1>

          <p className="text-[14px] text-[var(--color-body-text)] leading-relaxed mb-6">
            Designed for real estate investment analysts, acquisitions managers, and developers to convert complex
            feasibility methodologies into an instant, error-free, zero-maintenance decision engine. All mathematical
            formulas compute purely client-side in real time and automatically persist to your browser's localStorage.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab('03_townhouse_deal')}
              className="flex items-center gap-2 px-4 py-2.5 bg-[var(--color-primary)] hover:bg-[#082a40] text-white rounded-md text-[13px] font-semibold transition-all shadow-sm"
            >
              <span>Explore Townhouse Deal</span>
              <ArrowRight className="w-4 h-4 text-[var(--color-accent)]" />
            </button>

            <button
              onClick={() => onNavigateTab('02_residential_deal')}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[var(--color-border)] hover:bg-[var(--color-bg)] text-[var(--color-primary)] rounded-md text-[13px] font-semibold transition-colors"
            >
              <span>Explore Residential Deal</span>
              <ArrowRight className="w-4 h-4 text-[var(--color-muted)]" />
            </button>

            <button
              onClick={() => onNavigateTab('exposure_matrix')}
              className="flex items-center gap-2 px-4 py-2.5 bg-[rgba(34,81,255,0.07)] hover:bg-[rgba(34,81,255,0.12)] text-[var(--color-accent)] rounded-md text-[13px] font-semibold transition-colors"
            >
              <span>View Exposure Matrix</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5-Step Operational Flow SOP */}
      <section className="saas-card p-6">
        <div className="flex items-center gap-2 mb-6 border-b border-[var(--color-border)] pb-3">
          <Workflow className="w-4 h-4 text-[var(--color-accent)]" />
          <h2 className="font-heading-title text-[18px] font-bold text-[var(--color-primary)]">
            5-Minute Deal Screening Workflow (SOP)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="p-4 rounded-lg bg-[rgba(5,28,44,0.02)] border border-[var(--color-border)]">
            <div className="w-6 h-6 rounded-full bg-[var(--color-primary)] text-white text-[11px] font-bold flex items-center justify-center mb-3">
              1
            </div>
            <h3 className="font-semibold text-[13px] text-[var(--color-primary)] mb-1">
              Project Planning
            </h3>
            <p className="text-[12px] text-[var(--color-muted)] leading-relaxed">
              Enter site land area (m²), planned yield units, target GFA, and contract land purchase price.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[rgba(5,28,44,0.02)] border border-[var(--color-border)]">
            <div className="w-6 h-6 rounded-full bg-[var(--color-primary)] text-white text-[11px] font-bold flex items-center justify-center mb-3">
              2
            </div>
            <h3 className="font-semibold text-[13px] text-[var(--color-primary)] mb-1">
              Market Comps
            </h3>
            <p className="text-[12px] text-[var(--color-muted)] leading-relaxed">
              Input 3–10 nearby land transactions and new-build retail sale prices. Averages filter automatically.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[rgba(5,28,44,0.02)] border border-[var(--color-border)]">
            <div className="w-6 h-6 rounded-full bg-[var(--color-primary)] text-white text-[11px] font-bold flex items-center justify-center mb-3">
              3
            </div>
            <h3 className="font-semibold text-[13px] text-[var(--color-primary)] mb-1">
              Build & Soft Costs
            </h3>
            <p className="text-[12px] text-[var(--color-muted)] leading-relaxed">
              Specify build rate/m², council contributions/door, and finance interest. Pro fees auto-calculate.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[rgba(5,28,44,0.02)] border border-[var(--color-border)]">
            <div className="w-6 h-6 rounded-full bg-[var(--color-primary)] text-white text-[11px] font-bold flex items-center justify-center mb-3">
              4
            </div>
            <h3 className="font-semibold text-[13px] text-[var(--color-primary)] mb-1">
              Decision Verdict
            </h3>
            <p className="text-[12px] text-[var(--color-muted)] leading-relaxed">
              Review Profit on Cost (POC) vs. 25.00% hurdle. PASS flags green; FAIL indicates maximum allowable offer.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[rgba(5,28,44,0.02)] border border-[var(--color-border)]">
            <div className="w-6 h-6 rounded-full bg-[var(--color-primary)] text-white text-[11px] font-bold flex items-center justify-center mb-3">
              5
            </div>
            <h3 className="font-semibold text-[13px] text-[var(--color-primary)] mb-1">
              Export & Backup
            </h3>
            <p className="text-[12px] text-[var(--color-muted)] leading-relaxed">
              Export complete JSON state or import bulk CSV comparables. Print to single-page PDF at any time.
            </p>
          </div>
        </div>
      </section>

      {/* Visual Design System & Color Legend */}
      <section className="saas-card p-6">
        <div className="flex items-center gap-2 mb-4 border-b border-[var(--color-border)] pb-3">
          <ShieldCheck className="w-4 h-4 text-[var(--color-accent)]" />
          <h2 className="font-heading-title text-[18px] font-bold text-[var(--color-primary)]">
            Color Standards & Cell Safety Legend
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-3.5 rounded border border-amber-200 bg-[#FFFDE7]">
            <div className="font-bold text-[12px] text-[var(--color-primary)] flex items-center gap-1.5 mb-1">
              <span className="w-3 h-3 rounded-full bg-amber-300 inline-block border border-amber-400"></span>
              Pale Yellow (Input)
            </div>
            <div className="text-[11px] text-[var(--color-body-text)] leading-relaxed">
              <strong>Unlocked User Input.</strong> The ONLY editable cells in the application. Safe to modify.
            </div>
          </div>

          <div className="p-3.5 rounded border border-[var(--color-border)] bg-white">
            <div className="font-bold text-[12px] text-[var(--color-primary)] flex items-center gap-1.5 mb-1">
              <span className="w-3 h-3 rounded-full bg-white inline-block border border-gray-300"></span>
              Pure White (Calculated)
            </div>
            <div className="text-[11px] text-[var(--color-body-text)] leading-relaxed">
              <strong>Protected Calculation.</strong> Real-time formula outputs. Protected against accidental edits.
            </div>
          </div>

          <div className="p-3.5 rounded border border-[#155724] bg-[#D4EDDA]">
            <div className="font-bold text-[12px] text-[#155724] flex items-center gap-1.5 mb-1">
              <CheckCircle className="w-3.5 h-3.5 text-[#155724]" />
              Green Banner (PASS)
            </div>
            <div className="text-[11px] text-[#155724] leading-relaxed">
              <strong>Hurdle Met (POC ≥ 25.00%).</strong> Project clears commercial feasibility screening.
            </div>
          </div>

          <div className="p-3.5 rounded border border-[#721C24] bg-[#F8D7DA]">
            <div className="font-bold text-[12px] text-[#721C24] flex items-center gap-1.5 mb-1">
              <AlertTriangle className="w-3.5 h-3.5 text-[#721C24]" />
              Red Banner (FAIL)
            </div>
            <div className="text-[11px] text-[#721C24] leading-relaxed">
              <strong>Hurdle Breached (POC &lt; 25.00%).</strong> Returns are too thin; adjust land offer price down.
            </div>
          </div>

          <div className="p-3.5 rounded border border-[#856404] bg-[#FFF3CD]">
            <div className="font-bold text-[12px] text-[#856404] flex items-center gap-1.5 mb-1">
              <HelpCircle className="w-3.5 h-3.5 text-[#856404]" />
              Yellow Pill (Pending)
            </div>
            <div className="text-[11px] text-[#856404] leading-relaxed">
              <strong>Pending Input.</strong> Awaiting land or retail pricing to formulate the decision verdict.
            </div>
          </div>
        </div>
      </section>

      {/* Benchmark 4-Unit Townhouse Reference Case Study */}
      <section className="saas-card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 border-b border-[var(--color-border)] pb-3">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[var(--color-accent)]" />
              <h2 className="font-heading-title text-[18px] font-bold text-[var(--color-primary)]">
                Institutional Benchmark Reference Deal (4-Unit Townhouse Project)
              </h2>
            </div>
            <p className="text-[12px] text-[var(--color-muted)] mt-0.5">
              Standard reference dataset pre-configured in Tab 03 for instant audit and validation.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('03_townhouse_deal')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-primary)] text-white rounded text-[12px] font-semibold hover:bg-[#082a40] transition-colors self-start sm:self-auto"
          >
            <span>Open in Tab 03</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-[12px]">
          <div className="p-3 rounded bg-[rgba(5,28,44,0.02)] border border-[var(--color-border)]">
            <span className="text-[10px] text-[var(--color-muted)] uppercase block">Site Area & Yield</span>
            <span className="font-mono font-bold text-[14px] text-[var(--color-primary)]">750 m² (4 Units)</span>
            <span className="text-[11px] text-[var(--color-muted)] block mt-0.5">600 m² GFA (150 m²/unit)</span>
          </div>

          <div className="p-3 rounded bg-[rgba(5,28,44,0.02)] border border-[var(--color-border)]">
            <span className="text-[10px] text-[var(--color-muted)] uppercase block">Land Purchase Basis</span>
            <span className="font-mono font-bold text-[14px] text-[var(--color-primary)]">$1,200,000</span>
            <span className="text-[11px] text-[var(--color-muted)] block mt-0.5">Total Land: $1,274,000</span>
          </div>

          <div className="p-3 rounded bg-[rgba(5,28,44,0.02)] border border-[var(--color-border)]">
            <span className="text-[10px] text-[var(--color-muted)] uppercase block">Construction Cost</span>
            <span className="font-mono font-bold text-[14px] text-[var(--color-primary)]">$1,320,000</span>
            <span className="text-[11px] text-[var(--color-muted)] block mt-0.5">Rate: $2,200/m² GFA</span>
          </div>

          <div className="p-3 rounded bg-[rgba(5,28,44,0.02)] border border-[var(--color-border)]">
            <span className="text-[10px] text-[var(--color-muted)] uppercase block">Total Project Cost</span>
            <span className="font-mono font-bold text-[14px] text-[var(--color-primary)]">$2,947,200</span>
            <span className="text-[11px] text-[var(--color-muted)] block mt-0.5">Includes $120k Finance</span>
          </div>

          <div className="p-3 rounded bg-[rgba(5,28,44,0.02)] border border-[var(--color-border)]">
            <span className="text-[10px] text-[var(--color-muted)] uppercase block">Net Realisation (NRV)</span>
            <span className="font-mono font-bold text-[14px] text-[var(--color-primary)]">$3,892,000</span>
            <span className="text-[11px] text-[var(--color-muted)] block mt-0.5">Gross: $4,000,000</span>
          </div>

          <div className="p-3 rounded bg-[#D4EDDA] border border-[#155724] text-[#155724]">
            <span className="text-[10px] uppercase font-bold block">Profit on Cost (POC)</span>
            <span className="font-mono font-bold text-[16px]">32.06%</span>
            <span className="text-[11px] block mt-0.5">PASS (Target: 25.00%)</span>
          </div>
        </div>
      </section>
    </div>
  );
};
