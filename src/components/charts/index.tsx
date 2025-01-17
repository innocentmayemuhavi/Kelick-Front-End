import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import styled from "styled-components";
import Gauge from "./gauge";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const StyledCharts = styled.div`
  background-color: #fff;
  padding: 10px;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100px;
`;

const Charts = ({ type, data }: { type: string; data: any }) => {
  const renderChart = () => {
    switch (type) {
      case "bar":
        return <Bar data={data} />;
      case "line":
        return (
          <Line
            data={data}
            options={{ plugins: { legend: { display: false } } }}
          />
        );
      case "pie":
        return <Pie data={data} />;
      case "doughnut":
        return (
          <Doughnut
            options={{
              cutout: "85%",
              plugins: {
                legend: {
                  display: false,
                },
              },
              elements: {
                arc: {
                  borderWidth: 1,

                  borderColor: "var(--background-color)",
                },
              },
            }}
            data={data}
          />
        );
      case "gauge":
        return <Gauge maxValue={200} value1={80} value2={90} value3={0} />;
      default:
        return <div>Invalid Data</div>;
    }
  };

  return <StyledCharts>{renderChart()}</StyledCharts>;
};

export default Charts;
