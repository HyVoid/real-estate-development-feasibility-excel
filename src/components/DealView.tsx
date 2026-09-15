import React, { useMemo } from 'react';
import { DealData, GlobalSettings, CalculatedDeal, LandComp, RetailComp } from '../types';
import { formatCurrency, formatPercent, formatNumber } from '../engine';
import { KpiBanner } from './KpiBanner';
import {
  Building2,
  MapPin,
  Home,
  DollarSign,
  Briefcase,
  CheckCircle,
  AlertTriangle,
  Info,
  Layers,
  Plus,
  Trash2,
  ArrowRight,
} from 'lucide-react';

interface DealViewProps {
  deal: DealData;
  settings: GlobalSettings;
  calc: CalculatedDeal;
  onChange: (updatedDeal: DealData) => void;
  onNavigateToMatrix: () => void;
}

export const DealView: React.FC<DealViewProps> = ({
  deal,
  settings,
  calc,
  onChange,
  onNavigateToMatrix,
}) => {
  const isTownhouse = deal.dealType === 'townhouse';
  const currency = settings.currencySymbol;

  // Maximum price per SQM in land comps for relative data-bar scaling
  const maxLandPricePerSqm = useMemo(() => {
    const prices = calc.landCompDetails
      .map((c) => c.pricePerSqm)
      .filter((p): p is number => p !== null && p > 0);
    return prices.length > 0 ? Math.max(...prices) : 1;
  }, [calc.landCompDetails]);

  // Maximum price per SQM in retail comps for relative data-bar scaling
  const maxRetailPricePerSqm = useMemo(() => {
    const prices = calc.retailCompDetails
      .map((c) => c.pricePerSqm)
      .filter((p): p is number => p !== null && p > 0);
    return prices.length > 0 ? Math.max(...prices) : 1;
  }, [calc.retailCompDetails]);

  // Maximum allowable land offer (MALO) to achieve the target POC hurdle
  const maxAllowableLandOffer = useMemo(() => {
    // Total Project Cost = LandCost + DevCosts + Finance
    // Net Realisation = NR
    // Hurdle H = NetProfit / TotalCost = (NR - TotalCost) / TotalCost = NR/TotalCost - 1
    // TotalCost = NR / (1 + H)
    // LandCost = TotalCost - DevCosts - Finance
    // LandCost = AgreedPrice * (1 + StampDutyRate) + Legal
    // AgreedPrice = (LandCost - Legal) / (1 + StampDutyRate)
    const hurdle = settings.targetPocThreshold;
    if (hurdle <= -1) return 0;
    const targetTotalCost = calc.netRealisation / (1 + hurdle);
    const targetLandCost = targetTotalCost - calc.totalDevelopmentCosts - (deal.financeInterestAllowance || 0);
    const malo = (targetLandCost - (deal.acquisitionLegalFees || 0)) / (1 + settings.defaultStampDutyRate);
    return Math.max(0, Math.round(malo));
  }, [calc.netRealisation, calc.totalDevelopmentCosts, deal.financeInterestAllowance, deal.acquisitionLegalFees, settings]);

  // Handlers for updating deal properties
  const updateDealProp = <K extends keyof DealData>(key: K, value: DealData[K]) => {
    onChange({
      ...deal,
      [key]: value,
    });
  };

  const updateLandComp = (index: number, field: keyof LandComp, val: any) => {
    const updated = [...deal.landComps];
    updated[index] = { ...updated[index], [field]: val };
    updateDealProp('landComps', updated);
  };

  const addLandCompRow = () => {
    if (deal.landComps.length >= 10) return;
    const newComp: LandComp = {
      id: `land_${Date.now()}`,
      name: '',
      salePrice: null,
      landSizeSqm: null,
    };
    updateDealProp('landComps', [...deal.landComps, newComp]);
  };

  const removeLandCompRow = (index: number) => {
    const updated = deal.landComps.filter((_, i) => i !== index);
    updateDealProp('landComps', updated);
  };

  const updateRetailComp = (index: number, field: keyof RetailComp, val: any) => {
    const updated = [...deal.retailComps];
    updated[index] = { ...updated[index], [field]: val };
    updateDealProp('retailComps', updated);
  };

  const addRetailCompRow = () => {
    if (deal.retailComps.length >= 10) return;
    const newComp: RetailComp = {
      id: `retail_${Date.now()}`,
      name: '',
      bedsBaths: '',
      salePrice: null,
      gfaSqm: null,
    };
    updateDealProp('retailComps', [...deal.retailComps, newComp]);
  };

  const removeRetailCompRow = (index: number) => {
    const updated = deal.retailComps.filter((_, i) => i !== index);
    updateDealProp('retailComps', updated);
  };

  return (
    <div className="animate-fadeUp space-y-8">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-[26px] font-bold text-[var(--color-primary)]">
              {deal.projectName || (isTownhouse ? 'Townhouse Feasibility Model' : 'Residential Feasibility Model')}
            </h1>
            <span className="text-[11px] px-2 py-0.5 rounded bg-[rgba(5,28,44,0.06)] text-[var(--color-primary)] font-semibold uppercase">
              {isTownhouse ? 'Multi-Unit Townhouse' : 'Single Dwelling / Subdivision'}
            </span>
          </div>
          <p className="text-[13px] text-[var(--color-muted)] mt-0.5">
            Real-time dynamic calculation engine. Edit any highlighted cell to see instant financial propagation.
          </p>
        </div>

        <button
          onClick={onNavigateToMatrix}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[rgba(34,81,255,0.08)] hover:bg-[rgba(34,81,255,0.14)] text-[var(--color-accent)] rounded text-[12px] font-semibold transition-colors self-start md:self-auto"
        >
          <span>Open Sensitivity Matrix</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* KPI Hero Banner */}
      <KpiBanner
        calc={calc}
        settings={settings}
        dealTypeTitle={isTownhouse ? 'Townhouse Multi-Unit' : 'Residential Dwelling'}
      />

      {/* Actionable Decision Insight Block */}
      <div className="insight-block flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-1 rounded bg-[rgba(34,81,255,0.12)] text-[var(--color-accent)] mt-0.5">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-semibold text-[13px] text-[var(--color-primary)]">
              {calc.verdictCode === 'PASS'
                ? `Feasibility Screening Passed (+${((calc.profitOnCostPoc - calc.targetPocThreshold) * 100).toFixed(2)}% buffer)`
                : calc.verdictCode === 'FAIL'
                ? `Feasibility Threshold Breached (${((calc.profitOnCostPoc - calc.targetPocThreshold) * 100).toFixed(2)}% deficit)`
                : 'Project Inputs Required'}
            </h4>
            <p className="text-[12px] text-[var(--color-body-text)] mt-1 max-w-4xl leading-relaxed">
              {calc.verdictCode === 'PASS' ? (
                <>
                  The estimated Profit on Cost (POC) of{' '}
                  <strong className="text-[var(--color-primary)]">{formatPercent(calc.profitOnCostPoc)}</strong> meets the{' '}
                  <strong>{formatPercent(settings.targetPocThreshold)}</strong> corporate investment hurdle, yielding a pre-tax
                  net profit of <strong>{formatCurrency(calc.netDevelopmentProfit, currency)}</strong>. The agreed purchase
                  price of {formatCurrency(deal.agreedPurchasePrice, currency)} sits comfortably within the maximum allowable
                  land offer of {formatCurrency(maxAllowableLandOffer, currency)}.
                </>
              ) : calc.verdictCode === 'FAIL' ? (
                <>
                  Current assumptions yield a POC of{' '}
                  <strong className="text-[var(--color-negative)]">{formatPercent(calc.profitOnCostPoc)}</strong>, which falls
                  short of the <strong>{formatPercent(settings.targetPocThreshold)}</strong> investment line. To attain a 25.00%
                  POC without inflating retail sales prices, the purchase price should be counter-offered at or below{' '}
                  <strong className="text-[var(--color-accent)]">{formatCurrency(maxAllowableLandOffer, currency)}</strong> (a
                  reduction of {formatCurrency(Math.max(0, deal.agreedPurchasePrice - maxAllowableLandOffer), currency)}).
                </>
              ) : (
                'Please enter planning yield, comparable transactions, and acquisition price assumptions to trigger automated feasibility screening.'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 1: PROJECT PLANNING & YIELD */}
      <section id="section-planning" className="saas-card p-6">
        <div className="flex items-center gap-2 mb-4 border-b border-[var(--color-border)] pb-3">
          <Layers className="w-4 h-4 text-[var(--color-accent)]" />
          <h2 className="font-heading-title text-[18px] font-bold text-[var(--color-primary)]">
            Section 1: Project Metadata & Planning Yield
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="label-uppercase text-[11px] text-[var(--color-muted)] block mb-1.5">
              Project Identifier / Name
            </label>
            <input
              type="text"
              value={deal.projectName}
              onChange={(e) => updateDealProp('projectName', e.target.value)}
              className="cell-editable w-full px-3 py-2 text-[13px] rounded border border-amber-200 font-medium"
              placeholder="e.g. 18 Smith St"
            />
          </div>

          <div>
            <label className="label-uppercase text-[11px] text-[var(--color-muted)] block mb-1.5">
              Site Land Area (m²)
            </label>
            <input
              type="number"
              value={deal.siteAreaSqm || ''}
              onChange={(e) => updateDealProp('siteAreaSqm', parseFloat(e.target.value) || 0)}
              className="cell-editable w-full px-3 py-2 text-[13px] rounded border border-amber-200 font-medium"
              placeholder="e.g. 750"
            />
          </div>

          <div>
            <label className="label-uppercase text-[11px] text-[var(--color-muted)] block mb-1.5">
              Proposed Units Yield
            </label>
            <input
              type="number"
              min="1"
              value={deal.proposedUnitsYield || ''}
              onChange={(e) => updateDealProp('proposedUnitsYield', Math.max(1, parseInt(e.target.value, 10) || 1))}
              className="cell-editable w-full px-3 py-2 text-[13px] rounded border border-amber-200 font-medium"
              placeholder="e.g. 4"
            />
          </div>

          <div>
            <label className="label-uppercase text-[11px] text-[var(--color-muted)] block mb-1.5">
              Target GFA (m²)
            </label>
            <input
              type="number"
              value={deal.targetGfaSqm || ''}
              onChange={(e) => updateDealProp('targetGfaSqm', parseFloat(e.target.value) || 0)}
              className="cell-editable w-full px-3 py-2 text-[13px] rounded border border-amber-200 font-medium"
              placeholder="e.g. 600"
            />
          </div>

          <div>
            <label className="label-uppercase text-[11px] text-[var(--color-muted)] block mb-1.5">
              Avg GFA / Unit (m²)
            </label>
            <div className="w-full px-3 py-2 text-[13px] rounded bg-[rgba(5,28,44,0.03)] border border-[var(--color-border)] font-semibold text-[var(--color-primary)]">
              {formatNumber(calc.avgGfaPerUnit, 1)} m²
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: RAW LAND COMPARABLES */}
      <section id="section-land-comps" className="saas-card p-6">
        <div className="flex items-center justify-between gap-4 mb-4 border-b border-[var(--color-border)] pb-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[var(--color-accent)]" />
            <h2 className="font-heading-title text-[18px] font-bold text-[var(--color-primary)]">
              Section 2: Raw Land Comparables (Dynamic Average Engine)
            </h2>
          </div>
          <button
            onClick={addLandCompRow}
            disabled={deal.landComps.length >= 10}
            className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-[var(--color-primary)] bg-[rgba(5,28,44,0.05)] hover:bg-[rgba(5,28,44,0.09)] rounded disabled:opacity-40"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Row</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--table-header-bg)] border-b-2 border-[var(--table-header-sep)]">
                <th className="py-2.5 px-3 label-uppercase text-[var(--text-table-head)] text-[var(--color-primary)] w-[40px]">
                  #
                </th>
                <th className="py-2.5 px-3 label-uppercase text-[var(--text-table-head)] text-[var(--color-primary)] min-w-[220px]">
                  Comparable Address / ID
                </th>
                <th className="py-2.5 px-3 label-uppercase text-[var(--text-table-head)] text-[var(--color-primary)] text-right w-[160px]">
                  Sale Price ({currency})
                </th>
                <th className="py-2.5 px-3 label-uppercase text-[var(--text-table-head)] text-[var(--color-primary)] text-right w-[130px]">
                  Site Size (m²)
                </th>
                <th className="py-2.5 px-3 label-uppercase text-[var(--text-table-head)] text-[var(--color-primary)] text-right w-[160px]">
                  Rate ({currency}/m²)
                </th>
                <th className="py-2.5 px-3 label-uppercase text-[var(--text-table-head)] text-[var(--color-primary)] min-w-[140px]">
                  Magnitude
                </th>
                <th className="py-2.5 px-3 w-[40px]"></th>
              </tr>
            </thead>
            <tbody>
              {deal.landComps.map((comp, idx) => {
                const detail = calc.landCompDetails.find((d) => d.id === comp.id);
                const rate = detail?.pricePerSqm || null;
                const barPercent = rate && maxLandPricePerSqm > 0 ? (rate / maxLandPricePerSqm) * 100 : 0;
                const isEven = idx % 2 === 1;

                return (
                  <tr
                    key={comp.id}
                    className={`border-b border-[var(--color-border)] transition-colors hover:bg-[rgba(5,28,44,0.02)] ${
                      isEven ? 'bg-[var(--color-bg)]' : 'bg-white'
                    }`}
                  >
                    <td className="py-2 px-3 text-[12px] text-[var(--color-muted)] font-mono">{idx + 1}</td>
                    <td className="py-2 px-3">
                      <input
                        type="text"
                        value={comp.name}
                        onChange={(e) => updateLandComp(idx, 'name', e.target.value)}
                        placeholder="Enter comparable address..."
                        className="cell-editable w-full px-2 py-1 text-[12px] rounded border border-amber-200"
                      />
                    </td>
                    <td className="py-2 px-3 text-right">
                      <input
                        type="number"
                        value={comp.salePrice ?? ''}
                        onChange={(e) =>
                          updateLandComp(idx, 'salePrice', e.target.value ? parseFloat(e.target.value) : null)
                        }
                        placeholder="0"
                        className="cell-editable w-full px-2 py-1 text-[12px] rounded border border-amber-200 text-right font-medium"
                      />
                    </td>
                    <td className="py-2 px-3 text-right">
                      <input
                        type="number"
                        value={comp.landSizeSqm ?? ''}
                        onChange={(e) =>
                          updateLandComp(idx, 'landSizeSqm', e.target.value ? parseFloat(e.target.value) : null)
                        }
                        placeholder="0"
                        className="cell-editable w-full px-2 py-1 text-[12px] rounded border border-amber-200 text-right font-medium"
                      />
                    </td>
                    <td className="py-2 px-3 text-right font-mono font-medium text-[var(--color-primary)]">
                      {rate ? formatCurrency(rate, currency, true) : '—'}
                    </td>
                    <td className="py-2 px-3 align-middle">
                      {rate ? (
                        <div className="data-bar-track">
                          <div className="data-bar-fill" style={{ width: `${Math.min(100, Math.max(5, barPercent))}%` }} />
                        </div>
                      ) : null}
                    </td>
                    <td className="py-2 px-3 text-center">
                      <button
                        onClick={() => removeLandCompRow(idx)}
                        className="text-gray-400 hover:text-[var(--color-negative)] transition-colors p-1"
                        title="Delete Row"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-[rgba(5,28,44,0.03)] font-semibold border-t-2 border-[var(--color-border)]">
                <td colSpan={4} className="py-3 px-3 text-[12px] text-[var(--color-primary)] uppercase tracking-wide">
                  Market Land Rate Average (Filtered Dynamic Mean)
                </td>
                <td className="py-3 px-3 text-right text-[13px] font-mono text-[var(--color-accent)] font-bold">
                  {formatCurrency(calc.avgLandPricePerSqm, currency, true)}/m²
                </td>
                <td colSpan={2} className="py-3 px-3 text-[12px] text-[var(--color-muted)]">
                  Indicated Value: <strong>{formatCurrency(calc.modelIndicatedLandValue, currency)}</strong>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      {/* SECTION 3: ACTUAL ACQUISITION COSTS */}
      <section id="section-acquisition" className="saas-card p-6">
        <div className="flex items-center gap-2 mb-4 border-b border-[var(--color-border)] pb-3">
          <DollarSign className="w-4 h-4 text-[var(--color-accent)]" />
          <h2 className="font-heading-title text-[18px] font-bold text-[var(--color-primary)]">
            Section 3: Actual Acquisition Costs & Statutory Taxes
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="label-uppercase text-[11px] text-[var(--color-muted)] block mb-1.5">
              Agreed Purchase Price ({currency})
            </label>
            <input
              type="number"
              value={deal.agreedPurchasePrice || ''}
              onChange={(e) => updateDealProp('agreedPurchasePrice', parseFloat(e.target.value) || 0)}
              className="cell-editable w-full px-3 py-2 text-[14px] rounded border border-amber-200 font-bold text-[var(--color-primary)]"
              placeholder="0"
            />
            <span className="text-[10px] text-[var(--color-muted)] mt-1 block">
              Contract land purchase consideration
            </span>
          </div>

          <div>
            <label className="label-uppercase text-[11px] text-[var(--color-muted)] block mb-1.5">
              Statutory Stamp Duty ({formatPercent(settings.defaultStampDutyRate)})
            </label>
            <div className="w-full px-3 py-2 text-[13px] rounded bg-[rgba(5,28,44,0.03)] border border-[var(--color-border)] font-semibold text-[var(--color-primary)]">
              {formatCurrency(calc.calculatedStampDuty, currency)}
            </div>
            <span className="text-[10px] text-[var(--color-muted)] mt-1 block">
              Global rate '01_Global_Settings'!C6
            </span>
          </div>

          <div>
            <label className="label-uppercase text-[11px] text-[var(--color-muted)] block mb-1.5">
              Legal & Due Diligence Fees ({currency})
            </label>
            <input
              type="number"
              value={deal.acquisitionLegalFees || ''}
              onChange={(e) => updateDealProp('acquisitionLegalFees', parseFloat(e.target.value) || 0)}
              className="cell-editable w-full px-3 py-2 text-[13px] rounded border border-amber-200 font-medium"
              placeholder="0"
            />
            <span className="text-[10px] text-[var(--color-muted)] mt-1 block">
              Conveyancing, environmental & geotech
            </span>
          </div>

          <div>
            <label className="label-uppercase text-[11px] text-[var(--color-muted)] block mb-1.5">
              Total Land Acquisition Cost
            </label>
            <div className="w-full px-3 py-2 text-[14px] rounded bg-[rgba(34,81,255,0.04)] border border-[var(--color-accent)] font-bold text-[var(--color-accent)]">
              {formatCurrency(calc.totalLandAcquisitionCost, currency)}
            </div>
            <span className="text-[10px] text-[var(--color-muted)] mt-1 block">
              {isTownhouse ? `Per door: ${formatCurrency(calc.landCostPerDoor, currency)}/unit` : 'Capitalized Land Basis'}
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 4: RETAIL COMPARABLES */}
      <section id="section-retail-comps" className="saas-card p-6">
        <div className="flex items-center justify-between gap-4 mb-4 border-b border-[var(--color-border)] pb-3">
          <div className="flex items-center gap-2">
            <Home className="w-4 h-4 text-[var(--color-accent)]" />
            <h2 className="font-heading-title text-[18px] font-bold text-[var(--color-primary)]">
              Section 4: Retail Comparables (Terminal Gross Realisation Basis)
            </h2>
          </div>
          <button
            onClick={addRetailCompRow}
            disabled={deal.retailComps.length >= 10}
            className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-[var(--color-primary)] bg-[rgba(5,28,44,0.05)] hover:bg-[rgba(5,28,44,0.09)] rounded disabled:opacity-40"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Row</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--table-header-bg)] border-b-2 border-[var(--table-header-sep)]">
                <th className="py-2.5 px-3 label-uppercase text-[var(--text-table-head)] text-[var(--color-primary)] w-[40px]">
                  #
                </th>
                <th className="py-2.5 px-3 label-uppercase text-[var(--text-table-head)] text-[var(--color-primary)] min-w-[200px]">
                  Comparable Unit / Spec
                </th>
                <th className="py-2.5 px-3 label-uppercase text-[var(--text-table-head)] text-[var(--color-primary)] w-[110px]">
                  Beds / Baths
                </th>
                <th className="py-2.5 px-3 label-uppercase text-[var(--text-table-head)] text-[var(--color-primary)] text-right w-[150px]">
                  Sale Price ({currency})
                </th>
                <th className="py-2.5 px-3 label-uppercase text-[var(--text-table-head)] text-[var(--color-primary)] text-right w-[120px]">
                  GFA (m²)
                </th>
                <th className="py-2.5 px-3 label-uppercase text-[var(--text-table-head)] text-[var(--color-primary)] text-right w-[150px]">
                  Rate ({currency}/m²)
                </th>
                <th className="py-2.5 px-3 label-uppercase text-[var(--text-table-head)] text-[var(--color-primary)] min-w-[140px]">
                  Magnitude
                </th>
                <th className="py-2.5 px-3 w-[40px]"></th>
              </tr>
            </thead>
            <tbody>
              {deal.retailComps.map((comp, idx) => {
                const detail = calc.retailCompDetails.find((d) => d.id === comp.id);
                const rate = detail?.pricePerSqm || null;
                const barPercent = rate && maxRetailPricePerSqm > 0 ? (rate / maxRetailPricePerSqm) * 100 : 0;
                const isEven = idx % 2 === 1;

                return (
                  <tr
                    key={comp.id}
                    className={`border-b border-[var(--color-border)] transition-colors hover:bg-[rgba(5,28,44,0.02)] ${
                      isEven ? 'bg-[var(--color-bg)]' : 'bg-white'
                    }`}
                  >
                    <td className="py-2 px-3 text-[12px] text-[var(--color-muted)] font-mono">{idx + 1}</td>
                    <td className="py-2 px-3">
                      <input
                        type="text"
                        value={comp.name}
                        onChange={(e) => updateRetailComp(idx, 'name', e.target.value)}
                        placeholder="Comparable property identifier..."
                        className="cell-editable w-full px-2 py-1 text-[12px] rounded border border-amber-200"
                      />
                    </td>
                    <td className="py-2 px-3">
                      <input
                        type="text"
                        value={comp.bedsBaths}
                        onChange={(e) => updateRetailComp(idx, 'bedsBaths', e.target.value)}
                        placeholder="e.g. 3B2.5B1C"
                        className="cell-editable w-full px-2 py-1 text-[12px] rounded border border-amber-200 text-center font-mono"
                      />
                    </td>
                    <td className="py-2 px-3 text-right">
                      <input
                        type="number"
                        value={comp.salePrice ?? ''}
                        onChange={(e) =>
                          updateRetailComp(idx, 'salePrice', e.target.value ? parseFloat(e.target.value) : null)
                        }
                        placeholder="0"
                        className="cell-editable w-full px-2 py-1 text-[12px] rounded border border-amber-200 text-right font-medium"
                      />
                    </td>
                    <td className="py-2 px-3 text-right">
                      <input
                        type="number"
                        value={comp.gfaSqm ?? ''}
                        onChange={(e) =>
                          updateRetailComp(idx, 'gfaSqm', e.target.value ? parseFloat(e.target.value) : null)
                        }
                        placeholder="0"
                        className="cell-editable w-full px-2 py-1 text-[12px] rounded border border-amber-200 text-right font-medium"
                      />
                    </td>
                    <td className="py-2 px-3 text-right font-mono font-medium text-[var(--color-primary)]">
                      {rate ? formatCurrency(rate, currency, true) : '—'}
                    </td>
                    <td className="py-2 px-3 align-middle">
                      {rate ? (
                        <div className="data-bar-track">
                          <div className="data-bar-fill" style={{ width: `${Math.min(100, Math.max(5, barPercent))}%` }} />
                        </div>
                      ) : null}
                    </td>
                    <td className="py-2 px-3 text-center">
                      <button
                        onClick={() => removeRetailCompRow(idx)}
                        className="text-gray-400 hover:text-[var(--color-negative)] transition-colors p-1"
                        title="Delete Row"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-[rgba(5,28,44,0.03)] font-semibold border-t-2 border-[var(--color-border)]">
                <td colSpan={3} className="py-3 px-3 text-[12px] text-[var(--color-primary)] uppercase tracking-wide">
                  Average Retail Price per Unit
                </td>
                <td className="py-3 px-3 text-right text-[13px] font-mono text-[var(--color-accent)] font-bold">
                  {formatCurrency(calc.avgRetailPricePerUnit, currency)}
                </td>
                <td colSpan={4} className="py-3 px-3 text-[12px] text-[var(--color-muted)]">
                  Expected Gross Realisation ({deal.proposedUnitsYield} Units):{' '}
                  <strong>{formatCurrency(calc.grossRealisation, currency)}</strong>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      {/* SECTION 5: REALISATION & SELLING COSTS */}
      <section id="section-realisation" className="saas-card p-6">
        <div className="flex items-center gap-2 mb-4 border-b border-[var(--color-border)] pb-3">
          <Briefcase className="w-4 h-4 text-[var(--color-accent)]" />
          <h2 className="font-heading-title text-[18px] font-bold text-[var(--color-primary)]">
            Section 5: Realisation Engine & Selling Costs
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="label-uppercase text-[11px] text-[var(--color-muted)] block mb-1.5">
              Gross Realisation (Revenue)
            </label>
            <div className="w-full px-3 py-2 text-[13px] rounded bg-[rgba(5,28,44,0.03)] border border-[var(--color-border)] font-semibold text-[var(--color-primary)]">
              {formatCurrency(calc.grossRealisation, currency)}
            </div>
            <span className="text-[10px] text-[var(--color-muted)] mt-1 block">
              Yield × Avg Retail Comp
            </span>
          </div>

          <div>
            <label className="label-uppercase text-[11px] text-[var(--color-muted)] block mb-1.5">
              Agent Commission ({formatPercent(settings.defaultAgentCommRate)})
            </label>
            <div className="w-full px-3 py-2 text-[13px] rounded bg-[rgba(5,28,44,0.03)] border border-[var(--color-border)] font-semibold text-[var(--color-primary)]">
              {formatCurrency(calc.sellingAgentCommission, currency)}
            </div>
            <span className="text-[10px] text-[var(--color-muted)] mt-1 block">
              Global rate '01_Global_Settings'!C9
            </span>
          </div>

          <div>
            <label className="label-uppercase text-[11px] text-[var(--color-muted)] block mb-1.5">
              Marketing & Legal / Unit ({currency})
            </label>
            <input
              type="number"
              value={deal.marketingLegalPerUnit || ''}
              onChange={(e) => updateDealProp('marketingLegalPerUnit', parseFloat(e.target.value) || 0)}
              className="cell-editable w-full px-3 py-2 text-[13px] rounded border border-amber-200 font-medium"
              placeholder="0"
            />
            <span className="text-[10px] text-[var(--color-muted)] mt-1 block">
              Collateral, 3D renders, sales legal
            </span>
          </div>

          <div>
            <label className="label-uppercase text-[11px] text-[var(--color-muted)] block mb-1.5">
              Total Selling Costs
            </label>
            <div className="w-full px-3 py-2 text-[13px] rounded bg-[rgba(5,28,44,0.03)] border border-[var(--color-border)] font-semibold text-[var(--color-primary)]">
              {formatCurrency(calc.totalSellingCosts, currency)}
            </div>
            <span className="text-[10px] text-[var(--color-muted)] mt-1 block">
              Agent comm + Unit marketing
            </span>
          </div>

          <div>
            <label className="label-uppercase text-[11px] text-[var(--color-muted)] block mb-1.5">
              Net Realisation (NRV)
            </label>
            <div className="w-full px-3 py-2 text-[14px] rounded bg-[rgba(34,81,255,0.04)] border border-[var(--color-accent)] font-bold text-[var(--color-accent)]">
              {formatCurrency(calc.netRealisation, currency)}
            </div>
            <span className="text-[10px] text-[var(--color-muted)] mt-1 block">
              Net proceeds received
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 6: TOTAL DEVELOPMENT COSTS */}
      <section id="section-development" className="saas-card p-6">
        <div className="flex items-center gap-2 mb-4 border-b border-[var(--color-border)] pb-3">
          <Building2 className="w-4 h-4 text-[var(--color-accent)]" />
          <h2 className="font-heading-title text-[18px] font-bold text-[var(--color-primary)]">
            Section 6: Comprehensive Development Hard & Soft Costs
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="label-uppercase text-[11px] text-[var(--color-muted)] block mb-1.5">
              Construction Rate ({currency}/m²)
            </label>
            <input
              type="number"
              value={deal.buildCostRate || ''}
              onChange={(e) => updateDealProp('buildCostRate', parseFloat(e.target.value) || 0)}
              className="cell-editable w-full px-3 py-2 text-[13px] rounded border border-amber-200 font-bold"
              placeholder="0"
            />
            <span className="text-[10px] text-[var(--color-muted)] mt-1 block">
              Total Build: <strong>{formatCurrency(calc.totalBuildCost, currency)}</strong>
            </span>
          </div>

          <div>
            <label className="label-uppercase text-[11px] text-[var(--color-muted)] block mb-1.5">
              Council Contribution / Unit ({currency})
            </label>
            <input
              type="number"
              value={deal.councilContributionPerUnit || ''}
              onChange={(e) => updateDealProp('councilContributionPerUnit', parseFloat(e.target.value) || 0)}
              className="cell-editable w-full px-3 py-2 text-[13px] rounded border border-amber-200 font-medium"
              placeholder="0"
            />
            <span className="text-[10px] text-[var(--color-muted)] mt-1 block">
              Total Contributions: <strong>{formatCurrency(calc.totalCouncilContributions, currency)}</strong>
            </span>
          </div>

          <div>
            <label className="label-uppercase text-[11px] text-[var(--color-muted)] block mb-1.5">
              Consultants ({formatPercent(settings.defaultProfessionalRate)})
            </label>
            <div className="w-full px-3 py-2 text-[13px] rounded bg-[rgba(5,28,44,0.03)] border border-[var(--color-border)] font-semibold text-[var(--color-primary)]">
              {formatCurrency(calc.totalProfessionalFees, currency)}
            </div>
            <span className="text-[10px] text-[var(--color-muted)] mt-1 block">
              Architect, structural, planners
            </span>
          </div>

          <div>
            <label className="label-uppercase text-[11px] text-[var(--color-muted)] block mb-1.5">
              Contingency ({formatPercent(calc.effectiveContingencyRate)})
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                step="0.01"
                value={deal.customContingencyRate !== null ? (deal.customContingencyRate * 100) : ''}
                onChange={(e) => {
                  const val = e.target.value === '' ? null : parseFloat(e.target.value) / 100;
                  updateDealProp('customContingencyRate', val);
                }}
                placeholder={`Def ${formatPercent(settings.defaultContingencyRate)}`}
                className="cell-editable w-[80px] px-2 py-2 text-[12px] rounded border border-amber-200 text-center"
                title="Override contingency % or leave blank to inherit default"
              />
              <div className="flex-1 px-3 py-2 text-[13px] rounded bg-[rgba(5,28,44,0.03)] border border-[var(--color-border)] font-semibold text-[var(--color-primary)]">
                {formatCurrency(calc.contingencyAmount, currency)}
              </div>
            </div>
            <span className="text-[10px] text-[var(--color-muted)] mt-1 block">
              {deal.customContingencyRate !== null ? 'Project override rate' : 'Inheriting global setting'}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 rounded bg-[rgba(5,28,44,0.03)] border border-[var(--color-border)]">
          <span className="text-[12px] font-semibold text-[var(--color-primary)] uppercase tracking-wide">
            Total Development Costs Subtotal
          </span>
          <span className="font-mono font-bold text-[15px] text-[var(--color-primary)]">
            {formatCurrency(calc.totalDevelopmentCosts, currency)}
          </span>
        </div>
      </section>

      {/* SECTION 7: PROFITABILITY & VERDICT ENGINE */}
      <section id="section-verdict" className="saas-card p-6">
        <div className="flex items-center gap-2 mb-4 border-b border-[var(--color-border)] pb-3">
          <CheckCircle className="w-4 h-4 text-[var(--color-accent)]" />
          <h2 className="font-heading-title text-[18px] font-bold text-[var(--color-primary)]">
            Section 7: Full Project Feasibility & Decision Verdict Engine
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="label-uppercase text-[11px] text-[var(--color-muted)] block mb-1.5">
              Finance & Loan Interest ({currency})
            </label>
            <input
              type="number"
              value={deal.financeInterestAllowance || ''}
              onChange={(e) => updateDealProp('financeInterestAllowance', parseFloat(e.target.value) || 0)}
              className="cell-editable w-full px-3 py-2 text-[13px] rounded border border-amber-200 font-medium"
              placeholder="0"
            />
            <span className="text-[10px] text-[var(--color-muted)] mt-1 block">
              Construction facility interest & bank fees
            </span>
          </div>

          <div>
            <label className="label-uppercase text-[11px] text-[var(--color-muted)] block mb-1.5">
              Total Project Cost
            </label>
            <div className="w-full px-3 py-2 text-[14px] rounded bg-[rgba(5,28,44,0.03)] border border-[var(--color-border)] font-bold text-[var(--color-primary)]">
              {formatCurrency(calc.totalProjectCost, currency)}
            </div>
            <span className="text-[10px] text-[var(--color-muted)] mt-1 block">
              Land + Development + Finance
            </span>
          </div>

          <div>
            <label className="label-uppercase text-[11px] text-[var(--color-muted)] block mb-1.5">
              Net Development Profit
            </label>
            <div className="w-full px-3 py-2 text-[14px] rounded bg-[rgba(5,28,44,0.03)] border border-[var(--color-border)] font-bold text-[var(--color-primary)]">
              {formatCurrency(calc.netDevelopmentProfit, currency)}
            </div>
            <span className="text-[10px] text-[var(--color-muted)] mt-1 block">
              Net Realisation - Total Project Cost
            </span>
          </div>

          <div>
            <label className="label-uppercase text-[11px] text-[var(--color-muted)] block mb-1.5">
              Calculated Profit on Cost (POC)
            </label>
            <div
              className={`w-full px-3 py-2 text-[15px] font-bold font-display rounded border ${
                calc.verdictCode === 'PASS'
                  ? 'bg-[#D4EDDA] border-[#155724] text-[#155724]'
                  : calc.verdictCode === 'FAIL'
                  ? 'bg-[#F8D7DA] border-[#721C24] text-[#721C24]'
                  : 'bg-[#FFF3CD] border-[#856404] text-[#856404]'
              }`}
            >
              {formatPercent(calc.profitOnCostPoc)}
            </div>
            <span className="text-[10px] text-[var(--color-muted)] mt-1 block">
              Target Threshold: {formatPercent(calc.targetPocThreshold)}
            </span>
          </div>
        </div>

        {/* Big Verdict Decision Display */}
        <div
          className={`p-6 rounded-[12px] flex flex-col sm:flex-row items-center justify-between gap-4 border ${
            calc.verdictCode === 'PASS'
              ? 'bg-[#D4EDDA] border-[#155724] text-[#155724]'
              : calc.verdictCode === 'FAIL'
              ? 'bg-[#F8D7DA] border-[#721C24] text-[#721C24]'
              : 'bg-[#FFF3CD] border-[#856404] text-[#856404]'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-white/70 shadow-sm">
              {calc.verdictCode === 'PASS' ? (
                <CheckCircle className="w-8 h-8 text-[#155724]" />
              ) : calc.verdictCode === 'FAIL' ? (
                <AlertTriangle className="w-8 h-8 text-[#721C24]" />
              ) : (
                <Info className="w-8 h-8 text-[#856404]" />
              )}
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider font-semibold opacity-80">
                Automated Screening Verdict
              </div>
              <div className="font-display text-[32px] font-bold leading-tight">
                {calc.dealVerdict}
              </div>
            </div>
          </div>

          <div className="text-right text-[12px] space-y-1">
            <div>
              <strong>Calculated POC:</strong> {formatPercent(calc.profitOnCostPoc)} vs{' '}
              <strong>Hurdle:</strong> {formatPercent(calc.targetPocThreshold)}
            </div>
            <div>
              <strong>Max Allowable Land Offer (MALO):</strong>{' '}
              <span className="font-mono font-bold text-[14px]">
                {formatCurrency(maxAllowableLandOffer, currency)}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
