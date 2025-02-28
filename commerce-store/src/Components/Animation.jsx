// Enhanced animation variants
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      when: "beforeChildren"
    }
  }
};

export const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, type: "spring", damping: 15 }
  }
};

export const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
  hover: {
    scale: 1.05,
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
    transition: {
      type: "string",
      stiffness: 400,
      damping: 10
    }
  },
  tap: {
    transition: { type: "spring", stiffness: 400, damping: 17 }
  }
};

export const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.9 }
};

// Category Animation
export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export const categoryVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 12
    }
  }
};

export const filterVariants = {
  hidden: {
    opacity: 0,
    x: "100%"
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20
    }
  },
  exit: {
    opacity: 0,
    x: "100%",
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20
    }
  }
};

export const productCardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
  hover: {
    scale: 1.05,
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: {
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 17
    }
  }
};

export const chipVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 400 }
  },
  exit: {
    scale: 0.8,
    opacity: 0,
    transition: { duration: 0.2 }
  },
  hover: { scale: 1.05 }
};
