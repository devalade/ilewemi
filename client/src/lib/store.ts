import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { StudentType } from './types/studentType';
import { UserType } from './types/userType';

export const userAtom = atom<UserType | null>(null);

export const selectedStudent = atom<string>('');
