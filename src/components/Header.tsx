import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ArrowRight, Menu, X, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Header: React.FC = () => {
  const { currentPage, setCurrentPage, openContactModal } = useApp();
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', labelKey: 'nav.home' },
    { id: 'about', labelKey: 'nav.about' },
    { id: 'criteria', labelKey: 'nav.criteria' },
    { id: 'portfolio', labelKey: 'nav.portfolio' },
    { id: 'blog', labelKey: 'nav.blog' },
  ];

  const handleNavClick = (pageId: string) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-black/60 backdrop-blur-xl border-b border-white/10 shadow-lg'
          : 'py-5 bg-gradient-to-b from-black/50 via-black/20 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo - Just Me Ben LTD */}
        <button
          id="brand-logo-btn"
          onClick={() => handleNavClick('home')}
          className="group flex items-center text-left focus:outline-none transition-transform hover:scale-[1.03] cursor-pointer"
        >
          <img
            src="https://club.justmebenltd.uk/images/logo.png"
            alt="JUSTMEBEN LTD"
            className="h-10 sm:h-12 w-auto max-h-12 object-contain drop-shadow"
          />
        </button>

        {/* Center Pill Navigation */}
        <nav
          id="desktop-navigation"
          aria-label="Main Navigation"
          className="hidden md:flex items-center p-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 shadow-inner"
        >
          {navItems.map((item) => {
            const isActive = currentPage === item.id || (item.id === 'blog' && currentPage === 'blog-detail');
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-4 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? 'text-white bg-[#2596be] shadow-md font-semibold'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {t(item.labelKey)}
              </button>
            );
          })}
        </nav>

        {/* Right CTA & Sign In Buttons */}
        <div className="hidden md:flex items-center gap-2">
          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Sign In link */}
          <a
            href="https://club.justmebenltd.uk/"
            id="header-sign-in-btn"
            target="_blank"
            rel="noopener noreferrer"
            title="Sign In - JustMeBen Club"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-white/90 bg-[#2596be]/15 hover:bg-[#2596be]/30 border border-[#2596be]/40 backdrop-blur-md transition-all duration-200 hover:text-white hover:border-[#2596be]"
          >
            <LogIn className="w-3.5 h-3.5 text-[#2596be]" />
            <span>{t('nav.signIn')}</span>
          </a>

          {/* Primary CTA */}
          <button
            id="header-contact-btn"
            onClick={openContactModal}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-neutral-900 text-xs sm:text-sm font-semibold tracking-tight shadow-md hover:bg-[#2596be] hover:text-white hover:shadow-lg hover:shadow-[#2596be]/20 transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <span>{t('nav.getInTouch')}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href="https://club.justmebenltd.uk/"
            id="mobile-header-sign-in-btn"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/15 text-white text-xs font-medium border border-white/20"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </a>
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full bg-white/15 text-white border border-white/20 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-neutral-950/95 backdrop-blur-2xl border-b border-white/15 px-6 py-5 text-white shadow-2xl"
          >
            <div className="flex flex-col gap-3">
              {navItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-left px-4 py-2.5 rounded-xl text-base font-medium transition-colors ${
                      isActive ? 'bg-white text-black font-semibold' : 'text-white/80 hover:bg-white/10'
                    }`}
                  >
                    {t(item.labelKey)}
                  </button>
                );
              })}
              <div className="pt-3 border-t border-white/15 flex flex-col gap-2">
                <a
                  id="mobile-nav-signin"
                  href="https://club.justmebenltd.uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <LogIn className="w-4 h-4 text-white/80" />
                    <span>Sign In</span>
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <button
                  id="mobile-nav-contact"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openContactModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-white text-black font-semibold text-sm shadow-md"
                >
                  <span>Get in Touch</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
