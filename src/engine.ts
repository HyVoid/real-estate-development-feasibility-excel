import { GlobalSettings, DealData, CalculatedDeal, AppState, LandComp, RetailComp } from './types';

export const DEFAULT_GLOBAL_SETTINGS: GlobalSettings = {
  currencySymbol: '$',
  targetPocThreshold: 0.25, // 25.00%
  defaultStampDutyRate: 0.055, // 5.50%
  defaultProfessionalRate: 0.06, // 6.00%
  defaultContingencyRate: 0.05, // 5.00%
  defaultAgentCommRate: 0.022, // 2.20%
};

export const createEmptyLandComps = (count = 10): LandComp[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `land_comp_${i + 1}`,
    name: '',
    salePrice: null,
    landSizeSqm: null,
  }));
};

export const createEmptyRetailComps = (count = 10): RetailComp[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `retail_comp_${i + 1}`,
    name: '',
    bedsBaths: '',
    salePrice: null,
    gfaSqm: null,
  }));
};

export const DEFAULT_RESIDENTIAL_DEAL: DealData = {
  id: 'deal_res_001',
  dealType: 'residential',
  projectName: '74 Elmhurst Road Luxury Dwelling',
  siteAreaSqm: 820,
  proposedUnitsYield: 1,
  targetGfaSqm: 320,
  landComps: [
    { id: 'l1', name: '68 Elmhurst Rd (Sold May 2026)', salePrice: 840000, landSizeSqm: 810 },
    { id: 'l2', name: '15 Bellevue Terrace', salePrice: 880000, landSizeSqm: 850 },
    { id: 'l3', name: '9 Napier Avenue', salePrice: 830000, landSizeSqm: 790 },
    ...createEmptyLandComps(7).map((c, i) => ({ ...c, id: `l${i + 4}` })),
  ],
  agreedPurchasePrice: 850000,
  acquisitionLegalFees: 6500,
  retailComps: [
    { id: 'r1', name: '70 Elmhurst Rd (New Build)', bedsBaths: '4B3B2C', salePrice: 1850000, gfaSqm: 310 },
    { id: 'r2', name: '3 Bellevue Terrace', bedsBaths: '5B3.5B2C', salePrice: 1920000, gfaSqm: 330 },
    { id: 'r3', name: '18 Napier Ave (High Spec)', bedsBaths: '4B3B2C', salePrice: 1880000, gfaSqm: 315 },
    ...createEmptyRetailComps(7).map((c, i) => ({ ...c, id: `r${i + 4}` })),
  ],
  marketingLegalPerUnit: 8000,
  buildCostRate: 2100,
  councilContributionPerUnit: 15000,
  customContingencyRate: null, // Inherits 5%
  financeInterestAllowance: 65000,
};

export const DEFAULT_TOWNHOUSE_DEAL: DealData = {
  id: 'deal_th_001',
  dealType: 'townhouse',
  projectName: '18 Smith Street Townhouse Enclave (Benchmark)',
  siteAreaSqm: 750,
  proposedUnitsYield: 4,
  targetGfaSqm: 600,
  landComps: [
    { id: 'tl1', name: '14 Smith St (DA Approved)', salePrice: 1180000, landSizeSqm: 720 },
    { id: 'tl2', name: '22 Orchard Ave', salePrice: 1250000, landSizeSqm: 780 },
    { id: 'tl3', name: '5 Railway Parade', salePrice: 1220000, landSizeSqm: 760 },
    ...createEmptyLandComps(7).map((c, i) => ({ ...c, id: `tl${i + 4}` })),
  ],
  agreedPurchasePrice: 1200000,
  acquisitionLegalFees: 8000,
  retailComps: [
    { id: 'tr1', name: 'TH 1/12 High St', bedsBaths: '3B2.5B1C', salePrice: 980000, gfaSqm: 145 },
    { id: 'tr2', name: 'TH 2/12 High St', bedsBaths: '3B2.5B1C', salePrice: 1020000, gfaSqm: 152 },
    { id: 'tr3', name: 'TH 4/8 Park Way', bedsBaths: '4B3B2C', salePrice: 1000000, gfaSqm: 150 },
    ...createEmptyRetailComps(7).map((c, i) => ({ ...c, id: `tr${i + 4}` })),
  ],
  marketingLegalPerUnit: 5000,
  buildCostRate: 2200,
  councilContributionPerUnit: 22000,
  customContingencyRate: null, // Inherits 5%
  financeInterestAllowance: 120000,
};

