import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { INVESTMENT_CRITERIA } from '../data/initialData';
import { CheckCircle2, AlertCircle, ArrowRight, DollarSign, Calculator, Layers, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const InvestmentCriteriaPage: React.FC = () => {
  const { openContactModal } = useApp();

  // State for Interactive Fit Calculator
  const [revenue, setRevenue] = useState<number>(12); // $M
  const [ebitda, setEbitda] = useState<number>(3.2); // $M
  const [sector, setSector] = useState<string>('Industrial Services');
  const [recurringPct, setRecurringPct] = useState<number>(75); // %
  const [maxCustomerPct, setMaxCustomerPct] = useState<number>(12); // %
  const [dealType, setDealType] = useState<string>('Search Fund Acquisition');

  // Calculate Fit Score
  const calculateFit = () => {
    let score = 50;
    const checks: { label: string; passed: boolean; note: string }[] = [];

    // EBITDA check
    if (ebitda >= 1.5 && ebitda <= 10) {
      score += 20;
      checks.push({ label: 'EBITDA ($1.5M - $10M)', passed: true, note: `$${ebitda}M fits ideal check size` });
    } else if (ebitda < 1.5) {
      checks.push({ label: 'EBITDA Range', passed: false, note: 'Below $1.5M minimum threshold' });
    } else {
      score += 10;
      checks.push({ label: 'EBITDA Range', passed: true, note: 'Exceeds standard threshold, eligible for co-investment' });
    }

    // EBITDA Margin check
    const margin = (ebitda / revenue) * 100;
    if (margin >= 15) {
      score += 15;
      checks.push({ label: 'EBITDA Margin (>15%)', passed: true, note: `${margin.toFixed(1)}% margin indicates solid pricing power` });
    } else {
      checks.push({ label: 'EBITDA Margin', passed: false, note: `${margin.toFixed(1)}% is slightly below the 15% target` });
    }

    // Recurring Revenue check
    if (recurringPct >= 60) {
      score += 15;
      checks.push({ label: 'High Recurring Revenue (>60%)', passed: true, note: `${recurringPct}% recurring revenue ensures revenue stability` });
    } else {
      checks.push({ label: 'Recurring Revenue', passed: false, note: `${recurringPct}% may require additional diligence on retention` });
    }

    // Customer Concentration
    if (maxCustomerPct <= 15) {
      score += 10;
      checks.push({ label: 'Low Customer Concentration (<15%)', passed: true, note: 'Diverse customer base protects downside' });
    } else {
      checks.push({ label: 'Customer Concentration', passed: false, note: `Largest customer (${maxCustomerPct}%) exceeds 15% preference` });
    }

    return { score: Math.min(score, 100), checks };
  };

  const fitResult = calculateFit();

  return (
    <div className="pt-28 pb-20 bg-[#FAF9F6] text-[#121316] min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl space-y-4"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-medium">
            Advisory & Investment Parameters
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal text-neutral-900 tracking-tight leading-[1.12]">
            Target Criteria, Mandate Scope & Deal Underwriting
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed pt-2">
            Just Me Ben LTD evaluates property development schemes, mezzanine financing requests, crowdfunding mandates, and alternative investment opportunities with institutional underwriting rigor.
          </p>
        </motion.div>
      </div>

      {/* Criteria Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INVESTMENT_CRITERIA.map((criterion) => (
            <div
              key={criterion.id}
              className="p-8 rounded-3xl bg-white border border-neutral-200/80 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-600 bg-neutral-100 px-3 py-1 rounded-full">
                  {criterion.category}
                </span>
                <h3 className="text-xl font-medium text-neutral-900">{criterion.title}</h3>
                <div className="text-base font-semibold text-neutral-900 pb-1 border-b border-neutral-100">
                  {criterion.value}
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                  {criterion.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Deal Fit Calculator Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mb-28">
        <div className="rounded-3xl bg-neutral-900 text-white p-8 sm:p-12 shadow-2xl border border-neutral-800">
          <div className="flex flex-col lg:flex-row gap-12 items-start justify-between">
            {/* Left: Input Controls */}
            <div className="w-full lg:w-7/12 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-cyan-300 text-xs uppercase tracking-widest font-semibold">
                  <Calculator className="w-4 h-4" />
                  <span>Interactive Mandate Assessment</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-normal text-white">
                  Check Mandate Alignment in Real-Time
                </h2>
                <p className="text-xs sm:text-sm text-neutral-400 font-light">
                  Input your project metrics to evaluate how closely your asset or capital raising request aligns with Just Me Ben LTD’s core structuring criteria.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                {/* Revenue / GDV slider */}
                <div>
                  <div className="flex justify-between text-xs font-medium text-neutral-300 mb-2">
                    <span>Gross Dev Value / GDV (£M)</span>
                    <span className="text-cyan-300 font-semibold">£{revenue}M</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="60"
                    step="1"
                    value={revenue}
                    onChange={(e) => setRevenue(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                {/* Capital Required / Mezzanine slider */}
                <div>
                  <div className="flex justify-between text-xs font-medium text-neutral-300 mb-2">
                    <span>Funding Gap / Mezzanine (£M)</span>
                    <span className="text-cyan-300 font-semibold">£{ebitda}M</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="15"
                    step="0.1"
                    value={ebitda}
                    onChange={(e) => setEbitda(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                {/* Pre-sales / Sponsor Equity % */}
                <div>
                  <div className="flex justify-between text-xs font-medium text-neutral-300 mb-2">
                    <span>Pre-Committed / Sponsor Equity (%)</span>
                    <span className="text-cyan-300 font-semibold">{recurringPct}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={recurringPct}
                    onChange={(e) => setRecurringPct(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                {/* Target Loan to Cost % */}
                <div>
                  <div className="flex justify-between text-xs font-medium text-neutral-300 mb-2">
                    <span>Maximum Target LTC Gap (%)</span>
                    <span className="text-cyan-300 font-semibold">{maxCustomerPct}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="45"
                    step="1"
                    value={maxCustomerPct}
                    onChange={(e) => setMaxCustomerPct(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">Asset Class / Sector</label>
                  <select
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-xs"
                  >
                    <option>Residential Development (Build-to-Sell)</option>
                    <option>Commercial Logistics & Industrial</option>
                    <option>Crowdfunding Platform / FinTech</option>
                    <option>Urban Mixed-Use Regeneration</option>
                    <option>PropTech & Alternative Ventures</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-neutral-400 mb-1">Advisory Mandate Type</label>
                  <select
                    value={dealType}
                    onChange={(e) => setDealType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-neutral-800 border border-neutral-700 text-white text-xs"
                  >
                    <option>Crowdfunding Campaign Advisory</option>
                    <option>Mezzanine Debt Structuring</option>
                    <option>Private Equity SPV Syndication</option>
                    <option>Comprehensive Capital Raising</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Right: Score Output & Next Action */}
            <div className="w-full lg:w-5/12 bg-neutral-950 p-6 sm:p-8 rounded-2xl border border-neutral-800 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-400 uppercase tracking-wider">
                    Mandate Fit Score
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-medium">
                    {fitResult.score >= 80 ? 'High Alignment' : 'Moderate Alignment'}
                  </span>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-light text-white tracking-tight">
                    {fitResult.score}
                  </span>
                  <span className="text-neutral-500 text-xl font-light">/ 100</span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      fitResult.score >= 80
                        ? 'bg-emerald-400'
                        : fitResult.score >= 60
                        ? 'bg-amber-400'
                        : 'bg-cyan-400'
                    }`}
                    style={{ width: `${fitResult.score}%` }}
                  />
                </div>

                {/* Checks checklist */}
                <div className="space-y-2 pt-2">
                  {fitResult.checks.map((c, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs">
                      {c.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <span className="text-neutral-200 font-medium">{c.label}: </span>
                        <span className="text-neutral-400 font-light">{c.note}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800">
                <button
                  onClick={openContactModal}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-colors shadow-lg cursor-pointer"
                >
                  <span>Submit Mandate for Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
