# Parallax Quick Reference

## 🎯 Hook Disponibili

### `useSmartParallax` ⭐ (Consigliato)
```tsx
const { ref, y, scale, opacity, isMobile, isDisabled } = useSmartParallax({
  yRange: [50, -50],           // Parallax range
  scaleRange: [0.95, 1.05],    // Scale effect
  opacityRange: [0, 1],        // Opacity fade
  intensity: 1,                // Base intensity (0-1)
  disableOnMobile: true,       // Auto-disable on mobile
});
```

### `useParallax` (Base)
```tsx
const { ref, y, scale, opacity } = useParallax({
  yRange: [50, -50],
  intensity: 1,
});
```

### `useIsMobile`
```tsx
const isMobile = useIsMobile(768); // Breakpoint default 768px
```

### `usePrefersReducedMotion`
```tsx
const prefersReducedMotion = usePrefersReducedMotion();
// Automaticamente true se user ha motion reduction enabled
```

## 📝 Esempi di Uso

### Background Parallax
```tsx
import { useSmartParallax } from './hooks/useSmartParallax';

export const Section = () => {
  const { ref, y } = useSmartParallax({
    yRange: [80, -80],
    intensity: 1,
  });

  return (
    <motion.section ref={ref} style={{ y }}>
      <motion.div style={{ y }} className="bg-layer">
        Background Image
      </motion.div>
    </motion.section>
  );
};
```

### Floating Card
```tsx
const { ref, y, scale } = useSmartParallax({
  yRange: [30, -30],
  scaleRange: [0.95, 1.05],
  intensity: 0.8,
});

<motion.div ref={ref} style={{ y, scale }} className="card">
  Card Content
</motion.div>
```

### Progressive Reveal
```tsx
const { scrollYProgress } = useScroll({
  target: ref,
  offset: ['start end', 'end start'],
});

const opacity = useTransform(
  scrollYProgress,
  [0, 0.3, 1],  // Start hidden, become visible at 30%, stay visible
  [0, 1, 1]
);

<motion.div ref={ref} style={{ opacity }}>
  Revealed progressively
</motion.div>
```

## ⚙️ Parametri Consigliati

| Elemento | yRange | scaleRange | Intensity |
|----------|--------|-----------|-----------|
| Background | [80, -80] | [1, 1.1] | 1 |
| Hero Image | [60, -60] | [0.98, 1.05] | 0.9 |
| Cards | [30, -30] | [0.95, 1.05] | 0.8 |
| Text | [20, -20] | - | 0.6 |
| Overlay | [15, -15] | - | 0.4 |

## 📱 Mobile Handling

### Automatico (in useSmartParallax)
```tsx
// Automaticamente riduce intensity del 60% su mobile
const adjustedIntensity = isMobile ? intensity * 0.4 : intensity;
```

### Manuale
```tsx
const isMobile = useIsMobile();
<div style={{ parallaxIntensity: isMobile ? 0.4 : 1 }}>
  {/* Content */}
</div>
```

## ♿ Accessibility

### Automatico (in useSmartParallax)
```tsx
// Automaticamente disabilita se user ha prefers-reduced-motion
const shouldDisableParallax = prefersReducedMotion || 
  (disableOnMobile && isMobile);
```

## 🚀 Performance Tips

✅ **Do**
- Usa transform: translateY, translateX, scale
- Usa opacity per fade effects
- Usa will-change CSS sparatamente
- Lazy load images con `loading="lazy"`
- Test su real devices

❌ **Don't**
- Usa top, left, width, height (layout recalculation)
- Troppi parallax elements (60+ visible)
- Parallax intensity > 1.5 (too aggressive)
- Animate color/filters (expensive)

## 🔍 Debugging

### Check if parallax is disabled
```tsx
const { isDisabled } = useSmartParallax();
console.log('Parallax disabled:', isDisabled);
```

### Monitor motion preferences
```tsx
const prefersReduced = usePrefersReducedMotion();
console.log('Reduced motion:', prefersReduced);
```

### Check device type
```tsx
const isMobile = useIsMobile();
console.log('Is mobile:', isMobile);
```

## 📊 Current Sezioni con Parallax

- ✅ HeroSection - Cinematic depth with scale
- ✅ AboutSection - Floating cards with scale
- ✅ PortfolioShowcase - Staggered depth
- ✅ StrengthsSection - Atmospheric parallax

## 🔄 Aggiungere Parallax a Nuova Sezione

```tsx
import { useSmartParallax } from '@/hooks/useSmartParallax';
import { motion } from 'motion/react';

export const NewSection = () => {
  const { ref, y, scale, opacity } = useSmartParallax({
    yRange: [50, -50],
    scaleRange: [0.98, 1.02],
    intensity: 1,
    disableOnMobile: true,
  });

  return (
    <motion.section
      ref={ref}
      style={{
        y: /* Applica parallax al background */,
        scale: /* Applica scale al container */,
      }}
    >
      {/* Content */}
    </motion.section>
  );
};
```

## 📚 Imports
```tsx
import { useSmartParallax } from '@/hooks/useSmartParallax';
import { useParallax } from '@/hooks/useParallax';
import { useIsMobile } from '@/hooks/useIsMobile';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
```

---

**Last Updated**: 2026-08-26 | **Status**: Production Ready
