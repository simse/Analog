import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FilmStock, FilmRoll } from "@types";

const initialState: {
  filmStocks: FilmStock[];
  filmRolls: FilmRoll[];
  currentlyEditingFilmRoll?: Partial<FilmRoll>;
} = {
  filmStocks: [],
  filmRolls: [],
};

export const filmRollSlice = createSlice({
  name: "filmRoll",
  initialState,
  reducers: {
    loadSystemData: (
      state,
      action: PayloadAction<{
        filmStocks: FilmStock[];
      }>
    ) => {
      let filmStocks = [
        ...state.filmStocks.filter(
          (filmStock) => filmStock.dataSource !== "system"
        ),
        ...action.payload.filmStocks,
      ];

      return {
        ...state,
        filmStocks,
      };
    },
    addFilmRoll: (state, action: PayloadAction<FilmRoll>) => {
      return {
        ...state,
        filmRolls: [...(state.filmRolls || []), action.payload],
      };
    },
    updateCurrentlyEditingFilmRoll: (
      state,
      action: PayloadAction<Partial<FilmRoll>>
    ) => {
      return {
        ...state,
        currentlyEditingFilmRoll: {
          ...state.currentlyEditingFilmRoll,
          ...action.payload,
        },
      };
    },
    clearCurrentlyEditingFilmRoll: (state) => {
      return {
        ...state,
        currentlyEditingFilmRoll: undefined,
      };
    },
    commitCurrentlyEditingFilmRoll: (state) => {
      if (state.currentlyEditingFilmRoll) {
        return {
          ...state,
          filmRolls: [
            ...(state.filmRolls || []),
            state.currentlyEditingFilmRoll as FilmRoll,
          ],
          currentlyEditingFilmRoll: undefined,
        };
      }

      return state;
    }
  },
});

export const {
  loadSystemData,
  addFilmRoll,
  updateCurrentlyEditingFilmRoll,
  clearCurrentlyEditingFilmRoll,
  commitCurrentlyEditingFilmRoll
} = filmRollSlice.actions;

export default filmRollSlice.reducer;
