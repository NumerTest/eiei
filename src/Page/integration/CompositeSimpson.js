import React, { Component } from 'react'
import { Card, Button, Row, Col, Table, Input } from 'antd'
import { compile} from 'mathjs'
import axios from 'axios';

var Algebrite = require('algebrite')

var I, exact, error;

class CompositeSimpson extends Component {
    datas = async (number) => {
        var response = await axios.get('http://localhost:3001/api/users/showCsimpsonmodel').then(res => { return res.data });
        this.setState({
            fx: response['data'][number]['fx'],
            a: response['data'][number]['a'],
            b: response['data'][number]['b'],
            n: response['data'][number]['n'],
        })
        this.composite_simpson(this.state.a, this.state.b,this.state.n);
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
    composite_simpson(a, b, n) {
        var h = (b-a)/n
        var sum1 = this.summationFunction(b,a+h)
        var sum2 = this.summationFunction(b,a+2*h)
        I = (h / 3) * (this.func(a) + this.func(b) + 4*sum1 + 2*sum2)
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
        for (var i=counter ; i<n ; i+=2*h) {
            sum += this.func(i)
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
                            title={"Input Composite Simpson's Data"}
                            bordered={true}
                            style={{ width: 700 }}
                            onChange={this.handleChange}
                        >
                            <div>
                                <h2>f(x)</h2> <Input size="large" name="fx"></Input>
                                <h2>Lower Bound(A)</h2> <Input size="large" name="a" ></Input>
                                <h2>Upper Bound(B)</h2> <Input size="large" name="b" ></Input>
                                <h2>N</h2> <Input size="large" name="n" ></Input>
                            </div>
                            <br />
                            <Button
                                id="submit_button"
                                style={{ background: "#4caf50", color: "white" }}
                                onClick={() =>
                                    this.composite_simpson(
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

export default CompositeSimpson
