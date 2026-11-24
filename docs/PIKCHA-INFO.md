# Pik-Cha! 프로젝트 정보 (포트폴리오용)

> 캐논 DSLR로 촬영하고 바로 인화·QR 다운로드·SMS 안내까지 이어지는 **DIY 인생네컷 포토부스 + 웨이팅 시스템**.
> 학교 EXPO 운영을 목적으로 하드웨어 제어, 키오스크 UI, 서버리스 백엔드를 처음부터 끝까지 직접 구현했다.

---

## 1. 한 줄 소개

Canon EOS 800D를 PC에서 직접 제어해 4컷을 촬영하고, 프레임 합성 → 클라우드 업로드 → 자동 인화 → 문자 알림까지 사람 개입 없이 흘러가는 포토부스 시스템.

## 2. 프로젝트 개요

| 항목 | 내용 |
|---|---|
| 프로젝트명 | Pik-Cha! (픽챠) |
| 목적 | 학교 EXPO 현장 운영용 네컷 사진 부스 |
| 개발 기간 | 2026.08 ~ 2026.11 (git 커밋 기준: 2026-08-16 ~ 2026-11-03, 총 55 커밋) |
| 형태 | 부스 PC 시스템 + 웨이팅 웹 시스템 (두 시스템이 독립 동작, `ticket_number`로만 연결) |
| 규모 | Python 약 3,300줄 (카메라 백엔드·프린터 워커·Lambda 5개), 키오스크 8화면 + 웨이팅/관리자 웹 6화면 |
| 저장소 | https://github.com/andy051127/pik-cha |

> 포트폴리오 작성 시 직접 채울 항목: 팀 구성/본인 역할, 실제 EXPO 운영 결과(이용 팀 수, 촬영·인화 건수 등), 스크린샷·시연 영상.

---

## 3. 시스템 구성

두 개의 시스템이 하나의 AWS 계정(API Gateway / DynamoDB)을 공유한다.

### 3-1. 부스 파이프라인 (부스 PC + 프린터 PC)

| 구성요소 | 위치 | 역할 |
|---|---|---|
| 카메라 백엔드 | `camera/` | FastAPI(포트 8000). Canon EDSDK로 DSLR 제어, 라이브뷰/촬영 진행 상황을 WebSocket으로 송출, 프레임 합성 결과 저장 및 업로드 |
| 키오스크 프론트 | `frontend/frontend/` | 터치스크린용 8단계 화면 (순수 HTML/CSS/JS, 포트 5500) |
| 프린트 워커 | `printer/print_worker.py` | 프린터 PC에서 5초 주기로 인쇄 대기열을 폴링해 Windows GDI로 인쇄, 스풀 큐가 비는 것을 확인해 완료 보고 |
| 실행 스크립트 | `실행.bat` | 백엔드 → 프린트 워커 → 프론트 서버 → 브라우저를 한 번에 기동 |

### 3-2. 웨이팅 시스템 (S3 정적 호스팅 + 서버리스)

| 페이지 | 용도 |
|---|---|
| `WaitingList_UserPage` | 손님 웨이팅 등록 (학과/학번/이름/전화/인원) → 순번 발급 |
| `WaitingList_UserPage_Status` | 내 순번, 앞 팀 수, 예상 대기시간, 인화 상태 폴링 조회 |
| `WaitingList_AdminTablet` / `AdminQRPage` | 현재 호출 번호를 보여주는 공개 디스플레이 (개인정보 없음) |
| `WaitingList_AdminPage` | 대기 현황 대시보드 |
| `WaitingList_AdminManage` / `PrintStatus_AdminManage` | 웨이팅 취소, 재인쇄, SMS 재발송 등 관리자 기능 (Basic Auth) |

### 3-3. AWS (서버리스)

| 서비스 | 사용 목적 |
|---|---|
| API Gateway | 모든 클라이언트의 단일 진입점 (Lambda 프록시 통합) |
| Lambda × 5 | `presign`, `session-logger`, `print`, `admin`, `waitlist` |
| DynamoDB × 2 | 세션/인쇄 큐/통계 테이블, 웨이팅 테이블 |
| S3 × 2 | 사진 저장 버킷, 웨이팅 페이지 정적 호스팅 버킷 |
| SOLAPI | 인화 완료 문자(SMS) 발송 |

---

## 4. 사용자 흐름

```
[손님 스마트폰]  QR 접속 → 웨이팅 등록 → 순번(ticket) 발급 → 상태 페이지에서 대기
        │
        ▼  (자기 차례가 되면 부스에서 순번 입력)
[키오스크]  메인 → 순번 입력 → 인화 매수 선택 → 카운트다운 → 촬영(라이브뷰)
         → 사진 검토 → 프레임/색상 선택(캔버스 합성) → 인화 QR 화면(30초 후 자동 초기화)
        │
        ▼
[백엔드]  촬영 종료 시 다음 대기팀 자동 호출 / 합성본 업로드
[프린터]  대기열 폴링 → 인쇄 → 완료 보고 → 문자 발송
```

