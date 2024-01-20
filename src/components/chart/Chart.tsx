'use client';

import { Skeleton } from '@mui/material';
import {
  CategoryScale,
  ChartData,
  Chart as ChartJS,
  ChartOptions,
  Colors,
  Legend,
  LineElement,
  LinearScale,
  Plugin,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { useState } from 'react';
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

interface NoDataPluginType {
  plugins: {
    noDataPlugin: {
      noData: boolean;
    };
  };
}

interface Props {
  title: string;
  xTitle: string;
  yTitle: string;
  xLabels: string[];
  colorLabels: string[];
  chartData: (number | null)[][];
  maxValue: number;
}

export default function Chart({
  title,
  xTitle,
  yTitle,
  xLabels,
  colorLabels,
  chartData,
  maxValue,
}: Props) {
  const [initialized, setInitialized] = useState(false);

  const settings: ChartOptions<'line'> & NoDataPluginType = {
    responsive: true,
    maintainAspectRatio: false,
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
        text: title,
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
          title: (context) => `${xTitle} ${context[0].label}`,
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
      noDataPlugin: {
        noData: chartData.flat().every((v) => v === null),
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: xTitle,
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
        suggestedMax: maxValue,
        title: {
          display: true,
          text: yTitle,
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

  const data: ChartData<'line'> = {
    labels: xLabels,
    datasets: colorLabels.map((label, index) => ({
      label,
      data: chartData[index],
      showLine: false,
      pointRadius: 5,
      pointHoverRadius: 7,
    })),
  };

  const noDataPlugin: Plugin<'line'> = {
    id: 'noDataPlugin',
    beforeInit: () => {
      setInitialized(true);
    },
    afterRender: (chart, _, options) => {
      const {
        ctx,
        chartArea: { top, bottom, left, right },
      } = chart;
      const { noData } = options;

      if (noData) {
        const centerX = (left + right) / 2;
        const centerY = (top + bottom) / 2;

        ctx.textAlign = 'center';
        ctx.font = '18px';
        ctx.fillStyle = '#404040';
        ctx.fillText('Nearly no prescriptions', centerX, centerY);
      }
    },
  };

  return (
    <div className="relative h-full">
      {!initialized && (
        <Skeleton
          className="absolute h-full w-full bg-[#dbdbdb]"
          animation="wave"
          variant="rectangular"
        />
      )}
      <Line
        className={`${initialized ? 'block' : 'hidden'} bg-white`}
        options={settings}
        data={data}
        plugins={[noDataPlugin]}
      />
    </div>
  );
}
