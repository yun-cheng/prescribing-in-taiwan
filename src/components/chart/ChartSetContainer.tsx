import getInitChartSetData from '@/utils/getInitChartSetData';
import ChartSet from './ChartSet';

export default async function ChartSetContainer() {
  const chartSetData = await getInitChartSetData();

  return (
    <div className="mx-auto max-w-screen-lg">
      <ChartSet chartSetData={chartSetData} />
    </div>
  );
}
