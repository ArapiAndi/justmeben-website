import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { X, Send, CheckCircle2, Building, Mail, MapPin, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

export const ContactModal: React.FC = () => {
  const { isContactModalOpen, closeContactModal } = useApp();
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [gdprConsent, setGdprConsent] = useState(false);

  const roleOptions = t('contactForm.roleOptions');
  const dealSizeOptions = t('contactForm.dealSizeOptions');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: typeof roleOptions === 'object' && Array.isArray(roleOptions) ? roleOptions[0] : 'Property Developer / Real Estate Sponsor',
    companyName: '',
    ebitdaRange: typeof dealSizeOptions === 'object' && Array.isArray(dealSizeOptions) ? dealSizeOptions[0] : '£1M - £5M (Senior / Mezzanine Gap)',
    sector: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gdprConsent) {
      alert('Please agree to our Privacy Policy and GDPR terms to proceed.');
      return;
    }
    setSubmitted(true);
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {}
    setTimeout(() => {
      // Keep open with success screen, user can close
    }, 500);
  };

  const handleReset = () => {
    setSubmitted(false);
    setGdprConsent(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: typeof roleOptions === 'object' && Array.isArray(roleOptions) ? roleOptions[0] : 'Property Developer / Real Estate Sponsor',
      companyName: '',
      ebitdaRange: typeof dealSizeOptions === 'object' && Array.isArray(dealSizeOptions) ? dealSizeOptions[0] : '£1M - £5M (Senior / Mezzanine Gap)',
      sector: '',
      message: '',
    });
    closeContactModal();
  };

  if (!isContactModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeContactModal}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-neutral-950 text-white rounded-3xl p-6 sm:p-10 border border-neutral-800 shadow-2xl z-10 my-8 overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={closeContactModal}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <img
                    src="https://club.justmebenltd.uk/images/logo.png"
                    alt="JUSTMEBEN LTD"
                    className="h-7 w-auto object-contain"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                  <span className="text-xs uppercase tracking-widest text-[#2596be] font-semibold">
                    {t('contactForm.eyebrow')}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-normal text-white mt-1">
                  {t('contactForm.formTitle')}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-light mt-1.5">
                  {t('contactForm.formDesc')}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      {t('contactForm.formNameLabel')}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Marco Brioschi"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:outline-none focus:border-[#2596be] focus:ring-1 focus:ring-[#2596be] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      {t('contactForm.formEmailLabel')}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:outline-none focus:border-[#2596be] focus:ring-1 focus:ring-[#2596be] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      {t('contactForm.formRoleLabel')}
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:outline-none focus:border-[#2596be] focus:ring-1 focus:ring-[#2596be]"
                    >
                      {Array.isArray(roleOptions) && roleOptions.map((option, idx) => (
                        <option key={idx}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      {t('contactForm.formDealSizeLabel')}
                    </label>
                    <select
                      value={formData.ebitdaRange}
                      onChange={(e) => setFormData({ ...formData, ebitdaRange: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:outline-none focus:border-[#2596be] focus:ring-1 focus:ring-[#2596be]"
                    >
                      {Array.isArray(dealSizeOptions) && dealSizeOptions.map((option, idx) => (
                        <option key={idx}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    {t('contactForm.formSectorLabel')}
                  </label>
                  <input
                    type="text"
                    value={formData.sector}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    placeholder="e.g. Residential Build-to-Sell, Commercial Logistics, Fintech, Proptech..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:outline-none focus:border-[#2596be] focus:ring-1 focus:ring-[#2596be]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    {t('contactForm.formMessageLabel')}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide a concise summary of the asset, current GDV/LTV, capital stack requirements, or advisory objectives..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:outline-none focus:border-[#2596be] focus:ring-1 focus:ring-[#2596be] resize-none"
                  />
                </div>

                <div className="pt-4 border-t border-neutral-700 space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={gdprConsent}
                      onChange={(e) => setGdprConsent(e.target.checked)}
                      className="mt-1 w-4 h-4 accent-[#2596be] cursor-pointer"
                      required
                    />
                    <span className="text-xs text-neutral-300">
                      {t('contactForm.gdprConsent')}
                    </span>
                  </label>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs text-neutral-400">
                      <MapPin className="w-3.5 h-3.5 text-[#2596be] shrink-0" />
                      <span>590 Kingston Road, SW20 8DN, London • info@justmebenltd.uk</span>
                    </div>

                    <button
                      type="submit"
                      disabled={!gdprConsent}
                      className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#2596be] text-white font-semibold text-sm hover:bg-[#1d7b9c] transition-all shadow-lg hover:shadow-[#2596be]/30 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>{t('contactForm.submitBtn')}</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <div className="py-10 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#2596be]/20 text-[#2596be] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-normal text-white">
                {t('contactForm.successTitle')}
              </h3>
              <p className="text-sm text-neutral-300 max-w-md mx-auto font-light leading-relaxed">
                {t('contactForm.successMessage', { name: formData.name, sector: formData.sector, email: formData.email })}
              </p>
              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full bg-[#2596be] text-white text-sm font-semibold hover:bg-[#1d7b9c] transition-colors"
                >
                  {t('contactForm.closeBtn')}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
