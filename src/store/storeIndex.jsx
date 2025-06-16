import { configureStore } from "@reduxjs/toolkit";

import genSliceReducer from "./generalSlice";

const store = configureStore({
  reducer: {
    gen: genSliceReducer,
  },
});

export default store;
