import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Container } from "react-bootstrap";
import UserTable from "./UserTable";
import BlogTable from "./BlogTable";
const TabContent = () => {
  //   const [key, setKey] = useState<string>("User");
  return (
    <Container>
      <Tabs
        defaultActiveKey="user"
        id="uncontrolled-tab-example"
        className="mb-3"
        transition={false}
      >
        <Tab eventKey="user" title="User">
          <UserTable />
        </Tab>
        <Tab eventKey="profile" title="Profile">
          <BlogTable />
        </Tab>
      </Tabs>
    </Container>

    // <Container>
    //   <Tabs
    //     defaultActiveKey="user"
    //     id="uncontrolled-tab-example"
    //     className="mb-3 mt-3"
    //     // activeKey={key}
    //     // onSelect={(k) => {
    //     //   if (k) {
    //     //     setKey(k);
    //     //   }
    //     // }}
    //   >
    //     <Tab eventKey="user" title="User"></Tab>
    //     <Tab eventKey="blog" title="Blog">
    //       <div>Tab content for Blog</div>
    //     </Tab>
    //   </Tabs>
    // </Container>
  );
};

export default TabContent;
