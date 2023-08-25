import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";

function Charts({ data }) {
  const barData = data?.barChartData;
  const pieData = data?.pieChartData;
  const barChartData = {
    labels: barData?.map((item) => item._id),
    datasets: [
      {
        label: "likes",
        data: barData?.map((item) => item.likes),
      },
      {
        label: "views",
        data: barData?.map((item) => item.views),
      },
    ],
  };
  const pieChartData = {
    labels: pieData?.map((item) => item._id),
    datasets: [
      {
        label: "blogs",
        data: pieData?.map((item) => item.blogsCount),
        backgroundColor: ["#0074D9", "#FF4136"],
      },
    ],
  };
  return (
    <div className="w-[100%] h-[100%] flex justify-between">
      <div className="bg-gray-800 rounded-xl w-[45%] h-[100%] p-2">
        <Bar
          width={"100%"}
          height={"100%"}
          data={barChartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </div>
      <div className="bg-gray-800 rounded-xl w-[45%] h-[100%] p-2">
        <Pie
          data={pieChartData}
          options={{ responsive: true, maintainAspectRatio: false }}
          width={"100%"}
          height={"100%"}
        />
      </div>
    </div>
  );
}

export default Charts;
