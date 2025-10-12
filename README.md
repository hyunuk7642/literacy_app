# AI 리터러시 챌린지: 『진짜? 가짜?』

> 생성형 AI에 대한 학생들의 비판적 사고 및 기초 소양(Literacy) 함양을 위한 인터랙티브 웹앱

[![Version](https://img.shields.io/badge/version-2.0-blue.svg)](https://github.com/hyunuk7642/ai-literacy-challenge)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## 🎯 프로젝트 개요

AI 리터러시 챌린지는 학생들이 AI 생성 콘텐츠와 실제 콘텐츠를 구별하는 경험을 통해 AI 기술에 대한 균형 잡힌 시각을 갖도록 돕는 교육용 웹앱입니다.

### 🌟 주요 특징

- **🎨 Windows XP 스타일 디자인**: 컬러풀한 그라데이션과 현대적인 UI
- **📱 완전 반응형**: 모바일, 태블릿, 데스크톱 모든 기기 지원
- **🎮 인터랙티브 챌린지**: 이미지와 텍스트 두 가지 챌린지 유형
- **📊 실시간 피드백**: 즉시 정답/오답 확인 및 상세 해설
- **🎓 교육적 가치**: 단계별 학습과 성찰 질문을 통한 깊이 있는 학습

## 🚀 주요 기능

### 1. 이미지 챌린지
- **Level 1 (튜토리얼)**: 명백한 AI 오류 (6개 손가락, 부자연스러운 배경)
- **Level 2 (훈련)**: 미묘한 오류 (빛과 그림자 불일치, 어색한 질감)
- **Level 3 (실전)**: 기술적으로 정교하지만 현실성 떨어지는 상황

### 2. 텍스트 챌린지 (진실 vs 거짓)
- **Level 1 (튜토리얼)**: 명백한 논리적 모순
- **Level 2 (훈련)**: 그럴듯하지만 논리적 비약 포함
- **Level 3 (실전)**: 맥락적 추론 능력 요구

### 3. 성찰 질문
- 챌린지별 맞춤 3지 선다 객관식 질문
- 정답을 맞출 때까지 정답 숨김 기능
- 학습 내용 정리 및 내재화

### 4. 결과 화면
- 정답 개수 표시 (원형 점수 표시기)
- 점수별 맞춤 메시지 (훌륭/좋음/보통/부족)
- 격려 및 학습 유도 메시지

## 🎨 디자인 특징

### Windows XP 스타일
- **색상 팔레트**: 파란색 계열 그라데이션 기반
- **배경**: 파란색 그라데이션 (`#4a90e2` → `#7bb3f0` → `#a8d0f0`)
- **버튼 디자인**: 
  - AI/거짓 버튼: 노란색/연분홍 그라데이션 (경고/주의)
  - 실제/진실 버튼: 파란색/하늘색 그라데이션 (신뢰/안정)
  - 힌트 버튼: 주황색 그라데이션 (도움말)
- **그림자 효과**: `box-shadow`로 입체감 연출
- **애니메이션**: 호버 시 살짝 위로 올라가는 효과

### 시각적 피드백
- **정답**: 초록색 그라데이션 + 펄스 애니메이션
- **오답**: 빨간색 그라데이션 + 흔들림 애니메이션
- **하이라이트**: 세련된 경고 박스 디자인

## 📁 프로젝트 구조

```
ai-literacy-challenge/
├── index.html              # 메인 HTML 파일
├── styles/
│   └── main.css           # Windows XP 스타일 CSS
├── js/
│   ├── main.js            # 애플리케이션 로직 (409줄)
│   └── data.js            # 챌린지 데이터 (315줄)
├── image_sources/         # 이미지 자산 디렉토리
│   ├── ai_images/         # AI 생성 이미지 (5개)
│   │   ├── level1_1.jpg   # Level 1 AI 이미지
│   │   ├── level1_2.jpg   # Level 1 AI 이미지
│   │   ├── level2_1.jpg   # Level 2 AI 이미지
│   │   ├── level2_2.jpg   # Level 2 AI 이미지
│   │   └── level3_1.jpg   # Level 3 AI 이미지
│   ├── real_images/       # 실제 사진 (3개)
│   │   ├── level1_1.jpg   # Level 1 실제 사진
│   │   ├── level2_1.jpg   # Level 2 실제 사진
│   │   └── level3_1.jpg   # Level 3 실제 사진
│   └── ui/               # UI 관련 이미지
├── package.json          # 프로젝트 설정
├── prd.md               # 제품 요구사항 정의서
├── PROJECT_SUMMARY.md   # 프로젝트 완료 보고서
└── README.md           # 이 파일
```

## 🛠️ 기술 스택

- **HTML5**: 시맨틱 마크업, 접근성 고려
- **CSS3**: 
  - Windows XP 스타일 그라데이션
  - CSS Grid/Flexbox 반응형 레이아웃
  - CSS 키프레임 애니메이션
  - 미디어 쿼리 다중 화면 대응
- **JavaScript (ES6+)**:
  - 모듈화된 구조
  - 상태 관리 및 화면 전환
  - 정답 추적 시스템
  - 에러 처리 및 예외 상황 대응

## 🚀 시작하기

### 로컬 실행

1. **저장소 클론**
   ```bash
   git clone https://github.com/hyunuk7642/ai-literacy-challenge.git
   cd ai-literacy-challenge
   ```

2. **로컬 서버 실행**
   ```bash
   # Python 3 사용
   python3 -m http.server 8000
   
   # 또는 Python 2 사용
   python -m http.server 8000
   ```

3. **브라우저에서 접속**
   ```
   http://localhost:8000
   ```

### GitHub Pages 배포

1. GitHub 저장소에 코드 업로드
2. Settings > Pages에서 Source를 "Deploy from a branch"로 설정
3. Branch를 "main"으로 선택
4. 저장 후 자동으로 배포됩니다

**배포 URL**: `https://hyunuk7642.github.io/ai-literacy-challenge/`

## 📱 반응형 디자인

- **모바일**: 360px 이상 지원
- **태블릿**: 768px 이상 지원  
- **데스크톱**: 1920px까지 지원
- **유연한 레이아웃**: Grid와 Flexbox 활용

## 🎓 교육적 가치

### 학습 목표
- **AI 리터러시**: AI 생성물의 특징과 한계 이해
- **비판적 사고**: 디지털 콘텐츠 비판적 수용 능력
- **자기주도 학습**: 직접 참여하고 경험하는 학습 방식
- **문제 해결**: 단계별 사고 과정 훈련

### 사용자 경험
- **직관적 인터페이스**: Windows XP 스타일로 친숙함
- **즉시 피드백**: 학습 효과 극대화
- **점진적 난이도**: Level 1→2→3 단계별 학습
- **성취감 제공**: 정답 개수 표시로 동기 부여
- **성찰 기회**: 학습 내용 정리 및 내재화

## 🔧 커스터마이징

### 이미지 추가
1. `image_sources/` 디렉토리에 적절한 폴더에 이미지 추가
2. `js/data.js` 파일에서 이미지 경로 업데이트

### 텍스트 수정
1. `js/data.js` 파일에서 챌린지 텍스트 및 질문 수정
2. 성찰 질문과 답안도 동일한 파일에서 관리

### 스타일 변경
1. `styles/main.css` 파일에서 색상, 폰트, 레이아웃 수정
2. Windows XP 스타일 유지하면서 색상 팔레트 조정 가능

## 📊 데이터 구조

### 챌린지 데이터
- **이미지 챌린지**: 3레벨 × 각 2-3문제 (AI vs 실제)
- **텍스트 챌린지**: 3레벨 × 각 2-3문제 (진실 vs 거짓)
- **성찰 질문**: 챌린지별 3개 질문
- **힌트 시스템**: 레벨별 맞춤 힌트

### 피드백 시스템
- **즉시 피드백**: 선택 후 즉시 정답/오답 표시
- **상세 해설**: 오류 부분 하이라이트 및 설명
- **학습 효과**: 정답을 맞출 때까지 정답 숨김
- **결과 화면**: 정답 개수와 점수별 맞춤 메시지

## 🏆 프로젝트 성과

### 기술적 성과
- ✅ **완전한 웹앱**: 모든 요구사항 100% 구현
- ✅ **반응형 디자인**: 모든 디바이스에서 완벽 동작
- ✅ **Windows XP 스타일**: 컬러풀하고 현대적인 디자인 구현
- ✅ **실제 이미지 통합**: AI/실제 이미지 파일 완전 통합
- ✅ **정답 추적 시스템**: 실시간 점수 계산 및 표시

### 교육적 성과
- ✅ **AI 리터러시 교육**: 실용적인 학습 도구 제공
- ✅ **비판적 사고 훈련**: 단계별 사고 과정 연습
- ✅ **자기주도 학습**: 참여형 학습 환경 조성
- ✅ **디지털 시민의식**: AI 시대 필수 역량 함양

## 🔮 향후 개선 방향

### 기능 확장
- [ ] 사용자 로그인 및 학습 이력 저장
- [ ] 진행률 추적 및 개인별 학습 진도 관리
- [ ] 새로운 챌린지 유형 (동영상, 음성 등)
- [ ] AI 윤리 모듈 및 딜레마 시뮬레이션

### 기술적 개선
- [ ] 성능 최적화 (이미지 압축 및 지연 로딩)
- [ ] 접근성 향상 (스크린 리더 지원)
- [ ] 다국어 지원 (영어, 일본어 등)
- [ ] PWA 변환 (오프라인 사용 가능)

## 📝 개발 과정

### v1.0 - 기본 구조
- HTML 기본 구조 및 CSS 스타일링
- JavaScript 기본 로직 구현
- 챌린지 데이터 구조 설계

### v1.5 - 기능 완성
- 화면 전환 로직 구현
- 피드백 시스템 개발
- 성찰 질문 로직 수정

### v2.0 - 디자인 혁신 (2025.01.12)
- **Windows XP 스타일 디자인**: 컬러풀한 그라데이션과 현대적 UI
- **정답 개수 표시 기능**: 챌린지 완료 시 결과 화면 추가
- **텍스트 챌린지 개선**: "AI vs 실제" → "진실 vs 거짓" 형태로 변경
- **성찰 질문 업데이트**: 진실성 판단에 맞는 질문으로 수정
- **사용자 경험 향상**: 더 직관적이고 교육적인 인터페이스

## 📞 지원 및 기여

### 버그 리포트
버그를 발견하셨나요? [Issues](https://github.com/hyunuk7642/ai-literacy-challenge/issues)에서 리포트해주세요.

### 기능 제안
새로운 기능 아이디어가 있으신가요? [Discussions](https://github.com/hyunuk7642/ai-literacy-challenge/discussions)에서 제안해주세요.

### 기여하기
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 👥 개발팀

- **개발자**: AI Assistant (Claude) + 사용자 협업
- **디자인**: Windows XP 스타일 컬러풀 디자인
- **교육 컨설팅**: AI 리터러시 교육 전문가

## 🙏 감사의 말

이 프로젝트는 AI 리터러시 교육을 위해 제작되었습니다. 교육 현장에서 즉시 활용하여 학생들의 디지털 시민의식을 함양하는 데 기여할 수 있습니다.

---

**프로젝트 저장소**: [GitHub](https://github.com/hyunuk7642/ai-literacy-challenge)  
**라이선스**: MIT  
**지원**: 교육 목적으로 자유롭게 사용 및 수정 가능

*이 프로젝트는 AI 리터러시 교육을 위한 완성된 오픈소스 웹앱입니다. 교육 현장에서 즉시 활용하여 학생들의 디지털 시민의식을 함양하는 데 기여할 수 있습니다.*
