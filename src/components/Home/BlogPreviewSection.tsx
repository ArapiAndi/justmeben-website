import React from 'react';
import { useApp } from '../../context/AppContext';
import { motion } from 'motion/react';
import { ArrowRight, Clock, Eye, Sparkles, BookOpen } from 'lucide-react';

export const BlogPreviewSection: React.FC = () => {
  const { articles, navigateToArticle, setCurrentPage } = useApp();

  const publishedArticles = articles
    .filter((a) => a.status === 'published')
    .slice(0, 3);

  return (
    <section
      id="blog-preview-section"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#FAF9F6] text-[#121316]"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#155e78] px-3 py-1.5 rounded-full bg-[#2596be]/8 border border-[#2596be]/20 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2596be]" />
              <span>Research & Insights</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-neutral-900 leading-[1.15]">
              Real Estate, Crowdfunding & Alternative Finance
            </h2>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            id="view-all-insights-btn"
            onClick={() => {
              setCurrentPage('blog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 text-white text-xs sm:text-sm font-medium hover:bg-neutral-800 transition-all cursor-pointer self-start sm:self-auto shadow-md"
          >
            <span>All Articles & Reports</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {publishedArticles.map((article, idx) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 45, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.65, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -12, scale: 1.03, boxShadow: '0 32px 56px -12px rgba(37, 150, 190, 0.15)' }}
              onClick={() => navigateToArticle(article.slug)}
              className="group flex flex-col justify-between bg-white rounded-2xl overflow-hidden border border-neutral-200/60 shadow-sm hover:shadow-md hover:border-neutral-300 transition-all duration-300 cursor-pointer"
            >
              <div>
                <motion.div
                  className="relative aspect-[16/10] overflow-hidden bg-neutral-900"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.img
                    src={article.coverImage}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    whileHover={{ scale: 1.12 }}
                    transition={{ duration: 0.8 }}
                    className="w-full h-full object-cover"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
                    animate={{ opacity: [0, 0.1, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.span
                    initial={{ opacity: 0, y: -8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.15 + 0.2 }}
                    className="absolute top-5 left-5 px-4 py-2 rounded-full bg-gradient-to-r from-[#2596be] to-[#1d7b9c] backdrop-blur-xl text-[11px] font-semibold text-white border border-white/30 shadow-lg shadow-[#2596be]/20"
                  >
                    {article.category}
                  </motion.span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.15 + 0.2 }}
                  className="p-7 space-y-4"
                >
                  <div className="flex items-center gap-4 text-xs text-neutral-500 font-medium">
                    <motion.span
                      className="flex items-center gap-1.5"
                      whileHover={{ x: 2 }}
                    >
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-3 h-3 rounded-full bg-[#2596be] opacity-70"
                      />
                      {article.readingTime}
                    </motion.span>
                    <span className="text-neutral-300">•</span>
                    <span className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-[#2596be]/70" />
                      {article.viewsCount || 100}
                    </span>
                  </div>

                  <motion.h3
                    className="text-xl font-semibold text-neutral-900 group-hover:text-[#2596be] transition-colors line-clamp-2 leading-snug"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.3 }}
                  >
                    {article.title}
                  </motion.h3>

                  <p className="text-sm text-neutral-600 font-light line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.15 + 0.25 }}
                className="px-7 py-5 flex items-center justify-between border-t border-neutral-100 text-xs text-neutral-700 font-medium group-hover:text-[#2596be] transition-colors"
              >
                <span className="text-neutral-500 group-hover:text-neutral-700">{article.author.name}</span>
                <motion.span
                  className="inline-flex items-center gap-2 text-[#2596be] font-semibold"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.3 }}
                >
                  Leggi
                  <motion.div animate={{ x: [0, 2, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </motion.span>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
