import { Flex, Button } from "antd";
import { CSSProperties } from "react";
import { CHANGE_LOG_URL } from "../../consts";
import { useModalStore } from "../../store";
const buttonStyle = {
   color: "white",
};

const buttonsWrapperStyle: CSSProperties = {
   height: "100%",
};

const HeaderControllers: React.FC = () => {
   const setModal = useModalStore((state) => state.setModal);

   const onSettingsOpen = () => {
      setModal("settings", true);
   };

   return (
      <Flex justify="space-between" align="center" style={buttonsWrapperStyle}>
         <Button style={buttonStyle} type="link" href={CHANGE_LOG_URL} color="white" target="_blank">
            notick
         </Button>
         <Button type="primary" onClick={onSettingsOpen}>
            Settings
         </Button>
      </Flex>
   );
};

export default HeaderControllers;
