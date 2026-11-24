# Watchman — 프로젝트 정보 (포트폴리오용)

> AI 얼굴 감지로 공부 집중도를 실시간 측정하고, 친구들과 함께 공부하는 스터디 모니터링 웹 서비스

---

## 1. 한 줄 소개

**Watchman**은 웹캠 영상에서 브라우저가 직접 얼굴 방향을 분석해 "집중 / 딴짓"을 판정하고, 공부 기록·플래너·스터디 그룹·업적 시스템까지 제공하는 올인원 공부 관리 웹 애플리케이션이다.

## 2. 프로젝트 개요

| 항목 | 내용 |
|------|------|
| 프로젝트명 | Watchman |
| 유형 | 웹 애플리케이션 (팀 프로젝트) |
| 개발 기간 | 2026.05.04 ~ (커밋 기준 약 77개, 2026.11 현재 진행/정리 중) |
| 참여 인원 | 3명 (Git 기여자 기준) |
| 내 담당 | _(직접 기입: 예 — 솔로 세션 얼굴 감지, 업적 시스템 등)_ |
| 저장소 | https://github.com/andy051127/watchman-springboot |
| 실행 주소 | `http://localhost:8080/watchman` |
| 배포 대상 | AWS EC2 + RDS (MySQL) |

### 기획 배경 / 해결하려는 문제
- 혼자 공부할 때 스스로 집중 상태를 객관적으로 알기 어렵다.
- 스터디 카페·온라인 스터디는 서로의 집중 여부를 확인하기 어렵고, 동기 부여 수단이 부족하다.
- → 카메라 기반 집중 측정 + 그룹 실시간 공유 + 게임화(업적)로 해결한다.

### 핵심 가치
1. **프라이버시 중심 설계** — 얼굴 분석은 100% 브라우저(클라이언트)에서 수행. 영상은 서버로 전송·저장되지 않고, 서버에는 집중/딴짓 시간(초)만 저장된다.
2. **실시간 협업** — WebSocket(STOMP) + WebRTC로 스터디룸에서 서로의 영상·집중 상태·채팅 공유.
3. **지속 동기 부여** — 30개 업적, 연속 출석, 랭킹.

---

## 3. 기술 스택

| 영역 | 기술 |
|------|------|
| 언어 | Java 25 (Amazon Corretto), JavaScript(ES2022+), HTML5, CSS3, SQL |
| 백엔드 | Spring Boot 3.5.14, Spring MVC, Spring WebSocket(STOMP), Spring JDBC(`JdbcTemplate`), Spring Security Crypto(BCrypt) |
| 프론트엔드 | Vanilla HTML/CSS/JS (프레임워크·빌드 도구 없음) |
| 실시간 | SockJS 1.6.1, STOMP.js 2.3.3, WebRTC (Full Mesh P2P) |
| AI/비전 | MediaPipe Tasks Vision 0.10.3 — FaceLandmarker (478 랜드마크, GPU→CPU 폴백) |
| DB | MySQL 8.0 (InnoDB, utf8mb4), HikariCP |
| 빌드/배포 | Maven (mvnw), Executable JAR, AWS EC2 / RDS |
| 도구 | Git, VSCode, DBeaver / HeidiSQL / MySQL Workbench |

### 기술 선택 이유
- **ORM 미사용(JdbcTemplate)**: SQL을 직접 작성해 집계 쿼리(`SUM`, `AVG`, `LEFT JOIN`)와 실행 계획을 명시적으로 통제.
- **Spring Security 미사용**: HTTP 세션 + BCrypt만으로 인증 구조를 직접 구현해 동작 원리를 학습.
- **클라이언트 측 얼굴 인식**: 서버 ML 인프라 비용·지연·개인정보 이슈를 모두 회피.
- **프레임워크 없는 프론트**: 빌드 단계 없이 정적 리소스를 Spring Boot가 직접 서빙.

---

## 4. 규모

| 분류 | 수량 |
|------|------|
| Java 클래스 | 약 54개 |
| HTML 페이지 | 20개 |
| JavaScript | 17개 파일 (약 4,900 LOC) |
| CSS | 14~15개 파일 |
| DB 테이블 | 12개 |
| REST API | 약 45개 |
| STOMP 채널 | 5개 (join / leave / focus / chat / signal) |
| 업적 | 30개 (6 카테고리) |

---

## 5. 주요 기능

