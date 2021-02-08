import { createSlice } from "@reduxjs/toolkit"
import { citiesAPI } from "../api/citiesAPI"
import { weatherAPI } from "../api/weatherAPI"
import { AppThunk, RootState } from "../app/store"
import { weatherStateType, citiesType } from "../types/types"

const initialState: weatherStateType = {
  cities: null,
  hourlyWeather: null,
  dailyWeather: null,
  error: false,
  tomorrowWeather: {
    temp: null,
    wind_speed: null,
    sky: null,
    pressure: null,
    feels_like: null,
    visibility: 0,
    city: "",
    country: null,
    snow: null,
    rain: null,
    humidity: null,
    lat: 0,
    lon: 0,
  },
  currentCityData: {
    temp: null,
    wind_speed: null,
    sky: null,
    pressure: null,
    feels_like: null,
    visibility: 0,
    city: "",
    country: null,
    snow: null,
    rain: null,
    humidity: null,
    lat: 0,
    lon: 0,
  },
}

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setCurrentWeather: (state: weatherStateType, action) => {
      let { currentCityData, tomorrowWeather } = state
      let { payload } = action
      let { current, daily } = payload
      // today
      currentCityData.temp = Math.round(current.temp) as number
      currentCityData.wind_speed = current.wind_speed as number
      currentCityData.sky = current.weather[0].main as string
      currentCityData.city = payload.cityName as string
      currentCityData.country = payload.countryName as string
      currentCityData.lat = payload.lat as number
      currentCityData.lon = payload.lon as number
      currentCityData.feels_like = Math.round(current.feels_like) as number
      currentCityData.pressure = current.pressure as number
      currentCityData.visibility = current.visibility as number
      currentCityData.snow = current.snow as number
      currentCityData.rain = current.rain as number
      currentCityData.humidity = current.humidity as number
      // tomorrow
      tomorrowWeather.temp = daily[0].temp.day as number
      tomorrowWeather.wind_speed = daily[0].wind_speed as number
      tomorrowWeather.sky = daily[0].weather[0].main as string
      tomorrowWeather.city = payload.cityName as string
      tomorrowWeather.country = payload.countryName as string
      tomorrowWeather.lat = payload.lat as number
      tomorrowWeather.lon = payload.lon as number
      tomorrowWeather.feels_like = daily[0].feels_like.day as number
      tomorrowWeather.pressure = daily[0].pressure as number
      currentCityData.visibility = current.visibility as number
      tomorrowWeather.snow = daily[0].snow as number
      tomorrowWeather.rain = daily[0].rain as number
      tomorrowWeather.humidity = daily[0].humidity as number
      // hourly
      state.hourlyWeather = action.payload.hourly
      // daily
      state.dailyWeather = action.payload.daily
    },
    setCities: (state: weatherStateType, action) => {
      state.cities = action.payload as citiesType[]
    },
    setError: (state: weatherStateType, action) => {
      state.error = action.payload as boolean
    },
  },
})

export const { setCurrentWeather, setCities, setError } = weatherSlice.actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

type cityName = {
  cityName: string
  countryName: string
}

const fetchCityName = async (lat: number, lon: number): Promise<cityName> => {
  const cityData = await weatherAPI.getCityName(lat, lon)
  return {
    cityName: cityData.data.name,
    countryName: cityData.data.sys.country,
  }
}

type positionType = {
  coords: {
    latitude: number
    longitude: number
  }
}

type initWeatherType = {
  data: {
    lat: number
    lon: number
  }
}

export const fetchWeather = (): AppThunk => (dispatch) => {
  navigator.geolocation.getCurrentPosition(({ coords }: positionType) => {
    weatherAPI
      .getInitWeather(coords.latitude, coords.longitude)
      .then(async ({ data }: initWeatherType) => {
        const nameData = await fetchCityName(data.lat, data.lon)
        dispatch(setCurrentWeather({ ...nameData, ...data }))
      })
      .catch(() => dispatch(setError(true)))
  })
}

export const fetchWeatherByLatLng = (lat: number, lon: number): AppThunk => (
  dispatch
) => {
  weatherAPI
    .getInitWeather(lat, lon)
    .then(async ({ data }: initWeatherType) => {
      const nameData = await fetchCityName(data.lat, data.lon)
      dispatch(setCurrentWeather({ ...nameData, ...data }))
    })
    .catch(() => dispatch(setError(true)))
}

export const fetchCities = (): AppThunk => (dispatch) => {
  citiesAPI.getCities().then((res) => dispatch(setCities(res.data)))
}

export const saveCity = (city: string, lat: number, lon: number): AppThunk => (
  dispatch
) => {
  citiesAPI.setCity(city, lat, lon).then(() => dispatch(fetchCities()))
}

export const removeCity = (id: number): AppThunk => (dispatch) => {
  citiesAPI.deleteCity(id).then(() => dispatch(fetchCities()))
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.weather.value)`

export const selectState = (state: RootState) => state.weather
export const selectError = (state: RootState) => state.weather.error
export const selectCities = (state: RootState) => state.weather.cities
export const selectHourlyWeather = (state: RootState) => {
  return state.weather.hourlyWeather
}
export const selectDailyWeather = (state: RootState) => {
  return state.weather.dailyWeather
}
export const selectTomorrowWeather = (state: RootState) => {
  return state.weather.tomorrowWeather
}

export const selectCurrentWeather = (state: RootState) => {
  return state.weather.currentCityData
}

export default weatherSlice.reducer
