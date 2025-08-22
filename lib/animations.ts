import type { Variants } from "framer-motion";

export const fadeInUp: Variants = {
  initial: { 
    opacity: 0, 
    y: 20 
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

export const staggerChildren: Variants = {
  initial: { 
    opacity: 0 
  },
  animate: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1
    }
  }
};
