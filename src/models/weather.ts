export type City = {
  city: string;
  id: number;
  lat: number;
  lon: number;
};

export type HourlyWeather = {
  dt: number;
  temp: number;
  weather: { main: string }[];
  wind_speed: number;
};

type WeatherExtra = {
  description: string;
  icon: string;
  id: number;
  main: string;
};

export type Coords = {
  lat: number;
  lon: number;
};

export type Weather = {
  weather: WeatherExtra[];
  sky: string;
  temp: number;
  feels_like: number;
  wind_speed: number;
  lat: number;
  lon: number;
  cityName: string;
  countryName: string;
  pressure: number;
  visibility: number;
  dt: number;
  name: string;
};

type DailyWeather = {
  dt: number;
  temp: {
    day: number;
    morn: number;
    night: number;
  };
  snow: number;
  humidity: number;
  rain: number;
} & Weather;

export type CurrentWeatherApiRes = {
  sys: {
    country: string;
  };
  name: string;
  wind: {
    speed: number;
    deg: number;
  };
  weather: WeatherExtra[];
  main: Weather;
  coord: {
    lat: number;
    lon: number;
  };
};

export type CurrentWeather = {
  deg?: number;
  main: Weather;
  lat: number;
  lon: number;
} & Weather;

export type WeeklyWeather = {
  current: CurrentWeather;
  daily: DailyWeather[];
  hourly: Weather[];
  minutely: Weather[];
  timezone: string;
  lat: number;
  lon: number;
  cityName: string;
  countryName: string;
};

export type WeatherState = {
  cities: null | City[];
  hourlyWeather: null | Weather[];
  currentWeather: null | CurrentWeather;
  dailyWeather: null | DailyWeather[];
  error: boolean;
};
