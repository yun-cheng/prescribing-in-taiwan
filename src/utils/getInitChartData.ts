'use server';

import { ChartDataType } from '@/types/chart';
import { promises as fs } from 'fs';

async function getInitChartData() {
  const file = await fs.readFile('data/init_chart_data.json', 'utf8');
  return JSON.parse(file) as ChartDataType;
}

export default getInitChartData;
