import {Day} from '../days';

export type SafetyNet = {
  fails: (logMessage?: (ct: number, duration: number) => string | number) => boolean;
  reason: string;
  duration: number;
  loops: number;
}

export function safetyNet({
  maxLoops = 1e4,
  maxMs = 5_000,
  logLoopInterval = (maxLoops / 10)
}: Day['meta'] = {}): SafetyNet {
  let start = performance.now();
  let ct = 0;
  let duration = 0;
  let reason = "pass";

  return {
    fails(logMessage) {
      duration = Math.round(performance.now() - start);
      if (++ct > maxLoops){
        reason = "Too many loops. Controlled by `meta.maxLoops`.  Use a `logMessage` function to show intermediate steps.";
        return true;
      }
      if (duration > maxMs) {
        reason = "Too long. Controlled by `meta.maxMs`. Use a `logMessage` function to show intermediate steps.";
        return true;
      }

      if (logMessage && (logLoopInterval > 0) && !(ct % logLoopInterval)) {
        console.log(logMessage(ct, duration))
      }

      return false;
    },
    get reason() {
      return `${reason} (${ct} loops in ${duration}ms)`;
    },
    get duration() { return duration; },
    get loops() { return ct; }
  };
}

export const simpleSafetyLog: Parameters<SafetyNet['fails']>[0] = (ct, d) => `${ct} @ ${d}ms`;
