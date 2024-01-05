import ChartSet from '@/components/chart/ChartSet';
import Description from '@/components/description/Description';

export default async function Home() {
  return (
    <div className="bg-slate-50 p-6">
      <main>
        <ChartSet />
        <Description />
      </main>
    </div>
  );
}
