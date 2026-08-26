import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BlogPost, ArticleStatus } from '../../types';
import { AiArticleGeneratorModal } from './AiArticleGeneratorModal';
import {
  FileText,
  Sparkles,
  Plus,
  Search,
  Filter,
  Eye,
  Edit3,
  Copy,
  Trash2,
  Lock,
  Unlock,
  TrendingUp,
  BarChart3,
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { motion } from 'motion/react';

export const AdminDashboard: React.FC = () => {
  const {
    articles,
    categories,
    deleteArticle,
    duplicateArticle,
    addArticle,
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
    setCurrentPage,
    navigateToArticle,
    setEditingArticleId,
    isAiModalOpen,
    setIsAiModalOpen,
  } = useApp();

  // Login form state
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Table filtering state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | ArticleStatus>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Category management modal
  const [showCategoryManager, setShowCategoryManager] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = loginAdmin(passwordInput);
    if (!ok) {
      setLoginError(true);
    }
  };

  // Quick action: Create blank manual article
  const handleCreateManualArticle = () => {
    const newPost = addArticle({
      title: 'Nuovo Articolo Senza Titolo',
      slug: `nuovo-articolo-${Date.now().toString().slice(-4)}`,
      excerpt: 'Inserisci qui un breve estratto per i lettori...',
      content: '## 1. Introduzione\n\nInizia a scrivere qui...',
      coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80',
      category: categories[0]?.name || 'Crowdfunding',
      tags: ['Crowdfunding'],
      author: {
        name: 'Marco Beniamino Brioschi',
        role: 'Managing Director & Capital Advisor',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      },
      readingTime: '3 min',
      status: 'draft',
      publishedAt: new Date().toISOString(),
      metaTitle: 'Nuovo Articolo | Just Me Ben LTD',
      metaDescription: 'Descrizione per i motori di ricerca.',
      primaryKeywords: ['Crowdfunding'],
      secondaryKeywords: [],
      featured: false,
    });
    setEditingArticleId(newPost.id);
    setCurrentPage('editor');
  };

  // Open editor for existing article
  const handleEdit = (id: string) => {
    setEditingArticleId(id);
    setCurrentPage('editor');
  };

  // Duplicate an article
  const handleDuplicate = (id: string) => {
    const dup = duplicateArticle(id);
    if (dup) {
      setEditingArticleId(dup.id);
      setCurrentPage('editor');
    }
  };

  // Filter articles
  const filteredArticles = articles.filter((art) => {
    const matchesSearch =
      searchQuery === '' ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || art.status === statusFilter;
    const matchesCat = categoryFilter === 'all' || art.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCat;
  });

  // Calculate metrics
  const totalViews = articles.reduce((acc, a) => acc + (a.viewsCount || 0), 0);
  const publishedCount = articles.filter((a) => a.status === 'published').length;
  const draftCount = articles.filter((a) => a.status === 'draft').length;
  const scheduledCount = articles.filter((a) => a.status === 'scheduled').length;

  // IF NOT LOGGED IN -> Show Login Screen
  if (!isAdminAuthenticated) {
    return (
      <div className="pt-32 pb-24 px-4 min-h-screen bg-[#FAF9F6] flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-neutral-200 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-neutral-900 text-white flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-normal text-neutral-900 tracking-tight">
              Pannello Amministrativo CMS
            </h2>
            <p className="text-xs text-neutral-500 font-light">
              Gestione contenuti, pubblicazione e generatore AI di SIWA Capital.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                Password Amministratore
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setLoginError(false);
                }}
                placeholder="Inserisci password (demo: siwa2025)"
                className="w-full px-4 py-3 rounded-2xl bg-neutral-50 border border-neutral-200 text-sm focus:outline-none focus:border-neutral-400"
              />
              {loginError && (
                <p className="text-xs text-rose-600 mt-1">Password non corretta. Prova con "siwa2025" o usa il pulsante rapido demo.</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-neutral-900 text-white font-semibold text-sm hover:bg-neutral-800 transition-colors shadow-md cursor-pointer"
            >
              Accedi alla Dashboard
            </button>
          </form>

          {/* Quick Demo Access */}
          <div className="pt-4 border-t border-neutral-100 text-center">
            <button
              type="button"
              onClick={() => loginAdmin('siwa2025')}
              className="inline-flex items-center gap-2 text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 px-4 py-2 rounded-full border border-amber-200 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Accesso Rapido Demo (1-Click)</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 bg-[#FAF9F6] text-[#121316] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Top Bar with Admin Welcome & Action Buttons */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-neutral-200 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-700">
              <ShieldCheck className="w-4 h-4" />
              <span>Amministrazione & AI Content Studio</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-normal text-neutral-900 tracking-tight mt-1">
              Pannello di Controllo Blog & AI
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black text-xs font-bold shadow-md hover:brightness-105 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Genera con AI</span>
            </button>

            <button
              onClick={handleCreateManualArticle}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Nuovo Articolo</span>
            </button>

            <button
              onClick={logoutAdmin}
              className="px-3.5 py-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-medium transition-colors"
            >
              Esci
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 my-8">
          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-xs space-y-1">
            <div className="text-xs text-neutral-400 font-medium">Totale Articoli</div>
            <div className="text-3xl sm:text-4xl font-light text-neutral-900">{articles.length}</div>
            <div className="text-[11px] text-neutral-500">Nel database editoriale</div>
          </div>

          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-xs space-y-1">
            <div className="text-xs text-emerald-600 font-medium">Articoli Pubblicati</div>
            <div className="text-3xl sm:text-4xl font-light text-emerald-700">{publishedCount}</div>
            <div className="text-[11px] text-neutral-500">Visibili pubblicamente</div>
          </div>

          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-xs space-y-1">
            <div className="text-xs text-amber-600 font-medium">Bozze & Programmati</div>
            <div className="text-3xl sm:text-4xl font-light text-amber-700">
              {draftCount + scheduledCount}
            </div>
            <div className="text-[11px] text-neutral-500">{scheduledCount} programmati</div>
          </div>

          <div className="p-5 sm:p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-xs space-y-1">
            <div className="text-xs text-neutral-400 font-medium">Visualizzazioni Totali</div>
            <div className="text-3xl sm:text-4xl font-light text-neutral-900">{totalViews}</div>
            <div className="text-[11px] text-neutral-500">Letture certificate</div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-neutral-200 shadow-sm mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filtra per titolo o categoria..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-xs focus:outline-none focus:border-neutral-400"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Status tabs */}
            <div className="flex bg-neutral-100 p-1 rounded-xl text-xs font-medium">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  statusFilter === 'all' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600'
                }`}
              >
                Tutti ({articles.length})
              </button>
              <button
                onClick={() => setStatusFilter('published')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  statusFilter === 'published' ? 'bg-white text-emerald-700 shadow-xs font-semibold' : 'text-neutral-600'
                }`}
              >
                Pubblicati ({publishedCount})
              </button>
              <button
                onClick={() => setStatusFilter('draft')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  statusFilter === 'draft' ? 'bg-white text-amber-700 shadow-xs font-semibold' : 'text-neutral-600'
                }`}
              >
                Bozze ({draftCount})
              </button>
            </div>

            {/* Category select */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-medium text-neutral-700"
            >
              <option value="all">Tutte le categorie</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Articles Table */}
        <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-50 text-neutral-500 uppercase tracking-wider font-semibold border-b border-neutral-200">
                <tr>
                  <th className="py-4 px-6">Articolo</th>
                  <th className="py-4 px-4">Categoria</th>
                  <th className="py-4 px-4">Stato</th>
                  <th className="py-4 px-4">Letture</th>
                  <th className="py-4 px-4">Data</th>
                  <th className="py-4 px-6 text-right">Azioni</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredArticles.map((art) => (
                  <tr key={art.id} className="hover:bg-neutral-50/70 transition-colors group">
                    {/* Title and Excerpt */}
                    <td className="py-4 px-6 max-w-sm">
                      <div className="flex items-center gap-3">
                        <img
                          src={art.coverImage}
                          alt=""
                          className="w-12 h-12 rounded-xl object-cover shrink-0 border border-neutral-200"
                        />
                        <div className="min-w-0">
                          <div
                            onClick={() => handleEdit(art.id)}
                            className="font-medium text-neutral-900 hover:text-neutral-600 cursor-pointer truncate text-sm"
                          >
                            {art.title}
                          </div>
                          <div className="text-[11px] text-neutral-400 font-mono truncate">
                            /{art.slug}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-700 font-medium">
                        {art.category}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-semibold ${
                          art.status === 'published'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : art.status === 'scheduled'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {art.status === 'published' ? '● Pubblicato' : art.status === 'scheduled' ? '◷ Programmato' : '○ Bozza'}
                      </span>
                    </td>

                    {/* Views */}
                    <td className="py-4 px-4 text-neutral-600 font-medium">
                      {art.viewsCount || 0}
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 text-neutral-500">
                      {new Date(art.publishedAt || art.createdAt).toLocaleDateString('it-IT')}
                    </td>

                    {/* Action buttons */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => navigateToArticle(art.slug)}
                          title="Visualizza articolo pubblico"
                          className="p-2 rounded-lg hover:bg-neutral-200 text-neutral-600 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleEdit(art.id)}
                          title="Modifica nell'Editor"
                          className="p-2 rounded-lg bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-800 transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDuplicate(art.id)}
                          title="Duplica bozza"
                          className="p-2 rounded-lg hover:bg-neutral-200 text-neutral-600 transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`Eliminare l'articolo "${art.title}"?`)) {
                              deleteArticle(art.id);
                            }
                          }}
                          title="Elimina articolo"
                          className="p-2 rounded-lg hover:bg-rose-100 text-rose-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredArticles.length === 0 && (
              <div className="py-12 text-center text-neutral-400">
                Nessun articolo corrisponde ai filtri selezionati.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AI Generator Modal */}
      <AiArticleGeneratorModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onArticleGenerated={(id) => {
          setEditingArticleId(id);
          setCurrentPage('editor');
        }}
      />
    </div>
  );
};