### 5-1. 회원 / 마이페이지
- 이메일·비밀번호 회원가입, BCrypt 해시 저장, 세션 기반 로그인(타임아웃 8시간)
- "로그인 상태 유지" 선택 시 30일 영구 쿠키
- 닉네임·비밀번호·아바타(이모지 / 이미지 업로드) 변경, 현재 비밀번호 확인 후 회원 탈퇴

### 5-2. 솔로 공부 세션 (핵심 기능)
- 웹캠 + MediaPipe FaceLandmarker로 **고개 좌우(Yaw)·상하(Pitch) 각도**를 실시간 계산
- 임계값 초과 상태가 **3초 이상** 지속되면 "딴짓"으로 판정(유예 시간으로 오탐 방지), 빨간 오버레이로 경고
- **개인 맞춤 캘리브레이션**: 10초간 자연스러운 움직임을 수집해 5/95 백분위수로 사용자별 임계값 산출
- 세션 종료 시 집중/딴짓 시간 저장, 서버에서 집중률(`BigDecimal`, HALF_UP 소수 2자리) 계산
- 기존 세션 **이어하기**(누적 저장), 세션 선택 페이지(페이지네이션)

### 5-3. 플래너
- 월 달력 → 날짜 선택 시 노트북 뷰
- 할 일 체크리스트, D-Day 카운트다운
- **타임테이블**: 5분 단위 셀 그리드를 엑셀처럼 **드래그**해 시간 블록 생성(색상·라벨), 06시~02시 표시

### 5-4. 공부 통계
- 오늘/최근 7일/전체 총 공부시간, 평균 집중률, 연속 공부 일수, 주간 바 차트

### 5-5. 스터디 그룹 & 스터디룸
- 6자리 영숫자 초대 코드로 그룹 생성·참여, 누적 공부시간·집중률 랭킹
- 방장 권한: 멤버 강퇴, 그룹 폐쇄
- **그룹 스터디룸**: WebRTC Full Mesh로 참가자 영상 공유, STOMP로 입·퇴장/집중 상태/채팅 실시간 동기화, 각자 브라우저에서 집중 감지 후 결과를 그룹에 브로드캐스트

### 5-6. 업적 시스템 (게임화)
- 30개 업적 / 6개 카테고리: `study`, `focus`, `streak`, `group`, `planner`, `easter`(숨김 5개)
- 세션 저장·할 일 완료·D-Day 추가·블록 추가·그룹 참여/생성·채팅 등 **트리거 시점에 조건 검사** 후 신규 획득을 API 응답(`newAchievements`)에 포함 → 프론트 **토스트 큐**로 순차 표시
- `INSERT IGNORE` + `UNIQUE(user_id, achievement_id)`로 중복 지급·경쟁 상태 방지

### 5-7. 기타
- 공지사항(태그·상단 고정, 관리자 CRUD)
- 문의하기(비로그인 가능, 이메일로 답변 조회) + 관리자 답변
- 관리자 페이지(문의/사용자/공지 관리)
- 다크모드(`body.dark` + CSS 변수, `localStorage` 유지, 깜빡임 방지)
- 랜딩 페이지 **실시간 공부 중 인원** 표시(heartbeat 30초, TTL 60초)

---

## 6. 아키텍처

```
[브라우저: HTML / CSS / Vanilla JS + MediaPipe(CDN)]
        │  HTTP REST (fetch)          │  WebSocket (STOMP over SockJS)
        ▼                             ▼
[Spring Boot 3.5 — 내장 Tomcat :8080, context-path /watchman]
   Controller  →  Service (interface + Impl)  →  Repository (interface + Impl, JdbcTemplate)
        ▼
[MySQL 8.0]
```

- **3계층**: Controller(요청·세션 인증·`ResponseEntity`) → Service(비즈니스 로직·`@Transactional`) → Repository(SQL·`BeanPropertyRowMapper`)
- **도메인**: JPA 없는 순수 POJO 11종 (`User`, `Session`, `Todo`, `DDay`, `TimetableBlock`, `Notice`, `Contact`, `StudyGroup`, `StudyGroupMember`, `Achievement`, `UserAchievement`)
- **인증**: 세션에 `userId` 저장 → 컨트롤러에서 검증. 401(미인증) / 403(권한 없음) / 409·400(검증 실패) 규약
- **프론트 인증 가드**: `auth-guard.js`가 `/api/users/me` 확인 후 `window.__authReady`(Promise) 노출, 보호 페이지는 이를 await 후 렌더
- **서버 기동 시 자동 처리(`DataInitializer`)**: 관리자 비밀번호 BCrypt 마이그레이션, 누락 컬럼 보강, 업적 30개 시드
- **스키마**: `schema.sql`이 `IF NOT EXISTS` + `ALTER`로 **멱등**하게 매 기동 시 실행

