import type { Note } from "../types";
import { create } from "zustand";
import { getNewNote } from "../utils";
import { setNoteToCache } from "./useNoteStore";

type UseNotesStore = {
   notes: Note[];
   searchValue: string;
   addNote(): void;
   getNote(id: Note["id"]): Note;
   updateNote(value: Note): void;
   deleteNote(id: Note["id"]): void;
   setSearchValue(value: string): void;
   clearData(): void;
};

const LOCAL_STORAGE_KEY = "notes";

// FIXME: Need unify:
// - useNotesStore,
// - useSettingsStore
function getNotesFromCache(): Note[] {
   const value = localStorage.getItem(LOCAL_STORAGE_KEY);
   if (value) {
      return JSON.parse(value) as Note[];
   }
   return [];
}

function setNotesToCache(value: Note[]): void {
   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
}

const useNotesStore = create<UseNotesStore>((set, get) => ({
   notes: getNotesFromCache(),
   searchValue: "",
   getNote(id) {
      const state = get();
      const [result] = state.notes.filter((note) => note.id === id);
      return result;
   },
   addNote() {
      return set((state) => {
         const notes = [...state.notes, getNewNote()];
         setNotesToCache(notes);

         return {
            ...state,
            notes,
         };
      });
   },
   updateNote(value) {
      return set((state) => {
         const notes = [...state.notes].map((note) =>
            value.id === note.id
               ? {
                    ...note,
                    ...value,
                 }
               : note
         );
         setNotesToCache(notes);

         return {
            ...state,
            notes,
         };
      });
   },
   deleteNote(id) {
      return set((state) => {
         const notes = [...state.notes].filter((note) => note.id !== id);
         setNotesToCache(notes);

         return {
            ...state,
            notes,
         };
      });
   },
   setSearchValue(value) {
      return set((state) => {
         return {
            ...state,
            searchValue: value,
         };
      });
   },
   clearData() {
      return set((state) => {
         const notes: Note[] = [];
         setNotesToCache(notes);
         setNoteToCache(null);

         return {
            ...state,
            notes,
         };
      });
   },
}));

export default useNotesStore;
