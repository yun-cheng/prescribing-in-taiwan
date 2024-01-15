import ChartHeader from '@/components/chart/ChartHeader';
import ChartSetContainer from '@/components/chart/ChartSetContainer';
import Description from '@/components/description/Description';

export default async function DrugPage() {
  return (
    <>
      <ChartHeader />
      <ChartSetContainer />
      <Description />
    </>
  );
}
