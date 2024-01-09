import ChartSetContainer from '@/components/chart/ChartSetContainer';
import Header from '@/components/common/Header';
import Description from '@/components/description/Description';

export default async function Home() {
  return (
    <main>
      <Header />
      <div className="p-6">
        <ChartSetContainer />
        <Description />
      </div>
    </main>
  );
}
