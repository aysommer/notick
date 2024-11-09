import React, { CSSProperties, useMemo, useRef } from "react";
import { Button, Empty, Flex, Input, InputRef } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useNotesStore, useNoteStore } from "../../store";
import useSettingsStore from "../../store/useSettingsStore";

const rootStyles: CSSProperties = {
   padding: 16,
   height: "100%",
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
   const fontSize = useSettingsStore((state) => state.fontSize);
   const fontColor = useSettingsStore((state) => state.fontColor);

   const inputTitleStyles = useMemo<CSSProperties>(
      () => ({
         fontSize,
         color: fontColor,
         fontWeight: 700,
      }),
      [fontSize, fontColor]
   );
   const inputTextStyles = useMemo<CSSProperties>(
      () => ({
         fontSize,
         color: fontColor,
         height: "100%",
         resize: "none",
      }),
      [fontSize, fontColor]
   );

   const onChangeNote = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const name = target.name as keyof Node;
      const value = target.value;

      note.setNote({
         ...note,
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
               style={inputTitleStyles}
               color={fontColor}
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
            style={inputTextStyles}
            color={fontColor}
            value={note.text}
            name="text"
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
