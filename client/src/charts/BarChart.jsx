import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);


function BarChart({ title, budget, unit, onEntryValueChange }) {
  const costSplitLabel = ["Planning", "Structure", "Mechanical", "Electrical", "Plumbing", "Painting", "Furnishing"];
  let entry;

  if (unit === "squareMeter") {
    // If "Square Meter" unit is selected, convert title to square feet 
    title = title * 10.67;
  }

  if (budget === "low") {
    entry = 2000 * title;
  } else if (budget === "medium") {
    entry = 3000 * title;
  } else if (budget === "high") {
    entry = 4000 * title;
  }
  onEntryValueChange(entry);
  
  // console.log("Title:", title);
  // console.log("Budget:", budget);
  // console.log("Entry:", entry);

  const costSplitData = [0.05* entry, 0.1* entry, 0.15* entry, 0.05* entry, 0.15* entry, 0.3* entry, 0.1* entry]
  
  const data = {
    labels: costSplitLabel,
    datasets: [
      {
        label: budget,
        data: costSplitData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 99, 132, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(255, 99, 132)",

        ],
        borderWidth: 1,
      },
    ],
  };

  // Add console.log statements to log data and options
  // console.log("Data Object:", data);

  const options = {};

  // Add a console.log statement to log the options object
  // console.log("Options Object:", options);

  return (
    <div id="barChartContainer">
      <Bar data={data} options={options} />      
    </div>
  );
}



export default BarChart;
