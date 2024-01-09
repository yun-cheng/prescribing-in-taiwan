import { atom } from 'jotai';
import { atomWithToggle } from './common/atomWithToggle';

export const sideBarOpenAtom = atomWithToggle(false);

export const openedGroupCollapseAtom = atom<string>('');

export const selectedDrugAtom = atom<string>('A01');
