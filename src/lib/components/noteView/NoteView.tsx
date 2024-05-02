import { Flex, Input, InputRef } from "antd";
import React, { useRef } from "react";
import { useNotesStore, useNoteStore } from "../../store";

const rootStyles: React.CSSProperties = {
   padding: 16,
};

const boldStyles: React.CSSProperties = {
   fontWeight: 700,
};

const NoteView: React.FC = () => {
   const titleRef = useRef<InputRef>();
   const textRef = useRef<InputRef>();

   const note = useNoteStore();
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

   return note.isActive ? (
      <Flex vertical style={rootStyles}>
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
      <Flex style={rootStyles}>
         <span style={boldStyles}>Choice note</span>
      </Flex>
   );
};

export default NoteView;
