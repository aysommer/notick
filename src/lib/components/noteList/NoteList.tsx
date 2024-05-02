import { Dropdown, Flex, List } from "antd";
import { DeleteOutlined, PushpinOutlined } from "@ant-design/icons";
import { useNotesStore, useNoteStore } from "../../store";
import { Note } from "../../types";

const listItemStyle: React.CSSProperties = {
   cursor: "pointer",
   padding: 12,
};

const itemActionIconStyle: React.CSSProperties = {
   marginLeft: 12,
};

const listItemIconStyle: React.CSSProperties = {
   marginRight: 8,
};

const NoteList: React.FC = () => {
   const notes = useNotesStore((state) => state.notes);
   const setNote = useNoteStore((state) => state.setNote);
   const setActive = useNoteStore((state) => state.setActive);
   const getNote = useNotesStore((state) => state.getNote);
   const updateNote = useNotesStore((state) => state.updateNote);
   const deleteNote = useNotesStore((state) => state.deleteNote);

   const onSetNote = (id: Note["id"]) => {
      const note = getNote(id);
      setNote(note);
   };

   const onDeleteNote = (id: Note["id"], event?: React.MouseEvent<HTMLElement, MouseEvent> | null) => {
      if (event) {
         event.stopPropagation();
      }
      setActive(false);
      deleteNote(id);
   };

   const onTogglePinNote = (id: Note["id"]) => {
      const note = getNote(id);
      updateNote({
         ...note,
         isPinned: !note.isPinned,
      });
   };

   const allNotes = [...notes.filter((note) => note.isPinned), ...notes.filter((note) => !note.isPinned)];

   return (
      <List
         dataSource={allNotes}
         renderItem={(item) => (
            <Dropdown
               menu={{
                  items: [
                     {
                        key: "togglePin",
                        label: (
                           <Flex justify="space-between">
                              {!item.isPinned ? "Pin" : "Unpin"} <PushpinOutlined style={itemActionIconStyle} />
                           </Flex>
                        ),
                        onClick: () => onTogglePinNote(item.id),
                     },
                     {
                        key: "delete",
                        label: (
                           <Flex justify="space-between">
                              Delete <DeleteOutlined style={itemActionIconStyle} />
                           </Flex>
                        ),
                        onClick: () => onDeleteNote(item.id),
                     },
                  ],
               }}
               trigger={["contextMenu"]}
            >
               <List.Item key={item.id} style={listItemStyle} actions={[]} onClick={() => onSetNote(item.id)}>
                  <Flex>
                     {item.isPinned ? <PushpinOutlined style={listItemIconStyle} /> : null}
                     {item.title ? item.title : "New note..."}
                  </Flex>
               </List.Item>
            </Dropdown>
         )}
      />
   );
};

export default NoteList;
