import { atom } from 'jotai';

export const pathnameAtom = atom<string>('/');

export const isDrugPageAtom = atom((get) => {
  return get(pathnameAtom).startsWith('/atc/');
});
