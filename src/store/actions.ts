import { createAsyncThunk } from "@reduxjs/toolkit";
import { citiesAPI } from "api/citiesAPI";
import { weatherAPI } from "api/weatherAPI";
import { Coords } from "models/weather";

const FETCH_WEATHER = "weather/FETCH_WEATHER";
const FETCH_CITY = "weather/FETCH_CITY";
const ADD_CITY = "weather/ADD_CITY";
const DELETE_CITY = "weather/DELETE_CITY";

export const fetchWeather = createAsyncThunk(
  FETCH_WEATHER,
  async ({ lat, lon }: Coords, { rejectWithValue }) => {
    try {
      const weekly = await weatherAPI.getWeather(lat, lon);
      const current = await weatherAPI.getWeatherWithLocationNames(lat, lon);
      const cityName = current.data.name;
      const countryName = current.data.sys.country;
      console.log(weekly.data);
      return { ...weekly.data, cityName, countryName };
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const fetchCities = createAsyncThunk(
  ADD_CITY,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await citiesAPI.getCities();
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

type SaveCityParam = { cityName: string } & Coords;

export const saveCity = createAsyncThunk(
  FETCH_CITY,
  async ({ cityName, lat, lon }: SaveCityParam, { rejectWithValue }) => {
    try {
      const { data } = await citiesAPI.setCity(cityName, lat, lon);
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const deleteCity = createAsyncThunk(
  DELETE_CITY,
  async (id: number, { rejectWithValue }) => {
    try {
      return citiesAPI.deleteCity(id);
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
