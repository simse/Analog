import { endActivity, startActivity } from "@modules/session-activity";
import type { FilmRoll } from "@types";

const startSessionActivity = (
  title: string,
  progress: number,
  length: number
) => {
  console.log("startSessionActivity", title, progress, length);

  let oneHourLater = new Date();
  oneHourLater.setHours(oneHourLater.getHours() + 1);

  startActivity({
    startTime: new Date(),
    endTime: oneHourLater,
    title,
    progress,
    length,
  });
};

const endSessionActivity = (
  title: string,
  progress: number,
  length: number
) => {
  console.log("endSessionActivity", title, progress, length);

  endActivity({
    title,
    progress,
    length,
  });
};

const updateSessionActivity = (
  title: string,
  currentProgress: number,
  previousProgress: number,
  length: number
) => {
  console.log("updateSessionActivity", title, currentProgress, previousProgress, length);

  endActivity({
    title,
    progress: previousProgress,
    length,
  });

  startSessionActivity(title, currentProgress, length);
};

export { startSessionActivity, endSessionActivity, updateSessionActivity };
