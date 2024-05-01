import { Flex, Input } from "antd";
import { useNotesStore, useNoteStore } from "../../store";

const titleStyles: React.CSSProperties = {
   fontWeight: 700,
};

const NoteView: React.FC = () => {
   const note = useNoteStore();
   const updateNote = useNotesStore((state) => state.updateNote);

   const onChangeNote = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const name = target.name as keyof Node;
      const value = target.value;

      note.setNote({
         [name]: value,
      });
   };

   const onBlur = () => {
      updateNote(note);
   };

   return note.isActive ? (
      <Flex vertical>
         <Input
            style={titleStyles}
            value={note.title}
            name="title"
            variant="borderless"
            placeholder="Type some title..."
            onChange={onChangeNote}
            onBlur={onBlur}
         />
         <Input.TextArea
            value={note.text}
            name="text"
            autoSize
            variant="borderless"
            placeholder="Type some text..."
            onChange={onChangeNote}
            onBlur={onBlur}
         />
      </Flex>
   ) : (
      <span>Choice note</span>
   );
};

export default NoteView;
