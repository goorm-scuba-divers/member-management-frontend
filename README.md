# 회원 관리 프론트엔드

회원 정보를 관리하는 웹 인터페이스입니다. 백엔드 API와 연동하여 회원 데이터를 조회하고 관리합니다.

## 요구사항

- Node.js >= 16.x

## 시작하기

### 1. 초기 환경 설정

프로젝트의 `setup.sh` 스크립트를 실행하여 `corepack` 환경과 관련 alias 를 자동으로 설정합니다.

```bash
source ./setup.sh
```

### 2. 의존성 설치

프로젝트는 Yarn PnP 모드로 구성되어 있어 대부분의 의존성이 .yarn/cache 에 캐시됩니다. 그러나 `unplugged` 의존성을 설치하기 위해 `yarn install`을 실행해야 합니다.

```bash
y # or corepack yarn
```

### 3. 개발 서버 실행

```bash
y dev # or corepack yarn dev
```

## 기술 스택

- React
- TypeScript
- Yarn Berry (PnP)
