import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Clock, Eye, Sparkles, Tag, ArrowRight, BookOpen, Filter } from 'lucide-react';
import { motion } from 'motion/react';

export const BlogListPage: React.FC = () => {
  const { articles, categories, navigateToArticle, setCurrentPage } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Filter only published articles for public readers
  const publishedArticles = articles.filter((a) => a.status === 'published');

  // Filter based on search query, category, and tag
  const filteredArticles = publishedArticles.filter((article) => {
    const matchesSearch =
      searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'all' || article.category === selectedCategory;

    const matchesTag =
      selectedTag === null || article.tags.includes(selectedTag);

    return matchesSearch && matchesCategory && matchesTag;
  });

  // Featured article (first marked as featured or first published)
  const featuredArticle = publishedArticles.find((a) => a.featured) || publishedArticles[0];

  // All unique tags
  const allTags = Array.from(
    new Set(publishedArticles.flatMap((a) => a.tags || []))
  );

  return (
    <div className="pt-28 pb-24 bg-[#FAF9F6] text-[#121316] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header Title & Admin Shortcut */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pt-8 pb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neutral-500">
              <BookOpen className="w-3.5 h-3.5 text-neutral-900" />
              <span>Just Me Ben LTD Advisory Insights</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal text-neutral-900 tracking-tight leading-[1.12]">
              Advisory, Real Estate & Crowdfunding Insights
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed">
              Analisi di mercato, approfondimenti su finanza immobiliare, guide al crowdfunding, debito mezzanino e strategie di private equity.
            </p>
          </div>

          <button
            onClick={() => {
              setCurrentPage('admin');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold shadow-md transition-all self-start md:self-auto cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>Genera Articolo con AI</span>
          </button>
        </div>

        {/* Search & Category Filter Pills */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-neutral-200/80 shadow-sm mb-12 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cerca per titolo o parole chiave (es. Crowdfunding, Mezzanino, Real Estate, Valutazione, Private Equity)..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-neutral-50 border border-neutral-200 text-sm focus:outline-none focus:border-neutral-400 transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs text-neutral-400 font-medium mr-2 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Categoria:
            </span>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedTag(null);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              Tutte le Categorie ({publishedArticles.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.name);
                  setSelectedTag(null);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  selectedCategory === cat.name
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Tag Filter row */}
          {allTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-neutral-100 text-xs">
              <span className="text-neutral-400 mr-2 flex items-center gap-1">
                <Tag className="w-3 h-3" /> Tag popolari:
              </span>
              {allTags.slice(0, 8).map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTag(selectedTag === t ? null : t)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] transition-colors ${
                    selectedTag === t
                      ? 'bg-amber-100 text-amber-900 font-semibold'
                      : 'bg-neutral-50 text-neutral-500 hover:bg-neutral-100'
                  }`}
                >
                  #{t}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Featured Article Card (if no search filter applied) */}
        {!searchQuery && selectedCategory === 'all' && !selectedTag && featuredArticle && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => navigateToArticle(featuredArticle.slug)}
            className="mb-16 rounded-3xl overflow-hidden bg-neutral-950 text-white shadow-2xl cursor-pointer group grid grid-cols-1 lg:grid-cols-12 border border-neutral-800"
          >
            <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden">
              <img
                src={featuredArticle.coverImage}
                alt={featuredArticle.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
              />
              <div className="absolute top-6 left-6 px-3 py-1 rounded-full bg-amber-500/90 text-black text-xs font-bold uppercase tracking-wider">
                In Evidenza
              </div>
            </div>

            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs text-neutral-400">
                  <span className="px-2.5 py-1 rounded-full bg-white/15 text-white text-[11px]">
                    {featuredArticle.category}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {featuredArticle.readingTime}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-normal text-white group-hover:text-amber-200 transition-colors leading-snug">
                  {featuredArticle.title}
                </h2>

                <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                  {featuredArticle.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={featuredArticle.author.avatar}
                    alt={featuredArticle.author.name}
                    className="w-9 h-9 rounded-full object-cover border border-white/20"
                  />
                  <div>
                    <div className="text-xs font-medium text-white">{featuredArticle.author.name}</div>
                    <div className="text-[10px] text-neutral-400">{featuredArticle.author.role}</div>
                  </div>
                </div>

                <span className="flex items-center gap-1 text-xs font-semibold text-white group-hover:translate-x-1 transition-transform">
                  Leggi Articolo <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, idx) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onClick={() => navigateToArticle(article.slug)}
                className="group bg-white rounded-3xl overflow-hidden border border-neutral-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/65 backdrop-blur-md text-[11px] font-medium text-white border border-white/20">
                      {article.category}
                    </span>
                  </div>

                  <div className="p-6 sm:p-7 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-neutral-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readingTime}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {article.viewsCount} visualizzazioni
                      </span>
                    </div>

                    <h3 className="text-xl font-medium text-neutral-900 group-hover:text-neutral-600 transition-colors line-clamp-2 leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-neutral-600 font-light line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-neutral-100 text-xs">
                  <div className="flex items-center gap-2">
                    <img
                      src={article.author.avatar}
                      alt={article.author.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-neutral-700 font-medium truncate max-w-[120px]">
                      {article.author.name}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-neutral-900 font-semibold group-hover:translate-x-1 transition-transform">
                    Leggi <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-4 bg-white rounded-3xl border border-neutral-200">
            <BookOpen className="w-12 h-12 text-neutral-300 mx-auto" />
            <h3 className="text-xl font-medium text-neutral-900">Nessun articolo trovato</h3>
            <p className="text-sm text-neutral-500 max-w-md mx-auto">
              Nessun contenuto corrisponde ai criteri di ricerca. Prova a reimpostare i filtri o genera un nuovo articolo con l'AI.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedTag(null);
              }}
              className="px-5 py-2 rounded-full bg-neutral-900 text-white text-xs font-semibold"
            >
              Reimposta Filtri
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