핵심 UX 결정: 손님은 이름/전화번호를 부스에서 다시 입력하지 않는다. 순번만 입력하면 웨이팅 등록 시 받은 정보가 자동으로 연결된다.

---

## 5. 기술 스택

| 영역 | 기술 |
|---|---|
| 카메라 제어 | Canon EDSDK (ctypes 래퍼 직접 구현), Windows 메시지 큐 펌핑 |
| 백엔드 | Python, FastAPI, Uvicorn, WebSocket, Pillow, NumPy, qrcode |
| 프론트엔드 | HTML / CSS / Vanilla JS, Canvas API 합성, three.js로 대시보드의 3D 카메라 모델(`camera.glb`) 렌더링 |
| 인쇄 | pywin32 (GDI, 스풀 큐 조회) |
| 클라우드 | AWS Lambda, API Gateway, DynamoDB, S3 (Presigned URL, S3 Event Notification) |
| 외부 연동 | SOLAPI (SMS) |
| 기타 | 디자인 Figma → HTML/CSS 전환, `.bat` 일괄 실행 스크립트 |

---

## 6. 기술적 도전과 해결 (포트폴리오 핵심 소재)

### ① EDSDK의 스레드 제약 해결 — `EdsdkWorker`
- **문제**: EDSDK는 세션을 연 스레드에서만 명령을 보낼 수 있고, 이벤트 콜백은 Windows 메시지 큐를 펌핑해야만 도착한다. FastAPI의 요청 스레드에서 직접 호출하면 다운로드가 오지 않거나 크래시.
- **해결**: SDK 전용 스레드 하나가 초기화 → 세션 오픈 → 명령 큐 처리를 맡고, 처리 사이마다 `PeekMessageW/DispatchMessageW`를 펌핑. `app.py`는 SDK를 직접 만지지 않고 큐에 명령만 넣는다. 콜백 객체는 모듈 전역으로 유지해 GC에 의한 크래시도 방지.

### ② 카메라 없이도 전체 파이프라인 테스트 가능한 Graceful Degradation
- DLL 부재(`EDSDK_AVAILABLE=False`)와 카메라 미연결(`camera=None`)을 단계별로 감지해, 같은 타이밍의 카운트다운/촬영 이벤트를 흉내 내는 **Mock 촬영 분기**로 전환. 생성한 더미 JPEG가 정상 경로(리뷰·합성·업로드·인쇄)를 그대로 통과한다.
- 라이브뷰 WebSocket은 카메라가 없어도 연결을 유지해 `sequence_complete` 전달 채널이 끊기지 않게 했다.

### ③ AWS 자격증명 없이 업로드 — 학교 보안 정책 대응
- 부스 PC에 IAM 액세스 키를 둘 수 없는 환경. 모든 AWS 접근을 **API Gateway + Lambda(IAM Role 보유) + Presigned URL**로 우회. 부스 PC는 서명된 URL로 S3에 직접 PUT만 한다.
- 부스/프린터 PC는 사설망이므로 통신 방향을 항상 **로컬 → AWS**로만 설계(프린터는 푸시가 아닌 폴링).

### ④ 서버리스 이벤트 파이프라인과 순서 보장
- `presign` Lambda가 업로드 전에 `update_item`으로 이름/전화/인화매수를 먼저 기록 → S3 업로드 완료 시 `session-logger`가 S3 이벤트로 트리거되어 `if_not_exists`로 기존 값을 덮지 않고 상태를 채우며 **인쇄 큐(`__PENDING_PRINTS__`)에 등록**.
- 처리 순서에 따라 값이 유실되지 않도록 `put_item` 대신 `update_item`을 쓰는 등 순서 의존성을 명시적으로 설계.

### ⑤ 동시성 안전한 웨이팅 순번 발급
- `ticket_number=0` 예약 항목에 `counter`를 두고 DynamoDB **원자적 `ADD`**로 번호 발급. 중간 크래시 시 번호가 비는 일은 있어도 **중복 발급은 절대 없음**.
- 티켓 상태 머신: `waiting → called → in_session → photographed` (취소는 `in_session` 전까지 가능). 촬영 종료 시 백엔드가 `/waitlist/advance`를 호출해 가장 앞선 대기팀을 자동 호출(성공/실패 모두 `finally`에서 호출 — 카메라는 어느 쪽이든 비기 때문).

### ⑥ 인쇄 완료의 정확한 감지 → "인쇄 끝나기 전에 문자가 가는" 문제 방지
- 다중 매수 인쇄를 한 DC에서 `StartDoc/EndDoc`을 `copies`회 반복하고, **Windows 스풀 큐가 완전히 비는 것**을 폴링해 완료로 판단. 매수 기반 타임아웃(`max(120, 30*매수+60)`)은 상한일 뿐이고 실제 완료 판단은 스풀 큐 상태.
- 완료 보고 시점에서만 SMS 발송, `sms_sent` 플래그로 중복 방지. 관리자 수동 재발송은 플래그를 의도적으로 무시.