### 데이터 흐름 — 업적 지급
```
세션 저장 / 할 일 완료 / 채팅 …
 → AchievementService.checkAndAward(userId, trigger)
 → trigger별 조건 SQL 검사 → tryAward(): 이미 보유? → INSERT IGNORE
 → 신규 획득 목록을 응답에 포함 → 프론트 토스트 큐 표시
```

---

## 7. 핵심 기술 포인트 (면접/포트폴리오 어필)

### ① 서버 부담 없는 브라우저 내 얼굴 인식
- MediaPipe FaceLandmarker 478개 랜드마크에서 코끝·양 볼 좌표로 Yaw/Pitch를 계산.
- `requestAnimationFrame` 루프에 50ms 스로틀(~20fps)을 적용하고, 루프가 끊기지 않도록 rAF를 최상단에서 재등록.
- GPU delegate 실패 시 CPU로 자동 폴백.
- 서버로는 영상이 아닌 **초 단위 시간 값만** 전송 → 개인정보 부담 최소화.

### ② 개인화 캘리브레이션
- 고정 임계값은 자세·카메라 위치에 따라 오탐이 많음 → 10초 자연 움직임을 5/95 백분위수로 통계 처리해 **사용자별 임계값** 산출.
- 3초 유예(grace) 로직으로 순간적인 고개 돌림은 딴짓으로 보지 않음.

### ③ WebRTC Full Mesh + STOMP 시그널링
- STOMP `/signal` 채널을 시그널링 서버로 활용(offer / answer / ICE).
- remoteDescription 설정 전에 도착한 ICE candidate를 **큐에 보관**했다가 적용하는 경합 처리.
- N명 → N(N-1)/2 연결 구조의 한계를 이해하고 소규모 스터디 그룹에 적합하도록 설계.

### ④ 업적 시스템 설계
- 트리거 기반 조건 검사, `INSERT IGNORE`·UNIQUE 키로 중복/경쟁 방지.
- 업적 오류가 본 기능(세션 저장 등)을 막지 않도록 `try/catch`로 격리.
- 이스터에그(숨김) 업적: 새벽 3~5시, 자정, 주말 연속, D-Day 당일 등 사용 패턴 기반.

### ⑤ ORM 없는 SQL 직접 설계
- `LEFT JOIN` + `SUM(focused_time)`, `AVG(focus_rate)`로 그룹 랭킹 집계, `LIMIT/OFFSET` 페이지네이션, 월별 일괄 조회.
- 파라미터 바인딩으로 SQL Injection 방지, `BeanPropertyRowMapper`로 snake_case→camelCase 매핑.

### ⑥ 플래너 타임테이블 드래그 UI
- 5분 단위 셀 그리드에서 mousedown/mousemove/mouseup으로 범위 선택 → 모달에서 블록 생성. 라이브러리 없이 구현.

### ⑦ 정밀 계산 / 날짜 처리
- 집중률은 `BigDecimal`(HALF_UP, 2자리), 날짜는 `LocalDate`/`LocalDateTime`로 통일(`java.util.Date` 미사용).

### ⑧ 실시간 접속자 집계
- `ConcurrentHashMap` + TTL(60초) 인메모리 heartbeat 방식. 비정상 종료도 자동 만료.

---

## 8. 데이터베이스 (12 테이블)

| 테이블 | 역할 |
|--------|------|
| `users` | 회원 계정 (BCrypt, 관리자 여부, streak) |
| `sessions` | 공부 세션 기록 (집중/딴짓 시간, 집중률, group_id) |
| `todos` / `ddays` / `timetable_blocks` | 플래너 데이터 |
| `study_groups` / `group_members` | 그룹 / 멤버 N:M (복합 PK) |
| `achievements` / `user_achievements` | 업적 마스터 / 획득 기록(UNIQUE) |
| `user_stats` | 채팅 카운트 등 활동 통계 |
| `notices` / `contacts` | 공지 / 문의·답변 (독립 테이블) |

