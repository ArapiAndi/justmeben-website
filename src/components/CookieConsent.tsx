import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export const CookieConsent: React.FC = () => {
  const [show, setShow] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const cookieConsent = localStorage.getItem('justmeben-cookie-consent');
    if (!cookieConsent) {
      setShow(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const consentData = { essential: true, analytics: true, marketing: true, timestamp: new Date().toISOString() };
    localStorage.setItem('justmeben-cookie-consent', JSON.stringify(consentData));
    setShow(false);
  };

  const handleAcceptEssential = () => {
    const consentData = { essential: true, analytics: false, marketing: false, timestamp: new Date().toISOString() };
    localStorage.setItem('justmeben-cookie-consent', JSON.stringify(consentData));
    setShow(false);
  };

  const handleSavePreferences = () => {
    const consentData = { ...preferences, timestamp: new Date().toISOString() };
    localStorage.setItem('justmeben-cookie-consent', JSON.stringify(consentData));
    setShow(false);
    setShowSettings(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-0 left-0 right-0 z-40 p-4 sm:p-6"
        >
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl border border-neutral-200 p-6 sm:p-8">
            {!showSettings ? (
              <div className="space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="text-lg sm:text-xl font-semibold text-neutral-900">🍪 Cookies & Data Protection</h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      We use essential cookies for site functionality. Some external services (Vimeo, Google Fonts, Unsplash) may log your requests.
                      By continuing, you consent to our <a href="/privacy-policy" className="text-[#2596be] underline font-medium">Privacy Policy</a>.
                    </p>
                  </div>
                  <button onClick={() => setShow(false)} className="text-neutral-400 hover:text-neutral-600 flex-shrink-0">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAcceptAll}
                    className="flex-1 px-4 py-3 rounded-full bg-[#2596be] text-white font-semibold text-sm hover:bg-[#1d7b9c] transition-colors cursor-pointer"
                  >
                    Accept All Cookies
                  </button>
                  <button
                    onClick={() => setShowSettings(true)}
                    className="flex-1 px-4 py-3 rounded-full bg-neutral-100 text-neutral-900 font-semibold text-sm hover:bg-neutral-200 transition-colors cursor-pointer"
                  >
                    Manage Preferences
                  </button>
                  <button
                    onClick={handleAcceptEssential}
                    className="flex-1 px-4 py-3 rounded-full border border-neutral-300 text-neutral-900 font-semibold text-sm hover:bg-neutral-50 transition-colors cursor-pointer"
                  >
                    Essential Only
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-neutral-900">Cookie Preferences</h3>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200">
                    <div className="flex items-start gap-3">
                      <input type="checkbox" checked={true} disabled className="mt-1 w-4 h-4 cursor-not-allowed accent-[#2596be]" />
                      <div className="flex-1">
                        <p className="font-medium text-neutral-900 text-sm">Essential Cookies (Required)</p>
                        <p className="text-xs text-neutral-600 mt-1">
                          Necessary for site functionality, security, and session management. Cannot be disabled.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                        className="mt-1 w-4 h-4 accent-[#2596be] cursor-pointer"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-neutral-900 text-sm">Analytics Cookies</p>
                        <p className="text-xs text-neutral-600 mt-1">
                          Help us understand how you use our website to improve your experience.
                        </p>
                      </div>
                    </label>
                  </div>

                  <div className="p-4 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                        className="mt-1 w-4 h-4 accent-[#2596be] cursor-pointer"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-neutral-900 text-sm">Marketing Cookies</p>
                        <p className="text-xs text-neutral-600 mt-1">
                          Allow us to deliver personalized content and track campaign effectiveness.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowSettings(false)}
                    className="flex-1 px-4 py-3 rounded-full border border-neutral-300 text-neutral-900 font-semibold text-sm hover:bg-neutral-50 transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSavePreferences}
                    className="flex-1 px-4 py-3 rounded-full bg-[#2596be] text-white font-semibold text-sm hover:bg-[#1d7b9c] transition-colors cursor-pointer"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
