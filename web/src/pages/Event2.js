import React, { Component } from 'react'
import { FiChevronLeft, FiInstagram } from "react-icons/fi";
import { db } from '../shared/Firebase';
import uuid from 'react-uuid'
import Button from 'react-bootstrap/Button'

/*
*/
const instaUrl = 'https://instagram.com/bojeong_event?igshid=1xsvohclvy04f';
const itemUrl = ['http://item.ssgcdn.com/25/33/24/item/1000037243325_i1_1200.jpg', 'http://images.descentekorea.co.kr/product/S/94/S9413HHDO1/550/S9413HHDO1_BLK0_N01.JPG'];
const itemName = ['나이키 후드티', '데상트 후드티'];
const moreUrl = ['http://121.78.116.175/nike/wear/bv2655010-0.jpg', 'http://images.descentekorea.co.kr/product/S/94/S9413HHDO1/550/S9413HHDO1_BLK0_N03.JPG'];

const answer = [
    {
        title: '성별',
        option: ['남', '여']
    },
    {
        title: '사이즈',
        option: ['90', '95', '100', '105', '110']
    },
    {
        title: '등교',
        option: ['버스', '지하철', '도보', '기타']
    },
    {
        title: '안경이나 렌즈를 쓰시나요?',
        option: ['안경', '렌즈', '둘다안씀']
    }
]

export default class Event extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            schoolNumber: '',
            item: null,
            answer: null,
            more: [false, false],
            isUploading: false,
            uuid: null,
        }
    }

    componentDidMount() {
        if (localStorage.getItem('eventLocalId') === null) {
            const id = uuid()
            localStorage.setItem('eventLocalId', id);
            this.setState({ uuid: id })
        } else {
            this.setState({ uuid: localStorage.getItem('eventLocalId') });
        }
        if (localStorage.getItem('Applyed') === 'true') {
            // this.setState({ page: 3 });
        }
    }
    _pageChagne = (page) => {
        if (page === 1) this.setState({ isUploading: false });
        this.setState({ page });
    }

    _onSubmit = (answer) => {
        if (this.state.isUploading) return;
        this.setState({ isUploading: true });

        db.collection("event2").add({
            item: this.state.item,
            number: this.state.schoolNumber,
            answer,
            uuid: this.state.uuid,
            moreClick: this.state.more,
            date: new Date()
        })
            .then((res) => {
                this._pageChagne(3)
                // localStorage.setItem('Applyed', 'true');   
            })
            .catch((error) => {
                alert('오류\n다시시도해주세요');
                window.location.reload();
            });

    }
    _moreUpdate = (index) => {
        let more = this.state.more;
        more[index] = true;
        this.setState({ more });
    }
    render() {
        return (
            this.state.page === 0
                ?
                <NumberCheck schoolNumber={this.state.schoolNumber} setNumber={(schoolNumber) => this.setState({ schoolNumber })} pageChagne={this._pageChagne} />
                :
                this.state.page === 1
                    ?
                    <Choice moreClick={this._moreUpdate} setItem={(item) => this.setState({ item })} item={this.state.item} pageChagne={this._pageChagne} />
                    :
                    this.state.page === 2
                        ?
                        <Apply item={this.state.item} onSubmit={this._onSubmit} pageChagne={this._pageChagne} />
                        :
                        <Thankyou />
        )
    }
}


