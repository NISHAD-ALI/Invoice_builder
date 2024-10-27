import { configureStore } from '@reduxjs/toolkit';
import invoiceReducer from './slice'

const store = configureStore({
  reducer: {
    invoice: invoiceReducer,
  },
});

export default store;