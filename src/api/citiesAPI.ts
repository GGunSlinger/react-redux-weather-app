import { citiesType } from "./../types/types";
import axios, { AxiosInstance } from "axios";

const port = process.env.PORT || process.env.REACT_APP_PORT;

const cities: AxiosInstance = axios.create({
  baseURL: `http://localhost:${port}/`,
});
console.log(process.env.PORT);
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
