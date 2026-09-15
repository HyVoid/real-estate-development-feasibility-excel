import React from 'react';
import { CalculatedDeal, GlobalSettings } from '../types';
import { formatCurrency, formatPercent } from '../engine';
import { CheckCircle, AlertTriangle, HelpCircle, ArrowUpRight, TrendingUp, Building2, DollarSign } from 'lucide-react';

interface KpiBannerProps {
  calc: CalculatedDeal;
  settings: GlobalSettings;
  dealTypeTitle: string;
}

export const KpiBanner: React.FC<KpiBannerProps> = ({ calc, settings, dealTypeTitle }) => {
  const isPass = calc.verdictCode === 'PASS';
  const isFail = calc.verdictCode === 'FAIL';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* 1. Core Verdict & Profit on Cost (POC) */}
      <div
        id="kpi-card-verdict"
        className="saas-card saas-card-hover p-4 relative overflow-hidden flex flex-col justify-between"
      >
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="label-uppercase text-[11px] text-[var(--color-muted)]">
            Profit on Cost (POC)
          </span>
          {isPass && (
            <span className="status-pill bg-[#D4EDDA] text-[#155724]">
              <CheckCircle className="w-3 h-3 text-[#155724]" />
              PASS
            </span>
          )}
          {isFail && (
            <span className="status-pill bg-[#F8D7DA] text-[#721C24]">
              <AlertTriangle className="w-3 h-3 text-[#721C24]" />
              FAIL
            </span>
          )}
          {!isPass && !isFail && (
            <span className="status-pill bg-[#FFF3CD] text-[#856404]">
              <HelpCircle className="w-3 h-3 text-[#856404]" />
              PENDING
            </span>
          )}
        </div>

        <div>
          <div className="font-display text-[32px] font-bold text-[var(--color-primary)] leading-tight">
            {formatPercent(calc.profitOnCostPoc)}
          </div>
          <div className="text-[11px] text-[var(--color-muted)] mt-1 flex items-center gap-1.5">
            <span>Hurdle: {formatPercent(calc.targetPocThreshold)}</span>
            <span>•</span>
            <span className={isPass ? 'font-medium text-[var(--color-primary)]' : ''}>
              {calc.profitOnCostPoc >= calc.targetPocThreshold
                ? `+${((calc.profitOnCostPoc - calc.targetPocThreshold) * 100).toFixed(2)}% buffer`
                : `${((calc.profitOnCostPoc - calc.targetPocThreshold) * 100).toFixed(2)}% deficit`}
            </span>
          </div>
        </div>

        {/* Minimal indicator stripe */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-[3px] ${
            isPass ? 'bg-[var(--color-positive)]' : isFail ? 'bg-[var(--color-negative)]' : 'bg-gray-300'
          }`}
        />
      </div>

      {/* 2. Net Development Profit */}
      <div
        id="kpi-card-profit"
        className="saas-card saas-card-hover p-4 flex flex-col justify-between"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="label-uppercase text-[11px] text-[var(--color-muted)]">
            Net Development Profit
          </span>
          <DollarSign className="w-4 h-4 text-[var(--color-accent)]" />
        </div>
        <div>
          <div className="font-display text-[30px] font-bold text-[var(--color-primary)] leading-tight">
            {formatCurrency(calc.netDevelopmentProfit, settings.currencySymbol)}
          </div>
          <div className="text-[11px] text-[var(--color-muted)] mt-1">
            Pre-tax net cash margin
          </div>
        </div>
      </div>

      {/* 3. Total Project Cost */}
      <div
        id="kpi-card-cost"
        className="saas-card saas-card-hover p-4 flex flex-col justify-between"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="label-uppercase text-[11px] text-[var(--color-muted)]">
            Total Project Cost
          </span>
          <Building2 className="w-4 h-4 text-[var(--color-muted)]" />
        </div>
        <div>
          <div className="font-display text-[30px] font-bold text-[var(--color-primary)] leading-tight">
            {formatCurrency(calc.totalProjectCost, settings.currencySymbol)}
          </div>
          <div className="text-[11px] text-[var(--color-muted)] mt-1">
            Land: {formatCurrency(calc.totalLandAcquisitionCost, settings.currencySymbol)} | Dev:{' '}
            {formatCurrency(calc.totalDevelopmentCosts, settings.currencySymbol)}
          </div>
        </div>
      </div>

      {/* 4. Net Realisation */}
      <div
        id="kpi-card-realisation"
        className="saas-card saas-card-hover p-4 flex flex-col justify-between"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="label-uppercase text-[11px] text-[var(--color-muted)]">
            Net Realisation (NRV)
          </span>
          <TrendingUp className="w-4 h-4 text-[var(--color-accent)]" />
        </div>
        <div>
          <div className="font-display text-[30px] font-bold text-[var(--color-primary)] leading-tight">
            {formatCurrency(calc.netRealisation, settings.currencySymbol)}
          </div>
          <div className="text-[11px] text-[var(--color-muted)] mt-1">
            Gross: {formatCurrency(calc.grossRealisation, settings.currencySymbol)} (Selling Costs:{' '}
            {formatCurrency(calc.totalSellingCosts, settings.currencySymbol)})
          </div>
        </div>
      </div>
    </div>
  );
};
