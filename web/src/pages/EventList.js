import React, { Component } from 'react'
import { db } from '../shared/Firebase';
import { Spinner } from 'react-bootstrap';


export default class EventList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: null,
            winner: null,
        }
    }
    componentDidMount() {
        db.collection("event2").get().then((querySnapshot) => {
            let list = [];
            querySnapshot.forEach((doc) => {
                // console.log(`${doc.id} => ${doc.data()}`);
                list.push(doc.data());
            });
            list.sort((a, b) => {
                if (a.number > b.number) {
                    return 1
                }
                if (a.number < b.number) {
                    return -1
                }
                return 0
            })
            this.setState({ list });
        });
    }
    _draw = () => {
        const data = this.state.list;
        this.setState({ winner: data[Math.floor(Math.random() * data.length)] });
    }
    render() {
        const { list } = this.state;
        return (
            <div style={{ backgroundColor: '#222', width: '100vw', minHeight: '100vh', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                {list !== null
                    ?
                    <div style={{ width: '80vw', paddingTop: 40 }}>
                        <div style={{ height: 50, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <text style={{ color: 'white', fontSize: 20 }}>총 {list.length}명 참여</text>
                        </div>
                        <div style={{ width: '100%', height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div onClick={this._draw} style={{ width: 100, height: 30, backgroundColor: 'white', borderRadius: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                <text style={{ fontSize: 20, color: 'red' }}>추첨</text>
                            </div>
                        </div>
                        {this.state.winner && <div style={{ width: '100%', height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                            <div style={{ height: 50, width: '100%', display: 'flex' }}>
                                <div style={{ width: '25%', border: '1px solid red', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <text style={{ color: 'white', fontSize: 20 }}>{this.state.winner.number}</text>
                                </div>
                                <div style={{ width: '25%', border: '1px solid red', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <text style={{ color: 'white', fontSize: 14 }}>{this.state.winner.item === 0 ? '나이키' : '데상트'}</text>
                                </div>
                                <div style={{ width: '25%', border: '1px solid red', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <text style={{ color: 'white', fontSize: 20 }}>*</text>
                                </div>
                                <div style={{ width: '25%', border: '1px solid red', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <text style={{ color: 'white', fontSize: 20 }}>*</text>
                                </div>
                            </div>

                        </div>}
                        <div style={{ height: 50, width: '100%', display: 'flex' }}>
                            <div style={{ width: '25%', border: '1px solid #777', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <text style={{ color: 'white', fontSize: 20 }}>학번</text>
                            </div>
                            <div style={{ width: '25%', border: '1px solid #777', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <text style={{ color: 'white', fontSize: 20 }}>선택</text>
                            </div>
                            <div style={{ width: '25%', border: '1px solid #777', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <text style={{ color: 'white', fontSize: 20 }}>비고</text>
                            </div>
                            <div style={{ width: '25%', border: '1px solid #777', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <text style={{ color: 'white', fontSize: 20 }}>비고</text>
                            </div>
                        </div>

                        {list.map((data, index) =>
                            <div key={index} style={{ height: 50, width: '100%', display: 'flex' }}>
                                <div style={{ width: '25%', borderRight: '1px solid #777', borderLeft: '1px solid #777', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <text style={{ color: 'white', fontSize: 20 }}>{data.number}</text>
                                </div>
                                <div style={{ width: '25%', borderRight: '1px solid #777', borderLeft: '1px solid #777', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <text style={{ color: 'white', fontSize: 14 }}>{data.item === 0 ? '나이키' : '데상트'}</text>
                                </div>
                                <div style={{ width: '25%', borderRight: '1px solid #777', borderLeft: '1px solid #777', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <text style={{ color: 'white', fontSize: 20 }}>*</text>
                                </div>
                                <div style={{ width: '25%', borderRight: '1px solid #777', borderLeft: '1px solid #777', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <text style={{ color: 'white', fontSize: 20 }}>*</text>
                                </div>
                            </div>
                        )}
                        <div style={{ width: '100%', borderTop: '1px solid #777' }} />
                    </div>
                    :
                    <div style={{ display: 'flex', height: '100vh', width: '100vw', alignItems: 'center', justifyContent: 'center' }}>
                        <Spinner animation="grow" variant='dark' style={{ margin: 20 }} />
                        <Spinner animation="grow" variant='dark' style={{ margin: 20 }} />
                    </div>
                }
            </div>
        )
    }
}
