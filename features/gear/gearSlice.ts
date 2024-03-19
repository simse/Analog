import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CameraType, LensType, FilmStock, Lens, Camera } from "../../types";

const initialState: {
  cameraTypes: CameraType[];
  lensTypes: LensType[];
  filmStocks: FilmStock[];
  cameras: Camera[];
  lenses: Lens[];
} = {
  cameraTypes: [],
  lensTypes: [],
  filmStocks: [],
  cameras: [],
  lenses: [],
};

export const gearSlice = createSlice({
  name: "gear",
  initialState,
  reducers: {
    loadSystemData: (
      state,
      action: PayloadAction<{
        cameraTypes: CameraType[];
        lensTypes: LensType[];
        filmStocks: FilmStock[];
      }>
    ) => {
      let cameraTypes = [
        ...(state.cameraTypes || []).filter(
          (cameraType) => cameraType.dataSource !== "system"
        ),
        ...action.payload.cameraTypes,
      ];

      let lensTypes = [
        ...(state.lensTypes || []).filter(
          (lensType) => lensType.dataSource !== "system"
        ),
        ...action.payload.lensTypes,
      ];

      let filmStocks = [
        ...(state.filmStocks || []).filter(
          (filmStock) => filmStock.dataSource !== "system"
        ),
        ...action.payload.filmStocks,
      ];

      return {
        ...state,
        cameraTypes,
        lensTypes,
        filmStocks,
      };
    },
    addCamera: (
      state,
      action: PayloadAction<{
        id: string;
        type: CameraType;
      }>
    ) => {
      return {
        ...state,
        cameras: [
          ...state.cameras,
          {
            id: action.payload.id,
            cameraType: action.payload.type.id,
          },
        ],
      };
    },
    deleteCamera: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        cameras: state.cameras.filter((camera) => camera.id !== action.payload),
      };
    },
  },
});

export const { loadSystemData, addCamera, deleteCamera } = gearSlice.actions;

export default gearSlice.reducer;
