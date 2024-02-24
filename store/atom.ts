import { ITemplateQuestion, IUser } from "@/types";
import { atom } from "jotai";

export const userAtom = atom<IUser | null>(null);
userAtom.debugLabel = "userAtom";

export const userLocalStorageAtom = atom<string | null>(null);
userLocalStorageAtom.debugLabel = "localUserAtom";

export const templateQuestionsAtom = atom<ITemplateQuestion[]>([]);
templateQuestionsAtom.debugLabel = "templateQuestionsAtom";
