import React, { Component } from "react";
import { Alert, Card, Input, Button, Table, Tag, Row, Col, Slider } from "antd";
import { range, compile } from "mathjs";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";
import axios from "axios";
const { Column, ColumnGroup } = Table;
var fx = "";

var dataSource = []
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
        title: "XR",
        dataIndex: "xr",
        key: "xr"
    },
    {
        title: "X",
        dataIndex: "x",
        key: "x"
    },
    {
        title: "Error",
        key: "error",
        dataIndex: "error"
    }
];

const xValues = range(-10, 10, 0.5).toArray();

class falseposition extends Component {
  data = async(num) =>{
    var response = await axios.get('http://localhost:3001/api/users/showfalsepositionmodel').then(res => {return res.data});
        this.setState({
            fx:response['data'][num]['fx'],
            xl:response['data'][num]['xl'],
            xr:response['data'][num]['xr']
        })
        this.false_position(this.state.xl,this.state.xr);
  }

  constructor(props) {
    super(props);

    this.state = {
      fx: "",
      XL: 0,
      XR: 0,
      num: 0,
      showtable: false,
      showGraph: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.false_position = this.false_position.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  false_position(xl, xr) {
    fx = this.state.fx;
    var increaseFunction = false;
    var xi = 0;
    var epsilon = parseFloat(0.0);
    var n = 0;
    var data = [];
    data["xl"] = [];
    data["xr"] = [];
    data["x"] = [];
    data["error"] = [];
    if (this.func(xl) < this.func(xr)) {
      increaseFunction = true;
    }
    do {
      xi =
        (xl * this.func(xr) - xr * this.func(xl)) /
        (this.func(xr) - this.func(xl));
      if (this.func(xi) * this.func(xr) < 0) {
        epsilon = this.error(xi, xr);
        if (increaseFunction) {
          xl = xi;
        } else {
          xr = xi;
        }
      } else {
        epsilon = this.error(xi, xl);
        if (increaseFunction) {
          xr = xi;
        } else {
          xl = xi;
        }
      }
      data["xl"][n] = xl;
      data["xr"][n] = xr;
      data["x"][n] = xi.toFixed(6);
      data["error"][n] = Math.abs(epsilon).toFixed(6);
      n++;
    } while (Math.abs(epsilon) > 0.000001);

    this.createTable(data["xl"], data["xr"], data["x"], data["error"]);
    this.setState({
      showtable: true,
      showGraph: true
    });
  }
  func(X) {
    var expr = compile(this.state.fx);
    let scope = { x: parseFloat(X) };
    return expr.eval(scope);
  }
  error = (xnew, xold) => Math.abs((xnew - xold) / xnew);
  createTable(xl, xr, x, error) {
    dataSource = [];
    for (var i = 0; i < xl.length; i++) {
      dataSource.push({
        iteration: i + 1,
        xl: xl[i],
        xr: xr[i],
        x: x[i],
        error: error[i]
      });
    }
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
                <h2>X<sub>L</sub></h2> <Input size="large" name="XL"></Input>
                <h2>X<sub>R</sub></h2> <Input size="large" name="XR"></Input>
              </div>
              <br></br>

              <Button
                id="submit_button"
                style={{ background: "#4caf50", color: "white" }}
                onClick={() =>
                  this.false_position(
                    parseFloat(this.state.XL),
                    parseFloat(this.state.XR)
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
                onClick={() => this.data(this.state.num)}
              >
                Summit
              </Button>
            </Card>
          </Col>
        </Row>
        <br />

        <Row>
          <Col span={24}>
          {this.state.showGraph &&

<div className={"my-pretty-chart-container"}>
    <Card bordered={true}
        style={{ borderRadius: "50px" }}
    >
        <LineChart width={730} height={250} data={dataSource}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="error" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            <Line name="error" type="monotone" dataKey="error" stroke="#8884d8" />
        </LineChart>
    </Card>
</div>
}
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

export default falseposition;
