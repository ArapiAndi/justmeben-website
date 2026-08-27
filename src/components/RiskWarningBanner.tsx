import React from 'react';
import { useApp } from '../context/AppContext';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const RiskWarningBanner: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-red-50 border-b-2 border-red-600 py-4 px-4 sm:px-6 lg:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start gap-4 sm:items-center sm:justify-between flex-col sm:flex-row">
          <div className="flex items-start gap-3 flex-1">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-red-900 text-sm sm:text-base">
                ⚠️ INVESTMENT RISK WARNING
              </p>
              <p className="text-xs sm:text-sm text-red-800 mt-1 font-light">
                Investments carry significant risk of total capital loss. This is advisory information only, not investment advice.
                Read our Risk Disclaimer before proceeding.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setCurrentPage('risk-disclaimer');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 text-white font-semibold text-xs sm:text-sm hover:bg-red-700 transition-colors cursor-pointer flex-shrink-0 whitespace-nowrap"
          >
            <span>Read Disclaimer</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
