import { IOptions, ITemplateQuestion, IToast, IUser } from '@/types';
import { atom } from 'jotai';

export const userAtom = atom<IUser | null>(null);
userAtom.debugLabel = 'userAtom';

export const templateQuestionsAtom = atom<ITemplateQuestion[]>([]);
templateQuestionsAtom.debugLabel = 'templateQuestionsAtom';

export const tabsAtom = atom<IOptions>({ id: 1, name: 'Surveys' });
tabsAtom.debugLabel = 'tabsAtom';

export const toastAtom = atom<IToast>({ type: '', message: '' });
toastAtom.debugLabel = 'toastAtom';
