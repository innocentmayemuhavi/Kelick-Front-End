import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const Gauge = ({
  value1,
  value2,
  value3,
  maxValue,
}: {
  value1: number;
  value2: number;
  value3: number;
  maxValue: number;
}) => {
  const data = {
    datasets: [
      {
        data: [value1, value2, value3, maxValue - (value1 + value2 + value3)],
        backgroundColor: [
          "rgba(2, 185, 176, 1)",
          "rgba(183, 116, 252, 1)",
          "#f44336",
          "rgba(179, 190, 190, 1)",
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    rotation: -90,
    circumference: 180,
    cutout: "85%",
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default Gauge;
