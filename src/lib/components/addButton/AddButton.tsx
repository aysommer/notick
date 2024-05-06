import { FloatButton } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNotesStore } from "../../store";

const AddButton: React.FC = () => {
   const notes = useNotesStore((state) => state.notes);
   const addNote = useNotesStore((state) => state.addNote);

   return notes.length > 0 ? <FloatButton icon={<PlusOutlined />} onClick={addNote} /> : null;
};

export default AddButton;
