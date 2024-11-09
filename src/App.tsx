import type { CSSProperties } from "react";
import { Layout } from "antd";
import { NoteList } from "./components/noteList";
import { AddButton } from "./components/addButton";
import { NoteView } from "./components/noteView";
import { NoteSearch } from "./components/noteSearch";
import { HeaderControllers } from "./components/headerControllers";
import { Modals } from "./components/modals";

const headerStyle: CSSProperties = {
   textAlign: "center",
   fontWeight: 700,
   height: 64,
   paddingInline: 48,
   lineHeight: "64px",
   color: "black",
   backgroundColor: "white",
   borderBottom: "solid 1px #EEE"
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
         <Modals />
      </>
   );
};

export default App;
