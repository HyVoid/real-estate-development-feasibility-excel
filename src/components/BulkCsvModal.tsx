import React, { useState } from 'react';
import { DealData, LandComp, RetailComp } from '../types';
import { X, Upload, Download, Copy, Check, FileSpreadsheet, AlertCircle } from 'lucide-react';

interface BulkCsvModalProps {
  isOpen: boolean;
  onClose: () => void;
  residentialDeal: DealData;
  townhouseDeal: DealData;
  onImportLandComps: (dealType: 'residential' | 'townhouse', comps: LandComp[]) => void;
  onImportRetailComps: (dealType: 'residential' | 'townhouse', comps: RetailComp[]) => void;
}

export const BulkCsvModal: React.FC<BulkCsvModalProps> = ({
  isOpen,
  onClose,
  residentialDeal,
  townhouseDeal,
  onImportLandComps,
  onImportRetailComps,
}) => {
  const [targetDeal, setTargetDeal] = useState<'residential' | 'townhouse'>('townhouse');
  const [importType, setImportType] = useState<'land' | 'retail'>('land');
  const [csvText, setCsvText] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const landTemplate = `Address / Identifier,Sale Price,Land Size (m2)
14 Smith St (DA Approved),1180000,720
22 Orchard Ave,1250000,780
5 Railway Parade,1220000,760
39 Victoria Rd,1150000,710`;

  const retailTemplate = `Property Identifier,Beds / Baths,Sale Price,Internal GFA (m2)
TH 1/12 High St,3B2.5B1C,980000,145
TH 2/12 High St,3B2.5B1C,1020000,152
TH 4/8 Park Way,4B3B2C,1000000,150
TH 8/14 Crown St,3B2B1C,975000,142`;

  const currentTemplate = importType === 'land' ? landTemplate : retailTemplate;

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(currentTemplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTemplate = () => {
    const blob = new Blob([currentTemplate], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${importType}_comparables_template.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setCsvText(content || '');
    };
    reader.readAsText(file);
  };

  const parseAndImport = () => {
    setErrorMsg(null);
    if (!csvText.trim()) {
      setErrorMsg('Please paste CSV data or upload a file first.');
      return;
    }

    try {
      const lines = csvText
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter((l) => l.length > 0);

      if (lines.length < 2) {
        setErrorMsg('CSV must contain a header row and at least one data row.');
        return;
      }

      // Skip header line
      const dataLines = lines.slice(1);

      if (importType === 'land') {
        const parsedLandComps: LandComp[] = dataLines.slice(0, 10).map((line, i) => {
          const parts = line.split(',').map((p) => p.trim());
          const name = parts[0] || `Comp ${i + 1}`;
          const salePrice = parts[1] ? parseFloat(parts[1].replace(/[^0-9.]/g, '')) : null;
          const landSizeSqm = parts[2] ? parseFloat(parts[2].replace(/[^0-9.]/g, '')) : null;
          return {
            id: `imported_land_${Date.now()}_${i}`,
            name,
            salePrice: isNaN(salePrice as number) ? null : salePrice,
            landSizeSqm: isNaN(landSizeSqm as number) ? null : landSizeSqm,
          };
        });

        // Pad to at least 5 rows if necessary
        while (parsedLandComps.length < 10) {
          parsedLandComps.push({
            id: `empty_land_${Date.now()}_${parsedLandComps.length}`,
            name: '',
            salePrice: null,
            landSizeSqm: null,
          });
        }

        onImportLandComps(targetDeal, parsedLandComps);
        onClose();
      } else {
        const parsedRetailComps: RetailComp[] = dataLines.slice(0, 10).map((line, i) => {
          const parts = line.split(',').map((p) => p.trim());
          const name = parts[0] || `Retail Comp ${i + 1}`;
          const bedsBaths = parts[1] || '';
          const salePrice = parts[2] ? parseFloat(parts[2].replace(/[^0-9.]/g, '')) : null;
          const gfaSqm = parts[3] ? parseFloat(parts[3].replace(/[^0-9.]/g, '')) : null;
          return {
            id: `imported_retail_${Date.now()}_${i}`,
            name,
            bedsBaths,
            salePrice: isNaN(salePrice as number) ? null : salePrice,
            gfaSqm: isNaN(gfaSqm as number) ? null : gfaSqm,
          };
        });

        while (parsedRetailComps.length < 10) {
          parsedRetailComps.push({
            id: `empty_retail_${Date.now()}_${parsedRetailComps.length}`,
            name: '',
            bedsBaths: '',
            salePrice: null,
            gfaSqm: null,
          });
        }

        onImportRetailComps(targetDeal, parsedRetailComps);
        onClose();
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to parse CSV. Please check formatting.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(5,28,44,0.45)] backdrop-blur-sm">
      <div className="saas-card w-full max-w-xl p-6 relative shadow-2xl animate-fadeUp">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-md text-[var(--color-muted)] hover:text-[var(--color-primary)] hover:bg-[rgba(5,28,44,0.05)] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <FileSpreadsheet className="w-5 h-5 text-[var(--color-accent)]" />
          <h3 className="font-heading-title text-[20px] font-bold text-[var(--color-primary)]">
            Bulk CSV Comparables Import
          </h3>
        </div>

        <p className="text-[13px] text-[var(--color-body-text)] mb-4">
          Fast-track your feasibility modeling by pasting or uploading up to 10 comparable transactions from external
          spreadsheets or broker reports.
        </p>

        {/* Target Deal & Type Controls */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="label-uppercase text-[11px] text-[var(--color-muted)] block mb-1.5">
              Target Deal
            </label>
            <select
              value={targetDeal}
              onChange={(e) => setTargetDeal(e.target.value as any)}
              className="w-full px-3 py-2 text-[12px] rounded border border-[var(--color-border)] bg-white font-medium text-[var(--color-primary)]"
            >
              <option value="townhouse">03_Townhouse_Deal ({townhouseDeal.proposedUnitsYield} Units)</option>
              <option value="residential">02_Residential_Deal (Single Dwelling)</option>
            </select>
          </div>

          <div>
            <label className="label-uppercase text-[11px] text-[var(--color-muted)] block mb-1.5">
              Dataset Category
            </label>
            <select
              value={importType}
              onChange={(e) => setImportType(e.target.value as any)}
              className="w-full px-3 py-2 text-[12px] rounded border border-[var(--color-border)] bg-white font-medium text-[var(--color-primary)]"
            >
              <option value="land">Section 2: Raw Land Comparables</option>
              <option value="retail">Section 4: Retail Comparables</option>
            </select>
          </div>
        </div>

        {/* Template Helper Toolbar */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] text-[var(--color-muted)] font-medium">CSV Format Preview</span>
          <div className="flex gap-2">
            <button
              onClick={handleCopyTemplate}
              className="flex items-center gap-1 text-[11px] text-[var(--color-accent)] hover:underline"
            >
              {copied ? <Check className="w-3 h-3 text-[var(--color-positive)]" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied!' : 'Copy Sample'}</span>
            </button>
            <button
              onClick={handleDownloadTemplate}
              className="flex items-center gap-1 text-[11px] text-[var(--color-accent)] hover:underline"
            >
              <Download className="w-3 h-3" />
              <span>Download .csv</span>
            </button>
          </div>
        </div>

        {/* Textarea Input */}
        <textarea
          rows={6}
          value={csvText}
          onChange={(e) => setCsvText(e.target.value)}
          placeholder={`Paste CSV data here...\n${currentTemplate}`}
          className="w-full px-3 py-2 text-[12px] font-mono rounded border border-[var(--color-border)] bg-[#fafafa] mb-3 focus:outline-none focus:border-[var(--color-accent)]"
        />

        {/* File Input */}
        <div className="flex items-center justify-between gap-4 mb-5">
          <label className="flex items-center gap-1.5 text-[12px] text-[var(--color-muted)] cursor-pointer hover:text-[var(--color-primary)]">
            <Upload className="w-4 h-4 text-[var(--color-accent)]" />
            <span>Or select a .csv file from your computer</span>
            <input type="file" accept=".csv,text/csv" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>

        {errorMsg && (
          <div className="flex items-center gap-2 p-3 mb-4 rounded bg-[#F8D7DA] text-[#721C24] text-[12px]">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 border-t border-[var(--color-border)] pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-[12px] font-medium text-[var(--color-muted)] hover:text-[var(--color-primary)]"
          >
            Cancel
          </button>
          <button
            onClick={parseAndImport}
            className="px-5 py-2 bg-[var(--color-primary)] hover:bg-[#082a40] text-white rounded text-[12px] font-semibold transition-colors shadow-sm"
          >
            Import & Populate Table
          </button>
        </div>
      </div>
    </div>
  );
};
