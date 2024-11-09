import React, { CSSProperties, useCallback } from "react";
import { Input } from "antd";
import { useNotesStore } from "../../store";

const rootStyles: CSSProperties = {
   padding: 8,
};

const NoteSearch: React.FC = () => {
   const notes = useNotesStore((state) => state.notes);
   const searchValue = useNotesStore((state) => state.searchValue);
   const setSearchValue = useNotesStore((state) => state.setSearchValue);

   const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
   }, []);

   return notes.length > 0 ? (
      <div style={rootStyles}>
         <Input value={searchValue} onChange={onChange} placeholder="Search note..." allowClear />
      </div>
   ) : null;
};

export default NoteSearch;
