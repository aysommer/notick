import { FloatButton } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNotesStore } from "../../store";

const AddButton: React.FC = () => {
   const addNote = useNotesStore((state) => state.addNote);

   return <FloatButton icon={<PlusOutlined />} onClick={addNote} />;
};

export default AddButton;
