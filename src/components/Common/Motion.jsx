import { motion } from 'framer-motion';

/* Shared motion language.
   - Reveals trigger once when ~20% of the element enters the viewport.
   - Durations 500–800ms with a soft ease-out; nothing loops or floats.
   - <MotionConfig reducedMotion="user"> (App.jsx) strips transforms for
     users who prefer reduced motion; opacity fades remain short. */

export const ease = [0.22, 1, 0.36, 1];

const variantsByType = {
  up: { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  left: { hidden: { opacity: 0, x: -32 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 32 }, show: { opacity: 1, x: 0 } },
  image: {
    hidden: { opacity: 0, clipPath: 'inset(8% 8% 8% 8%)', scale: 1.04 },
    show: { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', scale: 1 },
  },
};

const viewport = { once: true, amount: 0.2 };

/** Single element reveal on scroll. */
export function Reveal({ as = 'div', type = 'up', delay = 0, duration = 0.7, className, children, ...rest }) {
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={variantsByType[type]}
      transition={{ duration: type === 'image' ? 0.9 : duration, ease, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Container that staggers its <RevealItem> children. */
export function Stagger({ as = 'div', stagger = 0.08, delay = 0, className, children, ...rest }) {
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({ as = 'div', type = 'up', className, children, ...rest }) {
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag className={className} variants={variantsByType[type]} transition={{ duration: 0.65, ease }} {...rest}>
      {children}
    </Tag>
  );
}

/* Hero load sequence: eyebrow 0ms → heading 100ms → body 200ms → actions 300ms;
   image 150ms with a clip/scale reveal. Runs on mount (not on scroll). */
const heroDelay = { eyebrow: 0, heading: 0.1, body: 0.2, actions: 0.3, image: 0.15 };

export function HeroItem({ as = 'div', step = 'body', className, children, ...rest }) {
  const Tag = motion[as] ?? motion.div;
  const isImage = step === 'image';
  return (
    <Tag
      className={className}
      initial={isImage ? variantsByType.image.hidden : { opacity: 0, y: step === 'heading' ? 28 : 16 }}
      animate={isImage ? variantsByType.image.show : { opacity: 1, y: 0 }}
      transition={{ duration: isImage ? 1 : step === 'heading' ? 0.8 : 0.6, ease, delay: heroDelay[step] ?? 0 }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
