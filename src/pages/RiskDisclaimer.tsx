import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const LINK_CLASS = 'text-[#2596be] underline';

export const RiskDisclaimer: React.FC = () => {
  const { t } = useLanguage();
  const tArr = (key: string): string[] => {
    const v = t(key) as unknown;
    return Array.isArray(v) ? (v as string[]) : [];
  };

  // "Label: rest" -> <strong>Label:</strong> rest
  const boldLabel = (text: string): React.ReactNode => {
    const idx = text.indexOf(':');
    if (idx === -1) return text;
    return (
      <>
        <strong>{text.slice(0, idx + 1)}</strong>
        {text.slice(idx + 1)}
      </>
    );
  };

  // Turn "Privacy Policy" / "Terms of Service" mentions into links when present
  const withPolicyLinks = (text: string): React.ReactNode => {
    const parts = text.split(/(Privacy Policy|Terms of Service)/);
    if (parts.length === 1) return text;
    return parts.map((part, i) => {
      if (part === 'Privacy Policy') return <a key={i} href="/privacy-policy" className={LINK_CLASS}>{part}</a>;
      if (part === 'Terms of Service') return <a key={i} href="/terms-of-service" className={LINK_CLASS}>{part}</a>;
      return part;
    });
  };

  const contactLines = t('riskDisclaimer.section12Contact').split('\n');

  const renderList = (key: string, render?: (item: string) => React.ReactNode) => (
    <ul className="list-disc list-inside space-y-2 ml-4">
      {tArr(key).map((item, i) => (
        <li key={i}>{render ? render(item) : item}</li>
      ))}
    </ul>
  );

  return (
    <div className="pt-28 pb-20 bg-[#FAF9F6] text-[#121316] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-red-600" />
              <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900">{t('riskDisclaimer.title')}</h1>
            </div>
            <p className="text-lg text-neutral-600 font-light">
              {t('riskDisclaimer.subtitle')}
            </p>
          </div>

          <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded space-y-4">
            <h2 className="text-2xl font-bold text-red-900">{t('riskDisclaimer.warningBold')}</h2>
            <p className="text-red-800 font-semibold">
              {t('riskDisclaimer.warningText')}
            </p>
          </div>

          <div className="prose prose-lg max-w-none text-neutral-700 space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">{t('riskDisclaimer.section1Title')}</h2>
              <p>{t('riskDisclaimer.section1Intro')}</p>
              {renderList('riskDisclaimer.section1Items')}
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">{t('riskDisclaimer.section2Title')}</h2>
              <p>{t('riskDisclaimer.section2Intro')}</p>
              {renderList('riskDisclaimer.section2Items')}
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">{t('riskDisclaimer.section3Title')}</h2>
              <p>{t('riskDisclaimer.section3Intro')}</p>
              {renderList('riskDisclaimer.section3Items', boldLabel)}
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">{t('riskDisclaimer.section4Title')}</h2>
              <p>{t('riskDisclaimer.section4Intro')}</p>
              {renderList('riskDisclaimer.section4Items')}
              <p className="font-semibold text-red-700">
                {t('riskDisclaimer.section4Note')}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">{t('riskDisclaimer.section5Title')}</h2>
              <p>{t('riskDisclaimer.section5Intro')}</p>
              {renderList('riskDisclaimer.section5Items')}
              <p className="font-semibold">
                {t('riskDisclaimer.section5Warning')}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">{t('riskDisclaimer.section6Title')}</h2>
              <p>{t('riskDisclaimer.section6Intro')}</p>
              {renderList('riskDisclaimer.section6Items')}
              <p>{t('riskDisclaimer.section6Note')}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">{t('riskDisclaimer.section7Title')}</h2>
              <p>{t('riskDisclaimer.section7Intro')}</p>
              {renderList('riskDisclaimer.section7Items')}
              <p className="font-semibold">
                {t('riskDisclaimer.section7Note')}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">{t('riskDisclaimer.section8Title')}</h2>
              <p>
                <strong>{t('riskDisclaimer.section8Intro')}</strong>
              </p>
              <p>{t('riskDisclaimer.section8Compliance')}</p>
              {renderList('riskDisclaimer.section8ComplianceItems')}
              <p>
                <strong>{t('riskDisclaimer.section8Check')}</strong>
              </p>
              <p className="italic">
                <a href="https://register.fca.org.uk/" target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
                  {t('riskDisclaimer.section8LinkText')}
                </a>
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">{t('riskDisclaimer.section9Title')}</h2>
              <p>{t('riskDisclaimer.section9Intro')}</p>
              {renderList('riskDisclaimer.section9Items')}
              <p>{t('riskDisclaimer.section9Note')}</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">{t('riskDisclaimer.section10Title')}</h2>
              <p>
                <strong>{t('riskDisclaimer.section10Intro')}</strong>
              </p>
              {renderList('riskDisclaimer.section10Items')}
              <p className="font-semibold text-red-700">
                {t('riskDisclaimer.section10Note')}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">{t('riskDisclaimer.section11Title')}</h2>
              <p>{t('riskDisclaimer.section11Intro')}</p>
              {renderList('riskDisclaimer.section11Items', withPolicyLinks)}
            </section>

            <section className="space-y-4 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-yellow-900">{t('riskDisclaimer.section12Title')}</h2>
              <p>{t('riskDisclaimer.section12Intro')}</p>
              <p>
                {contactLines.map((line, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <br />}
                    {line.includes('www.ico.org.uk') ? (
                      <>
                        {boldLabel(line.replace('www.ico.org.uk', '').trimEnd())}{' '}
                        <a href="https://www.ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
                          www.ico.org.uk
                        </a>
                      </>
                    ) : (
                      boldLabel(line)
                    )}
                  </React.Fragment>
                ))}
              </p>
            </section>

            <div className="border-t-2 border-neutral-300 pt-8">
              <p className="text-sm text-neutral-600 italic">
                {boldLabel(t('riskDisclaimer.lastUpdated'))}<br />
                {t('riskDisclaimer.updateNote')}
              </p>
            </div>
          </div>

          <div className="flex gap-4 pt-8">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-neutral-300 text-neutral-900 font-semibold hover:bg-neutral-100 transition-all cursor-pointer"
            >
              <span>{t('riskDisclaimer.backButton')}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
