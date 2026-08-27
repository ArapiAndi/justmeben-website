import React, { useRef, useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';

export const HeroSection: React.FC = () => {
  const { setCurrentPage, openContactModal } = useApp();
  const { t } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isVideoActive, setIsVideoActive] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Enhanced parallax with scale effect for depth
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.1]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.6, 0.8]);

  useEffect(() => {
    // Show high quality poster image first, then transition into video playback
    const timer = setTimeout(() => {
      setIsVideoActive(true);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  const scrollToNext = () => {
    const aboutElem = document.getElementById('about-section');
    if (aboutElem) {
      aboutElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero-section"
      className="relative min-h-screen flex items-center justify-between overflow-hidden pt-24 pb-16 px-4 sm:px-6 lg:px-12 bg-neutral-950 text-white"
    >
      {/* Background Layer with Enhanced Cinematic Depth */}
      <motion.div
        style={{ y: backgroundY, scale: backgroundScale }}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
      >
        <img
          src="https://i.vimeocdn.com/video/1803414809-dbb4e9edbd32c7e984e6de59d8910007b1b67b889b4bb059177a6627c0bad3be-d_1920x1080?r=pad"
          alt="JUSTMEBEN LTD Hero Background"
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.60] contrast-[1.15]"
        />

        <div
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            isVideoActive ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {isVideoActive && (
            <iframe
              ref={iframeRef}
              src="https://player.vimeo.com/video/916019702?h=eb1eb8f345&background=1&autoplay=1&loop=1&byline=0&title=0&muted=1&controls=0&autopause=0"
              className="absolute top-1/2 left-1/2 w-[180vh] min-w-full min-h-full h-[56.25vw] -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none filter brightness-[0.60] contrast-[1.15] scale-[1.05]"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="JUSTMEBEN LTD Background Asset"
            />
          )}
        </div>

        {/* Enhanced Multi-layered Overlays with Dynamic Opacity */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-neutral-950/40 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/95 via-neutral-950/50 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/30 to-black/70 pointer-events-none" />
        {/* Teal Ambient Glow */}
        <div className="absolute inset-0 bg-radial from-[#2596be]/10 via-transparent to-transparent opacity-40 pointer-events-none" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-end pt-12"
      >
        {/* Left Column: Enhanced Headline & CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-8 flex flex-col justify-center space-y-8"
        >
          {/* Badge - Minimal Animation */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#2596be]/12 border border-[#2596be]/30 text-xs text-[#155e78] font-semibold tracking-wide w-fit transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-[#2596be]" />
            <span>{t('hero.badge')}</span>
          </motion.div>

          {/* Main Headline with Letter Stagger Effect */}
          <motion.div className="space-y-2">
            <h1
              id="hero-headline"
              className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-normal tracking-tight leading-[1.05] text-white max-w-3xl"
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="block"
              >
                {t('hero.headline1')}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="block bg-gradient-to-r from-[#2596be] to-[#a5e1f7] bg-clip-text text-transparent"
              >
                {t('hero.headline2')}
              </motion.span>
            </h1>
          </motion.div>

          {/* Subtitle with Smooth Reveal */}
          <motion.p
            id="hero-subtext"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-base sm:text-lg md:text-xl text-white/90 font-light leading-relaxed max-w-2xl"
          >
            {t('hero.subheading')}
          </motion.p>

          {/* Enhanced CTAs with Stagger */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-start gap-4 pt-4"
          >
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              id="hero-get-in-touch-btn"
              onClick={openContactModal}
              className="flex items-center gap-2.5 px-7 py-4 rounded-full bg-[#2596be] text-white font-semibold text-base tracking-tight hover:bg-[#1d7b9c] transition-all duration-200 cursor-pointer shadow-lg group"
            >
              <span>{t('hero.ctaPrimary')}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.button>

            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              id="hero-portfolio-btn"
              onClick={() => {
                setCurrentPage('portfolio');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-7 py-4 rounded-full bg-white/8 hover:bg-white/12 text-white font-medium text-base border border-white/25 transition-all duration-200 cursor-pointer"
            >
              <span>{t('hero.ctaSecondary')}</span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Column: Premium Stat Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-4 flex flex-col items-start lg:items-end justify-end space-y-8"
        >
          <motion.div
            whileHover={{ y: -8, boxShadow: '0 30px 60px -15px rgba(37, 150, 190, 0.4)' }}
            id="hero-stat-card"
            className="w-full sm:w-auto min-w-[260px] p-8 rounded-3xl bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-2xl border border-[#2596be]/50 shadow-2xl shadow-[#2596be]/20 transition-all duration-400 hover:border-[#2596be]"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-5xl font-normal text-[#a5e1f7] tracking-tight"
            >
              £120M+
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-sm text-white/80 font-light mt-2 tracking-wide"
            >
              Transactions & Advisory Structured
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Enhanced Scroll CTA */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 right-8 sm:right-16 z-20 hidden sm:flex items-center gap-3 px-5 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 hover:text-white hover:border-[#2596be]/60 text-xs font-light tracking-wider transition-all cursor-pointer group"
        onClick={scrollToNext}
      >
        <span>Explore</span>
        <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowDown className="w-4 h-4 text-[#2596be]" />
        </motion.div>
      </motion.div>
    </section>
  );
};
