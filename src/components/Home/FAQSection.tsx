import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  HelpCircle,
  ChevronDown,
  Search,
  Coins,
  Layers,
  Building2,
  Briefcase,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface FAQItem {
  id: string;
  category: 'all' | 'crowdfunding' | 'mezzanine' | 'real-estate' | 'advisory';
  categoryLabel: string;
  question: string;
  answer: string;
  keyPoints?: string[];
  badge?: string;
}

export const FAQSection: React.FC = () => {
  const { openContactModal } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>('faq-1');

  const faqData: FAQItem[] = [
    {
      id: 'faq-1',
      category: 'crowdfunding',
      categoryLabel: 'Crowdfunding Advisory',
      badge: 'Core Service',
      question: 'What types of crowdfunding models does Just Me Ben Ltd advise on?',
      answer:
        'We provide comprehensive advisory across all primary crowdfunding models: Equity Crowdfunding (offering shares/equity to vetted investors), Debt & Peer-to-Peer Lending (structured interest-bearing loans), Real Estate Crowdfunding (fractional property development & asset-backed deals), and Reward-Based campaigns for innovative product launches.',
      keyPoints: [
        'Equity Crowdfunding: Capital raising in exchange for company equity & shares',
        'Debt / P2P Lending: Fixed-term loan structures with predetermined yields',
        'Real Estate Crowdfunding: Structured asset-backed property campaigns',
        'Regulatory Compliance: Full alignment with FCA (UK) and ECSPR (Europe) standards',
      ],
    },
    {
      id: 'faq-2',
      category: 'mezzanine',
      categoryLabel: 'Mezzanine Finance',
      badge: 'Capital Stack',
      question: 'What is mezzanine finance and where does it sit in the capital stack?',
      answer:
        'Mezzanine finance is a hybrid capital instrument positioned between senior secured debt and common equity. In the event of default or liquidation, senior debt is paid first, followed by mezzanine capital, and finally equity holders. Because of this subordinated position, mezzanine financing provides higher risk-adjusted yields to investors while allowing sponsors to minimize equity dilution.',
      keyPoints: [
        'Subordinated to senior bank loans but senior to preferred and common equity',
        'Bridges the funding gap when senior lenders cap Loan-to-Value (LTV) at 60-70%',
        'Preserves equity ownership and upside control for developers and founders',
        'Flexible coupon structures: cash interest, PIK (Payment-in-Kind), or equity warrants',
      ],
    },
    {
      id: 'faq-3',
      category: 'mezzanine',
      categoryLabel: 'Mezzanine Finance',
      question: 'When should a business or developer opt for mezzanine finance over pure equity?',
      answer:
        'Mezzanine finance is ideal when a project or business has predictable cash flows or strong asset backing, but needs capital beyond standard senior debt limits without giving up significant equity ownership or governance control. It is commonly deployed for real estate developments, leveraged buyouts (LBOs), growth recapitalizations, and strategic acquisitions.',
      keyPoints: [
        'Avoids excessive equity dilution during critical expansion phases',
        'Lower cost of capital compared to issuing expensive common equity',
        'Non-amortizing or interest-only structures that preserve working capital',
        'Speed of execution through private credit and specialized syndicates',
      ],
    },
    {
      id: 'faq-4',
      category: 'crowdfunding',
      categoryLabel: 'Crowdfunding Advisory',
      question: 'How do you prepare a project or startup for a successful crowdfunding campaign?',
      answer:
        'Campaign success requires institutional-grade preparation. Our team assists with financial modeling, valuation justification, pitch deck narrative, legal disclosures, escrow setup, and cornerstone investor syndication. We build pre-launch momentum to ensure 30-40% of the target is pledged in the private launch phase before opening to the public.',
      keyPoints: [
        'Financial underwriting & realistic valuation setting',
        'High-converting campaign prospectus and multimedia assets',
        'Lead investor syndication to establish immediate credibility',
        'Post-campaign shareholder management and communication protocols',
      ],
    },
    {
      id: 'faq-5',
      category: 'real-estate',
      categoryLabel: 'Real Estate & Underwriting',
      badge: 'Risk Governance',
      question: 'What is your multi-stage evaluation process for real estate investment selection?',
      answer:
        'We adhere to four core principles: Selection, Structure, Verification, and Ongoing Monitoring. Every opportunity undergoes rigorous technical due diligence (conducted with certified surveyors and architects), legal title checks, financial sensitivity stress-testing (evaluating downside cap rates and exit pricing), and thorough counterparty background verification.',
      keyPoints: [
        'Stage 1: Sponsor track record and financial capability audit',
        'Stage 2: Technical, planning permission, and asset condition review',
        'Stage 3: Capital stack stress-testing against interest rate fluctuations',
        'Stage 4: Milestone-based escrow releases and independent monitoring',
      ],
    },
    {
      id: 'faq-6',
      category: 'real-estate',
      categoryLabel: 'Real Estate & Underwriting',
      question: 'How does real estate crowdfunding combine with institutional private equity?',
      answer:
        'Modern real estate crowdfunding is evolving into structured capital ecosystems. Instead of unvetted retail deals, leading platforms now employ private equity-grade underwriting, standardized mezzanine tranches, and institutional governance. This allows individual and family office co-investors to participate alongside institutional sponsors on identical protective terms.',
      keyPoints: [
        'First-charge security and asset-backed debentures',
        'Transparent pre-agreed exit milestones and refinance horizons',
        'Institutional monitoring and covenant enforcement',
      ],
    },
    {
      id: 'faq-7',
      category: 'advisory',
      categoryLabel: 'Advisory & Process',
      question: 'Who are Just Me Ben Ltd’s typical clients and strategic partners?',
      answer:
        'We advise mid-market real estate developers, fast-growing technology enterprises, family offices, and alternative investment platforms across the UK and Continental Europe. We are active members of the Global Professionals Network and collaborate with top-tier solicitors, chartered surveyors, and FCA-regulated crowdfunding platforms.',
      keyPoints: [
        'Property developers seeking mezzanine and gap funding for residential/commercial schemes',
        'Scale-ups preparing for equity crowdfunding rounds or series A funding',
        'Family offices seeking vetted co-investment opportunities in private credit',
      ],
    },
    {
      id: 'faq-8',
      category: 'advisory',
      categoryLabel: 'Advisory & Process',
      question: 'How can we initiate a consultation and what is the typical engagement roadmap?',
      answer:
        'You can request an initial confidential consultation directly through our website. We begin with a preliminary viability review of your executive summary and financial deck within 48 hours. If there is mutual alignment, we deliver an advisory mandate proposal with a clear project roadmap, timeline, and structured capital strategy.',
      keyPoints: [
        'Initial confidential discovery call and documentation review',
        'Comprehensive capital structuring analysis and platform matching',
        'Preparation of campaign materials and investor outreach roadmap',
        'Ongoing transaction advisory from launch to closing',
      ],
    },
  ];

  const categories = [
    { id: 'all', label: 'All Questions', icon: HelpCircle },
    { id: 'crowdfunding', label: 'Crowdfunding Advisory', icon: Coins },
    { id: 'mezzanine', label: 'Mezzanine Finance', icon: Layers },
    { id: 'real-estate', label: 'Real Estate & Capital Stack', icon: Building2 },
    { id: 'advisory', label: 'Advisory & Process', icon: Briefcase },
  ];

  const filteredFaqs = useMemo(() => {
    return faqData.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.keyPoints?.some((kp) =>
          kp.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const toggleAccordion = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq-section"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-white text-[#121316] relative border-t border-neutral-200/70"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2596be]/10 border border-[#2596be]/25 text-[#155e78] text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#2596be]" />
            <span>Frequently Asked Questions</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            id="faq-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-neutral-900 leading-[1.18] mb-6"
          >
            Clarity on Crowdfunding, Mezzanine Capital & Advisory
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed"
          >
            Key insights on how Just Me Ben Ltd structures capital, optimizes
            fundraising campaigns, and bridges the gap between developers,
            investors, and modern alternative financing markets.
          </motion.p>
        </div>

        {/* Filter Bar & Search Input */}
        <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div
            id="faq-category-tabs"
            className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none"
          >
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`faq-tab-${cat.id}`}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#2596be] text-white shadow-sm shadow-[#2596be]/30'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200/80 hover:text-neutral-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              id="faq-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions or terms..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full text-xs sm:text-sm bg-neutral-50 border border-neutral-200 text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#2596be]/20 focus:border-[#2596be] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* FAQ Accordion List */}
        {filteredFaqs.length > 0 ? (
          <div id="faq-accordion-list" className="space-y-4">
            {filteredFaqs.map((faq, index) => {
              const isExpanded = expandedId === faq.id;

              return (
                <motion.div
                  key={faq.id}
                  id={`faq-item-${faq.id}`}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isExpanded
                      ? 'bg-[#FAF9F6] border-[#2596be]/40 shadow-md shadow-[#2596be]/5'
                      : 'bg-white border-neutral-200 hover:border-[#2596be]/30 shadow-sm'
                  }`}
                >
                  <button
                    id={`faq-toggle-${faq.id}`}
                    onClick={() => toggleAccordion(faq.id)}
                    aria-expanded={isExpanded}
                    className="w-full px-6 py-5 sm:px-8 sm:py-6 flex items-center justify-between text-left gap-4 cursor-pointer"
                  >
                    <div className="flex items-start sm:items-center gap-3">
                      <span className={`flex-shrink-0 mt-0.5 sm:mt-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
                        isExpanded ? 'bg-[#2596be] text-white' : 'bg-neutral-100 text-neutral-700'
                      }`}>
                        {index + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[11px] font-semibold text-[#155e78] uppercase tracking-wider">
                            {faq.categoryLabel}
                          </span>
                          {faq.badge && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#2596be]/15 text-[#155e78]">
                              {faq.badge}
                            </span>
                          )}
                        </div>
                        <h3 className="text-base sm:text-lg font-medium text-neutral-900 leading-snug">
                          {faq.question}
                        </h3>
                      </div>
                    </div>

                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${
                        isExpanded
                          ? 'bg-[#2596be] text-white rotate-180'
                          : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        id={`faq-content-${faq.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2 sm:px-8 sm:pb-8 text-neutral-600 border-t border-neutral-200/60">
                          <p className="text-sm sm:text-base font-light leading-relaxed text-neutral-700 mb-5">
                            {faq.answer}
                          </p>

                          {faq.keyPoints && faq.keyPoints.length > 0 && (
                            <div className="p-4 sm:p-5 rounded-xl bg-white border border-neutral-200/80 shadow-xs space-y-2.5">
                              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-800 flex items-center gap-1.5">
                                <ShieldCheck className="w-3.5 h-3.5 text-[#2596be]" />
                                Key Takeaways & Structure
                              </span>
                              <ul className="space-y-2 text-xs sm:text-sm text-neutral-600">
                                {faq.keyPoints.map((point, pIdx) => (
                                  <li
                                    key={pIdx}
                                    className="flex items-start gap-2 leading-relaxed"
                                  >
                                    <CheckCircle2 className="w-4 h-4 text-[#2596be] flex-shrink-0 mt-0.5" />
                                    <span>{point}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 px-4 rounded-2xl bg-neutral-50 border border-dashed border-neutral-300">
            <HelpCircle className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
            <h4 className="text-base font-medium text-neutral-800 mb-1">
              No matching questions found
            </h4>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-sm mx-auto mb-5">
              Try adjusting your search terms or select another category tab above.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-full bg-[#2596be] text-white text-xs font-medium hover:bg-[#1d7b9c]"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Interactive Consultation CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          id="faq-cta-box"
          className="mt-16 rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-[#10303e] to-[#0c1e27] text-white shadow-xl border border-[#2596be]/25 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
        >
          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2596be]/20 text-[#a5e1f7] text-xs font-semibold backdrop-blur-sm mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#2596be]" />
              <span>Tailored Advisory</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-light text-white tracking-tight leading-snug mb-3">
              Have a specific project or capital structure question?
            </h3>
            <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
              Our team provides confidential, tailored assessments for property
              developers, business founders, and institutional co-investors.
            </p>
          </div>

          <div className="relative z-10 flex-shrink-0 w-full md:w-auto">
            <button
              id="faq-contact-consultation-btn"
              onClick={openContactModal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[#2596be] text-white text-sm font-semibold hover:bg-[#1d7b9c] transition-all shadow-lg hover:shadow-xl hover:shadow-[#2596be]/30 cursor-pointer"
            >
              <span>Schedule a Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
