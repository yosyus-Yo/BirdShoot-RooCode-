# React + Canvas 새 쏘기 아케이드 게임

본 프로젝트는 React와 HTML5 Canvas를 기반으로 한 **새 쏘기 아케이드 게임**의 핵심 엔진 로직을 구현한 예제입니다.

> **⚠️ 주의:**  
> 본 프로젝트에는 게임의 핵심 엔진 로직만 포함되어 있으며, UI/UX 요소 및 리소스(이미지, 사운드 등)는 포함되어 있지 않습니다.

---

## 주요 기능

- React와 Canvas를 활용한 게임 엔진 구조
- 새 타겟 생성, 발사체(총알) 이동 및 충돌 판정
- 게임 상태 관리(점수, 남은 기회 등)
- 컴포넌트 기반 구조로 확장성 용이

---

## 설치 및 실행 방법

1. **의존성 설치**
   ```bash
   npm install
   ```

2. **개발 서버 실행**
   ```bash
   npm start
   ```

3. 브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

---

## 폴더 구조

```
프로젝트 루트/
├── package.json
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── index.js
│   ├── assets/         # (리소스 폴더, 현재 비어있음)
│   ├── components/
│   │   ├── GameCanvas.js
│   │   └── UIOverlay.js
│   ├── core/           # (게임 엔진 핵심 로직)
│   └── utils/          # (유틸리티 함수)
└── README.md
```

---

## 기여 방법

1. 이슈 및 PR은 언제든 환영합니다.
2. 새로운 기능 추가 시, `src/core` 또는 `src/components` 내에 관련 코드를 작성해주세요.
3. 커밋 메시지는 명확하게 작성해주세요.

---

## 라이선스

MIT License  
자유롭게 사용 및 수정이 가능합니다.