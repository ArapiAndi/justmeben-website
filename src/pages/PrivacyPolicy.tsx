import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../hooks/useLanguage';

export const PrivacyPolicy: React.FC = () => {
  const { openContactModal } = useApp();
  const { t } = useLanguage();

  return (
    <div className="pt-28 pb-20 bg-[#FAF9F6] text-[#121316] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900">{t('privacy.title', 'Privacy Policy & Data Protection Notice')}</h1>
            <p className="text-lg text-neutral-600 font-light">{t('privacy.effectiveDate', 'Effective Date: 27 August 2026')}</p>
          </div>

          <div className="prose prose-lg max-w-none text-neutral-700 space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">1. Who We Are & Our Commitment to Privacy</h2>
              <p>
                <strong>Data Controller (Titolare):</strong> JUSTMEBEN LTD<br />
                Company No. 15780010 (Incorporated in England & Wales)<br />
                Registered Office: 590 Kingston Road, SW20 8DN, London, United Kingdom<br />
                Email: info@justmebenltd.uk<br />
                Phone: info@justmebenltd.uk
              </p>
              <p>
                We are committed to protecting your personal data and ensuring you have a positive experience on our website.
                This Privacy Policy explains how we collect, use, store, and protect your information in compliance with the
                <strong> UK Data Protection Act 2018</strong> and the <strong>GDPR (2018/679)</strong>.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">2. What Personal Data We Collect</h2>
              <p>When you use our website or contact us, we may collect:</p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Contact Information:</strong> Name, email address, phone number, company name</li>
                <li><strong>Business Information:</strong> Industry sector, deal size, capital requirements, project details</li>
                <li><strong>Financial Data:</strong> Information about your funding needs or investment interests (special category data)</li>
                <li><strong>Technical Data:</strong> IP address, browser type, device information (via Google Fonts, Vimeo, Unsplash)</li>
                <li><strong>Communications:</strong> Messages, inquiries, and your correspondence with us</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">3. Legal Basis for Data Collection</h2>
              <p>We process your data based on the following legal grounds (GDPR Art. 6):</p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Consent (Art. 6(1)(a)):</strong> When you complete our contact form and check the GDPR consent box</li>
                <li><strong>Legitimate Interest (Art. 6(1)(f)):</strong> Responding to inquiries and providing advisory services</li>
                <li><strong>Contract Performance (Art. 6(1)(b)):</strong> If we enter into an advisory engagement with you</li>
              </ul>
              <p className="text-sm text-neutral-600 italic">
                Special category data (financial information) is processed under Art. 9(2) based on your explicit consent provided in the contact form.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">4. How We Use Your Data</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Responding to your advisory inquiries and providing capital structuring guidance</li>
                <li>Evaluating potential projects or partnerships</li>
                <li>Sending you relevant information about our services (if you have consented)</li>
                <li>Improving our website and services</li>
                <li>Complying with legal and regulatory obligations</li>
              </ul>
              <p className="text-sm text-neutral-600 italic">
                We will <strong>NOT</strong> use your data for marketing purposes without your explicit consent.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">5. Data Retention & Deletion</h2>
              <p>
                We retain your personal data for <strong>24 months from the date of last contact</strong> unless:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>You request deletion under the Right to Erasure (Art. 17 GDPR)</li>
                <li>We are required to retain data by law (tax, regulatory, legal proceedings)</li>
                <li>You withdraw your consent</li>
              </ul>
              <p>
                After the retention period, data is securely deleted unless retention is required by applicable law.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">6. Sharing Your Data (Third Parties & Data Processors)</h2>
              <p>We may share your data with:</p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Team Members:</strong> Within JUSTMEBEN LTD for advisory purposes only</li>
                <li><strong>Service Providers (Data Processors):</strong></li>
                <ul className="list-circle list-inside ml-4 space-y-1">
                  <li>Hosting Provider — infrastructure security</li>
                  <li>Email Service Provider — communication (under DPA)</li>
                  <li>Vimeo — video hosting (GDPR compliant)</li>
                  <li>Google Fonts — web typography (GDPR compliant)</li>
                </ul>
                <li><strong>Legal Requirement:</strong> If required by law, court order, or regulatory authority</li>
              </ul>
              <p className="text-sm text-neutral-600 italic">
                We have Data Processing Agreements (DPA) in place with all processors. We do NOT sell or transfer your data to marketing platforms or third-party advertisers without consent.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">7. Cookies & Tracking Technologies</h2>
              <p>
                Our website uses cookies to enhance functionality. We employ:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Essential Cookies:</strong> Site functionality, session management (required)</li>
                <li><strong>Third-Party Cookies:</strong> Google Fonts, Vimeo, Unsplash may set cookies</li>
              </ul>
              <p>
                We use a <strong>Cookie Consent Banner</strong> to provide you with control over non-essential cookies.
                You can withdraw consent at any time via the banner or your browser settings.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">8. Your Rights Under GDPR & UK DPA 2018</h2>
              <p>You have the following rights (Articles 12-22 GDPR):</p>
              <ul className="list-disc list-inside space-y-3">
                <li>
                  <strong>Right to Access (Art. 15):</strong> Request a copy of your personal data we hold
                </li>
                <li>
                  <strong>Right to Rectification (Art. 16):</strong> Correct inaccurate or incomplete data
                </li>
                <li>
                  <strong>Right to Erasure (Art. 17):</strong> Request deletion of your data ("Right to be Forgotten")
                </li>
                <li>
                  <strong>Right to Restrict Processing (Art. 18):</strong> Limit how we use your data
                </li>
                <li>
                  <strong>Right to Data Portability (Art. 20):</strong> Receive your data in a structured, portable format
                </li>
                <li>
                  <strong>Right to Object (Art. 21):</strong> Object to certain processing activities
                </li>
                <li>
                  <strong>Right to Withdraw Consent:</strong> Withdraw consent at any time (does not retroactively affect previous processing)
                </li>
              </ul>
              <p>
                To exercise any of these rights, please visit our <strong><u>Data Subject Rights</u></strong> page or email us at <strong>info@justmebenltd.uk</strong>.
                We will respond within <strong>30 calendar days</strong> as required by GDPR.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">9. Data Security & Protection</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your data against unauthorized access, alteration, disclosure, or destruction:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>HTTPS encryption for all data transmission</li>
                <li>Secure password policies and access controls</li>
                <li>Regular security audits and updates</li>
                <li>Limited access to personal data (need-to-know basis)</li>
              </ul>
              <p className="text-sm text-neutral-600 italic">
                While we take security seriously, no system is 100% secure. You use our services at your own risk. If you suspect a data breach, please contact us immediately at info@justmebenltd.uk.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">10. Data Transfers Outside UK/EU</h2>
              <p>
                Our servers and service providers are based in the UK and EU. Any international transfers comply with GDPR Chapter V requirements and are subject to Standard Contractual Clauses (SCC) where applicable.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">11. Children's Privacy</h2>
              <p>
                Our website is not intended for children under 16. We do not knowingly collect personal data from children. If we become aware that a child has provided data, we will delete it immediately.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">12. Data Subject Complaints</h2>
              <p>
                If you believe your rights have been violated, you have the right to lodge a complaint with the <strong>Information Commissioner's Office (ICO)</strong>:
              </p>
              <p>
                <strong>ICO Contact Details:</strong><br />
                Information Commissioner's Office<br />
                Water Lane, Wigan, WN3 5DJ<br />
                Phone: 0303 123 1113<br />
                Email: <a href="mailto:casework@ico.org.uk" className="text-[#2596be] underline">casework@ico.org.uk</a><br />
                Website: <a href="https://www.ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer" className="text-[#2596be] underline">www.ico.org.uk</a>
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">13. Policy Updates</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements.
                The "Effective Date" at the top will indicate the latest revision. We recommend reviewing this policy periodically.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">14. Contact Us</h2>
              <p>
                For any questions about this Privacy Policy or your data, please contact us:
              </p>
              <p>
                <strong>JUSTMEBEN LTD</strong><br />
                Email: info@justmebenltd.uk<br />
                Address: 590 Kingston Road, SW20 8DN, London, United Kingdom<br />
                Company No. 15780010
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-neutral-200">
            <motion.button
              whileHover={{ scale: 1.03 }}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2596be] text-white font-semibold hover:bg-[#1d7b9c] transition-all cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
