# React + TypeScript + Vite
# Sales Dashboard – Revisión de Gráficos, Funciones y Cálculos

Dashboard de ventas y marketing construido con **React**, **TypeScript** y **Chart.js**.  
Permite visualizar la evolución diaria de métricas clave, comparar series (A, B, C, D) y analizar el funnel de conversión.

---

## **Tecnologías**

- React 18+
- TypeScript
- Vite
- Chart.js v4.5
- react-chartjs-2 v5.3
- date-fns
- chartjs-adapter-date-fns

---

## **Instalación y ejecución**

```bash
# 1. Clonar el repositorio (si no está ya)
git clone <url-del-repo>
cd fullstack   # o el nombre de la carpeta raíz

# 2. Instalar dependencias
npm install

# 3. Ejecutar en modo desarrollo
npm run dev

``` 
src/
├── main.tsx                  # Punto de entrada, registra adaptadores y Chart.js
├── App.tsx                   # Componente raíz, carga Dashboard
├── chartSetup.ts             # Registro global de elementos de Chart.js
├── types.ts                  # Interfaces de datos (MetricsData, DayData, Series)
├── data/
│   └── mockData.ts           # Generación de datos simulados para las series A, B, C, D
├── hooks/
│   └── useDashboardData.ts   # Hook principal: filtros, métricas, acumulados
├── components/
│   ├── Dashboard.tsx         # Layout principal, filtros y composición
│   ├── KpiRow.tsx            # Tarjetas con último valor y sparkline
│   ├── MainChart.tsx         # Gráfico de líneas diarias con selector de métrica
│   ├── ConversionFunnel.tsx  # Embudo de conversión acumulado (barras horizontales)
│   └── TimeMetrics.tsx       # Gráficos de tiempos de respuesta, ciclo y deals envejecidos
└── index.css                 # Estilos globales básicos
|

sadasd