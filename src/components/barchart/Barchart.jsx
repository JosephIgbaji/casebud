import React from "react";
import { Bar } from "react-chartjs-2";

const Barchart = ({ obj }) => {
  const labels = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  // const labels = obj.map((dt) => {
  //   return dt.month;
  // });

  let data = [];

  for (let i = 0; i < labels.length; i++) {
    obj.map((dt) => {
      if (labels[i] == dt.month) {
        data.push(dt.count);
      } else {
        data.push(0);
      }
    });
  }

  // concountst data = obj.map((dt) => {
  //   return dt.count;
  // });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    maxBarThickness: 20,
    scales: {
      x: {
        grid: {
          display: false,
          tickBorderDash: 0,
        },
        border: {
          display: false,
        },
        ticks: {
          font: {
            weight: "normal",
          },
          major: {
            enable: true,
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
    },
  };

  const barChartData = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data,
        backgroundColor: "#3C9B14",
        borderRadius: 20,
        borderSkipped: false,
      },
    ],
  };

  return (
    <div className="pt-4 h-80 w-full">
      <Bar options={options} data={barChartData} className="w-full" />
    </div>
  );
};

export default Barchart;
