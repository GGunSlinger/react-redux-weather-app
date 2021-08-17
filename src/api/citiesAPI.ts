import { citiesType } from "./../types/types";
import axios, { AxiosInstance } from "axios";

const baseURL = process.env.PORT
  ? "https://react-ts-weather-app.herokuapp.com/"
  : `http://localhost:${process.env.REACT_APP_PORT}/`;

const cities: AxiosInstance = axios.create({ baseURL });

export const citiesAPI = {
  getCities() {
    return cities.get<citiesType[]>("cities");
  },
  deleteCity(id: number) {
    return cities.delete<citiesType>(`cities/${id}`);
  },
  setCity(city: string, lat: number, lon: number) {
    return cities.post<citiesType>("cities", {
      city: city,
      lat: lat,
      lon: lon,
    });
  },
};
