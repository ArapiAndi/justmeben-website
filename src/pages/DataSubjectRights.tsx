import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export const DataSubjectRights: React.FC = () => {
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const rights = [
    {
      id: 'access',
      title: 'Right to Access (Art. 15)',
      description: 'Request a copy of your personal data we hold about you',
      shortName: 'Data Subject Access Request',
    },
    {
      id: 'rectification',
      title: 'Right to Rectification (Art. 16)',
      description: 'Correct inaccurate or incomplete information',
      shortName: 'Data Correction Request',
    },
    {
      id: 'erasure',
      title: 'Right to Erasure (Art. 17)',
      description: 'Request deletion of your data ("Right to be Forgotten")',
      shortName: 'Data Deletion Request',
    },
    {
      id: 'restrict',
      title: 'Right to Restrict Processing (Art. 18)',
      description: 'Limit how we use your data',
      shortName: 'Restrict Processing Request',
    },
    {
      id: 'portability',
      title: 'Right to Data Portability (Art. 20)',
      description: 'Receive your data in a structured, portable format',
      shortName: 'Data Portability Request',
    },
    {
      id: 'object',
      title: 'Right to Object (Art. 21)',
      description: 'Object to certain types of processing',
      shortName: 'Objection Request',
    },
    {
      id: 'withdraw',
      title: 'Withdraw Consent',
      description: 'Withdraw consent to data processing at any time',
      shortName: 'Consent Withdrawal',
    },
  ];

  return (
    <div className="pt-28 pb-20 bg-[#FAF9F6] text-[#121316] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900">Data Subject Rights & Requests</h1>
            <p className="text-lg text-neutral-600 font-light">
              Under GDPR and UK Data Protection Act 2018, you have the right to control your personal data. Submit your request below.
            </p>
          </div>

          {/* Rights Overview */}
          <div className="grid gap-4">
            {rights.map((right) => (
              <motion.button
                key={right.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedRequest(selectedRequest === right.id ? null : right.id)}
                className="text-left p-6 rounded-lg border border-neutral-200 bg-white hover:border-[#2596be] hover:bg-[#f8fbfd] transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-[#2596be] transition-colors">
                      {right.title}
                    </h3>
                    <p className="text-sm text-neutral-600 mt-1">{right.description}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-[#2596be] transition-all transform group-hover:translate-x-1" />
                </div>

                {selectedRequest === right.id && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 pt-6 border-t border-neutral-200">
                    <p className="text-sm text-neutral-700 mb-4">
                      To submit this request, provide the following information:
                    </p>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setSubmitted(true);
                        setTimeout(() => {
                          setSelectedRequest(null);
                          setSubmitted(false);
                        }, 2000);
                      }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-xs font-medium text-neutral-600 mb-1">
                          Full Name *
                        </label>
                        <input type="text" required placeholder="Your full name" className="w-full px-3 py-2 rounded border border-neutral-200 text-sm" />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-neutral-600 mb-1">
                          Email Address *
                        </label>
                        <input type="email" required placeholder="your@email.com" className="w-full px-3 py-2 rounded border border-neutral-200 text-sm" />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-neutral-600 mb-1">
                          Request Details
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Provide any additional context about your request..."
                          className="w-full px-3 py-2 rounded border border-neutral-200 text-sm"
                        />
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#2596be] text-white font-semibold text-sm hover:bg-[#1d7b9c] transition-all cursor-pointer"
                      >
                        <span>Submit {right.shortName}</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>

                      {submitted && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 p-3 rounded bg-emerald-50 border border-emerald-200">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                          <p className="text-sm text-emerald-700">Request submitted! We'll respond within 30 days.</p>
                        </motion.div>
                      )}
                    </form>
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>

          {/* Response Timeline */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900">Response Timeline</h3>
                <p className="text-sm text-blue-800 mt-2">
                  Under GDPR, we are required to respond to your data subject rights requests within <strong>30 calendar days</strong>.
                  We may extend this period by up to 60 additional days for complex requests. You will be notified if an extension is needed.
                </p>
              </div>
            </div>
          </div>

          {/* Alternative Contact Method */}
          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6 space-y-4">
            <h3 className="font-semibold text-neutral-900">Request via Email</h3>
            <p className="text-sm text-neutral-700">
              You can also submit your data subject rights request directly by emailing:
            </p>
            <a href="mailto:info@justmebenltd.uk?subject=Data%20Subject%20Rights%20Request" className="inline-block px-4 py-3 rounded-full bg-[#2596be] text-white font-semibold hover:bg-[#1d7b9c] transition-all cursor-pointer">
              info@justmebenltd.uk
            </a>
            <p className="text-xs text-neutral-600 mt-3">
              Please include "Data Subject Rights Request" in the subject line and specify which right you are exercising.
            </p>
          </div>

          {/* ICO Information */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 space-y-4">
            <h3 className="font-semibold text-amber-900">Need to File a Complaint?</h3>
            <p className="text-sm text-amber-800">
              If you believe your rights have been violated or our response is unsatisfactory, you can lodge a complaint with the Information Commissioner's Office (ICO):
            </p>
            <div className="text-sm text-amber-900 space-y-1">
              <p><strong>Phone:</strong> 0303 123 1113</p>
              <p><strong>Email:</strong> <a href="mailto:casework@ico.org.uk" className="underline">casework@ico.org.uk</a></p>
              <p>
                <strong>Website:</strong> <a href="https://www.ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer" className="underline">www.ico.org.uk</a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
