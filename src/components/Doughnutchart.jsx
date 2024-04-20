import React from "react";
import { Doughnut } from "react-chartjs-2";

const Doughnutchart = ({ dt, innerTitle }) => {
  // console.log(dt);
  const data = {
    // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "Total",
        data: [dt],
        cutout: 55,
        doughnutBackground: {
          enabled: true,
          // color: "#E4E6E6",
          color: "#ffffff",
        },
        // borderRadius: Number.MAX_VALUE,
        backgroundColor: [
          // "rgba(255, 99, 132, 0.2)",
          // "rgba(54, 162, 235, 0.2)",
          // "rgba(255, 206, 86, 0.2)",
          // "rgba(75, 192, 192, 0.2)",
          // "rgba(153, 102, 255, 0.2)",
          // "rgba(255, 159, 64, 0.2)",
          // "rgba(5,4,102)",
          "rgb(60, 155, 20)",
        ],
        borderColor: [
          // "rgba(255, 99, 132, 1)",
          // "rgba(54, 162, 235, 1)",
          // "rgba(255, 206, 86, 1)",
          // "rgba(75, 192, 192, 1)",
          // "rgba(153, 102, 255, 1)",
          // "rgba(255, 159, 64, 0)",
        ],
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };

  const myPluginSuperText = {
    id: "myPlugin",
    beforeDraw: (chart) => {
      const ctx = chart.ctx;
      const xCoor =
        chart.chartArea.left +
        (chart.chartArea.right - chart.chartArea.left) / 2;
      const yCoor =
        chart.chartArea.top +
        (chart.chartArea.bottom - chart.chartArea.top) / 2.3;
      ctx.save();
      ctx.beginPath();
      ctx.arc(xCoor, 64, 55, 0, 2 * Math.PI);
      ctx.fillStyle = "rgba(18, 74, 43, 0.1)";
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#003300";
      ctx.stroke();

      ctx.font = "bold 24px 'DM sans', sans-serif";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(``, xCoor, yCoor);
      ctx.restore();
    },
  };
  const myPluginSubText = {
    id: "myPlugin",
    beforeDraw: (chart) => {
      const ctx = chart.ctx;
      const xCoor =
        chart.chartArea.left +
        (chart.chartArea.right - chart.chartArea.left) / 2;
      const yCoor =
        chart.chartArea.top +
        (chart.chartArea.bottom - chart.chartArea.top) / 1.6;
      ctx.save();
      ctx.font = "normal 14px 'DM sans', sans-serif";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      // ctx.fillText(`${innerTitle} cases`, xCoor, yCoor);
      ctx.restore();
    },
  };

  return (
    <>
      <Doughnut data={data} plugins={[myPluginSuperText, myPluginSubText]} />
    </>
  );
};

export default Doughnutchart;
