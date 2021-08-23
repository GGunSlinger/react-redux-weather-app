import { useDispatch } from "react-redux";
import store from "store/store";

type AppDIspatch = typeof store.dispatch;

export const useAppDispatch = (): AppDIspatch => useDispatch<AppDIspatch>();
