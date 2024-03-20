import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CameraType, LensType, Lens, Camera } from "@types";

const initialState: {
  cameraTypes: CameraType[];
  lensTypes: LensType[];
  cameras?: Camera[];
  lenses?: Lens[];
} = {
  cameraTypes: [],
  lensTypes: [],
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

      return {
        ...state,
        cameraTypes,
        lensTypes,
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
          ...(state.cameras || []),
          {
            id: action.payload.id,
            cameraType: action.payload.type.id,
            displayName: `${action.payload.type.make} ${action.payload.type.model}`,
          },
        ],
      };
    },
    deleteCamera: (state, action: PayloadAction<string>) => {
      if (!state.cameras) {
        return state;
      }

      return {
        ...state,
        cameras: state.cameras.filter((camera) => camera.id !== action.payload),
      };
    },
    addLens: (
      state,
      action: PayloadAction<{
        id: string;
        type: LensType;
      }>
    ) => {
      return {
        ...state,
        lenses: [
          ...(state.lenses || []),
          {
            id: action.payload.id,
            lensType: action.payload.type.id,
            displayName: `${action.payload.type.make} ${action.payload.type.model}`,
          },
        ],
      };
    },
    deleteLens: (state, action: PayloadAction<string>) => {
      if (!state.lenses) {
        return state;
      }

      return {
        ...state,
        lenses: state.lenses.filter((lens) => lens.id !== action.payload),
      };
    },
  },
});

export const { loadSystemData, addCamera, deleteCamera, addLens, deleteLens } = gearSlice.actions;

export default gearSlice.reducer;
