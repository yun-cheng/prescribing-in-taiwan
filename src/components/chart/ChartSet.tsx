'use client';

import { chartSetDataAtom, maxValueAtom } from '@/atoms/chart';
import Chart from '@/components/chart/Chart';
import { useAtom } from 'jotai';

export default function ChartSet() {
  const [chartSetData] = useAtom(chartSetDataAtom);
  const [maxValue] = useAtom(maxValueAtom);

  return (
    <div className="mx-auto mb-6 flex max-w-screen-lg flex-wrap @container">
      {Object.keys(chartSetData).map((year) => (
        <div
          key={year}
          className="mx-auto aspect-[4/3] h-full min-h-80 w-full max-w-lg pt-6 @4xl:w-1/2 @4xl:pl-6"
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
            maxValue={maxValue}
          />
        </div>
      ))}
    </div>
  );
}
