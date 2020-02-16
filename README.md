# 보정고 이벤트
보정고 학생을 대상으로하는 이벤트 사이트 입니다.
주소 1 - https://bjevent-823e6.firebaseapp.com/
주소 2 - https://bjevent.shop

# deploy
```
firebase login 
yarn build
firebase deploy
```

# 참고자료 
- https://chanspark.github.io/2017/12/06/Firebase-%EA%B3%B5%EB%B6%80.html
# 업로드하지 못한파일들
- src/component/secret.json 
    - 파이어베이스에서 web등록할때 받을수 있음
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