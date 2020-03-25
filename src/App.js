import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'antd/dist/antd.css'
import { Layout, Menu, Button, Breadcrumb, Icon, Input } from "antd";
import {
  CalculatorOutlined,
} from '@ant-design/icons';


//Root
import Bisection from "./Page/Root of equation/bisection";
import FalseP from "./Page/Root of equation/falseposition"
import Point from "./Page/Root of equation/onepoint";
import Newton from "./Page/Root of equation/newtonRaphson";
import Secant from "./Page/Root of equation/secant";


//Linear
import Cramer from "./Page/Linear Algebra/cramer";

//Regresstion
import Linear from "./Page/Regression/Linear";

// intergration
import CSimpson from "./Page/integration/CompositeSimpson";
import CTrap from "./Page/integration/CompositeTrapzidal";
import Simpson from "./Page/integration/Simpson";
import Trap from "./Page/integration/Trapzoidal";

//Diff
import backward from "./Page/Differentiation/backward";
import backwardh2 from "./Page/Differentiation/backwardh2";
import forward from "./Page/Differentiation/forward";
import forwardh2 from "./Page/Differentiation/forwardh2";
import central from "./Page/Differentiation/cental";
import centralh2 from "./Page/Differentiation/centralh2";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false
    };
  }

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Router>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <SubMenu key="sub1" title={<span><CalculatorOutlined />Root of equation</span>}>
            
                <Menu.Item key="menu_Bisection">
                  Bisection method
                  <Link to="/bisection" />
                </Menu.Item>

                <Menu.Item key="menu_false_position">
                  false position method
                  <Link to="/falseposition" />
                </Menu.Item>

                <Menu.Item key="menu_onepoint">
                  One point method
                  <Link to="/onepoint" />
                </Menu.Item>

                <Menu.Item key="menu_Newton-Raphson">
                  Newton-Raphson method
                  <Link to="/Newton" />
                </Menu.Item>

                <Menu.Item key="menu_Secant">
                  Secant method
                  <Link to="/Secant" />
                </Menu.Item>
              </SubMenu>

              <SubMenu key="sub2" title={<span><CalculatorOutlined />Linear Algebra</span>}>
                  <Menu.Item key="menu_cramer">
                      Cramer method
                    <Link to="/cramer"/>
                  </Menu.Item>
              </SubMenu>

              <SubMenu key="sub3" title={<span><CalculatorOutlined />Regression</span>}>
                  <Menu.Item key="menu_Linear">
                      Linear
                    <Link to="/linear"/>
                  </Menu.Item>
              </SubMenu>


              <SubMenu key="sub5" title={<span><CalculatorOutlined />Integration</span>}>
                <Menu.Item key="Simpson">
                  Simpson
                <Link to="/simpson" />
                </Menu.Item>

                <Menu.Item key="menu_Trapzoidal">
                  Trapzoidal
                <Link to="/trap" />
                </Menu.Item>

                <Menu.Item key="menu_CompositeSimpson">
                  CompositeSimpson
                <Link to="/csimpson" />
                </Menu.Item>

                <Menu.Item key="menu_CompositeTrapzidal">
                  CompositeTrapzidal
                <Link to="/ctrap" />
                </Menu.Item>



              </SubMenu>
              

              <SubMenu key="sub6" title={<span><CalculatorOutlined />Differentiation</span>}>
                <Menu.Item key="menu_Backward">
                  Backward
                <Link to="/Backward" />
                </Menu.Item>
                <Menu.Item key="menu_Backwardh2">
                  Backwardh2
                <Link to="/Backwardh2" />
                </Menu.Item>
                <Menu.Item key="menu_Forward">
                  Forward
                <Link to="/Forward" />
                </Menu.Item>
                <Menu.Item key="menu_Forwardh2">
                  Forwardh2
                <Link to="/Forwardh2" />
                </Menu.Item>
                <Menu.Item key="menu_Central">
                Central
                <Link to="/Central" />
                </Menu.Item>
                <Menu.Item key="menu_Centralh2">
                Centralh2
                <Link to="/Centralh2" />
                </Menu.Item>
              
              </SubMenu>


          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} > Numer </Header>
          <Content style={{ margin: "0 16px" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <Route path="/bisection" component={Bisection} />
              <Route path="/falseposition" component={FalseP} />
              <Route path="/onepoint" component={Point} />
              <Route path="/Newton" component={Newton} />
              <Route path="/Secant" component={Secant} />
              <Route path="/cramer" component={Cramer} />
              <Route path="/linear" component={Linear} />
              <Route path="/csimpson" component={CSimpson} />
              <Route path="/ctrap" component={CTrap} />
              <Route path="/simpson" component={Simpson} />
              <Route path="/trap" component={Trap} />
              <Route path="/Backward" component={backward} />
              <Route path="/Backwardh2" component={backwardh2} />
              <Route path="/Forward" component={forward} />
              <Route path="/Forwardh2" component={forwardh2} />
              <Route path="/Central" component={central} />
              <Route path="/Centralh2" component={centralh2} />

            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </Router>
    );
  }
}

export default App;