```
users ─┬─ sessions · todos · ddays · timetable_blocks (1:N)
       ├─ user_achievements (1:N) ── achievements
       ├─ user_stats (1:1)
       ├─ study_groups [leader_id] (1:N)
       └─ group_members (N:M) ── study_groups
```
유저 삭제 시 종속 데이터는 `ON DELETE CASCADE`로 정리된다. 상세는 `DB.md` 참고.

---

## 9. 주요 API (요약)

| 영역 | 엔드포인트 |
|------|-----------|
| 인증 | `POST /api/auth/login`, `/register`, `/logout` |
| 유저 | `GET /api/users/me`, `PATCH /me/nickname·password·avatar`, `DELETE /me` |
| 세션 | `GET /api/sessions[/today·week·recent·list·{id}]`, `POST /api/sessions` |
| 플래너 | `/api/planner/todos`, `/ddays`, `/blocks` (CRUD) |
| 그룹 | `/api/groups`, `/groups/join`, `DELETE /groups/{id}[/members/{uid}]` |
| 업적 | `GET /api/achievements`, `/achievements/my` |
| 공지·문의 | `/api/notices`, `/api/contact` |
| 관리자 | `/api/admin/contacts`, `/admin/users` |
| 통계 | `GET /api/stats/active`, `POST /stats/ping·leave` |
| WebSocket | `/app/room/{id}/join·leave·focus·chat·signal` → `/topic/room/{id}/*` |

전체 목록은 `ARCHITECTURE.md` 참고.

---

## 10. 화면 구성 (20 페이지)

| 구분 | 페이지 |
|------|--------|
| 공개 | `index`(랜딩·실시간 인원), `login`, `how-it-works`, `service-intro`, `terms`, `privacy`, `notice`, `contact` |
| 핵심 | `main`(대시보드), `study-session`, `session-picker`, `calibration`, `planner`, `stats` |
| 그룹 | `study-group`, `study-group-info`, `study-group-session` |
| 기타 | `achievements`, `mypage`, `admin` |

---

## 11. 보안 & 품질

| 항목 | 현황 |
|------|------|
| 비밀번호 | BCrypt 해싱 |
| SQL Injection | `JdbcTemplate` 파라미터 바인딩 |
| XSS | `escHtml()` 일관 적용 |
| 권한 | 세션 인증 + 관리자 `is_admin` 검사 |
| 개선 예정 | CSRF 토큰, WebSocket 그룹 멤버십 검증, 로그인 Rate limiting, 아바타 Data URL 검증, DB 인덱스(`sessions.user_id`, `todos(user_id, todo_date)`), `focus_rate` DECIMAL 전환, 단위 테스트 확충 |

---

## 12. 트러블슈팅 / 배운 점 (직접 보완 권장)

> 아래는 코드에서 확인되는 설계 의도를 바탕으로 한 예시이다. 실제 겪은 경험으로 바꿔 적으면 설득력이 높아진다.

- **감지 루프 중단 문제** → rAF를 함수 최상단에서 먼저 재등록해 예외·조기 return이 있어도 루프가 끊기지 않도록 해결
- **ICE candidate 경합** → remoteDescription 이전 도착분을 큐잉 후 일괄 적용
- **순간 고개 돌림 오탐** → 3초 유예 + 개인 캘리브레이션으로 개선
- **업적 중복 지급 위험** → UNIQUE 키 + `INSERT IGNORE`로 DB 레벨에서 방어
- **다크모드 깜빡임** → nav 주입 전에 `body.dark`를 즉시 적용
- _(추가)_ 팀 협업 중 겪은 Git 충돌, 일정 조율, 역할 분담 경험

---

## 13. 실행 방법

```bash
# 사전 준비: Java 25, MySQL(포트 3308) DB `watchman` / 계정 watchman_db
./mvnw spring-boot:run        # Windows: mvnw.cmd spring-boot:run
# → http://localhost:8080/watchman
./mvnw clean package          # 실행 가능한 JAR 빌드
```
- 스키마는 서버 시작 시 `schema.sql`로 자동 초기화되며, 기본 관리자 계정이 생성된다(배포 전 비밀번호 변경 필수).

---

## 14. 관련 문서

| 문서 | 내용 |
|------|------|
| `ARCHITECTURE.md` | 구조·API·데이터 흐름 상세 |
| `DB.md` | 테이블 기술서 |
| `FEATURES.md` | 기능별 핵심 코드 발췌 |
| `STACK.md` | 기술 스택 표 |
| `PROJECT_ANALYSIS.md` | 전체 분석·개선 포인트 |
