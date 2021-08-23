import axios, { AxiosInstance } from "axios";
import { WeeklyWeather, CurrentWeatherApiRes } from "models/weather";

const weather: AxiosInstance = axios.create({
  baseURL: "https://api.openweathermap.org/",
});

const appId = process.env.REACT_APP_WEATHER_API;

export const weatherAPI = {
  getWeather(lat: number, lon: number) {
    return weather.get<WeeklyWeather>(
      `data/2.5/onecall?lat=${lat}&lon=${lon}${appId}`
    );
  },
  getWeatherWithLocationNames(lat: number, lon: number) {
    return weather.get<CurrentWeatherApiRes>(
      `data/2.5/weather?lat=${lat}&lon=${lon}${appId}`
    );
  },
};
