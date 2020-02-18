import React, { Component } from 'react'
import { Spinner } from 'react-bootstrap';

const circleSize = 100;
const circleSizeM = 60;

const data = [
    {
        page: 'event1',
        title: '양념 vs 후라이드'
    }
]

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pointedIndex: -1,
            data: data,
            isMobile: false,
            windowWidth: 0,
            windowHeight: 0,
            language: 0,
        }
    }

    componentDidMount() {
        // this.props.history.push('/event2');
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    updateDimensions() {
        let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
        // let windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;

        try {
            this.setState({ isMobile: windowWidth < 500 ? true : false });
        } catch (error) {

        }
    }


    _onClicked(page) {
        this.props.history.push('/' + page);
    }

    render() {
        const { data, isMobile } = this.state;
        return (
            <div style={{ opacity: 0.9, display: 'flex', height: '100vh', width: '100vw', backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
                {data === null
                    ?
                    <div style={{ display: 'flex' }}>
                        <Spinner animation="grow" variant='dark' style={{ margin: 20 }} />
                        <Spinner animation="grow" variant='dark' style={{ margin: 20 }} />
                    </div>
                    :
                    <div style={{ display: 'flex', width: isMobile ? '70vw' : '50vw', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', zIndex: 1 }}>
                        {data.map((info, index) =>
                            <div key={index} onClick={() => this._onClicked(info.page)} style={{ width: isMobile ? circleSizeM : circleSize, height: isMobile ? circleSizeM : circleSize, borderRadius: isMobile ? circleSizeM / 2 : circleSize / 2, backgroundColor: 'white', margin: isMobile ? '20px' : '40px', overflow: 'hidden', cursor: 'pointer' }}>
                                {/* <img alt={info.title[0]} src={info.icon} style={{ width: '100%', height: '100%' }} /> */}
                                <text>{info.title}</text>
                            </div>
                        )}
                    </div>}
            </div>
        )
    }
}
