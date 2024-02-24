import { IGoogleUser, ITemplateQuestion, IUser } from "@/types";
import { atom, createStore } from "jotai";

export const userAtom = atom<IUser | null>(null);
userAtom.debugLabel = "userAtom";

export const googleUserAtom = atom<IGoogleUser>({
  name: "",
  email: "",
  image: "",
  expires: "",
});
googleUserAtom.debugLabel = "googleUserAtom";

export const userLocalStorageAtom = atom<string | null>(null);
userLocalStorageAtom.debugLabel = "localUserAtom";

export const templateQuestionsAtom = atom<ITemplateQuestion[]>([]);
templateQuestionsAtom.debugLabel = "templateQuestionsAtom";
