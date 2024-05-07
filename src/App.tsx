import type { CSSProperties } from "react";
import { Layout } from "antd";
import { NoteList } from "./lib/components/noteList";
import { AddButton } from "./lib/components/addButton";
import { NoteView } from "./lib/components/noteView";
import { NoteSearch } from "./lib/components/noteSearch";
import { HeaderControllers } from "./lib/components/headerControllers";
import { SettingsModal } from "./lib/components/modals";

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

const App: React.FC = () => {
   return (
      <>
         <Layout style={layoutStyle}>
            <Layout.Header style={headerStyle}>
               <HeaderControllers />
            </Layout.Header>
            <Layout>
               <Layout.Sider width="25%" style={siderStyle}>
                  <NoteSearch />
                  <NoteList />
               </Layout.Sider>
               <Layout.Content style={contentStyle}>
                  <NoteView />
               </Layout.Content>
            </Layout>
            <AddButton />
         </Layout>
         <SettingsModal/>
      </>
   );
};

export default App;
