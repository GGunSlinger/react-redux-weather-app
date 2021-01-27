import { createSlice } from "@reduxjs/toolkit"
import { citiesAPI } from "../api/citiesAPI"
import { weatherAPI } from "../api/weatherAPI"
import { AppThunk, RootState } from "../app/store"
import { weatherStateType } from "../types/types"

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
    city: null,
    country: null,
    snow: null,
    rain: null,
    humidity: null,
    lat: null,
    lon: null,
  },
  currentCityData: {
    temp: null,
    wind_speed: null,
    sky: null,
    pressure: null,
    feels_like: null,
    visibility: null,
    city: null,
    country: null,
    snow: null,
    rain: null,
    humidity: null,
    lat: null,
    lon: null,
  },
}

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setCurrentWeather: (state, action) => {
      // today
      state.currentCityData.temp = Math.round(action.payload.current.temp)
      state.currentCityData.wind_speed = action.payload.current.wind_speed
      state.currentCityData.sky = action.payload.current.weather[0].main
      state.currentCityData.city = action.payload.cityName
      state.currentCityData.country = action.payload.countryName
      state.currentCityData.lat = action.payload.lat
      state.currentCityData.lon = action.payload.lon
      state.currentCityData.feels_like = Math.round(
        action.payload.current.feels_like
      )
      state.currentCityData.pressure = action.payload.current.pressure
      state.currentCityData.visibility = action.payload.current.visibility
      state.currentCityData.snow = action.payload.current.snow
      state.currentCityData.rain = action.payload.current.rain
      state.currentCityData.humidity = action.payload.current.humidity
      // tomorrow
      state.tomorrowWeather.temp = action.payload.daily[0].temp.day
      state.tomorrowWeather.wind_speed = action.payload.daily[0].wind_speed
      state.tomorrowWeather.sky = action.payload.daily[0].weather[0].main
      state.tomorrowWeather.city = action.payload.cityName
      state.tomorrowWeather.country = action.payload.countryName
      state.tomorrowWeather.lat = action.payload.lat
      state.tomorrowWeather.lon = action.payload.lon
      state.tomorrowWeather.feels_like = action.payload.daily[0].feels_like.day
      state.tomorrowWeather.pressure = action.payload.daily[0].pressure
      state.tomorrowWeather.snow = action.payload.daily[0].snow
      state.tomorrowWeather.rain = action.payload.daily[0].rain
      state.tomorrowWeather.humidity = action.payload.daily[0].humidity
      // hourly
      state.hourlyWeather = action.payload.hourly
      // daily
      state.dailyWeather = action.payload.daily
    },
    setCities: (state, action) => {
      state.cities = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const { setCurrentWeather, setCities, setError } = weatherSlice.actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

const fetchCityName = async (lat: string, lon: string) => {
  const cityData = await weatherAPI.getCityName(lat, lon)
  return {
    cityName: cityData.data.name,
    countryName: cityData.data.sys.country,
  }
}

export const fetchWeather = (): AppThunk => (dispatch) => {
  debugger
  navigator.geolocation.getCurrentPosition(function (position) {
    weatherAPI
      .getInitWeather(position.coords.latitude, position.coords.longitude)
      .then(async (res: any) => {
        console.log(res)
        const nameData = await fetchCityName(res.data.lat, res.data.lon)
        dispatch(setCurrentWeather({ ...nameData, ...res.data }))
      })
      .catch(() => dispatch(setError(true)))
  })
}

export const fetchWeatherByLatLng = (lat: number, lon: number): AppThunk => (
  dispatch
) => {
  weatherAPI
    .getInitWeather(lat, lon)
    .then(async (res: any) => {
      const nameData = await fetchCityName(res.data.lat, res.data.lon)
      dispatch(setCurrentWeather({ ...nameData, ...res.data }))
    })
    .catch(() => dispatch(setError(true)))
}

export const fetchCities = (): AppThunk => (dispatch) => {
  citiesAPI.getCities().then((res: any) => dispatch(setCities(res.data)))
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
