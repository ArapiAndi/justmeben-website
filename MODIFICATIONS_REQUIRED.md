# Modifiche Richieste — Compliance Comunicazione Non Promozionale

## ⚠️ Livello di Priorità: ALTO
Implementare le seguenti modifiche per eliminare linguaggio promozionale e sollecitazione all'investimento.

---

## 🔧 Modifiche Specifiche di Codice

### 1. ContactCtaBanner.tsx (RISCHIO ALTO)

**File:** `src/components/Home/ContactCtaBanner.tsx`

**Linea 76-82 (Titolo e Sottotesto)**

```tsx
// ❌ ATTUALE
<h2 className="...">
  <span className="block">Ready to</span>
  <span className="block bg-gradient-to-r from-[#2596be] via-[#a5e1f7] to-[#2596be] bg-clip-text text-transparent">
    Structure Capital?
  </span>
</h2>

// ✅ PROPOSTO
<h2 className="...">
  <span className="block">Ready to Explore</span>
  <span className="block bg-gradient-to-r from-[#2596be] via-[#a5e1f7] to-[#2596be] bg-clip-text text-transparent">
    Advisory Options?
  </span>
</h2>
```

**Linea 85-93 (Sottotesto lungo)**

```tsx
// ❌ ATTUALE
<motion.p>
  Discuss your capital requirements or explore institutional private equity and mezzanine investment opportunities with our expert advisory team.
</motion.p>

// ✅ PROPOSTO
<motion.p>
  Discuss your capital structuring needs and learn how our team can support your project evaluation and advisory services.
</motion.p>
```

---

### 2. PortfolioShowcase.tsx (RISCHIO ALTO x2)

**File:** `src/components/Home/PortfolioShowcase.tsx`

**Linea 51-56 (Titolo Portfolio)**

```tsx
// ❌ ATTUALE
<h2>
  Selected Investment Opportunities & Advisory Cases
</h2>

// ✅ PROPOSTO
<h2>
  Selected Advisory Cases & Project Documentation
</h2>
```

**Linea 60-62 (Sottotesto Portfolio)**

```tsx
// ❌ ATTUALE
<p>
  From prime real estate developments to private equity and growth debt syndications, we structure value across every asset class.
</p>

// ✅ PROPOSTO
<p>
  From real estate advisory to structured capital consulting and financial analysis, we provide guidance across diverse asset classes and project types.
</p>
```

---

### 3. InvestmentCriteriaPage.tsx (RISCHIO ALTO + MEDIO)

**File:** `src/pages/InvestmentCriteriaPage.tsx`

**Linea 73-74 (Badge "Investment Parameters")**

```tsx
// ❌ ATTUALE
<span className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-medium">
  Advisory & Investment Parameters
</span>

// ✅ PROPOSTO
<span className="text-xs uppercase tracking-[0.25em] text-neutral-500 font-medium">
  Advisory Assessment Criteria
</span>
```

**Linea 283-289 (CTA Button "Submit Mandate")**

```tsx
// ❌ ATTUALE
<button onClick={openContactModal} className="...">
  <span>Submit Mandate for Assessment</span>
  <ArrowRight className="w-4 h-4" />
</button>

// ✅ PROPOSTO
<button onClick={openContactModal} className="...">
  <span>Request Advisory Consultation</span>
  <ArrowRight className="w-4 h-4" />
</button>
```

---

### 4. AboutSection.tsx (RISCHIO MEDIO)

**File:** `src/components/Home/AboutSection.tsx`

**Linea 118-120 (Testo descrittivo)**

```tsx
// ❌ ATTUALE
<p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed">
  We empower entrepreneurs and organizations through expert consultancy in crowdfunding, private equity, and venture capital. Our comprehensive approach covers strategic planning, market research, business development, and financial analysis to drive operational excellence.
</p>

// ✅ PROPOSTO
<p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed">
  We provide advisory services to entrepreneurs, organizations, and capital sources on strategic planning, capital structuring, and financial analysis. Our comprehensive approach ensures informed decision-making across diverse financing structures and asset classes.
</p>
```

