import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WeatherState {
  temperature: number | null;
  description: string | null;
  windSpeed: number | null;
  city: string | null;
  error: string | null;
}

const initialState: WeatherState = {
  temperature: null,
  description: null,
  windSpeed: null,
  city: null,
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setWeatherData(state: WeatherState, action: PayloadAction<WeatherState>) {
      state.temperature = action.payload.temperature;
      state.description = action.payload.description;
      state.windSpeed = action.payload.windSpeed;
      state.city = action.payload.city;
      state.error = null;
    },
    setWeatherError(state: WeatherState, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const { setWeatherData, setWeatherError } = weatherSlice.actions;
export default weatherSlice.reducer;
