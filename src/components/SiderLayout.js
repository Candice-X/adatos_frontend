import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Route, Link } from "react-router-dom";
import { OPTION } from "../constants";
import {BulbDetection} from "./BulbDetection";
import {Unet} from "./Unet";
import {Sub} from "./Sub";
import {DashBoard} from "./DashBoard";

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;


export class SiderLayout extends React.Component {
  state = {
    collapsed: false,
    option: OPTION["0"]
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  handleClick = (e) => {
    this.setState({option: OPTION[e.key]});
  }

  render() {
    return (
        <Layout style={{ minHeight: '100vh'}}>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
            width="250px"
          >
            <div className="logo"><img alt="adatos-logo" style={{width: '100%'}} src = "https://static1.squarespace.com/static/55517329e4b015fc1ad0c42e/t/5af91b44352f53d27b53ef2e/1530002609687/?format=1500w"/></div>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={this.handleClick}>
              <SubMenu
                key="p2pml"
                title={<span><Icon type="bars" /><span>P2P ML</span></span>}
              >
                <Menu.Item key="1">
                  <span>Plantation Detection</span>
                  <Link to="/bulb" />
                </Menu.Item>
              </SubMenu>

              <SubMenu
                key="p2pdl"
                title={<span><Icon type="bars" /><span>P2P DL</span></span>}
              >
                <Menu.Item key="2">
                  <span>Fertilization Model</span>
                  <Link to="/u-net" />
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="i2vml"
                title={<span><Icon type="bars" /><span>I2V ML</span></span>}
              >
                <Menu.Item key="3">
                  <span>Triputra Nutrient</span>
                  <Link to="/sub3" />
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="i2vdl"
                title={<span><Icon type="bars" /><span>I2V DL</span></span>}
              >
                <Menu.Item key="4">
                  <span>Chest X-ray</span>
                  <Link to="/sub4" />
                </Menu.Item>
              </SubMenu>

            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>{this.state.option}</Breadcrumb.Item>
              </Breadcrumb>
              <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                <Route exact path="/" component={DashBoard}/>
                <Route path="/bulb" component={BulbDetection} />
                <Route path="/u-net" component={Unet} />
                <Route path="/sub3" component={Sub} />
                <Route path="/sub4" component={Sub} />
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
    );
  }
}

