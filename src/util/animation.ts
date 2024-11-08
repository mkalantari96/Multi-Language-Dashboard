export const animations = {
  pageTransition: {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 10 },
  },

  notification: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },

  form: {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
  },

  button: {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  },
};

export const sidebarAnimations = {
  container: {
    open: {
      width: "16rem",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    closed: {
      width: "4rem",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  },
  button: {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
    },
  },
  text: {
    initial: {
      opacity: 0,
      x: -10,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2,
      },
    },
    exit: {
      opacity: 0,
      x: -10,
      transition: {
        duration: 0.2,
      },
    },
  },
};

export const todoAnimations = {
  list: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  form: {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
  },
};
