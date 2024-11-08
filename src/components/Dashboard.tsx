import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { motion } from "framer-motion";

import { animations } from "../util/animation";
import {
  DashboardContainer,
  GreetingSection,
  GreetingText,
  TimeText,
  TimeValue,
  WelcomeCard,
  WelcomeTitle,
} from "../util/StyledComponents";
import { useGreeting } from "../hook/useGreeting";
import { storage } from "../util/storage";

const Dashboard: React.FC = () => {
  const { name } = storage.get("userProfile") || "";
  const { t } = useTranslation();
  const [currentTime, setCurrentTime] = useState(format(new Date(), "HH:mm"));
  const greeting = useGreeting();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(format(new Date(), "HH:mm"));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardContainer
      initial={animations.pageTransition.initial}
      animate={animations.pageTransition.animate}
      exit={animations.pageTransition.exit}
    >
      <GreetingSection
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <GreetingText>
          {greeting}, {name || t("common.defaultUser")}
        </GreetingText>
        <TimeText>
          {t("dashboard.currentTime")}:{" "}
          <TimeValue
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {currentTime}
          </TimeValue>
        </TimeText>
      </GreetingSection>

      <WelcomeCard whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
        <WelcomeTitle>{t("dashboard.welcomeMessage")}</WelcomeTitle>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p>{t("dashboard.description")}</p>
        </motion.div>
      </WelcomeCard>
    </DashboardContainer>
  );
};

export default Dashboard;
