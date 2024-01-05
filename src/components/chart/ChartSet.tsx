import Chart from '@/components/chart/Chart';
import getInitChartSetData from '@/utils/getInitChartSetData';

export default async function ChartSet() {
  const chartSetData = await getInitChartSetData();

  return (
    <div className="flex flex-wrap">
      {Object.keys(chartSetData).map((year) => (
        <Chart
          key={year}
          title={`Year ${year}`}
          xTitle="Age"
          yTitle="%"
          xLabels={['0', '10', '20', '30', '40', '50', '60', '70', '80', '90']}
          colorLabels={['male', 'female']}
          chartData={Object.values(chartSetData[year])}
        />
      ))}
    </div>
  );
}
