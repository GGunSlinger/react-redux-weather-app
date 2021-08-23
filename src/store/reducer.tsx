import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import { WeatherState } from "models/weather";
import { fetchCities, fetchWeather } from "./actions";

const initialState: WeatherState = {
  cities: null,
  hourlyWeather: null,
  dailyWeather: null,
  error: false,
  currentWeather: null,
};

export const weatherSlice = createSlice<
  WeatherState,
  SliceCaseReducers<WeatherState>
>({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchWeather.fulfilled, (state, action) => {
        const { current, daily, hourly, cityName, countryName, lat, lon } =
          action.payload;
        state.currentWeather = { ...current, cityName, countryName, lat, lon };
        state.dailyWeather = daily;
        state.hourlyWeather = hourly;
      })
      .addCase(fetchCities.fulfilled, (state, { payload }) => {
        state.cities = payload;
      }),
});

export default weatherSlice.reducer;
