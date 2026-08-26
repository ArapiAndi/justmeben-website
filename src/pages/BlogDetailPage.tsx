import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Clock, Eye, Share2, Bookmark, Check, Calendar, User, Sparkles, ChevronRight, Edit3, Link2 } from 'lucide-react';
import { motion } from 'motion/react';

export const BlogDetailPage: React.FC = () => {
  const {
    selectedArticleSlug,
    getArticleBySlug,
    incrementViews,
    setCurrentPage,
    navigateToArticle,
    articles,
    isAdminAuthenticated,
    setEditingArticleId,
  } = useApp();

  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const article = selectedArticleSlug ? getArticleBySlug(selectedArticleSlug) : null;

  useEffect(() => {
    if (selectedArticleSlug) {
      incrementViews(selectedArticleSlug);
    }
  }, [selectedArticleSlug]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!article) {
    return (
      <div className="pt-36 pb-24 max-w-3xl mx-auto px-4 text-center space-y-6">
        <h2 className="text-3xl font-normal text-neutral-900">Articolo non trovato</h2>
        <p className="text-neutral-500">L'articolo richiesto potrebbe essere stato rimosso o spostato.</p>
        <button
          onClick={() => setCurrentPage('blog')}
          className="px-6 py-2.5 rounded-full bg-neutral-900 text-white text-sm font-semibold"
        >
          Torna al Blog
        </button>
      </div>
    );
  }

  // Generate Table of Contents headings from markdown content
  const headings = article.content
    .split('\n')
    .filter((line) => line.startsWith('## '))
    .map((line) => line.replace('## ', '').trim());

  // Related articles (same category or others)
  const relatedArticles = articles
    .filter((a) => a.id !== article.id && a.status === 'published')
    .slice(0, 3);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleEditThisArticle = () => {
    setEditingArticleId(article.id);
    setCurrentPage('editor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper to render basic structured Markdown with typography
  const renderMarkdownContent = (content: string) => {
    const paragraphs = content.split('\n\n');

    return paragraphs.map((block, idx) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      if (trimmed.startsWith('## ')) {
        const title = trimmed.replace('## ', '');
        const anchorId = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return (
          <h2
            key={idx}
            id={anchorId}
            className="text-2xl sm:text-3xl font-normal text-neutral-900 tracking-tight mt-10 mb-4 pt-4 border-t border-neutral-100 scroll-mt-28"
          >
            {title}
          </h2>
        );
      }

      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-xl font-medium text-neutral-900 mt-6 mb-3">
            {trimmed.replace('### ', '')}
          </h3>
        );
      }

      if (trimmed.startsWith('> ')) {
        return (
          <blockquote
            key={idx}
            className="p-6 rounded-2xl bg-neutral-50 border-l-4 border-neutral-900 text-base sm:text-lg italic text-neutral-800 font-light my-6 shadow-xs"
          >
            {trimmed.replace('> ', '')}
          </blockquote>
        );
      }

      if (trimmed.startsWith('---')) {
        return <hr key={idx} className="my-8 border-neutral-200" />;
      }

      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const items = trimmed.split('\n');
        return (
          <ul key={idx} className="space-y-2 my-4 pl-6 list-disc marker:text-neutral-900">
            {items.map((item, i) => (
              <li key={i} className="text-sm sm:text-base text-neutral-700 font-light leading-relaxed">
                {item.replace(/^[-*]\s+/, '')}
              </li>
            ))}
          </ul>
        );
      }

      if (trimmed.match(/^\d+\.\s/)) {
        const items = trimmed.split('\n');
        return (
          <ol key={idx} className="space-y-2 my-4 pl-6 list-decimal marker:text-neutral-900 font-light">
            {items.map((item, i) => (
              <li key={i} className="text-sm sm:text-base text-neutral-700 leading-relaxed">
                {item.replace(/^\d+\.\s+/, '')}
              </li>
            ))}
          </ol>
        );
      }

      return (
        <p key={idx} className="text-base sm:text-lg text-neutral-700 font-light leading-relaxed my-4">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="pt-24 pb-28 bg-[#FAF9F6] text-[#121316] min-h-screen">
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-transparent z-50">
        <div
          className="h-full bg-neutral-900 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation & Actions Bar */}
        <div className="flex items-center justify-between pt-6 pb-8 border-b border-neutral-200/80">
          <button
            onClick={() => {
              setCurrentPage('blog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Tutti gli Articoli</span>
          </button>

          <div className="flex items-center gap-3">
            {isAdminAuthenticated && (
              <button
                onClick={handleEditThisArticle}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/15 text-amber-900 border border-amber-300 text-xs font-semibold hover:bg-amber-500/25 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Modifica nel CMS</span>
              </button>
            )}

            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-neutral-200 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors shadow-xs cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copiato!' : 'Condividi'}</span>
            </button>
          </div>
        </div>

        {/* Article Header & Metadata */}
        <div className="pt-8 pb-10 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3.5 py-1 rounded-full bg-neutral-900 text-white text-xs font-medium">
              {article.category}
            </span>
            <span className="text-xs text-neutral-400">•</span>
            <span className="flex items-center gap-1 text-xs text-neutral-500">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(article.publishedAt).toLocaleDateString('it-IT', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <span className="text-xs text-neutral-400">•</span>
            <span className="flex items-center gap-1 text-xs text-neutral-500">
              <Clock className="w-3.5 h-3.5" />
              {article.readingTime}
            </span>
            <span className="text-xs text-neutral-400">•</span>
            <span className="flex items-center gap-1 text-xs text-neutral-500">
              <Eye className="w-3.5 h-3.5" />
              {article.viewsCount} letture
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal text-neutral-900 tracking-tight leading-[1.14]">
            {article.title}
          </h1>

          <p className="text-lg sm:text-xl text-neutral-600 font-light leading-relaxed">
            {article.excerpt}
          </p>

          {/* Author Card */}
          <div className="flex items-center gap-3 pt-2">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-11 h-11 rounded-full object-cover border border-neutral-300"
            />
            <div>
              <div className="text-sm font-semibold text-neutral-900">{article.author.name}</div>
              <div className="text-xs text-neutral-500 font-light">{article.author.role}</div>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="rounded-3xl overflow-hidden shadow-xl aspect-[16/9] mb-12 bg-neutral-900">
          <img
            src={article.coverImage}
            alt={article.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* AI Key Takeaways Callout Card */}
        {article.keyTakeaways && article.keyTakeaways.length > 0 && (
          <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-amber-500/10 border border-amber-300/60 text-amber-950 space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-900">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Punti Chiave & Executive Summary</span>
            </div>
            <ul className="space-y-2 pt-1">
              {article.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Table of Contents Box (if multiple headings) */}
        {headings.length > 1 && (
          <div className="p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-xs mb-10 space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-neutral-400">
              Indice dei Contenuti
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {headings.map((h, i) => {
                const anchor = h.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                return (
                  <a
                    key={i}
                    href={`#${anchor}`}
                    className="text-neutral-700 hover:text-neutral-950 hover:underline flex items-center gap-1.5 py-0.5 truncate"
                  >
                    <span className="text-neutral-400 font-mono text-[10px]">0{i + 1}.</span>
                    <span className="truncate">{h}</span>
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* Main Article Body */}
        <div className="prose prose-neutral max-w-none text-neutral-800 font-light leading-relaxed mb-16">
          {renderMarkdownContent(article.content)}
        </div>

        {/* Internal Link Suggestions */}
        {article.internalLinkSuggestions && article.internalLinkSuggestions.length > 0 && (
          <div className="my-12 p-6 sm:p-8 rounded-3xl bg-neutral-900 text-white space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cyan-300">
              <Link2 className="w-4 h-4" />
              <span>Approfondimenti & Risorse Just Me Ben LTD</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {article.internalLinkSuggestions.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    const page = link.suggestedPage.replace('/', '');
                    setCurrentPage(page || 'home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-left p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 transition-all group"
                >
                  <div className="text-xs text-neutral-300 font-light mb-1">{link.context}</div>
                  <div className="text-sm font-semibold text-white group-hover:text-cyan-300 flex items-center justify-between">
                    <span>{link.anchorText}</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tags row */}
        {article.tags && article.tags.length > 0 && (
          <div className="py-6 border-t border-b border-neutral-200 flex flex-wrap items-center gap-2">
            <span className="text-xs text-neutral-400 font-medium mr-2">Tag Articolo:</span>
            {article.tags.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-xs font-medium"
              >
                #{t}
              </span>
            ))}
          </div>
        )}

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <div className="pt-16 space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-normal text-neutral-900 tracking-tight">
                Altri Articoli Consigliati
              </h3>
              <button
                onClick={() => {
                  setCurrentPage('blog');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-semibold text-neutral-900 hover:underline"
              >
                Vedi Tutti
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => navigateToArticle(rel.slug)}
                  className="group bg-white rounded-2xl overflow-hidden border border-neutral-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[16/10] overflow-hidden bg-neutral-900">
                      <img
                        src={rel.coverImage}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="text-[11px] font-medium text-neutral-500">{rel.category}</div>
                      <h4 className="text-sm font-medium text-neutral-900 line-clamp-2 group-hover:text-neutral-600 transition-colors">
                        {rel.title}
                      </h4>
                    </div>
                  </div>
                  <div className="p-4 pt-0 text-[11px] text-neutral-400 flex items-center justify-between">
                    <span>{rel.readingTime}</span>
                    <span className="font-semibold text-neutral-900">Leggi →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
