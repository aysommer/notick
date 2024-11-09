import type { Color } from "antd/es/color-picker";
import { ColorPicker, Flex, InputNumber, Modal, Button } from "antd";
import { DeleteOutlined, RollbackOutlined } from "@ant-design/icons";
import React, { CSSProperties } from "react";
import { useModalStore, useNotesStore, useNoteStore } from "../../store";
import useSettingsStore from "../../store/useSettingsStore";

const headerStyle: CSSProperties = {
   fontSize: 20
};

const SettingsModal: React.FC = () => {
   const setModal = useModalStore((state) => state.setModal);
   const isOpen = useModalStore((state) => state.settings);
   const fontSize = useSettingsStore((state) => state.fontSize);
   const fontColor = useSettingsStore((state) => state.fontColor);
   const setSettings = useSettingsStore((state) => state.setSettings);
   const resetSettings = useSettingsStore((state) => state.resetSettings);
   const clearData = useNotesStore((state) => state.clearData);
   const setActive = useNoteStore((state) => state.setActive);

   const onOK = () => {
      setModal("settings", false);
   };

   const onCancel = () => {
      setModal("settings", false);
   };

   const onFontSizeChange = (value: number | null) => {
      setSettings({
         fontSize: value as number,
      });
   };

   const onFontColorChange = (value: Color) => {
      setSettings({
         fontColor: value.toHexString(),
      });
   };

   const onClearData = () => {
      clearData();
      setActive(false);
      setModal("settings", false);
   };

   const onResetSettings = () => {
      resetSettings();
      setModal("settings", false);
   };

   return (
      <Modal title={<span style={headerStyle}>Settings</span>} open={isOpen} onOk={onOK} onCancel={onCancel} footer={null}>
         <Flex vertical gap={16}>
            <Flex gap={16} align="center">
               <span>Font size</span>
               <InputNumber
                  min={14}
                  max={56}
                  defaultValue={fontSize}
                  value={fontSize}
                  onChange={onFontSizeChange}
                  changeOnWheel
                  step={2}
               />
            </Flex>
            <Flex gap={16} align="center">
               <span>Font color</span>
               <ColorPicker defaultValue={fontColor} value={fontColor} showText onChangeComplete={onFontColorChange} />
            </Flex>
            <Flex gap={4} justify="flex-end">
               <Button onClick={onClearData} danger icon={<DeleteOutlined />} iconPosition="end" type="primary">
                  Clear data
               </Button>
               <Button onClick={onResetSettings} danger icon={<RollbackOutlined />} iconPosition="end">
                  Reset settings
               </Button>
            </Flex>
         </Flex>
      </Modal>
   );
};

export default SettingsModal;
