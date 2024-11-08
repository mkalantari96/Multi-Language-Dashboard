import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../store/store";

import { setUserName, setProfileUpdated } from "../store/userSlice";
import { storage } from "../util/storage";
import { animations } from "../util/animation";
import {
  ProfileContainer,
  ProfileForm,
  SaveButton,
  Label,
  FormGroup,
  Input,
  Select,
  Title,
} from "../util/StyledComponents";

import { setLocale } from "../store/settingsSlice";
import { setTheme } from "../store/settingsSlice";

interface ProfileData {
  name: string;
  theme: string;
  language: string;
}

const Profile: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.settings.theme);
  const locale = useSelector((state: RootState) => state.settings.locale);

  // Initialize state with current values from Redux
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    theme: theme,
    language: locale,
  });

  // Load profile data and keep it synced
  useEffect(() => {
    const savedProfile = storage.get("userProfile");
    setProfileData((prev: ProfileData) => ({
      name: savedProfile?.name || prev.name,
      theme: theme,
      language: locale,
    }));
  }, [theme, locale]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProfileData((prev: ProfileData) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Update Redux store directly
    dispatch(setTheme(profileData.theme));
    dispatch(setLocale(profileData.language));
    dispatch(setUserName(profileData.name));
    dispatch(setProfileUpdated(true));

    // Save only user profile data to localStorage
    storage.set("userProfile", { name: profileData.name });
  };

  return (
    <ProfileContainer
      initial={animations.pageTransition.initial}
      animate={animations.pageTransition.animate}
      exit={animations.pageTransition.exit}
    >
      <ProfileForm onSubmit={handleSubmit}>
        <Title>{t("profile.title")}</Title>

        <FormGroup>
          <Label>{t("profile.name")}</Label>
          <Input
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleInputChange}
            placeholder={t("profile.namePlaceholder")}
          />
        </FormGroup>

        <FormGroup>
          <Label>{t("profile.theme")}</Label>
          <Select
            name="theme"
            value={profileData.theme}
            onChange={handleInputChange}
          >
            <option value="light">{t("profile.lightTheme")}</option>
            <option value="dark">{t("profile.darkTheme")}</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>{t("profile.language")}</Label>
          <Select
            name="language"
            value={profileData.language}
            onChange={handleInputChange}
          >
            <option value="en">English</option>
            <option value="fa">فارسی</option>
          </Select>
        </FormGroup>

        <SaveButton
          type="submit"
          whileHover={animations.button.hover}
          whileTap={animations.button.tap}
        >
          {t("profile.saveButton")}
        </SaveButton>
      </ProfileForm>
    </ProfileContainer>
  );
};

export default Profile;
