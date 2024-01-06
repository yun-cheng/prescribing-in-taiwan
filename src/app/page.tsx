import ChartSet from '@/components/chart/ChartSet';
import Header from '@/components/common/Header';
import Description from '@/components/description/Description';

export default async function Home() {
  return (
    <main>
      <Header />
      <div className="p-6">
        <ChartSet />
        <Description />
      </div>
    </main>
  );
}
