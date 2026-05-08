import {
  Chart, CategoryScale, LinearScale, BarElement, BarController,
  PointElement, LineElement, LineController, TimeScale, Filler, Tooltip, Legend
} from 'chart.js';

Chart.register(
  CategoryScale, LinearScale, BarElement, BarController,
  PointElement, LineElement, LineController, TimeScale, Filler, Tooltip, Legend
);