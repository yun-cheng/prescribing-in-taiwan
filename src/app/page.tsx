import Chart from '@/components/chart/Chart';
import getInitChartData from '@/utils/getInitChartData';

export default async function Home() {
  const chartData = await getInitChartData();

  return (
    <main className="flex">
      <Chart chartData={Object.values(chartData['2005'])} />
    </main>
  );
}
