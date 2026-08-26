import React from 'react';
import { useApp } from '../context/AppContext';
import { TEAM_MEMBERS } from '../data/initialData';
import { ArrowRight, Shield, Target, Compass, Award, CheckCircle, Linkedin } from 'lucide-react';
import { motion } from 'motion/react';

export const AboutPage: React.FC = () => {
  const { openContactModal, setCurrentPage } = useApp();

  return (
    <div className="pt-28 pb-20 bg-[#FAF9F6] text-[#121316] min-h-screen">
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl space-y-4"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-medium">
            About Just Me Ben LTD
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal text-neutral-900 tracking-tight leading-[1.12]">
            Strategic Capital Solutions in Real Estate, Crowdfunding & Private Equity
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed pt-2">
            Just Me Ben LTD is a London-based financial advisory and capital structuring practice led by Marco Beniamino Brioschi. We bridge property developers, ambitious entrepreneurs, and alternative capital providers through customized mezzanine finance, crowdfunding campaign structuring, and private equity syndication.
          </p>
        </motion.div>
      </div>

      {/* Hero Image & Fund Narrative */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mb-24">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[21/9] bg-neutral-900">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
            alt="Modern Financial Architecture"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter brightness-[0.80]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
          <div className="absolute bottom-8 left-8 sm:left-12 right-8 text-white max-w-xl">
            <span className="text-xs uppercase tracking-widest text-cyan-300 font-semibold mb-1 block">
              Institutional Underwriting
            </span>
            <h3 className="text-2xl sm:text-3xl font-light leading-snug">
              Bespoke capital architectures designed to unlock liquidity, minimize equity dilution, and accelerate execution.
            </h3>
          </div>
        </div>
      </div>

      {/* Pillars & Approach */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mb-28">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest text-neutral-500 font-medium">
            Our Core Methodology
          </span>
          <h2 className="text-3xl sm:text-4xl font-normal text-neutral-900 tracking-tight">
            How We Structure & Advise Transactions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white border border-neutral-200/80 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-medium text-neutral-900">Crowdfunding Campaign Advisory</h3>
            <p className="text-sm text-neutral-600 font-light leading-relaxed">
              Full lifecycle guidance for equity and debt crowdfunding campaigns, spanning valuation modeling, FCA/ECSPR regulatory compliance, cornerstone investor syndication, and post-campaign investor relations.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-neutral-200/80 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#3D312A] text-white flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-medium text-neutral-900">Real Estate & Mezzanine Structuring</h3>
            <p className="text-sm text-neutral-600 font-light leading-relaxed">
              Layering subordinated mezzanine debt and private credit to bridge the funding gap (up to 80-85% LTC), reducing developer equity dilution while preserving project upside.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-neutral-200/80 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#2A4354] text-white flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-medium text-neutral-900">Private Equity & Venture Syndication</h3>
            <p className="text-sm text-neutral-600 font-light leading-relaxed">
              Structuring Special Purpose Vehicles (SPVs) and club deals that connect family offices and institutional co-investors with vetted, high-yield off-market opportunities.
            </p>
          </div>
        </div>
      </div>

      {/* Leadership & Investment Committee */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mb-28">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-neutral-500 font-medium">
              Leadership
            </span>
            <h2 className="text-3xl sm:text-4xl font-normal text-neutral-900 tracking-tight mt-1">
              Advisory Leadership & Managing Partners
            </h2>
          </div>
          <button
            onClick={openContactModal}
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-900 hover:text-neutral-600 transition-colors"
          >
            <span>Connect with our Advisory Team</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-3xl overflow-hidden border border-neutral-200/80 shadow-sm hover:shadow-md transition-all p-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900">
                  <img
                    src={member.image}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-neutral-900">{member.name}</h3>
                  <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mt-0.5">
                    {member.role}
                  </p>
                  <p className="text-xs text-neutral-400 font-light mt-0.5">{member.focus}</p>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                  {member.bio}
                </p>
              </div>

              <div className="pt-6 border-t border-neutral-100 flex items-center justify-between text-xs">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-neutral-700 hover:text-neutral-900 font-medium"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn Profile</span>
                </a>
                <button
                  onClick={openContactModal}
                  className="text-neutral-900 font-semibold hover:underline"
                >
                  Inquire
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Box */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="rounded-3xl bg-black text-white p-8 sm:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-normal">
              Exploring an Opportunity or Looking for Capital Advisory?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
              We review property development proposals, mezzanine debt requests, and crowdfunding mandates with discretion and speed.
            </p>
          </div>
          <button
            onClick={openContactModal}
            className="px-6 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-colors shadow-lg cursor-pointer whitespace-nowrap"
          >
            Request Advisory Consultation
          </button>
        </div>
      </div>
    </div>
  );
};
