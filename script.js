(() => {
  'use strict';

  /* =====================================================================
   * 1. 데이터 — 여기만 고치면 터미널과 GUI가 같이 바뀝니다
   * ===================================================================== */
  const STACK = [
    {
      "title": "Backend",
      "items": [
        "Java",
        "Spring Boot",
        "Spring Security · JWT",
        "MyBatis",
        "JdbcTemplate",
        "WebSocket/STOMP",
        "Python · FastAPI"
      ]
    },
    {
      "title": "Cloud · Infra",
      "items": [
        "AWS Lambda",
        "API Gateway",
        "S3",
        "EC2 · RDS",
        "CloudFront",
        "Terraform"
      ]
    },
    {
      "title": "Database",
      "items": [
        "MySQL",
        "MariaDB",
        "PostgreSQL · PostGIS",
        "DynamoDB",
        "Flyway"
      ]
    },
    {
      "title": "AI",
      "items": [
        "LLM API · Tool use",
        "Spring AI",
        "CLIP · ONNX Runtime",
        "MediaPipe",
        "TFLite"
      ]
    },
    {
      "title": "DevOps · Tools",
      "items": [
        "GitHub Actions",
        "Testcontainers",
        "Docker",
        "Claude Code · Codex",
        "ORCA"
      ]
    }
  ];

  // [이름, 발급기관, 날짜·상태 설명, 상태(ACQUIRED | PASSED_1ST | IN_PROGRESS)]
  const CERTS = [
    [
      "AWS Certified AI Practitioner (AIF-C01)",
      "Amazon Web Services",
      "2026.07",
      "ACQUIRED"
    ],
    [
      "리눅스마스터 2급",
      "KAIT",
      "1차 합격 · 2차 2027.01 응시 예정",
      "PASSED_1ST"
    ],
    [
      "SQLD",
      "K-DATA",
      "2027.02 응시 예정",
      "IN_PROGRESS"
    ]
  ];

  const TIMELINE = [
    {
      "hash": "a1f3c2e",
      "date": "2026.11",
      "title": "KAICTS 학술대회 논문 · 발표",
      "desc": "HA`WE를 주제로 논문 제출, 발표 대본 작성"
    },
    {
      "hash": "e4b8d37",
      "date": "2026.10",
      "title": "Pik-Cha! 학교 EXPO 운영",
      "desc": "10.21 ~ 10.23 · DSLR 포토부스 + 웨이팅 시스템 현장 운영"
    },
    {
      "hash": "7d21e6b",
      "date": "2026.09",
      "title": "HA`WE 개발 시작",
      "desc": "팀 Sapphire Developers (4인)"
    },
    {
      "hash": "2d8f6b1",
      "date": "2026.07",
      "title": "Ridely — 2026 관광데이터 활용 공모전",
      "desc": "본선 진출"
    },
    {
      "hash": "9b7d014",
      "date": "2026.05",
      "title": "Watchman 개발 시작",
      "desc": "팀 Smokers (3인) · 캡스톤"
    },
    {
      "hash": "0000001",
      "date": "2024.03",
      "title": "신구대학교 컴퓨터소프트웨어과 입학",
      "desc": "init"
    }
  ];

  const PROJECTS = [
    {
      "id": "hawe",
      "name": "HA`WE",
      "file": "hawe.txt",
      "featured": true,
      "tags": [
        "팀 Sapphire Developers",
        "KAICTS 학술대회 논문"
      ],
      "summary": "그룹마다 매일 미션이 열리고, 내가 먼저 답해야 그룹원의 답이 보이는 모바일 그룹 앱. LLM 미션 생성과 사진·그림 AI를 서버 검증과 폴백으로 감쌌습니다.",
      "stack": [
        "Spring Boot",
        "MyBatis",
        "LLM API",
        "CLIP · ONNX",
        "TFLite"
      ],
      "role": "백엔드 설계 · 구현",
      "period": "2026.09 ~",
      "meta": "역할 · 백엔드 설계 · 구현 · 2026.09 ~",
      "md": [
        "# HA`WE",
        "> 그룹마다 매일 미션이 열리고, 내가 먼저 답해야 그룹원의 답이 보이는 모바일 그룹 앱",
        "",
        "- 기간: 2026.09 ~ (커밋 170개)",
        "- 팀: Sapphire Developers (4인) · KAICTS 학술대회 논문",
        "- 역할: 백엔드 아키텍처 설계, ERD 설계, API 구조 설계, 백엔드 API 구현, 비전 서비스 Lambda 구조 설계",
        "- 스택: Spring Boot · Java 25 · MyBatis · Flyway · MySQL(RDS) · Python FastAPI · ONNX · SwiftUI · Jetpack Compose",
        "",
        "## 문제 → 해결",
        "소규모 그룹은 연락이 뜸해지고, 일상을 먼저 올리기가 부담스럽다.",
        "→ 서버가 정해진 시각에 가벼운 미션을 열고, 제출해야만 서로의 답이 보이게 했다.",
        "",
        "## 아키텍처",
        "```",
        "[iOS · SwiftUI]  [Android · Compose]     ← 그림 분류는 기기 안 (TFLite int8)",
        "        │ REST + JWT",
        "        ▼",
        "Spring Boot ──> MyBatis ──> MySQL (RDS)",
        "   ├─ @Scheduled 미션 발행 ──> LLM (서버가 검증 · 폴백)",
        "   ├─ 커밋 후 비동기 ──> Python 비전 서비스 (CLIP + ONNX)",
        "   └─ 파일 저장 ──> S3 (presigned URL)",
        "```",
        "",
        "## 핵심 설계",
        "- 서버 주도 LLM 생성: 틀·시각은 서버가 정하고 LLM은 문장만 채움. 길이·형식·유사도 재검증, 실패 시 고정 문장 폴백",
        "- \"제출해야 열람\"을 앱의 블러가 아니라 서버 423 Locked로 강제",
        "- AI 작업은 커밋 이후 별도 스레드로 분리 → 제출 응답이 AI를 기다리지 않음",
        "- LLM에는 닉네임·제출 내용을 보내지 않음 (개인정보 최소화)",
        "",
        "## 측정 결과",
        "- 그림 모델: Quick, Draw! 테스트셋 top-1 93.1% · int8 모델 158KB",
        "- 사진–주제 적합도: ROC-AUC 0.958 (사진 177장 기준)",
        "- ONNX fp16 전환: 설치 2.3GB → 0.7GB, 시작 36초 → 2초, 판정 변화 0",
        "",
        "## 트러블슈팅",
        "### HTTP-400  비전 서비스 호출 실패",
        "- 원인: Java HTTP 클라이언트의 h2c 업그레이드 요청을 uvicorn이 거절",
        "- 해결: HTTP/1.1로 고정하고, 실제 클라이언트로 재현하는 회귀 테스트 추가",
        "",
        "## 한계",
        "- 실사용자 데이터가 없어 참여율 향상은 주장하지 않음",
        "",
        "## 링크",
        "- GitHub: https://github.com/Maenghansoo1/Sapphire"
      ]
    },
    {
      "id": "pikcha",
      "name": "Pik-Cha!",
      "file": "pikcha.txt",
      "featured": false,
      "tags": [
        "학교 EXPO",
        "하드웨어 + 서버리스"
      ],
      "summary": "캐논 DSLR로 촬영하고 인화·QR 다운로드·문자 안내까지 사람 손 없이 이어지는 DIY 인생네컷 포토부스와 웨이팅 시스템입니다.",
      "stack": [
        "Python · FastAPI",
        "Canon EDSDK",
        "Lambda",
        "DynamoDB",
        "S3"
      ],
      "role": "백엔드 · 프린터 서버 · DB",
      "period": "2026.08 ~ 2026.11",
      "meta": "역할 · 백엔드 · 프린터 서버 · DB · 2026.08 ~ 2026.11",
      "md": [
        "# Pik-Cha!",
        "> DSLR로 찍고, 인화하고, 문자까지 — 사람 손 없이 흘러가는 인생네컷 포토부스 + 웨이팅 시스템",
        "",
        "- 기간: 2026.08 ~ 2026.11 (커밋 55개)",
        "- 목적: 학교 EXPO 현장 운영",
        "- 역할: 백엔드 Lambda, 로컬 프린터 서버, 프론트 API 연동, DynamoDB 설계",
        "- 스택: Python · FastAPI · Canon EDSDK · AWS Lambda · API Gateway · DynamoDB · S3 · SOLAPI",
        "",
        "## 흐름",
        "QR로 웨이팅 등록 → 순번 발급 → 부스에서 순번 입력 → 4컷 촬영",
        "→ 프레임 합성 → 업로드 → 자동 인화 → 완료 문자",
        "",
        "## 아키텍처",
        "```",
        "[손님 폰]   웨이팅 웹 (S3 정적) ──┐",
        "[부스 PC]   FastAPI + EDSDK ──────┼──> API Gateway ──> Lambda ×5 ──> DynamoDB · S3",
        "[프린터 PC] 프린트 워커 (폴링) ───┘                        └──> SOLAPI (문자)",
        "```",
        "",
        "## 핵심 설계",
        "- EDSDK 전용 스레드 + 메시지 큐 펌핑으로 SDK의 스레드 제약 해결",
        "- 학교 보안 정책상 PC에 AWS 키를 둘 수 없어 Presigned URL로 업로드",
        "- 사설망이라 통신은 항상 로컬 → AWS 방향 (프린터는 푸시 대신 폴링)",
        "- DynamoDB 원자적 ADD로 웨이팅 순번 중복 발급 방지",
        "- 카메라가 없으면 Mock 촬영으로 전환해 전체 파이프라인 테스트 가능",
        "",
        "## 트러블슈팅",
        "### RACE-01  처리 순서에 따라 세션 정보가 사라짐",
        "- 원인: put_item이 먼저 기록된 이름·전화번호를 통째로 덮어씀",
        "- 해결: update_item + if_not_exists로 기존 값을 지키며 상태만 채움",
        "",
        "### PRINT-01  인쇄가 끝나기 전에 문자가 갈 수 있음",
        "- 원인: 인쇄 명령을 보낸 시점과 실제 출력 완료 시점이 다름",
        "- 해결: Windows 스풀 큐가 완전히 빈 뒤에만 완료 보고 · 문자 발송, 중복 발송 플래그",
        "",
        "## 회고",
        "- 웨이팅 번호와 세션이 DB에서 직접 연결되지 않아 문자 누락 가능 → 서버가 연결 관계를 기록하는 것이 개선안",
        "",
        "## 링크",
        "- GitHub: https://github.com/andy051127/pik-cha"
      ]
    },
    {
      "id": "ridely",
      "name": "Ridely",
      "file": "ridely.txt",
      "featured": false,
      "tags": [
        "2026 관광데이터 활용 공모전",
        "팀 git push --force"
      ],
      "summary": "흩어진 자전거 인프라와 관광 데이터를 엮어, AI 코치가 목적에 맞는 한강 자전거길 코스를 설계해주는 앱입니다.",
      "stack": [
        "Spring Boot",
        "Spring AI",
        "PostGIS",
        "Terraform",
        "GitHub Actions"
      ],
      "role": "프론트 · 백엔드 리팩터링",
      "period": "2026.07",
      "meta": "역할 · 프론트 · 백엔드 리팩터링 · 2026.07 · 본선 진출",
      "md": [
        "# Ridely",
        "> 흩어진 자전거 인프라와 관광 데이터를 엮어 코스를 설계하는 AI 트레이너 \"Coach Ridely\"",
        "",
        "- 출품: 2026 관광데이터 활용 공모전 (한국관광공사) · 웹·앱 부문",
        "- 기간: 2026.07 · 결과: 본선 진출",
        "- 팀: git push --force · 역할: 프론트엔드, 백엔드 일부 리팩터링",
        "- 스택: Spring Boot · Spring AI · PostgreSQL + PostGIS · MyBatis · Flyway · Cordova · Terraform · GitHub Actions",
        "",
        "## 문제 → 해결",
        "급수대·수리소·따릉이·사고다발지·관광지 정보가 기관별로 흩어져 있다.",
        "→ 공공데이터 5종 이상을 통합하고, \"12km, 풍경 위주, 물 마실 곳 있게\" 같은 목적 기반 코스를 만든다.",
        "",
        "## 아키텍처",
        "```",
        "[Android (Cordova)] ──> CloudFront ──> EC2 · Spring Boot ──> RDS (PostGIS)",
        "                                           ├──> LLM (Bedrock · Gemini · LiteLLM)",
        "                                           └──> ORS · Kakao · TourAPI · TAAS",
        "```",
        "",
        "## 코스 추천 파이프라인",
        "검증 → 멱등성 → PostGIS 후보 수집 → LLM 경유지 선택 → 경로 생성 → 거리 보정 → 코치 코멘트",
        "",
        "## 핵심 설계",
        "- LLM을 믿지 않는 설계: 후보에 없는 ID(환각)는 재시도 후 규칙 기반 폴백, 폴백 결과는 \"FALLBACK\"으로 정직하게 표시",
        "- 위치정보 서버 무전송: 주변 인프라는 전체 목록을 받아 폰에서 필터링, 계약 테스트로 고정",
        "- 환경변수 하나로 LLM 공급자 전환 → 운영 중 권한 회수 일정에 코드 변경 없이 대응",
        "- Terraform으로 AWS 정의, PR마다 Testcontainers 통합 테스트, main 병합 시 자동 배포",
        "",
        "## 트러블슈팅",
        "### DIST-01  목표 12km인데 코스가 6~7km",
        "- 시도: 후보 정렬·상한 해제 등 4번 실패 → 데이터로 원인을 다시 정의",
        "- 해결: 거리 책임을 LLM에서 서비스 단계로 옮겨 PostGIS로 연장점 삽입 → 4건 중 3건 오차 +3~7%",
        "",
        "### ELEV-01  고도 보정은 하지 않기로 결정",
        "- 근거: 6개 구간 실측 결과 평지에서 고도가 3~4배 과대 계상 → 강도 판정에서 고도 제외"
      ]
    },
    {
      "id": "watchman",
      "name": "Watchman",
      "file": "watchman.txt",
      "featured": false,
      "tags": [
        "캡스톤",
        "팀 Smokers"
      ],
      "summary": "브라우저가 직접 얼굴 방향을 분석해 집중도를 재고, 친구들과 실시간으로 함께 공부하는 스터디 웹 서비스입니다.",
      "stack": [
        "Spring Boot 3.5",
        "JdbcTemplate",
        "STOMP",
        "WebRTC",
        "MediaPipe"
      ],
      "role": "백엔드 설계 · 제작 · DB",
      "period": "2026.05 ~",
      "meta": "역할 · 백엔드 설계 · 제작 · DB · 2026.05 ~",
      "md": [
        "# Watchman",
        "> 브라우저가 직접 얼굴 방향을 분석해 집중도를 재고, 친구들과 함께 공부하는 스터디 웹 서비스",
        "",
        "- 기간: 2026.05 ~ (커밋 77개)",
        "- 팀: Smokers (3인) · 역할: 백엔드 아키텍처 설계·제작, DB 설계 및 ERD 제작, 백엔드 API 제작",
        "- 스택: Spring Boot 3.5 · Java 25 · JdbcTemplate · MySQL 8 · WebSocket(STOMP) · WebRTC · MediaPipe",
        "",
        "## 문제 → 해결",
        "혼자 공부하면 집중 상태를 객관적으로 알기 어렵고, 동기 부여 수단이 부족하다.",
        "→ 카메라 기반 집중 측정 + 그룹 실시간 공유 + 업적(게임화)",
        "",
        "## 아키텍처",
        "```",
        "[브라우저 + MediaPipe] ── WebRTC P2P (영상) ── [브라우저 + MediaPipe]",
        "        │ REST                    │ STOMP (입장 · 집중 · 채팅 · 시그널)",
        "        ▼                         ▼",
        "Spring Boot: Controller → Service → Repository (JdbcTemplate) ──> MySQL (RDS)",
        "```",
        "",
        "## 핵심 설계",
        "- 얼굴 분석은 100% 브라우저에서 → 서버엔 영상 없이 집중 시간(초)만 저장",
        "- 10초 캘리브레이션으로 사용자별 임계값, 3초 유예로 순간 고개 돌림 오탐 방지",
        "- ORM 없이 SQL 직접 작성 (12개 테이블, 그룹 랭킹 집계)",
        "- 업적 30개: INSERT IGNORE + UNIQUE 키로 중복 지급 방지",
        "",
        "## 트러블슈팅",
        "### RTC-01  연결 중 ICE candidate 유실",
        "- 원인: remoteDescription 설정 전에 ICE candidate가 먼저 도착",
        "- 해결: 먼저 온 후보를 큐에 보관했다가 설정 후 일괄 적용",
        "",
        "### LOOP-01  얼굴 감지 루프가 멈춤",
        "- 해결: requestAnimationFrame을 함수 최상단에서 먼저 재등록해 예외가 나도 루프 유지",
        "",
        "## 링크",
        "- GitHub: https://github.com/andy051127/watchman-springboot"
      ]
    }
  ];

  const WORKFLOW = {
    "id": "workflow",
    "name": "Engineering Workflow",
    "file": "workflow",
    "md": [
      "# Engineering Workflow (ORCA)",
      "> Claude Code와 Codex를 역할별로 나눠 운영하는 멀티 에이전트 AI 개발환경",
      "",
      "- 형태: 에이전트 지침 2종(CLAUDE.md · AGENTS.md) + Quick Command 6종",
      "- 역할: 설계 · 구성",
      "- 도구: ORCA CLI · Claude Code · OpenAI Codex · Git worktree",
      "",
      "## 왜 만들었나",
      "AI 하나에 탐색·구현·자기 리뷰를 다 맡기면 단계 경계가 흐려지고, 검증 없이 \"완료\"가 나온다.",
      "",
      "## 구조",
      "```",
      "개발자 (요구사항 · 최종 승인)",
      "   │  ORCA 터미널",
      "   ▼",
      "Claude Code  ── plan.md ──>   Codex",
      "탐색·설계·리뷰 <── report.md ── 구현·테스트·검증",
      "             ── review.md ──>",
      "      (기능별 Git worktree 안에서 1:1 협업)",
      "```",
      "",
      "## 핵심 설계",
      "- 세션끼리 대화 기록이 공유되지 않으므로 .agent/*.md 파일을 작업 계약으로 사용",
      "- ORCA 메시지는 \"plan.md를 읽어라\" 같은 한 줄 신호만, 상세 내용은 파일에",
      "- 완료 기준은 AI의 말이 아니라 실제 git diff와 테스트·빌드 결과",
      "- 리뷰는 P0/P1/P2로 분류, Codex는 리뷰를 그대로 따르지 않고 코드로 재검증",
      "- 무단 reset · force push · 임의 commit 금지, 병합은 사람이 결정",
      "",
      "## 한계",
      "- 프롬프트 기반 운영 규칙이라 CI·브랜치 보호 같은 기술적 강제는 아님",
      "- 생산성 향상 수치는 측정하지 않아 주장하지 않음"
    ]
  };
  const DOCS = PROJECTS.concat([WORKFLOW]);

  /* man 상세 페이지 데이터 */
  const MAN = {
    "hawe": {
      "summary": "그룹마다 매일 미션이 열리고, 내가 먼저 답해야 그룹원의 답이 보이는 모바일 그룹 앱",
      "synopsis": "hawe --group <초대코드> --mission daily --submit-to-unlock",
      "meta": "팀 Sapphire Developers (4인) · 2026.09 ~ · 역할: 백엔드 아키텍처 설계, ERD 설계, API 구조 설계, 백엔드 API 구현, 비전 서비스 Lambda 구조 설계 · KAICTS 학술대회 논문",
      "desc": [
        "소규모 그룹은 연락이 뜸해지고, 일상을 먼저 올리기가 부담스럽다.",
        "서버가 정해진 시각에 가벼운 미션을 열고, 제출해야만 서로의 답이 보이게 했다."
      ],
      "arch": [
        {
          "label": "CLIENT",
          "hl": false,
          "items": [
            [
              "iOS · SwiftUI",
              ""
            ],
            [
              "Android · Compose",
              "그림 분류는 기기 안"
            ]
          ]
        },
        {
          "label": "API",
          "hl": true,
          "items": [
            [
              "Spring Boot",
              "REST + JWT · MyBatis"
            ],
            [
              "@Scheduled",
              "미션 자동 발행"
            ]
          ]
        },
        {
          "label": "AI",
          "hl": true,
          "items": [
            [
              "LLM",
              "미션 문장 · 서버가 검증"
            ],
            [
              "비전 서비스",
              "CLIP + ONNX"
            ]
          ]
        },
        {
          "label": "STORAGE",
          "hl": false,
          "items": [
            [
              "MySQL (RDS)",
              "Flyway"
            ],
            [
              "S3",
              "presigned URL"
            ]
          ]
        }
      ],
      "extra": null,
      "options": [
        [
          "--server-driven-llm",
          "틀·시각은 서버가 정하고 LLM은 문장만 채움. 길이·형식·유사도 재검증, 실패 시 고정 문장 폴백"
        ],
        [
          "--locked",
          "\"제출해야 열람\"을 앱의 블러가 아니라 서버 423 Locked로 강제"
        ],
        [
          "--async-ai",
          "AI 작업은 커밋 이후 별도 스레드로 분리 → 제출 응답이 AI를 기다리지 않음"
        ],
        [
          "--privacy",
          "LLM에는 닉네임·제출 내용을 보내지 않음"
        ]
      ],
      "results": [
        "그림 모델: Quick, Draw! 테스트셋 top-1 93.1% · int8 모델 158KB",
        "사진–주제 적합도: ROC-AUC 0.958 (사진 177장 기준)",
        "ONNX fp16 전환: 설치 2.3GB → 0.7GB, 시작 36초 → 2초, 판정 변화 0"
      ],
      "bugs": [
        {
          "code": "HTTP-400",
          "title": "비전 서비스 호출 실패",
          "cause": "Java HTTP 클라이언트의 h2c 업그레이드 요청을 uvicorn이 거절",
          "fix": "HTTP/1.1로 고정하고, 실제 클라이언트로 재현하는 회귀 테스트 추가"
        }
      ],
      "notes": [
        "실사용자 데이터가 없어 참여율 향상은 주장하지 않음"
      ],
      "links": [
        [
          "github(1)",
          "https://github.com/Maenghansoo1/Sapphire"
        ]
      ]
    },
    "pikcha": {
      "summary": "DSLR로 찍고, 인화하고, 문자까지 — 사람 손 없이 흘러가는 인생네컷 포토부스 + 웨이팅 시스템",
      "synopsis": "pikcha --dslr canon-800d --print selphy-cp1500 --sms",
      "meta": "학교 EXPO · 2026.08 ~ 2026.11 (커밋 55개) · EXPO 2026.10.21 ~ 10.23 · 역할: 백엔드 Lambda, 로컬 프린터 서버, 프론트 API 연동, DynamoDB 설계",
      "desc": [
        "QR로 웨이팅 등록 → 순번 발급 → 부스에서 순번 입력 → 4컷 촬영",
        "→ 프레임 합성 → 업로드 → 자동 인화 → 완료 문자까지 사람 개입 없이 이어지게 만들었다."
      ],
      "arch": [
        {
          "label": "CLIENT",
          "hl": false,
          "items": [
            [
              "손님 폰",
              "웨이팅 웹 (S3)"
            ],
            [
              "부스 PC",
              "FastAPI + EDSDK"
            ]
          ]
        },
        {
          "label": "EDGE",
          "hl": true,
          "items": [
            [
              "API Gateway",
              "단일 진입점"
            ]
          ]
        },
        {
          "label": "COMPUTE",
          "hl": true,
          "items": [
            [
              "Lambda ×5",
              "presign · print · waitlist …"
            ]
          ]
        },
        {
          "label": "STORAGE",
          "hl": false,
          "items": [
            [
              "DynamoDB",
              "세션 · 인쇄 큐 · 웨이팅"
            ],
            [
              "S3",
              "사진 원본"
            ]
          ]
        }
      ],
      "extra": {
        "label": "ON-SITE",
        "chain": [
          "프린트 워커",
          "Canon SELPHY",
          "SOLAPI 문자"
        ],
        "note": "인쇄 큐를 5초마다 가져와 출력하고, 스풀 큐가 비면 완료 문자 발송"
      },
      "options": [
        [
          "--edsdk-worker",
          "EDSDK 전용 스레드 + 메시지 큐 펌핑으로 SDK의 스레드 제약 해결"
        ],
        [
          "--presigned",
          "학교 보안 정책상 PC에 AWS 키를 둘 수 없어 Presigned URL로 업로드"
        ],
        [
          "--pull-only",
          "사설망이라 통신은 항상 로컬 → AWS 방향 (프린터는 푸시 대신 폴링)"
        ],
        [
          "--atomic-ticket",
          "DynamoDB 원자적 ADD로 웨이팅 순번 중복 발급 방지"
        ],
        [
          "--mock",
          "카메라가 없으면 Mock 촬영으로 전환해 전체 파이프라인 테스트"
        ]
      ],
      "results": [],
      "bugs": [
        {
          "code": "RACE-01",
          "title": "처리 순서에 따라 세션 정보가 사라짐",
          "cause": "put_item이 먼저 기록된 이름·전화번호를 통째로 덮어씀",
          "fix": "update_item + if_not_exists로 기존 값을 지키며 상태만 채움"
        },
        {
          "code": "PRINT-01",
          "title": "인쇄가 끝나기 전에 문자가 갈 수 있음",
          "cause": "인쇄 명령을 보낸 시점과 실제 출력 완료 시점이 다름",
          "fix": "Windows 스풀 큐가 완전히 빈 뒤에만 완료 보고 · 문자 발송, 중복 발송 플래그"
        }
      ],
      "notes": [
        "웨이팅 번호와 세션이 DB에서 직접 연결되지 않아 문자 누락 가능 → 서버가 연결 관계를 기록하는 것이 개선안"
      ],
      "links": [
        [
          "github(1)",
          "https://github.com/andy051127/pik-cha"
        ]
      ]
    },
    "ridely": {
      "summary": "흩어진 자전거 인프라와 관광 데이터를 엮어 코스를 설계하는 AI 트레이너 \"Coach Ridely\"",
      "synopsis": "ridely --from <출발> --to <도착> --distance 12km --priority scenery",
      "meta": "2026 관광데이터 활용 공모전 (한국관광공사) · 2026.07 · 본선 진출 · 팀 git push --force · 역할: 프론트엔드, 백엔드 일부 리팩터링",
      "desc": [
        "급수대·수리소·따릉이·사고다발지·관광지 정보가 기관별로 흩어져 있다.",
        "공공데이터 5종 이상을 통합하고, \"12km, 풍경 위주, 물 마실 곳 있게\" 같은 목적 기반 코스를 만든다."
      ],
      "arch": [
        {
          "label": "CLIENT",
          "hl": false,
          "items": [
            [
              "Android",
              "Cordova"
            ]
          ]
        },
        {
          "label": "EDGE",
          "hl": true,
          "items": [
            [
              "CloudFront",
              ""
            ]
          ]
        },
        {
          "label": "SERVER",
          "hl": true,
          "items": [
            [
              "Spring Boot",
              "EC2 · 코스 파이프라인"
            ]
          ]
        },
        {
          "label": "DATA",
          "hl": false,
          "items": [
            [
              "PostgreSQL",
              "PostGIS"
            ],
            [
              "LLM",
              "Bedrock · Gemini · LiteLLM"
            ],
            [
              "공공 API",
              "ORS · Kakao · TourAPI · TAAS"
            ]
          ]
        }
      ],
      "extra": {
        "label": "PIPELINE",
        "chain": [
          "검증",
          "PostGIS 후보",
          "LLM 경유지",
          "경로 생성",
          "거리 보정",
          "코치 코멘트"
        ],
        "note": ""
      },
      "options": [
        [
          "--distrust-llm",
          "후보에 없는 ID(환각)는 재시도 후 규칙 기반 폴백, 폴백 결과는 \"FALLBACK\"으로 정직하게 표시"
        ],
        [
          "--no-location-upload",
          "주변 인프라는 전체 목록을 받아 폰에서 필터링, 계약 테스트로 고정"
        ],
        [
          "--llm-provider",
          "환경변수 하나로 LLM 공급자 전환 → 운영 중 권한 회수 일정에 코드 변경 없이 대응"
        ],
        [
          "--iac",
          "Terraform으로 AWS 정의, PR마다 Testcontainers 통합 테스트, main 병합 시 자동 배포"
        ]
      ],
      "results": [],
      "bugs": [
        {
          "code": "DIST-01",
          "title": "목표 12km인데 코스가 6~7km",
          "cause": "후보 정렬·상한 해제 등 4번 시도가 실패, 데이터로 원인을 다시 정의",
          "fix": "거리 책임을 LLM에서 서비스 단계로 옮겨 PostGIS로 연장점 삽입 → 4건 중 3건 오차 +3~7%"
        },
        {
          "code": "ELEV-01",
          "title": "고도 보정은 하지 않기로 결정",
          "cause": "6개 구간 실측 결과 평지에서 고도가 3~4배 과대 계상",
          "fix": "보정 대신 강도 판정에서 고도를 제외"
        }
      ],
      "notes": [],
      "links": []
    },
    "watchman": {
      "summary": "브라우저가 직접 얼굴 방향을 분석해 집중도를 재고, 친구들과 함께 공부하는 스터디 웹 서비스",
      "synopsis": "watchman --calibrate 10s --grace 3s --room <초대코드>",
      "meta": "캡스톤 · 팀 Smokers (3인) · 2026.05 ~ (커밋 77개) · 역할: 백엔드 아키텍처 설계·제작, DB 설계 및 ERD 제작, 백엔드 API 제작",
      "desc": [
        "혼자 공부하면 집중 상태를 객관적으로 알기 어렵고, 동기 부여 수단이 부족하다.",
        "카메라 기반 집중 측정 + 그룹 실시간 공유 + 업적(게임화)으로 풀었다."
      ],
      "arch": [
        {
          "label": "BROWSER",
          "hl": false,
          "items": [
            [
              "MediaPipe",
              "얼굴 방향 분석"
            ],
            [
              "WebRTC",
              "P2P 영상"
            ]
          ]
        },
        {
          "label": "REALTIME",
          "hl": true,
          "items": [
            [
              "WebSocket · STOMP",
              "입장 · 집중 · 채팅 · 시그널"
            ]
          ]
        },
        {
          "label": "SERVER",
          "hl": true,
          "items": [
            [
              "Spring Boot 3.5",
              "Controller → Service → Repository"
            ]
          ]
        },
        {
          "label": "STORAGE",
          "hl": false,
          "items": [
            [
              "MySQL (RDS)",
              "JdbcTemplate · 12 tables"
            ]
          ]
        }
      ],
      "extra": null,
      "options": [
        [
          "--client-side-vision",
          "얼굴 분석은 100% 브라우저에서 → 서버엔 영상 없이 집중 시간(초)만 저장"
        ],
        [
          "--calibrate",
          "10초 캘리브레이션으로 사용자별 임계값, 3초 유예로 순간 고개 돌림 오탐 방지"
        ],
        [
          "--raw-sql",
          "ORM 없이 SQL 직접 작성 (12개 테이블, 그룹 랭킹 집계)"
        ],
        [
          "--achievements",
          "업적 30개: INSERT IGNORE + UNIQUE 키로 중복 지급 방지"
        ]
      ],
      "results": [],
      "bugs": [
        {
          "code": "RTC-01",
          "title": "연결 중 ICE candidate 유실",
          "cause": "remoteDescription 설정 전에 ICE candidate가 먼저 도착",
          "fix": "먼저 온 후보를 큐에 보관했다가 설정 후 일괄 적용"
        },
        {
          "code": "LOOP-01",
          "title": "얼굴 감지 루프가 멈춤",
          "cause": "루프 중간 예외·조기 return으로 다음 프레임 예약이 빠짐",
          "fix": "requestAnimationFrame을 함수 최상단에서 먼저 재등록해 예외가 나도 루프 유지"
        }
      ],
      "notes": [],
      "links": [
        [
          "github(1)",
          "https://github.com/andy051127/watchman-springboot"
        ]
      ]
    },
    "workflow": {
      "summary": "Claude Code와 Codex를 역할별로 나눠 운영하는 멀티 에이전트 AI 개발환경",
      "synopsis": "orca terminal send --terminal <codex> --text \"Read .agent/plan.md\"",
      "meta": "AI 개발환경 · 지침 2종 + Quick Command 6종 · 역할: 설계 · 구성",
      "desc": [
        "AI 하나에 탐색·구현·자기 리뷰를 다 맡기면 단계 경계가 흐려지고, 검증 없이 \"완료\"가 나온다.",
        "역할을 나누고, 대화 대신 문서로 일을 넘기고, 실제 diff와 테스트 결과로만 완료를 판단하게 했다."
      ],
      "arch": [
        {
          "label": "HUMAN",
          "hl": false,
          "items": [
            [
              "개발자",
              "요구사항 · 최종 승인"
            ]
          ]
        },
        {
          "label": "PLAN",
          "hl": true,
          "items": [
            [
              "Claude Code",
              "탐색 · 설계 · 리뷰"
            ]
          ]
        },
        {
          "label": "HANDOFF",
          "hl": true,
          "items": [
            [
              ".agent/",
              "plan · report · review"
            ]
          ]
        },
        {
          "label": "BUILD",
          "hl": false,
          "items": [
            [
              "Codex",
              "구현 · 테스트 · 검증"
            ]
          ]
        }
      ],
      "extra": {
        "label": "LOOP",
        "chain": [
          "plan.md",
          "구현",
          "report.md",
          "리뷰",
          "review.md",
          "재검증"
        ],
        "note": "기능별 Git worktree 안에서 1:1로 협업"
      },
      "options": [
        [
          "--file-handoff",
          "세션끼리 대화 기록이 공유되지 않으므로 .agent/*.md 파일을 작업 계약으로 사용"
        ],
        [
          "--one-line-signal",
          "ORCA 메시지는 \"plan.md를 읽어라\" 같은 한 줄 신호만, 상세 내용은 파일에"
        ],
        [
          "--diff-is-truth",
          "완료 기준은 AI의 말이 아니라 실제 git diff와 테스트·빌드 결과"
        ],
        [
          "--review-p0-p2",
          "리뷰는 P0/P1/P2로 분류, Codex는 리뷰를 그대로 따르지 않고 코드로 재검증"
        ],
        [
          "--human-merge",
          "무단 reset · force push · 임의 commit 금지, 병합은 사람이 결정"
        ]
      ],
      "results": [],
      "bugs": [],
      "notes": [
        "프롬프트 기반 운영 규칙이라 CI·브랜치 보호 같은 기술적 강제는 아님",
        "생산성 향상 수치는 측정하지 않아 주장하지 않음"
      ],
      "links": []
    }
  };

  const MENU_ORDER = ['hawe', 'watchman', 'ridely', 'pikcha'];
  const ABOUT = ["찬희 — Backend & Cloud Developer","신구대학교 컴퓨터소프트웨어과","","Spring Boot와 AWS로 설계부터 배포까지 동작하는 서버를 만듭니다.","LLM처럼 불확실한 부품은 서버 검증과 폴백으로 감싸고,","보안 정책·사설망 같은 현장 제약은 구조로 풉니다."];

  /* 한글은 2칸, 그 밖은 1칸으로 세서 터미널 칸을 맞춤 */
  function padW(s, n) {
    s = String(s);
    let w = 0;
    for (const ch of s) {
      const c = ch.codePointAt(0);
      w += (c >= 0x1100 && c <= 0x115F) || (c >= 0x2E80 && c <= 0xA4CF) || (c >= 0xAC00 && c <= 0xD7A3) || (c >= 0xF900 && c <= 0xFAFF) || (c >= 0xFF00 && c <= 0xFF60) ? 2 : 1;
    }
    return s + ' '.repeat(Math.max(0, n - w));
  }
  function lastLogin() {
    const d = new Date();
    return d.toDateString().slice(0, 10) + ' ' + d.toTimeString().slice(0, 5);
  }

  const HOME = {
    about: ABOUT,
    stack: STACK.map((g) => g.title.toLowerCase().padEnd(16) + g.items.join(' · ')),
    certs: ['STATUS   NAME                                       ISSUER                DATE'].concat(CERTS.map((r) =>
      (r[3] === 'ACQUIRED' ? '[ OK ]   ' : '[ .. ]   ') + padW(r[0], 42) + ' ' + padW(r[1], 21) + ' ' + r[2])),
    contact: ['github   https://github.com/andy051127', 'email    andy051127@gmail.com'],
    workflow: WORKFLOW.md,
    timeline: TIMELINE.map((t, i) => '* ' + t.hash + ' ' + (i === 0 ? '(HEAD -> main) ' : '') + t.date + '  ' + t.title)
  };

  /* =====================================================================
   * 2. 공통 도우미
   * ===================================================================== */
  const $ = (id) => document.getElementById(id);
  const L = (text, kind, pre, preKind) => ({ text: text || '', kind: kind || 'out', pre: pre || '', preKind: preKind || 'out' });
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
  const S = { cwd: '~', hist: [], hIdx: null, booted: false, erd: 'certification' };

  const out = $('term-out');
  const promptRow = $('prompt-row');
  const input = $('cmd-input');
  const skipBtn = $('skip-btn');
  const hint = $('scroll-hint');
  const gui = $('gui');

  /* =====================================================================
   * 3. 부팅
   * ===================================================================== */
  function bootLines() {
    const ok = '[  OK  ] ';
    return [
      L('IBM-compatible BIOS (C) 2026  ·  Memory test: 640K OK', 'muted'),
      L(''),
      L('Booting chanhee-portfolio 2026.11 (x86_64) ...', 'muted', '[    0.000000] ', 'muted'),
      L('Loading modules: java21 spring-boot aws-cli docker', 'muted', '[    0.041233] ', 'muted'),
      L('Mounted /home/chanhee/projects.', 'out', ok, 'accent'),
      L('Started HA`WE daily mission service.', 'out', ok, 'accent'),
      L('Started Pik-Cha! print worker.', 'out', ok, 'accent'),
      L('Started Ridely route optimizer.', 'out', ok, 'accent'),
      L('Started Watchman focus monitor.', 'out', ok, 'accent'),
      L('Reached target Network (ap-northeast-2).', 'out', ok, 'accent'),
      L('Verifying certifications ... 2 in progress.', 'out', '[  ..  ] ', 'warn'),
      L('Reached target Portfolio.', 'out', ok, 'accent'),
      L(''),
      L('guest', 'out', 'chanhee login: ', 'bright'),
      L('Last login: ' + lastLogin() + ' on tty1', 'muted'),
      L('')
    ];
  }
  function banner() {
    const art = [
      '  ____ _                 _               ',
      ' / ___| |__   __ _ _ __ | |__   ___  ___ ',
      "| |   | '_ \\ / _` | '_ \\| '_ \\ / _ \\/ _ \\",
      '| |___| | | | (_| | | | | | | |  __/  __/',
      ' \\____|_| |_|\\__,_|_| |_|_| |_|\\___|\\___|'
    ];
    return art.map((t) => ({ text: t, kind: 'ascii' })).concat([
      L(''),
      L('Backend & Cloud Developer · 신구대학교 컴퓨터소프트웨어과', 'out', 'chanhee@shingu  ', 'accent'),
      L('Spring Boot · AWS · Docker · MySQL/PostgreSQL', 'out', 'stack           ', 'path'),
      L('HA`WE · Pik-Cha! · Ridely · Watchman', 'out', 'projects        ', 'path'),
      L('1 acquired · 2 in progress (Linux Master 1차 합격)', 'out', 'certs           ', 'path'),
      L(''),
      L("'help' 를 입력하거나, 아래로 스크롤해 GUI 모드로 둘러보세요.", 'muted'),
      L('')
    ]);
  }

  function lineEl(l) {
    if (l.kind === 'ascii') return el('div', 'ascii', l.text);
    const d = el('div', 'line');
    if (l.pre) d.appendChild(el('span', 'k-' + l.preKind, l.pre));
    d.appendChild(el('span', 'k-' + l.kind, l.text));
    return d;
  }
  function print(lines) {
    const frag = document.createDocumentFragment();
    lines.forEach((l) => frag.appendChild(lineEl(l)));
    out.insertBefore(frag, promptRow);
    while (out.children.length > 400) out.removeChild(out.firstChild);
    out.scrollTop = out.scrollHeight;
  }
  function clearOut() { while (out.firstChild !== promptRow) out.removeChild(out.firstChild); }

  let bootTimer = null;
  function startBoot() {
    const boot = bootLines();
    let i = 0;
    bootTimer = setInterval(() => {
      if (i >= boot.length) { finishBoot(); return; }
      print([boot[i++]]);
    }, 120);
  }
  function finishBoot() {
    if (S.booted) return;
    clearInterval(bootTimer);
    bootTimer = null;
    clearOut();
    print(bootLines().concat(banner()));
    S.booted = true;
    skipBtn.hidden = true;
    hint.hidden = false;
  }

  /* =====================================================================
   * 4. 명령어 엔진 — 캔버스와 같은 코드 (가상 리눅스 · sudo · 사용자 · 권한)
   * ===================================================================== */
  class DCLogic { constructor() { this.props = { accent: '#4ADE80', crt: true }; this.state = {}; } setState(p) { this.state = Object.assign({}, this.state, p); } }
  class Component extends DCLogic {
    st() { return this.state || {}; }
    L(text, kind, pre, preKind) { return { text: text || '', kind: kind || 'out', pre: pre || '', preKind: preKind || 'out' }; }

    /* ---------- 데이터: 여기만 고치면 터미널과 GUI가 같이 바뀝니다 ---------- */
    stackGroups() {
      return [
        { title: "Backend", items: ["Java", "Spring Boot", "Spring Security · JWT", "MyBatis", "JdbcTemplate", "WebSocket/STOMP", "Python · FastAPI"] },
        { title: "Cloud · Infra", items: ["AWS Lambda", "API Gateway", "S3", "EC2 · RDS", "CloudFront", "Terraform"] },
        { title: "Database", items: ["MySQL", "MariaDB", "PostgreSQL · PostGIS", "DynamoDB", "Flyway"] },
        { title: "AI", items: ["LLM API · Tool use", "Spring AI", "CLIP · ONNX Runtime", "MediaPipe", "TFLite"] },
        { title: "DevOps · Tools", items: ["GitHub Actions", "Testcontainers", "Docker", "Claude Code · Codex", "ORCA"] }
      ];
    }
    certRows() {
      return [
        ['AWS Certified AI Practitioner (AIF-C01)', 'Amazon Web Services', '2026.07', 'ACQUIRED'],
        ['리눅스마스터 2급', 'KAIT', '1차 합격 · 2차 2027.01 응시 예정', 'PASSED_1ST'],
        ['SQLD', 'K-DATA', '2027.02 응시 예정', 'IN_PROGRESS']
      ];
    }
    timelineData() {
      return [
        { hash: "a1f3c2e", date: "2026.11", title: "KAICTS 학술대회 논문 · 발표", desc: "HA`WE를 주제로 논문 제출, 발표 대본 작성" },
        { hash: "e4b8d37", date: "2026.10", title: "Pik-Cha! 학교 EXPO 운영", desc: "10.21 ~ 10.23 · DSLR 포토부스 + 웨이팅 시스템 현장 운영" },
        { hash: "7d21e6b", date: "2026.09", title: "HA`WE 개발 시작", desc: "팀 Sapphire Developers (4인)" },
        { hash: "2d8f6b1", date: "2026.07", title: "Ridely — 2026 관광데이터 활용 공모전", desc: "본선 진출" },
        { hash: "9b7d014", date: "2026.05", title: "Watchman 개발 시작", desc: "팀 Smokers (3인) · 캡스톤" },
        { hash: "0000001", date: "2024.03", title: "신구대학교 컴퓨터소프트웨어과 입학", desc: "init" }
      ];
    }
    projects() {
      return [
        { id: "hawe", name: "HA`WE", file: "hawe.txt", featured: true, tags: ["팀 Sapphire Developers", "KAICTS 학술대회 논문"], summary: "그룹마다 매일 미션이 열리고, 내가 먼저 답해야 그룹원의 답이 보이는 모바일 그룹 앱. LLM 미션 생성과 사진·그림 AI를 서버 검증과 폴백으로 감쌌습니다.", stack: ["Spring Boot", "MyBatis", "LLM API", "CLIP · ONNX", "TFLite"], role: "백엔드 설계 · 구현", period: "2026.09 ~", meta: "역할 · 백엔드 설계 · 구현 · 2026.09 ~",
          md: [
            "# HA`WE",
            "> 그룹마다 매일 미션이 열리고, 내가 먼저 답해야 그룹원의 답이 보이는 모바일 그룹 앱",
            "",
            "- 기간: 2026.09 ~ (커밋 170개)",
            "- 팀: Sapphire Developers (4인) · KAICTS 학술대회 논문",
            "- 역할: 백엔드 아키텍처 설계, ERD 설계, API 구조 설계, 백엔드 API 구현, 비전 서비스 Lambda 구조 설계",
            "- 스택: Spring Boot · Java 25 · MyBatis · Flyway · MySQL(RDS) · Python FastAPI · ONNX · SwiftUI · Jetpack Compose",
            "",
            "## 문제 → 해결",
            "소규모 그룹은 연락이 뜸해지고, 일상을 먼저 올리기가 부담스럽다.",
            "→ 서버가 정해진 시각에 가벼운 미션을 열고, 제출해야만 서로의 답이 보이게 했다.",
            "",
            "## 아키텍처",
            "```",
            "[iOS · SwiftUI]  [Android · Compose]     ← 그림 분류는 기기 안 (TFLite int8)",
            "        │ REST + JWT",
            "        ▼",
            "Spring Boot ──> MyBatis ──> MySQL (RDS)",
            "   ├─ @Scheduled 미션 발행 ──> LLM (서버가 검증 · 폴백)",
            "   ├─ 커밋 후 비동기 ──> Python 비전 서비스 (CLIP + ONNX)",
            "   └─ 파일 저장 ──> S3 (presigned URL)",
            "```",
            "",
            "## 핵심 설계",
            "- 서버 주도 LLM 생성: 틀·시각은 서버가 정하고 LLM은 문장만 채움. 길이·형식·유사도 재검증, 실패 시 고정 문장 폴백",
            "- \"제출해야 열람\"을 앱의 블러가 아니라 서버 423 Locked로 강제",
            "- AI 작업은 커밋 이후 별도 스레드로 분리 → 제출 응답이 AI를 기다리지 않음",
            "- LLM에는 닉네임·제출 내용을 보내지 않음 (개인정보 최소화)",
            "",
            "## 측정 결과",
            "- 그림 모델: Quick, Draw! 테스트셋 top-1 93.1% · int8 모델 158KB",
            "- 사진–주제 적합도: ROC-AUC 0.958 (사진 177장 기준)",
            "- ONNX fp16 전환: 설치 2.3GB → 0.7GB, 시작 36초 → 2초, 판정 변화 0",
            "",
            "## 트러블슈팅",
            "### HTTP-400  비전 서비스 호출 실패",
            "- 원인: Java HTTP 클라이언트의 h2c 업그레이드 요청을 uvicorn이 거절",
            "- 해결: HTTP/1.1로 고정하고, 실제 클라이언트로 재현하는 회귀 테스트 추가",
            "",
            "## 한계",
            "- 실사용자 데이터가 없어 참여율 향상은 주장하지 않음",
            "",
            "## 링크",
            "- GitHub: https://github.com/Maenghansoo1/Sapphire"
          ] },
        { id: "pikcha", name: "Pik-Cha!", file: "pikcha.txt", featured: false, tags: ["학교 EXPO", "하드웨어 + 서버리스"], summary: "캐논 DSLR로 촬영하고 인화·QR 다운로드·문자 안내까지 사람 손 없이 이어지는 DIY 인생네컷 포토부스와 웨이팅 시스템입니다.", stack: ["Python · FastAPI", "Canon EDSDK", "Lambda", "DynamoDB", "S3"], role: "백엔드 · 프린터 서버 · DB", period: "2026.08 ~ 2026.11", meta: "역할 · 백엔드 · 프린터 서버 · DB · 2026.08 ~ 2026.11",
          md: [
            "# Pik-Cha!",
            "> DSLR로 찍고, 인화하고, 문자까지 — 사람 손 없이 흘러가는 인생네컷 포토부스 + 웨이팅 시스템",
            "",
            "- 기간: 2026.08 ~ 2026.11 (커밋 55개)",
            "- 목적: 학교 EXPO 현장 운영",
            "- 역할: 백엔드 Lambda, 로컬 프린터 서버, 프론트 API 연동, DynamoDB 설계",
            "- 스택: Python · FastAPI · Canon EDSDK · AWS Lambda · API Gateway · DynamoDB · S3 · SOLAPI",
            "",
            "## 흐름",
            "QR로 웨이팅 등록 → 순번 발급 → 부스에서 순번 입력 → 4컷 촬영",
            "→ 프레임 합성 → 업로드 → 자동 인화 → 완료 문자",
            "",
            "## 아키텍처",
            "```",
            "[손님 폰]   웨이팅 웹 (S3 정적) ──┐",
            "[부스 PC]   FastAPI + EDSDK ──────┼──> API Gateway ──> Lambda ×5 ──> DynamoDB · S3",
            "[프린터 PC] 프린트 워커 (폴링) ───┘                        └──> SOLAPI (문자)",
            "```",
            "",
            "## 핵심 설계",
            "- EDSDK 전용 스레드 + 메시지 큐 펌핑으로 SDK의 스레드 제약 해결",
            "- 학교 보안 정책상 PC에 AWS 키를 둘 수 없어 Presigned URL로 업로드",
            "- 사설망이라 통신은 항상 로컬 → AWS 방향 (프린터는 푸시 대신 폴링)",
            "- DynamoDB 원자적 ADD로 웨이팅 순번 중복 발급 방지",
            "- 카메라가 없으면 Mock 촬영으로 전환해 전체 파이프라인 테스트 가능",
            "",
            "## 트러블슈팅",
            "### RACE-01  처리 순서에 따라 세션 정보가 사라짐",
            "- 원인: put_item이 먼저 기록된 이름·전화번호를 통째로 덮어씀",
            "- 해결: update_item + if_not_exists로 기존 값을 지키며 상태만 채움",
            "",
            "### PRINT-01  인쇄가 끝나기 전에 문자가 갈 수 있음",
            "- 원인: 인쇄 명령을 보낸 시점과 실제 출력 완료 시점이 다름",
            "- 해결: Windows 스풀 큐가 완전히 빈 뒤에만 완료 보고 · 문자 발송, 중복 발송 플래그",
            "",
            "## 회고",
            "- 웨이팅 번호와 세션이 DB에서 직접 연결되지 않아 문자 누락 가능 → 서버가 연결 관계를 기록하는 것이 개선안",
            "",
            "## 링크",
            "- GitHub: https://github.com/andy051127/pik-cha"
          ] },
        { id: "ridely", name: "Ridely", file: "ridely.txt", featured: false, tags: ["2026 관광데이터 활용 공모전", "팀 git push --force"], summary: "흩어진 자전거 인프라와 관광 데이터를 엮어, AI 코치가 목적에 맞는 한강 자전거길 코스를 설계해주는 앱입니다.", stack: ["Spring Boot", "Spring AI", "PostGIS", "Terraform", "GitHub Actions"], role: "프론트 · 백엔드 리팩터링", period: "2026.07", meta: "역할 · 프론트 · 백엔드 리팩터링 · 2026.07 · 본선 진출",
          md: [
            "# Ridely",
            "> 흩어진 자전거 인프라와 관광 데이터를 엮어 코스를 설계하는 AI 트레이너 \"Coach Ridely\"",
            "",
            "- 출품: 2026 관광데이터 활용 공모전 (한국관광공사) · 웹·앱 부문",
            "- 기간: 2026.07 · 결과: 본선 진출",
            "- 팀: git push --force · 역할: 프론트엔드, 백엔드 일부 리팩터링",
            "- 스택: Spring Boot · Spring AI · PostgreSQL + PostGIS · MyBatis · Flyway · Cordova · Terraform · GitHub Actions",
            "",
            "## 문제 → 해결",
            "급수대·수리소·따릉이·사고다발지·관광지 정보가 기관별로 흩어져 있다.",
            "→ 공공데이터 5종 이상을 통합하고, \"12km, 풍경 위주, 물 마실 곳 있게\" 같은 목적 기반 코스를 만든다.",
            "",
            "## 아키텍처",
            "```",
            "[Android (Cordova)] ──> CloudFront ──> EC2 · Spring Boot ──> RDS (PostGIS)",
            "                                           ├──> LLM (Bedrock · Gemini · LiteLLM)",
            "                                           └──> ORS · Kakao · TourAPI · TAAS",
            "```",
            "",
            "## 코스 추천 파이프라인",
            "검증 → 멱등성 → PostGIS 후보 수집 → LLM 경유지 선택 → 경로 생성 → 거리 보정 → 코치 코멘트",
            "",
            "## 핵심 설계",
            "- LLM을 믿지 않는 설계: 후보에 없는 ID(환각)는 재시도 후 규칙 기반 폴백, 폴백 결과는 \"FALLBACK\"으로 정직하게 표시",
            "- 위치정보 서버 무전송: 주변 인프라는 전체 목록을 받아 폰에서 필터링, 계약 테스트로 고정",
            "- 환경변수 하나로 LLM 공급자 전환 → 운영 중 권한 회수 일정에 코드 변경 없이 대응",
            "- Terraform으로 AWS 정의, PR마다 Testcontainers 통합 테스트, main 병합 시 자동 배포",
            "",
            "## 트러블슈팅",
            "### DIST-01  목표 12km인데 코스가 6~7km",
            "- 시도: 후보 정렬·상한 해제 등 4번 실패 → 데이터로 원인을 다시 정의",
            "- 해결: 거리 책임을 LLM에서 서비스 단계로 옮겨 PostGIS로 연장점 삽입 → 4건 중 3건 오차 +3~7%",
            "",
            "### ELEV-01  고도 보정은 하지 않기로 결정",
            "- 근거: 6개 구간 실측 결과 평지에서 고도가 3~4배 과대 계상 → 강도 판정에서 고도 제외",
          ] },
        { id: "watchman", name: "Watchman", file: "watchman.txt", featured: false, tags: ["캡스톤", "팀 Smokers"], summary: "브라우저가 직접 얼굴 방향을 분석해 집중도를 재고, 친구들과 실시간으로 함께 공부하는 스터디 웹 서비스입니다.", stack: ["Spring Boot 3.5", "JdbcTemplate", "STOMP", "WebRTC", "MediaPipe"], role: "백엔드 설계 · 제작 · DB", period: "2026.05 ~", meta: "역할 · 백엔드 설계 · 제작 · DB · 2026.05 ~",
          md: [
            "# Watchman",
            "> 브라우저가 직접 얼굴 방향을 분석해 집중도를 재고, 친구들과 함께 공부하는 스터디 웹 서비스",
            "",
            "- 기간: 2026.05 ~ (커밋 77개)",
            "- 팀: Smokers (3인) · 역할: 백엔드 아키텍처 설계·제작, DB 설계 및 ERD 제작, 백엔드 API 제작",
            "- 스택: Spring Boot 3.5 · Java 25 · JdbcTemplate · MySQL 8 · WebSocket(STOMP) · WebRTC · MediaPipe",
            "",
            "## 문제 → 해결",
            "혼자 공부하면 집중 상태를 객관적으로 알기 어렵고, 동기 부여 수단이 부족하다.",
            "→ 카메라 기반 집중 측정 + 그룹 실시간 공유 + 업적(게임화)",
            "",
            "## 아키텍처",
            "```",
            "[브라우저 + MediaPipe] ── WebRTC P2P (영상) ── [브라우저 + MediaPipe]",
            "        │ REST                    │ STOMP (입장 · 집중 · 채팅 · 시그널)",
            "        ▼                         ▼",
            "Spring Boot: Controller → Service → Repository (JdbcTemplate) ──> MySQL (RDS)",
            "```",
            "",
            "## 핵심 설계",
            "- 얼굴 분석은 100% 브라우저에서 → 서버엔 영상 없이 집중 시간(초)만 저장",
            "- 10초 캘리브레이션으로 사용자별 임계값, 3초 유예로 순간 고개 돌림 오탐 방지",
            "- ORM 없이 SQL 직접 작성 (12개 테이블, 그룹 랭킹 집계)",
            "- 업적 30개: INSERT IGNORE + UNIQUE 키로 중복 지급 방지",
            "",
            "## 트러블슈팅",
            "### RTC-01  연결 중 ICE candidate 유실",
            "- 원인: remoteDescription 설정 전에 ICE candidate가 먼저 도착",
            "- 해결: 먼저 온 후보를 큐에 보관했다가 설정 후 일괄 적용",
            "",
            "### LOOP-01  얼굴 감지 루프가 멈춤",
            "- 해결: requestAnimationFrame을 함수 최상단에서 먼저 재등록해 예외가 나도 루프 유지",
            "",
            "## 링크",
            "- GitHub: https://github.com/andy051127/watchman-springboot"
          ] }
      ];
    }
    workflow() {
      return { id: 'workflow', name: 'Engineering Workflow', file: 'workflow.txt',
        md: [
            "# Engineering Workflow (ORCA)",
            "> Claude Code와 Codex를 역할별로 나눠 운영하는 멀티 에이전트 AI 개발환경",
            "",
            "- 형태: 에이전트 지침 2종(CLAUDE.md · AGENTS.md) + Quick Command 6종",
            "- 역할: 설계 · 구성",
            "- 도구: ORCA CLI · Claude Code · OpenAI Codex · Git worktree",
            "",
            "## 왜 만들었나",
            "AI 하나에 탐색·구현·자기 리뷰를 다 맡기면 단계 경계가 흐려지고, 검증 없이 \"완료\"가 나온다.",
            "",
            "## 구조",
            "```",
            "개발자 (요구사항 · 최종 승인)",
            "   │  ORCA 터미널",
            "   ▼",
            "Claude Code  ── plan.md ──>   Codex",
            "탐색·설계·리뷰 <── report.md ── 구현·테스트·검증",
            "             ── review.md ──>",
            "      (기능별 Git worktree 안에서 1:1 협업)",
            "```",
            "",
            "## 핵심 설계",
            "- 세션끼리 대화 기록이 공유되지 않으므로 .agent/*.md 파일을 작업 계약으로 사용",
            "- ORCA 메시지는 \"plan.md를 읽어라\" 같은 한 줄 신호만, 상세 내용은 파일에",
            "- 완료 기준은 AI의 말이 아니라 실제 git diff와 테스트·빌드 결과",
            "- 리뷰는 P0/P1/P2로 분류, Codex는 리뷰를 그대로 따르지 않고 코드로 재검증",
            "- 무단 reset · force push · 임의 commit 금지, 병합은 사람이 결정",
            "",
            "## 한계",
            "- 프롬프트 기반 운영 규칙이라 CI·브랜치 보호 같은 기술적 강제는 아님",
            "- 생산성 향상 수치는 측정하지 않아 주장하지 않음"
          ] };
    }
    docs() { return this.projects().concat([this.workflow()]); }
    manData() {
      return {
        "hawe": {"summary": "그룹마다 매일 미션이 열리고, 내가 먼저 답해야 그룹원의 답이 보이는 모바일 그룹 앱", "synopsis": "hawe --group <초대코드> --mission daily --submit-to-unlock", "meta": "팀 Sapphire Developers (4인) · 2026.09 ~ · 역할: 백엔드 아키텍처 설계, ERD 설계, API 구조 설계, 백엔드 API 구현, 비전 서비스 Lambda 구조 설계 · KAICTS 학술대회 논문", "desc": ["소규모 그룹은 연락이 뜸해지고, 일상을 먼저 올리기가 부담스럽다.", "서버가 정해진 시각에 가벼운 미션을 열고, 제출해야만 서로의 답이 보이게 했다."], "arch": [{"label": "CLIENT", "hl": false, "items": [["iOS · SwiftUI", ""], ["Android · Compose", "그림 분류는 기기 안"]]}, {"label": "API", "hl": true, "items": [["Spring Boot", "REST + JWT · MyBatis"], ["@Scheduled", "미션 자동 발행"]]}, {"label": "AI", "hl": true, "items": [["LLM", "미션 문장 · 서버가 검증"], ["비전 서비스", "CLIP + ONNX"]]}, {"label": "STORAGE", "hl": false, "items": [["MySQL (RDS)", "Flyway"], ["S3", "presigned URL"]]}], "extra": null, "options": [["--server-driven-llm", "틀·시각은 서버가 정하고 LLM은 문장만 채움. 길이·형식·유사도 재검증, 실패 시 고정 문장 폴백"], ["--locked", "\"제출해야 열람\"을 앱의 블러가 아니라 서버 423 Locked로 강제"], ["--async-ai", "AI 작업은 커밋 이후 별도 스레드로 분리 → 제출 응답이 AI를 기다리지 않음"], ["--privacy", "LLM에는 닉네임·제출 내용을 보내지 않음"]], "results": ["그림 모델: Quick, Draw! 테스트셋 top-1 93.1% · int8 모델 158KB", "사진–주제 적합도: ROC-AUC 0.958 (사진 177장 기준)", "ONNX fp16 전환: 설치 2.3GB → 0.7GB, 시작 36초 → 2초, 판정 변화 0"], "bugs": [{"code": "HTTP-400", "title": "비전 서비스 호출 실패", "cause": "Java HTTP 클라이언트의 h2c 업그레이드 요청을 uvicorn이 거절", "fix": "HTTP/1.1로 고정하고, 실제 클라이언트로 재현하는 회귀 테스트 추가"}], "notes": ["실사용자 데이터가 없어 참여율 향상은 주장하지 않음"], "links": [["github(1)", "https://github.com/Maenghansoo1/Sapphire"]]},
        "pikcha": {"summary": "DSLR로 찍고, 인화하고, 문자까지 — 사람 손 없이 흘러가는 인생네컷 포토부스 + 웨이팅 시스템", "synopsis": "pikcha --dslr canon-800d --print selphy-cp1500 --sms", "meta": "학교 EXPO · 2026.08 ~ 2026.11 (커밋 55개) · EXPO 2026.10.21 ~ 10.23 · 역할: 백엔드 Lambda, 로컬 프린터 서버, 프론트 API 연동, DynamoDB 설계", "desc": ["QR로 웨이팅 등록 → 순번 발급 → 부스에서 순번 입력 → 4컷 촬영", "→ 프레임 합성 → 업로드 → 자동 인화 → 완료 문자까지 사람 개입 없이 이어지게 만들었다."], "arch": [{"label": "CLIENT", "hl": false, "items": [["손님 폰", "웨이팅 웹 (S3)"], ["부스 PC", "FastAPI + EDSDK"]]}, {"label": "EDGE", "hl": true, "items": [["API Gateway", "단일 진입점"]]}, {"label": "COMPUTE", "hl": true, "items": [["Lambda ×5", "presign · print · waitlist …"]]}, {"label": "STORAGE", "hl": false, "items": [["DynamoDB", "세션 · 인쇄 큐 · 웨이팅"], ["S3", "사진 원본"]]}], "extra": {"label": "ON-SITE", "chain": ["프린트 워커", "Canon SELPHY", "SOLAPI 문자"], "note": "인쇄 큐를 5초마다 가져와 출력하고, 스풀 큐가 비면 완료 문자 발송"}, "options": [["--edsdk-worker", "EDSDK 전용 스레드 + 메시지 큐 펌핑으로 SDK의 스레드 제약 해결"], ["--presigned", "학교 보안 정책상 PC에 AWS 키를 둘 수 없어 Presigned URL로 업로드"], ["--pull-only", "사설망이라 통신은 항상 로컬 → AWS 방향 (프린터는 푸시 대신 폴링)"], ["--atomic-ticket", "DynamoDB 원자적 ADD로 웨이팅 순번 중복 발급 방지"], ["--mock", "카메라가 없으면 Mock 촬영으로 전환해 전체 파이프라인 테스트"]], "results": [], "bugs": [{"code": "RACE-01", "title": "처리 순서에 따라 세션 정보가 사라짐", "cause": "put_item이 먼저 기록된 이름·전화번호를 통째로 덮어씀", "fix": "update_item + if_not_exists로 기존 값을 지키며 상태만 채움"}, {"code": "PRINT-01", "title": "인쇄가 끝나기 전에 문자가 갈 수 있음", "cause": "인쇄 명령을 보낸 시점과 실제 출력 완료 시점이 다름", "fix": "Windows 스풀 큐가 완전히 빈 뒤에만 완료 보고 · 문자 발송, 중복 발송 플래그"}], "notes": ["웨이팅 번호와 세션이 DB에서 직접 연결되지 않아 문자 누락 가능 → 서버가 연결 관계를 기록하는 것이 개선안"], "links": [["github(1)", "https://github.com/andy051127/pik-cha"]]},
        "ridely": {"summary": "흩어진 자전거 인프라와 관광 데이터를 엮어 코스를 설계하는 AI 트레이너 \"Coach Ridely\"", "synopsis": "ridely --from <출발> --to <도착> --distance 12km --priority scenery", "meta": "2026 관광데이터 활용 공모전 (한국관광공사) · 2026.07 · 본선 진출 · 팀 git push --force · 역할: 프론트엔드, 백엔드 일부 리팩터링", "desc": ["급수대·수리소·따릉이·사고다발지·관광지 정보가 기관별로 흩어져 있다.", "공공데이터 5종 이상을 통합하고, \"12km, 풍경 위주, 물 마실 곳 있게\" 같은 목적 기반 코스를 만든다."], "arch": [{"label": "CLIENT", "hl": false, "items": [["Android", "Cordova"]]}, {"label": "EDGE", "hl": true, "items": [["CloudFront", ""]]}, {"label": "SERVER", "hl": true, "items": [["Spring Boot", "EC2 · 코스 파이프라인"]]}, {"label": "DATA", "hl": false, "items": [["PostgreSQL", "PostGIS"], ["LLM", "Bedrock · Gemini · LiteLLM"], ["공공 API", "ORS · Kakao · TourAPI · TAAS"]]}], "extra": {"label": "PIPELINE", "chain": ["검증", "PostGIS 후보", "LLM 경유지", "경로 생성", "거리 보정", "코치 코멘트"], "note": ""}, "options": [["--distrust-llm", "후보에 없는 ID(환각)는 재시도 후 규칙 기반 폴백, 폴백 결과는 \"FALLBACK\"으로 정직하게 표시"], ["--no-location-upload", "주변 인프라는 전체 목록을 받아 폰에서 필터링, 계약 테스트로 고정"], ["--llm-provider", "환경변수 하나로 LLM 공급자 전환 → 운영 중 권한 회수 일정에 코드 변경 없이 대응"], ["--iac", "Terraform으로 AWS 정의, PR마다 Testcontainers 통합 테스트, main 병합 시 자동 배포"]], "results": [], "bugs": [{"code": "DIST-01", "title": "목표 12km인데 코스가 6~7km", "cause": "후보 정렬·상한 해제 등 4번 시도가 실패, 데이터로 원인을 다시 정의", "fix": "거리 책임을 LLM에서 서비스 단계로 옮겨 PostGIS로 연장점 삽입 → 4건 중 3건 오차 +3~7%"}, {"code": "ELEV-01", "title": "고도 보정은 하지 않기로 결정", "cause": "6개 구간 실측 결과 평지에서 고도가 3~4배 과대 계상", "fix": "보정 대신 강도 판정에서 고도를 제외"}], "notes": [], "links": []},
        "watchman": {"summary": "브라우저가 직접 얼굴 방향을 분석해 집중도를 재고, 친구들과 함께 공부하는 스터디 웹 서비스", "synopsis": "watchman --calibrate 10s --grace 3s --room <초대코드>", "meta": "캡스톤 · 팀 Smokers (3인) · 2026.05 ~ (커밋 77개) · 역할: 백엔드 아키텍처 설계·제작, DB 설계 및 ERD 제작, 백엔드 API 제작", "desc": ["혼자 공부하면 집중 상태를 객관적으로 알기 어렵고, 동기 부여 수단이 부족하다.", "카메라 기반 집중 측정 + 그룹 실시간 공유 + 업적(게임화)으로 풀었다."], "arch": [{"label": "BROWSER", "hl": false, "items": [["MediaPipe", "얼굴 방향 분석"], ["WebRTC", "P2P 영상"]]}, {"label": "REALTIME", "hl": true, "items": [["WebSocket · STOMP", "입장 · 집중 · 채팅 · 시그널"]]}, {"label": "SERVER", "hl": true, "items": [["Spring Boot 3.5", "Controller → Service → Repository"]]}, {"label": "STORAGE", "hl": false, "items": [["MySQL (RDS)", "JdbcTemplate · 12 tables"]]}], "extra": null, "options": [["--client-side-vision", "얼굴 분석은 100% 브라우저에서 → 서버엔 영상 없이 집중 시간(초)만 저장"], ["--calibrate", "10초 캘리브레이션으로 사용자별 임계값, 3초 유예로 순간 고개 돌림 오탐 방지"], ["--raw-sql", "ORM 없이 SQL 직접 작성 (12개 테이블, 그룹 랭킹 집계)"], ["--achievements", "업적 30개: INSERT IGNORE + UNIQUE 키로 중복 지급 방지"]], "results": [], "bugs": [{"code": "RTC-01", "title": "연결 중 ICE candidate 유실", "cause": "remoteDescription 설정 전에 ICE candidate가 먼저 도착", "fix": "먼저 온 후보를 큐에 보관했다가 설정 후 일괄 적용"}, {"code": "LOOP-01", "title": "얼굴 감지 루프가 멈춤", "cause": "루프 중간 예외·조기 return으로 다음 프레임 예약이 빠짐", "fix": "requestAnimationFrame을 함수 최상단에서 먼저 재등록해 예외가 나도 루프 유지"}], "notes": [], "links": [["github(1)", "https://github.com/andy051127/watchman-springboot"]]},
        "workflow": {"summary": "Claude Code와 Codex를 역할별로 나눠 운영하는 멀티 에이전트 AI 개발환경", "synopsis": "orca terminal send --terminal <codex> --text \"Read .agent/plan.md\"", "meta": "AI 개발환경 · 지침 2종 + Quick Command 6종 · 역할: 설계 · 구성", "desc": ["AI 하나에 탐색·구현·자기 리뷰를 다 맡기면 단계 경계가 흐려지고, 검증 없이 \"완료\"가 나온다.", "역할을 나누고, 대화 대신 문서로 일을 넘기고, 실제 diff와 테스트 결과로만 완료를 판단하게 했다."], "arch": [{"label": "HUMAN", "hl": false, "items": [["개발자", "요구사항 · 최종 승인"]]}, {"label": "PLAN", "hl": true, "items": [["Claude Code", "탐색 · 설계 · 리뷰"]]}, {"label": "HANDOFF", "hl": true, "items": [[".agent/", "plan · report · review"]]}, {"label": "BUILD", "hl": false, "items": [["Codex", "구현 · 테스트 · 검증"]]}], "extra": {"label": "LOOP", "chain": ["plan.md", "구현", "report.md", "리뷰", "review.md", "재검증"], "note": "기능별 Git worktree 안에서 1:1로 협업"}, "options": [["--file-handoff", "세션끼리 대화 기록이 공유되지 않으므로 .agent/*.md 파일을 작업 계약으로 사용"], ["--one-line-signal", "ORCA 메시지는 \"plan.md를 읽어라\" 같은 한 줄 신호만, 상세 내용은 파일에"], ["--diff-is-truth", "완료 기준은 AI의 말이 아니라 실제 git diff와 테스트·빌드 결과"], ["--review-p0-p2", "리뷰는 P0/P1/P2로 분류, Codex는 리뷰를 그대로 따르지 않고 코드로 재검증"], ["--human-merge", "무단 reset · force push · 임의 commit 금지, 병합은 사람이 결정"]], "results": [], "bugs": [], "notes": ["프롬프트 기반 운영 규칙이라 CI·브랜치 보호 같은 기술적 강제는 아님", "생산성 향상 수치는 측정하지 않아 주장하지 않음"], "links": []}
      };
    }
    homeFiles() {
      const certs = ['STATUS   NAME                                       ISSUER                DATE'].concat(this.certRows().map((r) => (r[3] === 'ACQUIRED' ? '[ OK ]   ' : '[ .. ]   ') + this.padW(r[0], 42) + ' ' + this.padW(r[1], 21) + ' ' + r[2]));
      return {
        about: ['찬희 — Backend & Cloud Developer', '신구대학교 컴퓨터소프트웨어과', '', 'Spring Boot와 AWS로 설계부터 배포까지 동작하는 서버를 만듭니다.', 'LLM처럼 불확실한 부품은 서버 검증과 폴백으로 감싸고,', '보안 정책·사설망 같은 현장 제약은 구조로 풉니다.'],
        stack: this.stackGroups().map((g) => g.title.toLowerCase().padEnd(16) + g.items.join(' · ')),
        certs: certs,
        contact: ['github   https://github.com/andy051127', 'email    andy051127@gmail.com'],
        workflow: this.workflow().md,
        timeline: this.timelineData().map((t, i) => '* ' + t.hash + ' ' + (i === 0 ? '(HEAD -> main) ' : '') + t.date + '  ' + t.title)
      };
    }

    /* ---------- 부팅 (그대로) ---------- */
    bootLines() {
      const ok = '[  OK  ] ';
      return [
        this.L('IBM-compatible BIOS (C) 2026  ·  Memory test: 640K OK', 'muted'),
        this.L(''),
        this.L('Booting chanhee-portfolio 2026.11 (x86_64) ...', 'muted', '[    0.000000] ', 'muted'),
        this.L('Loading modules: java21 spring-boot aws-cli docker', 'muted', '[    0.041233] ', 'muted'),
        this.L('Mounted /home/chanhee/projects.', 'out', ok, 'accent'),
        this.L('Started HA`WE daily mission service.', 'out', ok, 'accent'),
        this.L('Started Pik-Cha! print worker.', 'out', ok, 'accent'),
        this.L('Started Ridely route optimizer.', 'out', ok, 'accent'),
        this.L('Started Watchman focus monitor.', 'out', ok, 'accent'),
        this.L('Reached target Network (ap-northeast-2).', 'out', ok, 'accent'),
        this.L('Verifying certifications ... 2 in progress.', 'out', '[  ..  ] ', 'warn'),
        this.L('Reached target Portfolio.', 'out', ok, 'accent'),
        this.L(''),
        this.L('guest', 'out', 'chanhee login: ', 'bright'),
        this.L('Last login: ' + this.lastLogin() + ' on tty1', 'muted'),
        this.L('')
      ];
    }
    banner() {
      const art = [
        "  ____ _                 _               ",
        " / ___| |__   __ _ _ __ | |__   ___  ___ ",
        "| |   | '_ \\ / _` | '_ \\| '_ \\ / _ \\/ _ \\",
        "| |___| | | | (_| | | | | | | |  __/  __/",
        " \\____|_| |_|\\__,_|_| |_|_| |_|\\___|\\___|"
      ];
      return art.map((t) => ({ text: t, kind: 'ascii' })).concat([
        this.L(''),
        this.L('Backend & Cloud Developer · 신구대학교 컴퓨터소프트웨어과', 'out', 'chanhee@shingu  ', 'accent'),
        this.L('Spring Boot · AWS · Docker · MySQL/PostgreSQL', 'out', 'stack           ', 'path'),
        this.L('HA`WE · Pik-Cha! · Ridely · Watchman', 'out', 'projects        ', 'path'),
        this.L('1 acquired · 2 in progress (Linux Master 1차 합격)', 'out', 'certs           ', 'path'),
        this.L(''),
        this.L("'help' 를 입력하거나, 아래로 스크롤해 GUI 모드로 둘러보세요.", 'muted'),
        this.L('')
      ]);
    }
    padW(s, n) {
      s = String(s);
      let w = 0;
      for (const ch of s) {
        const c = ch.codePointAt(0);
        w += (c >= 0x1100 && c <= 0x115F) || (c >= 0x2E80 && c <= 0xA4CF) || (c >= 0xAC00 && c <= 0xD7A3) || (c >= 0xF900 && c <= 0xFAFF) || (c >= 0xFF00 && c <= 0xFF60) ? 2 : 1;
      }
      return s + ' '.repeat(Math.max(0, n - w));
    }
    promptStr(cwd) { const me = this.me(); return me.name + '@chanhee:' + this.dispPath(this.absCwd(cwd)) + (me.uid === 0 ? '# ' : '$ '); }
    lastLogin() { try { const d = new Date(); return d.toDateString().slice(0, 10) + ' ' + d.toTimeString().slice(0, 5); } catch (e) { return ''; } }
    rvRefs() {
      if (!this._rvRefs) {
        this._rvRefs = {};
        ['intro', 'stack', 'projects', 'workflow', 'certs', 'timeline', 'contact'].forEach((k) => {
          this._rvRefs[k] = (el) => { if (!el) return; el.dataset.rv = k; this.rvEls = this.rvEls || {}; this.rvEls[k] = el; if (this.io) this.io.observe(el); };
        });
      }
      return this._rvRefs;
    }
    stopBoot() { if (this.timer) { clearInterval(this.timer); this.timer = null; } }
    routeId() {
      try { const m = (window.location.hash || '').match(/^#(?:man|vi)\/([A-Za-z0-9._-]+)$/); return m ? decodeURIComponent(m[1]) : null; } catch (e) { return null; }
    }
    findProject(x) {
      const n = String(x || '').toLowerCase();
      return this.docs().find((p) => p.id === n || p.file === n || p.file.replace(/\.txt$/, '') === n || (p.id === 'workflow' && n === 'orca'));
    }
    openRoute() {
      const id = this.routeId();
      const s = this.st();
      if (id) {
        const p = this.findProject(id);
        if (!p || s.man === p.id) return;
        this.finishBoot();
        this.returnFocus = false;
        this.pushed = false;
        this.setState({ man: p.id, manBug: 0, manCmd: '', manMsg: '', vim: null });
      } else if (s.man) {
        this.setState({ man: null, manCmd: '', manMsg: '' });
      }
    }
    pushRoute(id) {
      if (!id) return;
      try { if (window.location.hash !== '#man/' + id) { window.history.pushState(null, '', '#man/' + id); this.pushed = true; } } catch (e) {}
    }
    menuPos() {
      const b = this.menuBtnEl, sec = this.secEl;
      if (!b || !sec) return '8px';
      const l = b.getBoundingClientRect().left - sec.getBoundingClientRect().left;
      return Math.max(8, Math.min(l, sec.clientWidth - 276)) + 'px';
    }
    componentDidMount() {
      try {
        this.onHash = () => this.openRoute();
        window.addEventListener('hashchange', this.onHash);
        window.addEventListener('popstate', this.onHash);
        if (window.visualViewport) {
          this.onVV = () => { const h = Math.round(window.visualViewport.height); if (h !== this.st().vvh) this.setState({ vvh: h }); };
          window.visualViewport.addEventListener('resize', this.onVV);
        }
      } catch (e) {}
      try {
        if (typeof IntersectionObserver !== 'undefined') {
          this.io = new IntersectionObserver((entries) => {
            const add = {};
            entries.forEach((en) => { if (en.isIntersecting) { add[en.target.dataset.rv] = 'in'; this.io.unobserve(en.target); } });
            if (Object.keys(add).length) this.setState({ rv: Object.assign({}, this.st().rv, add) });
          }, { threshold: 0.12 });
          Object.values(this.rvEls || {}).forEach((el) => this.io.observe(el));
        } else {
          this.setState({ rv: { intro: 'in', stack: 'in', projects: 'in', workflow: 'in', certs: 'in', timeline: 'in', contact: 'in' } });
        }
      } catch (e) {}
      if (this.findProject(this.routeId())) { this.openRoute(); return; }
      const boot = this.bootLines();
      this.timer = setInterval(() => {
        const s = this.st();
        const i = s.bootIdx || 0;
        if (i >= boot.length) { this.finishBoot(); return; }
        this.setState({ lines: (s.lines || []).concat([boot[i]]), bootIdx: i + 1 });
      }, 120);
    }
    componentWillUnmount() {
      this.stopBoot();
      this.stopGlobe();
      if (this.sxTimer) clearTimeout(this.sxTimer);
      if (this.backTimer) clearTimeout(this.backTimer);
      if (this.sxTimer2) clearTimeout(this.sxTimer2);
      if (this.io) this.io.disconnect();
      try {
        if (this.onHash) { window.removeEventListener('hashchange', this.onHash); window.removeEventListener('popstate', this.onHash); }
        if (this.onVV && window.visualViewport) window.visualViewport.removeEventListener('resize', this.onVV);
      } catch (e) {}
    }
    componentDidUpdate() {
      const s = this.st();
      const len = (s.lines || []).length;
      if (this.outEl && this.lastLen !== len) { this.lastLen = len; this.outEl.scrollTop = this.outEl.scrollHeight; }
      const open = !!s.vim;
      if (open !== this.lastVim) {
        this.lastVim = open;
        if (open && this.vimEl) this.vimEl.focus();
        if (!open) {
          if (this.returnFocus && this.termEl) this.termEl.focus({ preventScroll: true });
          else if (this.returnEl && this.returnEl.focus) this.returnEl.focus({ preventScroll: true });
          this.returnEl = null;
        }
      }
      const manOpen = !!s.man;
      if (manOpen !== this.lastMan) {
        this.lastMan = manOpen;
        if (manOpen && this.manCloseEl) this.manCloseEl.focus();
        if (!manOpen) {
          if (this.returnFocus && this.termEl) this.termEl.focus({ preventScroll: true });
          else if (this.returnEl && this.returnEl.focus) this.returnEl.focus({ preventScroll: true });
          this.returnEl = null;
        }
      }
      const secOpen = !!s.secret;
      if (secOpen !== this.lastSecret) {
        this.lastSecret = secOpen;
        if (secOpen) { this.startGlobe(); if (this.secCloseEl) this.secCloseEl.focus(); }
        else { this.stopGlobe(); if (this.returnFocus && this.termEl) this.termEl.focus({ preventScroll: true }); }
      }
      const imgOpen = !!s.img;
      if (imgOpen !== this.lastImg) {
        this.lastImg = imgOpen;
        if (imgOpen && this.imgEl) this.imgEl.focus();
        if (!imgOpen && this.returnFocus && this.termEl) this.termEl.focus({ preventScroll: true });
      }
    }
    finishBoot() {
      this.stopBoot();
      if (this.st().booted) return;
      this.setState({ booted: true, lines: this.bootLines().concat(this.banner()) });
    }


    /* ---------- /.secrets : 도는 지구 ---------- */
    earthMask() {
      if (this.maskBits) return this.maskBits;
      const hex = "0000000000000000000000000000000000000000000000000000015fffe0000c80400000000082e7ffc00800001800000001d7f07fc0000207f7400007ed7b5c3f800f80affffffbffffff8c3c101d9fffffffff0ffffe1818007bffffffffce020ffe1e000011fffffffc200007ffdf80032ffffffff0200003ffff0000fffffffff8000001fffe0001fffffffff8000001fff800039e1ffffff6000001fff000032dffffff44000000fff00002e03fffff280000007fc00007f67fffff000000003c200007fffbffff000000001c00000fffbc3ffe000000000c90000fffdf1e70000000000780000fffdc0c78800000000040000fffe0083800000000000f000ffffc0c0140000000001fc0077ff8000100000000001fe0001ff0003200000000003ff0003fe0001650000000003ffe001fc0000006000000001ffe000fe0000001000000000ffc001fe00000100000000007fc001fc800007a0000000007f8000f880001ff0000000007e0000f880003ff8000000007e0000f800003ff8000000007c00007000001df800000000780000000000007020000000e00000000000000020000000600000000000000040000000c00000000000000000000000c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000030000001fcfffffc000000c03000ffffffffffff0007fffe000ffffffffffffe000fffff021ffffffffffffe087ffffffffffffffffffffffffffffffffffffffffffffff";
      const W = 96, H = 48, bits = new Uint8Array(W * H);
      for (let j = 0; j < H; j++) {
        for (let k = 0; k < 24; k++) {
          const v = parseInt(hex.charAt(j * 24 + k), 16);
          for (let b = 0; b < 4; b++) bits[j * W + k * 4 + b] = (v >> (3 - b)) & 1;
        }
      }
      this.maskBits = bits;
      return bits;
    }
    globeFrame(rot) {
      const mask = this.earthMask();
      const R = 13, ASP = 2.5, C = 70, ROWS = 2 * R + 3;
      const cx = (C - 1) / 2, cy = (ROWS - 1) / 2;
      const tilt = 0.41, ct = Math.cos(tilt), stl = Math.sin(tilt);
      const lx = -0.55, ly = 0.35, lz = 0.76;
      const landRamp = '.:-=+*#%@', seaRamp = ' ..,,:~';
      let land = '', sea = '', sky = '';
      for (let j = 0; j < ROWS; j++) {
        for (let i = 0; i < C; i++) {
          const nx = (i - cx) / (R * ASP), ny = (cy - j) / R, d = nx * nx + ny * ny;
          let a = ' ', b = ' ', c = ' ';
          if (d <= 1) {
            const nz = Math.sqrt(1 - d);
            const y2 = ny * ct - nz * stl, z2 = ny * stl + nz * ct;
            const lat = Math.asin(Math.max(-1, Math.min(1, y2)));
            let lon = Math.atan2(nx, z2) + rot;
            lon = ((lon % (2 * Math.PI)) + 3 * Math.PI) % (2 * Math.PI) - Math.PI;
            const mi = Math.min(95, Math.max(0, Math.floor((lon + Math.PI) / (2 * Math.PI) * 96)));
            const mj = Math.min(47, Math.max(0, Math.floor((Math.PI / 2 - lat) / Math.PI * 48)));
            const lit = Math.max(0, nx * lx + ny * ly + nz * lz);
            const sh = 0.12 + 0.88 * lit;
            if (mask[mj * 96 + mi]) a = landRamp.charAt(Math.min(landRamp.length - 1, Math.floor(sh * landRamp.length)));
            else b = seaRamp.charAt(Math.min(seaRamp.length - 1, Math.floor(sh * seaRamp.length)));
          } else if (d <= 1.09) {
            c = '.';
          } else {
            const h = ((i * 73856093) ^ (j * 19349663)) >>> 0;
            if (h % 53 === 0) c = (Math.floor(rot * 3 + h) % 4 === 0) ? '+' : '.';
          }
          land += a; sea += b; sky += c;
        }
        land += '\n'; sea += '\n'; sky += '\n';
      }
      return { land, sea, sky };
    }
    drawGlobe(rot) {
      if (!this.gLand) return;
      const f = this.globeFrame(rot);
      this.gLand.textContent = f.land; this.gSea.textContent = f.sea; this.gSky.textContent = f.sky;
    }
    startGlobe() {
      this.stopGlobe();
      let reduce = false;
      try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
      let rot = 2.2;
      this.drawGlobe(rot);
      if (reduce || typeof requestAnimationFrame === 'undefined') return;
      let last = 0;
      const tick = (t) => {
        if (t - last > 66) { last = t; rot -= 0.045; this.drawGlobe(rot); }
        this.globeRaf = requestAnimationFrame(tick);
      };
      this.globeRaf = requestAnimationFrame(tick);
    }
    stopGlobe() { if (this.globeRaf && typeof cancelAnimationFrame !== 'undefined') cancelAnimationFrame(this.globeRaf); this.globeRaf = null; }

    /* =====================================================================
     * 리눅스 시스템 흉내: 파일 트리(Debian 12) + 사용자·그룹 + 권한
     * 새로고침하면 처음 상태로 돌아갑니다 (모든 변경은 브라우저 메모리에만)
     * ===================================================================== */
    sys() {
      if (this.S) return this.S;
      const T0 = new Date(2026, 10, 18, 21, 0).getTime();
      const S = { users: [], groups: [], stack: [{ uid: 1001, login: true }], temp: null, sudoAt: {}, lectured: {}, now: T0 };
      this.S = S;
      const U = (name, uid, gid, gecos, home, shell, pw) => S.users.push({ name, uid, gid, gecos, home, shell, pw });
      const NL = '/usr/sbin/nologin';
      U('root', 0, 0, 'root', '/root', '/bin/bash', '*');
      U('daemon', 1, 1, 'daemon', '/usr/sbin', NL, '*'); U('bin', 2, 2, 'bin', '/bin', NL, '*'); U('sys', 3, 3, 'sys', '/dev', NL, '*');
      U('sync', 4, 65534, 'sync', '/bin', '/bin/sync', '*'); U('games', 5, 60, 'games', '/usr/games', NL, '*'); U('man', 6, 12, 'man', '/var/cache/man', NL, '*');
      U('lp', 7, 7, 'lp', '/var/spool/lpd', NL, '*'); U('mail', 8, 8, 'mail', '/var/mail', NL, '*'); U('news', 9, 9, 'news', '/var/spool/news', NL, '*');
      U('uucp', 10, 10, 'uucp', '/var/spool/uucp', NL, '*'); U('proxy', 13, 13, 'proxy', '/bin', NL, '*'); U('www-data', 33, 33, 'www-data', '/var/www', NL, '*');
      U('backup', 34, 34, 'backup', '/var/backups', NL, '*'); U('list', 38, 38, 'Mailing List Manager', '/var/list', NL, '*'); U('irc', 39, 39, 'ircd', '/run/ircd', NL, '*');
      U('_apt', 42, 65534, '', '/nonexistent', NL, '*'); U('nobody', 65534, 65534, 'nobody', '/nonexistent', NL, '*');
      U('systemd-network', 998, 998, 'systemd Network Management', '/', NL, '!*'); U('messagebus', 100, 107, '', '/nonexistent', NL, '!'); U('sshd', 101, 65534, '', '/run/sshd', NL, '!');
      U('chanhee', 1000, 1000, 'Chanhee,,,', '/home/chanhee', '/bin/bash', '!');
      U('guest', 1001, 1001, 'Portfolio Visitor,,,', '/home/chanhee', '/bin/bash', '');
      const G = (name, gid, members) => S.groups.push({ name, gid, members: members || [] });
      [['root', 0], ['daemon', 1], ['bin', 2], ['sys', 3], ['adm', 4, ['chanhee']], ['tty', 5], ['disk', 6], ['lp', 7], ['mail', 8], ['news', 9], ['uucp', 10], ['man', 12], ['proxy', 13], ['kmem', 15], ['dialout', 20], ['fax', 21], ['voice', 22], ['cdrom', 24, ['chanhee']], ['floppy', 25, ['chanhee']], ['tape', 26], ['sudo', 27, ['chanhee', 'guest']], ['audio', 29, ['chanhee']], ['dip', 30, ['chanhee']], ['www-data', 33], ['backup', 34], ['operator', 37], ['list', 38], ['irc', 39], ['src', 40], ['shadow', 42], ['utmp', 43], ['video', 44, ['chanhee']], ['sasl', 45], ['plugdev', 46, ['chanhee']], ['staff', 50], ['games', 60], ['users', 100, ['chanhee', 'guest']], ['messagebus', 107], ['systemd-journal', 999], ['systemd-network', 998], ['nogroup', 65534], ['chanhee', 1000], ['guest', 1001]].forEach((g) => G(g[0], g[1], g[2]));

      const nd = (t, m, u, g, x) => Object.assign({ t, m, u: u || 0, g: g || 0, mt: T0 }, x || {});
      const D = (m, u, g) => nd('d', m == null ? 0o755 : m, u, g, { c: {} });
      const F = (lines, m, u, g, x) => nd('f', m == null ? 0o644 : m, u, g, Object.assign({ lines: lines || [] }, x || {}));
      const BIN = (m) => nd('f', m || 0o755, 0, 0, { lines: [], kind: 'bin', size: 141936 });
      const LN = (target) => nd('l', 0o777, 0, 0, { target });
      const DEV = (t, m, g, major, minor) => nd(t, m, 0, g || 0, { lines: [], kind: 'dev', major, minor });
      const root = D(0o755);
      S.root = root;
      const put = (path, node) => {
        const segs = path.split('/').filter(Boolean);
        let cur = root;
        for (let i = 0; i < segs.length - 1; i++) {
          if (!cur.c[segs[i]]) cur.c[segs[i]] = D(0o755);
          cur = cur.c[segs[i]];
        }
        cur.c[segs[segs.length - 1]] = node;
        return node;
      };
      const dirs = (base, names, m, u, g) => names.forEach((n) => put(base + '/' + n, D(m, u, g)));
      const KV = '6.1.0-28-amd64';

      // 최상위 (Debian 12 bookworm, merged /usr)
      put('/bin', LN('usr/bin')); put('/sbin', LN('usr/sbin')); put('/lib', LN('usr/lib')); put('/lib64', LN('usr/lib64'));
      put('/initrd.img', LN('boot/initrd.img-' + KV)); put('/initrd.img.old', LN('boot/initrd.img-' + KV));
      put('/vmlinuz', LN('boot/vmlinuz-' + KV)); put('/vmlinuz.old', LN('boot/vmlinuz-' + KV));
      put('/lost+found', D(0o700));
      ['/media', '/mnt', '/opt', '/srv'].forEach((p) => put(p, D(0o755)));
      put('/home', D(0o755)); put('/root', D(0o700)); put('/tmp', D(0o1777));
      put('/proc', D(0o555)); put('/sys', D(0o555)); put('/run', D(0o755)); put('/dev', D(0o755));

      // /boot
      put('/boot/config-' + KV, F(['#', '# Automatically generated file; DO NOT EDIT.', '# Linux/x86 6.1.119 Kernel Configuration', '#', 'CONFIG_CC_VERSION_TEXT="gcc-12 (Debian 12.2.0-14) 12.2.0"', 'CONFIG_64BIT=y', 'CONFIG_X86_64=y']));
      put('/boot/initrd.img-' + KV, nd('f', 0o644, 0, 0, { lines: [], kind: 'bin', size: 33861203 }));
      put('/boot/System.map-' + KV, F(['ffffffff81000000 T _stext', 'ffffffff81000000 T _text'], 0o644));
      put('/boot/vmlinuz-' + KV, nd('f', 0o644, 0, 0, { lines: [], kind: 'bin', size: 7969728 }));
      put('/boot/grub/grub.cfg', F(['#', '# DO NOT EDIT THIS FILE', '#', '# It is automatically generated by grub-mkconfig using templates', '#', "menuentry 'Debian GNU/Linux' --class debian --class gnu-linux --class gnu --class os {", '\tlinux\t/boot/vmlinuz-' + KV + ' root=UUID=3f1c9a2e-7b44-4c1d-9a6e-2d5f0e8b7c11 ro quiet', '\tinitrd\t/boot/initrd.img-' + KV, '}'], 0o444));
      dirs('/boot/grub', ['fonts', 'i386-pc', 'locale']);
      put('/boot/grub/grubenv', F(['# GRUB Environment Block'], 0o644));

      // /dev
      put('/dev/null', DEV('c', 0o666, 0, 1, 3)); put('/dev/zero', DEV('c', 0o666, 0, 1, 5)); put('/dev/full', DEV('c', 0o666, 0, 1, 7));
      put('/dev/random', DEV('c', 0o666, 0, 1, 8)); put('/dev/urandom', DEV('c', 0o666, 0, 1, 9));
      put('/dev/tty', DEV('c', 0o666, 5, 5, 0)); put('/dev/console', DEV('c', 0o600, 0, 5, 1)); put('/dev/tty0', DEV('c', 0o620, 5, 4, 0)); put('/dev/tty1', DEV('c', 0o620, 5, 4, 1));
      put('/dev/sda', DEV('b', 0o660, 6, 8, 0)); put('/dev/sda1', DEV('b', 0o660, 6, 8, 1)); put('/dev/sda2', DEV('b', 0o660, 6, 8, 2)); put('/dev/sda5', DEV('b', 0o660, 6, 8, 5));
      put('/dev/pts', D(0o755)); put('/dev/pts/0', DEV('c', 0o620, 5, 136, 0)); put('/dev/shm', D(0o1777)); put('/dev/mqueue', D(0o1777)); put('/dev/disk', D(0o755)); put('/dev/input', D(0o755));
      put('/dev/stdin', LN('/proc/self/fd/0')); put('/dev/stdout', LN('/proc/self/fd/1')); put('/dev/stderr', LN('/proc/self/fd/2')); put('/dev/fd', LN('/proc/self/fd'));

      // /etc
      const S2 = this;
      put('/etc/passwd', F(() => S.users.map((u) => [u.name, 'x', u.uid, u.gid, u.gecos, u.home, u.shell].join(':'))));
      put('/etc/group', F(() => S.groups.map((g) => [g.name, 'x', g.gid, g.members.join(',')].join(':'))));
      put('/etc/shadow', F(() => S.users.map((u) => [u.name, S2.pwHash(u), '20410', '0', '99999', '7', '', '', ''].join(':')), 0o640, 0, 42));
      put('/etc/gshadow', F(() => S.groups.map((g) => [g.name, '*', '', g.members.join(',')].join(':')), 0o640, 0, 42));
      put('/etc/hostname', F(['chanhee'])); put('/etc/timezone', F(['Asia/Seoul'])); put('/etc/debian_version', F(['12.8']));
      put('/etc/hosts', F(['127.0.0.1\tlocalhost', '127.0.1.1\tchanhee', '', '# The following lines are desirable for IPv6 capable hosts', '::1     localhost ip6-localhost ip6-loopback', 'ff02::1 ip6-allnodes', 'ff02::2 ip6-allrouters']));
      put('/etc/os-release', LN('../usr/lib/os-release'));
      put('/etc/issue', F(['Debian GNU/Linux 12 \\n \\l', ''])); put('/etc/issue.net', F(['Debian GNU/Linux 12']));
      put('/etc/motd', F(['', 'The programs included with the Debian GNU/Linux system are free software;', 'the exact distribution terms for each program are described in the', 'individual files in /usr/share/doc/*/copyright.', '', 'Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent', 'permitted by applicable law.']));
      put('/etc/shells', F(['# /etc/shells: valid login shells', '/bin/sh', '/usr/bin/sh', '/bin/bash', '/usr/bin/bash', '/bin/rbash', '/usr/bin/rbash']));
      put('/etc/fstab', F(['# /etc/fstab: static file system information.', '#', '# <file system> <mount point>   <type>  <options>       <dump>  <pass>', 'UUID=3f1c9a2e-7b44-4c1d-9a6e-2d5f0e8b7c11 /               ext4    errors=remount-ro 0       1', 'UUID=8a2b-41f0  /boot/efi       vfat    umask=0077      0       1', 'UUID=c7d1e3f5-0a9b-4e2c-8f61-5b3a9d7e2c40 none            swap    sw              0       0']));
      put('/etc/resolv.conf', F(['nameserver 1.1.1.1', 'nameserver 8.8.8.8']));
      put('/etc/machine-id', F(['3c1f0b9e2d7a4f6c8b5e1a0d9c7f2e4b'], 0o444));
      put('/etc/localtime', LN('/usr/share/zoneinfo/Asia/Seoul'));
      put('/etc/locale.gen', F(['# en_US.UTF-8 UTF-8', 'ko_KR.UTF-8 UTF-8']));
      put('/etc/profile', F(['# /etc/profile: system-wide .profile file for the Bourne shell (sh(1))', 'if [ "$(id -u)" -eq 0 ]; then', '  PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"', 'else', '  PATH="/usr/local/bin:/usr/bin:/bin:/usr/local/games:/usr/games"', 'fi', 'export PATH']));
      put('/etc/bash.bashrc', F(['# System-wide .bashrc file for interactive bash(1) shells.', "PS1='${debian_chroot:+($debian_chroot)}\\u@\\h:\\w\\$ '"]));
      put('/etc/login.defs', F(['MAIL_DIR        /var/mail', 'PASS_MAX_DAYS   99999', 'PASS_MIN_DAYS   0', 'PASS_WARN_AGE   7', 'UID_MIN                  1000', 'UID_MAX                 60000', 'GID_MIN                  1000', 'GID_MAX                 60000', 'UMASK           022', 'HOME_MODE       0700', 'ENCRYPT_METHOD SHA512']));
      put('/etc/adduser.conf', F(['# /etc/adduser.conf: `adduser\' configuration.', 'DSHELL=/bin/bash', 'DHOME=/home', 'SKEL=/etc/skel', 'FIRST_UID=1000', 'LAST_UID=59999', 'USERGROUPS=yes', 'DIR_MODE=0700', 'EXTRA_GROUPS="users"', 'ADD_EXTRA_GROUPS=1']));
      put('/etc/deluser.conf', F(['REMOVE_HOME = 0', 'REMOVE_ALL_FILES = 0', 'BACKUP = 0']));
      put('/etc/sudoers', F(['#', '# This file MUST be edited with the \'visudo\' command as root.', '#', 'Defaults\tenv_reset', 'Defaults\tmail_badpass', 'Defaults\tsecure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"', 'Defaults\tuse_pty', '', '# User privilege specification', 'root\tALL=(ALL:ALL) ALL', '', '# Allow members of group sudo to execute any command', '%sudo\tALL=(ALL:ALL) ALL', '', '@includedir /etc/sudoers.d'], 0o440));
      put('/etc/sudoers.d/README', F(['#', '# Files in /etc/sudoers.d are parsed in sorted lexical order.', '#'], 0o440));
      put('/etc/apt/sources.list', F(['deb http://deb.debian.org/debian bookworm main contrib non-free-firmware', 'deb http://deb.debian.org/debian bookworm-updates main contrib non-free-firmware', 'deb http://security.debian.org/debian-security bookworm-security main contrib non-free-firmware']));
      dirs('/etc/apt', ['apt.conf.d', 'auth.conf.d', 'keyrings', 'preferences.d', 'sources.list.d', 'trusted.gpg.d']);
      put('/etc/ssh/sshd_config', F(['Include /etc/ssh/sshd_config.d/*.conf', '#Port 22', 'PermitRootLogin prohibit-password', 'KbdInteractiveAuthentication no', 'UsePAM yes', 'X11Forwarding yes', 'PrintMotd no', 'AcceptEnv LANG LC_*', 'Subsystem\tsftp\t/usr/lib/openssh/sftp-server']));
      put('/etc/ssh/ssh_config', F(['Host *', '    SendEnv LANG LC_*', '    HashKnownHosts yes']));
      dirs('/etc/ssh', ['sshd_config.d', 'ssh_config.d']);
      put('/etc/network/interfaces', F(['# The loopback network interface', 'auto lo', 'iface lo inet loopback', '', '# The primary network interface', 'allow-hotplug ens33', 'iface ens33 inet dhcp']));
      put('/etc/default/useradd', F(['# Default values for useradd(8)', 'SHELL=/bin/sh', '# HOME=/home', '# SKEL=/etc/skel']));
      put('/etc/default/grub', F(['GRUB_DEFAULT=0', 'GRUB_TIMEOUT=5', 'GRUB_DISTRIBUTOR=`lsb_release -i -s 2> /dev/null || echo Debian`', 'GRUB_CMDLINE_LINUX_DEFAULT="quiet"', 'GRUB_CMDLINE_LINUX=""']));
      put('/etc/default/locale', F(['LANG=ko_KR.UTF-8']));
      put('/etc/crontab', F(['SHELL=/bin/sh', 'PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin', '', '# m h dom mon dow user\tcommand', '17 *\t* * *\troot\tcd / && run-parts --report /etc/cron.hourly', '25 6\t* * *\troot\ttest -x /usr/sbin/anacron || { cd / && run-parts --report /etc/cron.daily; }']));
      dirs('/etc', ['alternatives', 'cron.d', 'cron.daily', 'cron.hourly', 'cron.weekly', 'cron.monthly', 'init.d', 'ld.so.conf.d', 'logrotate.d', 'pam.d', 'profile.d', 'security', 'systemd', 'udev', 'vim', 'X11']);
      put('/etc/init.d/ssh', BIN()); put('/etc/init.d/cron', BIN()); put('/etc/init.d/procps', BIN());
      put('/etc/pam.d/sudo', F(['#%PAM-1.0', '@include common-auth', '@include common-account', '@include common-session-noninteractive']));
      put('/etc/pam.d/su', F(['auth       sufficient pam_rootok.so', '@include common-auth', '@include common-account', '@include common-session']));
      put('/etc/systemd/journald.conf', F(['[Journal]', '#Storage=auto', '#Compress=yes']));
      dirs('/etc/systemd', ['network', 'system', 'user']);
      put('/etc/vim/vimrc', F(['" All system-wide defaults are set in $VIMRUNTIME/debian.vim', 'runtime! debian.vim', 'syntax on']));
      const skel = {
        '.bashrc': ['# ~/.bashrc: executed by bash(1) for non-login shells.', '', '# If not running interactively, don\'t do anything', 'case $- in', '    *i*) ;;', '      *) return;;', 'esac', '', 'HISTCONTROL=ignoreboth', 'HISTSIZE=1000', "alias ls='ls --color=auto'", "alias ll='ls -l'"],
        '.profile': ['# ~/.profile: executed by the command interpreter for login shells.', 'if [ -n "$BASH_VERSION" ]; then', '    if [ -f "$HOME/.bashrc" ]; then', '\t. "$HOME/.bashrc"', '    fi', 'fi'],
        '.bash_logout': ['# ~/.bash_logout: executed by bash(1) when login shell exits.', 'if [ "$SHLVL" = 1 ]; then', '    [ -x /usr/bin/clear_console ] && /usr/bin/clear_console -q', 'fi']
      };
      S.skel = skel;
      Object.keys(skel).forEach((k) => put('/etc/skel/' + k, F(skel[k].slice())));

      // /usr
      ['apt', 'apt-get', 'apt-cache', 'awk', 'bash', 'cat', 'chgrp', 'chmod', 'chown', 'clear', 'cp', 'curl', 'date', 'df', 'diff', 'dpkg', 'du', 'echo', 'env', 'file', 'find', 'free', 'grep', 'groups', 'gzip', 'head', 'hostname', 'id', 'journalctl', 'kill', 'less', 'ln', 'login', 'ls', 'man', 'mkdir', 'more', 'mv', 'nano', 'perl', 'ping', 'ps', 'pwd', 'python3', 'readlink', 'rm', 'rmdir', 'sed', 'sh', 'sort', 'ssh', 'stat', 'systemctl', 'tail', 'tar', 'tee', 'top', 'touch', 'tree', 'uname', 'uptime', 'vi', 'vim.basic', 'wc', 'wget', 'which', 'who', 'whoami', 'xargs'].forEach((n) => put('/usr/bin/' + n, BIN()));
      put('/usr/bin/sudo', BIN(0o4755)); put('/usr/bin/su', BIN(0o4755)); put('/usr/bin/passwd', BIN(0o4755)); put('/usr/bin/gpasswd', BIN(0o4755));
      put('/usr/bin/chsh', BIN(0o4755)); put('/usr/bin/newgrp', BIN(0o4755)); put('/usr/bin/mount', BIN(0o4755)); put('/usr/bin/umount', BIN(0o4755));
      ['adduser', 'addgroup', 'chpasswd', 'cron', 'deluser', 'delgroup', 'fdisk', 'groupadd', 'groupdel', 'groupmod', 'ip', 'iptables', 'mkfs.ext4', 'reboot', 'shutdown', 'sshd', 'useradd', 'userdel', 'usermod', 'visudo'].forEach((n) => put('/usr/sbin/' + n, BIN()));
      put('/usr/lib/os-release', F(['PRETTY_NAME="Debian GNU/Linux 12 (bookworm)"', 'NAME="Debian GNU/Linux"', 'VERSION_ID="12"', 'VERSION="12 (bookworm)"', 'VERSION_CODENAME=bookworm', 'ID=debian', 'HOME_URL="https://www.debian.org/"', 'SUPPORT_URL="https://www.debian.org/support"', 'BUG_REPORT_URL="https://bugs.debian.org/"']));
      dirs('/usr/lib', ['apt', 'dpkg', 'locale', 'modules', 'openssh', 'python3', 'sudo', 'systemd', 'udev', 'x86_64-linux-gnu']);
      put('/usr/lib64/ld-linux-x86-64.so.2', LN('/lib/x86_64-linux-gnu/ld-linux-x86-64.so.2'));
      dirs('/usr', ['games', 'include', 'libexec', 'src']);
      dirs('/usr/local', ['bin', 'etc', 'games', 'include', 'lib', 'man', 'sbin', 'share', 'src'], 0o755, 0, 50);
      dirs('/usr/share', ['common-licenses', 'doc', 'info', 'locale', 'man', 'zoneinfo']);
      put('/usr/share/zoneinfo/Asia/Seoul', nd('f', 0o644, 0, 0, { lines: [], kind: 'bin', size: 617 }));

      // /var
      dirs('/var', ['backups', 'cache', 'lib', 'local', 'mail', 'opt', 'spool']);
      put('/var/tmp', D(0o1777)); put('/var/lock', LN('/run/lock')); put('/var/run', LN('/run')); put('/var/mail', D(0o2775, 0, 8));
      dirs('/var/cache', ['apt', 'debconf', 'man']); dirs('/var/lib', ['apt', 'dpkg', 'systemd', 'sudo']); dirs('/var/spool', ['cron']);
      put('/var/log/dpkg.log', F(['2026-11-18 20:41:12 startup archives unpack', '2026-11-18 20:41:13 install tree:amd64 <none> 2.1.0-1', '2026-11-18 20:41:13 status installed tree:amd64 2.1.0-1']));
      put('/var/log/apt/history.log', F(['', 'Start-Date: 2026-11-18  20:41:12', 'Commandline: apt install tree', 'Install: tree:amd64 (2.1.0-1)', 'End-Date: 2026-11-18  20:41:13']));
      put('/var/log/apt/term.log', F([], 0o640, 0, 4));
      put('/var/log/alternatives.log', F([])); put('/var/log/lastlog', nd('f', 0o664, 0, 43, { lines: [], kind: 'bin', size: 292292 }));
      put('/var/log/wtmp', nd('f', 0o664, 0, 43, { lines: [], kind: 'bin', size: 5376 })); put('/var/log/btmp', nd('f', 0o660, 0, 43, { lines: [], kind: 'bin', size: 0 }));
      put('/var/log/faillog', nd('f', 0o644, 0, 0, { lines: [], kind: 'bin', size: 3200 }));
      put('/var/log/journal', D(0o2755, 0, 999)); put('/var/log/private', D(0o700));
      put('/var/www/html/index.html', F(['<!doctype html>', '<title>chanhee</title>', '<p>It works! 진짜 포트폴리오는 https://andy051127.github.io</p>']));

      // /run, /proc, /sys
      dirs('/run', ['lock', 'log', 'mount', 'sshd', 'sudo', 'systemd', 'user']); put('/run/lock', D(0o1777)); put('/run/utmp', nd('f', 0o664, 0, 43, { lines: [], kind: 'bin', size: 768 }));
      put('/proc/version', F(['Linux version ' + KV + ' (debian-kernel@lists.debian.org) (gcc-12 (Debian 12.2.0-14) 12.2.0, GNU ld (GNU Binutils for Debian) 2.40) #1 SMP PREEMPT_DYNAMIC Debian 6.1.119-1 (2024-11-22)'], 0o444));
      put('/proc/cpuinfo', F(['processor\t: 0', 'vendor_id\t: GenuineIntel', 'model name\t: Intel(R) Core(TM) i5 CPU @ 3.00GHz', 'cpu cores\t: 4', 'flags\t\t: fpu vme de pse tsc msr pae mce cx8 apic sep mtrr'], 0o444));
      put('/proc/meminfo', F(['MemTotal:        8135680 kB', 'MemFree:         5242880 kB', 'MemAvailable:    6815744 kB', 'SwapTotal:       1003516 kB'], 0o444));
      put('/proc/uptime', F(['63072000.42 252288000.11'], 0o444)); put('/proc/loadavg', F(['0.42 0.37 0.31 1/123 4242'], 0o444));
      put('/proc/filesystems', F(['nodev\tsysfs', 'nodev\ttmpfs', 'nodev\tproc', '\text4', '\tvfat'], 0o444));
      put('/proc/mounts', F(['/dev/sda1 / ext4 rw,relatime,errors=remount-ro 0 0', 'proc /proc proc rw,nosuid,nodev,noexec,relatime 0 0', 'sysfs /sys sysfs rw,nosuid,nodev,noexec,relatime 0 0', 'tmpfs /run tmpfs rw,nosuid,nodev,noexec,relatime,size=813568k,mode=755 0 0'], 0o444));
      put('/proc/1', D(0o555)); put('/proc/self', LN('4242')); put('/proc/4242', D(0o555, 1001, 1001)); put('/proc/sys', D(0o555));
      ['block', 'bus', 'class', 'dev', 'devices', 'firmware', 'fs', 'hypervisor', 'kernel', 'module', 'power'].forEach((n) => put('/sys/' + n, D(0o755)));

      // /root
      put('/root/.bashrc', F(skel['.bashrc'].slice(), 0o644)); put('/root/.profile', F(skel['.profile'].slice(), 0o644));
      put('/root/.flag', F(['축하해요, root 권한까지 왔네요. 🎉', '이제 useradd · chmod · chown 같은 것도 마음껏 써보세요.', '(새로고침하면 모든 변경은 사라져요)'], 0o600));

      // /home/chanhee — 포트폴리오 본체
      const home = put('/home/chanhee', D(0o755, 1000, 1000));
      const hf = (k) => () => S2.homeFiles()[k];
      Object.keys(skel).forEach((k) => { home.c[k] = F(skel[k].slice(), 0o644, 1000, 1000); });
      home.c['.secrets'] = F(['Hello World'], 0o644, 1000, 1000, { kind: 'secret', size: 1152 });
      ['about', 'certs', 'contact', 'stack', 'timeline', 'workflow'].forEach((k) => { home.c[k + '.txt'] = F(hf(k), 0o644, 1000, 1000); });
      home.c['chanhee.jpg'] = nd('f', 0o644, 1000, 1000, { lines: [], kind: 'image', size: 43797 });
      const pj = D(0o755, 1000, 1000);
      home.c.projects = pj;
      this.projects().forEach((p) => { pj.c[p.file] = F(p.md, 0o644, 1000, 1000, { kind: 'project', project: p }); });
      return S;
    }
    pwHash(u) {
      if (u.pw === '*' || u.pw === '!' || u.pw === '!*') return u.pw;
      if (u.pw === '') return '$y$j9T$Gu3st0nlyV1s1t0r$wJ0bq0pQfW3mFq1Jk2l5n8oT0nHq9ZsXvY1aB2cD3e/';
      let h = 7;
      for (const ch of u.name + ':' + u.pw) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
      return '$y$j9T$' + h.toString(36) + 'Qx8Lm$' + (h * 2654435761 >>> 0).toString(36) + 'Zk3Vb' + (h ^ 0x5bd1e995).toString(36) + 'P0q';
    }
    /* 현재 사용자 (sudo 로 잠깐 바뀐 사용자가 우선) */
    me() {
      const S = this.sys();
      const uid = S.temp != null ? S.temp : S.stack[S.stack.length - 1].uid;
      return S.users.find((u) => u.uid === uid) || { name: String(uid), uid, gid: uid, home: '/', shell: '/bin/sh', pw: '!' };
    }
    userBy(x) { const S = this.sys(); return S.users.find((u) => u.name === x || String(u.uid) === String(x)) || null; }
    groupBy(x) { const S = this.sys(); return S.groups.find((g) => g.name === x || String(g.gid) === String(x)) || null; }
    uname(uid) { const u = this.sys().users.find((x) => x.uid === uid); return u ? u.name : String(uid); }
    gname(gid) { const g = this.sys().groups.find((x) => x.gid === gid); return g ? g.name : String(gid); }
    gidsOf(u) { const S = this.sys(); return [u.gid].concat(S.groups.filter((g) => g.gid !== u.gid && g.members.indexOf(u.name) >= 0).map((g) => g.gid)); }
    can(n, bit, u) {
      u = u || this.me();
      if (u.uid === 0) return bit !== 'x' || n.t === 'd' || (n.m & 0o111) !== 0;
      const b = bit === 'r' ? 4 : bit === 'w' ? 2 : 1;
      if (n.u === u.uid) return ((n.m >> 6) & b) !== 0;
      if (this.gidsOf(u).indexOf(n.g) >= 0) return ((n.m >> 3) & b) !== 0;
      return (n.m & b) !== 0;
    }
    linesOf(n) { const l = typeof n.lines === 'function' ? n.lines() : n.lines; return l || []; }
    sizeOf(n) {
      if (n.t === 'd') return 4096;
      if (n.t === 'l') return n.target.length;
      if (n.t === 'c' || n.t === 'b') return 0;
      if (n.size != null) return n.size;
      const l = this.linesOf(n);
      return l.length ? l.join('\n').length + 1 : 0;
    }
    absCwd(c) {
      if (!c || c === '~') return '/home/chanhee';
      if (c === '~/projects') return '/home/chanhee/projects';
      return c;
    }
    dispPath(abs) {
      const h = this.me().home;
      if (h && h !== '/' && (abs === h || abs.indexOf(h + '/') === 0)) return '~' + abs.slice(h.length);
      return abs;
    }
    absPath(x, cwd) {
      x = String(x || '');
      let p;
      if (x === '~' || x.indexOf('~/') === 0) p = this.me().home + x.slice(1);
      else if (/^~[a-z_]/.test(x)) { const nm = x.slice(1).split('/')[0]; const u = this.userBy(nm); p = (u ? u.home : '/~' + nm) + x.slice(1 + nm.length); }
      else if (x.charAt(0) === '/') p = x;
      else p = this.absCwd(cwd) + '/' + x;
      const out = [];
      p.split('/').forEach((s) => { if (!s || s === '.') return; if (s === '..') out.pop(); else out.push(s); });
      return '/' + out.join('/');
    }
    /* 경로 찾기: 디렉터리를 지날 때마다 실행(x) 권한을 확인 */
    lookup(abs, follow, depth) {
      const S = this.sys();
      if (follow == null) follow = true;
      depth = depth || 0;
      const segs = abs.split('/').filter(Boolean);
      let cur = S.root, path = '';
      let parent = null;
      for (let i = 0; i < segs.length; i++) {
        if (cur.t !== 'd') return { err: 'ENOTDIR', path: abs };
        if (!this.can(cur, 'x')) return { err: 'EACCES', path: abs };
        parent = cur;
        let nx = cur.c[segs[i]];
        if (!nx) return { err: 'ENOENT', path: abs, parent, name: segs[i], parentPath: path || '/', last: i === segs.length - 1 };
        const last = i === segs.length - 1;
        if (nx.t === 'l' && (!last || follow)) {
          if (depth > 8) return { err: 'ELOOP', path: abs };
          const tgt = nx.target.charAt(0) === '/' ? nx.target : (path || '') + '/' + nx.target;
          const r = this.lookup(this.absPath(tgt, '/'), true, depth + 1);
          if (r.err) return r;
          nx = r.node;
          path = r.path;
        } else {
          path = path + '/' + segs[i];
        }
        cur = nx;
      }
      return { node: cur, path: path || '/', parent, name: segs[segs.length - 1] || '/', parentPath: path.split('/').slice(0, -1).join('/') || '/' };
    }
    /* 기존 명령(man · vi · cat ...)이 쓰던 형태로 돌려줌 */
    resolve(raw, cwd) {
      const x = String(raw || '').trim().replace(/^['"]|['"]$/g, '');
      if (!x) return null;
      const abs = this.absPath(x, cwd);
      let r = this.lookup(abs);
      if (!r.node && r.err === 'ENOENT') {
        // 편의: about → about.txt, pikcha → projects/pikcha.txt (포트폴리오 폴더 안에서만)
        const dir = abs.split('/').slice(0, -1).join('/') || '/';
        const base = abs.split('/').pop();
        if (dir === '/home/chanhee' || dir === '/home/chanhee/projects') {
          const p = this.findProject(base);
          if (p) r = this.lookup('/home/chanhee/projects/' + p.file);
          else if (dir === '/home/chanhee') { const r2 = this.lookup(abs + '.txt'); if (r2.node) r = r2; }
        }
      }
      if (!r.node) return null;
      const n = r.node;
      return {
        type: n.t === 'd' ? 'dir' : (n.kind === 'image' ? 'image' : (n.kind === 'secret' ? 'secret' : 'file')),
        name: r.name, id: r.path, path: r.path, node: n, size: this.sizeOf(n),
        lines: n.t === 'd' ? [] : this.linesOf(n), project: n.kind === 'project' ? n.project : null
      };
    }
    isSecret(files, cwd) { return files.some((f) => { const r = this.resolve(f, cwd); return !!(r && r.type === 'secret' && this.can(r.node, 'r')); }); }
    modeStr(n) {
      const t = { d: 'd', l: 'l', c: 'c', b: 'b' }[n.t] || '-';
      const m = n.m;
      const tri = (v, special, ch) => (v & 4 ? 'r' : '-') + (v & 2 ? 'w' : '-') + (special ? (v & 1 ? ch : ch.toUpperCase()) : (v & 1 ? 'x' : '-'));
      return t + tri((m >> 6) & 7, m & 0o4000, 's') + tri((m >> 3) & 7, m & 0o2000, 's') + tri(m & 7, m & 0o1000, 't');
    }
    fmtDate(ms) {
      const d = new Date(ms);
      const mon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()];
      return mon + ' ' + String(d.getDate()).padStart(2) + ' ' + String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
    }
    nowMs() { return Date.now(); }
    sortNames(a) { return a.slice().sort((x, y) => { const k = (s) => s.replace(/^\.+/, '').toLowerCase(); return k(x) < k(y) ? -1 : k(x) > k(y) ? 1 : (x < y ? -1 : 1); }); }
    /* chmod 모드 해석: 755 / u+x / go-w / a=r,u+w */
    parseMode(spec, cur, isDir) {
      if (/^[0-7]{1,4}$/.test(spec)) return parseInt(spec, 8);
      let m = cur;
      const parts = spec.split(',');
      for (const p of parts) {
        const mm = p.match(/^([ugoa]*)([+\-=])([rwxXst]*)$/);
        if (!mm) return null;
        let who = mm[1] || 'a';
        if (who.indexOf('a') >= 0) who = 'ugo';
        let bits = 0;
        for (const ch of mm[3]) {
          if (ch === 'r') { if (who.indexOf('u') >= 0) bits |= 0o400; if (who.indexOf('g') >= 0) bits |= 0o40; if (who.indexOf('o') >= 0) bits |= 0o4; }
          if (ch === 'w') { if (who.indexOf('u') >= 0) bits |= 0o200; if (who.indexOf('g') >= 0) bits |= 0o20; if (who.indexOf('o') >= 0) bits |= 0o2; }
          if (ch === 'x' || (ch === 'X' && (isDir || (cur & 0o111)))) { if (who.indexOf('u') >= 0) bits |= 0o100; if (who.indexOf('g') >= 0) bits |= 0o10; if (who.indexOf('o') >= 0) bits |= 0o1; }
          if (ch === 's') { if (who.indexOf('u') >= 0) bits |= 0o4000; if (who.indexOf('g') >= 0) bits |= 0o2000; }
          if (ch === 't') bits |= 0o1000;
        }
        if (mm[2] === '+') m |= bits;
        else if (mm[2] === '-') m &= ~bits;
        else {
          let mask = 0;
          if (who.indexOf('u') >= 0) mask |= 0o4700; if (who.indexOf('g') >= 0) mask |= 0o2070; if (who.indexOf('o') >= 0) mask |= 0o1007;
          m = (m & ~mask) | bits;
        }
      }
      return m;
    }
    walkTree(n, fn) { fn(n); if (n.t === 'd') Object.keys(n.c).forEach((k) => this.walkTree(n.c[k], fn)); }
    cloneNode(n, uid, gid) {
      const c = Object.assign({}, n, { u: uid, g: gid, mt: this.nowMs() });
      if (n.t === 'd') { c.c = {}; Object.keys(n.c).forEach((k) => { c.c[k] = this.cloneNode(n.c[k], uid, gid); }); }
      else if (n.t === 'f' && typeof n.lines !== 'function') c.lines = n.lines.slice();
      else if (n.t === 'f') c.lines = n.lines().slice();
      if (c.m & 0o6000 && uid !== 0) c.m &= ~0o6000;
      return c;
    }
    /* 쓰기 가능한 새 항목 자리 확인 (부모 디렉터리의 w+x) */
    slot(abs) {
      const r = this.lookup(abs, false);
      if (r.node) return { exists: true, r };
      if (r.err !== 'ENOENT' || !r.last) return { err: r.err === 'ENOENT' ? 'ENOENT' : r.err };
      if (!this.can(r.parent, 'w') || !this.can(r.parent, 'x')) return { err: 'EACCES' };
      return { parent: r.parent, name: r.name };
    }
    /* 지우기·옮기기 권한: 부모 w+x, sticky(/tmp)면 주인만 */
    canUnlink(r) {
      const me = this.me();
      if (!r.parent) return false;
      if (!this.can(r.parent, 'w') || !this.can(r.parent, 'x')) return false;
      if ((r.parent.m & 0o1000) && me.uid !== 0 && r.node.u !== me.uid && r.parent.u !== me.uid) return false;
      return true;
    }
    errMsg(e) { return { ENOENT: '그런 파일이나 디렉터리가 없습니다', EACCES: '허가 거부', ENOTDIR: '디렉터리가 아닙니다', ELOOP: '심볼릭 링크 단계가 너무 많습니다', EEXIST: '파일이 있습니다', EISDIR: '디렉터리입니다', ENOTEMPTY: '디렉터리가 비어 있지 않습니다', EPERM: '명령을 허용하지 않음' }[e] || e; }
    writeFile(abs, lines, append) {
      const r = this.lookup(abs);
      if (r.node) {
        if (r.node.t === 'd') return 'EISDIR';
        if (r.node.kind === 'dev') return null;
        if (!this.can(r.node, 'w')) return 'EACCES';
        const old = append ? this.linesOf(r.node) : [];
        r.node.lines = old.concat(lines);
        delete r.node.size;
        if (r.node.kind && r.node.kind !== 'project') delete r.node.kind;
        r.node.mt = this.nowMs();
        return null;
      }
      const s = this.slot(abs);
      if (s.err) return s.err;
      const me = this.me();
      s.parent.c[s.name] = { t: 'f', m: 0o644, u: me.uid, g: me.gid, mt: this.nowMs(), lines: lines.slice() };
      return null;
    }
    mkHome(u, mode) {
      const S = this.sys();
      const r = this.lookup('/home');
      const d = { t: 'd', m: mode, u: u.uid, g: u.gid, mt: this.nowMs(), c: {} };
      Object.keys(S.skel).forEach((k) => { d.c[k] = { t: 'f', m: 0o644, u: u.uid, g: u.gid, mt: this.nowMs(), lines: S.skel[k].slice() }; });
      const name = u.home.split('/').pop();
      const parentPath = u.home.split('/').slice(0, -1).join('/') || '/';
      const pr = this.lookup(parentPath);
      if (pr.node && pr.node.t === 'd') pr.node.c[name] = d;
      else if (r.node) r.node.c[name] = d;
    }
    nextId(kind) {
      const S = this.sys();
      let id = 1000;
      const used = kind === 'uid' ? S.users.map((u) => u.uid) : S.groups.map((g) => g.gid).concat(S.users.map((u) => u.uid));
      while (used.indexOf(id) >= 0) id++;
      return id;
    }
    /* 비밀번호 입력을 받는 프롬프트 (화면에 글자가 안 보임) */
    askPw(label, cb) { return { label, mask: true, cb }; }
    pwOk(u, pw) { if (!u) return false; if (u.pw === '') return true; if (u.pw === '*' || u.pw.charAt(0) === '!') return false; return u.pw === pw; }
    sudoPrompt(line, cwd, hist, tries) {
      const me = this.me();
      const S = this.sys();
      return this.askPw('[sudo] password for ' + me.name + ': ', (pw) => {
        const L = (a, b) => this.L(a, b);
        if (!this.pwOk(me, pw)) {
          if ((tries || 1) < 3) return { out: [L('Sorry, try again.', 'err')], pending: this.sudoPrompt(line, cwd, hist, (tries || 1) + 1) };
          return { out: [L('sudo: 3 incorrect password attempts', 'err')] };
        }
        const g = this.groupBy('sudo');
        if (me.uid !== 0 && !(g && g.members.indexOf(me.name) >= 0)) return { out: [L(me.name + ' is not in the sudoers file.', 'err')] };
        S.sudoAt[me.name] = Date.now();
        return this.exec(line, cwd, hist);
      });
    }
    /* 새 비밀번호 두 번 받기 */
    newPwFlow(u, done) {
      return this.askPw('New password: ', (p1) => ({
        out: [],
        pending: this.askPw('Retype new password: ', (p2) => {
          const L = (a, b) => this.L(a, b);
          if (p1 !== p2) return { out: [L('Sorry, passwords do not match.', 'err'), L('passwd: Authentication token manipulation error', 'err'), L('passwd: password unchanged', 'err')].concat(done ? done(false) : []) };
          if (!p1) return { out: [L('No password has been supplied.', 'err'), L('passwd: Authentication token manipulation error', 'err'), L('passwd: password unchanged', 'err')].concat(done ? done(false) : []) };
          u.pw = p1;
          return { out: [L('passwd: password updated successfully')].concat(done ? done(true) : []) };
        })
      }));
    }
    /* 트리 출력 */
    treeLines(n, prefix, opts, acc, depth) {
      if (!this.can(n, 'r') || !this.can(n, 'x')) { acc.lines.push(prefix + '[error opening dir]'); return; }
      let names = Object.keys(n.c);
      if (!opts.a) names = names.filter((k) => k.charAt(0) !== '.');
      if (opts.d) names = names.filter((k) => n.c[k].t === 'd');
      names = this.sortNames(names);
      names.forEach((k, i) => {
        if (acc.lines.length > 400) return;
        const c = n.c[k];
        const lastOne = i === names.length - 1;
        acc.lines.push(prefix + (lastOne ? '└── ' : '├── ') + k + (c.t === 'l' ? ' -> ' + c.target : ''));
        if (c.t === 'd') { acc.d++; if (opts.L == null || depth + 1 < opts.L) this.treeLines(c, prefix + (lastOne ? '    ' : '│   '), opts, acc, depth + 1); }
        else acc.f++;
      });
    }

    /* ---------- 명령어 ---------- */
    cmd(str, cwd, hist, stdin, piped) {
      const L = (a, b, c, d) => this.L(a, b, c, d);
      const argv = str.split(/\s+/).filter(Boolean);
      const name = argv[0];
      const args = argv.slice(1);
      const flags = args.filter((a) => /^-/.test(a)).join('');
      const rest = args.filter((a) => !/^-/.test(a));
      const ok = (plain, rich) => ({ plain: plain || [], rich: rich || null });
      const fail = (err, hint) => ({ err, hint });
      const openSecret = () => ({ plain: ['Hello World'], rich: [L('decrypting ~/.secrets ... ok', 'muted')], secret: true });
      const readInput = (files, label) => {
        if (files.length === 0) return stdin ? { lines: stdin } : { err: label + ': 파일 이름이 필요합니다. 예) ' + label + ' stack.txt' };
        let acc = [];
        for (const f of files) {
          let r = this.lookup(this.absPath(f, cwd));
          if (!r.node) { const rr = this.resolve(f, cwd); if (rr) r = { node: rr.node, path: rr.path }; }
          if (!r.node) return { err: label + ": '" + f + "': " + this.errMsg(r.err) };
          const n = r.node;
          if (n.t === 'd') return { err: label + ': ' + f + ': 디렉터리입니다' };
          if (!this.can(n, 'r')) return { err: label + ': ' + f + ': 허가 거부' };
          if (n.kind === 'image') return { err: label + ': ' + f + ': 바이너리 파일입니다. 보려면 display ' + f };
          if (n.kind === 'bin' || (n.kind === 'dev' && /random/.test(r.path || ''))) return { err: label + ': ' + f + ': 바이너리 파일이라 화면에 표시하지 않습니다' };
          acc = acc.concat(this.linesOf(n));
        }
        return { lines: acc, name: files.join(' ') };
      };
      const numArg = (def) => {
        let n = def;
        const files = [];
        for (let i = 0; i < args.length; i++) {
          if (args[i] === '-n' && args[i + 1]) { n = parseInt(args[i + 1], 10) || def; i++; }
          else if (/^-\d+$/.test(args[i])) n = parseInt(args[i].slice(1), 10);
          else if (!/^-/.test(args[i])) files.push(args[i]);
        }
        return { n, files };
      };
      switch (name) {
        case 'ls': {
          const all = /a/.test(flags) || /A/.test(flags);
          const long = /l/.test(flags);
          const onlyDir = /d/.test(flags);
          const targets = rest.length ? rest : ['.'];
          const outPlain = [];
          const rich = [];
          const errs = [];
          const fileItems = [];
          const dirItems = [];
          targets.forEach((t) => {
            const abs = this.absPath(t, cwd);
            const r = this.lookup(abs, !long || /\/$/.test(t) || t === '.' || t === '..' || t === '~');
            if (!r.node) { errs.push("ls: '" + t + "'에 접근할 수 없습니다: " + this.errMsg(r.err)); return; }
            if (r.node.t === 'd' && !onlyDir) dirItems.push({ t, r });
            else fileItems.push({ name: t, n: r.node });
          });
          if (errs.length && !fileItems.length && !dirItems.length) return fail(errs.join('\n'));
          const fmt = (items) => {
            if (long) {
              const w = { l: 1, u: 1, g: 1, s: 1 };
              const rows = items.map((it) => {
                const n = it.n;
                const row = { mode: this.modeStr(n), l: String(n.t === 'd' ? 2 + Object.keys(n.c).filter((k) => n.c[k].t === 'd').length : 1), u: this.uname(n.u), g: this.gname(n.g), s: (n.t === 'c' || n.t === 'b') ? n.major + ', ' + n.minor : String(this.sizeOf(n)), d: this.fmtDate(n.mt), name: it.name, n };
                w.l = Math.max(w.l, row.l.length); w.u = Math.max(w.u, row.u.length); w.g = Math.max(w.g, row.g.length); w.s = Math.max(w.s, row.s.length);
                return row;
              });
              rows.forEach((row) => {
                const n = row.n;
                const kind = n.t === 'd' ? 'path' : (n.t === 'l' ? 'path' : ((n.m & 0o111) && n.t === 'f' ? 'accent' : (row.name.charAt(0) === '.' ? 'muted' : 'out')));
                rich.push(L(row.name + (n.t === 'd' ? '/' : '') + (n.t === 'l' ? ' -> ' + n.target : ''), kind, row.mode + ' ' + row.l.padStart(w.l) + ' ' + row.u.padEnd(w.u) + ' ' + row.g.padEnd(w.g) + ' ' + row.s.padStart(w.s) + ' ' + row.d + ' ', 'muted'));
                outPlain.push(row.mode + ' ' + row.l + ' ' + row.u + ' ' + row.g + ' ' + row.s + ' ' + row.d + ' ' + row.name);
              });
            } else {
              const ds = items.filter((it) => it.n.t === 'd').map((it) => it.name + '/');
              const fs = items.filter((it) => it.n.t !== 'd').map((it) => it.name);
              items.forEach((it) => outPlain.push(it.name));
              if (items.length) rich.push(L(fs.join('  '), 'out', ds.length ? ds.join('  ') + '  ' : '', 'path'));
            }
          };
          errs.forEach((e) => rich.push(L(e, 'err')));
          if (fileItems.length) fmt(fileItems);
          dirItems.forEach((di, idx) => {
            const n = di.r.node;
            if (dirItems.length + fileItems.length > 1) { if (rich.length) rich.push(L('')); rich.push(L(di.t + ':', 'out')); }
            if (!this.can(n, 'r')) { rich.push(L("ls: '" + di.t + "' 디렉터리를 열 수 없습니다: 허가 거부", 'err')); return; }
            let names = Object.keys(n.c);
            if (!all) names = names.filter((k) => k.charAt(0) !== '.');
            names = this.sortNames(names);
            const items = names.map((k) => ({ name: k, n: n.c[k] }));
            if (/a/.test(flags)) { const pr = this.lookup(this.absPath(di.r.path + '/..', '/')); items.unshift({ name: '..', n: pr.node || n }); items.unshift({ name: '.', n }); }
            if (long) rich.push(L('합계 ' + items.reduce((a, it) => a + Math.ceil(this.sizeOf(it.n) / 4096) * 4, 0), 'muted'));
            fmt(items);
          });
          return ok(outPlain, rich);
        }
        case 'cd': {
          const me = this.me();
          const t = rest[0] || me.home;
          if (t === '-') return ok([this.absCwd(cwd)]);
          const abs = this.absPath(t, cwd);
          const r = this.lookup(abs);
          if (!r.node) return fail('bash: cd: ' + t + ': ' + this.errMsg(r.err));
          if (r.node.t !== 'd') return fail('bash: cd: ' + t + ': 디렉터리가 아닙니다', '파일은 cat ' + t + ' 로 열어보세요.');
          if (!this.can(r.node, 'x')) return fail('bash: cd: ' + t + ': 허가 거부');
          return { plain: [], cwd: r.path };
        }
        case 'pwd': return ok([this.absCwd(cwd)]);
        case 'tree': {
          const opts = { a: /a/.test(flags), d: /d/.test(flags), L: null };
          const li = args.indexOf('-L');
          if (li >= 0 && args[li + 1]) opts.L = parseInt(args[li + 1], 10) || 1;
          const t = rest.filter((x) => x !== String(opts.L))[0] || '.';
          const r = this.lookup(this.absPath(t, cwd));
          if (!r.node) return fail(t + ' [error opening dir]', '0 directories, 0 files');
          const acc = { lines: [t], d: 0, f: 0 };
          if (r.node.t === 'd') this.treeLines(r.node, '', opts, acc, 0);
          acc.lines.push('', acc.d + (acc.d === 1 ? ' directory' : ' directories') + (opts.d ? '' : ', ' + acc.f + (acc.f === 1 ? ' file' : ' files')));
          return ok(acc.lines);
        }
        case 'file': {
          if (!rest[0]) return fail('사용법: file <이름>');
          return ok(rest.map((t) => {
            const r = this.lookup(this.absPath(t, cwd), false);
            if (!r.node) return t + ": cannot open `" + t + "' (No such file or directory)";
            const n = r.node;
            let d = 'ASCII text';
            if (n.t === 'd') d = (n.m & 0o1000) ? 'sticky, directory' : 'directory';
            else if (n.t === 'l') d = 'symbolic link to ' + n.target;
            else if (n.t === 'c') d = 'character special (' + n.major + '/' + n.minor + ')';
            else if (n.t === 'b') d = 'block special (' + n.major + '/' + n.minor + ')';
            else if (n.kind === 'image') d = 'JPEG image data, JFIF standard 1.01, progressive, 640x800';
            else if (n.kind === 'secret') d = 'data';
            else if (n.kind === 'bin') d = (n.m & 0o4000 ? 'setuid ' : '') + 'ELF 64-bit LSB pie executable, x86-64, version 1 (SYSV), dynamically linked, stripped';
            else if (!this.can(n, 'r')) d = 'regular file, no read permission';
            else if (!this.linesOf(n).length) d = 'empty';
            else if (/[^\x00-\x7f]/.test(this.linesOf(n).join(''))) d = 'Unicode text, UTF-8 text';
            return t + ': ' + d;
          }));
        }
        case 'stat': {
          if (!rest[0]) return fail('stat: 피연산자가 없습니다');
          const outL = [];
          for (const t of rest) {
            const r = this.lookup(this.absPath(t, cwd), false);
            if (!r.node) return fail("stat: '" + t + "'의 상태를 확인할 수 없음: " + this.errMsg(r.err));
            const n = r.node;
            const type = { d: 'directory', l: 'symbolic link', c: 'character special file', b: 'block special file' }[n.t] || (this.sizeOf(n) ? 'regular file' : 'regular empty file');
            const ts = new Date(n.mt);
            const iso = ts.getFullYear() + '-' + String(ts.getMonth() + 1).padStart(2, '0') + '-' + String(ts.getDate()).padStart(2, '0') + ' ' + ts.toTimeString().slice(0, 8) + '.000000000 +0900';
            outL.push('  File: ' + t + (n.t === 'l' ? ' -> ' + n.target : ''), '  Size: ' + String(this.sizeOf(n)).padEnd(10) + '\tBlocks: ' + String(Math.ceil(this.sizeOf(n) / 512)).padEnd(10) + ' IO Block: 4096   ' + type,
              'Device: 8,1\tInode: ' + (131072 + (t.length * 977) % 65536) + '      Links: 1',
              'Access: (' + (n.m & 0o7777).toString(8).padStart(4, '0') + '/' + this.modeStr(n) + ')  Uid: (' + String(n.u).padStart(5) + '/' + this.uname(n.u).padStart(8) + ')   Gid: (' + String(n.g).padStart(5) + '/' + this.gname(n.g).padStart(8) + ')',
              'Access: ' + iso, 'Modify: ' + iso, 'Change: ' + iso, ' Birth: ' + iso);
          }
          return ok(outL);
        }
        case 'mkdir': {
          if (!rest.length) return fail('mkdir: 피연산자가 없습니다');
          const me = this.me();
          const pflag = /p/.test(flags);
          const errs = [];
          rest.forEach((t) => {
            const abs = this.absPath(t, cwd);
            const segs = abs.split('/').filter(Boolean);
            const steps = pflag ? segs.map((_, i) => '/' + segs.slice(0, i + 1).join('/')) : [abs];
            for (const p of steps) {
              const s = this.slot(p);
              if (s.exists) { if (!pflag) errs.push("mkdir: '" + t + "' 디렉터리를 만들 수 없습니다: 파일이 있습니다"); continue; }
              if (s.err) { errs.push("mkdir: '" + t + "' 디렉터리를 만들 수 없습니다: " + this.errMsg(s.err)); return; }
              s.parent.c[s.name] = { t: 'd', m: 0o755, u: me.uid, g: me.gid, mt: this.nowMs(), c: {} };
            }
          });
          return errs.length ? fail(errs.join('\n')) : ok([]);
        }
        case 'rmdir': {
          if (!rest.length) return fail('rmdir: 피연산자가 없습니다');
          for (const t of rest) {
            const r = this.lookup(this.absPath(t, cwd), false);
            if (!r.node) return fail("rmdir: '" + t + "' 제거 실패: " + this.errMsg(r.err));
            if (r.node.t !== 'd') return fail("rmdir: '" + t + "' 제거 실패: 디렉터리가 아닙니다");
            if (Object.keys(r.node.c).length) return fail("rmdir: '" + t + "' 제거 실패: 디렉터리가 비어 있지 않습니다");
            if (!this.canUnlink(r)) return fail("rmdir: '" + t + "' 제거 실패: 허가 거부");
            delete r.parent.c[r.name];
          }
          return ok([]);
        }
        case 'touch': {
          if (!rest.length) return fail('touch: 파일 피연산자가 없습니다');
          for (const t of rest) {
            const abs = this.absPath(t, cwd);
            const r = this.lookup(abs);
            if (r.node) {
              if (r.node.u !== this.me().uid && this.me().uid !== 0 && !this.can(r.node, 'w')) return fail("touch: '" + t + "'의 시간 정보를 설정할 수 없음: 허가 거부");
              r.node.mt = this.nowMs();
              continue;
            }
            const e = this.writeFile(abs, [], true);
            if (e) return fail("touch: '" + t + "'을(를) 만질 수 없음: " + this.errMsg(e));
          }
          return ok([]);
        }
        case 'rm': {
          const rec = /[rR]/.test(flags);
          const force = /f/.test(flags);
          if (!rest.length) return force ? ok([]) : fail('rm: 피연산자가 없습니다');
          const errs = [];
          for (const t of rest) {
            const abs = this.absPath(t, cwd);
            if (abs === '/' && rec) { errs.push("rm: it is dangerous to operate recursively on '/'", 'rm: use --no-preserve-root to override this failsafe'); continue; }
            const r = this.lookup(abs, false);
            if (!r.node) { if (!force) errs.push("rm: '" + t + "'를 지울 수 없음: " + this.errMsg(r.err)); continue; }
            if (r.node.t === 'd' && !rec) { errs.push("rm: '" + t + "'를 지울 수 없음: 디렉터리입니다"); continue; }
            if (!this.canUnlink(r)) { errs.push("rm: '" + t + "'를 지울 수 없음: 허가 거부"); continue; }
            if (r.node.t === 'd' && this.me().uid !== 0) {
              let blocked = false;
              this.walkTree(r.node, (x) => { if (x.t === 'd' && Object.keys(x.c).length && (!this.can(x, 'w') || !this.can(x, 'x'))) blocked = true; });
              if (blocked) { errs.push("rm: '" + t + "'를 지울 수 없음: 허가 거부"); continue; }
            }
            delete r.parent.c[r.name];
          }
          return errs.length ? fail(errs.join('\n')) : ok([]);
        }
        case 'cp': case 'mv': {
          const isMv = name === 'mv';
          if (rest.length < 2) return fail(name + ': 파일 피연산자가 없습니다');
          const me = this.me();
          const dst = rest[rest.length - 1];
          const dabs = this.absPath(dst, cwd);
          const dr = this.lookup(dabs);
          const dstIsDir = dr.node && dr.node.t === 'd';
          if (rest.length > 2 && !dstIsDir) return fail(name + ": 대상 '" + dst + "'은(는) 디렉터리가 아닙니다");
          for (const src of rest.slice(0, -1)) {
            const sabs = this.absPath(src, cwd);
            const sr = this.lookup(sabs, !isMv);
            if (!sr.node) return fail(name + ": '" + src + "'의 상태를 확인할 수 없음: " + this.errMsg(sr.err));
            if (!isMv && sr.node.t === 'd' && !/[rRa]/.test(flags)) return fail("cp: -r 지정되지 않음; '" + src + "' 디렉터리 생략");
            if (!isMv && !this.can(sr.node, 'r')) return fail("cp: '" + src + "'을(를) 읽기 위해 열 수 없음: 허가 거부");
            const target = dstIsDir ? dabs.replace(/\/$/, '') + '/' + sr.name : dabs;
            if (target === sabs || target.indexOf(sabs + '/') === 0) return fail(name + ": '" + src + "'을(를) 자기 자신의 하위 디렉터리로 옮길 수 없습니다");
            const tr = this.lookup(target, false);
            let parent, nm;
            if (tr.node) {
              if (tr.node.t === 'd') return fail(name + ": '" + target + "'을(를) 덮어쓸 수 없음: 디렉터리입니다");
              if (!this.canUnlink(tr) && !(this.can(tr.node, 'w') && !isMv)) return fail(name + ": '" + dst + "'을(를) 만들 수 없음: 허가 거부");
              parent = tr.parent; nm = tr.name;
            } else {
              const s = this.slot(target);
              if (s.err) return fail(name + ": '" + dst + "'을(를) 만들 수 없음: " + this.errMsg(s.err));
              parent = s.parent; nm = s.name;
            }
            if (isMv) {
              if (!this.canUnlink(sr)) return fail("mv: '" + src + "'을(를) '" + dst + "'(으)로 옮길 수 없음: 허가 거부");
              delete sr.parent.c[sr.name];
              parent.c[nm] = sr.node;
              sr.node.mt = this.nowMs();
            } else {
              const cp = this.cloneNode(sr.node, me.uid, me.gid);
              if (/p/.test(flags) || /a/.test(flags)) { cp.u = sr.node.u; cp.g = sr.node.g; cp.mt = sr.node.mt; }
              parent.c[nm] = cp;
            }
          }
          return ok([]);
        }
        case 'ln': {
          if (!/s/.test(flags)) return fail('ln: 이 시스템에서는 심볼릭 링크(ln -s)만 지원합니다');
          if (rest.length < 2) return fail('ln: 파일 피연산자가 없습니다');
          const s = this.slot(this.absPath(rest[1], cwd));
          if (s.exists) return fail("ln: 심볼릭 링크 '" + rest[1] + "' 생성 실패: 파일이 있습니다");
          if (s.err) return fail("ln: 심볼릭 링크 '" + rest[1] + "' 생성 실패: " + this.errMsg(s.err));
          const me = this.me();
          s.parent.c[s.name] = { t: 'l', m: 0o777, u: me.uid, g: me.gid, mt: this.nowMs(), target: rest[0] };
          return ok([]);
        }
        case 'chmod': {
          const posArgs = args.filter((a) => a !== '-R' && a !== '-v');
          if (posArgs.length < 2) return fail('chmod: 피연산자가 없습니다', '예) chmod 755 script.sh · chmod u+x file · chmod -R go-w dir');
          const spec = posArgs[0];
          const me = this.me();
          const errs = [];
          posArgs.slice(1).forEach((t) => {
            const r = this.lookup(this.absPath(t, cwd));
            if (!r.node) { errs.push("chmod: '" + t + "'에 접근할 수 없습니다: " + this.errMsg(r.err)); return; }
            const apply = (n) => {
              if (me.uid !== 0 && n.u !== me.uid) { errs.push("chmod: '" + t + "'의 권한을 바꾸는 중: 명령을 허용하지 않음"); return; }
              const m = this.parseMode(spec, n.m, n.t === 'd');
              if (m == null) { errs.push("chmod: 잘못된 모드: '" + spec + "'"); return; }
              n.m = m & 0o7777;
            };
            if (args.indexOf('-R') >= 0) this.walkTree(r.node, apply); else apply(r.node);
          });
          return errs.length ? fail(Array.from(new Set(errs)).join('\n')) : ok([]);
        }
        case 'chown': case 'chgrp': {
          const posArgs = args.filter((a) => a !== '-R' && a !== '-v' && a !== '-h');
          if (posArgs.length < 2) return fail(name + ': 피연산자가 없습니다', name === 'chown' ? '예) chown bob:bob file' : '예) chgrp users file');
          const me = this.me();
          let nu = null, ng = null;
          if (name === 'chown') {
            const sp = posArgs[0].split(/[:.]/);
            if (sp[0]) { const u = this.userBy(sp[0]); if (!u) return fail("chown: 잘못된 사용자: '" + posArgs[0] + "'"); nu = u.uid; }
            if (sp.length > 1) {
              if (sp[1]) { const g = this.groupBy(sp[1]); if (!g) return fail("chown: 잘못된 그룹: '" + posArgs[0] + "'"); ng = g.gid; }
              else if (nu != null) ng = this.userBy(sp[0]).gid;
            }
          } else {
            const g = this.groupBy(posArgs[0]);
            if (!g) return fail("chgrp: 잘못된 그룹: '" + posArgs[0] + "'");
            ng = g.gid;
          }
          const errs = [];
          posArgs.slice(1).forEach((t) => {
            const r = this.lookup(this.absPath(t, cwd));
            if (!r.node) { errs.push(name + ": '" + t + "'에 접근할 수 없습니다: " + this.errMsg(r.err)); return; }
            const apply = (n) => {
              const okUser = nu == null || me.uid === 0 || (nu === n.u && n.u === me.uid);
              const okGroup = ng == null || me.uid === 0 || (n.u === me.uid && this.gidsOf(me).indexOf(ng) >= 0);
              if (!okUser || !okGroup) { errs.push(name + ": '" + t + "'의 " + (nu != null ? '소유자' : '그룹') + '를 바꾸는 중: 명령을 허용하지 않음'); return; }
              if (nu != null) n.u = nu;
              if (ng != null) n.g = ng;
              if (me.uid !== 0) n.m &= ~0o6000;
            };
            if (args.indexOf('-R') >= 0) this.walkTree(r.node, apply); else apply(r.node);
          });
          return errs.length ? fail(Array.from(new Set(errs)).join('\n')) : ok([]);
        }
        case 'whoami': return ok([this.me().name]);
        case 'id': {
          const u = rest[0] ? this.userBy(rest[0]) : this.me();
          if (!u) return fail("id: '" + rest[0] + "': 그런 사용자가 없습니다");
          if (/u/.test(flags)) return ok([String(u.uid)]);
          if (/g/.test(flags)) return ok([String(u.gid)]);
          if (/n/.test(flags)) return ok([u.name]);
          return ok(['uid=' + u.uid + '(' + u.name + ') gid=' + u.gid + '(' + this.gname(u.gid) + ') groups=' + this.gidsOf(u).map((g) => g + '(' + this.gname(g) + ')').join(',')]);
        }
        case 'groups': {
          const list = rest.length ? rest : [null];
          const outL = [];
          for (const x of list) {
            const u = x ? this.userBy(x) : this.me();
            if (!u) return fail("groups: '" + x + "': 그런 사용자가 없습니다");
            outL.push((x ? x + ' : ' : '') + this.gidsOf(u).map((g) => this.gname(g)).join(' '));
          }
          return ok(outL);
        }
        case 'who': case 'w': case 'users': {
          const S = this.sys();
          const names = Array.from(new Set(S.stack.map((x) => this.uname(x.uid))));
          if (name === 'users') return ok([names.join(' ')]);
          return ok(S.stack.map((x, i) => this.uname(x.uid).padEnd(9) + (i === 0 ? 'tty1' : 'pts/' + (i - 1)).padEnd(13) + '2026-11-18 21:00'));
        }
        case 'uname': {
          if (/a/.test(flags)) return ok(['Linux chanhee 6.1.0-28-amd64 #1 SMP PREEMPT_DYNAMIC Debian 6.1.119-1 (2024-11-22) x86_64 GNU/Linux']);
          if (/r/.test(flags)) return ok(['6.1.0-28-amd64']);
          if (/n/.test(flags)) return ok(['chanhee']);
          return ok(['Linux']);
        }
        case 'tee': {
          const app = /a/.test(flags);
          const lines = stdin || [];
          for (const t of rest) {
            const e = this.writeFile(this.absPath(t, cwd), lines, app);
            if (e) return fail('tee: ' + t + ': ' + this.errMsg(e));
          }
          return ok(lines);
        }
        case 'sudo': {
          const me = this.me();
          let i = 0, target = 'root', login = false, shell = false, list = false, reset = false;
          while (i < args.length && /^-/.test(args[i])) {
            const o = args[i];
            if (o === '-u' && args[i + 1]) { target = args[i + 1]; i += 2; continue; }
            if (o.indexOf('i') >= 0) login = true;
            if (o.indexOf('s') >= 0) shell = true;
            if (o.indexOf('l') >= 0) list = true;
            if (o.indexOf('k') >= 0 || o.indexOf('K') >= 0) reset = true;
            i++;
          }
          const sub = args.slice(i).join(' ');
          if (reset) { this.sys().sudoAt[me.name] = 0; if (!sub) return ok([]); }
          if (!sub && !login && !shell && !list) return fail('usage: sudo -h | -K | -k | -V', 'usage: sudo [-i | -s] [-u user] [command]');
          const S = this.sys();
          const fresh = me.uid === 0 || (S.sudoAt[me.name] && Date.now() - S.sudoAt[me.name] < 15 * 60000);
          if (!fresh) return { needAuth: true, lecture: !S.lectured[me.name] };
          const g = this.groupBy('sudo');
          if (me.uid !== 0 && !(g && g.members.indexOf(me.name) >= 0)) return fail(me.name + ' is not in the sudoers file.');
          const tu = this.userBy(target);
          if (!tu) return fail('sudo: unknown user ' + target);
          if (list) return ok(['Matching Defaults entries for ' + me.name + ' on chanhee:', '    env_reset, mail_badpass, secure_path=/usr/local/sbin\\:/usr/local/bin\\:/usr/sbin\\:/usr/bin\\:/sbin\\:/bin, use_pty', '', 'User ' + me.name + ' may run the following commands on chanhee:', '    (ALL : ALL) ALL']);
          if (login || shell) return { plain: [], switchTo: { uid: tu.uid, login } };
          const prev = S.temp;
          S.temp = tu.uid;
          let r;
          try { r = this.cmd(sub, cwd, hist, stdin, piped); } finally { S.temp = prev; }
          if (r && r.switchTo) return r;
          if (r && r.err && /command not found/.test(r.err)) return fail('sudo: ' + sub.split(/\s+/)[0] + ': command not found');
          return r;
        }
        case 'su': {
          const me = this.me();
          const S = this.sys();
          const login = args.some((a) => a === '-' || a === '-l' || a === '--login');
          const who = rest[0] || 'root';
          const tu = this.userBy(who);
          if (!tu) return fail("su: user " + who + " does not exist or the user entry does not contain all the required fields");
          if (me.uid === 0) return { plain: [], switchTo: { uid: tu.uid, login } };
          return {
            plain: [],
            pending: this.askPw('Password: ', (pw) => {
              if (!this.pwOk(tu, pw)) return { out: [L('su: Authentication failure', 'err')].concat(tu.uid === 0 ? [L('root 비밀번호는 알려드릴 수 없어요. 대신 sudo su - 를 써보세요.', 'muted')] : []) };
              return { out: [], switchTo: { uid: tu.uid, login } };
            })
          };
        }
        case 'exit': case 'logout': {
          if (this.sys().stack.length > 1) return { plain: [], logout: true };
          return fail(name === 'logout' ? 'bash: logout: 로그인 셸이 아닙니다: `exit\' 를 쓰세요' : '로그아웃할 수 없습니다. 아직 볼 프로젝트가 남았어요.');
        }
        case 'useradd': case 'adduser': case 'addgroup': case 'groupadd': {
          const me = this.me();
          const S = this.sys();
          if (me.uid !== 0) {
            if (name === 'adduser' || name === 'addgroup') return fail(name + ': Only root may add a user or group to the system.', 'sudo ' + str + ' 처럼 앞에 sudo 를 붙여보세요.');
            return fail(name + ': Permission denied.', name + ': cannot lock /etc/' + (name === 'groupadd' ? 'group' : 'passwd') + '; try again later.');
          }
          const opt = (k) => { const j = args.indexOf(k); return j >= 0 ? args[j + 1] : null; };
          const valued = ['-s', '-G', '-g', '-d', '-u', '-c', '--gid', '--uid', '--shell', '--home', '--ingroup'];
          const pos = args.filter((a, j) => !/^-/.test(a) && valued.indexOf(args[j - 1]) < 0);
          const nm = pos[0];
          if (!nm) return fail(name + ': 사용자 이름이 필요합니다', '예) ' + (name === 'groupadd' || name === 'addgroup' ? 'groupadd devs' : name + ' bob'));
          if (!/^[a-z_][a-z0-9_-]*\$?$/.test(nm) || nm.length > 32) return fail(name + ": invalid " + (name === 'groupadd' ? 'group' : 'user') + " name '" + nm + "'");
          if (name === 'groupadd' || name === 'addgroup' || (name === 'adduser' && args.indexOf('--group') >= 0)) {
            if (this.groupBy(nm)) return fail(name + ": group '" + nm + "' already exists");
            const gid = opt('-g') ? parseInt(opt('-g'), 10) : this.nextId('gid');
            S.groups.push({ name: nm, gid, members: [] });
            return ok(name === 'addgroup' ? ["Adding group `" + nm + "' (GID " + gid + ") ...", 'Done.'] : []);
          }
          if (name === 'adduser' && pos.length === 2) {
            const u = this.userBy(pos[0]); const g = this.groupBy(pos[1]);
            if (!u) return fail("adduser: The user `" + pos[0] + "' does not exist.");
            if (!g) return fail("adduser: The group `" + pos[1] + "' does not exist.");
            if (g.members.indexOf(u.name) < 0) g.members.push(u.name);
            return ok(["Adding user `" + u.name + "' to group `" + g.name + "' ...", 'Done.']);
          }
          if (this.userBy(nm)) return fail(name + ": " + (name === 'adduser' ? "The user `" + nm + "' already exists." : "user '" + nm + "' already exists"));
          const uid = opt('-u') ? parseInt(opt('-u'), 10) : this.nextId('uid');
          let gid;
          const gOpt = opt('-g') || opt('--ingroup');
          if (gOpt) { const g = this.groupBy(gOpt); if (!g) return fail(name + ": group '" + gOpt + "' does not exist"); gid = g.gid; }
          else { gid = this.groupBy(nm) ? this.nextId('gid') : (S.groups.some((g) => g.gid === uid) ? this.nextId('gid') : uid); S.groups.push({ name: nm, gid, members: [] }); }
          const u = { name: nm, uid, gid, gecos: opt('-c') ? opt('-c') + ',,,' : (name === 'adduser' ? ',,,' : ''), home: opt('-d') || ('/home/' + nm), shell: opt('-s') || opt('--shell') || (name === 'adduser' ? '/bin/bash' : '/bin/sh'), pw: '!' };
          S.users.push(u);
          const sup = opt('-G');
          if (sup) {
            for (const gn of sup.split(',')) { const g = this.groupBy(gn); if (!g) { S.users.pop(); return fail("useradd: group '" + gn + "' does not exist"); } if (g.members.indexOf(nm) < 0) g.members.push(nm); }
          }
          if (name === 'useradd') {
            if (args.indexOf('-m') >= 0 || args.indexOf('--create-home') >= 0) this.mkHome(u, 0o755);
            return ok([]);
          }
          this.mkHome(u, 0o700);
          const ug = this.groupBy('users');
          if (ug && ug.members.indexOf(nm) < 0) ug.members.push(nm);
          const head = ["Adding user `" + nm + "' ...", "Adding new group `" + nm + "' (" + gid + ") ...", "Adding new user `" + nm + "' (" + uid + ") with group `" + nm + " (" + gid + ")' ...", "Creating home directory `" + u.home + "' ...", "Copying files from `/etc/skel' ..."].map((x) => L(x));
          const tail = () => ['Changing the user information for ' + nm, 'Enter the new value, or press ENTER for the default', '\tFull Name []: ', '\tRoom Number []: ', '\tWork Phone []: ', '\tHome Phone []: ', '\tOther []: ', 'Is the information correct? [Y/n] Y', "Adding new user `" + nm + "' to supplemental / extra groups `users' ...", "Adding user `" + nm + "' to group `users' ..."].map((x) => L(x));
          return { plain: [], rich: head, pending: this.newPwFlow(u, () => tail()) };
        }
        case 'passwd': {
          const me = this.me();
          const who = rest[0] || me.name;
          const u = this.userBy(who);
          if (!u) return fail("passwd: user '" + who + "' does not exist");
          if (me.uid !== 0 && u.uid !== me.uid) return fail('passwd: You may not view or modify password information for ' + who + '.');
          if (/S/.test(flags)) return ok([u.name + ' ' + (u.pw === '' || (u.pw && u.pw.charAt(0) !== '!' && u.pw !== '*') ? 'P' : 'L') + ' 11/18/2026 0 99999 7 -1']);
          if (/l/.test(flags)) { if (me.uid !== 0) return fail('passwd: Permission denied.'); if (u.pw.charAt(0) !== '!') u.pw = '!' + u.pw; return ok(['passwd: password changed.']); }
          if (/u/.test(flags)) { if (me.uid !== 0) return fail('passwd: Permission denied.'); if (u.pw.charAt(0) === '!' && u.pw.length > 1) u.pw = u.pw.slice(1); return ok(['passwd: password changed.']); }
          if (me.uid === 0) return { plain: [], rich: [], pending: this.newPwFlow(u) };
          return {
            plain: [], rich: [L('Changing password for ' + u.name + '.')],
            pending: this.askPw('Current password: ', (pw) => {
              if (!this.pwOk(u, pw)) return { out: [L('passwd: Authentication token manipulation error', 'err'), L('passwd: password unchanged', 'err')] };
              return { out: [], pending: this.newPwFlow(u) };
            })
          };
        }
        case 'userdel': case 'deluser': case 'groupdel': case 'delgroup': {
          const me = this.me();
          const S = this.sys();
          if (me.uid !== 0) return fail(name === 'deluser' || name === 'delgroup' ? name + ': Only root may remove a user or group from the system.' : name + ': Permission denied.', name + ': cannot lock /etc/' + (/group/.test(name) ? 'group' : 'passwd') + '; try again later.');
          const pos = rest;
          const nm = pos[0];
          if (!nm) return fail(name + ': 이름이 필요합니다');
          if (name === 'groupdel' || name === 'delgroup' || (name === 'deluser' && pos.length === 2)) {
            const gn = name === 'deluser' ? pos[1] : nm;
            const g = this.groupBy(gn);
            if (!g) return fail(name + ": group '" + gn + "' does not exist");
            if (name === 'deluser') { const k = g.members.indexOf(nm); if (k < 0) return fail("deluser: The user `" + nm + "' is not a member of group `" + gn + "'."); g.members.splice(k, 1); return ok(["Removing user `" + nm + "' from group `" + gn + "' ...", 'Done.']); }
            const prim = S.users.find((u) => u.gid === g.gid);
            if (prim) return fail("groupdel: cannot remove the primary group of user '" + prim.name + "'");
            S.groups.splice(S.groups.indexOf(g), 1);
            return ok(name === 'delgroup' ? ["Removing group `" + gn + "' ...", 'Done.'] : []);
          }
          const u = this.userBy(nm);
          if (!u) return fail(name === 'deluser' ? "deluser: The user `" + nm + "' does not exist." : "userdel: user '" + nm + "' does not exist");
          if (S.stack.some((x) => x.uid === u.uid)) return fail('userdel: user ' + nm + ' is currently used by process ' + (4242 + u.uid % 97));
          if (u.uid === 0) return fail('userdel: user root is currently used by process 1');
          S.users.splice(S.users.indexOf(u), 1);
          S.groups.forEach((g) => { const k = g.members.indexOf(nm); if (k >= 0) g.members.splice(k, 1); });
          const pg = S.groups.find((g) => g.gid === u.gid && g.name === nm);
          if (pg) S.groups.splice(S.groups.indexOf(pg), 1);
          const rmHome = args.indexOf('-r') >= 0 || args.indexOf('--remove-home') >= 0;
          if (rmHome) { const hr = this.lookup(u.home, false); if (hr.node && hr.parent) delete hr.parent.c[hr.name]; }
          if (name === 'deluser') return ok((rmHome ? ['Looking for files to backup/remove ...', 'Removing files ...'] : []).concat(["Removing crontab ...", "Removing user `" + nm + "' ...", 'Done.']));
          return ok([]);
        }
        case 'usermod': case 'gpasswd': {
          const me = this.me();
          if (me.uid !== 0) return fail(name + ': Permission denied.', name + ': cannot lock /etc/passwd; try again later.');
          if (name === 'gpasswd') {
            const mode = args.indexOf('-a') >= 0 ? 'a' : (args.indexOf('-d') >= 0 ? 'd' : null);
            if (!mode || rest.length < 2) return fail('Usage: gpasswd [option] GROUP', '예) gpasswd -a bob sudo');
            const u = this.userBy(rest[0]); const g = this.groupBy(rest[1]);
            if (!u) return fail("gpasswd: user '" + rest[0] + "' does not exist");
            if (!g) return fail("gpasswd: group '" + rest[1] + "' does not exist in /etc/group");
            const k = g.members.indexOf(u.name);
            if (mode === 'a') { if (k < 0) g.members.push(u.name); return ok(['Adding user ' + u.name + ' to group ' + g.name]); }
            if (k < 0) return fail('gpasswd: user \'' + u.name + '\' is not a member of \'' + g.name + '\'');
            g.members.splice(k, 1);
            return ok(['Removing user ' + u.name + ' from group ' + g.name]);
          }
          const opt = (k) => { const j = args.indexOf(k); return j >= 0 ? args[j + 1] : null; };
          const valued = ['-s', '-G', '-g', '-d', '-l', '-c', '-aG'];
          const pos = args.filter((a, j) => !/^-/.test(a) && valued.indexOf(args[j - 1]) < 0);
          const u = this.userBy(pos[0]);
          if (!u) return fail("usermod: user '" + (pos[0] || '') + "' does not exist");
          const G = opt('-G') || opt('-aG');
          if (G) {
            const append = args.indexOf('-a') >= 0 || args.indexOf('-aG') >= 0;
            const names = G.split(',');
            for (const gn of names) if (!this.groupBy(gn)) return fail("usermod: group '" + gn + "' does not exist");
            if (!append) this.sys().groups.forEach((g) => { if (g.gid !== u.gid) { const k = g.members.indexOf(u.name); if (k >= 0 && names.indexOf(g.name) < 0) g.members.splice(k, 1); } });
            names.forEach((gn) => { const g = this.groupBy(gn); if (g.members.indexOf(u.name) < 0) g.members.push(u.name); });
          }
          if (opt('-g')) { const g = this.groupBy(opt('-g')); if (!g) return fail("usermod: group '" + opt('-g') + "' does not exist"); u.gid = g.gid; }
          if (opt('-s')) u.shell = opt('-s');
          if (opt('-c')) u.gecos = opt('-c');
          if (opt('-d')) u.home = opt('-d');
          if (opt('-l')) { if (this.userBy(opt('-l'))) return fail("usermod: user '" + opt('-l') + "' already exists"); const old = u.name; u.name = opt('-l'); this.sys().groups.forEach((g) => { const k = g.members.indexOf(old); if (k >= 0) g.members[k] = u.name; }); }
          if (args.indexOf('-L') >= 0 && u.pw.charAt(0) !== '!') u.pw = '!' + u.pw;
          if (args.indexOf('-U') >= 0 && u.pw.charAt(0) === '!' && u.pw.length > 1) u.pw = u.pw.slice(1);
          return ok([]);
        }
        case 'hostname': return ok(['chanhee']);
        case 'apt': case 'apt-get': case 'yum': case 'pip': case 'npm': case 'dpkg': {
          if (this.me().uid !== 0 && name.indexOf('apt') === 0 && /^(install|remove|update|upgrade|purge)$/.test(rest[0] || '')) return fail('E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: 허가 거부)', 'E: Unable to acquire the dpkg frontend lock (/var/lib/dpkg/lock-frontend), are you root?');
          return fail('E: 이 포트폴리오는 인터넷에 연결돼 있지 않아 패키지를 설치할 수 없어요.');
        }
        case 'help': {
          const row = (c, d) => L(d, 'out', '  ' + c.padEnd(22), 'path');
          return ok(null, [
            L('GNU bash 5.2 — chanhee-portfolio · 사용할 수 있는 명령어', 'accent'),
            row('ls [-la] [dir]', '파일 목록'), row('cd <dir> · pwd', '이동 · 현재 위치'),
            row('cat <file>', '파일 내용 보기          예) cat about.txt'),
            row('head / tail [-n N]', '앞 · 뒤 N줄             예) head -n 2 stack.txt'),
            row('grep <word> <file>', '검색                    예) cat stack.txt | grep AWS'),
            row('wc -l <file> · tree', '줄 수 · 전체 구조'),
            row('man <project>', '프로젝트 매뉴얼 보기   예) man pikcha'),
            row('vi <file>', 'vim으로 원문 보기       예) vi pikcha.txt'),
            row('man workflow', 'AI 협업 개발 워크플로 문서'),
            row('display <image>', '이미지 보기             예) display chanhee.jpg'),
            row('git log', '활동 기록'), row('neofetch · uname -a', '시스템 정보'),
            row('startx', 'GUI 모드로 전환 (아래로 스크롤)'), row('history · clear', '입력 기록 · 화면 지우기'),
            L(''), L('리눅스 흉내 (Debian 12 · 새로고침하면 처음으로)', 'accent'),
            row('sudo su - · exit', '관리자(root)로 · 돌아오기'),
            row('mkdir touch rm cp mv', '파일 만들기·지우기   예) touch /tmp/hi'),
            row('chmod chown chgrp', '권한·소유자 바꾸기   예) chmod 600 /tmp/hi'),
            row('adduser · passwd', '사용자 만들기        예) sudo adduser bob'),
            row('usermod · groupadd', '그룹                 예) sudo usermod -aG sudo bob'),
            row('su - <user> · id', '사용자 바꾸기 · 확인'),
            row('echo > file · tee', '파일에 쓰기          예) echo hi > /tmp/hi'),
            L(''), L('처음이라면: ls → cat about.txt → man pikcha', 'muted'), L('Tab 자동완성, ↑↓ 이전 명령어.', 'muted')
          ]);
        }
        case 'cat': case 'less': case 'more': {
          if (!piped && this.isSecret(rest, cwd)) return openSecret();
          const r = readInput(rest, name);
          return r.err ? fail(r.err) : ok(r.lines);
        }
        case 'head': case 'tail': {
          const a = numArg(10);
          if (!piped && this.isSecret(a.files, cwd)) return openSecret();
          const r = readInput(a.files, name);
          if (r.err) return fail(r.err);
          return ok(name === 'head' ? r.lines.slice(0, a.n) : r.lines.slice(-a.n));
        }
        case 'wc': {
          const r = readInput(rest, 'wc');
          if (r.err) return fail(r.err);
          const n = r.lines.length;
          const label = r.name ? ' ' + r.name : '';
          if (flags.indexOf('l') >= 0) return ok([n + label]);
          const words = r.lines.join(' ').split(/\s+/).filter(Boolean).length;
          return ok(['  ' + n + '  ' + words + '  ' + r.lines.join('\n').length + label]);
        }
        case 'grep': {
          if (!rest[0]) return fail('사용법: grep <단어> <파일>   예) grep AWS stack.txt');
          const pat = rest[0].replace(/^['"]|['"]$/g, '');
          const r = readInput(rest.slice(1), 'grep');
          if (r.err) return fail(r.err);
          const ci = flags.indexOf('i') >= 0;
          return ok(r.lines.filter((l) => ci ? l.toLowerCase().indexOf(pat.toLowerCase()) >= 0 : l.indexOf(pat) >= 0));
        }
        case 'sort': { const r = readInput(rest, 'sort'); return r.err ? fail(r.err) : ok(r.lines.slice().sort()); }
        case 'vi': case 'vim': case 'nvim': case 'view': case 'open': {
          if (!rest[0]) return fail('사용법: vi <파일>   예) vi pikcha', 'ls projects 로 열 수 있는 프로젝트를 확인하세요.');
          const r = this.resolve(rest[0], cwd);
          if (!r) return fail('"' + rest[0] + '" [새 파일] — 읽기 전용 포트폴리오라 새 파일을 만들 수 없어요.');
          if (r.type === 'dir') return fail('"' + rest[0] + '" 는 디렉터리입니다', 'ls ' + rest[0] + ' 로 목록을 보세요.');
          if (r.type === 'image') return { plain: [], rich: [L('"' + r.name + '" 은 이미지라 이미지 뷰어로 엽니다.', 'muted')], img: true };
          if (!this.can(r.node, 'r')) return fail('"' + rest[0] + '" [허가 거부]');
          if (r.type === 'secret') return openSecret();
          if (r.node.kind === 'bin') return fail('"' + rest[0] + '" 바이너리 파일이라 열지 않습니다');
          return { plain: [], rich: [L('"' + r.name + '" [readonly] ' + r.lines.length + 'L', 'muted')], vim: { name: r.name, lines: r.lines } };
        }
        case 'display': case 'xdg-open': case 'feh': case 'eog': {
          if (!rest[0]) return fail('사용법: display <이미지>   예) display chanhee.jpg');
          const r = this.resolve(rest[0], cwd);
          if (!r) return fail(name + ": '" + rest[0] + "': 그런 파일이 없습니다");
          if (r.type !== 'image') return fail(name + ': ' + rest[0] + ': 이미지 파일이 아닙니다', r.type === 'file' ? 'cat ' + rest[0] + ' 로 읽어보세요.' : null);
          return { plain: [], rich: [L('Opening chanhee.jpg (640x800) ...', 'muted')], img: true };
        }
        case 'nano': case 'emacs': case 'code': return fail(name + ': 이 시스템의 에디터는 vi 뿐입니다.', '예) vi pikcha');
        case 'man': {
          const docs = { ls: 'ls — 디렉터리 내용 보기. -l 자세히, -a 숨김 파일 포함', cat: 'cat — 파일 내용 출력', head: 'head — 앞 N줄 출력 (-n N)', tail: 'tail — 뒤 N줄 출력 (-n N)', grep: 'grep — 패턴과 일치하는 줄 출력 (-i 대소문자 무시)', vi: 'vi — 화면 편집기. 여기서는 읽기 전용으로 프로젝트를 엽니다', startx: 'startx — X 서버를 시작합니다. 여기서는 GUI 모드로 이동합니다' };
          if (!rest[0]) return fail('어떤 매뉴얼을 원하세요? 예) man ls');
          if (docs[rest[0]]) return ok([docs[rest[0]]]);
          if (/^(workflow|orca)$/i.test(rest[0])) return { plain: [], rich: [L('Formatting workflow(7), please wait...', 'muted')], man: 'workflow' };
          const r0 = this.resolve(rest[0], cwd);
          const r = r0 && r0.project ? r0 : (this.findProject(rest[0]) ? { project: this.findProject(rest[0]) } : null);
          if (r && r.project) return { plain: [], rich: [L('Formatting ' + r.project.id + '(1), please wait...', 'muted')], man: r.project.id };
          return fail(rest[0] + ' 에 대한 매뉴얼 항목이 없습니다');
        }
        case 'git': {
          if (rest[0] !== 'log') return fail('git: 지금은 log 만 지원합니다.', '예) git log');
          return ok(this.homeFiles().timeline);
        }
        case 'neofetch': return ok(null, this.banner());
        case 'uptime': return ok([' 21:00:00 up 2 years,  1 user,  load average: 0.42, 0.37, 0.31']);
        case 'date': return ok([new Date().toString()]);
        case 'echo': return ok([rest.join(' ').replace(/^['"]|['"]$/g, '')]);
        case 'history': return ok(hist.concat([str]).map((h, i) => String(i + 1).padStart(5) + '  ' + h));
        case 'clear': return { plain: [], clear: true };
        case 'startx': return { plain: [], rich: [L('Starting X.Org X Server 21.1 ...', 'muted'), L('Started GUI session. 아래로 이동합니다.', 'out', '[  OK  ] ', 'accent')], startx: true };
        default: {
          const r = this.resolve(name, cwd);
          let hint = null;
          if (r && r.project) hint = '혹시 vi ' + name + ' ?';
          else if (r && r.type === 'image') hint = '혹시 display ' + name + ' ?';
          else if (r && r.type === 'file') hint = '혹시 cat ' + r.name + ' ?';
          else if (/^(about|certs|contact|stack|timeline)$/.test(name)) hint = '혹시 cat ' + name + '.txt ?';
          else if (name === 'projects') hint = '혹시 ls projects ?';
          return fail('bash: ' + name + ': command not found', hint || "'help' 를 입력해보세요");
        }
      }
    }
    toRich(s) {
      const L = (a, b, c, d) => this.L(a, b, c, d);
      if (/^\[ OK \]/.test(s)) return L(s.slice(6), 'out', '[ OK ]', 'accent');
      if (/^\[ \.\. \]/.test(s)) return L(s.slice(6), 'out', '[ .. ]', 'warn');
      if (/^\* [0-9a-f]{7}/.test(s)) return L(s.slice(9), 'out', s.slice(0, 9), 'warn');
      if (/^STATUS /.test(s)) return L(s, 'muted');
      if (/^#{1,3} /.test(s)) return L(s, 'accent');
      if (/^```/.test(s)) return L(s, 'muted');
      { const m = s.match(/^([a-z][^\s].*?\s{2,})/); if (m) return L(s.slice(m[1].length), 'out', m[1], 'path'); }
      return L(s, 'out');
    }
    exec(c, cwd, hist) {
      const line0 = c;
      const me = this.me();
      c = c.replace(/\$\{?(HOME|USER|LOGNAME|PWD|SHELL|HOSTNAME|UID)\}?/g, (m0, k) => ({ HOME: me.home, USER: me.name, LOGNAME: me.name, PWD: this.absCwd(cwd), SHELL: me.shell, HOSTNAME: 'chanhee', UID: String(me.uid) })[k]);
      let redir = null;
      const rm = c.match(/^(.*?\S)\s*(2?>>?)\s*(\S+)\s*$/);
      if (rm) { redir = { append: rm[2].indexOf('>>') >= 0, err: rm[2].charAt(0) === '2', file: rm[3] }; c = rm[1].replace(/\s2$/, ''); }
      const stages = c.split('|').map((x) => x.trim()).filter(Boolean);
      let stdin = null;
      let res = null;
      for (let i = 0; i < stages.length; i++) {
        res = this.cmd(stages[i], cwd, hist, stdin, i > 0);
        if (res.needAuth) {
          const S = this.sys();
          const out = [];
          if (res.lecture) {
            S.lectured[this.me().name] = true;
            ['', 'We trust you have received the usual lecture from the local System', 'Administrator. It usually boils down to these three things:', '', '    #1) Respect the privacy of others.', '    #2) Think before you type.', '    #3) With great power comes great responsibility.', '', ''].concat(this.me().name === 'guest' ? ['(포트폴리오용 guest 계정이라 비밀번호는 아무거나 입력해도 돼요)', ''] : []).forEach((t) => out.push(this.L(t, t.indexOf('(') === 0 ? 'muted' : 'out')));
          }
          return { out, cwd, pending: this.sudoPrompt(line0, cwd, hist) };
        }
        if (res.pending) return { out: res.rich || (res.plain || []).map((x) => this.toRich(x)), cwd, pending: res.pending };
        if (res.err) break;
        stdin = res.plain || [];
      }
      if (res.err) {
        if (redir && redir.err) {
          if (redir.file !== '/dev/null') this.writeFile(this.absPath(redir.file, cwd), res.err.split('\n'), redir.append);
          return { out: [], cwd };
        }
        const out = res.err.split('\n').map((t) => this.L(t, 'err'));
        if (res.hint) out.push(this.L(res.hint, 'muted'));
        return { out, cwd };
      }
      const single = stages.length === 1;
      let out = single && res.rich ? res.rich : (res.plain || []).map((s) => this.toRich(s));
      if (redir && !redir.err) {
        const e = this.writeFile(this.absPath(redir.file, cwd), res.plain || [], redir.append);
        if (e) return { out: [this.L('bash: ' + redir.file + ': ' + this.errMsg(e), 'err')], cwd };
        out = [];
      }
      return { out, cwd: single && res.cwd ? res.cwd : cwd, vim: single ? res.vim : null, man: single && res.man, img: single && res.img, secret: single && res.secret, startx: single && res.startx, clear: single && res.clear, switchTo: single && res.switchTo, logout: single && res.logout };
    }
    powerOff() {
      if (this.sxTimer) clearTimeout(this.sxTimer);
      if (this.sxTimer2) clearTimeout(this.sxTimer2);
      let reduce = false;
      try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
      if (reduce || !(this.props.crt ?? true)) { this.sxTimer = setTimeout(() => this.scrollToGui(), 300); return; }
      this.setState({ crtOff: true });
      this.sxTimer = setTimeout(() => {
        this.scrollToGui();
        this.sxTimer2 = setTimeout(() => this.setState({ crtOff: false, powerN: (this.st().powerN || 0) + 1 }), 1000);
      }, 750);
    }
    scrollToGui() { if (this.guiEl && this.guiEl.scrollIntoView) this.guiEl.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    run(raw) {
      const c = String(raw || '').trim();
      this.stopBoot();
      const s = this.st();
      const base = s.booted ? (s.lines || []) : this.bootLines().concat(this.banner());
      const cwd = this.absCwd(s.cwd);
      const hist = s.hist || [];
      if (this.pendingP) {
        const p = this.pendingP;
        this.pendingP = null;
        const res = p.cb(String(raw || '')) || { out: [] };
        this.applyRes(res, base.concat([this.L(p.mask ? '' : String(raw || ''), 'out', p.label, 'out')]), cwd, hist, null);
        return;
      }
      const promptLine = (x) => this.L(x, 'out', this.promptStr(cwd), 'accent');
      if (!c) { this.setState({ booted: true, lines: base.concat([promptLine('')]), cmd: '' }); return; }
      const res = this.exec(c, cwd, hist);
      if (res.clear) { this.setState({ booted: true, lines: [], cmd: '', hist: hist.concat([c]).slice(-50), hIdx: null }); return; }
      this.applyRes(res, base.concat([promptLine(c)]), cwd, hist, c);
    }
    applyRes(res, lines0, cwd, hist, c) {
      const S = this.sys();
      let lines = lines0.concat(res.out || []);
      let newCwd = res.cwd || cwd;
      if (res.switchTo) {
        const t = res.switchTo;
        S.stack.push({ uid: t.uid, login: t.login, prevCwd: newCwd });
        if (t.login) {
          const u = this.me();
          const hr = this.lookup(u.home);
          if (hr.node && hr.node.t === 'd' && this.can(hr.node, 'x')) newCwd = hr.path;
          else lines = lines.concat([this.L('su: warning: cannot change directory to ' + u.home + ': ' + this.errMsg(hr.err || 'ENOENT'), 'muted')]);
        }
      }
      if (res.logout && S.stack.length > 1) {
        const top = S.stack.pop();
        if (top.login) lines.push(this.L('logout'));
        newCwd = top.prevCwd || newCwd;
      }
      if (!res.pending) lines.push(this.L(''));
      const next = { booted: true, lines: lines.slice(-300), cmd: '', cwd: newCwd, hIdx: null, pending: res.pending ? res.pending.label : null };
      if (c) next.hist = hist.concat([c]).slice(-50);
      if (res.pending) this.pendingP = res.pending;
      if (res.vim) { next.vim = res.vim; next.vimCmd = ''; next.vimMsg = ''; this.returnFocus = true; }
      if (res.man) { next.man = res.man; next.manBug = 0; next.manCmd = ''; next.manMsg = ''; this.returnFocus = true; this.pushRoute(res.man); }
      if (res.img) { next.img = true; this.returnFocus = true; }
      if (res.secret) { next.secret = true; this.returnFocus = true; }
      this.setState(next);
      if (res.startx) this.powerOff();
    }
    completions(v) {
      const parts = v.split(/\s+/);
      const cmds = ['help', 'ls', 'cd', 'pwd', 'cat', 'head', 'tail', 'grep', 'wc', 'tree', 'file', 'stat', 'vi', 'vim', 'man', 'git', 'neofetch', 'uname', 'whoami', 'id', 'groups', 'who', 'history', 'clear', 'startx', 'echo', 'date', 'sort', 'display', 'mkdir', 'rmdir', 'touch', 'rm', 'cp', 'mv', 'ln', 'chmod', 'chown', 'chgrp', 'tee', 'su', 'sudo', 'exit', 'useradd', 'adduser', 'userdel', 'deluser', 'usermod', 'groupadd', 'groupdel', 'gpasswd', 'passwd', 'hostname'];
      if (parts.length === 1) return cmds.filter((x) => x.startsWith(parts[0]) && x !== parts[0]);
      const last = parts[parts.length - 1];
      const head = parts.slice(0, -1).join(' ') + ' ';
      if (parts[0] === 'man' && last.indexOf('/') < 0) return this.docs().map((p) => p.id).filter((n) => n.startsWith(last) && n !== last).map((n) => head + n);
      const slash = last.lastIndexOf('/');
      const dirPart = slash >= 0 ? last.slice(0, slash + 1) : '';
      const pre = last.slice(slash + 1);
      const r = this.lookup(this.absPath(dirPart || '.', this.absCwd(this.st().cwd)));
      if (!r.node || r.node.t !== 'd' || !this.can(r.node, 'r')) return [];
      const names = this.sortNames(Object.keys(r.node.c).filter((k) => k.startsWith(pre) && (pre.charAt(0) === '.' || k.charAt(0) !== '.')));
      return names.map((k) => dirPart + k + (r.node.c[k].t === 'd' ? '/' : '')).filter((n) => n !== last).map((n) => head + n);
    }
    closeVim() { this.setState({ vim: null, vimCmd: '', vimMsg: '' }); }
    closeMan(fromHistory) {
      const s = this.st();
      if (!fromHistory && s.man) {
        try {
          if (this.pushed) {
            this.pushed = false;
            window.history.back();
            if (this.backTimer) clearTimeout(this.backTimer);
            this.backTimer = setTimeout(() => { if (this.st().man) this.setState({ man: null, manCmd: '', manMsg: '' }); }, 400);
            return;
          }
          if (/^#(man|vi)\//.test(window.location.hash || '')) window.history.replaceState(null, '', window.location.pathname + window.location.search);
        } catch (e) {}
      }
      this.setState({ man: null, manCmd: '', manMsg: '' });
    }
    openManFrom(p) { this.returnEl = typeof document !== 'undefined' ? document.activeElement : null; this.returnFocus = false; this.setState({ man: p.id, manBug: 0, manCmd: '', manMsg: '' }); this.pushRoute(p.id); }
    openVimFrom(p) { this.returnEl = typeof document !== 'undefined' ? document.activeElement : null; this.returnFocus = false; this.setState({ vim: { name: p.file, lines: p.md, route: p.id }, vimCmd: '', vimMsg: '' }); this.pushRoute(p.id); }
    vimView(lines) {
      const accent = this.props.accent ?? '#4ADE80';
      const out = [];
      let block = null;
      lines.forEach((t, i) => {
        const fence = /^```/.test(t);
        if (fence && !block) { block = { isLine: false, isBlock: true, nums: [], codes: [] }; out.push(block); }
        if (block) {
          block.nums.push({ num: String(i + 1) });
          block.codes.push({ text: t || ' ', color: fence ? '#8B949E' : '#7CB7FF' });
          if (fence && block.codes.length > 1) block = null;
          return;
        }
        let color = '#C9D4DF', weight = '400';
        if (/^# /.test(t)) { color = accent; weight = '800'; }
        else if (/^## /.test(t)) { color = accent; weight = '700'; }
        else if (/^### /.test(t)) { color = '#F5B454'; weight = '700'; }
        else if (/^> /.test(t)) color = '#A9B4C0';
        else if (/^- /.test(t)) color = '#E6EDF3';
        out.push({ isLine: true, isBlock: false, num: String(i + 1), numColor: '#7D8590', text: t || ' ', color, weight });
      });
      for (let k = 0; k < 6; k++) out.push({ isLine: true, isBlock: false, num: '~', numColor: '#6C8CFF', text: ' ', color: '#6C8CFF', weight: '400' });
      return out;
    }

    renderVals() {
      const accent = this.props.accent ?? '#4ADE80';
      const crt = this.props.crt ?? true;
      const s = this.st();
      const colors = { out: '#AAAAAA', muted: '#8A8A8A', err: '#FF5555', accent: '#55FF55', path: '#55FFFF', warn: '#FFFF55', bright: '#FFFFFF' };
      const lines = (s.lines || []).map((l) => ({
        isText: l.kind !== 'ascii', isAscii: l.kind === 'ascii',
        text: l.text, pre: l.pre || '', preColor: colors[l.preKind] || '#E6EDF3', color: colors[l.kind] || '#E6EDF3'
      }));
      const mkTab = (t) => ({ key: t[0], label: t[1], run: () => { this.setState({ menu: false }); this.run(t[2]); } });
      const tabsLeft = [['1', 'Help', 'help'], ['2', 'About', 'cat about.txt']].map(mkTab);
      const tabsRight = [['4', 'Workflow', 'man workflow'], ['5', 'Certs', 'cat certs.txt'], ['6', 'StartX', 'startx'], ['7', 'ls -la', 'ls -la']].map(mkTab);
      const P = this.projects();
      const menuItems = ['hawe', 'watchman', 'ridely', 'pikcha'].map((id) => P.find((p) => p.id === id)).filter(Boolean).map((p) => ({
        file: p.file, name: p.name,
        open: () => { if (this.menuTimer) clearTimeout(this.menuTimer); this.setState({ menu: false }); this.run('man ' + p.id); }
      }));
      const menuOpen = !!s.menu;
      const projects = this.projects().map((p) => ({
        name: p.name, file: p.id, featured: p.featured, summary: p.summary, meta: p.meta,
        tagList: p.tags.map((x) => ({ label: x })), stackList: p.stack.map((x) => ({ label: x })),
        open: () => this.openManFrom(p)
      }));
      const stackGroups = this.stackGroups().map((g) => ({ title: g.title, chips: g.items.map((x) => ({ label: x })) }));
      const keyColor = (k) => (k === 'PK' ? accent : (k === 'FK' ? '#F5B454' : '#8B949E'));
      const ownerCols = [['PK', 'id', 'INT'], ['', 'name', 'VARCHAR'], ['', 'school', 'VARCHAR'], ['', 'role', 'VARCHAR']].map((c) => ({ key: c[0], name: c[1], type: c[2], keyColor: keyColor(c[0]) }));
      const sel = s.erd || 'certification';
      const tableDefs = [
        { id: 'certification', title: 'CERTIFICATION', cols: [['PK ', 'id'], ['FK ', 'owner_id'], ['', 'name'], ['', 'issuer'], ['', 'acquired_at'], ['', 'status']] },
        { id: 'skill', title: 'SKILL', cols: [['PK ', 'id'], ['FK ', 'owner_id'], ['', 'category'], ['', 'name']] },
        { id: 'project', title: 'PROJECT', cols: [['PK ', 'id'], ['FK ', 'owner_id'], ['', 'name'], ['', 'role'], ['', 'period']] }
      ];
      const erdTables = tableDefs.map((t) => ({
        title: t.title, pressed: sel === t.id ? 'true' : 'false', border: sel === t.id ? accent : '#3A4552',
        hint: sel === t.id ? '● 실행 중' : 'SELECT ▸', hintColor: sel === t.id ? accent : '#8B949E',
        cols: t.cols.map((c) => ({ key: c[0], name: c[1], keyColor: keyColor(c[0].trim()) })),
        select: () => this.setState({ erd: t.id })
      }));
      const isProg = (v) => v === 'IN_PROGRESS' || v === 'PASSED_1ST';
      const statusCell = (v) => ({ v, color: v === 'ACQUIRED' ? accent : (isProg(v) ? '#F5B454' : '#E6EDF3'), weight: v === 'ACQUIRED' || isProg(v) ? '700' : '400' });
      let q;
      if (sel === 'skill') {
        const rows = this.stackGroups().map((g) => [g.title, g.items.join(', ')]);
        q = { sql: 'SELECT category, GROUP_CONCAT(name) AS skills\nFROM skill WHERE owner_id = 1 GROUP BY category;', headers: ['category', 'skills'], rows };
      } else if (sel === 'project') {
        const rows = this.projects().map((p) => [p.name, p.role, p.period]);
        q = { sql: 'SELECT name, role, period\nFROM project WHERE owner_id = 1 ORDER BY period DESC;', headers: ['name', 'role', 'period'], rows };
      } else {
        q = { sql: 'SELECT name, issuer, acquired_at, status\nFROM certification WHERE owner_id = 1;', headers: ['name', 'issuer', 'acquired_at', 'status'], rows: this.certRows() };
      }
      const query = {
        sql: q.sql, headers: q.headers.map((h) => ({ label: h })),
        rows: q.rows.map((r) => ({ cells: r.map((v) => statusCell(v)) })),
        footer: q.rows.length + ' rows in set (0.01 sec)'
      };
      const tl = this.timelineData();
      const timeline = tl.map((t, i) => ({ ...t, head: i === 0, notHead: i !== 0, notLast: i !== tl.length - 1 }));
      const vim = s.vim;
      return {
        accent, crt, lines, tabsLeft, tabsRight, menuItems, menuOpen, projects,
        menuExpanded: menuOpen ? 'true' : 'false',
        menuBtnBg: menuOpen ? '#55FFFF' : '#00AAAA',
        powerCls: crt ? (s.crtOff ? 'crt-off' : ((s.powerN || 0) % 2 ? 'crt-power-b' : 'crt-power-a')) : '',
        rvRefs: this.rvRefs(),
        rv: (() => { const r = s.rv || {}; return { intro: r.intro || '', stack: r.stack || '', projects: r.projects || '', workflow: r.workflow || '', certs: r.certs || '', timeline: r.timeline || '', contact: r.contact || '' }; })(),
        menuToggle: () => { if (this.menuTimer) clearTimeout(this.menuTimer); this.setState({ menu: !this.st().menu, menuLeft: this.menuPos() }); },
        menuEnter: () => { if (this.menuTimer) clearTimeout(this.menuTimer); if (!this.st().menu) this.setState({ menu: true, menuLeft: this.menuPos() }); },
        menuLeft: s.menuLeft || '8px',
        menuBtnRef: (el) => { this.menuBtnEl = el; }, secRef: (el) => { this.secEl = el; },
        termH: (() => { try { const vh = s.vvh, ih = window.innerHeight; return vh && vh < ih - 120 ? vh + 'px' : 'min(100vh, 960px)'; } catch (e) { return 'min(100vh, 960px)'; } })(),
        onTermFocus: () => { setTimeout(() => { if (this.outEl) this.outEl.scrollTop = this.outEl.scrollHeight; if (this.termEl && this.termEl.scrollIntoView) this.termEl.scrollIntoView({ block: 'nearest' }); }, 300); },
        menuLeave: () => { if (this.menuTimer) clearTimeout(this.menuTimer); this.menuTimer = setTimeout(() => this.setState({ menu: false }), 180); }, stackGroups, ownerCols, erdTables, query, timeline,
        cwd: this.dispPath(this.absCwd(s.cwd)), cmd: s.cmd ?? '',
        pUser: this.pendingP ? this.pendingP.label : this.me().name + '@chanhee', pUserColor: this.pendingP ? '#AAAAAA' : (this.me().uid === 0 ? '#FF5555' : '#55FF55'),
        pColon: this.pendingP ? '' : ':', pCwd: this.pendingP ? '' : this.dispPath(this.absCwd(s.cwd)), pSign: this.pendingP ? '' : (this.me().uid === 0 ? '# ' : '$ '),
        cmdShown: this.pendingP && this.pendingP.mask ? '' : (s.cmd ?? ''), booting: !s.booted, showHint: !!s.booted,
        skip: () => this.finishBoot(),
        outRef: (el) => { this.outEl = el; }, termRef: (el) => { this.termEl = el; },
        guiRef: (el) => { this.guiEl = el; }, vimRef: (el) => { this.vimEl = el; }, vimCloseRef: (el) => { this.vimCloseEl = el; },
        onVimTrap: (e) => {
          if (e.key === 'Escape') { e.preventDefault(); this.closeVim(); return; }
          if (e.key !== 'Tab') return;
          const f = [this.vimCloseEl, this.vimEl].filter(Boolean);
          if (!f.length) return;
          e.preventDefault();
          const i = f.indexOf(document.activeElement);
          const n = e.shiftKey ? (i <= 0 ? f.length - 1 : i - 1) : (i < 0 || i === f.length - 1 ? 0 : i + 1);
          f[n].focus();
        },
        onChange: (e) => this.setState({ cmd: e.target.value }),
        onKeyDown: (e) => {
          const v = e.target.value;
          const st = this.st();
          const hist = st.hist || [];
          if (e.key === 'Enter') { e.preventDefault(); this.run(v); }
          else if (this.pendingP && (e.key === 'Escape' || (e.key === 'c' && e.ctrlKey))) {
            e.preventDefault();
            const p = this.pendingP; this.pendingP = null;
            this.setState({ lines: (st.lines || []).concat([this.L('^C', 'out', p.label, 'out'), this.L('')]), cmd: '', pending: null });
          }
          else if (this.pendingP) { if (e.key === 'Tab' || e.key === 'ArrowUp' || e.key === 'ArrowDown') e.preventDefault(); }
          else if (e.key === 'Escape') { this.finishBoot(); }
          else if (e.key === 'Tab' && v) {
            const m = this.completions(v);
            if (m.length === 1) { e.preventDefault(); this.setState({ cmd: m[0] + (m[0].endsWith('/') ? '' : ' ') }); }
            else if (m.length > 1) {
              e.preventDefault();
              this.stopBoot();
              const base = st.booted ? (st.lines || []) : this.bootLines().concat(this.banner());
              this.setState({ booted: true, lines: base.concat([this.L(v, 'out', this.promptStr(st.cwd), 'accent'), this.L(m.map((x) => x.split(' ').pop()).join('   '), 'path')]) });
            }
          }
          else if (e.key === 'ArrowUp' && hist.length) {
            e.preventDefault();
            const i = st.hIdx == null ? hist.length - 1 : Math.max(0, st.hIdx - 1);
            this.setState({ hIdx: i, cmd: hist[i] });
          }
          else if (e.key === 'ArrowDown' && st.hIdx != null) {
            e.preventDefault();
            const i = st.hIdx + 1;
            if (i >= hist.length) this.setState({ hIdx: null, cmd: '' });
            else this.setState({ hIdx: i, cmd: hist[i] });
          }
        },
        secretOpen: !!s.secret,
        secLandRef: (el) => { this.gLand = el; }, secSeaRef: (el) => { this.gSea = el; }, secSkyRef: (el) => { this.gSky = el; },
        secCloseRef: (el) => { this.secCloseEl = el; },
        closeSecret: () => this.setState({ secret: false }),
        onSecretKey: (e) => { if (e.key === 'Escape' || e.key === 'q' || e.key === 'Q') { e.preventDefault(); this.setState({ secret: false }); } else if (e.key === 'Tab') { e.preventDefault(); if (this.secCloseEl) this.secCloseEl.focus(); } },
        imgOpen: !!s.img, imgRef: (el) => { this.imgEl = el; },
        closeImg: () => this.setState({ img: false }),
        onImgKey: (e) => { if (e.key === 'Escape') { e.preventDefault(); this.setState({ img: false }); } else if (e.key === 'Tab') { e.preventDefault(); } },
        manOpen: !!s.man,
        man: (() => {
          const p = s.man ? this.docs().find((x) => x.id === s.man) : null;
          const m = p ? this.manData()[p.id] : null;
          if (!m) return { id: '', upper: '', summary: '', synopsis: '', meta: '', desc: [], cols: [], hasExtra: false, hasExtraNote: false, extraLabel: '', extraNote: '', chain: [], options: [], hasResults: false, results: [], hasBugs: false, bugs: [], hasNotes: false, notes: [], links: [] };
          const ob = s.manBug ?? 0;
          return {
            id: p.id, upper: p.id.toUpperCase(), summary: m.summary, synopsis: m.synopsis, meta: m.meta,
            desc: m.desc.map((x) => ({ t: x })),
            cols: m.arch.map((c, i) => ({ label: c.label, notFirst: i > 0, delay: (i * 0.6) + 's', items: c.items.map((it) => ({ name: it[0], sub: it[1], hasSub: !!it[1], border: c.hl ? '#55FF55' : '#555555' })) })),
            hasExtra: !!m.extra, hasExtraNote: !!(m.extra && m.extra.note), extraLabel: m.extra ? m.extra.label : '', extraNote: m.extra ? m.extra.note : '',
            chain: m.extra ? m.extra.chain.map((x, i) => ({ name: x, notFirst: i > 0, delay: (i * 0.4) + 's' })) : [],
            options: m.options.map((o) => ({ flag: o[0], desc: o[1] })),
            hasResults: m.results.length > 0, results: m.results.map((x) => ({ t: x })),
            hasBugs: m.bugs.length > 0,
            bugs: m.bugs.map((b, i) => ({ code: b.code, title: b.title, cause: b.cause, fix: b.fix, open: ob === i, mark: ob === i ? '[-]' : '[+]', expanded: ob === i ? 'true' : 'false', toggle: () => this.setState({ manBug: ob === i ? -1 : i }) })),
            hasNotes: m.notes.length > 0, notes: m.notes.map((x) => ({ t: x })),
            links: m.links.map((l) => ({ label: l[0], url: l[1] }))
          };
        })(),
        manCmd: s.manCmd ?? '', manMsg: s.manMsg ?? '',
        manRef: (el) => { this.manEl = el; }, manCloseRef: (el) => { this.manCloseEl = el; }, manCmdRef: (el) => { this.manCmdEl = el; },
        closeMan: () => this.closeMan(),
        openWorkflow: () => this.openManFrom(this.workflow()),
        onManChange: (e) => this.setState({ manCmd: e.target.value }),
        onManKey: (e) => {
          if (e.key !== 'Enter') return;
          e.preventDefault();
          const v = e.target.value.trim().replace(/^:/, '');
          if (['q', 'q!', 'quit', 'wq', 'x'].indexOf(v) >= 0) this.closeMan();
          else this.setState({ manCmd: '', manMsg: v ? 'Pattern not found  (q 로 닫기)' : '' });
        },
        onManTrap: (e) => {
          if (e.key === 'Escape') { e.preventDefault(); this.closeMan(); return; }
          if (e.key !== 'Tab' || !this.manEl) return;
          const f = Array.prototype.slice.call(this.manEl.querySelectorAll('button, a[href], input'));
          if (!f.length) return;
          e.preventDefault();
          const i = f.indexOf(document.activeElement);
          const n = e.shiftKey ? (i <= 0 ? f.length - 1 : i - 1) : (i < 0 || i === f.length - 1 ? 0 : i + 1);
          f[n].focus();
        },
        vimOpen: !!vim, vimName: vim ? vim.name : '', vimCount: vim ? vim.lines.length : 0,
        vimLines: vim ? this.vimView(vim.lines) : [],
        vimCmd: s.vimCmd ?? '', vimMsg: s.vimMsg ?? '',
        closeVim: () => this.closeVim(),
        onVimChange: (e) => this.setState({ vimCmd: e.target.value }),
        onVimKey: (e) => {
          if (e.key !== 'Enter') return;
          e.preventDefault();
          const v = e.target.value.trim().replace(/^:/, '');
          if (['q', 'q!', 'wq', 'x', 'qa', 'qa!', 'quit'].indexOf(v) >= 0) this.closeVim();
          else if (v === 'w' || v === 'w!') this.setState({ vimCmd: '', vimMsg: "E45: 'readonly' 옵션이 설정되어 있습니다" });
          else this.setState({ vimCmd: '', vimMsg: 'E492: 편집기의 명령이 아님: ' + v });
        }
      };
    }
  }
  const eng = new Component();
  eng.state = { booted: true, lines: [], hist: [] };
  eng.pushRoute = () => {};
  eng.powerOff = () => powerOff();

  const promptLine = (x) => L(x, 'out', eng.promptStr(eng.state.cwd), 'accent');
  function updatePrompt() {
    const me = eng.me();
    const p = eng.pendingP;
    const disp = eng.dispPath(eng.absCwd(eng.state.cwd));
    const pu = $('p-user');
    pu.textContent = p ? p.label : me.name + '@chanhee';
    pu.className = p ? 'k-out' : (me.uid === 0 ? 'k-err' : 'k-accent');
    $('p-colon').textContent = p ? '' : ':';
    $('p-cwd').textContent = p ? '' : disp;
    $('p-sign').textContent = p ? '' : (me.uid === 0 ? '# ' : '$ ');
    document.querySelectorAll('.js-cwd').forEach((n) => { n.textContent = disp; });
    syncMirror();
  }

  /* 블록 커서: 투명한 입력창 내용을 화면용 글자에 그대로 비춤 (비밀번호는 숨김) */
  const mirror = $('cmd-mirror');
  function syncMirror() { mirror.textContent = eng.pendingP && eng.pendingP.mask ? '' : input.value; }
  function setInput(v) { input.value = v; syncMirror(); }
  input.addEventListener('input', syncMirror);
  let hIdx = null;

  function run(raw) {
    finishBoot();
    const pend = eng.pendingP;
    const c = String(raw || '').trim();
    setInput('');
    const SENT = { text: '', kind: 'out', pre: '', preKind: 'out', sentinel: true };
    eng.state = Object.assign({}, eng.state, { lines: [SENT], booted: true });
    eng.run(raw);
    const st = eng.state;
    const ls = st.lines || [];
    hIdx = null;
    if (!pend && c && ls.length === 0) clearOut();
    else print(ls.length && ls[0].sentinel ? ls.slice(1) : ls);
    eng.state.lines = [];
    if (st.vim) { const v = st.vim; eng.state.vim = null; openVim(v.name, v.lines, true); }
    if (st.man) { const m = st.man; eng.state.man = null; openMan(m, true); }
    if (st.img) { eng.state.img = false; openImg(true); }
    if (st.secret) { eng.state.secret = false; openSecret(true); }
    updatePrompt();
  }

  input.addEventListener('keydown', (e) => {
    const v = input.value;
    const hist = eng.state.hist || [];
    if (e.key === 'Enter') { e.preventDefault(); run(v); return; }
    if (eng.pendingP) {
      if (e.key === 'Escape' || (e.key === 'c' && e.ctrlKey)) {
        e.preventDefault();
        const p = eng.pendingP;
        eng.pendingP = null;
        setInput('');
        print([L('^C', 'out', p.label, 'out'), L('')]);
        updatePrompt();
      } else if (e.key === 'Tab' || e.key === 'ArrowUp' || e.key === 'ArrowDown') e.preventDefault();
      return;
    }
    if (e.key === 'Escape') { finishBoot(); }
    else if (e.key === 'Tab' && v) {
      const m = eng.completions(v);
      if (m.length === 1) { e.preventDefault(); setInput(m[0] + (m[0].endsWith('/') ? '' : ' ')); }
      else if (m.length > 1) {
        e.preventDefault();
        finishBoot();
        print([promptLine(v), L(m.map((x) => x.split(' ').pop()).join('   '), 'path')]);
      }
    } else if (e.key === 'ArrowUp' && hist.length) {
      e.preventDefault();
      hIdx = hIdx == null ? hist.length - 1 : Math.max(0, hIdx - 1);
      setInput(hist[hIdx]);
    } else if (e.key === 'ArrowDown' && hIdx != null) {
      e.preventDefault();
      hIdx += 1;
      if (hIdx >= hist.length) { hIdx = null; setInput(''); }
      else setInput(hist[hIdx]);
    }
  });
  // 터미널 아무 곳이나 누르면 입력창에 포커스 (텍스트 선택 중이면 제외)
  out.addEventListener('click', () => {
    if (!String(window.getSelection ? window.getSelection() : '')) input.focus({ preventScroll: true });
  });
  // 모바일: 입력할 때 입력줄이 키보드에 가려지지 않게
  input.addEventListener('focus', () => {
    setTimeout(() => { out.scrollTop = out.scrollHeight; input.scrollIntoView({ block: 'nearest' }); }, 300);
  });
  skipBtn.addEventListener('click', finishBoot);

  const term = $('top');
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', () => {
      const h = Math.round(window.visualViewport.height);
      if (h < window.innerHeight - 120) { term.style.setProperty('--vvh', h + 'px'); term.classList.add('kb-open'); }
      else term.classList.remove('kb-open');
    });
  }

  /* =====================================================================
   * 6. CRT 전원 효과 (startx)
   * ===================================================================== */
  const reduceMotion = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let powerN = 0;
  let pTimer1 = null;
  let pTimer2 = null;
  function scrollToGui() { gui.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'start' }); }
  function powerOff() {
    clearTimeout(pTimer1);
    clearTimeout(pTimer2);
    if (reduceMotion() || !document.body.classList.contains('crt-on')) { pTimer1 = setTimeout(scrollToGui, 300); return; }
    term.classList.remove('crt-power-a', 'crt-power-b');
    term.classList.add('crt-off');
    pTimer1 = setTimeout(() => {
      scrollToGui();
      pTimer2 = setTimeout(() => {
        term.classList.remove('crt-off');
        powerN += 1;
        term.classList.add(powerN % 2 ? 'crt-power-b' : 'crt-power-a');
      }, 1000);
    }, 750);
  }

  /* =====================================================================
   * 7. 하단 기능키 바 + 프로젝트 메뉴
   * ===================================================================== */
  const menuWrap = $('proj-menu-wrap');
  const menuBtn = $('proj-menu-btn');
  const menuPop = $('proj-menu-pop');
  const menu = $('proj-menu');
  let menuTimer = null;

  function fkey(key, label, command) {
    const b = el('button', 'fkey');
    b.type = 'button';
    b.appendChild(el('span', 'fk-n', key));
    b.appendChild(el('span', 'fk-l', label));
    b.addEventListener('click', () => { closeMenu(); run(command); });
    return b;
  }
  [['1', 'Help', 'help'], ['2', 'About', 'cat about.txt']].forEach((t) => $('tabs-left').appendChild(fkey(t[0], t[1], t[2])));
  [['4', 'Workflow', 'man workflow'], ['5', 'Certs', 'cat certs.txt'], ['6', 'StartX', 'startx'], ['7', 'ls -la', 'ls -la']].forEach((t) => $('tabs-right').appendChild(fkey(t[0], t[1], t[2])));

  function openMenu() {
    clearTimeout(menuTimer);
    const l = menuBtn.getBoundingClientRect().left - term.getBoundingClientRect().left;
    menuPop.style.left = Math.max(8, Math.min(l, term.clientWidth - 276)) + 'px';
    menuPop.hidden = false;
    menuBtn.setAttribute('aria-expanded', 'true');
  }
  function closeMenu() { clearTimeout(menuTimer); menuPop.hidden = true; menuBtn.setAttribute('aria-expanded', 'false'); }
  function closeMenuSoon() { clearTimeout(menuTimer); menuTimer = setTimeout(closeMenu, 180); }

  MENU_ORDER.map((id) => PROJECTS.find((p) => p.id === id)).filter(Boolean).forEach((p) => {
    const b = el('button', 'menu-item');
    b.type = 'button';
    b.setAttribute('role', 'menuitem');
    b.appendChild(el('span', 'tri', '▸'));
    b.appendChild(el('span', 'grow', p.file));
    b.appendChild(el('span', 'sub', p.name));
    b.addEventListener('click', () => { closeMenu(); run('man ' + p.id); });
    menu.appendChild(b);
  });
  menuBtn.addEventListener('click', () => (menuPop.hidden ? openMenu() : closeMenu()));
  [menuWrap, menuPop].forEach((n) => {
    n.addEventListener('mouseenter', openMenu);
    n.addEventListener('mouseleave', closeMenuSoon);
    n.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeMenu(); menuBtn.focus(); } });
  });
  document.addEventListener('click', (e) => { if (!menuWrap.contains(e.target) && !menuPop.contains(e.target)) closeMenu(); });

  /* =====================================================================
   * 8. vim 뷰어 + 해시 라우팅 (#vi/pikcha)
   * ===================================================================== */
  const vim = $('vim');
  const vimBody = $('vim-body');
  const vimCmd = $('vim-cmd');
  const vimMsg = $('vim-msg');
  const vimClose = $('vim-close');
  let vimReturn = null;

  function renderVim(lines) {
    vimBody.textContent = '';
    const frag = document.createDocumentFragment();
    let block = null;
    lines.forEach((t, i) => {
      const fence = /^```/.test(t);
      if (fence && !block) {
        block = { nums: el('div', 'vblock-nums'), code: el('div', 'vblock-code sb-scroll') };
        const wrap = el('div', 'vblock');
        wrap.appendChild(block.nums);
        wrap.appendChild(block.code);
        frag.appendChild(wrap);
      }
      if (block) {
        block.nums.appendChild(el('div', null, String(i + 1)));
        block.code.appendChild(el('div', fence ? 'v-fence' : null, t || ' '));
        if (fence && block.code.children.length > 1) block = null;
        return;
      }
      let cls = '';
      if (/^# /.test(t)) cls = 'v-h1';
      else if (/^## /.test(t)) cls = 'v-h2';
      else if (/^### /.test(t)) cls = 'v-h3';
      else if (/^> /.test(t)) cls = 'v-quote';
      else if (/^- /.test(t)) cls = 'v-li';
      const row = el('div', 'vl');
      row.appendChild(el('span', 'vl-num', String(i + 1)));
      row.appendChild(el('span', 'vl-txt ' + cls, t || ' '));
      frag.appendChild(row);
    });
    for (let k = 0; k < 6; k++) {
      const row = el('div', 'vl v-tilde');
      row.appendChild(el('span', 'vl-num', '~'));
      row.appendChild(el('span', 'vl-txt', ' '));
      frag.appendChild(row);
    }
    vimBody.appendChild(frag);
    vimBody.scrollTop = 0;
  }

  function openVim(name, lines, fromTerminal) {
    renderVim(lines);
    $('vim-title').textContent = 'vim — ' + name + '  (읽기 전용 · :q 또는 닫기)';
    $('vim-name').textContent = name;
    $('vim-pos').textContent = 'utf-8 · ' + lines.length + 'L · 1,1 Top';
    vimMsg.textContent = '';
    vimCmd.value = '';
    if (vim.hidden) vimReturn = fromTerminal ? input : document.activeElement;
    vim.hidden = false;
    document.body.style.overflow = 'hidden';
    vimCmd.focus();
  }
  function closeVim() {
    if (vim.hidden) return;
    vim.hidden = true;
    document.body.style.overflow = '';
    if (vimReturn && vimReturn.focus && vimReturn !== document.body) vimReturn.focus({ preventScroll: true });
    vimReturn = null;
  }

  vimClose.addEventListener('click', closeVim);
  // 포커스 트랩: Tab은 닫기 버튼 ↔ 명령줄 사이만, Esc는 어디서든 한 번
  vim.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { e.preventDefault(); closeVim(); return; }
    if (e.key !== 'Tab') return;
    const f = [vimClose, vimCmd];
    e.preventDefault();
    const i = f.indexOf(document.activeElement);
    const n = e.shiftKey ? (i <= 0 ? f.length - 1 : i - 1) : (i < 0 || i === f.length - 1 ? 0 : i + 1);
    f[n].focus();
  });
  vimCmd.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    const v = vimCmd.value.trim().replace(/^:/, '');
    vimCmd.value = '';
    if (['q', 'q!', 'wq', 'x', 'qa', 'qa!', 'quit'].includes(v)) closeVim();
    else if (v === 'w' || v === 'w!') vimMsg.textContent = "E45: 'readonly' 옵션이 설정되어 있습니다";
    else vimMsg.textContent = 'E492: 편집기의 명령이 아님: ' + v;
  });

  /* =====================================================================
   * 8-2. man 상세 페이지 + 해시 라우팅 (#man/pikcha, 예전 #vi/ 주소도 받음)
   * ===================================================================== */
  const man = $('man');
  const manBody = $('man-body');
  const manCmd = $('man-cmd');
  const manMsg = $('man-msg');
  const manClose = $('man-close');
  let manId = null;
  let manBug = 0;
  let manReturn = null;
  let pushed = false;
  let backTimer = null;

  function findDoc(x) {
    let n = String(x || '').toLowerCase();
    if (n === 'orca' || n === 'orca-workflow') n = 'workflow';
    return DOCS.find((p) => p.id === n || p.file === n || p.file.replace(/\.txt$/, '') === n) || null;
  }
  function routeId() {
    const m = (window.location.hash || '').match(/^#(?:man|vi)\/([A-Za-z0-9._-]+)$/);
    return m ? decodeURIComponent(m[1]) : null;
  }
  function pushRoute(id) {
    try {
      if (window.location.hash !== '#man/' + id) { window.history.pushState(null, '', '#man/' + id); pushed = true; }
    } catch (e) { /* file:// 등에서 막히면 주소만 안 바뀜 */ }
  }

  function sec(title) {
    const s = el('section', 'man-sec');
    s.appendChild(el('h2', null, title));
    return s;
  }
  function renderMan() {
    const m = MAN[manId];
    const id = manId;
    manBody.textContent = '';
    $('man-hdr-l').textContent = id.toUpperCase() + '(1)';
    $('man-hdr-r').textContent = id.toUpperCase() + '(1)';
    $('man-foot-l').textContent = 'Manual page ' + id + '(1) · q 를 입력하면 닫혀요';
    man.setAttribute('aria-label', id.toUpperCase() + ' 프로젝트 매뉴얼');

    let s = sec('NAME');
    const nm = el('p', 'man-ind man-name');
    nm.appendChild(el('strong', null, id));
    nm.appendChild(document.createTextNode(' '));
    nm.appendChild(el('span', null, '— ' + m.summary));
    s.appendChild(nm); manBody.appendChild(s);

    s = sec('SYNOPSIS');
    const sy = el('div', 'man-ind man-syn');
    sy.appendChild(el('code', null, m.synopsis));
    sy.appendChild(el('p', 'man-gray', m.meta));
    s.appendChild(sy); manBody.appendChild(s);

    s = sec('DESCRIPTION');
    const de = el('div', 'man-ind man-desc');
    m.desc.forEach((t) => de.appendChild(el('p', null, t)));
    s.appendChild(de); manBody.appendChild(s);

    s = sec('ARCHITECTURE');
    const ar = el('div', 'man-ind man-arch');
    const cols = el('div', 'man-cols');
    m.arch.forEach((c, i) => {
      if (i > 0) {
        const w = el('div', 'man-wire'); w.setAttribute('aria-hidden', 'true');
        const pk = el('span', 'pkt'); pk.style.animationDelay = (i * 0.6) + 's';
        w.appendChild(pk); cols.appendChild(w);
      }
      const col = el('div', 'man-col');
      col.appendChild(el('span', 'man-lbl', c.label));
      c.items.forEach((it) => {
        const b = el('div', 'man-box' + (c.hl ? ' hl' : ''));
        b.appendChild(el('b', null, it[0]));
        if (it[1]) b.appendChild(el('small', null, it[1]));
        col.appendChild(b);
      });
      cols.appendChild(col);
    });
    ar.appendChild(cols);
    if (m.extra) {
      const ch = el('div', 'man-chain');
      ch.appendChild(el('span', 'man-lbl', m.extra.label));
      m.extra.chain.forEach((x, i) => {
        if (i > 0) {
          const w = el('div', 'man-cwire'); w.setAttribute('aria-hidden', 'true');
          const pk = el('span', 'pkt'); pk.style.animationDelay = (i * 0.4) + 's';
          w.appendChild(pk); ch.appendChild(w);
        }
        ch.appendChild(el('span', 'man-chip', x));
      });
      if (m.extra.note) ch.appendChild(el('span', 'man-note', m.extra.note));
      ar.appendChild(ch);
    }
    s.appendChild(ar); manBody.appendChild(s);

    s = sec('OPTIONS');
    s.appendChild(el('p', 'man-ind man-gray', '핵심 설계'));
    const dl = el('dl', 'man-ind man-dl');
    m.options.forEach((o) => { dl.appendChild(el('dt', null, o[0])); dl.appendChild(el('dd', null, o[1])); });
    s.appendChild(dl); manBody.appendChild(s);

    const list = (title, arr) => {
      if (!arr.length) return;
      const x = sec(title);
      const ul = el('ul', 'man-ind man-ul');
      arr.forEach((t) => ul.appendChild(el('li', null, t)));
      x.appendChild(ul); manBody.appendChild(x);
    };
    list('RESULTS', m.results);

    if (m.bugs.length) {
      s = sec('BUGS');
      s.appendChild(el('p', 'man-ind man-gray', '만나서 잡은 버그들. 눌러서 펼쳐보세요.'));
      const wrap = el('div', 'man-ind man-bugs');
      m.bugs.forEach((bg, i) => {
        const open = manBug === i;
        const box = el('div', 'man-bugwrap');
        const btn = el('button', 'man-bug');
        btn.type = 'button';
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        btn.appendChild(el('span', 'mk', open ? '[-]' : '[+]'));
        btn.appendChild(el('span', 'cd', bg.code));
        btn.appendChild(el('span', null, bg.title));
        btn.addEventListener('click', () => {
          manBug = open ? -1 : i;
          const top = $('man-scroll').scrollTop;
          renderMan();
          $('man-scroll').scrollTop = top;
          const again = manBody.querySelectorAll('.man-bug')[i];
          if (again) again.focus({ preventScroll: true });
        });
        box.appendChild(btn);
        if (open) {
          const bd = el('div', 'man-bugbody');
          const p1 = el('p'); p1.appendChild(el('span', 'k', 'cause  ')); p1.lastChild.style.color = '#FF5555'; p1.appendChild(document.createTextNode(bg.cause));
          const p2 = el('p'); p2.appendChild(el('span', 'k', 'fix    ')); p2.lastChild.style.color = '#55FF55'; p2.appendChild(document.createTextNode(bg.fix));
          bd.appendChild(p1); bd.appendChild(p2); box.appendChild(bd);
        }
        wrap.appendChild(box);
      });
      s.appendChild(wrap); manBody.appendChild(s);
    }

    list('NOTES', m.notes);

    s = sec('SEE ALSO');
    const ln = el('p', 'man-ind man-links');
    m.links.forEach((l) => { const a = el('a', 'man-link', l[0]); a.href = l[1]; a.target = '_blank'; a.rel = 'noopener'; ln.appendChild(a); });
    const back = el('button', 'man-link', 'ls projects(1)');
    back.type = 'button';
    back.addEventListener('click', closeMan);
    ln.appendChild(back);
    s.appendChild(ln); manBody.appendChild(s);
  }

  function showMan(id, fromTerminal) {
    if (!MAN[id]) return;
    if (man.hidden) manReturn = fromTerminal ? input : document.activeElement;
    manId = id;
    manBug = 0;
    renderMan();
    manMsg.textContent = '';
    manCmd.value = '';
    man.hidden = false;
    $('man-scroll').scrollTop = 0;
    document.body.style.overflow = 'hidden';
    manClose.focus();
  }
  function openMan(id, fromTerminal) {
    const d = findDoc(id);
    if (!d) return;
    showMan(d.id, fromTerminal);
    pushRoute(d.id);
  }
  function hideMan() {
    if (man.hidden) return;
    man.hidden = true;
    manId = null;
    document.body.style.overflow = '';
    if (manReturn && manReturn.focus && manReturn !== document.body) manReturn.focus({ preventScroll: true });
    manReturn = null;
  }
  function closeMan() {
    if (man.hidden) return;
    try {
      if (pushed) {
        pushed = false;
        window.history.back();
        clearTimeout(backTimer);
        backTimer = setTimeout(hideMan, 400);
        return;
      }
      if (/^#(man|vi)\//.test(window.location.hash || '')) window.history.replaceState(null, '', window.location.pathname + window.location.search);
    } catch (e) { /* 무시 */ }
    hideMan();
  }
  function openRoute() {
    const d = findDoc(routeId());
    if (d) {
      if (!man.hidden && manId === d.id) return;
      finishBoot();
      pushed = false;
      showMan(d.id, false);
    } else if (!man.hidden) {
      clearTimeout(backTimer);
      hideMan();
    }
  }
  window.addEventListener('hashchange', openRoute);
  window.addEventListener('popstate', openRoute);

  manClose.addEventListener('click', closeMan);
  man.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { e.preventDefault(); closeMan(); return; }
    if (e.key !== 'Tab') return;
    const f = Array.prototype.slice.call(man.querySelectorAll('button, a[href], input'));
    if (!f.length) return;
    e.preventDefault();
    const i = f.indexOf(document.activeElement);
    const n = e.shiftKey ? (i <= 0 ? f.length - 1 : i - 1) : (i < 0 || i === f.length - 1 ? 0 : i + 1);
    f[n].focus();
  });
  manCmd.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    const v = manCmd.value.trim().replace(/^:/, '');
    manCmd.value = '';
    if (['q', 'q!', 'quit', 'wq', 'x'].includes(v)) closeMan();
    else manMsg.textContent = v ? 'Pattern not found  (q 로 닫기)' : '';
  });

  /* ----- ~/.secrets : Hello World + 도는 지구 ----- */
  const secView = $('secview');
  const secClose = $('sec-close');
  eng.gLand = $('g-land'); eng.gSea = $('g-sea'); eng.gSky = $('g-sky');
  function openSecret() {
    secView.hidden = false;
    document.body.style.overflow = 'hidden';
    secView.querySelectorAll('.hw-line').forEach((n) => { n.style.animation = 'none'; void n.offsetWidth; n.style.animation = ''; });
    eng.startGlobe();
    secClose.focus();
  }
  function closeSecret() {
    if (secView.hidden) return;
    eng.stopGlobe();
    secView.hidden = true;
    document.body.style.overflow = '';
    input.focus({ preventScroll: true });
  }
  secView.addEventListener('click', closeSecret);
  secView.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'q' || e.key === 'Q') { e.preventDefault(); closeSecret(); }
    else if (e.key === 'Tab') { e.preventDefault(); secClose.focus(); }
  });

  /* ----- 이미지 뷰어 (display chanhee.jpg) ----- */
  const imgView = $('imgview');
  const imgClose = $('img-close');
  let imgReturn = null;
  function openImg(fromTerminal) {
    imgReturn = fromTerminal ? input : document.activeElement;
    imgView.hidden = false;
    document.body.style.overflow = 'hidden';
    imgClose.focus();
  }
  function closeImg() {
    imgView.hidden = true;
    document.body.style.overflow = '';
    if (imgReturn && imgReturn.focus && imgReturn !== document.body) imgReturn.focus({ preventScroll: true });
    imgReturn = null;
  }
  imgClose.addEventListener('click', closeImg);
  imgView.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { e.preventDefault(); closeImg(); }
    else if (e.key === 'Tab') { e.preventDefault(); imgClose.focus(); }
  });

  /* =====================================================================
   * 9. GUI 렌더링
   * ===================================================================== */
  STACK.forEach((g) => {
    const card = el('div', 'card glow');
    card.appendChild(el('h3', null, g.title));
    const chips = el('div', 'chips');
    g.items.forEach((x) => chips.appendChild(el('span', 'chip', x)));
    card.appendChild(chips);
    $('stack-grid').appendChild(card);
  });

  PROJECTS.forEach((p) => {
    const a = el('article', 'proj glow');
    const tags = el('div', 'tags');
    if (p.featured) tags.appendChild(el('span', 'tag tag-featured', '대표 프로젝트'));
    p.tags.forEach((t) => tags.appendChild(el('span', 'tag', t)));
    a.appendChild(tags);
    a.appendChild(el('h3', null, p.name));
    a.appendChild(el('p', 'proj-summary', p.summary));
    const chips = el('div', 'mini-chips');
    p.stack.forEach((s) => chips.appendChild(el('span', 'mini-chip', s)));
    a.appendChild(chips);
    a.appendChild(el('p', 'proj-meta', p.meta));
    const b = el('button', 'btn-vi', '자세히 보기  $ man ' + p.id);
    b.type = 'button';
    b.addEventListener('click', () => openMan(p.id, false));
    a.appendChild(b);
    $('project-grid').appendChild(a);
  });

  const keyCls = (k) => (k === 'PK' ? 'key-pk' : k === 'FK' ? 'key-fk' : '');
  [['PK', 'id', 'INT'], ['', 'name', 'VARCHAR'], ['', 'school', 'VARCHAR'], ['', 'role', 'VARCHAR']].forEach((c) => {
    const row = el('div', 'erd-col');
    row.appendChild(el('span', 'key ' + keyCls(c[0]), c[0]));
    row.appendChild(el('span', 'name', c[1]));
    row.appendChild(el('span', 'type', c[2]));
    $('owner-cols').appendChild(row);
  });
  const TABLES = [
    { id: 'certification', title: 'CERTIFICATION', cols: [['PK', 'id'], ['FK', 'owner_id'], ['', 'name'], ['', 'issuer'], ['', 'acquired_at'], ['', 'status']] },
    { id: 'skill', title: 'SKILL', cols: [['PK', 'id'], ['FK', 'owner_id'], ['', 'category'], ['', 'name']] },
    { id: 'project', title: 'PROJECT', cols: [['PK', 'id'], ['FK', 'owner_id'], ['', 'name'], ['', 'role'], ['', 'period']] }
  ];
  const crowFoot = '<svg width="48" height="24" viewBox="0 0 48 24" fill="none" stroke="#3A4552" stroke-width="2" aria-hidden="true"><path d="M0 12h48M36 12l12-9M36 12l12 9"/></svg>';
  const tableBtns = {};
  TABLES.forEach((t) => {
    const row = el('div', 'erd-row');
    row.insertAdjacentHTML('beforeend', crowFoot);
    const b = el('button', 'erd-table glow');
    b.type = 'button';
    const head = el('span', 'erd-table-head');
    head.appendChild(el('span', null, t.title));
    head.appendChild(el('span', 'hint'));
    b.appendChild(head);
    const cols = el('span', 'erd-table-cols');
    t.cols.forEach((c) => {
      const s = el('span');
      if (c[0]) s.appendChild(el('span', keyCls(c[0]), c[0] + ' '));
      s.appendChild(document.createTextNode(c[1]));
      cols.appendChild(s);
    });
    b.appendChild(cols);
    b.addEventListener('click', () => { S.erd = t.id; renderErd(); });
    row.appendChild(b);
    tableBtns[t.id] = b;
    $('erd-tables').appendChild(row);
  });
  function renderErd() {
    TABLES.forEach((t) => {
      const on = S.erd === t.id;
      tableBtns[t.id].setAttribute('aria-pressed', on ? 'true' : 'false');
      tableBtns[t.id].querySelector('.hint').textContent = on ? '● 실행 중' : 'SELECT ▸';
    });
    let q;
    if (S.erd === 'skill') {
      q = { sql: 'SELECT category, GROUP_CONCAT(name) AS skills\nFROM skill WHERE owner_id = 1 GROUP BY category;', headers: ['category', 'skills'], rows: STACK.map((g) => [g.title, g.items.join(', ')]) };
    } else if (S.erd === 'project') {
      q = { sql: 'SELECT name, role, period\nFROM project WHERE owner_id = 1 ORDER BY period DESC;', headers: ['name', 'role', 'period'], rows: PROJECTS.map((p) => [p.name, p.role, p.period]) };
    } else {
      q = { sql: 'SELECT name, issuer, acquired_at, status\nFROM certification WHERE owner_id = 1;', headers: ['name', 'issuer', 'acquired_at', 'status'], rows: CERTS };
    }
    $('query-sql').textContent = q.sql;
    const head = $('query-head');
    head.textContent = '';
    q.headers.forEach((h) => { const th = el('th', null, h); th.scope = 'col'; head.appendChild(th); });
    const body = $('query-rows');
    body.textContent = '';
    q.rows.forEach((r) => {
      const tr = el('tr');
      r.forEach((v) => tr.appendChild(el('td', v === 'ACQUIRED' ? 'st-ok' : (v === 'IN_PROGRESS' || v === 'PASSED_1ST') ? 'st-prog' : '', v)));
      body.appendChild(tr);
    });
    $('query-foot').textContent = q.rows.length + ' rows in set (0.01 sec)';
  }
  renderErd();

  TIMELINE.forEach((t, i) => {
    const li = el('li', 'tl-item' + (i === 0 ? ' head' : ''));
    const rail = el('div', 'tl-rail');
    rail.appendChild(el('span', 'tl-dot'));
    rail.appendChild(el('span', 'tl-line'));
    li.appendChild(rail);
    const body = el('div', 'tl-body');
    const date = el('span', 'tl-date');
    date.appendChild(el('span', 'tl-hash', t.hash));
    date.appendChild(document.createTextNode('  ' + t.date));
    body.appendChild(date);
    body.appendChild(el('strong', 'tl-title', t.title));
    body.appendChild(el('span', 'tl-desc', t.desc));
    li.appendChild(body);
    $('timeline-list').appendChild(li);
  });

  $('wf-open').addEventListener('click', () => openMan('workflow', false));

  /* 섹션이 화면에 들어오면 등장 효과 */
  const rvEls = document.querySelectorAll('[data-rv]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    rvEls.forEach((n) => io.observe(n));
  } else {
    rvEls.forEach((n) => n.classList.add('in'));
  }

  updatePrompt();

  /* =====================================================================
   * 10. 시작
   * ===================================================================== */
  if (findDoc(routeId())) { finishBoot(); openRoute(); }
  else startBoot();
})();
