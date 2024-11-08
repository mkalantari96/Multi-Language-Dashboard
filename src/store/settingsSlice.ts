import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import i18n from "../i18n";

interface SettingsState {
  theme: string;
  locale: string;
}

const initialState: SettingsState = {
  theme: "light",
  locale: i18n.language || "en",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setTheme: (state: SettingsState, action: PayloadAction<string>) => {
      state.theme = action.payload;
      document.body.className = action.payload === "dark" ? "dark" : "";
    },
    setLocale: (state: SettingsState, action: PayloadAction<string>) => {
      state.locale = action.payload;
      document.dir = action.payload === "fa" ? "rtl" : "ltr";
      i18n.changeLanguage(action.payload);
    },
  },
});

export const { setTheme, setLocale } = settingsSlice.actions;
export default settingsSlice.reducer;
