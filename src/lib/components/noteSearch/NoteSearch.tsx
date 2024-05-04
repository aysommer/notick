import React, { CSSProperties, useCallback } from "react";
import { Input } from "antd";
import { useNotesStore } from "../../store";

const rootStyles: CSSProperties = {
   padding: 8,
};

const NoteSearch: React.FC = () => {
   const searchValue = useNotesStore((state) => state.searchValue);
   const setSearchValue = useNotesStore((state) => state.setSearchValue);

   const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
   }, []);

   return (
      <div style={rootStyles}>
         <Input value={searchValue} onChange={onChange} placeholder="Search note..." allowClear />
      </div>
   );
};

export default NoteSearch;
