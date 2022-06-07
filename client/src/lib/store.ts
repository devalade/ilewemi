import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { UserType } from './types/userType';

export const userAtom = atom<UserType | null>(null);
