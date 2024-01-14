'use server';

import { DrugMap } from '@/types/drug';
import { promises as fs } from 'fs';

async function getDrugMap() {
  const file = await fs.readFile('data/drugMap.json', 'utf8');
  return JSON.parse(file) as DrugMap;
}

export default getDrugMap;