### ⑦ 프레임 슬롯 자동 감지
- `frame_compositor.py`가 프레임 PNG에서 RGB(217,217,217) 자리표시 영역을 스캔해 사진 슬롯 좌표를 자동 추출. 디자이너가 프레임 이미지만 교체하면 코드 수정 없이 반영된다.
- 최종 합성(로고+패턴+사진+프레임)은 클라이언트 Canvas에서 수행하고 완성된 JPEG만 업로드.

### ⑧ 운영 안전장치
- 관리자 API는 `ADMIN_USERNAME/PASSWORD` 환경변수가 없으면 모든 요청을 401로 거부(fail-closed).
- SOLAPI 키는 Lambda 환경변수로만 관리, 코드/저장소에 비밀값 미포함.
- 티켓 `completed/canceled`는 입장 거부하되 입장 순서는 강제하지 않는 유연한 현장 운영 정책.

---

## 7. 디렉터리 구조

```
pik-cha/
├─ camera/            FastAPI 백엔드 + EDSDK 래퍼 (app.py, edsdk_worker.py, aws_uploader.py, frame_compositor.py ...)
│  └─ edsdk_wrapper/  sdk / events / shutter / liveview / download
├─ frontend/
│  ├─ frontend/       키오스크 8개 화면 (01_landing_main ~ 08_print_qr)
│  └─ admin/          웨이팅·관리자 웹 페이지 (S3 배포)
├─ printer/           프린트 워커 (pywin32 GDI)
├─ Lambda/            AWS Lambda 소스 5개
├─ tools/             실행 로그 도우미 등
├─ UI개선/            UI/UX 개선 과제 및 휴리스틱 평가 자료
├─ ARCHITECTURE.md    아키텍처 요약
├─ Full_System_Archi.md  전체 시스템 다이어그램 (Mermaid)
└─ 실행.bat           부스 파이프라인 일괄 실행
```

---

## 8. 데이터 모델 요약

- **세션 테이블** `sgu-pikcha-photobooth-sessions` — 키 `session_id`. 예약 키 `__PENDING_PRINTS__`(인쇄 큐), `__STATS__`(누적 통계).
- **웨이팅 테이블** `sgu-pikcha-waitinglist` — 키 `ticket_number`. `0`번은 `counter`(발급 번호)와 `now_serving`(현재 호출 번호)을 담는 예약 항목. 번호는 행사 전체에서 연속 증가.

---

## 9. 알려진 한계 / 회고 소재

문서화된 약점을 솔직히 인지하고 있다는 점도 포트폴리오에서 어필할 수 있는 부분이다.

- `ticket_number`와 `session_id`가 DB에서 직접 연결되지 않고 프론트가 값을 들고 이동 → 중간에 끊기면 SMS가 조용히 누락될 수 있음 → *개선안: 세션 시작 시 서버가 연결 관계를 기록*
- S3 사진 자동 삭제(수명 주기 정책) 없음 → *개선안: Lifecycle 규칙 + 개인정보 보관 기간 정책*
- 카메라 인식 실패 시 조용히 Mock 모드로 전환 → *개선안: 운영 모드에서 명시적 경고/차단*
- 관리자 인증이 `prompt()` + Basic Auth → *개선안: Cognito 등 정식 로그인*
- 부스 프론트는 Figma 디자인을 HTML/CSS로 옮긴 뒤 JS를 연결한 구조 → *개선안: 컴포넌트/빌드 도구 도입*

---

## 10. 배운 점 (작성 가이드)

- 하드웨어 SDK의 스레드/메시지 루프 제약을 이해하고 전용 워커로 격리한 경험
- 사용 환경(학교 보안 정책, 사설망)을 제약으로 받아들여 Presigned URL + 폴링 구조로 설계한 경험
- 서버리스 이벤트 체인에서 처리 순서와 멱등성(`if_not_exists`, 중복 방지 플래그)을 설계한 경험
- 실제 현장 운영을 전제로 한 장애 대비(Mock 폴백, fail-closed 인증, 수동 재인쇄/재발송)
- UI/UX 휴리스틱 평가를 바탕으로 한 화면 개선 (`UI개선/` 폴더 자료)

---

## 11. 실행 방법

```bash
# 한 번에 실행 (Windows)
실행.bat

# 수동 실행
cd camera   && pip install -r requirements.txt && python app.py          # :8000
cd printer  && pip install -r requirements.txt && python print_worker.py
cd frontend/frontend && python -m http.server 5500                       # 키오스크
```

- `camera/.env`에 `API_GATEWAY_URL` 설정 필요 (`.env.example` 참고). 미설정 시 업로드는 로컬 LAN QR로 대체되어 AWS 없이도 테스트 가능.
- `EDSDK.dll`, `EdsImage.dll`(64-bit)은 `camera/dll/`에 직접 배치 (저장소 미포함).
