'use server';

import { DrugGroups } from '@/types/drug';
import { promises as fs } from 'fs';

async function getDrugs() {
  const file = await fs.readFile('data/drugs.json', 'utf8');
  return JSON.parse(file) as DrugGroups;
}

export default getDrugs;
