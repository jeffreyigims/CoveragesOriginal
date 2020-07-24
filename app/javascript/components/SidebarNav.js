import { Navbar, Nav, NavItem, Button } from "react-bootstrap";
import React, { Component } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";

class SidebarNav extends React.Component {
  render() {
    return (
      <div className="side">
        <ProSidebar>
          <SidebarHeader>
            <div
              style={{
                padding: "0 24px",
                textTransform: "uppercase",
                fontWeight: "bold",
                fontSize: 14,
                letterSpacing: "1px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {"Team Scotti"}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="circle" title={"Coverages"}>
              <MenuItem suffix={<span className="badge red"></span>}>
                <Button variant="link" href={"/coverages"}>
                </Button>
              </MenuItem>
            </Menu>
            <Menu iconShape="circle">
              <MenuItem suffix={<span className="badge red"></span>}>
                <Button variant="link" href={"/metrics"}>
                  {"Metrics"}
                </Button>
              </MenuItem>
            </Menu>
            <Menu iconShape="circle">
              <MenuItem suffix={<span className="badge red"></span>}>
                <Button variant="link" href={"/clubs"}>
                  {"Clubs"}
                </Button>
              </MenuItem>
            </Menu>
            <Menu iconShape="circle">
              <SubMenu
                suffix={<span className="badge red"></span>}
                title={"Database"}
              >
                <MenuItem suffix={<span className="badge red"></span>}>
                  <Button variant="link" href={"/sports"}>
                    {"Sports"}
                  </Button>
                </MenuItem>{" "}
                <MenuItem suffix={<span className="badge red"></span>}>
                  <Button variant="link" href={"/leagues"}>
                    {"Leagues"}
                  </Button>
                </MenuItem>{" "}
                <MenuItem suffix={<span className="badge red"></span>}>
                  <Button variant="link" href={"/Groups"}>
                    {"Groups"}
                  </Button>
                </MenuItem>{" "}
              </SubMenu>
            </Menu>
          </SidebarContent>

          <SidebarFooter style={{ textAlign: "center" }}>
            <div className="sidebar-btn-wrapper">
              <a
                href="https://github.com/azouaoui-med/react-pro-sidebar"
                target="_blank"
                className="sidebar-btn"
                rel="noopener noreferrer"
              ></a>
            </div>
          </SidebarFooter>
        </ProSidebar>
      </div>
    );
  }
}

export default SidebarNav;
