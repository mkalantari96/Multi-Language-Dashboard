import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  FiClipboard,
  FiMapPin,
  FiCloud,
  FiUser,
  FiSun,
  FiMoon,
  FiMenu,
  FiGlobe,
} from "react-icons/fi";
import { AnimatePresence } from "framer-motion";
import { RootState } from "../store/store";
import { setLocale, setTheme } from "../store/settingsSlice";
import {
  SidebarContainer,
  MenuButton,
  NavContainer,
  NavButton,
  SettingsContainer,
  SettingsButton,
  IconWrapper,
  ButtonText,
} from "../util/StyledComponents";
import { sidebarAnimations } from "../util/animation";

interface SidebarProps {
  onTabClick: (tab: string) => void;
  activeTab: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onTabClick, activeTab }) => {
  const dispatch = useDispatch();
  const { theme, locale } = useSelector((state: RootState) => state.settings);
  const { t } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems = [
    { id: "dashboard", icon: <FiClipboard />, label: t("sidebar.dashboard") },
    { id: "todos", icon: <FiMapPin />, label: t("sidebar.todos") },
    { id: "weather", icon: <FiCloud />, label: t("sidebar.weather") },
    { id: "profile", icon: <FiUser />, label: t("sidebar.profile") },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleLocale = () => {
    const newLocale = locale === "en" ? "fa" : "en";
    dispatch(setLocale(newLocale));
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    dispatch(setTheme(newTheme));
  };

  return (
    <SidebarContainer
      initial={isSidebarOpen ? "open" : "closed"}
      animate={isSidebarOpen ? "open" : "closed"}
      variants={sidebarAnimations.container}
    >
      <MenuButton
        whileHover="hover"
        whileTap="tap"
        variants={sidebarAnimations.button}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <FiMenu />
      </MenuButton>

      <NavContainer>
        {navItems.map((item) => (
          <NavButton
            key={item.id}
            variants={sidebarAnimations.button}
            whileHover="hover"
            whileTap="tap"
            onClick={() => onTabClick(item.id)}
            $isActive={activeTab === item.id}
            style={{
              justifyContent: isSidebarOpen ? "flex-start" : "center",
            }}
          >
            <IconWrapper>{item.icon}</IconWrapper>
            <AnimatePresence mode="wait">
              {isSidebarOpen && (
                <ButtonText
                  initial={sidebarAnimations.text.initial}
                  animate={sidebarAnimations.text.animate}
                  exit={sidebarAnimations.text.exit}
                >
                  {item.label}
                </ButtonText>
              )}
            </AnimatePresence>
          </NavButton>
        ))}
      </NavContainer>

      <SettingsContainer>
        <SettingsButton
          variants={sidebarAnimations.button}
          whileHover="hover"
          whileTap="tap"
          onClick={toggleTheme}
        >
          <IconWrapper>{theme === "dark" ? <FiSun /> : <FiMoon />}</IconWrapper>
          <AnimatePresence mode="wait">
            {isSidebarOpen && (
              <ButtonText
                initial={sidebarAnimations.text.initial}
                animate={sidebarAnimations.text.animate}
                exit={sidebarAnimations.text.exit}
              >
                {t(theme === "dark" ? "sidebar.lightMode" : "sidebar.darkMode")}
              </ButtonText>
            )}
          </AnimatePresence>
        </SettingsButton>

        <SettingsButton
          variants={sidebarAnimations.button}
          whileHover="hover"
          whileTap="tap"
          onClick={toggleLocale}
        >
          <IconWrapper>
            <FiGlobe />
          </IconWrapper>
          <AnimatePresence mode="wait">
            {isSidebarOpen && (
              <ButtonText
                initial={sidebarAnimations.text.initial}
                animate={sidebarAnimations.text.animate}
                exit={sidebarAnimations.text.exit}
              >
                {t(
                  locale === "en"
                    ? "sidebar.switchToFarsi"
                    : "sidebar.switchToEnglish"
                )}
              </ButtonText>
            )}
          </AnimatePresence>
        </SettingsButton>
      </SettingsContainer>
    </SidebarContainer>
  );
};

export default Sidebar;
