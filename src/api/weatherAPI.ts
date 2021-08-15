import axios, { AxiosInstance } from "axios";

const weather: AxiosInstance = axios.create({
  baseURL: "http://api.openweathermap.org/",
});
let appId = process.env.REACT_APP_WEATHER_API;

type cityName = {
  name: string;
  sys: {
    country: string;
  };
};

type initWeatherType = {
  lat: number;
  lon: number;
};

export const weatherAPI = {
  getInitWeather(lat: number, lon: number) {
    return weather.get<initWeatherType>(
      `data/2.5/onecall?lat=${lat}&lon=${lon}${appId}`
    );
  },
  getCityName(lat: number, lon: number) {
    return weather.get<cityName>(
      `data/2.5/weather?lat=${lat}&lon=${lon}${appId}`
    );
  },
};
