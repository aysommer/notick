import type { Note } from "../types";

export function getNewNote(): Note {
   return {
      id: crypto.randomUUID(),
      title: "",
      text: "",
   };
}
