import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage, openContactModal } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (page: string) => {
    setCurrentPage(page);
    scrollToTop();
  };

  return (
    <footer
      id="main-footer"
      className="bg-black text-white rounded-t-[32px] sm:rounded-t-[48px] pt-16 sm:pt-20 pb-12 px-6 sm:px-12 lg:px-16 overflow-hidden border-t border-neutral-800"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-neutral-800/80">
          {/* Left Column: Mission, CTA button and Brand */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6 max-w-sm">
              <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                Just Me Ben LTD advises developers, founders, and institutional co-investors in real estate structuring, crowdfunding, and private capital raising.
              </p>
              <button
                id="footer-get-in-touch-btn"
                onClick={openContactModal}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-xs sm:text-sm font-semibold hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                <span>Request Advisory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* JUST ME BEN LTD Logo */}
            <div className="pt-8">
              <img
                src="https://club.justmebenltd.uk/images/logo.png"
                alt="JUSTMEBEN LTD"
                className="h-12 sm:h-14 w-auto max-h-14 object-contain"
              />
            </div>
          </div>

          {/* Middle & Right Navigation Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs sm:text-sm">
            {/* Primary Nav */}
            <div className="space-y-3 flex flex-col">
              <span className="text-neutral-500 uppercase tracking-widest text-[10px] font-medium mb-1">
                Advisory & Practice
              </span>
              <button
                onClick={() => handleNav('home')}
                className="text-left text-neutral-300 hover:text-white transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => handleNav('about')}
                className="text-left text-neutral-300 hover:text-white transition-colors"
              >
                About Just Me Ben
              </button>
              <button
                onClick={() => handleNav('about')}
                className="text-left text-neutral-300 hover:text-white transition-colors"
              >
                Our Advisory Approach
              </button>
              <button
                onClick={() => handleNav('criteria')}
                className="text-left text-neutral-300 hover:text-white transition-colors"
              >
                Advisory Assessment Criteria
              </button>
              <button
                onClick={() => handleNav('portfolio')}
                className="text-left text-neutral-300 hover:text-white transition-colors"
              >
                Advisory Cases & Documentation
              </button>
              <button
                onClick={() => handleNav('blog')}
                className="text-left text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span>Insights & Research</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/15 text-white/90">AI</span>
              </button>
            </div>

            {/* Legal & Social */}
            <div className="space-y-3 flex flex-col">
              <span className="text-neutral-500 uppercase tracking-widest text-[10px] font-medium mb-1">
                Governance & Network
              </span>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="text-neutral-300 hover:text-white transition-colors"
              >
                Global Professionals Network
              </a>
              <button
                onClick={() => handleNav('privacy-policy')}
                className="text-left text-neutral-300 hover:text-white transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => handleNav('terms-of-service')}
                className="text-left text-neutral-300 hover:text-white transition-colors"
              >
                Terms of Service
              </button>
              <button
                onClick={() => handleNav('cookie-policy')}
                className="text-left text-neutral-300 hover:text-white transition-colors"
              >
                Cookie Policy
              </button>
              <button
                onClick={() => handleNav('risk-disclaimer')}
                className="text-left text-neutral-300 hover:text-white transition-colors"
              >
                Risk Disclaimer
              </button>
              <button
                onClick={() => handleNav('data-subject-rights')}
                className="text-left text-neutral-300 hover:text-white transition-colors"
              >
                Data Subject Rights
              </button>
              <a
                href="https://club.justmebenltd.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-left text-neutral-300 hover:text-white transition-colors pt-2 text-xs flex items-center gap-1.5"
              >
                <span>Club & Sign In</span>
                <ArrowRight className="w-3 h-3 text-neutral-500" />
              </a>
            </div>

            {/* Contact & Location */}
            <div className="space-y-3 col-span-2 sm:col-span-1">
              <span className="text-neutral-500 uppercase tracking-widest text-[10px] font-medium mb-1">
                Registered Office & Contacts
              </span>
              <div className="space-y-1">
                <a
                  href="mailto:info@justmebenltd.uk"
                  className="block text-neutral-300 hover:text-white transition-colors truncate"
                >
                  info@justmebenltd.uk
                </a>
                <a
                  href="mailto:support@justmebenltd.uk"
                  className="block text-neutral-300 hover:text-white transition-colors truncate"
                >
                  support@justmebenltd.uk
                </a>
              </div>
              <p className="text-neutral-300 text-xs leading-relaxed pt-1">
                590 Kingston Road, SW20 8DN<br />London, United Kingdom
              </p>
              <p className="text-neutral-500 text-[11px] pt-1">
                Company No. 15780010 • Global Professionals Network
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer Bar */}
        <div className="py-6 px-4 sm:px-6 my-8 rounded-lg bg-amber-950/30 border border-amber-700/50">
          <p className="text-xs text-amber-100 leading-relaxed">
            <strong>⚠️ Disclaimer:</strong> This website provides information and documentation for advisory and informational purposes only.
            Projects presented involve significant risks including potential loss of capital.
            Before any decision, consult complete documentation and seek independent professional advice.
            This site does not constitute investment solicitation or public offering of securities.
          </p>
        </div>

        {/* Bottom Bar: Copyright & Back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-light">
          <div>© 2026 JUSTMEBEN LTD. All Rights Reserved. Incorporated in England & Wales (Company No. 15780010).</div>
          <button
            id="back-to-top-btn"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors group cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