class NumberCheck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.schoolNumber
        }
    }
    _nextBtn = () => {
        if (this.state.value.length === 5) {
            this.props.setNumber(this.state.value);
            this.props.pageChagne(1);
        } else {
            alert('5개의 숫자로 입력해주세요');
            this.setState({ value: '' });
        }
    }
    render() {
        return (
            <div style={{ width: '100vw', height: '140vh', backgroundColor: '#222' }}>
                <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        <text style={{ fontSize: 40, color: 'white', marginBottom: 30 }}>이벤트</text>
                        <text style={{ color: 'white', fontSize: 14, marginBottom: 10 }}>보정고 재학생이시라면 학번을 입력해주세요</text>
                        <text style={{ fontSize: 12, color: 'white', marginBottom: 20 }}>당첨시 입력하신 학번으로 상품이 배송됩니다</text>
                        <input maxLength={5} type="number" pattern="[0-9]*" style={{}} placeholder='예) 10101' value={this.state.value} onChange={(e) => this.setState({ value: e.target.value })} />
                        <div onClick={this._nextBtn} style={{ width: 100, height: 50, backgroundColor: 'white', borderRadius: 25, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 30, cursor: 'pointer' }}>
                            <text style={{ fontWeight: 'bold', fontSize: 20 }}>다음</text>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



class Choice extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item,
            more: false,
            moreIndex: 0,
        }
    }

    _nextBtn = () => {
        if (this.state.item !== null) {
            this.props.pageChagne(2);
            this.props.setItem(this.state.item);
        } else {
            alert('상품을 골라주세요');
        }

    }

    _moreBtn = (index) => {
        this.props.moreClick(index);
        this.setState({ more: true, moreIndex: index });
    }

    _pickBtn = (item) => {
        this.setState({ item });
    }
    _backBtn = () => {
        if (this.state.item === null) {
            this.props.pageChagne(0);
        } else {
            this.setState({ item: null });
        }

    }

    render() {
        return (
            !this.state.more
                ?
                <div style={{ width: '100vw', height: '100vh', backgroundColor: '#222', opacity: 1, }}>
                    <div onClick={this._backBtn} style={{ position: 'fixed', left: 10, top: 16, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                        <FiChevronLeft size='22px' color='white' />
                        <text style={{ fontSize: 16, color: 'white' }}>{this.state.item === null ? '뒤로' : '뒤로'}</text>
                    </div>
                    <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                            {this.state.item === null
                                ?
                                <div style={{ display: 'flex', flexDirection: 'column', width: '80vw' }}>
                                    <text style={{ fontSize: 16, color: 'white', marginBottom: 5, textAlign: 'left' }}>둘중 고른 상품으로 지급되고</text>
                                    <text style={{ fontSize: 16, color: 'white', marginBottom: 30, textAlign: 'left' }}>확률은 같습니다</text>
                                </div>
                                :
                                <div style={{ display: 'flex', width: '80vw', marginBottom: 14 }}>
                                    <text style={{ fontSize: 16, color: 'white', marginBottom: 5, textAlign: 'left' }}>{itemName[this.state.item]}</text>
                                </div>
                            }

                            {this.state.item === null
                                ?
                                <div style={{ width: '100vw' }}>
                                    <div style={{ width: '100vw', display: 'flex' }}>
                                        <div style={{ width: '50%' }}>
                                            <img alt='상품1' onClick={() => this._pickBtn(0)} style={{ width: '100%', backgroundColor: 'white' }} src={itemUrl[0]} />
                                        </div>
                                        <div style={{ width: '50%' }}>
                                            <img alt='상품2' onClick={() => this._pickBtn(1)} style={{ width: '100%', backgroundColor: 'white' }} src={itemUrl[1]} />
                                        </div>

                                    </div>
                                    <div style={{ width: '100vw', display: 'flex', height: 60 }}>
                                        <div onClick={() => this._moreBtn(0)} style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                            <text style={{ color: 'white', fontSize: 11 }}>{itemName[0]}</text>
                                            <text style={{ color: 'white', fontSize: 11, marginTop: 5 }}>상세정보 →</text>
                                        </div>
                                        <div onClick={() => this._moreBtn(1)} style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                            <text style={{ color: 'white', fontSize: 11 }}>{itemName[1]}</text>
                                            <text style={{ color: 'white', fontSize: 11, marginTop: 5 }}>상세정보 →</text>
                                        </div>
                                    </div>
                                    <div style={{ width: '100vw', display: 'flex', }}>
                                        <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                            <div onClick={() => this._pickBtn(0)} style={{ width: 60, height: 30, backgroundColor: 'white', borderRadius: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                                <text style={{ fontWeight: 'bold', fontSize: 14 }}>선택</text>
                                            </div>
                                        </div>
                                        <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                            <div onClick={() => this._pickBtn(1)} style={{ width: 60, height: 30, backgroundColor: 'white', borderRadius: 15, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                                <text style={{ fontWeight: 'bold', fontSize: 14 }}>선택</text>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div style={{ width: '100vw', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                    <img alt='상품크게보기' src={itemUrl[this.state.item]} style={{ width: '100%', backgroundColor: '#777' }} />
                                    <text onClick={() => this._moreBtn(this.state.item)} style={{ fontSize: 16, color: 'white', marginTop: 10, textAlign: 'center' }}>상세정보→</text>
                                </div>
                            }

                            {this.state.item !== null && <div onClick={this._nextBtn} style={{ width: 100, height: 50, backgroundColor: 'white', borderRadius: 25, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 50, cursor: 'pointer' }}>
                                <text style={{ fontWeight: 'bold', fontSize: 20 }}>다음</text>
                            </div>}
                        </div>
                    </div>
                </div>
                :
                <div style={{ width: '100vw' }}>
                    <div onClick={() => this.setState({ more: false })} style={{ position: 'fixed', left: 10, top: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', backgroundColor: 'black', width: 70, height: 35, justifyContent: 'center', borderRadius: 20 }}>
                        <FiChevronLeft size='22px' color='white' />
                        <text style={{ fontSize: 16, color: 'white', marginRight: 5 }}>뒤로</text>
                    </div>
                    <img alt='상품정보' src={moreUrl[this.state.moreIndex]} style={{ width: '100%', backgroundColor: 'white' }} />
                    <div onClick={() => this.setState({ more: false })} style={{ backgroundColor: '#222', width: '100vw', height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FiChevronLeft size='50px' color='white' />
                        <text style={{ fontSize: 40, color: 'white' }}>뒤로</text>
                    </div>
                </div>
        )
    }
}

const genderBoxSize = 54;



class Apply extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answer: [],
            dataCollect: false,
        }
    }
    _submitBtn = () => {
        for (let i = 0; i < answer.length; i++) {
            if (this.state.answer[i] === undefined) {
                alert(`질문${i + 1}에 대답해주세요`);
                return;
            }
        }
        if (!this.state.dataCollect) {
            alert(`개인정보 약관에 동의해주세요`);
            return;
        }
        this.props.onSubmit(this.state.answer);

    }
    _backBtn = () => {
        this.props.pageChagne(1);
    }
    render() {
        return (
            <div style={{ width: '100vw', display: 'flex', alignItems: 'center', flexDirection: 'column', backgroundColor: '#222', minHeight: '100vh' }}>
                <div onClick={this._backBtn} style={{ position: 'fixed', left: 10, top: 16, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <FiChevronLeft size='22px' color='white' />
                    <text style={{ fontSize: 16, color: 'white' }}>뒤로</text>
                </div>

                <div style={{ width: '80vw', marginTop: 70 }}>
                    <text style={{ color: 'white', fontSize: 16 }}>{itemName[this.props.item]}</text>
                </div>

                {answer.map((data, index) => {
                    const option = data.isOptions ? data.option[this.props.item] : data.option;

                    return <div key={index} style={{ width: '80vw', marginTop: 20 }}>
                        <text style={{ color: 'white', fontSize: 16 }}>{data.title}</text>
                        <div style={{ marginTop: 10, display: 'flex' }}>
                            {option.map((info, index2) =>
                                <div key={index2} onClick={() => {
                                    const a = this.state.answer;
                                    a[index] = index2;
                                    this.setState({ answer: a })
                                }}
                                    style={{ width: genderBoxSize, height: genderBoxSize, backgroundColor: this.state.answer[index] === index2 ? '#777' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #777' }}>
                                    <text style={{ fontSize: 13, color: 'white' }}>{info}</text>
                                </div>)}

                        </div>
                    </div>
                })
                }


                <div style={{ width: '80vw', marginTop: 20 }}>
                    <text style={{ color: 'white', fontSize: 16 }}>개인정보 수집 및 이용에 대한 동의</text>
                    <img style={{ width: '100%', marginTop: 10, marginBottom: 5 }} src='https://firebasestorage.googleapis.com/v0/b/namgunghyun-com.appspot.com/o/bjEvent%2F%EA%B0%9C%EC%9D%B8%EC%A0%95%EB%B3%B4%20%EC%88%98%EC%A7%91%20%EB%B0%8F%20%ED%99%9C%EC%9A%A9%EB%8F%99%EC%9D%98.PNG?alt=media&token=04fdbc4b-e278-48fd-9f40-51b742f49b16' alt='개인정보 수집 및 이용에 대한 동의' />
                    <div>
                        <Button onClick={() => this.setState({ dataCollect: !this.state.dataCollect })} variant="outline-light" active={this.state.dataCollect} style={{ marginTop: 10 }}>동의합니다</Button>
                    </div>
                </div>

                <div onClick={this._submitBtn} style={{ width: 100, height: 50, backgroundColor: 'white', borderRadius: 25, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 50, cursor: 'pointer', marginBottom: 50 }}>
                    <text style={{ fontWeight: 'bold', fontSize: 20 }}>응모</text>
                </div>
            </div >
        )
    }
}

class Thankyou extends Component {
    render() {
        return (
            <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#222', flexDirection: 'column' }}>
                <text style={{ fontSize: 36, color: 'white' }}>감사합니다</text>
                {/* <text style={{ fontSize: 14, color: 'white', marginTop: 10 }}>당첨시 목요일에 상품이 지급됩니다</text> */}
                <text style={{ fontSize: 12, color: 'white', marginTop: 40 }}>200명 이상이 참여해야 추첨을 시작합니다</text>
                <text style={{ fontSize: 12, color: 'white', marginTop: 10 }}>친구들에게 공유해주세요</text>

                <div style={{ width: '100vw', display: 'flex', alignItems: 'center', flexDirection: 'column' }} onClick={() => {
                    let win = window.open(instaUrl, '_blank');
                    win.focus();
                }}>
                    <div style={{ width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 60 }}>
                        <FiInstagram size='22px' color='white' style={{ marginRight: 10, alignSelf: 'center' }} />
                        <text style={{ fontSize: 12, color: 'white' }}>다음 이벤트 정보 / 당첨자 확인</text>
                    </div>
                    <text style={{ fontSize: 12, color: 'white', marginTop: 10, textAlign: 'center' }}>인스타그램 : 보정고이벤트</text>
                </div>


                <div onClick={() => window.location.reload()} style={{ padding: 20, height: 50, backgroundColor: 'white', borderRadius: 25, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 50, cursor: 'pointer', marginBottom: 50 }}>
                    <text style={{ fontWeight: 'bold', fontSize: 20 }}>첫 화면으로 돌아가기</text>
                </div>
                <text style={{ color: '#777', fontSize: 12, position: 'absolute', right: 10, bottom: 10 }}>빅데이터관심 or 문의 coderhyun476@gmail.com</text>
            </div >
        )
    }
}