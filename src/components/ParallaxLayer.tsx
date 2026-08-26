import React, { ReactNode } from 'react';
import { motion } from 'motion/react';

interface ParallaxLayerProps {
  children: ReactNode;
  y: any;
  scale?: any;
  opacity?: any;
  className?: string;
  style?: React.CSSProperties;
}

export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  y,
  scale,
  opacity,
  className = '',
  style = {},
}) => {
  return (
    <motion.div
      style={{
        y,
        scale: scale || 1,
        opacity: opacity || 1,
        ...style,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
