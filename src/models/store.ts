import { useDispatch } from "react-redux";
import store from "store/store";

type AppDIspatch = typeof store.dispatch;

export const useAppDispatch = (): AppDIspatch => useDispatch<AppDIspatch>();

export const fetchDataWithCoords = (
  callBack: (lat: number, lon: number) => Promise<void>
) => {
  navigator.geolocation.getCurrentPosition(
    ({ coords: { latitude, longitude } }) => callBack(latitude, longitude)
  );
};
