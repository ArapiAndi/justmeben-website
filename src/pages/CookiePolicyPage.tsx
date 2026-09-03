import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const CookiePolicyPage: React.FC = () => {
  const { t } = useLanguage();
  const tArr = (key: string): string[] => { const v = t(key) as unknown; return Array.isArray(v) ? (v as string[]) : []; };

  return (
    <div className="pt-28 pb-20 bg-[#FAF9F6] text-[#121316] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900">{t('cookiePolicy.title')}</h1>
            <p className="text-lg text-neutral-600 font-light">
              {t('cookiePolicy.effectiveDate')}
            </p>
          </div>

          <div className="prose prose-lg max-w-none text-neutral-700 space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">{t('cookiePolicy.section1Title')}</h2>
              <p>
                {t('cookiePolicy.section1')}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">2. Types of Cookies We Use</h2>

              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                  <h3 className="font-semibold text-neutral-900">{t('cookiePolicy.section2aBold')}</h3>
                  <p className="text-sm">
                    {t('cookiePolicy.section2aIntro')}
                  </p>
                  <ul className="text-sm list-disc list-inside space-y-1">
                    {tArr('cookiePolicy.section2aItems').map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  <p className="text-sm font-semibold text-blue-900">
                    {t('cookiePolicy.section2aNote')}
                  </p>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 space-y-2">
                  <h3 className="font-semibold text-neutral-900">{t('cookiePolicy.section2bBold')}</h3>
                  <p className="text-sm">
                    {t('cookiePolicy.section2bIntro')}
                  </p>
                  <ul className="text-sm list-disc list-inside space-y-1">
                    {tArr('cookiePolicy.section2bItems').map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  <p className="text-sm whitespace-pre-line">
                    {t('cookiePolicy.section2bProvider')}
                  </p>
                  <p className="text-sm font-semibold text-amber-900">
                    {t('cookiePolicy.section2bNote')}
                  </p>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 space-y-2">
                  <h3 className="font-semibold text-neutral-900">{t('cookiePolicy.section2cBold')}</h3>
                  <p className="text-sm">
                    {t('cookiePolicy.section2cIntro')}
                  </p>
                  <ul className="text-sm list-disc list-inside space-y-1">
                    {tArr('cookiePolicy.section2cItems').map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  <p className="text-sm font-semibold text-purple-900">
                    {t('cookiePolicy.section2cNote')}
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">{t('cookiePolicy.section3Title')}</h2>
              <p>
                {t('cookiePolicy.section3Intro')}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                {tArr('cookiePolicy.section3Services').map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p>
                {t('cookiePolicy.section3Note')}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">4. How to Control Cookies</h2>
              <p>
                You can manage cookies through:
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">{t('cookiePolicy.section4aBold')}</h3>
                  <p className="text-sm">
                    {t('cookiePolicy.section4aIntro')}
                  </p>
                  <ul className="text-sm list-disc list-inside space-y-1 ml-4">
                    {tArr('cookiePolicy.section4aItems').map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">{t('cookiePolicy.section4bBold')}</h3>
                  <p className="text-sm">
                    {t('cookiePolicy.section4bIntro')}
                  </p>
                  <ul className="text-sm list-disc list-inside space-y-1 ml-4">
                    {tArr('cookiePolicy.section4bItems').map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  <p className="text-sm text-neutral-600 mt-2">
                    {t('cookiePolicy.section4bNote')}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">{t('cookiePolicy.section4cBold')}</h3>
                  <p className="text-sm">
                    {t('cookiePolicy.section4cText')}
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">{t('cookiePolicy.section5Title')}</h2>
              <p>
                {t('cookiePolicy.section5Intro')}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                {tArr('cookiePolicy.section5Items').map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">{t('cookiePolicy.section6Title')}</h2>
              <p>
                {t('cookiePolicy.section6Intro')}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                {tArr('cookiePolicy.section6Items').map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">{t('cookiePolicy.section7Title')}</h2>
              <p>
                {t('cookiePolicy.section7Intro')}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                {tArr('cookiePolicy.section7Items').map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p>
                {t('cookiePolicy.section7Contact')}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">{t('cookiePolicy.section8Title')}</h2>
              <p>
                {t('cookiePolicy.section8')}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">{t('cookiePolicy.section9Title')}</h2>
              <p>
                {t('cookiePolicy.section9Intro')}
              </p>
              <p className="whitespace-pre-line">
                {t('cookiePolicy.section9Contact')}
              </p>
            </section>

            <div className="border-t-2 border-neutral-300 pt-8">
              <p className="text-sm text-neutral-600 italic">
                <strong>{t('cookiePolicy.lastUpdated')}</strong>
              </p>
            </div>
          </div>

          <div className="flex gap-4 pt-8">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-neutral-300 text-neutral-900 font-semibold hover:bg-neutral-100 transition-all cursor-pointer"
            >
              <span>{t('cookiePolicy.backButton')}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
