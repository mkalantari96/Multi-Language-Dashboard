import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Todos from "./components/Todos";
import Weather from "./components/Weather";
import Profile from "./components/Profile";

import { RootState } from "./store/store";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyle } from "./util/themes";

import { storage } from "./util/storage";

const App: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.settings);

  // State to manage which component (tab) is currently active
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  const [showNotification, setShowNotification] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [hasUserProfile, setHasUserProfile] = useState(false);

  // Load user profile from localStorage on component mount
  useEffect(() => {
    try {
      const storedProfile = storage.get("userProfile");
      if (storedProfile) {
        setHasUserProfile(true);
      } else {
        setHasUserProfile(false);
        if (activeTab !== "profile") {
          setShowNotification(true);
        }
      }
    } catch (err) {
      console.error("Error loading user profile:", err);
    }
  }, [dispatch, activeTab]);

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth > 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handler to change the active tab
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
    // Show notification if no user profile and not on profile tab
    if (!hasUserProfile && tab !== "profile") {
      setShowNotification(true);
    } else {
      setShowNotification(false);
    }
  };

  const pageVariants = {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 10 },
  };

  const currentTheme = theme === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <div className="flex h-screen">
        {/* Sidebar with Animation */}
        <AnimatePresence>
          <motion.div
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -250 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Sidebar onTabClick={handleTabClick} activeTab={activeTab} />
          </motion.div>
        </AnimatePresence>

        {/* Main Content */}
        <main
          className={`flex-1 p-4 md:p-6 overflow-y-auto transition-all duration-300 ${
            isSidebarOpen ? "md:ml-0" : ""
          }`}
          style={{ backgroundColor: currentTheme.background }}
        >
          {/* Notification */}
          <AnimatePresence>
            {showNotification && !hasUserProfile && activeTab !== "profile" && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-4 mb-4 rounded-lg shadow-lg flex justify-between items-center"
                style={{
                  background: theme === "dark" ? "#bb86fc33" : "#007bff22",
                  color: theme === "dark" ? "#bb86fc" : "#007bff",
                }}
              >
                <span>{t("update_profile_message")}</span>
                <button
                  onClick={() => {
                    setActiveTab("profile");
                    setShowNotification(false);
                  }}
                  style={{
                    background: theme === "dark" ? "#bb86fc" : "#007bff",
                    color: "#ffffff",
                  }}
                  className="ml-4 px-4 py-2 rounded-md transition-colors hover:opacity-90"
                >
                  {t("update_profile")}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Content with Page Transitions */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {activeTab === "dashboard" && <Dashboard />}
              {activeTab === "todos" && <Todos />}
              {activeTab === "weather" && <Weather />}
              {activeTab === "profile" && <Profile />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;
