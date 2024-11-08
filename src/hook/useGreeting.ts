import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export const useGreeting = () => {
  const { t } = useTranslation();
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) {
        setGreeting(t("greetings.morning"));
      } else if (hour < 18) {
        setGreeting(t("greetings.afternoon"));
      } else {
        setGreeting(t("greetings.evening"));
      }
    };

    updateGreeting();
    // Update greeting every hour
    const interval = setInterval(updateGreeting, 3600000);
    return () => clearInterval(interval);
  }, [t]); // Add t to dependency array to update when language changes

  return greeting;
};
