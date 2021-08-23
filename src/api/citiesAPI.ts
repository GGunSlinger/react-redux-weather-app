import { City } from "models/weather";
import axios, { AxiosInstance } from "axios";

const cities: AxiosInstance = axios.create({
  baseURL: "https://wether-app-server.herokuapp.com/",
});

export const citiesAPI = {
  getCities() {
    return cities.get<City[]>("cities");
  },
  deleteCity(id: number) {
    return cities.delete<City>(`cities/${id}`);
  },
  setCity(city: string, lat: number, lon: number) {
    return cities.post<City>("cities", {
      city: city,
      lat: lat,
      lon: lon,
    });
  },
};
