export const CATEGORY_EMOJI = (type: string) => {
  switch (type) {
    case "LOVE":
      return "💖";
    case "MONEY":
      return "💸";
    case "JOB":
      return "💼";
    case "STUDY":
      return "🎓";
    case "LIFE":
      return "🍀";
    case "HUMAN":
      return "👬";
  }
};
