import Papa from "papaparse";
import _ from "lodash";
const minute = 60000;

export const processDayFile = (file) => {
  return new Promise((resolve) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const values = [];
        const dates = [];
        const data = _.sortBy(results.data, "fromts");
        let prevousDate;

        data.forEach((result) => {
          const { deviceid, fromts, tots, metrics } = result;
          // look for gaps in rows to get time off that has no data
          if (prevousDate !== undefined && prevousDate !== fromts) {
            const offMinutes = (fromts - prevousDate) / minute;
            // A gap can be more than 1 minute
            for (let i = 0; i < offMinutes; i++) {
              const newFromts = +prevousDate + +minute * i;
              const newTots = +prevousDate + +minute * (i + 1);
              values.push({
                deviceid,
                fromts: new Date(newFromts),
                tots: new Date(newTots),
                Psum: { avgvalue: 0 }
              });
              dates.push(
                new Date(newTots)
                  .toISOString()
                  .replace("T", " ")
                  .replace(".000Z", "")
              );
            }
          }

          values.push({
            deviceid,
            fromts: new Date(+fromts),
            tots: new Date(+tots),
            ...JSON.parse(metrics)
          });
          dates.push(
            new Date(+tots).toISOString().replace("T", " ").replace(".000Z", "")
          );
          prevousDate = +tots;
        });
        resolve({ values, dates });
      }
    });
  });
};