export const DEFAULT_APP_STATE: AppState = {
  settings: DEFAULT_GLOBAL_SETTINGS,
  residentialDeal: DEFAULT_RESIDENTIAL_DEAL,
  townhouseDeal: DEFAULT_TOWNHOUSE_DEAL,
};

/**
 * Calculates feasibility metrics with mathematical precision and edge-case protection
 */
export function calculateDeal(deal: DealData, settings: GlobalSettings): CalculatedDeal {
  // 1. Land Comparables
  const landCompDetails = deal.landComps.map((comp) => {
    if (comp.salePrice && comp.landSizeSqm && comp.landSizeSqm > 0) {
      return {
        id: comp.id,
        pricePerSqm: Math.round((comp.salePrice / comp.landSizeSqm) * 100) / 100,
      };
    }
    return { id: comp.id, pricePerSqm: null };
  });

  const validLandPrices = landCompDetails
    .map((c) => c.pricePerSqm)
    .filter((p): p is number => p !== null && p > 0);

  const avgLandPricePerSqm =
    validLandPrices.length > 0
      ? Math.round((validLandPrices.reduce((a, b) => a + b, 0) / validLandPrices.length) * 100) / 100
      : 0;

  const modelIndicatedLandValue = Math.round(deal.siteAreaSqm * avgLandPricePerSqm);

  // 2. Acquisition Costs
  const calculatedStampDuty = Math.round(deal.agreedPurchasePrice * settings.defaultStampDutyRate);
  const totalLandAcquisitionCost =
    deal.agreedPurchasePrice + calculatedStampDuty + (deal.acquisitionLegalFees || 0);

  const units = Math.max(1, deal.proposedUnitsYield || 1);
  const landCostPerDoor = Math.round(totalLandAcquisitionCost / units);

  // 3. Retail Comparables
  const retailCompDetails = deal.retailComps.map((comp) => {
    if (comp.salePrice && comp.gfaSqm && comp.gfaSqm > 0) {
      return {
        id: comp.id,
        pricePerSqm: Math.round((comp.salePrice / comp.gfaSqm) * 100) / 100,
      };
    }
    return { id: comp.id, pricePerSqm: null };
  });

  const validRetailPrices = deal.retailComps
    .map((c) => c.salePrice)
    .filter((p): p is number => p !== null && p > 0);

  const avgRetailPricePerUnit =
    validRetailPrices.length > 0
      ? Math.round(validRetailPrices.reduce((a, b) => a + b, 0) / validRetailPrices.length)
      : 0;

  // 4. Realisation Engine
  const grossRealisation = Math.round(deal.proposedUnitsYield * avgRetailPricePerUnit);
  const sellingAgentCommission = Math.round(grossRealisation * settings.defaultAgentCommRate);
  const totalSellingCosts =
    sellingAgentCommission + deal.proposedUnitsYield * (deal.marketingLegalPerUnit || 0);
  const netRealisation = grossRealisation - totalSellingCosts;

  // 5. Total Development Costs
  const avgGfaPerUnit =
    deal.proposedUnitsYield > 0
      ? Math.round((deal.targetGfaSqm / deal.proposedUnitsYield) * 100) / 100
      : 0;
  const totalBuildCost = Math.round(deal.targetGfaSqm * (deal.buildCostRate || 0));
  const totalCouncilContributions = Math.round(
    deal.proposedUnitsYield * (deal.councilContributionPerUnit || 0)
  );
  const totalProfessionalFees = Math.round(totalBuildCost * settings.defaultProfessionalRate);

  const effectiveContingencyRate =
    deal.customContingencyRate !== null && deal.customContingencyRate !== undefined
      ? deal.customContingencyRate
      : settings.defaultContingencyRate;

  const contingencyAmount = Math.round(totalBuildCost * effectiveContingencyRate);
  const totalDevelopmentCosts =
    totalBuildCost + totalCouncilContributions + totalProfessionalFees + contingencyAmount;

  // 6. Project Total Cost & Profit
  const financeInterest = deal.financeInterestAllowance || 0;
  const totalProjectCost = totalLandAcquisitionCost + totalDevelopmentCosts + financeInterest;
  const netDevelopmentProfit = netRealisation - totalProjectCost;

  // 7. Profit on Cost (POC) & Verdict Engine
  const profitOnCostPoc = totalProjectCost > 0 ? netDevelopmentProfit / totalProjectCost : 0;
  const targetPocThreshold = settings.targetPocThreshold;

  let dealVerdict: 'PASS' | 'FAIL' | 'PENDING INPUT' = 'PENDING INPUT';
  let verdictCode: 'PASS' | 'FAIL' | 'PENDING' = 'PENDING';

  if (totalProjectCost === 0 || deal.proposedUnitsYield <= 0 || grossRealisation === 0) {
    dealVerdict = 'PENDING INPUT';
    verdictCode = 'PENDING';
  } else {
    // Round to 4 decimal places (basis points) to eliminate IEEE floating point issues
    const roundedPoc = Math.round(profitOnCostPoc * 10000);
    const roundedHurdle = Math.round(targetPocThreshold * 10000);

    if (roundedPoc >= roundedHurdle) {
      dealVerdict = 'PASS';
      verdictCode = 'PASS';
    } else {
      dealVerdict = 'FAIL';
      verdictCode = 'FAIL';
    }
  }

  return {
    landCompDetails,
    avgLandPricePerSqm,
    modelIndicatedLandValue,
    calculatedStampDuty,
    totalLandAcquisitionCost,
    landCostPerDoor,
    retailCompDetails,
    avgRetailPricePerUnit,
    grossRealisation,
    sellingAgentCommission,
    totalSellingCosts,
    netRealisation,
    avgGfaPerUnit,
    totalBuildCost,
    totalCouncilContributions,
    totalProfessionalFees,
    effectiveContingencyRate,
    contingencyAmount,
    totalDevelopmentCosts,
    totalProjectCost,
    netDevelopmentProfit,
    profitOnCostPoc,
    targetPocThreshold,
    dealVerdict,
    verdictCode,
  };
}

