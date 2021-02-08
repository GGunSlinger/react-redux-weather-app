import axios, { AxiosInstance } from "axios"

const weather: AxiosInstance = axios.create({
  baseURL: "http://api.openweathermap.org/",
})
let appId: string =
  "&units=metric&lang=en&appid=4aaa6ddbde83aae9ede27f89d73c503e"

type cityName = {
  name: string
  sys: {
    country: string
  }
}

type initWeatherType = {
  lat: number
  lon: number
}

export const weatherAPI = {
  getInitWeather(lat: number, lon: number) {
    return weather.get<initWeatherType>(
      `data/2.5/onecall?lat=${lat}&lon=${lon}${appId}`
    )
  },
  getCityName(lat: number, lon: number) {
    return weather.get<cityName>(
      `data/2.5/weather?lat=${lat}&lon=${lon}${appId}`
    )
  },
}
