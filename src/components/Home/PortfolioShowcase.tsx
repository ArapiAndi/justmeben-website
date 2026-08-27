import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { PORTFOLIO_ITEMS } from '../../data/initialData';
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink, Sparkles } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';

export const PortfolioShowcase: React.FC = () => {
  const { setCurrentPage } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Staggered parallax for depth effect
  const subtleY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const cardScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 0.98]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 1, 1]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % PORTFOLIO_ITEMS.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + PORTFOLIO_ITEMS.length) % PORTFOLIO_ITEMS.length);
  };

  return (
    <section
      ref={containerRef}
      id="portfolio-section"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-white text-[#121316] overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section with Smooth Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ opacity: headerOpacity }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14"
        >
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2596be]/10 text-[#155e78] text-xs font-semibold tracking-wide mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#2596be]" />
              <span>Proven Deployment History</span>
            </div>
            <h2
              id="portfolio-headline"
              className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-neutral-900 leading-[1.15]"
            >
              Selected Advisory Cases & Project Documentation
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-between space-y-4">
            <p className="text-sm sm:text-base text-neutral-600 font-light lg:text-right max-w-md">
              From real estate advisory to structured capital consulting and financial analysis, we provide guidance across diverse asset classes and project types.
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              id="explore-cases-btn"
              onClick={() => {
                setCurrentPage('portfolio');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2596be] text-white text-xs sm:text-sm font-medium hover:bg-[#1d7b9c] transition-all cursor-pointer shadow-md hover:shadow-lg hover:shadow-[#2596be]/25"
            >
              <span>Explore All Opportunities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Carousel Showcase Grid with Parallax and Card Transitions */}
        <motion.div style={{ y: subtleY, scale: cardScale }} className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 items-stretch">
            {/* Card 1: Premium Light Text Card */}
            <motion.div
              key={`card-left-${currentIndex}`}
              initial={{ opacity: 0, y: 35, scale: 0.93 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -10, scale: 1.02, boxShadow: '0 32px 56px -16px rgba(37, 150, 190, 0.25)' }}
              className="rounded-3xl p-9 bg-gradient-to-br from-[#e8f5fa] to-white border border-[#2596be]/25 flex flex-col justify-between min-h-[400px] shadow-lg relative overflow-hidden transition-all duration-400 group will-change-transform"
            >
              {/* Animated background circles */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute -top-16 -right-16 w-56 h-56 rounded-full border border-[#2596be]/15 pointer-events-none"
              />
              <motion.div
                animate={{ scale: [1.05, 1, 1.05] }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute -top-8 -right-8 w-40 h-40 rounded-full border border-[#2596be]/20 pointer-events-none"
              />

              <div className="relative z-10 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="flex items-center gap-2.5 text-[#155e78] font-bold tracking-wider text-xs uppercase"
                >
                  <motion.div
                    className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#2596be] to-[#1d7b9c] text-white flex items-center justify-center text-[11px] font-black"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  >
                    ❖
                  </motion.div>
                  <span>{PORTFOLIO_ITEMS[currentIndex % PORTFOLIO_ITEMS.length].logoText}</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="space-y-3"
                >
                  <h3 className="text-2xl sm:text-3xl font-semibold text-neutral-900 leading-tight">
                    {PORTFOLIO_ITEMS[currentIndex % PORTFOLIO_ITEMS.length].name}
                  </h3>
                  <p className="text-sm text-neutral-700 font-light leading-relaxed">
                    {PORTFOLIO_ITEMS[currentIndex % PORTFOLIO_ITEMS.length].description}
                  </p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="pt-7 relative z-10 flex items-center justify-between border-t border-[#2596be]/30 text-xs text-neutral-700 group-hover:text-[#155e78]"
              >
                <span className="font-semibold">Sector: {PORTFOLIO_ITEMS[currentIndex % PORTFOLIO_ITEMS.length].sector}</span>
                <span className="font-bold text-neutral-900">{PORTFOLIO_ITEMS[currentIndex % PORTFOLIO_ITEMS.length].year}</span>
              </motion.div>
            </motion.div>

            {/* Card 2: Enhanced Photography Card */}
            <motion.div
              key={`card-mid-${currentIndex}`}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -10, scale: 1.02, boxShadow: '0 32px 64px -16px rgba(37, 150, 190, 0.2)' }}
              className="rounded-3xl overflow-hidden shadow-xl min-h-[400px] relative bg-neutral-900 group transition-all duration-400"
            >
              <motion.img
                src={PORTFOLIO_ITEMS[currentIndex % PORTFOLIO_ITEMS.length].image}
                alt={PORTFOLIO_ITEMS[currentIndex % PORTFOLIO_ITEMS.length].name}
                referrerPolicy="no-referrer"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.8 }}
                className="w-full h-full object-cover filter brightness-90"
              />
              <motion.div
                animate={{ opacity: [0.7, 0.85, 0.7] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent group-hover:from-black/90"
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute bottom-0 left-0 right-0 p-7 text-white backdrop-blur-sm bg-black/30"
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-[#2596be] to-[#1d7b9c] backdrop-blur-xl text-[11px] font-semibold border border-white/30 mb-3 shadow-lg shadow-[#2596be]/30 cursor-default"
                >
                  {PORTFOLIO_ITEMS[currentIndex % PORTFOLIO_ITEMS.length].investmentType}
                </motion.span>
                <p className="text-sm text-white/95 font-light">
                  {PORTFOLIO_ITEMS[currentIndex % PORTFOLIO_ITEMS.length].hq}
                </p>
              </motion.div>
            </motion.div>

            {/* Card 3: Premium Dark Card */}
            <motion.div
              key={`card-right-${currentIndex}`}
              initial={{ opacity: 0, y: 35, scale: 0.93 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -10, scale: 1.02, boxShadow: '0 32px 56px -16px rgba(37, 150, 190, 0.3)' }}
              className="rounded-3xl p-9 bg-gradient-to-br from-[#0f2635] to-[#122e3b] text-white flex flex-col justify-between min-h-[400px] shadow-xl relative overflow-hidden border border-[#2596be]/35 transition-all duration-400 group"
            >
              {/* Animated accent circles */}
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 9, repeat: Infinity }}
                className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full border border-[#2596be]/15 pointer-events-none"
              />

              <div className="relative z-10 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  className="flex items-center gap-2.5 text-[#a5e1f7] font-bold tracking-wider text-xs uppercase"
                >
                  <span>{PORTFOLIO_ITEMS[(currentIndex + 1) % PORTFOLIO_ITEMS.length].logoText}</span>
                  <motion.span
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-[#2596be]"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="space-y-3"
                >
                  <h3 className="text-2xl sm:text-3xl font-semibold text-white leading-tight">
                    {PORTFOLIO_ITEMS[(currentIndex + 1) % PORTFOLIO_ITEMS.length].name}
                  </h3>
                  <p className="text-sm text-white/85 font-light leading-relaxed">
                    {PORTFOLIO_ITEMS[(currentIndex + 1) % PORTFOLIO_ITEMS.length].description}
                  </p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="pt-7 relative z-10 flex items-center justify-between border-t border-white/20 text-xs text-white/80 group-hover:text-[#a5e1f7]"
              >
                <span className="font-semibold">Sector: {PORTFOLIO_ITEMS[(currentIndex + 1) % PORTFOLIO_ITEMS.length].sector}</span>
                <span className="font-bold text-white">{PORTFOLIO_ITEMS[(currentIndex + 1) % PORTFOLIO_ITEMS.length].year}</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Enhanced Carousel Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-14 flex items-center justify-between"
          >
            {/* Progress line indicator with animated gradient */}
            <div className="flex-1 max-w-xs h-1 bg-neutral-200 rounded-full overflow-hidden mr-6 group">
              <motion.div
                className="h-full bg-gradient-to-r from-[#2596be] via-[#63cbf0] to-[#2596be] shadow-lg shadow-[#2596be]/30"
                animate={{
                  width: `${((currentIndex + 1) / PORTFOLIO_ITEMS.length) * 100}%`,
                }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>

            {/* Enhanced Circular Arrow Buttons */}
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.92 }}
                id="portfolio-prev-btn"
                onClick={prevSlide}
                aria-label="Previous portfolio company"
                className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2596be] to-[#1d7b9c] hover:to-[#155e78] text-white flex items-center justify-center transition-all cursor-pointer shadow-lg shadow-[#2596be]/30 hover:shadow-xl hover:shadow-[#2596be]/50 group"
              >
                <motion.div
                  animate={{ x: [-2, 0, -2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.div>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.92 }}
                id="portfolio-next-btn"
                onClick={nextSlide}
                aria-label="Next portfolio company"
                className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2596be] to-[#1d7b9c] hover:to-[#155e78] text-white flex items-center justify-center transition-all cursor-pointer shadow-lg shadow-[#2596be]/30 hover:shadow-xl hover:shadow-[#2596be]/50 group"
              >
                <motion.div
                  animate={{ x: [2, 0, 2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.div>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