---

### 5. initialData.ts — Blog Content (RISCHIO MEDIO)

**File:** `src/data/initialData.ts`

**Sezioni da revisionare (Mezzanine Finance post, Private Equity post)**

#### Post 2: Mezzanine Finance

```tsx
// ❌ ATTUALE (Linea ~136-140)
"Questo assetto consente allo sviluppatore di avviare contemporaneamente più cantieri, diversificando il rischio operativo e aumentando l'IRR sul capitale impiegato."

// ✅ PROPOSTO
"Questo assetto consente agli sviluppatori di strutturare in modo equilibrato le fonti di finanziamento, distribuendo il rischio operativo tra multiple parti."
```

#### Post 4: Private Equity

```tsx
// ❌ ATTUALE (Linea ~212)
"Minori Costi di Gestione: Eliminazione delle commissioni di gestione fisse del 2% annuo tipiche dei fondi chiusi."

// ✅ PROPOSTO
"Struttura di Gestione Trasparente: Definizione chiara della governance e della ripartizione delle responsabilità di gestione."
```

---

## 📋 Checklist di Implementazione

- [ ] Modifica ContactCtaBanner.tsx (titolo + sottotesto)
- [ ] Modifica PortfolioShowcase.tsx (titolo + sottotesto)
- [ ] Modifica InvestmentCriteriaPage.tsx (badge + CTA button)
- [ ] Modifica AboutSection.tsx (testo descrittivo)
- [ ] Modifica initialData.ts (blog posts mezzanine & PE)
- [ ] Revisione traduzioni (se applicabile per IT/EN)
- [ ] Test del percorso utente (home → contact → portfolio → criteria)
- [ ] Revisione legale della comunicazione (compliance FCA/ECSPR)

---

## 🛡️ Aggiunte Consigliate

### Disclaimer Globale (da aggiungere al Footer)

```tsx
<section className="bg-amber-50 border-t border-amber-200 py-6 px-4">
  <div className="max-w-7xl mx-auto">
    <p className="text-xs text-amber-800 font-medium">
      ⚠️ <strong>Disclaimer:</strong> Il presente sito fornisce informazioni e documentazione a titolo informativo e consultivo. 
      I progetti presentati comportano rischi significativi di perdita di capitale. 
      Prima di qualsiasi decisione di investimento, consulta la documentazione completa e rivolgersi a consulenti indipendenti.
      Questo sito non costituisce collocamento di titoli né sollecitazione al pubblico risparmio.
    </p>
  </div>
</section>
```

---

## 🔄 Impatto Comunicativo

| Elemento | Prima | Dopo | Cambiamento |
|----------|-------|------|-------------|
| ContactCtaBanner | "Structure Capital? Explore investment opportunities" | "Explore Advisory Options? Discuss structuring needs" | Consultivo |
| Portfolio Title | "Investment Opportunities" | "Advisory Cases" | Informativo |
| Portfolio Subtitle | "Structure value across every asset" | "Provide guidance across asset classes" | Neutro |
| Criteria Badge | "Investment Parameters" | "Advisory Assessment Criteria" | Descrittivo |
| Criteria CTA | "Submit Mandate" | "Request Advisory Consultation" | Consultivo |

---

## 📝 Note Finali

- **Tono complessivo:** Passare da una comunicazione **promozionale per investitori** a una comunicazione **consultiva per richiedenti di servizi**
- **Percorso utente:** Non deve condurre direttamente a "sottoscrizione" ma a "consultazione"
- **Linguaggio:** Evitare "opportunità", "rendimenti", "guadagni", "investimenti"; privilegiare "consulenza", "analisi", "informazione"
- **Conformità:** Verificare che i testi rispettino le linee guida FCA (Financial Conduct Authority) e ECSPR (Regolamento UE 2020/1503)

---

**Data review:** 2026-08-27  
**Implementazione stimata:** 2-3 ore  
**Priorità:** CRITICA
