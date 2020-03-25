import React, { Component } from 'react'
import { Card, Button, Row, Col, Table, Input } from 'antd'
import { compile} from 'mathjs'
import axios from 'axios';
var Algebrite = require('algebrite')
var I, exact, error;

class CompositeTrapzidal extends Component {
    datas = async (number) => {
        var response = await axios.get('http://localhost:3001/api/users/showCtrapmodel').then(res => { return res.data });
        this.setState({
            fx: response['data'][number]['fx'],
            a: response['data'][number]['a'],
            b: response['data'][number]['b'],
            n: response['data'][number]['n'],
        })
        this.composite_trapezoidal(this.state.a, this.state.b,this.state.n);
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
    composite_trapezoidal(a, b, n) {
        var h = (b-a)/n
        I = (h / 2) * (this.func(a) + this.func(b) + 2*this.summationFunction(n, h))
        exact = this.exactIntegrate(a, b)
        error = Math.abs((exact-I) / exact) * 100
        this.setState({
            showOutputCard: true
        })
    }
    exactIntegrate(a, b) {
        var expr = compile(Algebrite.integral(Algebrite.eval(this.state.fx)).toString())
        return expr.eval({x:b}) - expr.eval({x:a})

    }
    summationFunction(n, h) {
        var sum = 0
        var counter = h
        for (var i=1 ; i<n ; i++) {
            sum += this.func(counter)
            counter += h
        }
        return sum
    }
    func(X) {
        var expr = compile(this.state.fx);
        let scope = {x:parseFloat(X)};
        return expr.eval(scope);        
    }


    render() {
        return (
            <div>
                <Row>
                    <Col span={12}>
                        <Card
                            title={"Input Composite Trapezoidal Data"}
                            bordered={true}
                            style={{ width: 700 }}
                            onChange={this.handleChange}
                        >
                            <div>
                                <h>f(x)</h> <Input size="large" name="fx"></Input>
                                <h>Lower Bound(A)</h> <Input size="large" name="a" ></Input>
                                <h>Upper Bound(B)</h> <Input size="large" name="b" ></Input>
                                <h>N</h> <Input size="large" name="n" ></Input>
                            </div>
                            <br />
                            <Button
                                id="submit_button"
                                style={{ background: "#4dea6f", color: "green" }}
                                onClick={() =>
                                    this.composite_trapezoidal(
                                        parseFloat(this.state.a),
                                        parseFloat(this.state.b),
                                        parseFloat(this.state.n)
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
                                <h>Number</h> <Input size="large" name="number"></Input>
                            </div>
                            <br />
                            <Button
                                id="submit_button"
                                style={{ background: "#4dea6f", color: "green" }}
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

export default CompositeTrapzidal
