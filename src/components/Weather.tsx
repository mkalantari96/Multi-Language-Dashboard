import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setWeatherData, setWeatherError } from "../store/weatherSlice";
import { useTranslation } from "react-i18next";
import { AnimatePresence } from "framer-motion";
import cities from "../ir.json";
import {
  WeatherContainer,
  SearchContainer,
  SearchInput,
  SuggestionsList,
  SuggestionItem,
  WeatherCard,
  WeatherGrid,
  WeatherItem,
  WeatherLabel,
  WeatherValue,
  ErrorMessage,
  EmptyMessage,
  WeatherTitle,
  Title,
} from "../util/StyledComponents";

interface City {
  city: string;
  lat: string;
  lng: string;
  country: string;
  iso2: string;
  admin_name: string;
  capital: string;
  population: string;
  population_proper: string;
}

const Weather: React.FC = () => {
  const { temperature, description, windSpeed, city, error } = useSelector(
    (state: RootState) => state.weather
  );
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredCities, setFilteredCities] = useState<City[]>([]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = cities
        .filter((city) =>
          city.city.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5);
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (selectedCity) {
      fetchWeatherData(selectedCity.lat, selectedCity.lng);
    }
  }, [selectedCity]);

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    setSearchQuery(city.city);
    setShowSuggestions(false);
  };

  const fetchWeatherData = async (lat: string, lng: string) => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`
      );
      const data = await response.json();
      dispatch(
        setWeatherData({
          temperature: data.current_weather.temperature,
          description: data.current_weather.weathercode,
          windSpeed: data.current_weather.windspeed,
          city: selectedCity?.city || "",
          error: null,
        })
      );
    } catch (err) {
      dispatch(setWeatherError(t("error_fetching_weather")));
    }
  };

  return (
    <WeatherContainer>
      <WeatherTitle>{t("weather")}</WeatherTitle>

      <SearchContainer>
        <SearchInput
          type="text"
          placeholder={t("search_city")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />

        <AnimatePresence>
          {showSuggestions && filteredCities.length > 0 && (
            <SuggestionsList
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {filteredCities.map((city) => (
                <SuggestionItem
                  key={`${city.city}-${city.lat}-${city.lng}`}
                  onClick={() => handleCitySelect(city)}
                >
                  <div>
                    <strong>{city.city}</strong>
                    <span>{city.admin_name}</span>
                  </div>
                </SuggestionItem>
              ))}
            </SuggestionsList>
          )}
        </AnimatePresence>
      </SearchContainer>

      <AnimatePresence>
        {city && temperature !== null ? (
          <WeatherCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Title>{city}</Title>
            <WeatherGrid>
              <WeatherItem>
                <WeatherLabel>{t("temperature")}</WeatherLabel>
                <WeatherValue>{temperature}°C</WeatherValue>
              </WeatherItem>
              <WeatherItem>
                <WeatherLabel>{t("weather_description")}</WeatherLabel>
                <WeatherValue>{description}</WeatherValue>
              </WeatherItem>
              <WeatherItem>
                <WeatherLabel>{t("wind_speed")}</WeatherLabel>
                <WeatherValue>{windSpeed} km/h</WeatherValue>
              </WeatherItem>
            </WeatherGrid>
          </WeatherCard>
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          <EmptyMessage>{t("select_a_city_to_see_weather")}</EmptyMessage>
        )}
      </AnimatePresence>
    </WeatherContainer>
  );
};

export default Weather;
