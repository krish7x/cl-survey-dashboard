import { IUser } from "@/types";
import { atom } from "jotai";

export const userAtom = atom<IUser | null>(null);
userAtom.debugLabel = "userAtom";

export const userLocalStorageAtom = atom<string | null>(null);
