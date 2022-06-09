import React from "react";
import { Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import annotationPlugin from "chartjs-plugin-annotation";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { getStats } from "../utils/getStats";
import options from "./chart-options";

import "../styles.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin,
  annotationPlugin
);

const MetricsChart = ({ values, labels, keyChannel }) => {
  const chartRef = React.useRef(null);
  const resetZoom = () => {
    chartRef.current.resetZoom();
  };
  const isWithData = values.length > 0;
  const startDate = values[0].fromts.toLocaleString();
  const endDate = values[values.length - 1].tots.toLocaleString();
  const channel = values.map((valueX) => valueX[keyChannel].avgvalue);
  const machineName = values[0].deviceid;
  const {
    totalLoaded,
    totalIdle,
    totalUnloaded,
    totalOff,
    mode,
    idle
  } = getStats(channel);
  const totalOperationTime = totalOff + totalIdle + totalUnloaded + totalLoaded;
  options.plugins.annotation.annotations[0].value = mode;
  options.plugins.annotation.annotations[1].value = idle;

  const datasets = [
    {
      label: "PSUM",
      data: channel,
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)"
    }
  ];

  return (
    <div className="ChartComponent">
      <>
        {/* leyenda de hacer zoom y los colores */}
        {isWithData && (
          <div>
            This information is from machine <b>{machineName}</b> for the date
            range: <b>{startDate}</b> to <b>{endDate}</b>
          </div>
        )}
        <div className="MetricsContainer">
          <div className="MetricOff">
            Off time: {totalOff.toLocaleString()} min
          </div>
          <div className="MetricUnloaded">
            Unloaded time: {totalUnloaded.toLocaleString()} min
          </div>
          <div className="MetricIdle">
            Idle time: {totalIdle.toLocaleString()} min
          </div>
          <div className="MetricLoaded">
            Loaded time: {totalLoaded.toLocaleString()} min
          </div>
          <br />
          <div className="Metric">
            Total operation time: {totalOperationTime.toLocaleString()} min
          </div>
        </div>
        <div className="ZoomButton">
          <button onClick={resetZoom}>Reset Zoom </button>
          <span className="ZoomLegend">*You can zoom with se scroll wheel</span>
        </div>
        <Line
          ref={chartRef}
          data={{
            labels,
            datasets
          }}
          options={options}
        />
      </>
    </div>
  );
};

export default MetricsChart;
