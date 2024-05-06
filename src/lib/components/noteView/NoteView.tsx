import React, { CSSProperties, useRef } from "react";
import { Button, Empty, Flex, Input, InputRef } from "antd";
import { CloseCircleOutlined, SmileOutlined } from "@ant-design/icons";
import { useNotesStore, useNoteStore } from "../../store";

const rootStyles: CSSProperties = {
   padding: 16,
   height: "100%",
};

const boldStyles: CSSProperties = {
   fontWeight: 700,
};

const closeNoteIconStyles: CSSProperties = {
   cursor: "pointer",
};

const NoteView: React.FC = () => {
   const titleRef = useRef<InputRef>();
   const textRef = useRef<InputRef>();

   const note = useNoteStore();
   const notes = useNotesStore((state) => state.notes);
   const addNote = useNotesStore((state) => state.addNote);
   const updateNote = useNotesStore((state) => state.updateNote);

   const onChangeNote = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const name = target.name as keyof Node;
      const value = target.value;

      note.setNote({
         [name]: value,
      });
   };

   const onTitleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.code === "Enter") {
         event.preventDefault();
         textRef.current?.focus();
      }
   };

   const onTextKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (note.text.length === 0 && event.code === "Backspace") {
         event.preventDefault();
         titleRef.current?.focus();
      }
   };

   const onBlur = () => {
      updateNote(note);
   };

   const onCloseClick = () => {
      note.setActive(false);
   };

   return note.isActive ? (
      <Flex vertical style={rootStyles}>
         <Flex>
            <Input
               ref={titleRef as any}
               style={boldStyles}
               value={note.title}
               name="title"
               variant="borderless"
               placeholder="Type some title..."
               onChange={onChangeNote}
               onKeyDown={onTitleKeyDown}
               onBlur={onBlur}
            />
            <CloseCircleOutlined style={closeNoteIconStyles} onClick={onCloseClick} title="Close note" />
         </Flex>
         <Input.TextArea
            ref={textRef as any}
            value={note.text}
            name="text"
            autoSize
            variant="borderless"
            placeholder="Type some text..."
            onChange={onChangeNote}
            onKeyDown={onTextKeyDown}
            onBlur={onBlur}
         />
      </Flex>
   ) : (
      <Flex style={rootStyles} align="center" justify="center">
         <Empty
            image={notes.length > 0 ? null : "https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"}
            description={notes.length > 0 ? "Select note" : ""}
         >
            {notes.length > 0 ? null : (
               <Button type="primary" onClick={addNote}>
                  Add note
               </Button>
            )}
         </Empty>
      </Flex>
   );
};

export default NoteView;
