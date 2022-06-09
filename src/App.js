import React from "react";
import { processDayFile } from "./utils/processDayFile";
import MetricsChart from "./components/chart";
import "./styles.css";

export default function App() {
  const [rows, setRows] = React.useState([]);
  const [labels, setLabels] = React.useState([]);

  const handleChange = async (event) => {
    const file = event.target.files[0];
    const { values, dates } = await processDayFile(file);
    setRows(values);
    setLabels(dates);
  };

  return (
    <div className="App">
      <h1>Guidewheel Exercise</h1>
      <h3>Machine working report</h3>
      <div>
        {!rows.length ? (
          <>
            <input
              type="file"
              name="file"
              accept=".csv"
              onChange={handleChange}
              style={{ display: "block", margin: "10px auto" }}
            />
            <div className="DownloadFile">
              If you don't have a file, you can download this{" "}
              <a href="/data.csv" download>
                file
              </a>
            </div>
          </>
        ) : (
          <MetricsChart values={rows} labels={labels} keyChannel={"Psum"} />
        )}
      </div>
    </div>
  );
}
