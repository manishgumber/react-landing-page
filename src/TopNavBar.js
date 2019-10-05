import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import "./App.css";
import { Layout, Menu } from "antd";
const { Header, Content, Footer } = Layout;

const TopNavBar = (prop) => {

//   const [globalState, setGlobalState] = useContext(AppContext);
//   const [state, setState] = useState({ loginModal: "hidden" });

  let selectedMenu;

  if (prop.location === "/") {
    selectedMenu = 1;
  } else if (prop.location === "/about") {
    selectedMenu = 2;
  } else if (prop.location === "/contact") {
    selectedMenu = 3;
  }
  console.log(prop.location);
  console.log(selectedMenu);

  return (
    <Layout>
      <Header
        theme="light"
        style={{ position: "fixed", zIndex: 1, width: "100%" }}
      >
        <div className="logo" />
        <div style={{ float: "left" }}>
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={[2]}
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item key="1">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2" className="ant-menu-item-selected">
              <Link to="/about">About us</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/contact">Contact</Link>
            </Menu.Item>
          </Menu>
        </div>
        <div style={{ float: "right" }}>
          <Menu
            theme="light"
            mode="horizontal"
            style={{ lineHeight: "64px" }}
            selectable="false"
          >
            <Menu.Item key="4">Register</Menu.Item>
            <Menu.Item key="5">Login</Menu.Item>
          </Menu>
        </div>
      </Header>

      {/* <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer> */}
    </Layout>
  );
};

export default TopNavBar;
