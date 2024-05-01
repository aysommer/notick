import { Flex } from "antd";
import { useNoteStore } from "../../store";

const NoteView: React.FC = () => {
   const { id, title, text, isActive } = useNoteStore();

   return isActive ? (
      <Flex vertical>
         <span>{id}</span>
         <span>{title}</span>
         <span>{text}</span>
      </Flex>
   ) : (
      <span>Choice note</span>
   );
};

export default NoteView;
