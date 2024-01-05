import Chart from '@/components/chart/Chart';
import getInitChartSetData from '@/utils/getInitChartSetData';

export default async function Home() {
  const chartSetData = await getInitChartSetData();

  return (
    <main className="flex">
      <Chart chartData={Object.values(chartSetData['2005'])} />
    </main>
  );
}
