'use client';

import {
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Colors,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  Colors,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface Props {
  chartData: (number | null)[][];
}

export default function Chart({ chartData }: Props) {
  const settings: ChartOptions<'line'> = {
    responsive: true,
    aspectRatio: 4 / 3,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    layout: {
      padding: {
        left: 80,
        right: 40,
      },
    },
    elements: {
      point: {
        pointStyle: 'circle',
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Year 2005',
        font: {
          size: 20,
          weight: 'bold',
        },
      },
      legend: {
        position: 'bottom',
        onClick: () => {},
        labels: {
          boxWidth: 18,
          font: {
            size: 18,
          },
        },
      },
      tooltip: {
        titleFont: {
          size: 18,
        },
        bodyFont: {
          size: 18,
        },
        callbacks: {
          title: (context) => `Age ${context[0].label}`,
          label(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (label && context.parsed.y !== null) {
              const pct = context.parsed.y;
              if (pct < 1) {
                label += pct.toFixed(2);
              } else if (pct >= 10) {
                label += Math.round(pct);
              } else {
                label += pct.toFixed(1);
              }
              label += '%';
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Age',
          align: 'end',
          font: {
            size: 18,
            weight: 'bold',
          },
        },
        ticks: {
          font: {
            size: 18,
          },
        },
        border: {
          width: 1.3,
          color: '#404040',
        },
        grid: {
          tickWidth: 1.3,
          tickColor: '#404040',
        },
      },
      y: {
        position: {
          x: -0.3,
        },
        suggestedMin: 0,
        title: {
          display: true,
          text: '%',
          align: 'end',
          font: {
            size: 18,
            weight: 'bold',
          },
          padding: {
            top: -10,
          },
        },
        ticks: {
          font: {
            size: 18,
          },
          callback: (value) => `${value}  `,
        },
        border: {
          width: 1.3,
          color: '#404040',
        },
        grid: {
          tickWidth: 1.3,
          tickColor: '#404040',
        },
      },
    },
  };

  const data = {
    labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90],
    datasets: ['male', 'female'].map((label, index) => ({
      label,
      data: chartData[index],
      showLine: false,
      pointRadius: 5,
      pointHoverRadius: 7,
    })),
  };

  return (
    <div className="w-full max-w-lg">
      <Line options={settings} data={data} />
    </div>
  );
}
