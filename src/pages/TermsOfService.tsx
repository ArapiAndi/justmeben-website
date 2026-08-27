import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export const TermsOfService: React.FC = () => {
  return (
    <div className="pt-28 pb-20 bg-[#FAF9F6] text-[#121316] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900">Terms of Service</h1>
            <p className="text-lg text-neutral-600 font-light">
              Effective Date: 27 August 2026
            </p>
          </div>

          <div className="prose prose-lg max-w-none text-neutral-700 space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">1. Acceptance of Terms</h2>
              <p>
                By accessing and using this website (justmebenltd.uk), you accept and agree to be bound by these Terms of Service. If you do not agree, please do not use this website.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">2. Services Provided</h2>
              <p>
                JUSTMEBEN LTD provides the following services:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Capital structuring advisory</li>
                <li>Real estate underwriting and due diligence</li>
                <li>Crowdfunding campaign preparation and advisory</li>
                <li>Mezzanine debt and private equity structuring</li>
                <li>Financial analysis and feasibility assessment</li>
              </ul>
              <p>
                Our services are <strong>advisory in nature only</strong>. We do not execute transactions, manage funds, or provide regulated investment advice.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">3. Website Content & Use License</h2>
              <p>
                We grant you a limited, non-exclusive license to access and display the content on this website for personal, non-commercial use only. You may NOT:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Reproduce, copy, or distribute content without permission</li>
                <li>Modify, translate, or create derivative works</li>
                <li>Remove copyright notices or proprietary markings</li>
                <li>Use the site for commercial purposes without a license agreement</li>
                <li>Scrape, crawl, or extract data automatically</li>
                <li>Transmit malware, spam, or harmful code</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">4. Intellectual Property Rights</h2>
              <p>
                All content on this website — including text, graphics, logos, images, and software — is the property of JUSTMEBEN LTD and is protected by UK copyright law. Unauthorized reproduction or distribution is prohibited.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">5. Disclaimer of Warranties</h2>
              <p className="font-semibold">
                THIS WEBSITE AND OUR SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND.
              </p>
              <p>
                We make NO warranties, express or implied, regarding:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Accuracy, completeness, or timeliness of information</li>
                <li>Uninterrupted access or availability</li>
                <li>Freedom from errors, omissions, or viruses</li>
                <li>Fitness for a particular purpose</li>
                <li>Merchantability or non-infringement</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">6. Limitation of Liability</h2>
              <p className="font-semibold">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>We are NOT liable</strong> for any direct, indirect, incidental, special, or consequential damages (including lost profits, lost revenue, lost savings).
                </li>
                <li>
                  <strong>Our total liability</strong> is limited to the amount you paid us for services (if any).
                </li>
                <li>
                  <strong>You use this website entirely at your own risk.</strong>
                </li>
              </ul>
              <p>
                Some jurisdictions do not allow liability limitations. In such cases, our liability is limited to the maximum extent permitted.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">7. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless JUSTMEBEN LTD from any claims, damages, losses, or expenses (including legal fees) arising from:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your use of this website</li>
                <li>Violation of these terms</li>
                <li>Infringement of intellectual property rights</li>
                <li>Any harmful or illegal conduct by you</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">8. Third-Party Links & Content</h2>
              <p>
                This website may contain links to third-party websites. We:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Do NOT endorse or control third-party sites</li>
                <li>Are NOT responsible for their content or policies</li>
                <li>Do NOT guarantee their accuracy or legality</li>
              </ul>
              <p>
                Access third-party sites at your own risk and review their terms and privacy policies.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">9. Prohibited Conduct</h2>
              <p>
                You agree NOT to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Post illegal, defamatory, or abusive content</li>
                <li>Harass, threaten, or intimidate others</li>
                <li>Transmit malware, viruses, or harmful code</li>
                <li>Attempt to gain unauthorized access</li>
                <li>Interfere with site operation or security</li>
                <li>Violate applicable laws or regulations</li>
              </ul>
              <p>
                Violation may result in immediate termination of access and legal action.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">10. Confidentiality</h2>
              <p>
                Any information you provide (business plans, financial data, etc.) is treated as confidential. We will:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Not disclose it without your consent (except where legally required)</li>
                <li>Use it only for evaluation and advisory purposes</li>
                <li>Protect it according to our Privacy Policy</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">11. Modification of Terms</h2>
              <p>
                We may modify these terms at any time. Changes are effective immediately upon posting. Your continued use constitutes acceptance.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">12. Termination</h2>
              <p>
                We reserve the right to terminate your access to this website at any time, with or without cause, with or without notice.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">13. Governing Law & Jurisdiction</h2>
              <p>
                These terms are governed by the laws of <strong>England & Wales</strong>. You agree to submit to the exclusive jurisdiction of English courts.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">14. Contact & Dispute Resolution</h2>
              <p>
                For questions, complaints, or disputes:
              </p>
              <p>
                <strong>JUSTMEBEN LTD</strong><br />
                Email: info@justmebenltd.uk<br />
                Address: 590 Kingston Road, SW20 8DN, London, UK
              </p>
              <p>
                We will attempt to resolve disputes informally before initiating legal proceedings.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">15. Severability</h2>
              <p>
                If any provision is found unenforceable, the remaining provisions continue in effect.
              </p>
            </section>

            <div className="border-t-2 border-neutral-300 pt-8">
              <p className="text-sm text-neutral-600 italic">
                <strong>Last Updated:</strong> 27 August 2026<br />
                These terms are subject to change. Check periodically for updates.
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
