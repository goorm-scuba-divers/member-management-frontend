# Member Management Frontend

[![wakatime](https://wakatime.com/badge/user/9557d0e3-9630-495a-8bce-f6b5326a8f54/project/756e3575-9cc3-422a-8ec5-b386e439f5ae.svg)](https://wakatime.com/badge/user/9557d0e3-9630-495a-8bce-f6b5326a8f54/project/756e3575-9cc3-422a-8ec5-b386e439f5ae)

회원 관리 시스템의 프론트엔드 프로젝트입니다.

## 요구 환경

- Node.js >= 16.x
- Corepack

## 의존성 설치 및 실행

```bash
yarn install --immutable && yarn dev --port=4000
```

## 주요 기능

- 회원 목록 조회 및 필터링
- 프로필 정보 조회
- 프로필 정보 수정
- 회원 탈퇴

## 개발 가이드라인

### 코드 스타일

- Biome을 사용한 코드 포맷팅 및 린팅
- TypeScript strict 모드 사용
- 컴포넌트는 함수형 컴포넌트 사용

### 상태 관리

- 전역 상태는 Zustand 사용
- 폼 상태는 React Hook Form 사용
- API 요청은 React Query 사용

## 기술 스택

- React
- TypeScript
- Vite
- Biome
- Tailwind CSS
- Shadcn/UI
- React Hook Form
- Zod
- Zustand
