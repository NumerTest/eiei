import React, { Component } from "react";
import { Card, Input, Button, Table } from "antd";
import { det, sum, inv, multiply } from "mathjs";

var columns = [
  {
    title: "No.",
    dataIndex: "no",
    key: "no"
  },
  {
    title: "X",
    dataIndex: "x",
    key: "x"
  },
  {
    title: "Y",
    dataIndex: "y",
    key: "y"
  }
];
var x, y, tableTag, answer;

class Linear extends Component {
  constructor(props) {
    super(props);
    x = [];
    y = [];

    tableTag = [];
    this.state = {
      nPoints: 0,
      m: 0,
      interpolatePoint: 0,
      showInputForm: true,
      showInputButton: true,
      showTableInput: false,
      showTableButton: false,
      showOutputCard: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  createTableInput(n) {
    for (var i = 1; i <= n; i++) {
      x.push(
        <Input
          style={{
            width: "70%",
            height: "50%",
            backgroundColor: "#ffffff",
            marginInlineEnd: "5%",
            marginBlockEnd: "5%",
            color: "black",
            fontSize: "18px",
            fontWeight: "bold",
            justifyContent: "center"
          }}
          id={"x" + i}
          key={"x" + i}
          placeholder={"x" + i}
        />
      );
      y.push(
        <Input
          style={{
            width: "100%",
            height: "50%",
            backgroundColor: "#ffffff",
            marginInlineEnd: "5%",
            marginBlockEnd: "5%",
            color: "black",
            fontSize: "18px",
            fontWeight: "bold"
          }}
          id={"y" + i}
          key={"y" + i}
          placeholder={"y" + i}
        />
      );
      tableTag.push({
        no: i,
        x: x[i - 1],
        y: y[i - 1]
      });
    }

    this.setState({
      showInputForm: false,
      showInputButton: false,
      showTableInput: true,
      showTableButton: true
    });
  }
  initialValue(n) {
    x = new Array(n + 1);
    y = [];
    for (var i = 1; i <= n; i++) {
      x[i] = parseInt(document.getElementById("x" + i).value);
    }
    for (i = 1; i <= n; i++) {
      y[i] = parseFloat(document.getElementById("y" + i).value);
    }
  }
  linear(n) {
    var matrixX = [2],
      matrixY = [2],
      exponent = 0;
    for (var i = 0; i < 2; i++) {
      matrixX[i] = [];
      for (var j = 0; j < 2; j++) {
        if (i === 0 && j === 0) {
          matrixX[i][j] = n;
        } else if (i === 0 && j === 1) {
          matrixX[i][j] = this.summation(x, 1);
        } else {
          matrixX[i][j] = this.summation(x, exponent + j);
        }
      }
      exponent++;
    }
    matrixY[0] = sum(y);
    matrixY[1] = this.summationOfTwo(x, y);
    matrixX = inv(matrixX);
    answer = JSON.stringify(multiply(matrixX, matrixY));

    this.setState({
      showOutputCard: true
    });
  }
  summation(A, exponent) {
    var sum = 0;
    for (var i = 1; i < A.length; i++) {
      sum += Math.pow(A[i], exponent);
    }
    return sum;
  }
  summationOfTwo(A, B) {
    var sum = 0;
    for (var i = 1; i < A.length; i++) {
      sum += A[i] * B[i];
    }
    return sum;
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <div>
        <Card
          title={"Input Linear Regression Data"}
          bordered={true}
          style={{
            width: 700,
            background: "#ffffff",
            color: "#FFFFFFFF",
            float: "left"
          }}
          onChange={this.handleChange}
        >
          {this.state.showInputForm && (
            <div>
              <h2>Number of points(n)</h2>
              <Input size="large" name="nPoints"></Input>
            </div>
          )}
          {this.state.showTableInput && (
            <div>
              <Table
                columns={columns}
                dataSource={tableTag}
                pagination={false}
                bordered={true}
                bodyStyle={{
                  fontWeight: "bold",
                  fontSize: "18px",
                  color: "white",
                  overflowY: "scroll",
                  minWidth: 120,
                  maxHeight: 300
                }}
              ></Table>
            </div>
          )}
          <br></br>
          {this.state.showInputButton && (
            <Button
              id="dimention_button"
              onClick={() =>
                this.createTableInput(
                  parseInt(this.state.nPoints),
                  parseInt(this.state.m)
                )
              }
              style={{ background: "#4dea6f", color: "green" }}
            >
              Submit<br></br>
            </Button>
          )}
          {this.state.showTableButton && (
            <Button
              id="matrix_button"
              style={{ background: "#4dea6f", color: "black" }}
              onClick={() => {
                this.initialValue(parseInt(this.state.nPoints));
                this.linear(parseInt(this.state.nPoints));
              }}
            >
              Submit
            </Button>
          )}
        </Card>
        {this.state.showOutputCard && (
          <Card
            title={"Output"}
            bordered={true}
            style={{
              width: "100%",
              border: "2px solid black",
              background: "#ffffff",
              color: "black",
              float: "left"
            }}
          >
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>
              x = {JSON.stringify(answer)}
            </p>
          </Card>
        )}
      </div>
    );
  }
}

export default Linear;
