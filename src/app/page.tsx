import getInitChartData from '@/utils/getInitChartData';

export default async function Home() {
  const chartData = await getInitChartData();

  return <main className="flex"></main>;
}
