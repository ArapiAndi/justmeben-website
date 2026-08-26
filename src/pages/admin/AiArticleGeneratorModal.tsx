import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Sparkles, Wand2, CheckCircle2, ArrowRight, Loader2, RefreshCw, Layers, Sliders, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface AiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onArticleGenerated: (articleId: string) => void;
}

export const AiArticleGeneratorModal: React.FC<AiModalProps> = ({
  isOpen,
  onClose,
  onArticleGenerated,
}) => {
  const { categories, addArticle } = useApp();

  // Generator form state
  const [topic, setTopic] = useState('Come strutturare una campagna di Equity Crowdfunding di successo nel 2025');
  const [category, setCategory] = useState(categories[0]?.name || 'Crowdfunding');
  const [keywords, setKeywords] = useState('crowdfunding, real estate, mezzanine finance, private equity, capital raising');
  const [tone, setTone] = useState<'autorevole' | 'professionale' | 'analitico' | 'strategico'>('autorevole');
  const [targetAudience, setTargetAudience] = useState('Sviluppatori Immobiliari, Founder e Investitori');
  const [language, setLanguage] = useState<'it' | 'en'>('it');
  const [includeKeyTakeaways, setIncludeKeyTakeaways] = useState(true);
  const [includeInternalLinks, setIncludeInternalLinks] = useState(true);
  const [autoPublish, setAutoPublish] = useState(false);

  // Suggested Topics pool
  const [suggestedTopics, setSuggestedTopics] = useState<string[]>([
    'Come strutturare una campagna di Equity Crowdfunding di successo nel 2025',
    'Guida al debito mezzanino nello sviluppo immobiliare residenziale',
    'Private Equity e Club Deals: come investire in Real Estate ad alto rendimento',
    'Valutazione di asset immobiliari e calcolo del Gross Development Value (GDV)',
    'Capital Raising per PMI e Startup: mix ideale tra debito ed equity',
    'Regolamento europeo ECSPR sul crowdfunding: impatti e opportunità per gli operatori',
  ]);
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(false);

  // Loading & Generation State
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fetch AI topic suggestions if requested
  const handleFetchAiSuggestions = async () => {
    setIsFetchingSuggestions(true);
    try {
      const res = await fetch('/api/suggest-topics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, count: 5 }),
      });
      const data = await res.json();
      if (data.topics && Array.isArray(data.topics) && data.topics.length > 0) {
        setSuggestedTopics(data.topics);
      }
    } catch (e) {
      console.warn('Using fallback suggestions', e);
    } finally {
      setIsFetchingSuggestions(false);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsGenerating(true);
    setErrorMessage(null);
    setGenerationStep('Analisi del prompt e definizione della struttura semantica...');

    try {
      // Step simulation for visual delight
      const stepTimer1 = setTimeout(() => {
        setGenerationStep('Generazione del contenuto approfondito e formattazione Markdown...');
      }, 1200);

      const stepTimer2 = setTimeout(() => {
        setGenerationStep('Ottimizzazione SEO, meta tag e selezione dell’immagine di copertina...');
      }, 2500);

      const response = await fetch('/api/generate-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          category,
          keywords,
          tone,
          targetAudience,
          language,
          includeKeyTakeaways,
          includeInternalLinks,
        }),
      });

      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);

      if (!response.ok) {
        throw new Error('Errore durante la generazione. Utilizzo del generatore sintetico di backup.');
      }

      const generated = await response.json();

      // Create new article object in state
      const newPost = addArticle({
        title: generated.title || topic,
        slug: generated.slug || topic.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        excerpt: generated.excerpt || 'Sintesi strategica dell’articolo generato con AI.',
        content: generated.content || 'Contenuto in fase di elaborazione.',
        coverImage: generated.coverImage || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
        category: category,
        tags: Array.isArray(generated.tags) && generated.tags.length > 0
          ? generated.tags
          : keywords.split(',').map((k) => k.trim()).filter(Boolean),
        author: {
          name: 'Marco Beniamino Brioschi',
          role: 'Managing Director & Capital Advisor',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        },
        readingTime: generated.readingTime || '5 min',
        status: autoPublish ? 'published' : 'draft',
        publishedAt: new Date().toISOString(),
        metaTitle: generated.metaTitle || `${topic.slice(0, 50)} | Just Me Ben LTD`,
        metaDescription: generated.metaDescription || generated.excerpt?.slice(0, 155) || 'Approfondimento a cura di Just Me Ben LTD.',
        primaryKeywords: Array.isArray(generated.primaryKeywords) ? generated.primaryKeywords : [keywords.split(',')[0]?.trim() || 'Crowdfunding'],
        secondaryKeywords: Array.isArray(generated.secondaryKeywords) ? generated.secondaryKeywords : [],
        keyTakeaways: generated.keyTakeaways || [
          'Ottimizzazione mirata per massimizzare il ROI e minimizzare la diluizione di capitale.',
          'Approccio strutturato orientato a sviluppatori immobiliari e investitori.',
        ],
        internalLinkSuggestions: generated.internalLinkSuggestions || [
          {
            anchorText: 'i criteri di investimento e advisory di Just Me Ben LTD',
            suggestedPage: '/investment-criteria',
            context: 'Per verificare se la tua iniziativa rispecchia i nostri parametri.',
          },
          {
            anchorText: 'i case study e track record di advisory',
            suggestedPage: '/portfolio',
            context: 'Per scoprire come abbiamo strutturato le operazioni di finanziamento.',
          },
        ],
        featured: false,
      });

      // Confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {}

      setIsGenerating(false);
      onClose();
      onArticleGenerated(newPost.id);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Si è verificato un errore.');
      setIsGenerating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          className="relative w-full max-w-3xl bg-neutral-950 text-white rounded-3xl p-6 sm:p-10 border border-neutral-800 shadow-2xl z-10 my-8 overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            disabled={isGenerating}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="space-y-2 mb-8">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>AI Content Engine • SIWA Capital</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-normal text-white">
              Crea Articolo Completo con Intelligenza Artificiale
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-light">
              Genera automaticamente titolo, introduzione, struttura a sezioni Markdown, punti chiave, metadati SEO e tag correlati.
            </p>
          </div>

          {isGenerating ? (
            <div className="py-16 text-center space-y-6">
              <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-amber-400/20 animate-ping" />
                <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-400/40">
                  <Wand2 className="w-8 h-8 animate-spin" />
                </div>
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="text-xl font-medium text-white">Generazione in Corso...</h3>
                <p className="text-xs sm:text-sm text-amber-300 font-mono animate-pulse">
                  {generationStep}
                </p>
              </div>

              <div className="w-full max-w-xs mx-auto h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-500 to-amber-300 animate-pulse w-3/4 rounded-full" />
              </div>
            </div>
          ) : (
            <form onSubmit={handleGenerate} className="space-y-6">
              {errorMessage && (
                <div className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs">
                  {errorMessage}
                </div>
              )}

              {/* Topic input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                    Argomento o Titolo dell'Articolo *
                  </label>
                  <button
                    type="button"
                    onClick={handleFetchAiSuggestions}
                    disabled={isFetchingSuggestions}
                    className="flex items-center gap-1 text-[11px] text-amber-300 hover:underline cursor-pointer"
                  >
                    <RefreshCw className={`w-3 h-3 ${isFetchingSuggestions ? 'animate-spin' : ''}`} />
                    <span>Suggerisci Nuovi Argomenti</span>
                  </button>
                </div>

                <textarea
                  rows={2}
                  required
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Es. Le migliori strategie per aumentare la visibilità online di un’azienda B2B"
                  className="w-full px-4 py-3 rounded-2xl bg-neutral-900 border border-neutral-800 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />

                {/* Quick Topic Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[11px] text-neutral-500 mr-1 self-center">Consigliati:</span>
                  {suggestedTopics.slice(0, 3).map((sugg, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setTopic(sugg)}
                      className="px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-[11px] text-neutral-300 transition-colors truncate max-w-[280px]"
                    >
                      {sugg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category and Language */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Categoria del Blog
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:outline-none focus:border-amber-400"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Lingua Contenuto
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as 'it' | 'en')}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:outline-none focus:border-amber-400"
                  >
                    <option value="it">Italiano (Principale)</option>
                    <option value="en">Inglese (Internazionale)</option>
                  </select>
                </div>
              </div>

              {/* Keywords & Tone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Parole Chiave & Keyword SEO
                  </label>
                  <input
                    type="text"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="visibilità online, SEO B2B, Search Funds..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Tono di Voce
                  </label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:outline-none focus:border-amber-400"
                  >
                    <option value="autorevole">Autorevole & C-Level Leader</option>
                    <option value="strategico">Strategico & Visionario</option>
                    <option value="analitico">Analitico & Finanziario M&A</option>
                    <option value="professionale">Operativo & Didattico</option>
                  </select>
                </div>
              </div>

              {/* Feature Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <label className="flex items-center gap-2 p-3 rounded-xl bg-neutral-900 border border-neutral-800 cursor-pointer hover:bg-neutral-850">
                  <input
                    type="checkbox"
                    checked={includeKeyTakeaways}
                    onChange={(e) => setIncludeKeyTakeaways(e.target.checked)}
                    className="rounded accent-amber-400"
                  />
                  <span>Punti Chiave (Takeaways)</span>
                </label>

                <label className="flex items-center gap-2 p-3 rounded-xl bg-neutral-900 border border-neutral-800 cursor-pointer hover:bg-neutral-850">
                  <input
                    type="checkbox"
                    checked={includeInternalLinks}
                    onChange={(e) => setIncludeInternalLinks(e.target.checked)}
                    className="rounded accent-amber-400"
                  />
                  <span>Link Interni a SIWA</span>
                </label>

                <label className="flex items-center gap-2 p-3 rounded-xl bg-neutral-900 border border-neutral-800 cursor-pointer hover:bg-neutral-850">
                  <input
                    type="checkbox"
                    checked={autoPublish}
                    onChange={(e) => setAutoPublish(e.target.checked)}
                    className="rounded accent-amber-400"
                  />
                  <span>Pubblica Subito</span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                <div className="text-[11px] text-neutral-400">
                  Potrai rifinire il testo nel markdown editor subito dopo la generazione.
                </div>

                <button
                  type="submit"
                  disabled={isGenerating}
                  className="flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black font-semibold text-xs sm:text-sm hover:brightness-110 transition-all shadow-lg cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Genera Articolo Ora</span>
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
