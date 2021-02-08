export type currentCityDataType = {
  temp: null | number
  wind_speed: null | number
  sky: null | string
  pressure: null | number
  feels_like: null | number
  visibility: number
  city: string
  country: null | string
  snow?: null | number
  rain?: null | number
  humidity: null | number
  lat: number
  lon: number
}

export type citiesType = {
  city: string
  id: number
  lat: number
  lon: number
}

export type HourlyWeatherType = {
  dt: number
  temp: number
  weather: Array<{ main: string }>
  wind_speed: number
}

export type DailyWeatherType = {
  dt: number
  temp: {
    day: number
    morn: number
    night: number
  }
  weather: Array<{ main: string }>
  snow: number
  humidity: number
  rain: number
}

export type weatherStateType = {
  cities: null | Array<citiesType>
  hourlyWeather: null | HourlyWeatherType[]
  currentCityData: currentCityDataType
  dailyWeather: null | DailyWeatherType[]
  error: boolean
  tomorrowWeather: currentCityDataType
}
