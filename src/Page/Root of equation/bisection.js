import React, { Component } from "react";
import { Alert, Card, Input, Button, Table, Tag, Row, Col, Slider } from "antd";
import { range, compile } from "mathjs";
import axios from 'axios';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
const { Column, ColumnGroup } = Table;


var dataSource = [];
const columns = [
  {
    title: "Iteration",
    dataIndex: "iteration",
    key: "iteration"
  },
  {
    title: "XL",
    dataIndex: "xl",
    key: "xl"
  },
  {
    title: "XM",
    dataIndex: "xm",
    key: "xm"
  },
  {
    title: "XR",
    dataIndex: "xr",
    key: "xr"
  },
  {
    title: "Error",
    dataIndex: "error",
    key: "error"
  }
];
var fx = "";
const xValues = range(-10, 10, 0.5).toArray();

class bisection extends Component {
  
  data = async(num) =>{
    var response = await axios.get('http://localhost:3001/api/users/showbisectionmodel').then(res => {return res.data});
        this.setState({
            fx:response['data'][num]['fx'],
            xl:response['data'][num]['xl'],
            xr:response['data'][num]['xr']
        })
        this.bisection(this.state.xl,this.state.xr);
  }

  constructor(props) {
    super(props);

    this.state = {
      fx: "",
      xl: 0,
      xr: 0,
      num: 0,
      showGraph: false,
      showtable: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.bisection = this.bisection.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  bisection(xl, xr) {
    fx = this.state.fx;
    var increaseFunction = false;
    var XM = 0;
    var sum = parseFloat(0.0);
    var n = 0;
    var dXL = [];
    var dXR = [];
    var dX = [];
    var derror = [];

    if (this.func(xl) < this.func(xr)) {
      increaseFunction = true;
    }

    do {
      //step 1
      XM = (xl + xr) / 2;

      //step 2
      if (this.func(XM) * this.func(xr) < 0) {
      //step 3
        sum = this.error(XM, xr);
        if (increaseFunction) {
          xl = XM;
        } else {
          xr = XM;
        }
      } 
      
      
      else {
        //step 3
        sum = this.error(XM, xl);
        if (increaseFunction) {
          xr = XM;
        } else {
          xl = XM;
        }
      }

      dXL[n] = xl;
      dXR[n] = xr;
      dX[n] = XM.toFixed(8);
      derror[n] = Math.abs(sum).toFixed(8);
      n++;
      
    } while (Math.abs(sum) > 0.000001);

    for (var i = 0; i < dXL.length; i++) {
      dataSource.push({
        iteration: i + 1,
        xl: dXL[i],
        xm: dX[i],
        xr: dXR[i],
        error: derror[i]
      });
    }

    this.setState({
      showGraph: true,
      showtable: true
    });
  }

  func(X) {
    var expr = compile(this.state.fx);
    let scope = { x: parseFloat(X) };
    return expr.eval(scope);
  }

  error(xnew, xold) {
    return Math.abs((xnew - xold) / xnew);
  }

  
  render() {
    return (
      <div>
        <Row>
          <Col span={12}>
            <Card
              title={"Input Data"}
              bordered={true}
              style={{ width: 700 }}
              onChange={this.handleChange}
            >
              <div>
                <h2>F(x)</h2> <Input size="large" name="fx"></Input>
                <h2>X<sub>L</sub></h2> <Input size="large" name="xl"></Input>
                <h2>X<sub>R</sub></h2> <Input size="large" name="xr"></Input>
              </div>
              <br></br>
              <Button
                id="submit_button"
                style={{ background: "#4caf50", color: "white" }}
                onClick={() =>
                  this.bisection(
                    parseFloat(this.state.xl),
                    parseFloat(this.state.xr)
                  )
                }
              >
                Summit
              </Button>
            </Card>
          </Col>

          <Col span={12}>
            <Card
              title={"Input from Database"}
              bordered={true}
              style={{ width: 700 }}
              onChange={this.handleChange}
            >
              <div>
                <h2>Choice</h2> <Input size="large" name="num"></Input>
              </div>
              <br></br>
              <Button
                id="submit_button"
                style={{ background: "#4caf50", color: "white" }}
                onClick={() => this.data(this.state.num)
                }

              >
                Summit
              </Button>
            </Card>
          </Col>
        
        </Row>
        <br />

        <Row>
          <Col span={24}>
            {this.state.showGraph && (
              <Col span={24}>

                <Card
                  bordered={true}
                  style={{
                    width: 900,
                    height: 500,
                    border: "2px solid black",
                    background: "#f44aaa6",
                    color: "#000000",
                    float: "left",
                    marginLeft: "4%"
                  }}
                >
                  <LineChart width={730} height={400} data={dataSource}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <XAxis dataKey="error" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Legend verticalAlign="top" height={36} />
                            <Line name="Error" type="monotone" dataKey="error" stroke="#8884d8" />
                  </LineChart>
                  

                </Card>
              </Col>
            )}
          </Col>
        </Row>

        <br />

        <Row>
          {this.state.showtable && (
            <Col span={24}>
              <Table dataSource={dataSource} columns={columns} />
            </Col>
          )}
        </Row>

      </div>
    );
  }
}

export default bisection;
