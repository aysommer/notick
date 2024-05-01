import { Button, List } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useNotesStore, useNoteStore } from "../../store";
import { Note } from "../../types";

const ListItemStyle: React.CSSProperties = {
   cursor: "pointer",
   paddingTop: 4,
   paddingBottom: 4,
   paddingLeft: 8,
};

const NoteList: React.FC = () => {
   const notes = useNotesStore((state) => state.notes);
   const setNote = useNoteStore((state) => state.setNote);
   const setActive = useNoteStore((state) => state.setActive);
   const getNote = useNotesStore((state) => state.getNote);
   const deleteNote = useNotesStore((state) => state.deleteNote);

   const onSetNote = (id: Note["id"]) => {
      const note = getNote(id);
      setNote(note);
   };

   const onDeleteNote = (event: React.MouseEvent<HTMLElement, MouseEvent>, id: Note["id"]) => {
      event.stopPropagation();
      setActive(false);
      deleteNote(id);
   };

   return (
      <List
         dataSource={notes}
         renderItem={(item) => (
            <List.Item
               key={item.id}
               style={ListItemStyle}
               actions={[<Button shape="circle" onClick={(e) => onDeleteNote(e, item.id)} icon={<DeleteOutlined />} />]}
               onClick={() => onSetNote(item.id)}
            >
               {item.title ? item.title : "New note..."}
            </List.Item>
         )}
      />
   );
};

export default NoteList;
