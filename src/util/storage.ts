export const storage = {
  get: (key: string) => {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;

      // Try parsing as JSON, if it fails return the raw string
      try {
        return JSON.parse(item);
      } catch {
        return item;
      }
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error);
      return null;
    }
  },

  set: (key: string, value: any) => {
    try {
      // If value is a simple string, store it directly
      const valueToStore =
        typeof value === "string" ? value : JSON.stringify(value);
      localStorage.setItem(key, valueToStore);
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  },
};
