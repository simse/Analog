import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FilmStock, FilmRoll, Picture } from "@types";

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
  selectors: {
    getFilmRolls: (state) => state.filmRolls,
    getPicture: (state, filmRollId: string, pictureId: string) => {
      let filmRoll = state.filmRolls.find(
        (filmRoll) => filmRoll.id === filmRollId
      );

      if (filmRoll) {
        return filmRoll.pictures.find((picture) => picture.id === pictureId);
      }

      return undefined;
    }
  },
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
    deleteFilmRoll: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        filmRolls: state.filmRolls.filter(
          (filmRoll) => filmRoll.id !== action.payload
        ),
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
    },
    addPictureToFilmRoll: (
      state,
      action: PayloadAction<{ filmRollId: string; picture: Picture }>
    ) => {
      let filmRoll = state.filmRolls.find(
        (filmRoll) => filmRoll.id === action.payload.filmRollId
      );

      if (filmRoll) {
        let pictures = [...filmRoll.pictures, action.payload.picture];

        return {
          ...state,
          filmRolls: state.filmRolls.map((filmRoll) =>
            filmRoll.id === action.payload.filmRollId
              ? { ...filmRoll, pictures }
              : filmRoll
          ),
        };
      }

      return state;
    },
    deleteLastPictureFromFilmRoll: (
      state,
      action: PayloadAction<{ filmRollId: string }>
    ) => {
      let filmRoll = state.filmRolls.find(
        (filmRoll) => filmRoll.id === action.payload.filmRollId
      );

      if (filmRoll) {
        let pictures = filmRoll.pictures.slice(0, -1);

        return {
          ...state,
          filmRolls: state.filmRolls.map((filmRoll) =>
            filmRoll.id === action.payload.filmRollId
              ? { ...filmRoll, pictures }
              : filmRoll
          ),
        };
      }

      return state;
    }
  },
});

export const {
  loadSystemData,
  addFilmRoll,
  deleteFilmRoll,
  updateCurrentlyEditingFilmRoll,
  clearCurrentlyEditingFilmRoll,
  commitCurrentlyEditingFilmRoll,
  addPictureToFilmRoll,
  deleteLastPictureFromFilmRoll
} = filmRollSlice.actions;

export const {
  getFilmRolls,
  getPicture
} = filmRollSlice.selectors;

export default filmRollSlice.reducer;
