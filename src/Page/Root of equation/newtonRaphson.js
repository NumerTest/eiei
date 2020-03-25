import React, { Component } from "react";
import { Alert, Card, Input, Button, Table, Tag, Row, Col, Slider } from "antd";
import { range, compile, derivative } from "mathjs";
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

var dataSource;
const columns = [
  {
    title: "Iteration",
    dataIndex: "iteration",
    key: "iteration"
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
var fx = " ";

class newtonRaphson extends Component {
  data = async (number) => {
    var response = await axios.get('http://localhost:3001/api/users/shownewtonmodel').then(res => { return res.data });
    this.setState({
        fx: response['data'][number]['fx'],
        x0: response['data'][number]['x0'],
    })
    this.newton_raphson(this.state.x0);
}
  constructor(props) {
    super(props);

    this.state = {
      fx: "",
      x0: 0,
      number: 0,
      showOutputCard: false,
      showGraph: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.newton_raphson = this.newton_raphson.bind(this);
  }

  newton_raphson(xold) {
    fx = this.state.fx;
    var xnew = 0;
    var epsilon = parseFloat(0.0);
    var n = 0;
    var data = [];
    data["x"] = [];
    data["error"] = [];
    do {
      xnew = xold - this.func(xold) / this.funcDiff(xold);
      epsilon = this.error(xnew, xold);
      data["x"][n] = xnew.toFixed(6);
      data["error"][n] = Math.abs(epsilon).toFixed(6);
      n++;
      xold = xnew;
    } while (Math.abs(epsilon) > 0.000001);

    this.createTable(data["x"], data["error"]);
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
  funcDiff(X) {
    var expr = derivative(this.state.fx, "x");
    let scope = { x: parseFloat(X) };
    return expr.eval(scope);
  }
  error(xnew, xold) {
    return Math.abs((xnew - xold) / xnew);
  }
  createTable(x, error) {
    dataSource = [];
    for (var i = 0; i < x.length; i++) {
      dataSource.push({
        iteration: i + 1,
        x: x[i],
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
              title={"Input Newton's Raphson data"}
              bordered={true}
              style={{ width: 700 }}
              onChange={this.handleChange}
            >
              <div>
                <h2>f(x)</h2>
                <Input size="large" name="fx"></Input>
                <h2>
                  X<sub>0</sub>
                </h2>
                <Input size="large" name="x0"></Input>
              </div>
              <br />
              <Button
                id="submit_button"
                style={{ background: "#4dea6f", color: "green" }}
                onClick={() => this.newton_raphson(parseFloat(this.state.x0))}
              >
                Submit
              </Button>
            </Card>
          </Col>

          <Col span={12}>
            <Card
              title={"Input Newton's Raphson database"}
              bordered={true}
              style={{ width: 700 }}
              onChange={this.handleChange}
            >
              <div>
                <h2>Number</h2>
                <Input size="large" name="number"></Input>
              </div>
              <br />
              <Button
                id="submit_button"
                style={{ background: "#4dea6f", color: "green" }}
                onClick={() => this.data(parseFloat(this.state.number))}
              >
                Submit
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

export default newtonRaphson;
