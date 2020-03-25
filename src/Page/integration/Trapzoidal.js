import React, { Component } from 'react'
import { Card, Button, Row, Col, Table, Input } from 'antd'
import { compile} from 'mathjs'
import axios from 'axios';

var Algebrite = require('algebrite')
var I, exact, error;

class Trapzoidal extends Component {
    datas = async (number) => {
        var response = await axios.get('http://localhost:3001/api/users/showtrapmodel').then(res => { return res.data });
        this.setState({
            fx: response['data'][number]['fx'],
            a: response['data'][number]['a'],
            b: response['data'][number]['b'],
        })
        this.trapzoidal(this.state.a, this.state.b);
    }

    constructor(props) {
        super(props)

        this.state = {
            fx: "",
            a: 0,
            b: 0,
            number: 0,
            n: 0,
            showOutputCard: false,
        }
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    trapzoidal(a, b) {
        I = ((b - a) / 2) * (this.func(a) + this.func(b))
        exact = this.exactIntegrate(a, b).toFixed(6)
        error = (Math.abs((I - exact) / I) * 100).toFixed(6)
        this.setState({
            showOutputCard: true
        })
    }
    exactIntegrate(a, b) {
        var expr = compile(Algebrite.integral(Algebrite.eval(this.state.fx)).toString())
        return expr.eval({ x: b }) - expr.eval({ x: a })

    }
    summationFunction(n, h) {
        var sum = 0
        var counter = h
        for (var i = 1; i < n; i++) {
            sum += this.func(counter)
            counter += h
        }
        return sum
    }
    func(X) {
        var expr = compile(this.state.fx);
        let scope = { x: parseFloat(X) };
        return expr.eval(scope);
    }

    render() {
        return (
            <div>
                <Row>
                    <Col span={12}>
                        <Card
                            title={"Input TrapeZoidal Data"}
                            bordered={true}
                            style={{ width: 700 }}
                            onChange={this.handleChange}
                        >
                            <div>
                                <h2>f(x)</h2> <Input size="large" name="fx"></Input>
                                <h2>Lower Bound(A)</h2> <Input size="large" name="a" ></Input>
                                <h2>Upper Bound(B)</h2> <Input size="large" name="b" ></Input>
                            </div>
                            <br />
                            <Button
                                id="submit_button"
                                style={{ background: "#4caf50", color: "white" }}
                                onClick={() =>
                                    this.trapzoidal(
                                        parseFloat(this.state.a),
                                        parseFloat(this.state.b)
                                    )
                                }
                            >
                                submit
                        </Button>
                        </Card>
                    </Col>

                    <Col span={12}>
                        <Card
                            title={"Input Database"}
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
                                        Approximate = {I}<br />
                                        Exact = {exact}<br />
                                        Error = {error}%
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

export default Trapzoidal
