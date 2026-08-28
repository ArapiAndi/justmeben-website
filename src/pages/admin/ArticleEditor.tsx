import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { BlogPost, ArticleStatus } from '../../types';
import {
  ArrowLeft,
  Save,
  Eye,
  Trash2,
  Sparkles,
  Heading,
  Bold,
  Italic,
  List,
  Quote,
  Link,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Clock,
  Calendar,
  Layers,
  Wand2,
  ExternalLink,
  ChevronRight,
  Globe,
  Tag,
  Copy,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ArticleEditor: React.FC = () => {
  const {
    editingArticleId,
    articles,
    categories,
    updateArticle,
    deleteArticle,
    setCurrentPage,
    navigateToArticle,
    adminToken,
  } = useApp();

  const article = articles.find((a) => a.id === editingArticleId);

  // Local form state
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(categories[0]?.name || 'Strategia & Crescita');
  const [coverImage, setCoverImage] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTagInput, setNewTagInput] = useState('');
  const [status, setStatus] = useState<ArticleStatus>('draft');
  const [scheduledDate, setScheduledDate] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [primaryKeywords, setPrimaryKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState('');
  const [readingTime, setReadingTime] = useState('5 min');

  // UI state
  const [activeTab, setActiveTab] = useState<'editor' | 'seo' | 'ai-assistant'>('editor');
  const [previewMode, setPreviewMode] = useState<'split' | 'edit-only' | 'preview-only'>('split');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [saveErrorNotice, setSaveErrorNotice] = useState('');

  // Curated cover image presets
  const imagePresets = [
    { label: 'Uffici & Finanza', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80' },
    { label: 'Strategia Digitale', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80' },
    { label: 'Servizi Industriali', url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=80' },
    { label: 'Meeting Esecutivo', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80' },
    { label: 'Tecnologia & Software', url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=80' },
  ];

  // Populate data
  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setSlug(article.slug);
      setExcerpt(article.excerpt);
      setContent(article.content);
      setCategory(article.category);
      setCoverImage(article.coverImage);
      setTags(article.tags || []);
      setStatus(article.status);
      setScheduledDate(article.scheduledDate || '');
      setMetaTitle(article.metaTitle || article.title);
      setMetaDescription(article.metaDescription || article.excerpt);
      setPrimaryKeywords(article.primaryKeywords || []);
      setReadingTime(article.readingTime || '5 min');
    }
  }, [article]);

  if (!article) {
    return (
      <div className="pt-36 pb-20 max-w-2xl mx-auto text-center px-4 space-y-4">
        <h2 className="text-2xl font-medium text-neutral-900">Nessun articolo selezionato</h2>
        <button
          onClick={() => setCurrentPage('admin')}
          className="px-6 py-2.5 rounded-full bg-neutral-900 text-white text-xs font-semibold"
        >
          Torna alla Dashboard
        </button>
      </div>
    );
  }

  // Calculate Reading Time dynamically from content
  const handleContentChange = (newVal: string) => {
    setContent(newVal);
    const words = newVal.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    setReadingTime(`${minutes} min`);
  };

  // Markdown Toolbar actions
  const insertMarkdown = (prefix: string, suffix: string = '') => {
    const textarea = document.getElementById('markdown-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end) || 'testo';
    const replacement = `${prefix}${selectedText}${suffix}`;

    const updated = content.substring(0, start) + replacement + content.substring(end);
    handleContentChange(updated);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
    }, 50);
  };

  const validateForm = (): Record<string, string> => {
    const errors: Record<string, string> = {};

    // Title validation
    if (!title.trim()) {
      errors.title = 'Titolo obbligatorio';
    } else if (title.length < 3) {
      errors.title = 'Titolo deve contenere almeno 3 caratteri';
    } else if (title.length > 200) {
      errors.title = 'Titolo non può superare 200 caratteri';
    }

    // Slug validation
    if (!slug.trim()) {
      errors.slug = 'Slug obbligatorio';
    } else if (!/^[a-z0-9-]+$/.test(slug)) {
      errors.slug = 'Slug: solo minuscole, numeri e trattini';
    } else if (slug.length < 3 || slug.length > 100) {
      errors.slug = 'Slug deve essere 3-100 caratteri';
    } else {
      const duplicateSlug = articles.find((a) => a.id !== article.id && a.slug === slug);
      if (duplicateSlug) {
        errors.slug = 'Questo slug è già utilizzato';
      }
    }

    // Content validation
    if (!content.trim()) {
      errors.content = 'Contenuto obbligatorio';
    } else if (content.trim().length < 50) {
      errors.content = 'Contenuto deve avere almeno 50 caratteri';
    }

    // Excerpt validation
    if (excerpt && excerpt.length > 300) {
      errors.excerpt = 'Estratto non può superare 300 caratteri';
    }

    // Meta validation
    if (metaTitle && metaTitle.length > 65) {
      errors.metaTitle = 'Meta title non può superare 65 caratteri';
    }

    if (metaDescription && metaDescription.length > 165) {
      errors.metaDescription = 'Meta description non può superare 165 caratteri';
    }

    return errors;
  };

  const handleSave = (targetStatus?: ArticleStatus) => {
    const errors = validateForm();
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      setSaveErrorNotice('Correggi gli errori prima di salvare');
      setTimeout(() => setSaveErrorNotice(''), 3000);
      return;
    }

    const finalStatus = targetStatus || status;
    updateArticle(article.id, {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      excerpt,
      content,
      category,
      coverImage,
      tags,
      status: finalStatus,
      scheduledDate,
      metaTitle,
      metaDescription,
      primaryKeywords,
      readingTime,
    });

    if (finalStatus === 'published' && status !== 'published') {
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch {}
    }

    setSaveSuccessNotice(true);
    setTimeout(() => setSaveSuccessNotice(false), 2500);
    setValidationErrors({});
  };

  // AI Copilot Actions
  const handleAiOptimizeSeo = async () => {
    setIsAiLoading(true);
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (adminToken) {
        headers['Authorization'] = 'Bearer ' + adminToken;
      }
      const res = await fetch('/api/generate-seo', {
        method: 'POST',
        headers,
        body: JSON.stringify({ title, content, category }),
      });
      const data = await res.json();
      if (data.metaTitle) setMetaTitle(data.metaTitle);
      if (data.metaDescription) setMetaDescription(data.metaDescription);
      if (data.keywords && Array.isArray(data.keywords)) setPrimaryKeywords(data.keywords);
    } catch (e) {
      console.warn('AI SEO fallback', e);
      setMetaTitle(title.slice(0, 50) + ' | Justmeben LTD');
      setMetaDescription(excerpt.slice(0, 150) + '...');
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleAiExpandSection = async () => {
    setIsAiLoading(true);
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (adminToken) {
        headers['Authorization'] = 'Bearer ' + adminToken;
      }
      const res = await fetch('/api/expand-section', {
        method: 'POST',
        headers,
        body: JSON.stringify({ sectionTitle: title, context: excerpt }),
      });
      const data = await res.json();
      if (data.expandedContent) {
        handleContentChange(content + '\n\n' + data.expandedContent);
      }
    } catch (e) {
      console.warn('AI Expand fallback', e);
      const fallbackContent = '\n\n## 4. Nuove Opportunita\nImplementazione di processi digitalizzati consente di ridurre i costi operativi.';
      handleContentChange(content + fallbackContent);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Tags management
  const handleAddTag = () => {
    if (newTagInput.trim() && !tags.includes(newTagInput.trim())) {
      setTags([...tags, newTagInput.trim()]);
      setNewTagInput('');
    }
  };

  const handleRemoveTag = (tToRemove: string) => {
    setTags(tags.filter((t) => t !== tToRemove));
  };

  // SEO Score Calculator
  const calcSeoScore = () => {
    let score = 30;
    if (metaTitle.length >= 40 && metaTitle.length <= 65) score += 25;
    if (metaDescription.length >= 120 && metaDescription.length <= 165) score += 25;
    if (slug.length > 5 && !slug.includes(' ')) score += 10;
    if (primaryKeywords.length >= 2) score += 10;
    return Math.min(score, 100);
  };

  const seoScore = calcSeoScore();

  return (
    <div className="pt-24 pb-24 bg-[#FAF9F6] text-[#121316] min-h-screen">
      {/* Top Fixed Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-neutral-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage('admin')}
              className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-neutral-800" />
            </button>
            <div>
              <div className="text-xs text-neutral-400 font-medium">Editor Articolo</div>
              <h1 className="text-base font-semibold text-neutral-900 truncate max-w-sm sm:max-w-md">
                {title || 'Nuovo Articolo'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {saveSuccessNotice && (
              <span className="text-xs text-emerald-600 font-medium flex items-center gap-1 animate-pulse">
                <CheckCircle2 className="w-3.5 h-3.5" /> Salvato con successo!
              </span>
            )}
            {saveErrorNotice && (
              <span className="text-xs text-rose-600 font-medium flex items-center gap-1 animate-pulse">
                <AlertCircle className="w-3.5 h-3.5" /> {saveErrorNotice}
              </span>
            )}

            <button
              onClick={() => navigateToArticle(article.slug)}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Anteprima Live</span>
            </button>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ArticleStatus)}
              className={`px-3 py-2 rounded-full text-xs font-semibold border ${
                status === 'published'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                  : status === 'scheduled'
                  ? 'bg-blue-50 text-blue-700 border-blue-300'
                  : 'bg-amber-50 text-amber-700 border-amber-300'
              }`}
            >
              <option value="draft">Bozza (Draft)</option>
              <option value="scheduled">Programmato (Scheduled)</option>
              <option value="published">Pubblicato (Live)</option>
            </select>

            <button
              onClick={() => handleSave()}
              disabled={Object.keys(validationErrors).length > 0}
              className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold shadow-md transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Salva Modifiche</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Form, Metadata, and Markdown Editor */}
          <div className="lg:col-span-8 space-y-6">
            {/* Essential Metadata Card */}
            <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Titolo dell'Articolo
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (validationErrors.title) {
                      setValidationErrors({ ...validationErrors, title: '' });
                    }
                  }}
                  placeholder="Titolo accattivante per SEO e lettori..."
                  className={`w-full px-4 py-2.5 rounded-xl bg-neutral-50 border text-base font-semibold text-neutral-900 focus:outline-none transition-colors ${
                    validationErrors.title ? 'border-rose-300 focus:border-rose-400' : 'border-neutral-200 focus:border-neutral-400'
                  }`}
                />
                {validationErrors.title && (
                  <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {validationErrors.title}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                    Slug URL
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => {
                      setSlug(e.target.value);
                      if (validationErrors.slug) {
                        setValidationErrors({ ...validationErrors, slug: '' });
                      }
                    }}
                    placeholder="es. visibilita-online-b2b"
                    className={`w-full px-3.5 py-2 rounded-xl bg-neutral-50 border text-xs font-mono text-neutral-700 focus:outline-none transition-colors ${
                      validationErrors.slug ? 'border-rose-300 focus:border-rose-400' : 'border-neutral-200 focus:border-neutral-400'
                    }`}
                  />
                  {validationErrors.slug && (
                    <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {validationErrors.slug}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                    Categoria
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-medium text-neutral-900 focus:outline-none focus:border-neutral-400"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Introduzione / Estratto (Excerpt)
                </label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Breve sintesi visualizzata nelle card di anteprima..."
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-700 focus:outline-none focus:border-neutral-400 resize-none"
                />
              </div>

              {/* Cover Image URL & Presets */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1">
                  Immagine di Copertina
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 px-3.5 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-mono text-neutral-700 focus:outline-none focus:border-neutral-400"
                  />
                </div>
                {/* Preset Chips */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className="text-[10px] text-neutral-400 self-center">Preset:</span>
                  {imagePresets.map((p, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setCoverImage(p.url)}
                      className="px-2 py-0.5 rounded-md bg-neutral-100 hover:bg-neutral-200 text-[10px] text-neutral-600 font-medium"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Markdown Editor Box */}
            <div className={`bg-white rounded-3xl border shadow-sm overflow-hidden flex flex-col transition-colors ${
              validationErrors.content ? 'border-rose-300' : 'border-neutral-200'
            }`}>
              {validationErrors.content && (
                <div className="bg-rose-50 border-b border-rose-200 px-4 py-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  <p className="text-xs text-rose-600 font-medium">{validationErrors.content}</p>
                </div>
              )}
              {/* Formatting Toolbar */}
              <div className="p-3 bg-neutral-50 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => insertMarkdown('## ')}
                    title="Intestazione 2 (H2)"
                    className="p-1.5 rounded-lg hover:bg-neutral-200 text-neutral-700 text-xs font-bold"
                  >
                    H2
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdown('### ')}
                    title="Intestazione 3 (H3)"
                    className="p-1.5 rounded-lg hover:bg-neutral-200 text-neutral-700 text-xs font-bold"
                  >
                    H3
                  </button>
                  <div className="w-[1px] h-4 bg-neutral-300 mx-1" />
                  <button
                    type="button"
                    onClick={() => insertMarkdown('**', '**')}
                    title="Grassetto"
                    className="p-1.5 rounded-lg hover:bg-neutral-200 text-neutral-700"
                  >
                    <Bold className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdown('*', '*')}
                    title="Corsivo"
                    className="p-1.5 rounded-lg hover:bg-neutral-200 text-neutral-700"
                  >
                    <Italic className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdown('> ')}
                    title="Citazione"
                    className="p-1.5 rounded-lg hover:bg-neutral-200 text-neutral-700"
                  >
                    <Quote className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdown('- ')}
                    title="Elenco puntato"
                    className="p-1.5 rounded-lg hover:bg-neutral-200 text-neutral-700"
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertMarkdown('[Testo link](', ')')}
                    title="Inserisci Link"
                    className="p-1.5 rounded-lg hover:bg-neutral-200 text-neutral-700"
                  >
                    <Link className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* View toggles */}
                <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-neutral-200 text-[11px] font-medium">
                  <button
                    onClick={() => setPreviewMode('edit-only')}
                    className={`px-2.5 py-1 rounded-lg transition-colors ${
                      previewMode === 'edit-only' ? 'bg-neutral-900 text-white' : 'text-neutral-600'
                    }`}
                  >
                    Solo Testo
                  </button>
                  <button
                    onClick={() => setPreviewMode('split')}
                    className={`px-2.5 py-1 rounded-lg transition-colors ${
                      previewMode === 'split' ? 'bg-neutral-900 text-white' : 'text-neutral-600'
                    }`}
                  >
                    Affiancato
                  </button>
                  <button
                    onClick={() => setPreviewMode('preview-only')}
                    className={`px-2.5 py-1 rounded-lg transition-colors ${
                      previewMode === 'preview-only' ? 'bg-neutral-900 text-white' : 'text-neutral-600'
                    }`}
                  >
                    Anteprima
                  </button>
                </div>
              </div>

              {/* Textarea / Split View Area */}
              <div className="grid grid-cols-1 md:grid-cols-12 min-h-[420px]">
                {previewMode !== 'preview-only' && (
                  <div
                    className={`${
                      previewMode === 'split' ? 'md:col-span-6 border-r border-neutral-200' : 'md:col-span-12'
                    } p-4`}
                  >
                    <textarea
                      id="markdown-textarea"
                      value={content}
                      onChange={(e) => {
                        handleContentChange(e.target.value);
                        if (validationErrors.content) {
                          setValidationErrors({ ...validationErrors, content: '' });
                        }
                      }}
                      placeholder="Scrivi il contenuto dell'articolo in formato Markdown..."
                      className={`w-full h-full min-h-[400px] bg-transparent text-sm font-mono text-neutral-800 focus:outline-none resize-none leading-relaxed ${
                        validationErrors.content ? 'ring-2 ring-rose-300 ring-inset' : ''
                      }`}
                    />
                  </div>
                )}

                {previewMode !== 'edit-only' && (
                  <div
                    className={`${
                      previewMode === 'split' ? 'md:col-span-6' : 'md:col-span-12'
                    } p-6 bg-neutral-50/50 overflow-y-auto max-h-[500px] text-xs sm:text-sm text-neutral-800 leading-relaxed space-y-3`}
                  >
                    <div className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 mb-2">
                      Anteprima Tipografica Live
                    </div>
                    {content.split('\n\n').map((para, i) => {
                      if (para.startsWith('## ')) {
                        return (
                          <h2 key={i} className="text-lg font-semibold text-neutral-900 pt-2">
                            {para.replace('## ', '')}
                          </h2>
                        );
                      }
                      if (para.startsWith('### ')) {
                        return (
                          <h3 key={i} className="text-sm font-medium text-neutral-900 pt-1">
                            {para.replace('### ', '')}
                          </h3>
                        );
                      }
                      if (para.startsWith('> ')) {
                        return (
                          <blockquote key={i} className="p-3 bg-neutral-100 border-l-2 border-neutral-800 italic text-neutral-700">
                            {para.replace('> ', '')}
                          </blockquote>
                        );
                      }
                      return <p key={i}>{para}</p>;
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: AI Assistant, SEO, and Tags */}
          <div className="lg:col-span-4 space-y-6">
            {/* Mode Switch Tabs */}
            <div className="flex rounded-2xl bg-white p-1 border border-neutral-200 shadow-sm text-xs font-semibold">
              <button
                onClick={() => setActiveTab('editor')}
                className={`flex-1 py-2 rounded-xl transition-colors flex items-center justify-center gap-1.5 ${
                  activeTab === 'editor' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Tag className="w-3.5 h-3.5" />
                <span>Tag & Info</span>
              </button>

              <button
                onClick={() => setActiveTab('seo')}
                className={`flex-1 py-2 rounded-xl transition-colors flex items-center justify-center gap-1.5 ${
                  activeTab === 'seo' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>SEO Score ({seoScore}%)</span>
              </button>

              <button
                onClick={() => setActiveTab('ai-assistant')}
                className={`flex-1 py-2 rounded-xl transition-colors flex items-center justify-center gap-1.5 ${
                  activeTab === 'ai-assistant' ? 'bg-amber-400 text-neutral-950 font-bold' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-900" />
                <span>AI Copilot</span>
              </button>
            </div>

            {/* TAB 1: Tags & Publishing settings */}
            {activeTab === 'editor' && (
              <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm space-y-6">
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider">
                    Tag dell'Articolo
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTagInput}
                      onChange={(e) => setNewTagInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                      placeholder="Aggiungi tag..."
                      className="flex-1 px-3 py-1.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-800 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="px-3 py-1.5 rounded-xl bg-neutral-900 text-white text-xs font-medium"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {tags.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-700 text-xs font-medium"
                      >
                        #{t}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(t)}
                          className="text-neutral-400 hover:text-neutral-900"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {status === 'scheduled' && (
                  <div className="space-y-2 pt-4 border-t border-neutral-100">
                    <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider">
                      Data e Ora di Pubblicazione
                    </label>
                    <input
                      type="datetime-local"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-800"
                    />
                  </div>
                )}

                <div className="pt-4 border-t border-neutral-100 space-y-2 text-xs text-neutral-500">
                  <div className="flex justify-between">
                    <span>Tempo di lettura stimato:</span>
                    <strong className="text-neutral-800">{readingTime}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Visualizzazioni:</span>
                    <strong className="text-neutral-800">{article.viewsCount}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Creato il:</span>
                    <span>{new Date(article.createdAt).toLocaleDateString('it-IT')}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('Sei sicuro di voler eliminare questo articolo?')) {
                        deleteArticle(article.id);
                        setCurrentPage('admin');
                      }
                    }}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Elimina Articolo</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: SEO Inspector */}
            {activeTab === 'seo' && (
              <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                    Checklist & Punteggio SEO
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    {seoScore} / 100
                  </span>
                </div>

                {/* Google Search Snippet Simulation */}
                <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1">
                  <div className="text-[10px] text-neutral-500 flex items-center gap-1">
                    <Globe className="w-3 h-3 text-emerald-600" />
                    <span>siwacap.com › blog › {slug || 'titolo'}</span>
                  </div>
                  <div className="text-xs font-semibold text-blue-700 line-clamp-1">
                    {metaTitle || title || 'Titolo della Pagina'}
                  </div>
                  <div className="text-[11px] text-neutral-600 line-clamp-2">
                    {metaDescription || excerpt || 'Descrizione dello snippet nei risultati di ricerca di Google...'}
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-medium text-neutral-700 mb-1">
                      <span>Meta Title ({metaTitle.length}/60)</span>
                      {metaTitle.length >= 40 && metaTitle.length <= 60 ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                      )}
                    </div>
                    <input
                      type="text"
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium text-neutral-700 mb-1">
                      <span>Meta Description ({metaDescription.length}/160)</span>
                      {metaDescription.length >= 120 && metaDescription.length <= 160 ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                      )}
                    </div>
                    <textarea
                      rows={2}
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs resize-none"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAiOptimizeSeo}
                  disabled={isAiLoading}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-800 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Ottimizza SEO con AI</span>
                </button>
              </div>
            )}

            {/* TAB 3: AI Copilot */}
            {activeTab === 'ai-assistant' && (
              <div className="bg-neutral-950 text-white p-6 rounded-3xl border border-neutral-800 shadow-xl space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
                  <Sparkles className="w-4 h-4" />
                  <span>Assistente Editoriale AI</span>
                </div>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  Utilizza il modello Gemini integrato server-side per migliorare e potenziare l'articolo.
                </p>

                <div className="space-y-2 pt-2">
                  <button
                    type="button"
                    onClick={handleAiExpandSection}
                    disabled={isAiLoading}
                    className="w-full flex items-center justify-between p-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-left text-xs font-medium transition-all group cursor-pointer"
                  >
                    <span>Espandi Contenuto & Nuove Sezioni</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  <button
                    type="button"
                    onClick={handleAiOptimizeSeo}
                    disabled={isAiLoading}
                    className="w-full flex items-center justify-between p-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-left text-xs font-medium transition-all group cursor-pointer"
                  >
                    <span>Genera & Sincronizza Meta Tag SEO</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
