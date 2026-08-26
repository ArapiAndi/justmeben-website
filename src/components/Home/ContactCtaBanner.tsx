import React, { useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';

export const ContactCtaBanner: React.FC = () => {
  const { openContactModal } = useApp();
  const bannerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: bannerRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);

  return (
    <section
      id="contact-cta-section"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Premium Banner with Sophisticated Parallax */}
        <motion.div
          ref={bannerRef}
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden min-h-[480px] sm:min-h-[560px] flex items-center justify-center text-center shadow-2xl shadow-neutral-900/30 bg-gradient-to-br from-neutral-900 to-black group"
        >
          {/* Executive imagery with Enhanced Parallax */}
          <motion.img
            style={{ y: bgY }}
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=2000&q=85"
            alt="Executives overlooking city skyline from terrace"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-[130%] object-cover object-top filter brightness-[0.55] contrast-[1.2] group-hover:brightness-[0.65] transition-all duration-700"
          />

          {/* Multi-layer Atmospheric Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/50" />
          <motion.div
            animate={{ opacity: [0, 0.15, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-r from-[#2596be]/10 via-transparent to-transparent"
          />

          {/* Centered Premium Content */}
          <div className="relative z-10 max-w-3xl mx-auto px-8 py-16 flex flex-col items-center space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#2596be]/30 to-[#2596be]/15 backdrop-blur-xl border border-[#2596be]/50 text-xs font-semibold text-[#a5e1f7] uppercase tracking-wider shadow-lg shadow-[#2596be]/20"
            >
              <motion.div
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-4 h-4 text-[#2596be]" />
              </motion.div>
              <span>Expert Consulting & Capital Advisory</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="space-y-3"
            >
              <h2
                id="cta-banner-headline"
                className="text-5xl sm:text-6xl md:text-7xl font-normal text-white tracking-tight leading-[1.1]"
              >
                <span className="block">Ready to</span>
                <span className="block bg-gradient-to-r from-[#2596be] via-[#a5e1f7] to-[#2596be] bg-clip-text text-transparent">
                  Structure Capital?
                </span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-white/85 text-base sm:text-lg font-light max-w-2xl leading-relaxed"
            >
              Discuss your capital requirements or explore institutional private equity and mezzanine investment opportunities with our expert advisory team.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.08, y: -4, boxShadow: '0 24px 48px rgba(37, 150, 190, 0.4)' }}
              whileTap={{ scale: 0.94 }}
              id="cta-banner-btn"
              onClick={openContactModal}
              className="flex items-center gap-3 px-9 py-5 rounded-full bg-gradient-to-r from-[#2596be] to-[#1d7b9c] text-white font-semibold text-base sm:text-lg tracking-tight transition-all duration-300 shadow-2xl shadow-[#2596be]/40 cursor-pointer group hover:shadow-[#2596be]/60"
            >
              <span>Get in Touch</span>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
