import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import type { Language } from '../locales/translations';

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'he', label: 'עברית', flag: '🇮🇱' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
];

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find((l) => l.code === language);

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-medium border border-white/20 hover:border-white/40 backdrop-blur-md transition-all duration-200 group"
        title="Switch Language"
      >
        <span className="text-base">{currentLang?.flag}</span>
        <span className="hidden sm:inline">{currentLang?.label}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-3.5 h-3.5 text-white/60 group-hover:text-white" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-40 sm:w-48 rounded-2xl bg-gradient-to-br from-neutral-900 to-black border border-white/20 shadow-2xl shadow-black/50 overflow-hidden backdrop-blur-xl z-50"
          >
            <div className="p-2 space-y-1">
              {languages.map((lang) => (
                <motion.button
                  key={lang.code}
                  whileHover={{ x: 4 }}
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium ${
                    language === lang.code
                      ? 'bg-[#2596be] text-white shadow-lg shadow-[#2596be]/30'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <div className="flex-1 text-left">
                    <div className="font-semibold">{lang.label}</div>
                  </div>
                  {language === lang.code && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 rounded-full bg-white"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
