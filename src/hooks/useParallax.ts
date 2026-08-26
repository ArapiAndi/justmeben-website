import { useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export const useParallax = (offset = 50) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  return { ref, y, scrollYProgress };
};
