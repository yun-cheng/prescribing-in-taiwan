import getFullChartSetData from '@/utils/getFullChartSetData';
import ChartSet from './ChartSet';

export default async function ChartSetContainer() {
  const fullChartSetData = await getFullChartSetData();

  return (
    <div className="mx-auto max-w-screen-lg">
      <ChartSet fullChartSetData={fullChartSetData} />
    </div>
  );
}
