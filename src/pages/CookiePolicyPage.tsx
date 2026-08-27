import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export const CookiePolicyPage: React.FC = () => {
  return (
    <div className="pt-28 pb-20 bg-[#FAF9F6] text-[#121316] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900">Cookie Policy</h1>
            <p className="text-lg text-neutral-600 font-light">
              Effective Date: 27 August 2026
            </p>
          </div>

          <div className="prose prose-lg max-w-none text-neutral-700 space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">1. What are Cookies?</h2>
              <p>
                Cookies are small text files stored on your device when you visit our website. They help us remember your preferences, track usage, and improve your experience.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">2. Types of Cookies We Use</h2>

              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                  <h3 className="font-semibold text-neutral-900">🔒 Essential Cookies (Required)</h3>
                  <p className="text-sm">
                    These cookies are necessary for the site to function. They:
                  </p>
                  <ul className="text-sm list-disc list-inside space-y-1">
                    <li>Maintain your session and login state</li>
                    <li>Implement security features</li>
                    <li>Enable form submission</li>
                    <li>Store your language preference</li>
                  </ul>
                  <p className="text-sm font-semibold text-blue-900">
                    ✓ Cannot be disabled — Required for site functionality
                  </p>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 space-y-2">
                  <h3 className="font-semibold text-neutral-900">📊 Analytics Cookies (Optional)</h3>
                  <p className="text-sm">
                    Help us understand how visitors use our site:
                  </p>
                  <ul className="text-sm list-disc list-inside space-y-1">
                    <li>Page views and user behavior</li>
                    <li>Traffic sources and referrers</li>
                    <li>Device types and browsers</li>
                    <li>Bounce rates and session duration</li>
                  </ul>
                  <p className="text-sm">
                    <strong>Provider:</strong> Google Analytics 4 (if enabled)<br />
                    <strong>Retention:</strong> 14 months
                  </p>
                  <p className="text-sm font-semibold text-amber-900">
                    ⚙️ Opt-in via cookie banner — No personal data collected
                  </p>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 space-y-2">
                  <h3 className="font-semibold text-neutral-900">🎯 Marketing Cookies (Optional)</h3>
                  <p className="text-sm">
                    Track advertising effectiveness:
                  </p>
                  <ul className="text-sm list-disc list-inside space-y-1">
                    <li>Ad impressions and clicks</li>
                    <li>Conversion tracking</li>
                    <li>Remarketing campaigns</li>
                  </ul>
                  <p className="text-sm font-semibold text-purple-900">
                    ⚙️ Opt-in via cookie banner — Not currently in use
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">3. Third-Party Cookies</h2>
              <p>
                Our website uses services that may set their own cookies:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Google Fonts</strong> — Web typography (may log requests)
                </li>
                <li>
                  <strong>Vimeo</strong> — Embedded videos (sets tracking cookies)
                </li>
                <li>
                  <strong>Unsplash</strong> — External images (minimal tracking)
                </li>
              </ul>
              <p>
                These services have their own cookie and privacy policies. We recommend reviewing them.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">4. How to Control Cookies</h2>
              <p>
                You can manage cookies through:
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">🍪 Our Cookie Banner</h3>
                  <p className="text-sm">
                    Click the cookie banner at the bottom of the page to:
                  </p>
                  <ul className="text-sm list-disc list-inside space-y-1 ml-4">
                    <li>Accept all cookies</li>
                    <li>Accept essential only</li>
                    <li>Manage individual preferences</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">🌐 Browser Settings</h3>
                  <p className="text-sm">
                    Most browsers allow you to:
                  </p>
                  <ul className="text-sm list-disc list-inside space-y-1 ml-4">
                    <li>View cookies stored on your device</li>
                    <li>Delete cookies individually or all</li>
                    <li>Disable new cookies</li>
                    <li>Use "Private" or "Incognito" mode</li>
                  </ul>
                  <p className="text-sm text-neutral-600 mt-2">
                    Note: Disabling cookies may affect site functionality.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">📵 Do Not Track (DNT)</h3>
                  <p className="text-sm">
                    Some browsers support "Do Not Track" signals. We respect DNT requests where feasible.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">5. Data Retention</h2>
              <p>
                We retain cookie data as follows:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Essential Cookies:</strong> Session-based (deleted when you close browser)</li>
                <li><strong>Analytics:</strong> 14 months (Google Analytics default)</li>
                <li><strong>Marketing:</strong> 12 months (if enabled)</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">6. Consent & GDPR Compliance</h2>
              <p>
                Under GDPR and UK Data Protection Act 2018:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>✅ Essential cookies do NOT require consent</li>
                <li>✅ Non-essential cookies REQUIRE your explicit opt-in consent</li>
                <li>✅ You can withdraw consent anytime via the cookie banner</li>
                <li>✅ We provide transparent information about all cookies</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">7. Your Rights</h2>
              <p>
                Under GDPR, you have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Know what cookies we use and why</li>
                <li>Consent to or refuse non-essential cookies</li>
                <li>Withdraw consent at any time</li>
                <li>Request access to cookie data</li>
                <li>Request deletion of cookie data</li>
              </ul>
              <p>
                For requests, email: <strong>info@justmebenltd.uk</strong>
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">8. Changes to This Policy</h2>
              <p>
                We may update this policy to reflect new technologies, legal requirements, or business practices. The date at the top indicates the last update. Check periodically for changes.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">9. Contact Us</h2>
              <p>
                For questions about our cookie practices:
              </p>
              <p>
                <strong>JUSTMEBEN LTD</strong><br />
                Email: info@justmebenltd.uk<br />
                Address: 590 Kingston Road, SW20 8DN, London, UK
              </p>
            </section>

            <div className="border-t-2 border-neutral-300 pt-8">
              <p className="text-sm text-neutral-600 italic">
                <strong>Last Updated:</strong> 27 August 2026
              </p>
            </div>
          </div>

          <div className="flex gap-4 pt-8">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-neutral-300 text-neutral-900 font-semibold hover:bg-neutral-100 transition-all cursor-pointer"
            >
              <span>Back</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
