import type { Note } from "../types";
import { create } from "zustand";
import { getNewNote } from "../utils";

type UseNotesStore = {
   notes: Note[];
   addNote(): void;
   getNote(id: Note["id"]): Note;
   deleteNote(id: Note["id"]): void;
};

const LOCAL_STORAGE_KEY = "notes";

function getNotesFromLocalStorage(): Note[] {
   const value = localStorage.getItem(LOCAL_STORAGE_KEY);
   if (value) {
      return JSON.parse(value) as Note[];
   }
   return [];
}

const useNotesStore = create<UseNotesStore>((set, get) => ({
   notes: getNotesFromLocalStorage(),
   addNote() {
      return set((state) => {
         const notes = [...state.notes, getNewNote()];
         localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));

         return {
            ...state,
            notes,
         };
      });
   },
   getNote(id) {
      const state = get();
      const [result] = state.notes.filter((note) => note.id === id);
      return result;
   },
   deleteNote(id) {
      return set((state) => {
         const notes = [...state.notes].filter((note) => note.id !== id);
         localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));

         return {
            ...state,
            notes,
         };
      });
   },
}));

export default useNotesStore;
