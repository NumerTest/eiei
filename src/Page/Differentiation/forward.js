import React, { Component } from 'react'
import { Card, Button, Row, Col, Table, Input } from 'antd'
import { compile,derivative} from 'mathjs'
import Axios from 'axios';

var y, error, exact;

class forward extends Component {
    datas = async (number) => {
        var response = await Axios.get('http://localhost:3001/api/users/showforwardmodel').then(res => { return res.data });
        this.setState({
            fx: response['data'][number]['fx'],
            degree: response['data'][number]['degree'],
            x: response['data'][number]['x'],
            h: response['data'][number]['h'],
        })
        this.forwardh(this.state.degree, this.state.x,this.state.h);
    }
    constructor() {
        super();
        this.state = {
            fx: "",
            x: 0,
            h: 0,
            degree: 0,
            number: 0,
            showOutputCard: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    forwardh(degree, x, h) {
        switch (degree) {
            case 1:
                y = (this.func(x+(1*h)) - this.func(x)) / h
                break;
            case 2:
                y = (this.func(x+(2*h)) - 2*this.func(x+(1*h)) + this.func(x)) / Math.pow(h, 2)
                break;
            case 3:
                y = (this.func(x+(3*h)) - 3*this.func(x+(2*h)) + 3*this.func(x+(1*h)) - this.func(x)) / Math.pow(h, 3)
                break;
            default:
                y = (this.func(x+(4*h)) - 4*this.func(x+(3*h)) + 6*this.func(x+(2*h)) - 4*this.func(x+(1*h)) + this.func(x)) / Math.pow(h, 4) 
        }
        exact = this.funcDiff(x, degree)
        error = Math.abs((y - exact) / y)*100
        this.setState({
            showOutputCard: true
        })
    }

    func(X) {
        var expr = compile(this.state.fx);
        let scope = {x:parseFloat(X)};
        return expr.eval(scope);        
    }
    funcDiff(X, degree) {
        var temp = this.state.fx, expr 
        for (var i=1 ; i<=degree ; i++) {
            temp = derivative(temp, 'x')
            expr = temp
        }
        
        let scope = {x:parseFloat(X)}
        return expr.eval(scope)
    }

    render() {
        return (
            <div>
                <Row>
                    <Col span={12}>
                        <Card
                            title={"Input Forward Difference O(h) Data"}
                            bordered={true}
                            style={{ width: 700 }}
                            onChange={this.handleChange}
                        >
                            <div>
                                <h2>f(x)</h2> <Input size="large" name="fx"></Input>
                                <h2>Diff</h2> <Input size="large" name="degree" ></Input>
                                <h2>X</h2> <Input size="large" name="x" ></Input>
                                <h2>H</h2> <Input size="large" name="h" ></Input>
                            </div>
                            <br />
                            <Button
                                id="submit_button"
                                style={{ background: "#4caf50", color: "white" }}
                                onClick={() =>
                                    this.forwardh(
                                        parseFloat(this.state.degree),
                                        parseFloat(this.state.x),
                                        parseFloat(this.state.h)
                                    )
                                }
                            >
                                submit
                        </Button>
                        </Card>
                    </Col>

                    <Col span={12}>
                        <Card
                            title={"Input Forward Difference in Database"}
                            bordered={true}
                            style={{ width: 700 }}
                            onChange={this.handleChange}
                        >
                            <div>
                                <h2>Choice</h2> <Input size="large" name="number"></Input>
                            </div>
                            <br />
                            <Button
                                id="submit_button"
                                style={{ background: "#4caf50", color: "white" }}
                                onClick={() =>
                                    this.datas(
                                        parseFloat(this.state.number),
                                    )
                                }
                            >
                                submit
                            </Button>
                        </Card>
                    </Col>
                </Row>
                <br />
                <Row>
                    {this.state.showOutputCard &&
                        <Col span={24}>
                            <Card
                                bordered={true}
                                style={{ width: 700 }}
                                onChange={this.handleChange
                                }
                            >
                                <div>
                                    <p style={{ fontSize: "24px"}}>
                                        Approximate = {y.toFixed(6)}<br />
                                        Exact = {exact.toFixed(6)}<br />
                                        Error = {error.toFixed(6)}%
                                    </p>
                                </div>
                            </Card>

                        </Col>
                    }
                </Row>
            </div>
        )
    }
}

export default forward

