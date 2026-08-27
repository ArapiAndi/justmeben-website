import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { ScrollProgress } from './components/ScrollProgress';

// Home Sections
import { HeroSection } from './components/Home/HeroSection';
import { AboutSection } from './components/Home/AboutSection';
import { PortfolioShowcase } from './components/Home/PortfolioShowcase';
import { StrengthsSection } from './components/Home/StrengthsSection';
import { BlogPreviewSection } from './components/Home/BlogPreviewSection';
import { FAQSection } from './components/Home/FAQSection';
import { ContactCtaBanner } from './components/Home/ContactCtaBanner';

// Public Pages
import { AboutPage } from './pages/AboutPage';
import { InvestmentCriteriaPage } from './pages/InvestmentCriteriaPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { BlogListPage } from './pages/BlogListPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { DataSubjectRights } from './pages/DataSubjectRights';
import { RiskDisclaimer } from './pages/RiskDisclaimer';
import { TermsOfService } from './pages/TermsOfService';
import { CookiePolicyPage } from './pages/CookiePolicyPage';

// Admin & AI Studio Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ArticleEditor } from './pages/admin/ArticleEditor';

// Chatbot
import Chatbot from './components/Chatbot';

// GDPR & Privacy
import { CookieConsent } from './components/CookieConsent';
import { RiskWarningBanner } from './components/RiskWarningBanner';

const AppContent: React.FC = () => {
  const { currentPage } = useApp();

  // Scroll to top on page transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const renderCurrentView = () => {
    switch (currentPage) {
      case 'home':
        return (
          <main>
            <HeroSection />
            <AboutSection />
            <PortfolioShowcase />
            <StrengthsSection />
            <BlogPreviewSection />
            <FAQSection />
            <ContactCtaBanner />
          </main>
        );
      case 'about':
        return <AboutPage />;
      case 'criteria':
        return <InvestmentCriteriaPage />;
      case 'portfolio':
        return <PortfolioPage />;
      case 'blog':
        return <BlogListPage />;
      case 'blog-detail':
        return <BlogDetailPage />;
      case 'admin':
        return <AdminDashboard />;
      case 'editor':
        return <ArticleEditor />;
      case 'privacy-policy':
        return <PrivacyPolicy />;
      case 'data-subject-rights':
        return <DataSubjectRights />;
      case 'risk-disclaimer':
        return <RiskDisclaimer />;
      case 'terms-of-service':
        return <TermsOfService />;
      case 'cookie-policy':
        return <CookiePolicyPage />;
      default:
        return (
          <main>
            <HeroSection />
            <AboutSection />
            <PortfolioShowcase />
            <StrengthsSection />
            <BlogPreviewSection />
            <FAQSection />
            <ContactCtaBanner />
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] font-['Plus_Jakarta_Sans',sans-serif] text-[#121316] flex flex-col justify-between selection:bg-neutral-900 selection:text-white">
      {/* Risk Warning Banner */}
      <RiskWarningBanner />

      {/* Scroll Progress Indicator & Back-to-Top Ring */}
      <ScrollProgress />

      {/* Persistent Navigation Header */}
      <Header />

      {/* Dynamic Page Views */}
      <div className="flex-grow">{renderCurrentView()}</div>

      {/* Persistent Elegant Footer (hidden in dedicated full-screen editor mode if desired) */}
      {currentPage !== 'editor' && <Footer />}

      {/* Global Interactive Contact / Lead Modal */}
      <ContactModal />

      {/* GDPR Cookie Consent Banner */}
      <CookieConsent />

      {/* AI Chatbot Assistant */}
      <Chatbot />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </LanguageProvider>
  );
}
