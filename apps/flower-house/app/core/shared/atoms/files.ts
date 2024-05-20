import { atom } from "jotai";

export type InitialFilesState = File | null;

export const defaultFiles: InitialFilesState = null;

const initialFilesAtom = defaultFiles;

export const filesAtom = atom<InitialFilesState>(initialFilesAtom);
