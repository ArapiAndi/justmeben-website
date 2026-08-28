import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, useScroll, useSpring } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export const ScrollProgress: React.FC = () => {
  const { t } = useLanguage();
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setShowBackToTop(latest > 350);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollPercentage(Math.min(100, Math.round((latest / totalHeight) * 100)));
      }
    });
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* Top Fixed Scroll Indicator Bar with Brand Glow */}
      <motion.div
        id="scroll-progress-bar"
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#2596be] via-[#63cbf0] to-[#2596be] origin-left z-[100] shadow-[0_0_12px_rgba(37,150,190,0.8)]"
        style={{ scaleX }}
      />

      {/* Floating Circular Back-to-Top Button with Scroll Progress Ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{
          opacity: showBackToTop ? 1 : 0,
          scale: showBackToTop ? 1 : 0.8,
          y: showBackToTop ? 0 : 20,
        }}
        transition={{ duration: 0.25 }}
        className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 ${
          showBackToTop ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <button
          id="back-to-top-btn"
          onClick={scrollToTop}
          aria-label={t('scrollProgress.backToTop')}
          className="relative group p-3.5 rounded-full bg-neutral-900/90 text-white backdrop-blur-xl border border-[#2596be]/30 shadow-2xl hover:border-[#2596be] hover:shadow-[0_0_20px_rgba(37,150,190,0.4)] transition-all duration-300 flex items-center justify-center cursor-pointer hover:scale-110"
        >
          {/* SVG Progress Circle */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 p-0.5" viewBox="0 0 44 44">
            <circle
              cx="22"
              cy="22"
              r="18"
              fill="none"
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="2.5"
            />
            <circle
              cx="22"
              cy="22"
              r="18"
              fill="none"
              stroke="#2596be"
              strokeWidth="2.5"
              strokeDasharray={113.1}
              strokeDashoffset={113.1 - (113.1 * scrollPercentage) / 100}
              strokeLinecap="round"
              className="transition-all duration-150"
            />
          </svg>

          <ArrowUp className="w-4 h-4 text-white group-hover:-translate-y-0.5 transition-transform duration-200" />
        </button>
      </motion.div>
    </>
  );
};
