import type { Note } from "../../types";
import React, { CSSProperties, useMemo } from "react";
import { Button, Dropdown, DropdownProps, MenuProps } from "antd";
import { DeleteOutlined, PushpinOutlined, PushpinFilled } from "@ant-design/icons";
import { useNotesStore, useNoteStore } from "../../store";
import ItemAction from "./ItemAction";

const listItemStyle: CSSProperties = {
   borderRadius: 0,
   justifyContent: "flex-start",
   textOverflow: "ellipsis",
   whiteSpace: "noWrap",
   overflow: "hidden",
};

const listItemIconStyle: CSSProperties = {
   marginRight: 8,
};

const ITEM_ACTIONS_TRIGGER: DropdownProps['trigger'] = ["contextMenu"];
const DEFAULT_TEXT = "New note...";

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

   const itemActions = useMemo<MenuProps>(() => ({
      items: [
         {
            key: "togglePin",
            label: <ItemAction text={!isPinned ? "Pin" : "Unpin"} icon={!isPinned ? <PushpinFilled /> : <PushpinOutlined />} />,
            onClick: onTogglePinNote,
         },
         {
            key: "delete",
            label: <ItemAction text="Delete" icon={<DeleteOutlined />} />,
            onClick: onDeleteNote,
         },
      ],
   }), [isPinned])

   return (
      <Dropdown
         menu={itemActions}
         trigger={ITEM_ACTIONS_TRIGGER}
      >
         <Button style={listItemStyle} onClick={onSetNote} type="text">
            {isPinned ? <PushpinOutlined style={listItemIconStyle} /> : null}
            {title ? title : DEFAULT_TEXT}
         </Button>
      </Dropdown>
   );
};

export default React.memo(NoteListItem);
