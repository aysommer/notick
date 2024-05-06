import { Empty, Flex } from "antd";
import { CSSProperties } from "react";
import { useNotesStore } from "../../store";
import NoteListItem from "./NoteListItem";

const emptyStyles: CSSProperties = {
   padding: 16,
};

const NoteList: React.FC = () => {
   const notes = useNotesStore((state) => state.notes);
   const searchValue = useNotesStore((state) => state.searchValue);

   let allNotes = [...notes.filter((note) => note.isPinned), ...notes.filter((note) => !note.isPinned)];

   const handledTrimmedValue = searchValue.trim().toLowerCase();
   if (handledTrimmedValue.length > 0) {
      allNotes = allNotes.filter(({ title, text }) => {
         const handledTitle = title.trim().toLowerCase();
         const handledText = text.trim().toLowerCase();
         if (handledTitle.length > 0) {
            return handledTitle.includes(handledTrimmedValue);
         }
         if (handledText.length > 0) {
            return handledText.includes(handledTrimmedValue);
         }
         return false;
      });
   }

   return allNotes.length > 0 ? (
      <Flex vertical>
         {allNotes.map((note) => (
            <NoteListItem key={note.id} {...note} />
         ))}
      </Flex>
   ) : (
      <Empty style={emptyStyles} />
   );
};

export default NoteList;
