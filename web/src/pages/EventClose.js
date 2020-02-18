import React, { Component } from 'react'


export default class EventClose extends Component {
    render() {
        return (
            <div style={{ width: '100vw', height: '100vh', backgroundColor: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <text style={{ fontSize: 24, color: 'white' }}>이벤트 종료</text>
                <text style={{ fontSize: 14, color: 'white', marginTop: 10 }}>당첨자에게는 목요일까지 상품이 배송되고</text>
                <text style={{ fontSize: 14, color: 'white', marginTop: 4 }}>추첨 영상은 아래 인스타에서 확인가능합니다</text>
                <text style={{ fontSize: 14, color: 'white', marginTop: 20 }}>인스타그램아이디: bojeong_event</text>
                <text style={{ color: '#666', fontSize: 12, position: 'absolute', bottom: 10, right: 10 }}>빅데이터 관심있는 학생 or 문의 coderhyun476@gmail.com</text>
            </div>
        )
    }
}
