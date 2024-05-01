import type { CSSProperties } from "react";
import { Layout } from "antd";
import { NoteList } from "./lib/components/noteList";
import { AddButton } from "./lib/components/addButton";
import { NoteView } from "./lib/components/noteView";

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
   minHeight: 120,
   lineHeight: "120px",
};

const siderStyle: CSSProperties = {
   textAlign: "center",
   lineHeight: "120px",
   backgroundColor: "white",
};

const layoutStyle = {
   overflow: "hidden",
   height: "100%",
};

const App: React.FC = () => {
   return (
      <Layout style={layoutStyle}>
         <Layout.Header style={headerStyle}>notick</Layout.Header>
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
