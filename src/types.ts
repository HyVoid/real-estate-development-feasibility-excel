export interface GlobalSettings {
  currencySymbol: string;
  targetPocThreshold: number; // e.g. 0.25 (25%)
  defaultStampDutyRate: number; // e.g. 0.055 (5.5%)
  defaultProfessionalRate: number; // e.g. 0.06 (6.0%)
  defaultContingencyRate: number; // e.g. 0.05 (5.0%)
  defaultAgentCommRate: number; // e.g. 0.022 (2.2%)
}

export interface LandComp {
  id: string;
  name: string;
  salePrice: number | null;
  landSizeSqm: number | null;
}

export interface RetailComp {
  id: string;
  name: string;
  bedsBaths: string;
  salePrice: number | null;
  gfaSqm: number | null;
}

export interface DealData {
  id: string;
  dealType: 'residential' | 'townhouse';
  projectName: string;
  siteAreaSqm: number;
  proposedUnitsYield: number;
  targetGfaSqm: number;
  
  // Section 2: Land Comparables
  landComps: LandComp[];

  // Section 3: Acquisition
  agreedPurchasePrice: number;
  acquisitionLegalFees: number;

  // Section 4: Retail Comparables
  retailComps: RetailComp[];

  // Section 5: Realisation
  marketingLegalPerUnit: number;

  // Section 6: Development Hard & Soft Costs
  buildCostRate: number;
  councilContributionPerUnit: number;
  customContingencyRate: number | null; // null => inherits global

  // Section 7: Finance & Verdict
  financeInterestAllowance: number;
}

export type DealVerdict = 'PASS' | 'FAIL' | 'PENDING INPUT';

export interface CalculatedDeal {
  // Land Metrics
  landCompDetails: Array<{
    id: string;
    pricePerSqm: number | null;
  }>;
  avgLandPricePerSqm: number;
  modelIndicatedLandValue: number;

  // Acquisition Costs
  calculatedStampDuty: number;
  totalLandAcquisitionCost: number;
  landCostPerDoor: number; // For townhouse/multi-unit

  // Retail Metrics
  retailCompDetails: Array<{
    id: string;
    pricePerSqm: number | null;
  }>;
  avgRetailPricePerUnit: number;

  // Realisation
  grossRealisation: number;
  sellingAgentCommission: number;
  totalSellingCosts: number;
  netRealisation: number;

  // Development Costs
  avgGfaPerUnit: number;
  totalBuildCost: number;
  totalCouncilContributions: number;
  totalProfessionalFees: number;
  effectiveContingencyRate: number;
  contingencyAmount: number;
  totalDevelopmentCosts: number;

  // Full Project Financials & Verdict
  totalProjectCost: number;
  netDevelopmentProfit: number;
  profitOnCostPoc: number; // POC
  targetPocThreshold: number;
  dealVerdict: DealVerdict;
  verdictCode: 'PASS' | 'FAIL' | 'PENDING';
}

export type TabKey =
  | '00_start_here'
  | '01_global_settings'
  | '02_residential_deal'
  | '03_townhouse_deal'
  | 'exposure_matrix';

export interface AppState {
  settings: GlobalSettings;
  residentialDeal: DealData;
  townhouseDeal: DealData;
}
