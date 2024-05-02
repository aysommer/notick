import type { CSSProperties } from "react";
import { Button, Layout } from "antd";
import { NoteList } from "./lib/components/noteList";
import { AddButton } from "./lib/components/addButton";
import { NoteView } from "./lib/components/noteView";
import { CHANGE_LOG_URL } from "./lib/consts";

const headerStyle: CSSProperties = {
   textAlign: "center",
   fontWeight: 700,
   height: 64,
   paddingInline: 48,
   lineHeight: "64px",
   color: "white",
};

const contentStyle: CSSProperties = {
   textAlign: "center",
   overflowY: "auto",
};

const siderStyle: CSSProperties = {
   textAlign: "center",
   backgroundColor: "white",
   overflowY: "auto",
};

const layoutStyle = {
   overflow: "hidden",
   height: "100%",
};

const buttonStyle = {
   color: "white",
};

const App: React.FC = () => {
   return (
      <Layout style={layoutStyle}>
         <Layout.Header style={headerStyle}>
            <Button style={buttonStyle} type="link" href={CHANGE_LOG_URL} color="white" target="_blank">
               notick
            </Button>
         </Layout.Header>
         <Layout>
            <Layout.Sider width="25%" style={siderStyle}>
               <NoteList />
            </Layout.Sider>
            <Layout.Content style={contentStyle}>
               <NoteView />
            </Layout.Content>
         </Layout>
         <AddButton />
      </Layout>
   );
};

export default App;
