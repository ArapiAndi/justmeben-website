import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, ArrowRight } from 'lucide-react';

export const RiskDisclaimer: React.FC = () => {
  return (
    <div className="pt-28 pb-20 bg-[#FAF9F6] text-[#121316] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-red-600" />
              <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900">Risk Disclaimer</h1>
            </div>
            <p className="text-lg text-neutral-600 font-light">
              Important Notice: Please read this carefully before using our services or considering any financial decision.
            </p>
          </div>

          <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded space-y-4">
            <h2 className="text-2xl font-bold text-red-900">⚠️ INVESTMENT RISK WARNING</h2>
            <p className="text-red-800 font-semibold">
              Capital at Risk. Investments in real estate, crowdfunding, mezzanine debt, private equity, and alternative assets carry SIGNIFICANT RISK OF TOTAL LOSS.
            </p>
          </div>

          <div className="prose prose-lg max-w-none text-neutral-700 space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">1. Nature of Our Business</h2>
              <p>
                JUSTMEBEN LTD provides <strong>advisory services only</strong>. We are <strong>NOT</strong> a regulated investment firm, financial advisor, or investment platform. We do not:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Offer investment advice or financial recommendations</li>
                <li>Manage client funds or assets</li>
                <li>Execute transactions on behalf of clients</li>
                <li>Provide guaranteed returns or profit forecasts</li>
                <li>Act as a custodian or trustee</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">2. Information ON THIS WEBSITE IS INFORMATIONAL ONLY</h2>
              <p>
                All content on this website is <strong>for informational and educational purposes only</strong>. It does NOT constitute:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Investment advice or recommendations</li>
                <li>An offer to buy or sell securities or financial instruments</li>
                <li>A solicitation to invest in any project or opportunity</li>
                <li>Financial forecasting or performance guarantees</li>
                <li>Professional financial advice (consult a qualified advisor)</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">3. Risks of Alternative Investments</h2>
              <p>
                Investments in real estate development, crowdfunding platforms, mezzanine debt, and private equity carry substantial risks:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Loss of Capital:</strong> You may lose your entire investment. There is no guarantee of any return.
                </li>
                <li>
                  <strong>Illiquidity:</strong> Your funds may be locked for extended periods (2-10 years). You may not be able to exit quickly.
                </li>
                <li>
                  <strong>Project Failure:</strong> Construction delays, cost overruns, market downturns, or insolvency can result in total loss.
                </li>
                <li>
                  <strong>Developer Default:</strong> If the developer/sponsor becomes insolvent, you may recover little or nothing.
                </li>
                <li>
                  <strong>Interest Rate Risk:</strong> Rising interest rates reduce property valuations and profitability.
                </li>
                <li>
                  <strong>Market Risk:</strong> Real estate downturns, economic recessions, or sector-specific crises can devastate returns.
                </li>
                <li>
                  <strong>Regulatory Risk:</strong> Changes in planning laws, tax policy, or crowdfunding regulations may impact projects.
                </li>
                <li>
                  <strong>Fraud Risk:</strong> Despite due diligence, fraud or misrepresentation by counterparties is possible.
                </li>
                <li>
                  <strong>Operational Risk:</strong> Management errors, disputes, or conflicts between investors can destroy value.
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">4. NO GUARANTEE OF RETURNS</h2>
              <p>
                <strong>Past performance is NOT indicative of future results.</strong> Any historical data, case studies, or examples on our website DO NOT guarantee or predict future outcomes. Returns and profitability depend on:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Successful project execution (construction, sales, financing)</li>
                <li>Market conditions and economic cycles</li>
                <li>Counterparty performance and financial stability</li>
                <li>Regulatory environment and legal framework</li>
                <li>Timing of exits and refinancing events</li>
              </ul>
              <p className="font-semibold text-red-700">
                There is NO assurance that any projected return, yield, or IRR will be achieved.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">5. Suitability Assessment</h2>
              <p>
                Alternative investments are suitable only for investors who:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Have substantial financial resources and net worth</li>
                <li>Can afford to lose 100% of their invested capital</li>
                <li>Have a long-term investment horizon (5+ years minimum)</li>
                <li>Have low liquidity requirements</li>
                <li>Understand and accept all risks outlined herein</li>
                <li>Are NOT borrowing money to invest</li>
              </ul>
              <p className="font-semibold">
                If you do not meet these criteria, <strong>DO NOT invest.</strong>
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">6. Due Diligence is NOT a Guarantee</h2>
              <p>
                Even when we conduct rigorous due diligence (technical surveys, legal reviews, financial stress-testing), this:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Does NOT guarantee success or profit</li>
                <li>Does NOT eliminate investment risk</li>
                <li>Does NOT provide insurance against loss</li>
                <li>Cannot predict future market conditions or events</li>
              </ul>
              <p>
                Due diligence is designed to <strong>identify and mitigate</strong> certain risks, not eliminate them entirely.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">7. Tax & Legal Implications</h2>
              <p>
                Investments in alternative assets have complex tax implications. You are responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Understanding applicable income tax, capital gains tax, and VAT</li>
                <li>Reporting income and gains to tax authorities (HMRC in UK)</li>
                <li>Consulting with a tax advisor or accountant</li>
                <li>Understanding any preferential tax treatment (EIS, SEIS, etc.)</li>
              </ul>
              <p className="font-semibold">
                We do NOT provide tax advice. Consult a qualified tax professional.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">8. Regulatory Status</h2>
              <p>
                <strong>JUSTMEBEN LTD is NOT regulated by the FCA (Financial Conduct Authority).</strong> We do not hold an FCA license and are not authorized to provide regulated investment services.
              </p>
              <p>
                However, we comply with:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>UK Data Protection Act 2018 and GDPR</li>
                <li>Anti-Money Laundering (AML) regulations</li>
                <li>Crowdfunding platforms we work with must be FCA-regulated</li>
              </ul>
              <p>
                <strong>If you are considering investing through a crowdfunding platform, verify that platform is FCA-regulated:</strong>
              </p>
              <p className="italic">
                Check the <a href="https://register.fca.org.uk/" target="_blank" rel="noopener noreferrer" className="text-[#2596be] underline">
                  FCA Register
                </a>
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">9. Conflict of Interest Disclosure</h2>
              <p>
                We may have financial interests in projects we advise on. This includes:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Advisory fees based on project success</li>
                <li>Co-investment alongside clients</li>
                <li>Referral fees from platforms or sponsors</li>
              </ul>
              <p>
                We endeavor to manage conflicts fairly, but you should be aware of potential bias.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">10. Limitation of Liability</h2>
              <p>
                <strong>To the maximum extent permitted by law:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We are NOT liable for any direct, indirect, or consequential losses</li>
                <li>We are NOT liable for lost profits, lost savings, or lost opportunities</li>
                <li>Use of this website and our services is AT YOUR OWN RISK</li>
                <li>Our total liability is limited to amounts paid to us for services</li>
              </ul>
              <p className="font-semibold text-red-700">
                You use this website and our services entirely at your own risk and discretion.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-neutral-900">11. Before You Proceed</h2>
              <p>
                Before using our advisory services or considering any investment:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>✅ Read this entire disclaimer</li>
                <li>✅ Read our <a href="/privacy-policy" className="text-[#2596be] underline">Privacy Policy</a> and <a href="/terms-of-service" className="text-[#2596be] underline">Terms of Service</a></li>
                <li>✅ Consult independent financial, legal, and tax advisors</li>
                <li>✅ Conduct your own thorough due diligence</li>
                <li>✅ Only invest capital you can afford to lose completely</li>
                <li>✅ Understand your risk tolerance and investment objectives</li>
              </ul>
            </section>

            <section className="space-y-4 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-yellow-900">12. Questions or Concerns?</h2>
              <p>
                If you have questions about these risks, our services, or whether an investment is suitable for you:
              </p>
              <p>
                <strong>Contact us:</strong> info@justmebenltd.uk<br />
                <strong>Or file a complaint with the FCA:</strong>{' '}
                <a href="https://www.ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer" className="text-[#2596be] underline">
                  www.ico.org.uk
                </a>
              </p>
            </section>

            <div className="border-t-2 border-neutral-300 pt-8">
              <p className="text-sm text-neutral-600 italic">
                <strong>Last Updated:</strong> 27 August 2026<br />
                This disclaimer is subject to change without notice. Check periodically for updates.
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
