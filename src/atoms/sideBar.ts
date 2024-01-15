import { Drug, DrugGroups, DrugMap } from '@/types/drug';
import { atom } from 'jotai';
import { atomWithDefault } from 'jotai/utils';
import { atomWithToggle } from './common/atomWithToggle';

export const sideBarOpenAtom = atomWithToggle(false);

export const drugMapAtom = atom<DrugMap | null>(null);

export const drugGroupsAtom = atom<DrugGroups | null>(null);

export const selectedDrugIdAtom = atom<string>('');

export const selectedDrugAtom = atom<Drug | null>((get) => {
  const drugMap = get(drugMapAtom);

  if (!drugMap) return null;

  const drug = drugMap[get(selectedDrugIdAtom)] ?? null;

  return drug;
});

export const openedGroupCollapseAtom = atomWithDefault<string>((get) => {
  const drug = get(selectedDrugAtom);

  if (!drug) return '';

  return drug.group;
});
