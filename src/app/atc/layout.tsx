import ChartHeader from '@/components/chart/ChartHeader';
import ChartSet from '@/components/chart/ChartSet';
import Description from '@/components/description/Description';

export default async function DrugPageLayout() {
  return (
    <div className="p-6 pb-20">
      <ChartHeader />
      <ChartSet />
      <Description />
    </div>
  );
}
