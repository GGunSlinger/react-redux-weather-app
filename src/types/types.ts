export type currentCityDataType = {
  temp: null | number;
  wind_speed: null | number;
  sky: null | number;
  pressure: null | number;
  feels_like: null | number;
  visibility: null | number;
  city: null | string;
  country: null | string;
  snow?: null | number;
  rain?: null | number;
  humidity: null | number;
  lat: null | number;
  lon: null | number;
};

export type tomorrowWeather = {
  temp: null | number;
  wind_speed: null | number;
  sky: null | string;
  pressure: null | number;
  feels_like: null | number;
  city: null | string;
  country: null | string;
  snow?: null | number;
  rain?: null | number;
  humidity: null | number;
  lat: null | number;
  lon: null | number;
};

export type citiesType = {
  city: string;
  id: number;
  lat: number;
  lon: number;
};

export type weatherStateType = {
  cities: null | citiesType;
  hourlyWeather: null | [];
  currentCityData: currentCityDataType;
  dailyWeather: null | [];
  error: boolean;
  tomorrowWeather: tomorrowWeather;
};
