'use server';

import { FullChartSetDataType } from '@/types/chart';
import { promises as fs } from 'fs';

async function getFullChartSetData() {
  const file = await fs.readFile('data/full_chart_set_data.json', 'utf8');
  return JSON.parse(file) as FullChartSetDataType;
}

export default getFullChartSetData;
