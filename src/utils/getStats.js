import { getMode } from "./arrayUtils";

export const getStats = (dataset) => {
  const arr = JSON.parse(JSON.stringify(dataset));
  const mode = getMode(arr.map((v) => parseInt(v)));
  const idle = mode * 0.2;
  const unloaded = 2;
  var totalLoaded = 0,
    totalIdle = 0,
    totalUnloaded = 0,
    totalOff = 0;
  for (const data of dataset) {
    if (data > idle) totalLoaded++;
    if (data <= idle && data > unloaded) totalIdle++;
    if (data <= unloaded && data > 0) totalUnloaded++;
    if (data === 0) totalOff++;
  }
  return { totalLoaded, totalIdle, totalUnloaded, totalOff, mode, idle };
};
