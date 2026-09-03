import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const TermsOfService: React.FC = () => {
  const { t } = useLanguage();
  const tArr = (key: string): string[] => { const v = t(key) as unknown; return Array.isArray(v) ? (v as string[]) : []; };

  return (
    <div className="pt-28 pb-20 bg-[#FAF9F6] text-[#121316] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900">{t('termsOfService.title')}</h1>
            <p className="text-lg text-neutral-600 font-light">
              {t('termsOfService.effectiveDate')}
            </p>
          </div>

          <div className="prose prose-lg max-w-none text-neutral-700 space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">{t('termsOfService.section1Title')}</h2>
              <p>
                {t('termsOfService.section1')}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">{t('termsOfService.section2Title')}</h2>
              <p>
                {t('termsOfService.section2Intro')}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                {tArr('termsOfService.section2Services').map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p>
                {t('termsOfService.section2Note')}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">{t('termsOfService.section3Title')}</h2>
              <p>
                {t('termsOfService.section3Intro')}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                {tArr('termsOfService.section3Restrictions').map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">{t('termsOfService.section4Title')}</h2>
              <p>
                {t('termsOfService.section4')}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">{t('termsOfService.section5Title')}</h2>
              <p className="font-semibold">
                {t('termsOfService.section5Bold')}
              </p>
              <p>
                {t('termsOfService.section5Intro')}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                {tArr('termsOfService.section5Warranties').map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">{t('termsOfService.section6Title')}</h2>
              <p className="font-semibold">
                {t('termsOfService.section6Bold')}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                {tArr('termsOfService.section6Items').map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p>
                {t('termsOfService.section6Note')}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">{t('termsOfService.section7Title')}</h2>
              <p>
                {t('termsOfService.section7Intro')}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                {tArr('termsOfService.section7Items').map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">{t('termsOfService.section8Title')}</h2>
              <p>
                {t('termsOfService.section8Intro')}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                {tArr('termsOfService.section8Items').map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p>
                {t('termsOfService.section8Note')}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">{t('termsOfService.section9Title')}</h2>
              <p>
                {t('termsOfService.section9Intro')}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                {tArr('termsOfService.section9Items').map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p>
                {t('termsOfService.section9Note')}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">{t('termsOfService.section10Title')}</h2>
              <p>
                {t('termsOfService.section10Intro')}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                {tArr('termsOfService.section10Items').map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">{t('termsOfService.section11Title')}</h2>
              <p>
                {t('termsOfService.section11')}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">{t('termsOfService.section12Title')}</h2>
              <p>
                {t('termsOfService.section12')}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">{t('termsOfService.section13Title')}</h2>
              <p>
                {t('termsOfService.section13')}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">{t('termsOfService.section14Title')}</h2>
              <p>
                {t('termsOfService.section14Intro')}
              </p>
              <p className="whitespace-pre-line">
                {t('termsOfService.section14Contact')}
              </p>
              <p>
                {t('termsOfService.section14Note')}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">{t('termsOfService.section15Title')}</h2>
              <p>
                {t('termsOfService.section15')}
              </p>
            </section>

            <div className="border-t-2 border-neutral-300 pt-8">
              <p className="text-sm text-neutral-600 italic">
                <strong>{t('termsOfService.lastUpdated')}</strong><br />
                {t('termsOfService.updateNote')}
              </p>
            </div>
          </div>

          <div className="flex gap-4 pt-8">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-neutral-300 text-neutral-900 font-semibold hover:bg-neutral-100 transition-all cursor-pointer"
            >
              <span>{t('termsOfService.backButton')}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