/**
 * Format currency with dynamic symbol and clean grouping
 */
export function formatCurrency(value: number | null | undefined, symbol = '$', showDecimals = false): string {
  if (value === null || value === undefined || isNaN(value)) return '—';
  const absVal = Math.abs(value);
  const formatted = absVal.toLocaleString('en-US', {
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  });
  return value < 0 ? `-${symbol}${formatted}` : `${symbol}${formatted}`;
}

/**
 * Format percentage
 */
export function formatPercent(value: number | null | undefined, decimals = 2): string {
  if (value === null || value === undefined || isNaN(value)) return '—';
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * Format numbers (area, quantity)
 */
export function formatNumber(value: number | null | undefined, decimals = 0): string {
  if (value === null || value === undefined || isNaN(value)) return '—';
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Sensitivity Analysis Generator for Exposure Matrix
 */
export interface SensitivityPoint {
  purchasePriceDeltaPercent: number; // e.g. -10%, 0%, +10%
  purchasePrice: number;
  retailPriceDeltaPercent: number; // e.g. -10%, 0%, +10%
  retailPrice: number;
  poc: number;
  profit: number;
  isPass: boolean;
}

export function generateSensitivityMatrix(
  deal: DealData,
  settings: GlobalSettings,
  priceDeltas = [-0.10, -0.05, 0, 0.05, 0.10],
  retailDeltas = [0.10, 0.05, 0, -0.05, -0.10]
): {
  baseCalc: CalculatedDeal;
  matrix: SensitivityPoint[][];
} {
  const baseCalc = calculateDeal(deal, settings);
  const basePurchase = deal.agreedPurchasePrice;
  const baseRetail = baseCalc.avgRetailPricePerUnit;

  const matrix: SensitivityPoint[][] = [];

  for (const retailDelta of retailDeltas) {
    const row: SensitivityPoint[] = [];
    const modifiedRetail = Math.round(baseRetail * (1 + retailDelta));

    for (const purchaseDelta of priceDeltas) {
      const modifiedPurchase = Math.round(basePurchase * (1 + purchaseDelta));

      // Clone deal and override
      const clonedDeal: DealData = {
        ...deal,
        agreedPurchasePrice: modifiedPurchase,
        retailComps: deal.retailComps.map((rc, idx) =>
          idx === 0 ? { ...rc, salePrice: modifiedRetail } : { ...rc, salePrice: null }
        ),
      };

      const simCalc = calculateDeal(clonedDeal, settings);
      const isPass = simCalc.verdictCode === 'PASS';

      row.push({
        purchasePriceDeltaPercent: purchaseDelta,
        purchasePrice: modifiedPurchase,
        retailPriceDeltaPercent: retailDelta,
        retailPrice: modifiedRetail,
        poc: simCalc.profitOnCostPoc,
        profit: simCalc.netDevelopmentProfit,
        isPass,
      });
    }
    matrix.push(row);
  }

  return { baseCalc, matrix };
}
