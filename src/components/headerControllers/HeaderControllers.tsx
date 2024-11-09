import { Flex, Button } from "antd";
import { SettingFilled } from '@ant-design/icons';
import { CSSProperties } from "react";
import { CHANGE_LOG_URL } from "../../consts";
import { useModalStore } from "../../store";

const buttonStyle: CSSProperties = {
   fontSize: 20,
   fontWeight: '700'
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
         <Button style={buttonStyle} type="link" href={CHANGE_LOG_URL} target="_blank">
            notick
         </Button>
         <Button color="primary" variant="filled" onClick={onSettingsOpen} icon={<SettingFilled />} iconPosition="end">
            Settings
         </Button>
      </Flex>
   );
};

export default HeaderControllers;
