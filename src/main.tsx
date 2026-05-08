import ReactDOM from 'react-dom/client';
import './chartSetup'; // justo después de importar ReactDOM o antes
import App from './App';
import 'chartjs-adapter-date-fns';


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,            // ← agrega esto
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,            // ← registra
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  
    <App />
  
);