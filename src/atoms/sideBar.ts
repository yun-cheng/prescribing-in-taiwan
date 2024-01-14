import { Drug, DrugGroups, DrugMap } from '@/types/drug';
import { atom } from 'jotai';
import { atomWithToggle } from './common/atomWithToggle';

export const sideBarOpenAtom = atomWithToggle(false);

export const openedGroupCollapseAtom = atom<string>('');

export const drugMapAtom = atom<DrugMap | null>(null);

export const drugGroupsAtom = atom<DrugGroups | null>(null);

export const selectedDrugAtom = atom<Drug>({
  id: 'A01',
  label: 'A01 Stomatological preparations [Topical]',
  note: 'Local oral treatment, usually for dental use',
  group: 'A ALIMENTARY TRACT AND METABOLISM',
});
