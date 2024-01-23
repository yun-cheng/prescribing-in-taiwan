import getDrugMap from '@/utils/getDrugs';
import getFullChartSetData from '@/utils/getFullChartSetData';
import { ReactNode } from 'react';
import Hydrating from './Hydrating';

type Props = {
  children: ReactNode;
};

export default async function Hydrations({ children }: Props) {
  const drugMap = await getDrugMap();
  const fullChartSetData = await getFullChartSetData();

  return (
    <Hydrating drugMap={drugMap} fullChartSetData={fullChartSetData}>
      {children}
    </Hydrating>
  );
}
