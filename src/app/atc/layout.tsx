import ChartHeader from '@/components/chart/ChartHeader';
import ChartSetContainer from '@/components/chart/ChartSetContainer';
import Description from '@/components/description/Description';

export default async function DrugPageLayout() {
  return (
    <div className="p-6">
      <ChartHeader />
      <ChartSetContainer />
      <Description />
    </div>
  );
}
