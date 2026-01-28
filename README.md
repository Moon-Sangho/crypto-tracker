# CryptoTracker 🚀

테스트 코드 학습을 목적으로 만든 **암호화폐 조회 애플리케이션**입니다. Claude를 활용한 100% 바이브 코딩(Vibe Coding)으로 진행되었습니다.

## 프로젝트 소개

CryptoTracker는 [CoinGecko API](https://www.coingecko.com)를 활용하여 실시간 암호화폐 정보를 제공하는 웹 애플리케이션입니다.

### 주요 기능

- 📊 **상위 50개 암호화폐 목록** - 시장 정보, 가격, 변화율 조회
- 🔍 **검색 기능** - 암호화폐 실시간 검색
- 📈 **상세 정보** - 개별 암호화폐의 가격 차트 및 상세 정보
- ⭐ **즐겨찾기** - 관심 암호화폐 저장 (로컬 스토리지)
- 📱 **반응형 디자인** - 데스크톱/모바일 모두 지원

## 기술 스택

### 핵심 라이브러리

- **React 19** - UI 라이브러리
- **TypeScript** - 정적 타입 체크
- **Vite** - 빌드 도구 (Rolldown 기반)
- **TanStack Query v5** - 서버 상태 관리
- **React Router** - 클라이언트 라우팅
- **Tailwind CSS v4** - 스타일링
- **Axios** - HTTP 클라이언트

### 개발 & 테스트

- **Vitest** - 단위 테스트 (Jest 호환)
- **React Testing Library** - 컴포넌트 테스트
- **MSW (Mock Service Worker)** - API 모킹
- **React Compiler** - 자동 성능 최적화

## 설치 및 실행

### 필수 요구사항

- Node.js 18+
- pnpm (패키지 매니저)

### 설치

```bash
pnpm install
```

### 개발 서버 실행

```bash
pnpm dev
```

브라우저에서 `http://localhost:5173` 접속

### 프로덕션 빌드

```bash
pnpm build
```

### 프리뷰

```bash
pnpm preview
```

## 테스트

### 전체 테스트 실행

```bash
pnpm test:run
```

### 감시 모드 (watch)

```bash
pnpm test
```

### 특정 파일 테스트

```bash
pnpm test:run src/utils/format.test.ts
```

### 패턴으로 테스트 실행

```bash
pnpm test -t "formatPrice"
```

### UI 대시보드

```bash
pnpm test:ui
```

### 커버리지 리포트

```bash
pnpm test:coverage
```

## 프로젝트 구조

```
src/
├── main.tsx                 - 앱 진입점
├── router.tsx               - React Router 설정
├── api/                     - API 클라이언트
│   ├── axios-instance.ts    - Axios 설정
│   └── coingecko/           - CoinGecko API
├── pages/                   - 라우트 컴포넌트
│   ├── home.tsx
│   ├── crypto-list.tsx
│   ├── crypto-detail.tsx
│   └── favorites.tsx
├── components/              - 재사용 가능한 UI 컴포넌트
│   ├── layout.tsx
│   ├── coin-card.tsx
│   ├── search-bar.tsx
│   ├── price-chart.tsx
│   └── async-boundary/      - Suspense + Error Boundary
├── hooks/                   - 커스텀 훅
│   ├── use-favorites.ts     - 즐겨찾기 상태 관리
│   ├── queries/             - React Query 훅
│   │   ├── query-keys.ts
│   │   ├── use-coins-list.ts
│   │   ├── use-coin-search.ts
│   │   ├── use-coin-detail.ts
│   │   └── use-coin-chart.ts
├── types/                   - TypeScript 타입 정의
├── utils/                   - 유틸리티 함수
│   └── format.ts            - 가격/숫자 포매팅
└── test/                    - 테스트 코드
    ├── setup.ts
    ├── mocks/               - MSW 모의 핸들러
    ├── utils/
    ├── components/
    ├── hooks/
    └── pages/
```

## 주요 패턴 및 학습 포인트

### 1. React Query 패턴

- **Query Key Factory Pattern** - 쿼리 키 중앙 관리
- **Suspense Query** - 데이터 페칭과 Suspense 통합
- **쿼리 인스턴스 리턴** - 추가 정보 접근 용이

### 2. Suspense & Error Boundary

- **AsyncBoundary** - Suspense와 Error Boundary 결합
- 로딩/에러 상태를 선언적으로 관리

### 3. Repository 패턴

- API 클라이언트와 유틸 함수를 싱글톤 객체로 구성
- 코드 구조화 및 테스트 용이성 향상

### 4. 타입 안정성

- 엄격한 TypeScript 설정 (`strict: true`)
- 모든 타입 정의는 `type` 사용 (interface 대신)

## 주요 명령어

```bash
pnpm dev           # 개발 서버 실행
pnpm build         # 프로덕션 빌드
pnpm preview       # 빌드 결과 미리보기
pnpm test          # 테스트 감시 모드
pnpm test:run      # 테스트 한 번 실행
pnpm test:ui       # 테스트 UI 대시보드
pnpm test:coverage # 커버리지 리포트
pnpm lint          # ESLint 실행
```

## 학습 목표

이 프로젝트는 다음을 학습하기 위해 만들어졌습니다:

- ✅ React Testing Library를 사용한 컴포넌트 테스트
- ✅ Vitest 및 단위 테스트 작성
- ✅ MSW를 이용한 API 모킹
- ✅ React Query 활용
- ✅ TypeScript 타입 시스템
- ✅ 반응형 디자인 (Tailwind CSS)
- ✅ 상태 관리 패턴

## 라이센스

MIT
