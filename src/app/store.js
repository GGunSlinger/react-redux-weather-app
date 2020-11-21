import { configureStore } from '@reduxjs/toolkit';
import weather from '../redux/weatherSlice';

export default configureStore({
  reducer: {
    weather,
  },
});
