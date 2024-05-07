import type { Note } from "../../types";
import React from "react";
import { Button, Dropdown, Flex } from "antd";
import { DeleteOutlined, PushpinOutlined } from "@ant-design/icons";
import { useNotesStore, useNoteStore } from "../../store";

const listItemStyle: React.CSSProperties = {
   borderRadius: 0,
   textAlign: "left",
   textOverflow: "ellipsis",
   whiteSpace: "noWrap",
   overflow: "hidden",
};

const itemActionIconStyle: React.CSSProperties = {
   marginLeft: 12,
};

const listItemIconStyle: React.CSSProperties = {
   marginRight: 8,
};

type NoteListItemProps = Note;

const NoteListItem: React.FC<NoteListItemProps> = (props) => {
   const { id, title, isPinned } = props;

   const setNote = useNoteStore((state) => state.setNote);
   const setActive = useNoteStore((state) => state.setActive);
   const updateNote = useNotesStore((state) => state.updateNote);
   const deleteNote = useNotesStore((state) => state.deleteNote);

   const onSetNote = () => {
      setNote(props);
   };

   const onDeleteNote = () => {
      setActive(false);
      deleteNote(id);
   };

   const onTogglePinNote = () => {
      updateNote({
         ...props,
         isPinned: !isPinned,
      });
   };

   return (
      <Dropdown
         menu={{
            items: [
               {
                  key: "togglePin",
                  label: (
                     <Flex justify="space-between">
                        {!isPinned ? "Pin" : "Unpin"} <PushpinOutlined style={itemActionIconStyle} />
                     </Flex>
                  ),
                  onClick: onTogglePinNote,
               },
               {
                  key: "delete",
                  label: (
                     <Flex justify="space-between">
                        Delete <DeleteOutlined style={itemActionIconStyle} />
                     </Flex>
                  ),
                  onClick: onDeleteNote,
               },
            ],
         }}
         trigger={["contextMenu"]}
      >
         <Button style={listItemStyle} onClick={onSetNote} type="text">
            {isPinned ? <PushpinOutlined style={listItemIconStyle} /> : null}
            {title ? title : "New note..."}
         </Button>
      </Dropdown>
   );
};

export default React.memo(NoteListItem);
