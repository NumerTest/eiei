import React, { Component } from "react";
import { Card, Button, Input } from "antd";
import { det } from "mathjs";

var A = [], B = [], answer = [], matrixA = [], matrixB = []
class cramer extends Component {
  constructor(props) {
    super(props);

    this.state = {
        row: parseInt(0),
        column: parseInt(0),
        showDimentionForm: true,
        showDimentionButton: true,
        showMatrixForm: false,
        showMatrixButton: false,
        showOutputCard: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.cramer = this.cramer.bind(this);
  }

  
  cramer() {
    this.initMatrix();
    var counter = 0;
    // eslint-disable-next-line eqeqeq
    while (counter != this.state.row) {
        var transformMatrix = JSON.parse(JSON.stringify(A));//Deep copy
        for (var i = 0; i < this.state.row; i++) {
            for (var j = 0; j < this.state.column; j++) {
                if (j === counter) {
                    transformMatrix[i][j] = B[i]
                    break;
                }

            }

        }
        counter++;
        answer.push(<h2>X<sub>{counter}</sub>=&nbsp;&nbsp;{Math.round(det(transformMatrix)) / Math.round(det(A))}</h2>)
        answer.push(<br />)



    }
    this.setState({
        showOutputCard: true
    });


}

createMatrix(row, column) {
    for (var i = 1; i <= row; i++) {
        for (var j = 1; j <= column; j++) {
            matrixA.push(<Input style={{
                width: "18%",
                height: "50%",
                backgroundColor: "#ffffff",
                marginInlineEnd: "5%",
                marginBlockEnd: "5%",
                color: "black",
                fontSize: "18px",
            }}
                id={"a" + i + "" + j} key={"a" + i + "" + j} placeholder={"a" + i + "" + j} />)
        }
        matrixA.push(<br />)
        matrixB.push(<Input style={{
            width: "18%",
            height: "50%",
            backgroundColor: "#ffffff",
            marginInlineEnd: "5%",
            marginBlockEnd: "5%",
            color: "black",
            fontSize: "18px",
        }}
            id={"b" + i} key={"b" + i} placeholder={"b" + i} />)
    }

    this.setState({
        showDimentionForm: false,
        showDimentionButton: false,
        showMatrixForm: true,
        showMatrixButton: true
    })


}
initMatrix() {
    for (var i = 0; i < this.state.row; i++) {
        A[i] = []
        for (var j = 0; j < this.state.column; j++) {
            A[i][j] = (parseFloat(document.getElementById("a" + (i + 1) + "" + (j + 1)).value));
        }
        B.push(parseFloat(document.getElementById("b" + (i + 1)).value));
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
        <Card
            title={"Input Cramer"}
            bordered={true}
            style={{ width: 900 }}
            onChange={this.handleChange}
        >
            {this.state.showMatrixForm && <div><h2>Matrix [A]</h2><br />{matrixA}<h2>Vector [B]<br /></h2>{matrixB}</div>}

            {this.state.showDimentionForm &&
                <div>
                    <h2>Row</h2><Input size="large" name="row" ></Input>
                    <h2>Column</h2><Input size="large" name="column" ></Input>
                </div>
            }
            <br />
            {this.state.showDimentionButton &&
                <Button id="dimention_button" onClick={
                    () => this.createMatrix(this.state.row, this.state.column)
                }
                style={{ background: "#4caf50", color: "white" }}
                >
                    Submit
                    <br />
                </Button>
            }
            {this.state.showMatrixButton &&
                <Button
                    id="matrix_button"
                    style={{
                        background: "#4dea6f",
                        color: "green",
                        fontSize: "18px"
                    }}
                    onClick={() => this.cramer()}>
                    Submit
                    </Button>
            }

        </Card>

        {this.state.showOutputCard &&
            <Card
                title={"Output"}
                bordered={true}
                style={{
                    width: 700,
                    background: "FFFFFFFF",
                    color: "#FFFFFFFF",
                    float: "left"
                }}
                onChange={this.handleChange}>
                <p style={{ fontSize: "20px" }}>{answer}</p>
            </Card>
        }
    </div>
    );
  }
}

export default cramer;
