'use server';

import { FullChartSetDataType } from '@/types/chart';

async function getFullChartSetData() {
  const res = await fetch(`${process.env.STORAGE_URL}/fullChartSetData.json`);

  const body = await res.json();

  return body as FullChartSetDataType;
}

export default getFullChartSetData;
