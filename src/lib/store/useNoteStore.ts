import type { Note } from "../types";
import { create } from "zustand";
import { getNewNote } from "../utils";

type UseNoteStore = Note & {
   isActive: boolean;
   setNote(value: Partial<Note>): void;
   setActive(value: UseNoteStore["isActive"]): void;
};

const useNoteStore = create<UseNoteStore>((set) => ({
   ...getNewNote(),
   isActive: false,
   setNote(value) {
      return set((state) => {
         return { ...state, ...value, isActive: true };
      });
   },
   setActive(value) {
      return set((state) => {
         return { ...state, isActive: value };
      });
   },
}));

export default useNoteStore;
