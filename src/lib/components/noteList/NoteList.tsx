import { Flex } from "antd";
import { useNotesStore } from "../../store";
import NoteListItem from "./NoteListItem";

const NoteList: React.FC = () => {
   const notes = useNotesStore((state) => state.notes);
   const allNotes = [
      ...notes.filter((note) => note.isPinned),
      ...notes.filter((note) => !note.isPinned)
   ];

   return (allNotes.length > 0) ? (
      <Flex vertical>
         {allNotes.map((note) => <NoteListItem key={note.id} {...note} />)}
      </Flex>
   ) : (
      <span>No data</span>
   )
};

export default NoteList;
