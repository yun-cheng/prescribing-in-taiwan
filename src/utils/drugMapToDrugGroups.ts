import { DrugMap } from '@/types/drug';
import { groupBy } from 'lodash-es';

export default function drugMapToDrugGroups(drugMap: DrugMap) {
  return groupBy(Object.values(drugMap), ({ group }) => group);
}
