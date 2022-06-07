import { atomWithStorage } from 'jotai/utils';
import { UserType } from './types/userType';

export const userAtom = atomWithStorage<UserType | null>('user', null);
