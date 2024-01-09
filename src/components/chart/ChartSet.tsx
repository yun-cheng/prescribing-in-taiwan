'use client';

import { chartSetDataAtom, fullChartSetDataAtom } from '@/atoms/chart';
import Chart from '@/components/chart/Chart';
import { FullChartSetDataType } from '@/types/chart';
import { useAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';

type Props = {
  fullChartSetData: FullChartSetDataType;
};

export default function ChartSet({ fullChartSetData }: Props) {
  useHydrateAtoms([[fullChartSetDataAtom, fullChartSetData]]);

  const [chartSetData] = useAtom(chartSetDataAtom);

  if (!chartSetData) {
    return null;
  }

  return (
    <div className="mb-6 flex flex-wrap @container">
      {Object.keys(chartSetData).map((year) => (
        <div
          key={year}
          className="mx-auto aspect-[4/3] min-h-80 w-full max-w-lg pt-6 @4xl:w-1/2 @4xl:pl-6"
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
