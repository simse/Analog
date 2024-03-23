// Import the native module. On web, it will be resolved to LiveActivityControl.web.ts
// and on native platforms to LiveActivityControl.ts
import SessionActivityModule from './src/SessionActivityModule';

export function areActivitiesEnabled(): boolean {
  return SessionActivityModule.areActivitiesEnabled();
}

type EndActivityOptions = {
  title: string;
  length: number;
  progress: number;
}

type StartActivityOptions = EndActivityOptions & {
  startTime: Date;
  endTime: Date;
}

/**
 * Starts an iOS Live Activity.
 * @param options Options for the activity.
 */
export function startActivity(options: StartActivityOptions): boolean {
  return startActivityInner(
    Math.floor(options.startTime.getTime() / 1000),
    Math.floor(options.endTime.getTime() / 1000),
    options.title,
    options.progress,
    options.length
  );
}

function startActivityInner(
  startTime: number,
  endTime: number,
  title: string,
  progress: number,
  length: number
): boolean {
  return SessionActivityModule.startActivity(
    startTime,
    endTime,
    title,
    length,
    progress
  );
}

/**
 * Ends an iOS Live Activity.
 * @param options Options for the activity.
 */
export function endActivity(options: EndActivityOptions): void {
  endActivityInner(options.title, options.length, options.progress);
}

function endActivityInner(
  title: string,
  length: number,
  progress: number
): void {
  SessionActivityModule.endActivity(title, length, progress);
}