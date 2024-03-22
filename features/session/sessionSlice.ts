import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Session } from "@types";

const initialState: Session[] = [];

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  selectors: {
    getSession: (state, id: string) =>
      state.find((session) => session.id === id),
    getActiveSession: (state) => state.find((session) => !session.finished),
  },
  reducers: {
    startSession: (state, action: PayloadAction<Session>) => {
      // stop any other sessions
      const sessions = state.map((session) => ({ ...session, paused: false, finished: new Date().toISOString() }));

      return [...sessions, action.payload];
    },
    pauseSession: (state, action: PayloadAction<string>) => {
      return state.map((session) =>
        session.id === action.payload ? { ...session, paused: true } : session
      );
    },
    resumeSession: (state, action: PayloadAction<string>) => {
      return state.map((session) =>
        session.id === action.payload ? { ...session, paused: false } : session
      );
    },
    finishSession: (state, action: PayloadAction<string>) => {
      return state.map((session) =>
        session.id === action.payload
          ? { ...session, finished: new Date().toISOString() }
          : session
      );
    },
    clearSessions: () => {
      return [];
    },
  },
});

export const {
  startSession,
  pauseSession,
  resumeSession,
  finishSession,
  clearSessions,
} = sessionSlice.actions;

export const { getSession, getActiveSession } = sessionSlice.selectors;

export default sessionSlice.reducer;
