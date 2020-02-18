# 보정고 이벤트
보정고 학생을 대상으로하는 이벤트 사이트와 통계 알고리즘입니다.

# web
- 주소 1 - https://bjevent-823e6.firebaseapp.com/
- 주소 2 - https://bjevent.shop

### deploy
```
firebase login 
yarn build
firebase deploy
```

### 참고자료 
- https://chanspark.github.io/2017/12/06/Firebase-%EA%B3%B5%EB%B6%80.html
### 업로드하지 못한파일들
- src/component/secret.json 
    - 파이어베이스에서 web등록할때 받을수 있음 형식은 아래와 같음
    ```js
    export const firebaseConfig = {
        apiKey: "",
        authDomain: "",
        databaseURL: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: "",
        measurementId: ""
    };
    ```

# graph

### Usage
main.py를 실행하거나 gender.py, season.py, tool.py중 하나를 실행해서 그래프를 그릴수 있다. 데이터를 firebase에서 받아오기때문에 serviceAccount.json(gitignore되있음)이 필요하다.

### 파일 설명
- main.py (후라이드 양념 선택비율)
- gender.py (남녀 양념 후라이드 비율)
- season.py (좋아하는 계절 통계)
- tool.py (치킨먹을때 사용하는 도구)
- firebase.py (firestore에서 데이터 받아오는 파일)

### 파이썬 세팅
- https://danbi-ncsoft.github.io/etc/2019/11/07/viva-vsc.html