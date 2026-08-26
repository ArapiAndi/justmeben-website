import { useRef, useMemo } from 'react';
import { useScroll, useTransform } from 'motion/react';
import { useIsMobile } from './useIsMobile';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

interface SmartParallaxOptions {
  offset?: [string, string];
  yRange?: [number, number];
  scaleRange?: [number, number];
  opacityRange?: [number, number];
  intensity?: number;
  disableOnMobile?: boolean;
}

export const useSmartParallax = (options: SmartParallaxOptions = {}) => {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();

  const {
    offset = ['start end', 'end start'],
    yRange = [50, -50],
    scaleRange,
    opacityRange,
    intensity = 1,
    disableOnMobile = true,
  } = options;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });

  // Disable parallax if user prefers reduced motion or on mobile with disableOnMobile flag
  const shouldDisableParallax = prefersReducedMotion || (disableOnMobile && isMobile);

  // Calculate effective intensity
  const effectiveIntensity = shouldDisableParallax ? 0 :
    isMobile ? intensity * 0.4 : intensity;

  // Y transform with static fallback
  const y = useMemo(() => {
    if (effectiveIntensity === 0) return 0;
    return useTransform(
      scrollYProgress,
      [0, 1],
      [yRange[0] * effectiveIntensity, yRange[1] * effectiveIntensity]
    );
  }, [scrollYProgress, yRange, effectiveIntensity]);

  // Scale transform
  const scale = useMemo(() => {
    if (!scaleRange || effectiveIntensity === 0) return 1;
    return useTransform(scrollYProgress, [0, 1], scaleRange);
  }, [scaleRange, scrollYProgress, effectiveIntensity]);

  // Opacity transform
  const opacity = useMemo(() => {
    if (!opacityRange || effectiveIntensity === 0) return 1;
    return useTransform(scrollYProgress, [0, 1], opacityRange);
  }, [opacityRange, scrollYProgress, effectiveIntensity]);

  return {
    ref,
    y: typeof y === 'number' ? y : y,
    scale: typeof scale === 'number' ? scale : scale,
    opacity: typeof opacity === 'number' ? opacity : opacity,
    scrollYProgress,
    isDisabled: shouldDisableParallax,
    isMobile,
  };
};
