import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import ExpoFileSystemStorage from "redux-persist-expo-filesystem";

import gearReducer from "@features/gear/gearSlice";
import filmRollReducer from "@features/filmRoll/filmRollSlice";

const rootReducer = combineReducers({
  gear: gearReducer,
  filmRoll: filmRollReducer,
});

const persistConfig = {
  key: "root",
  storage: ExpoFileSystemStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type IRootState = ReturnType<typeof rootReducer>;
