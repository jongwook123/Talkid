# README

[https://github.com/SW-Project-Yoo-Hoo/YooHoo](https://github.com/SW-Project-Yoo-Hoo/YooHoo)

![Untitled](README%202fd77e7e946543cc905a42af42fbacef/Untitled.png)

## 📰 프로젝트 소개

---

**TALKIDS: 언어교류를 위한 온라인 플랫폼**

TALKIDS는 언어 교류를 촉진하고 기존의 제약조건을 극복하는 웹 플랫폼입니다. 이 플랫폼은 언어 교환에 참여하는 사람들에게 진입 장벽을 낮추고, 시간과 공간의 제약 없이 더 많은 기회를 제공합니다. 선생님과 학생들은 간편하게 언어 교류 파트너를 찾을 수 있으며, 다양한 학급 간의 매칭도 가능합니다.

개발 기간 : `23.07.17 ~ 23.08.18`

## 💡 주요 기능

---

### 화상 전화

- 사용자 간의 화상 전화 (1 : 1 & 1 : N)
    - WebRTC API 중 하나인 RTCPeerConnection 기반의 p2p 방식으로 구현
    

### Speech to Text & 번역

- 사용자의 음성을 실시간으로 텍스트로 변환
    - Web Speech API 기반의 react-speech-recognition 라이브러리 활용
- 텍스트로 변환된 음성과 채팅에 대한 번역 수행
    - 사용자 음성이 특정 주기 동안 입력되지 않을 경우 이전까지의 음성을 하나의 문장으로 판단하여 번역, 실시간성 및 속도 개선
    - 채팅 측면의 번역 버튼 클릭 시 해당 채팅의 번역 결과를 하단에 출력
        - 번역한 채팅은 북마크에 추가하여 추후 찾아볼 수 있도록 구현
    

### DM

- 사용자 간의 채팅 기능
    - WebSocket을 이용하여 실시간성 보장
    - 채팅방에 접속 중이지 않을 때에도 해당 채팅방에 온 메시지를 확인 할 수 있도록 구현

### 매칭

- 일정 등록을 통한 매칭 관리
- 매칭 요청과 수락 및 거절을 통해 매칭 처리

### 메인 페이지

- React-three-fiber를 이용하여 사용자의 경험치를 시각화, 흥미로운 3D 요소 적용.

## 💻 실행 화면

---

|  |  |
| --- | --- |
|  |  |
|  |  |

## ⚙️ 기술 스택

---

### Frontend

React.js, React-three-fiber, Redux

### **Backend**

Java, Spring Boot, Spring Security, JPA, MySQL, Express, WebSocket

### **Infra**

AWS EC2, Docker, NGINX

### **Cooperation**

GitLab, Jira, Notion, Discord

## 📊 ERD

---

![ERDCloud.png](README%202fd77e7e946543cc905a42af42fbacef/ERDCloud.png)

## 📄 아키텍처 설계도

---

![시스템 구조도.png](README%202fd77e7e946543cc905a42af42fbacef/%25EC%258B%259C%25EC%258A%25A4%25ED%2585%259C_%25EA%25B5%25AC%25EC%25A1%25B0%25EB%258F%2584.png)

## ✨ 팀원 소개

---

| Front-End |  |  | Back-End |  |
| --- | --- | --- | --- | --- |
| 김선영 | 박종욱 | 서동현 | 유영서 | 이우철 |