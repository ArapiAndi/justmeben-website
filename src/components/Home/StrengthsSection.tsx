import React, { useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { motion, useScroll, useTransform } from 'motion/react';
import { ShieldCheck, Compass, Zap, CheckCircle2 } from 'lucide-react';

export const StrengthsSection: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Enhanced parallax with opacity fade-in for progressive reveal
  const bgParallax = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.25, 1], [0.7, 0.9, 1]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]);

  const strength1Highlights = t('strengths.strength1Highlights');
  const strength2Highlights = t('strengths.strength2Highlights');
  const strength3Highlights = t('strengths.strength3Highlights');

  const strengths = [
    {
      id: 'strength-1',
      title: t('strengths.strength1'),
      description: t('strengths.strength1Desc'),
      highlights: Array.isArray(strength1Highlights) ? strength1Highlights : [],
      icon: Compass,
    },
    {
      id: 'strength-2',
      title: t('strengths.strength2'),
      description: t('strengths.strength2Desc'),
      highlights: Array.isArray(strength2Highlights) ? strength2Highlights : [],
      icon: ShieldCheck,
    },
    {
      id: 'strength-3',
      title: t('strengths.strength3'),
      description: t('strengths.strength3Desc'),
      highlights: Array.isArray(strength3Highlights) ? strength3Highlights : [],
      icon: Zap,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="strengths-section"
      className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-12 overflow-hidden text-white bg-[#10242e]"
    >
      {/* 3D Silky Wave Oceanic / Slate Atmospheric Background with Scroll Parallax */}
      <motion.div style={{ y: bgParallax, opacity: bgOpacity }} className="absolute inset-0 z-0 scale-110">
        <img
          src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=2000&q=80"
          alt="Silky Blue Wave Landscape"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover filter brightness-[0.60] contrast-[1.2]"
        />
        {/* Soft #2596be Oceanic Gradient overlay */}
        <motion.div
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 bg-gradient-to-b from-[#0b1c24]/90 via-[#133c4c]/85 to-[#0b1920]/95"
        />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-[#2596be]/20 border border-[#2596be]/40 backdrop-blur-md shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-[#2596be] animate-ping" />
          <span className="text-xs uppercase tracking-[0.25em] text-[#a5e1f7] font-semibold">
            {t('strengths.badge')}
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          id="strengths-headline"
          className="text-3xl sm:text-4xl md:text-5xl font-normal text-center text-white tracking-tight mb-16 max-w-2xl leading-[1.18]"
        >
          {t('strengths.headline')}
        </motion.h2>

        {/* Enhanced Premium Cards with Coordinated Animations */}
        <motion.div style={{ opacity: contentOpacity }} className="grid grid-cols-1 md:grid-cols-3 gap-7 w-full">
          {strengths.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                id={`strength-card-${index + 1}`}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: index * 0.18, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -12, scale: 1.03, boxShadow: '0 32px 64px -16px rgba(37, 150, 190, 0.3)' }}
                className="rounded-3xl p-9 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-2xl border border-[#2596be]/40 shadow-2xl shadow-[#2596be]/10 flex flex-col justify-between hover:from-white/20 hover:to-white/10 hover:border-[#2596be]/70 transition-all duration-400 group relative overflow-hidden"
              >
                {/* Animated gradient bg */}
                <motion.div
                  animate={{ opacity: [0, 0.1, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-br from-[#2596be]/10 to-transparent pointer-events-none"
                />

                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.18 + 0.1 }}
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2596be]/40 to-[#2596be]/20 border border-[#2596be]/60 flex items-center justify-center mb-7 text-[#a5e1f7] shadow-lg shadow-[#2596be]/20 group-hover:from-[#2596be]/70 group-hover:to-[#2596be]/50 group-hover:text-white transition-all duration-300"
                  >
                    <Icon className="w-8 h-8" />
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.18 + 0.15 }}
                    className="text-2xl font-semibold text-white leading-tight tracking-tight mb-4"
                  >
                    {item.title}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.18 + 0.2 }}
                    className="text-sm text-white/85 font-light leading-relaxed mb-7"
                  >
                    {item.description}
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.18 + 0.25 }}
                  className="relative z-10 pt-6 border-t border-white/20 space-y-3"
                >
                  {item.highlights.map((hl, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.18 + 0.3 + i * 0.08 }}
                      className="flex items-start gap-3 text-xs text-white/90 font-light group-hover:text-white transition-colors"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#a5e1f7] flex-shrink-0 mt-0.5" />
                      </motion.div>
                      <span>{hl}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
