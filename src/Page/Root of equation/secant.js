import React, { Component } from "react";
import { Card, Button, Row, Col, Table, Input } from "antd";
import { range, compile, derivative } from "mathjs";
import axios from "axios";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";

var dataSource = [];
const columns = [
  {
    title: "Iteration",
    dataIndex: "iteration",
    key: "iteration"
  },
  {
    title: "Y",
    dataIndex: "y",
    key: "y"
  },
  {
    title: "Error",
    key: "error",
    dataIndex: "error"
  }
];
const xValues = range(-10, 10, 0.5).toArray();
var fx = " ";

class secant extends Component {
  datas = async number => {
    var response = await axios
      .get("http://localhost:3001/api/users/showsecantmodel")
      .then(res => {
        return res.data;
      });
    this.setState({
      fx: response["data"][number]["fx"],
      x0: response["data"][number]["x0"],
      x1: response["data"][number]["x1"]
    });
    this.secant(this.state.x0, this.state.x1);
  };

  constructor(props) {
    super(props);

    this.state = {
      fx: "",
      x0: 0,
      x1: 0,
      number: 0,
      showOutputCard: false,
      showGraph: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.secant = this.secant.bind(this);
  }

  secant(x0, x1) {
    fx = this.state.fx;
    var x = [],
      y = 0,
      epsilon = parseFloat(0.0);
    var n = 1,
      i = 1;
    var data = [];
    data["y"] = [];
    data["error"] = [];
    x.push(x0);
    x.push(x1);
    data["y"][0] = x0;
    data["error"][0] = "---";

    do {
      y =
        x[i] -
        (this.func(x[i]) * (x[i] - x[i - 1])) /
          (this.func(x[i]) - this.func(x[i - 1]));
      x.push(y);
      epsilon = this.error(y, x[i]);
      data["y"][n] = y.toFixed(8);
      data["error"][n] = Math.abs(epsilon).toFixed(8);

      n++;
      i++;
    } while (Math.abs(epsilon) > 0.000001);
    this.createTable(data["y"], data["error"]);
    this.setState({
      showOutputCard: true,
      showGraph: true
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
  createTable(y, error) {
    dataSource = [];
    for (var i = 0; i < y.length; i++) {
      dataSource.push({
        iteration: i + 1,
        y: y[i],
        error: error[i]
      });
    }
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
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
                <h>f(x)</h> <Input size="large" name="fx"></Input>
                <h>
                  X<sub>0</sub>
                </h>{" "}
                <Input size="large" name="x0"></Input>
                <h>
                  X<sub>1</sub>
                </h>{" "}
                <Input size="large" name="x1"></Input>
              </div>
              <br />
              <Button
                id="submit_button"
                style={{ background: "#4dea6f", color: "green" }}
                onClick={() =>
                  this.secant(
                    parseFloat(this.state.x0),
                    parseFloat(this.state.x1)
                  )
                }
              >
                submit
              </Button>
            </Card>
          </Col>

          <Col span={12}>
            <Card
              title={"Input in Database"}
              bordered={true}
              style={{ width: 700 }}
              onChange={this.handleChange}
            >
              <div>
                <h>Number</h> <Input size="large" name="number"></Input>
              </div>
              <br />
              <Button
                id="submit_button"
                style={{ background: "#4dea6f", color: "green" }}
                onClick={() => this.datas(parseFloat(this.state.number))}
              >
                submit
              </Button>
            </Card>
          </Col>
        </Row>
        <br />
        <br />
        {this.state.showGraph && (
          <div className={"my-pretty-chart-container"}>
            <Card bordered={true} style={{ borderRadius: "50px" }}>
              <LineChart
                width={730}
                height={250}
                data={dataSource}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="error" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />
                <Line
                  name="error"
                  type="monotone"
                  dataKey="error"
                  stroke="#8884d8"
                />
              </LineChart>
            </Card>
          </div>
        )}
        <br />
        <Row>
          {this.state.showOutputCard && (
            <Col span={24}>
              <Table dataSource={dataSource} columns={columns} />
            </Col>
          )}
        </Row>
      </div>
    );
  }
}

export default secant;
