import React, { Component } from 'react'
import { Card, Button, Row, Col, Table, Input } from 'antd'
import { compile} from 'mathjs'
import axios from 'axios';

var Algebrite = require('algebrite')
var I, exact, error;

class Simpson extends Component {
    datas = async (number) => {
        var response = await axios.get('http://localhost:3001/api/users/showsimpsonmodel').then(res => { return res.data });
        this.setState({
            fx: response['data'][number]['fx'],
            a: response['data'][number]['a'],
            b: response['data'][number]['b'],
        })
        this.simpson(this.state.a, this.state.b);
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
    simpson(a, b) {
        var h = (b-a)/2
        var x1 = (a+b)/2
        I = (h / 3) * (this.func(a) + this.func(b) + (4*this.func(x1)))
        exact = this.exactIntegrate(a, b)
        error = (Math.abs((I-exact) / I) * 100).toFixed(6)
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
                            title={"Input Simpson's Data"}
                            bordered={true}
                            style={{ width: 700 }}
                            onChange={this.handleChange}
                        >
                            <div>
                                <h>f(x)</h> <Input size="large" name="fx"></Input>
                                <h>Lower Bound(A)</h> <Input size="large" name="a" ></Input>
                                <h>Upper Bound(B)</h> <Input size="large" name="b" ></Input>
                            </div>
                            <br />
                            <Button
                                id="submit_button"
                                style={{ background: "#4dea6f", color: "green" }}
                                onClick={() =>
                                    this.simpson(
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

export default Simpson
