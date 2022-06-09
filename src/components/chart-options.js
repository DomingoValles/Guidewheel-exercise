export default {
  responsive: true,
  plugins: {
    legend: {
      position: "top"
    },
    zoom: {
      zoom: {
        wheel: {
          enabled: true
        },
        pinch: {
          enabled: true
        },
        mode: "xy"
      }
    },
    annotation: {
      annotations: [
        {
          type: "line",
          mode: "horizontal",
          scaleID: "y",
          value: 0,
          borderColor: "rgb(0, 176, 82,69)",
          borderWidth: 2,
          label: {
            backgroundColor: "grey",
            content: "100% operation load",
            enabled: true,
            position: "end"
          }
        },
        {
          type: "line",
          mode: "horizontal",
          scaleID: "y",
          value: 0,
          borderColor: "rgb(52, 141, 245,96)",
          borderWidth: 2,
          label: {
            backgroundColor: "grey",
            content: "idle",
            enabled: true
          }
        },
        {
          type: "line",
          mode: "horizontal",
          scaleID: "y",
          value: 2,
          borderColor: "rgb(235, 167, 31,92)",
          borderWidth: 2,
          label: {
            backgroundColor: "grey",
            content: "unloaded",
            enabled: true,
            position: "start"
          }
        }
      ]
    }
  }
};
