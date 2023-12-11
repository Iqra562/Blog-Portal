import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {Bar} from "react-chartjs-2";
import { useQuery } from "react-query";
import { DashboardService } from "../../services/dashboard.service";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
    },
  },
};
function AdminHome() {
  const {data:dashboardData} = useQuery("dashboardData",DashboardService.getDashboardAnalytic)
  const dashboardDataMemoization = useMemo(()=>dashboardData?.data?.results,[dashboardData]);
const data = {
  labels: ["Posts", "Comments", "Users", "Categories"],
  datasets: [{
    label: 'Entries count',
    data: [
    dashboardDataMemoization?.post_count,
      dashboardDataMemoization?.comment_count,
      dashboardDataMemoization?.user_count,
      dashboardDataMemoization?.category_count,

    ],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
     

    ],
   
  }]
};
  return (
    <div>
      <h3>Welcome To Dashboard</h3>
      <Bar options={chartOptions} data={data}/>
    </div>
  );
}

export default AdminHome;