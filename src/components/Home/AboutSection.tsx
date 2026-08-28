import React, { useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, TrendingUp, Award, Building } from 'lucide-react';
import { useParallax } from '../../hooks/useParallax';

export const AboutSection: React.FC = () => {
  const { setCurrentPage } = useApp();
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Enhanced parallax with scale effect for floating elements
  const cardParallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const cardParallaxScale = useTransform(scrollYProgress, [0, 1], [0.95, 1.05]);
  const floatingCardY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const statsOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]);

  const stats = [
    {
      value: t('about.stat1Value'),
      label: t('about.stat1Label'),
      icon: TrendingUp,
      desc: t('about.stat1Desc')
    },
    {
      value: t('about.stat2Value'),
      label: t('about.stat2Label'),
      icon: Building,
      desc: t('about.stat2Desc')
    },
    {
      value: t('about.stat3Value'),
      label: t('about.stat3Label'),
      icon: Award,
      desc: t('about.stat3Desc')
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="about-section"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#FAF9F6] text-[#121316] overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Boardroom Image with Floating Frosted Fund Card & Scroll Parallax */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            <motion.div
              style={{ y: cardParallaxY, scale: cardParallaxScale }}
              className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] sm:aspect-[16/11] bg-neutral-900 group"
            >
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
                alt="Executive Boardroom Sunrise Window View"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-[0.92] contrast-[1.05] group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

              {/* Floating Frosted Glass Fund Stats Card with Independent Scroll Float */}
              <motion.div
                style={{ y: floatingCardY }}
                id="funds-overlay-card"
                className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-md p-5 rounded-2xl bg-black/60 backdrop-blur-sm border border-[#2596be]/30 text-white shadow-xl transition-colors"
              >
                <p className="text-xs uppercase tracking-wider text-[#a5e1f7] font-semibold mb-2 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#2596be] animate-ping" />
                  {t('about.deploymentLabel')}
                </p>
                <div className="flex items-center gap-6">
                  <div>
                    <div className="text-2xl font-light tracking-tight text-white">£45M+</div>
                    <div className="text-[11px] text-white/70 mt-0.5">{t('about.realEstateLabel')}</div>
                  </div>
                  <div className="w-[1px] h-8 bg-[#2596be]/40" />
                  <div>
                    <div className="text-2xl font-light tracking-tight text-white">£75M+</div>
                    <div className="text-[11px] text-white/70 mt-0.5">{t('about.peLabel')}</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column: Narrative & Philosophy */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6 flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2596be]/8 border border-[#2596be]/20 text-[#155e78] text-xs font-semibold tracking-wide w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2596be]" />
              <span>{t('about.badge')}</span>
            </div>

            <h2
              id="about-headline"
              className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-neutral-900 leading-[1.18]"
            >
              Strategic Planning & Financial Excellence
            </h2>

            <p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed">
              {t('about.sectionDesc')}
            </p>

            <div className="pt-2">
              <motion.button
                whileHover={{ x: 4 }}
                id="more-on-approach-btn"
                onClick={() => {
                  setCurrentPage('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-[#2596be] border-b-2 border-[#2596be]/40 pb-0.5 hover:text-[#175d77] hover:border-[#175d77] transition-all group cursor-pointer"
              >
                <span>More on Our Advisory Approach</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* 3 Prominent Stat Counters with Enhanced Animation & Depth */}
        <motion.div
          style={{ opacity: statsOpacity }}
          className="mt-20 sm:mt-24 pt-12 border-t border-neutral-200/80 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6"
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: 0.15 * idx }}
                className="p-8 rounded-2xl bg-white border border-neutral-200/60 shadow-sm hover:shadow-md hover:border-neutral-300 transition-all duration-300 group"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.25 + 0.2 * idx }}
                  className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2596be]/20 to-[#2596be]/10 text-[#2596be] flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-[#2596be]/20 transition-all"
                >
                  <Icon className="w-6 h-6" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 + 0.2 * idx }}
                  className="text-5xl sm:text-6xl font-light text-neutral-900 tracking-tight"
                >
                  {stat.value}
                </motion.div>
                <p className="text-sm text-neutral-700 font-semibold tracking-wide mt-2">
                  {stat.label}
                </p>
                <p className="text-xs text-neutral-500 font-light mt-1 leading-relaxed">
                  {stat.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
