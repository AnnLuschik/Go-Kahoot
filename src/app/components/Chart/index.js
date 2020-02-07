import React from "react";
import { Bar } from "react-chartjs-2";

const changeData = data => {
  return {
    labels: data.map(({ name }) => name),
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: data.map(({ rightAnswers }) => rightAnswers)
      }
    ]
  };
};

const Chart = ({ data }) => {
  return (
    <div style={{ width: 300 }}>
      <h2>Bar Example (custom size)</h2>
      <Bar
        data={changeData(data)}
        width={100}
        height={50}
        options={{
          maintainAspectRatio: false
        }}
      />
    </div>
  );
};

export default Chart;
