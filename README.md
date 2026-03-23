# SOOP LoL Match Team (Demo)

포트폴리오용으로 제작한 **LoL 팀 매칭 데모 웹 애플리케이션**입니다.  
SOOP API 데이터를 기반으로 플레이어를 탐색하고, 드래그 앤 드롭으로 팀을 빠르게 구성할 수 있습니다.

## 기술 스택

### Frontend
- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS v4
- dnd-kit (`@dnd-kit/core`) - 드래그 앤 드롭
- overlay-kit - 모달/오버레이

### 상태/데이터
- Zustand (+ persist) - 팀 편성/즐겨찾기 상태 저장
- TanStack Query - 클라이언트 데이터 레이어 기본 구성
- Zod - API 응답 스키마 검증

### 품질/개발도구
- ESLint + Prettier
- React Compiler (`next.config.ts`의 `reactCompiler: true`)

## 프로젝트 구조

```text
app/
  page.tsx                 # 라우트 엔트리, TeamMatchPage 연결
  api/
	players/route.ts       # SOOP 선수 데이터 프록시 + 파일 캐시
	teams/route.ts         # SOOP 팀 데이터 프록시 + 파일 캐시

src/
  page/teamMatch/          # 화면 조합, 유스케이스, Team Match UI
  features/player/         # 팀/즐겨찾기 상태, 검색/포지션 필터 훅
  entities/player/         # Player 도메인, 스키마, 매퍼, 리포지토리, 카드 UI
  shared/                  # 공통 API 래퍼, 에러, uiKit, 유틸

data/
  soop_cache.json
  soop__team_list_cache.json
  # API route에서 사용하는 로컬 캐시 파일
```

## 주요 기능

1. **플레이어 목록 조회**
   - 서버 컴포넌트에서 데이터를 먼저 로드하고 클라이언트 UI에 전달
   - `TeamMatchService -> PlayerRepository -> PlayerApi` 흐름으로 계층 분리

2. **드래그 앤 드롭 팀 편성**
   - 플레이어 카드를 드래그해 팀 슬롯(탑/정글/미드/원딜/서폿)에 배치
   - 팀별 총점을 실시간 계산하여 표시

3. **선수 검색/포지션 필터**
   - 닉네임 및 게임 닉네임 기반 검색
   - 포지션별 필터링으로 빠른 후보 탐색

4. **즐겨찾기 관리**
   - 관심 선수 등록/해제
   - 브라우저 로컬 스토리지에 상태를 유지해 새로고침 후에도 복원

5. **내부 API 캐싱**
   - `/api/players`, `/api/teams`에서 외부 API 응답을 파일 캐시로 저장
   - 개발 시 외부 요청 부담을 줄이고 데이터 재사용

## 데이터 흐름 요약

1. `app/page.tsx` -> `TeamMatchPage` 렌더
2. `TeamMatchService`가 `PlayerRepositoryImpl` 호출
3. `PlayerApiImpl`이 `/api/players` + `/api/teams` 요청
4. API route가 캐시 파일(`data/*.json`) 우선 조회, 없으면 SOOP API 호출
5. Zod 스키마 검증 및 도메인 매핑 후 UI 렌더

## 실행 방법

```bash
pnpm install
pnpm dev
```

브라우저에서 `http://localhost:3000` 접속 후 팀 매칭 UI를 확인할 수 있습니다.

## 스크립트

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
pnpm eslint:fix
pnpm prettier:fix
```

## 프로젝트 의도

- FSD 스타일 계층 분리(`page / features / entities / shared`)를 실제 화면에 적용
- 클라이언트 상호작용(DnD, 모달, 상태 영속화)과 서버 데이터 흐름을 함께 보여주는 데모 구성
