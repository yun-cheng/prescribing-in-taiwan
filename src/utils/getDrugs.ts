'use server';

import { DrugMap } from '@/types/drug';

async function getDrugMap() {
  const res = await fetch(`${process.env.STORAGE_URL}/drugMap.json`);

  const body = await res.json();

  return body as DrugMap;
}

export default getDrugMap;
