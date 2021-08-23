import { RootState } from "./store";

export const selectCities = (state: RootState) => state.weather.cities;
export const selectHourlyWeather = (state: RootState) => {
  return state.weather.hourlyWeather;
};
export const selectDailyWeather = (state: RootState) => {
  return state.weather.dailyWeather;
};
export const selectCurrentWeather = (state: RootState) => {
  return state.weather.currentWeather;
};
