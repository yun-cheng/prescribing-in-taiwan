import Chart from '@/components/chart/Chart';
import { ChartDataType } from '@/types/chart';

type Props = {
  chartSetData: ChartDataType;
};

export default function ChartSet({ chartSetData }: Props) {
  return (
    <div className="mb-6 flex flex-wrap @container">
      {Object.keys(chartSetData).map((year) => (
        <div
          key={year}
          className="aspect-[4/3] mx-auto min-h-80 w-full max-w-lg pt-6 @4xl:w-1/2 @4xl:pl-6"
        >
          <Chart
            title={`Year ${year}`}
            xTitle="Age"
            yTitle="%"
            xLabels={[
              '0+',
              '10+',
              '20+',
              '30+',
              '40+',
              '50+',
              '60+',
              '70+',
              '80+',
              '90+',
            ]}
            colorLabels={['male', 'female']}
            chartData={Object.values(chartSetData[year])}
          />
        </div>
      ))}
    </div>
  );
}
