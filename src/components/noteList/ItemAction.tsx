import React, { CSSProperties } from 'react'
import { Flex } from 'antd';

const itemActionStyle: CSSProperties = {
   width: '100%'
};

type ItemActionProps = {
   text: string;
   icon: React.ReactNode;
};

const ItemAction: React.FC<ItemActionProps> = ({ text, icon }) => {
   return (
      <Flex justify="space-between" gap={4} style={itemActionStyle}>
         <span>{text}</span>
         {icon}
      </Flex>
   )
}

export default ItemAction;