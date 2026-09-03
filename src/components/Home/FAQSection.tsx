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
import { useLanguage } from '../../context/LanguageContext';

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
  const { t } = useLanguage();
  const tArr = (key: string): string[] => { const v = t(key) as unknown; return Array.isArray(v) ? (v as string[]) : []; };
  const tOpt = (key: string): string | undefined => { const v = t(key); return v === key ? undefined : v; };
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>('faq-1');

  const faqCategories: Record<number, FAQItem['category']> = { 1: 'crowdfunding', 2: 'mezzanine', 3: 'mezzanine', 4: 'crowdfunding', 5: 'real-estate', 6: 'real-estate', 7: 'advisory', 8: 'advisory' };
  const faqData: FAQItem[] = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
    id: `faq-${n}`,
    category: faqCategories[n],
    categoryLabel: t(`faqSection.faq${n}Category`),
    badge: tOpt(`faqSection.faq${n}Badge`),
    question: t(`faqSection.faq${n}Question`),
    answer: t(`faqSection.faq${n}Answer`),
    keyPoints: tArr(`faqSection.faq${n}KeyPoints`),
  }));

  const categories = [
    { id: 'all', label: t('faqSection.allQuestions'), icon: HelpCircle },
    { id: 'crowdfunding', label: t('faqSection.tabCrowdfunding'), icon: Coins },
    { id: 'mezzanine', label: t('faqSection.tabMezzanine'), icon: Layers },
    { id: 'real-estate', label: t('faqSection.tabRealEstate'), icon: Building2 },
    { id: 'advisory', label: t('faqSection.tabAdvisory'), icon: Briefcase },
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
  }, [activeCategory, searchQuery, faqData]);

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
            <span>{t('faqSection.badge')}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            id="faq-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-neutral-900 leading-[1.18] mb-6"
          >
            {t('faqSection.headline')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed"
          >
            {t('faqSection.description')}
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
              placeholder={t('faqSection.searchPlaceholder')}
              className="w-full pl-10 pr-4 py-2.5 rounded-full text-xs sm:text-sm bg-neutral-50 border border-neutral-200 text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#2596be]/20 focus:border-[#2596be] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-600"
              >
                {t('faqSection.clearButton')}
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
                                {t('faqSection.keyTakeaways')}
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
              {t('faqSection.noResults')}
            </h4>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-sm mx-auto mb-5">
              {t('faqSection.noResultsDesc')}
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-full bg-[#2596be] text-white text-xs font-medium hover:bg-[#1d7b9c]"
            >
              {t('faqSection.resetButton')}
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
              <span>{t('faqSection.ctaBadge')}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-light text-white tracking-tight leading-snug mb-3">
              {t('faqSection.ctaHeading')}
            </h3>
            <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
              {t('faqSection.ctaDesc')}
            </p>
          </div>

          <div className="relative z-10 flex-shrink-0 w-full md:w-auto">
            <button
              id="faq-contact-consultation-btn"
              onClick={openContactModal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[#2596be] text-white text-sm font-semibold hover:bg-[#1d7b9c] transition-all shadow-lg hover:shadow-xl hover:shadow-[#2596be]/30 cursor-pointer"
            >
              <span>{t('faqSection.ctaButton')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
