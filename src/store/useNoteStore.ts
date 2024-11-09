import type { Note } from "../types";
import { create } from "zustand";
import { getNewNote } from "../utils";

type UseNoteStore = Note & {
   setNote(value: Note): void;
   setActive(value: Note["isActive"]): void;
};

const LOCAL_STORAGE_KEY = "note";

// FIXME: Need unify:
// - useNotesStore,
// - useSettingsStore
function getNoteFromCache(): Note {
   const value = localStorage.getItem(LOCAL_STORAGE_KEY);
   if (value) {
      return JSON.parse(value);
   }
   return getNewNote();
}

export function setNoteToCache(value: Note | null): void {
   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
}

const useNoteStore = create<UseNoteStore>((set) => ({
   ...getNoteFromCache(),
   setNote(value) {
      return set((state) => {
         const note = { ...value, isActive: true };
         setNoteToCache(note);

         return { ...state, ...note };
      });
   },
   setActive(value) {
      return set((state) => {
         return { ...state, isActive: value };
      });
   },
}));

export default useNoteStore;
