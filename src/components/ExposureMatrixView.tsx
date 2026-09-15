import React, { useState, useMemo } from 'react';
import { DealData, GlobalSettings, CalculatedDeal } from '../types';
import { generateSensitivityMatrix, formatCurrency, formatPercent, SensitivityPoint } from '../engine';
import { Grid, Sparkles, AlertTriangle, CheckCircle2, TrendingUp, DollarSign, Info } from 'lucide-react';

interface ExposureMatrixViewProps {
  residentialDeal: DealData;
  townhouseDeal: DealData;
  settings: GlobalSettings;
  onApplyScenario: (dealType: 'residential' | 'townhouse', updatedPurchasePrice: number) => void;
}

export const ExposureMatrixView: React.FC<ExposureMatrixViewProps> = ({
  residentialDeal,
  townhouseDeal,
  settings,
  onApplyScenario,
}) => {
  const [selectedDealType, setSelectedDealType] = useState<'townhouse' | 'residential'>('townhouse');
  const [selectedPoint, setSelectedPoint] = useState<SensitivityPoint | null>(null);

  const activeDeal = selectedDealType === 'townhouse' ? townhouseDeal : residentialDeal;
  const currency = settings.currencySymbol;

  // Generate 5x5 matrix
  const { baseCalc, matrix } = useMemo(() => {
    return generateSensitivityMatrix(activeDeal, settings);
  }, [activeDeal, settings]);

  // Price deltas used for column headers
  const priceDeltas = [-0.10, -0.05, 0, 0.05, 0.10];
  const retailDeltas = [0.10, 0.05, 0, -0.05, -0.10];

  return (
    <div className="animate-fadeUp space-y-8">
      {/* Header & Deal Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-[26px] font-bold text-[var(--color-primary)]">
              Interactive Exposure & Sensitivity Matrix
            </h1>
            <span className="text-[11px] px-2 py-0.5 rounded bg-[rgba(34,81,255,0.08)] text-[var(--color-accent)] font-semibold uppercase">
              2D Scenario Stress Test
            </span>
          </div>
          <p className="text-[13px] text-[var(--color-muted)] mt-0.5">
            Evaluate risk tolerance across fluctuating purchase costs and retail terminal prices. Hover or click any cell
            for instant scenario details.
          </p>
        </div>

        {/* Tab switch between Townhouse and Residential */}
        <div className="flex items-center p-1 bg-white border border-[var(--color-border)] rounded-lg shadow-sm">
          <button
            onClick={() => {
              setSelectedDealType('townhouse');
              setSelectedPoint(null);
            }}
            className={`px-3 py-1.5 rounded text-[12px] font-semibold transition-colors ${
              selectedDealType === 'townhouse'
                ? 'bg-[var(--color-primary)] text-white shadow-sm'
                : 'text-[var(--color-muted)] hover:text-[var(--color-primary)]'
            }`}
          >
            Townhouse Model (4 Units)
          </button>
          <button
            onClick={() => {
              setSelectedDealType('residential');
              setSelectedPoint(null);
            }}
            className={`px-3 py-1.5 rounded text-[12px] font-semibold transition-colors ${
              selectedDealType === 'residential'
                ? 'bg-[var(--color-primary)] text-white shadow-sm'
                : 'text-[var(--color-muted)] hover:text-[var(--color-primary)]'
            }`}
          >
            Residential Dwelling
          </button>
        </div>
      </div>

      {/* Base Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="saas-card p-4">
          <span className="label-uppercase text-[11px] text-[var(--color-muted)] block">Base Purchase Price</span>
          <span className="font-display text-[22px] font-bold text-[var(--color-primary)]">
            {formatCurrency(activeDeal.agreedPurchasePrice, currency)}
          </span>
        </div>

        <div className="saas-card p-4">
          <span className="label-uppercase text-[11px] text-[var(--color-muted)] block">Base Retail Comp Avg</span>
          <span className="font-display text-[22px] font-bold text-[var(--color-primary)]">
            {formatCurrency(baseCalc.avgRetailPricePerUnit, currency)}
          </span>
        </div>

        <div className="saas-card p-4">
          <span className="label-uppercase text-[11px] text-[var(--color-muted)] block">Base POC</span>
          <span className="font-display text-[22px] font-bold text-[var(--color-primary)]">
            {formatPercent(baseCalc.profitOnCostPoc)}
          </span>
        </div>

        <div className="saas-card p-4">
          <span className="label-uppercase text-[11px] text-[var(--color-muted)] block">Corporate Hurdle</span>
          <span className="font-display text-[22px] font-bold text-[var(--color-accent)]">
            {formatPercent(settings.targetPocThreshold)}
          </span>
        </div>
      </div>

      {/* Main Interactive Matrix */}
      <section className="saas-card p-6">
        <div className="flex items-center justify-between mb-4 border-b border-[var(--color-border)] pb-3">
          <div className="flex items-center gap-2">
            <Grid className="w-4 h-4 text-[var(--color-accent)]" />
            <h2 className="font-heading-title text-[18px] font-bold text-[var(--color-primary)]">
              Profit on Cost (POC) Exposure Matrix
            </h2>
          </div>
          <div className="flex items-center gap-4 text-[12px]">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-[#D4EDDA] border border-[#155724]"></span>
              <span className="text-[var(--color-body-text)]">Pass (POC ≥ {formatPercent(settings.targetPocThreshold)})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-[#F8D7DA] border border-[#721C24]"></span>
              <span className="text-[var(--color-body-text)]">Fail (POC &lt; {formatPercent(settings.targetPocThreshold)})</span>
            </div>
          </div>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-3 text-[11px] font-semibold text-[var(--color-muted)] uppercase tracking-wider text-left bg-[rgba(5,28,44,0.02)] border border-[var(--color-border)] w-[160px]">
                  Retail Price \ Land
                </th>
                {priceDeltas.map((pDelta) => {
                  const pPrice = Math.round(activeDeal.agreedPurchasePrice * (1 + pDelta));
                  const isBase = pDelta === 0;
                  return (
                    <th
                      key={pDelta}
                      className={`p-3 text-center border border-[var(--color-border)] ${
                        isBase ? 'bg-[rgba(34,81,255,0.05)] border-b-2 border-b-[var(--color-accent)]' : 'bg-[var(--table-header-bg)]'
                      }`}
                    >
                      <div className="label-uppercase text-[11px] text-[var(--color-primary)]">
                        {pDelta > 0 ? `+${(pDelta * 100).toFixed(0)}%` : pDelta === 0 ? 'Base Land Price' : `${(pDelta * 100).toFixed(0)}%`}
                      </div>
                      <div className="font-mono text-[12px] font-semibold text-[var(--color-primary)] mt-0.5">
                        {formatCurrency(pPrice, currency)}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {matrix.map((row, rIdx) => {
                const rDelta = retailDeltas[rIdx];
                const rPrice = Math.round(baseCalc.avgRetailPricePerUnit * (1 + rDelta));
                const isBaseRow = rDelta === 0;

                return (
                  <tr key={rIdx}>
                    <th
                      className={`p-3 text-left border border-[var(--color-border)] ${
                        isBaseRow
                          ? 'bg-[rgba(34,81,255,0.05)] border-r-2 border-r-[var(--color-accent)]'
                          : 'bg-[rgba(5,28,44,0.02)]'
                      }`}
                    >
                      <div className="label-uppercase text-[11px] text-[var(--color-primary)]">
                        {rDelta > 0 ? `+${(rDelta * 100).toFixed(0)}% Retail` : rDelta === 0 ? 'Base Retail Price' : `${(rDelta * 100).toFixed(0)}% Retail`}
                      </div>
                      <div className="font-mono text-[12px] font-semibold text-[var(--color-primary)] mt-0.5">
                        {formatCurrency(rPrice, currency)}/unit
                      </div>
                    </th>

                    {row.map((point, cIdx) => {
                      const isBaseCell = point.purchasePriceDeltaPercent === 0 && point.retailPriceDeltaPercent === 0;
                      const isSelected =
                        selectedPoint &&
                        selectedPoint.purchasePrice === point.purchasePrice &&
                        selectedPoint.retailPrice === point.retailPrice;

                      return (
                        <td
                          key={cIdx}
                          id={`matrix-cell-${rIdx}-${cIdx}`}
                          onClick={() => setSelectedPoint(point)}
                          className={`matrix-cell p-3 text-center border cursor-pointer select-none relative ${
                            point.isPass
                              ? 'bg-[#D4EDDA] text-[#155724] border-[#c3e6cb]'
                              : 'bg-[#F8D7DA] text-[#721C24] border-[#f5c6cb]'
                          } ${isSelected ? 'ring-2 ring-[var(--color-accent)] z-20 shadow-md' : ''}`}
                        >
                          <div className="font-display text-[17px] font-bold">
                            {formatPercent(point.poc)}
                          </div>
                          <div className="text-[10px] opacity-85 font-mono mt-0.5">
                            {formatCurrency(point.profit, currency)}
                          </div>
                          {isBaseCell && (
                            <span className="absolute top-1 right-1 text-[9px] px-1 bg-black/10 rounded font-bold uppercase">
                              Base
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Selected Cell Scenario Deep-Dive Card */}
      {selectedPoint && (
        <section className="saas-card p-6 border-l-4 border-[var(--color-accent)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="label-uppercase text-[11px] text-[var(--color-muted)]">
                  Selected Scenario Detail
                </span>
                <span
                  className={`status-pill ${
                    selectedPoint.isPass ? 'bg-[#D4EDDA] text-[#155724]' : 'bg-[#F8D7DA] text-[#721C24]'
                  }`}
                >
                  {selectedPoint.isPass ? 'PASS' : 'FAIL'}
                </span>
              </div>
              <h3 className="font-display text-[20px] font-bold text-[var(--color-primary)]">
                Land: {formatCurrency(selectedPoint.purchasePrice, currency)} (
                {selectedPoint.purchasePriceDeltaPercent >= 0 ? '+' : ''}
                {(selectedPoint.purchasePriceDeltaPercent * 100).toFixed(0)}%) | Retail:{' '}
                {formatCurrency(selectedPoint.retailPrice, currency)}/unit (
                {selectedPoint.retailPriceDeltaPercent >= 0 ? '+' : ''}
                {(selectedPoint.retailPriceDeltaPercent * 100).toFixed(0)}%)
              </h3>
              <p className="text-[13px] text-[var(--color-body-text)] mt-1">
                Yields Profit on Cost of <strong>{formatPercent(selectedPoint.poc)}</strong> (Net Profit:{' '}
                <strong>{formatCurrency(selectedPoint.profit, currency)}</strong>).
              </p>
            </div>

            <button
              onClick={() => onApplyScenario(selectedDealType, selectedPoint.purchasePrice)}
              className="px-4 py-2 bg-[var(--color-primary)] hover:bg-[#082a40] text-white rounded text-[12px] font-semibold transition-colors shadow-sm self-start sm:self-auto"
            >
              Apply Land Price ({formatCurrency(selectedPoint.purchasePrice, currency)}) to Deal
            </button>
          </div>
        </section>
      )}
    </div>
  );
};
