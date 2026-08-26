import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PORTFOLIO_ITEMS } from '../data/initialData';
import { PortfolioItem } from '../types';
import { ArrowRight, Building2, MapPin, Users, DollarSign, TrendingUp, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const PortfolioPage: React.FC = () => {
  const { openContactModal } = useApp();
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [activeModalItem, setActiveModalItem] = useState<PortfolioItem | null>(null);

  const sectors = ['all', 'Real Estate Development', 'Alternative Debt & Mezzanine', 'FinTech & Crowdfunding', 'Private Equity & Ventures'];

  const filteredItems = selectedSector === 'all'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.sector === selectedSector);

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
            Advisory Track Record & Case Mandates
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal text-neutral-900 tracking-tight leading-[1.12]">
            Representative Transactions & Capital Structures
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed pt-2">
            Selected advisory mandates across residential property development, subordinated mezzanine debt, equity crowdfunding syndication, and private equity vehicles.
          </p>
        </motion.div>

        {/* Sector Filter Tabs */}
        <div className="flex flex-wrap gap-2 pt-8">
          {sectors.map((sec) => (
            <button
              key={sec}
              onClick={() => setSelectedSector(sec)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                selectedSector === sec
                  ? 'bg-neutral-900 text-white shadow-sm'
                  : 'bg-white text-neutral-600 border border-neutral-200/80 hover:bg-neutral-100'
              }`}
            >
              {sec === 'all' ? 'All Sectors' : sec}
            </button>
          ))}
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: (idx % 2) * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, boxShadow: '0 20px 35px -10px rgba(0,0,0,0.08)' }}
              className="bg-white rounded-3xl overflow-hidden border border-neutral-200/80 shadow-xs hover:border-[#2596be]/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Visual Header & Badge */}
                <div className="relative aspect-[16/9] overflow-hidden bg-neutral-900">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-medium border border-white/20">
                      {item.sector}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-medium">
                      {item.year}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-6 right-6 text-white">
                    <span className="text-xs uppercase tracking-widest text-neutral-300 font-semibold block">
                      {item.logoText}
                    </span>
                    <h3 className="text-2xl font-light tracking-tight">{item.name}</h3>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 sm:p-8 space-y-6">
                  <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                    {item.description}
                  </p>

                  {/* Metadata Chips */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-neutral-600 pt-2 border-t border-neutral-100">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      <span className="truncate">{item.hq}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      <span>{item.revenueRange}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      <span>{item.employees}</span>
                    </div>
                  </div>

                  {/* Metrics Box */}
                  <div className="grid grid-cols-3 gap-2 p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100 text-center">
                    {item.metrics.map((m, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <div className="text-sm font-semibold text-neutral-900">{m.value}</div>
                        <div className="text-[10px] text-neutral-500 font-light leading-tight">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="px-6 sm:px-8 pb-6 pt-2 flex items-center justify-between border-t border-neutral-100">
                <span className="text-xs text-neutral-400 font-light">{item.investmentType}</span>
                <button
                  onClick={() => setActiveModalItem(item)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 hover:text-neutral-600 transition-colors cursor-pointer"
                >
                  <span>Case Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Details Modal */}
      <AnimatePresence>
        {activeModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalItem(null)}
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-white text-neutral-900 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 my-8 overflow-hidden border border-neutral-200"
            >
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
                    {activeModalItem.sector} • {activeModalItem.investmentType}
                  </span>
                  <h3 className="text-3xl font-light text-neutral-900 mt-1">
                    {activeModalItem.name}
                  </h3>
                  <p className="text-xs text-neutral-500 font-medium">{activeModalItem.tagline}</p>
                </div>

                <div className="aspect-[16/8] rounded-2xl overflow-hidden bg-neutral-900">
                  <img
                    src={activeModalItem.image}
                    alt={activeModalItem.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-neutral-700 font-light leading-relaxed">
                  <p>{activeModalItem.description}</p>
                  <p>
                    <strong>Advisory & Value Creation Structure:</strong> Structuring subordinated mezzanine facilities, executing FCA/ECSPR compliant campaign documentation, and coordinating cornerstone investors for syndicated co-investment.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-neutral-50 border border-neutral-100 text-center">
                  {activeModalItem.metrics.map((m, idx) => (
                    <div key={idx}>
                      <div className="text-base font-semibold text-neutral-900">{m.value}</div>
                      <div className="text-[11px] text-neutral-500">{m.label}</div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    onClick={() => {
                      setActiveModalItem(null);
                      openContactModal();
                    }}
                    className="px-5 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors"
                  >
                    Inquire About Similar Advisory Mandate
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
