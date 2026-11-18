(() => {
  'use strict';

  /* =====================================================================
   * 1. 데이터 — 여기만 고치면 터미널과 GUI가 같이 바뀝니다
   * ===================================================================== */
  const STACK = [
    { title: "Backend", items: ["Java", "Spring Boot", "Spring Security · JWT", "MyBatis", "JdbcTemplate", "WebSocket/STOMP", "Python · FastAPI"] },
    { title: "Cloud · Infra", items: ["AWS Lambda", "API Gateway", "S3", "EC2 · RDS", "CloudFront", "Terraform"] },
    { title: "Database", items: ["MySQL", "MariaDB", "PostgreSQL · PostGIS", "DynamoDB", "Flyway"] },
    { title: "AI", items: ["LLM API · Tool use", "Spring AI", "CLIP · ONNX Runtime", "MediaPipe", "TFLite"] },
    { title: "DevOps · Tools", items: ["GitHub Actions", "Testcontainers", "Docker", "Claude Code · Codex", "ORCA"] }
  ];

  // [이름, 발급기관, 취득일, 상태(ACQUIRED | IN_PROGRESS)]
  const CERTS = [
    ['AWS Certified AI Practitioner (AIF-C01)', 'Amazon Web Services', '[취득일]', 'ACQUIRED'],
    ['리눅스마스터 2급', 'KAIT', '1차 합격 · 2차 준비 중', 'PASSED_1ST'],
    ['SQLD', 'K-DATA', '—', 'IN_PROGRESS']
  ];

  const TIMELINE = [
    { hash: "a1f3c2e", date: "2026.11", title: "KAICTS 학술대회 논문 · 발표", desc: "HA`WE를 주제로 논문 제출, 발표 대본 작성" },
    { hash: "e4b8d37", date: "[2026.MM]", title: "Pik-Cha! 학교 EXPO 운영", desc: "DSLR 포토부스 + 웨이팅 시스템 현장 운영 (개발 2026.08 ~ 11)" },
    { hash: "c93a0f5", date: "[2026.MM]", title: "ORCA 멀티 에이전트 개발환경 설계", desc: "Claude Code와 Codex의 역할 분리 · 문서 기반 협업 절차" },
    { hash: "7d21e6b", date: "2026.09", title: "HA`WE 개발 시작", desc: "팀 Sapphire Developers (4인)" },
    { hash: "2d8f6b1", date: "2026.07", title: "Ridely — 2026 관광데이터 활용 공모전", desc: "[결과]" },
    { hash: "9b7d014", date: "2026.05", title: "Watchman 개발 시작", desc: "팀 Smokers (3인) · 캡스톤" },
    { hash: "0000001", date: "[연도]", title: "신구대학교 컴퓨터소프트웨어과 입학", desc: "init" }
  ];

  const PROJECTS = [
    { id: "hawe", name: "HA`WE", file: "hawe.txt", featured: true, tags: ["팀 Sapphire Developers", "KAICTS 학술대회 논문"], summary: "그룹마다 매일 미션이 열리고, 내가 먼저 답해야 그룹원의 답이 보이는 모바일 그룹 앱. LLM 미션 생성과 사진·그림 AI를 서버 검증과 폴백으로 감쌌습니다.", stack: ["Spring Boot", "MyBatis", "LLM API", "CLIP · ONNX", "TFLite"], role: "[본인 기여]", period: "2026.09 ~", meta: "역할 · [본인 기여] · 2026.09 ~",
      md: [
        "# HA`WE",
        "> 그룹마다 매일 미션이 열리고, 내가 먼저 답해야 그룹원의 답이 보이는 모바일 그룹 앱",
        "",
        "- 기간: 2026.09 ~ (커밋 170개)",
        "- 팀: Sapphire Developers (4인) · KAICTS 학술대회 논문",
        "- 역할: [본인 기여]",
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
        "- GitHub: [GITHUB_REPO_URL]"
      ] },
    { id: "pikcha", name: "Pik-Cha!", file: "pikcha.txt", featured: false, tags: ["학교 EXPO", "하드웨어 + 서버리스"], summary: "캐논 DSLR로 촬영하고 인화·QR 다운로드·문자 안내까지 사람 손 없이 이어지는 DIY 인생네컷 포토부스와 웨이팅 시스템입니다.", stack: ["Python · FastAPI", "Canon EDSDK", "Lambda", "DynamoDB", "S3"], role: "[역할]", period: "2026.08 ~ 2026.11", meta: "역할 · [역할] · 2026.08 ~ 2026.11",
      md: [
        "# Pik-Cha!",
        "> DSLR로 찍고, 인화하고, 문자까지 — 사람 손 없이 흘러가는 인생네컷 포토부스 + 웨이팅 시스템",
        "",
        "- 기간: 2026.08 ~ 2026.11 (커밋 55개)",
        "- 목적: 학교 EXPO 현장 운영",
        "- 역할: [역할]",
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
        "- GitHub: https://github.com/andy051127/pik-cha",
        "- 시연: [DEMO_URL]"
      ] },
    { id: "ridely", name: "Ridely", file: "ridely.txt", featured: false, tags: ["2026 관광데이터 활용 공모전", "팀 git push --force"], summary: "흩어진 자전거 인프라와 관광 데이터를 엮어, AI 코치가 목적에 맞는 한강 자전거길 코스를 설계해주는 앱입니다.", stack: ["Spring Boot", "Spring AI", "PostGIS", "Terraform", "GitHub Actions"], role: "[역할]", period: "2026.07 ~", meta: "역할 · [역할] · 2026.07 ~",
      md: [
        "# Ridely",
        "> 흩어진 자전거 인프라와 관광 데이터를 엮어 코스를 설계하는 AI 트레이너 \"Coach Ridely\"",
        "",
        "- 출품: 2026 관광데이터 활용 공모전 (한국관광공사) · 웹·앱 부문",
        "- 기간: 2026.07 ~",
        "- 팀: git push --force · 역할: [역할]",
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
        "",
        "## 링크",
        "- 시연: [DEMO_URL]"
      ] },
    { id: "watchman", name: "Watchman", file: "watchman.txt", featured: false, tags: ["캡스톤", "팀 Smokers"], summary: "브라우저가 직접 얼굴 방향을 분석해 집중도를 재고, 친구들과 실시간으로 함께 공부하는 스터디 웹 서비스입니다.", stack: ["Spring Boot 3.5", "JdbcTemplate", "STOMP", "WebRTC", "MediaPipe"], role: "백엔드, DB", period: "2026.05 ~", meta: "역할 · 백엔드, DB · 2026.05 ~",
      md: [
        "# Watchman",
        "> 브라우저가 직접 얼굴 방향을 분석해 집중도를 재고, 친구들과 함께 공부하는 스터디 웹 서비스",
        "",
        "- 기간: 2026.05 ~ (커밋 77개)",
        "- 팀: Smokers (3인) · 역할: 백엔드, DB",
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
      ] },
    { id: "orca", name: "ORCA Workflow", file: "orca-workflow.txt", featured: false, tags: ["AI 개발환경", "멀티 에이전트"], summary: "ORCA 터미널로 Claude Code와 Codex의 역할을 나눠, 계획 → 구현 → 리뷰 → 재검증을 문서로 주고받는 AI 협업 개발환경을 설계했습니다.", stack: ["Claude Code", "Codex", "ORCA CLI", "Git worktree"], role: "설계·구성", period: "[기간]", meta: "역할 · 설계·구성 · [기간]",
      md: [
        "# ORCA Workflow",
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
      ] }
  ];

  const MENU_ORDER = ['hawe', 'watchman', 'ridely', 'pikcha', 'orca'];

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
    about: ['찬희 — Backend & Cloud Developer', '신구대학교 컴퓨터소프트웨어과', '', 'Spring Boot와 AWS로 설계부터 배포까지 동작하는 서버를 만듭니다.', 'LLM처럼 불확실한 부품은 서버 검증과 폴백으로 감싸고,', '보안 정책·사설망 같은 현장 제약은 구조로 풉니다.'],
    stack: STACK.map((g) => g.title.toLowerCase().padEnd(16) + g.items.join(' · ')),
    certs: ['STATUS   NAME                                       ISSUER                DATE'].concat(CERTS.map((r) =>
      (r[3] === 'ACQUIRED' ? '[ OK ]   ' : '[ .. ]   ') + padW(r[0], 42) + ' ' + padW(r[1], 21) + ' ' + (r[3] === 'ACQUIRED' ? r[2] : (r[3] === 'PASSED_1ST' ? '1차 합격 · 2차 준비 중' : '[응시 예정]')))),
    contact: ['github   https://github.com/andy051127', 'email    [EMAIL]'],
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
      L('guest', 'out', 'shingu login: ', 'bright'),
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
   * 4. 가상 파일 시스템
   * ===================================================================== */
  function resolve(raw, cwd) {
    const x = String(raw || '').trim().replace(/^['"]|['"]$/g, '');
    if (!x) return null;
    let segs;
    if (x === '~' || x === '/home/chanhee') segs = [];
    else if (x.startsWith('~/')) segs = x.slice(2).split('/');
    else if (x.startsWith('/home/chanhee/')) segs = x.slice(14).split('/');
    else segs = (cwd === '~/projects' ? ['projects'] : []).concat(x.split('/'));
    const p = [];
    segs.forEach((s) => { if (!s || s === '.') return; if (s === '..') p.pop(); else p.push(s); });
    const byName = (n) => PROJECTS.find((pr) => pr.file === n || pr.file.replace(/\.txt$/, '') === n || pr.id === n.toLowerCase().replace(/[^a-z0-9]/g, ''));
    if (p.length === 0) return { type: 'dir', id: '~', name: '~' };
    if (p.length === 1 && p[0] === 'projects') return { type: 'dir', id: 'projects', name: 'projects' };
    if (p.length === 1 && HOME[p[0]]) return { type: 'file', name: p[0], lines: HOME[p[0]] };
    if (p.length === 1 && p[0] === 'chanhee.jpg') return { type: 'image', name: 'chanhee.jpg', size: 43797 };
    if (p.length === 2 && p[0] === 'projects') { const pr = byName(p[1]); if (pr) return { type: 'file', name: pr.file, lines: pr.md, project: pr }; }
    if (p.length === 1) { const pr = byName(p[0]); if (pr) return { type: 'file', name: pr.file, lines: pr.md, project: pr }; }
    return null;
  }
  function listDir(id, all) {
    const size = (lines) => lines.join('\n').length;
    if (id === 'projects') return PROJECTS.map((pr) => ({ name: pr.file, dir: false, size: size(pr.md) }));
    const f = (n) => ({ name: n, dir: false, size: size(HOME[n]) });
    const files = [f('about'), f('certs'), { name: 'chanhee.jpg', dir: false, size: 43797 }, f('contact'), f('stack'), f('timeline')];
    const hidden = all ? [{ name: '.', dir: true, size: 4096 }, { name: '..', dir: true, size: 4096 }] : [];
    return hidden.concat([{ name: 'projects', dir: true, size: 4096 }], files);
  }

  /* =====================================================================
   * 5. 명령어
   * ===================================================================== */
  function cmd(str, cwd, hist, stdin) {
    const argv = str.split(/\s+/).filter(Boolean);
    const name = argv[0];
    const args = argv.slice(1);
    const flags = args.filter((a) => /^-/.test(a)).join('');
    const rest = args.filter((a) => !/^-/.test(a));
    const ok = (plain, rich) => ({ plain: plain || [], rich: rich || null });
    const fail = (err, hintText) => ({ err, hint: hintText });
    const readInput = (files, label) => {
      if (files.length === 0) return stdin ? { lines: stdin } : { err: label + ': 파일 이름이 필요합니다. 예) ' + label + ' stack' };
      let acc = [];
      for (const f of files) {
        const r = resolve(f, cwd);
        if (!r) return { err: label + ": '" + f + "': 그런 파일이나 디렉터리가 없습니다" };
        if (r.type === 'image') return { err: label + ': ' + f + ': 바이너리 파일입니다. 보려면 display ' + f };
        if (r.type === 'dir') return { err: label + ': ' + f + ': 디렉터리입니다' };
        acc = acc.concat(r.lines);
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
      case 'help': {
        const row = (c, d) => L(d, 'out', '  ' + c.padEnd(22), 'path');
        return ok(null, [
          L('GNU bash 5.2 — chanhee-portfolio · 사용할 수 있는 명령어', 'accent'),
          row('ls [-la] [dir]', '파일 목록'), row('cd <dir> · pwd', '이동 · 현재 위치'),
          row('cat <file>', '파일 내용 보기          예) cat about'),
          row('head / tail [-n N]', '앞 · 뒤 N줄             예) head -n 2 stack'),
          row('grep <word> <file>', '검색                    예) cat stack | grep AWS'),
          row('wc -l <file> · tree', '줄 수 · 전체 구조'),
          row('vi <project>', 'vim으로 프로젝트 열기   예) vi pikcha'),
          row('display <image>', '이미지 보기             예) display chanhee.jpg'),
          row('git log', '활동 기록'), row('neofetch · uname -a', '시스템 정보'),
          row('startx', 'GUI 모드로 전환 (아래로 스크롤)'), row('history · clear', '입력 기록 · 화면 지우기'),
          L(''), L('처음이라면: ls → cat about → vi pikcha', 'muted'), L('Tab 자동완성, ↑↓ 이전 명령어.', 'muted')
        ]);
      }
      case 'ls': {
        const all = flags.includes('a');
        const long = flags.includes('l');
        const target = rest[0] ? resolve(rest[0], cwd) : { type: 'dir', id: cwd === '~' ? '~' : 'projects' };
        if (!target) return fail("ls: '" + rest[0] + "'에 접근할 수 없습니다: 그런 파일이나 디렉터리가 없습니다");
        const items = target.type !== 'dir' ? [{ name: target.name, dir: false, size: target.size || target.lines.join('\n').length }] : listDir(target.id, all);
        const plain = items.map((it) => it.name + (it.dir ? '/' : ''));
        if (long) {
          return ok(plain, [L('합계 ' + items.length, 'muted')].concat(items.map((it) =>
            L(it.name + (it.dir ? '/' : ''), it.dir ? 'path' : (it.name.startsWith('.') ? 'muted' : 'out'),
              (it.dir ? 'drwxr-xr-x' : '-rw-r--r--') + '  chanhee  chanhee  ' + String(it.size).padStart(5) + '  Nov 18 21:00  ', 'muted'))));
        }
        const dirs = items.filter((i) => i.dir).map((i) => i.name + '/').join('  ');
        const files = items.filter((i) => !i.dir).map((i) => i.name).join('  ');
        return ok(plain, [L(files, 'out', dirs ? dirs + '  ' : '', 'path')]);
      }
      case 'cd': {
        const t = rest[0] ? resolve(rest[0], cwd) : { type: 'dir', id: '~' };
        if (!t) return fail('bash: cd: ' + rest[0] + ': 그런 파일이나 디렉터리가 없습니다');
        if (t.type !== 'dir') return fail('bash: cd: ' + rest[0] + ': 디렉터리가 아닙니다', '파일은 cat ' + rest[0] + ' 또는 vi ' + rest[0] + ' 로 열어보세요.');
        return { plain: [], cwd: t.id === '~' ? '~' : '~/projects' };
      }
      case 'pwd': return ok(['/home/chanhee' + cwd.slice(1)]);
      case 'cat': case 'less': case 'more': {
        const r = readInput(rest, name);
        return r.err ? fail(r.err) : ok(r.lines);
      }
      case 'head': case 'tail': {
        const a = numArg(10);
        const r = readInput(a.files, name);
        if (r.err) return fail(r.err);
        return ok(name === 'head' ? r.lines.slice(0, a.n) : r.lines.slice(-a.n));
      }
      case 'wc': {
        const r = readInput(rest, 'wc');
        if (r.err) return fail(r.err);
        const n = r.lines.length;
        const label = r.name ? ' ' + r.name : '';
        if (flags.includes('l')) return ok([n + label]);
        const words = r.lines.join(' ').split(/\s+/).filter(Boolean).length;
        return ok(['  ' + n + '  ' + words + '  ' + r.lines.join('\n').length + label]);
      }
      case 'grep': {
        if (!rest[0]) return fail('사용법: grep <단어> <파일>   예) grep AWS stack');
        const pat = rest[0].replace(/^['"]|['"]$/g, '');
        const r = readInput(rest.slice(1), 'grep');
        if (r.err) return fail(r.err);
        const ci = flags.includes('i');
        return ok(r.lines.filter((l) => (ci ? l.toLowerCase().includes(pat.toLowerCase()) : l.includes(pat))));
      }
      case 'sort': { const r = readInput(rest, 'sort'); return r.err ? fail(r.err) : ok(r.lines.slice().sort()); }
      case 'tree':
        return ok(['.', '├── about', '├── certs', '├── chanhee.jpg', '├── contact', '├── projects', '│   ├── hawe.txt', '│   ├── orca-workflow.txt', '│   ├── pikcha.txt', '│   ├── ridely.txt', '│   └── watchman.txt', '├── stack', '└── timeline', '', '1 directory, 11 files']);
      case 'file': {
        if (!rest[0]) return fail('사용법: file <이름>');
        const r = resolve(rest[0], cwd);
        if (!r) return fail(rest[0] + ': 그런 파일이 없습니다');
        return ok([rest[0] + ': ' + (r.type === 'dir' ? 'directory' : (r.type === 'image' ? 'JPEG image data, progressive, 640x800' : 'UTF-8 Unicode text'))]);
      }
      case 'vi': case 'vim': case 'nvim': case 'view': case 'open': {
        if (!rest[0]) return fail('사용법: vi <파일>   예) vi pikcha', 'ls projects 로 열 수 있는 프로젝트를 확인하세요.');
        const r = resolve(rest[0], cwd);
        if (!r) return fail('"' + rest[0] + '" [새 파일] — 읽기 전용 포트폴리오라 새 파일을 만들 수 없어요.');
        if (r.type === 'dir') return fail('"' + rest[0] + '" 는 디렉터리입니다', 'ls ' + rest[0] + ' 로 목록을 보세요.');
        if (r.type === 'image') return { plain: [], rich: [L('"' + r.name + '" 은 이미지라 이미지 뷰어로 엽니다.', 'muted')], img: true };
        return { plain: [], rich: [L('"' + r.name + '" [readonly] ' + r.lines.length + 'L', 'muted')], vim: { name: r.name, lines: r.lines, route: r.project ? r.project.id : null } };
      }
      case 'display': case 'xdg-open': case 'feh': case 'eog': {
        if (!rest[0]) return fail('사용법: display <이미지>   예) display chanhee.jpg');
        const r = resolve(rest[0], cwd);
        if (!r) return fail(name + ": '" + rest[0] + "': 그런 파일이 없습니다");
        if (r.type !== 'image') return fail(name + ': ' + rest[0] + ': 이미지 파일이 아닙니다', r.type === 'file' ? 'cat ' + rest[0] + ' 로 읽어보세요.' : null);
        return { plain: [], rich: [L('Opening chanhee.jpg (640x800) ...', 'muted')], img: true };
      }
      case 'nano': case 'emacs': case 'code': return fail(name + ': 이 시스템의 에디터는 vi 뿐입니다.', '예) vi pikcha');
      case 'man': {
        const docs = {
          ls: 'ls — 디렉터리 내용 보기. -l 자세히, -a 숨김 파일 포함', cat: 'cat — 파일 내용 출력',
          head: 'head — 앞 N줄 출력 (-n N)', tail: 'tail — 뒤 N줄 출력 (-n N)',
          grep: 'grep — 패턴과 일치하는 줄 출력 (-i 대소문자 무시)',
          vi: 'vi — 화면 편집기. 여기서는 읽기 전용으로 프로젝트를 엽니다',
          startx: 'startx — X 서버를 시작합니다. 여기서는 GUI 모드로 이동합니다'
        };
        if (!rest[0]) return fail('어떤 매뉴얼을 원하세요? 예) man ls');
        if (docs[rest[0]]) return ok([docs[rest[0]]]);
        const r = resolve(rest[0], cwd);
        if (r && r.project) return fail(rest[0] + ' 에 대한 매뉴얼은 없지만, vi ' + rest[0] + ' 로 열 수 있어요.');
        return fail(rest[0] + ' 에 대한 매뉴얼 항목이 없습니다');
      }
      case 'git':
        if (rest[0] !== 'log') return fail('git: 지금은 log 만 지원합니다.', '예) git log');
        return ok(HOME.timeline);
      case 'neofetch': return ok(null, banner());
      case 'uname': return ok([flags.includes('a') ? 'Linux shingu 6.8.0-chanhee #2026 SMP x86_64 GNU/Linux' : 'Linux']);
      case 'hostname': return ok(['shingu']);
      case 'whoami': return ok(['guest']);
      case 'id': return ok(['uid=1001(guest) gid=1001(guest) groups=1001(guest),100(recruiters)']);
      case 'uptime': return ok([' 21:00:00 up 2 years,  1 user,  load average: 0.42, 0.37, 0.31']);
      case 'date': return ok([new Date().toString()]);
      case 'echo': return ok([rest.join(' ').replace(/^['"]|['"]$/g, '')]);
      case 'history': return ok(hist.concat([str]).map((h, i) => String(i + 1).padStart(5) + '  ' + h));
      case 'clear': return { plain: [], clear: true };
      case 'startx': return { plain: [], rich: [L('Starting X.Org X Server 21.1 ...', 'muted'), L('Started GUI session. 아래로 이동합니다.', 'out', '[  OK  ] ', 'accent')], startx: true };
      case 'exit': case 'logout': return fail('로그아웃할 수 없습니다. 아직 볼 프로젝트가 남았어요.');
      case 'sudo':
        return fail('guest is not in the sudoers file. This incident will be reported.');
      case 'rm': case 'mv': case 'cp': case 'touch': case 'mkdir': case 'chmod':
        return fail(name + ': ' + (rest[0] || '') + ': 읽기 전용 파일 시스템입니다');
      case 'apt': case 'apt-get': case 'yum': case 'pip': case 'npm':
        return fail('E: 이 포트폴리오에는 패키지를 설치할 수 없습니다 (읽기 전용 파일 시스템).');
      default: {
        const r = resolve(name, cwd);
        let h = null;
        if (r && r.project) h = '혹시 vi ' + name + ' ?';
        else if (r && r.type === 'image') h = '혹시 display ' + name + ' ?';
        else if (r && r.type === 'file') h = '혹시 cat ' + name + ' ?';
        else if (name === 'about') h = '혹시 cat about ?';
        else if (name === 'projects') h = '혹시 ls projects ?';
        return fail('bash: ' + name + ': command not found', h || "'help' 를 입력해보세요");
      }
    }
  }

  function toRich(s) {
    if (/^\[ OK \]/.test(s)) return L(s.slice(6), 'out', '[ OK ]', 'accent');
    if (/^\[ \.\. \]/.test(s)) return L(s.slice(6), 'out', '[ .. ]', 'warn');
    if (/^\* [0-9a-f]{7}/.test(s)) return L(s.slice(9), 'out', s.slice(0, 9), 'warn');
    if (/^STATUS /.test(s)) return L(s, 'muted');
    if (/^#{1,3} /.test(s)) return L(s, 'accent');
    if (/^```/.test(s)) return L(s, 'muted');
    const m = s.match(/^([a-z][^\s].*?\s{2,})/);
    if (m) return L(s.slice(m[1].length), 'out', m[1], 'path');
    return L(s, 'out');
  }

  function exec(c, cwd, hist) {
    const stages = c.split('|').map((x) => x.trim()).filter(Boolean);
    let stdin = null;
    let res = null;
    for (let i = 0; i < stages.length; i++) {
      res = cmd(stages[i], cwd, hist, stdin);
      if (res.err) break;
      stdin = res.plain || [];
    }
    if (res.err) {
      const lines = [L(res.err, 'err')];
      if (res.hint) lines.push(L(res.hint, 'muted'));
      return { out: lines, cwd };
    }
    const single = stages.length === 1;
    return {
      out: single && res.rich ? res.rich : (res.plain || []).map(toRich),
      cwd: single && res.cwd ? res.cwd : cwd,
      vim: single ? res.vim : null,
      img: single && res.img,
      startx: single && res.startx,
      clear: single && res.clear
    };
  }

  function updateCwd() { document.querySelectorAll('.js-cwd').forEach((n) => { n.textContent = S.cwd; }); }
  const promptLine = (cwd, x) => L(x, 'out', 'guest@shingu:' + cwd + '$ ', 'accent');

  /* 블록 커서: 투명한 입력창 내용을 화면용 글자에 그대로 비춤 */
  const mirror = $('cmd-mirror');
  function syncMirror() { mirror.textContent = input.value; }
  function setInput(v) { input.value = v; syncMirror(); }
  input.addEventListener('input', syncMirror);

  function run(raw) {
    const c = String(raw || '').trim();
    finishBoot();
    const cwd = S.cwd;
    setInput('');
    if (!c) { print([promptLine(cwd, '')]); return; }
    const res = exec(c, cwd, S.hist);
    S.hist.push(c);
    if (S.hist.length > 50) S.hist.shift();
    S.hIdx = null;
    if (res.clear) { clearOut(); return; }
    print([promptLine(cwd, c)].concat(res.out, [L('')]));
    if (res.cwd !== cwd) { S.cwd = res.cwd; updateCwd(); }
    if (res.vim) openVim(res.vim.name, res.vim.lines, true, res.vim.route);
    if (res.img) openImg(true);
    if (res.startx) powerOff();
  }

  function completions(v) {
    const parts = v.split(/\s+/);
    const cmds = ['help', 'ls', 'cd', 'pwd', 'cat', 'head', 'tail', 'grep', 'wc', 'tree', 'file', 'vi', 'vim', 'man', 'git', 'neofetch', 'uname', 'whoami', 'history', 'clear', 'startx', 'echo', 'date', 'sort', 'display'];
    if (parts.length === 1) return cmds.filter((x) => x.startsWith(parts[0]) && x !== parts[0]);
    const last = parts[parts.length - 1];
    const isVi = parts[0] === 'vi' || parts[0] === 'vim';
    const inProj = S.cwd === '~/projects';
    const names = (inProj ? [] : ['about', 'certs', 'chanhee.jpg', 'contact', 'stack', 'timeline', 'projects/'])
      .concat(PROJECTS.map((p) => (inProj || isVi ? '' : 'projects/') + (isVi ? p.id : p.file)));
    const head = parts.slice(0, -1).join(' ') + ' ';
    return names.filter((n) => n.startsWith(last) && n !== last).map((n) => head + n);
  }

  input.addEventListener('keydown', (e) => {
    const v = input.value;
    if (e.key === 'Enter') { e.preventDefault(); run(v); }
    else if (e.key === 'Escape') { finishBoot(); }
    else if (e.key === 'Tab' && v) {
      const m = completions(v);
      if (m.length === 1) { e.preventDefault(); setInput(m[0] + (m[0].endsWith('/') ? '' : ' ')); }
      else if (m.length > 1) {
        e.preventDefault();
        finishBoot();
        print([promptLine(S.cwd, v), L(m.map((x) => x.split(' ').pop()).join('   '), 'path')]);
      }
    } else if (e.key === 'ArrowUp' && S.hist.length) {
      e.preventDefault();
      S.hIdx = S.hIdx == null ? S.hist.length - 1 : Math.max(0, S.hIdx - 1);
      setInput(S.hist[S.hIdx]);
    } else if (e.key === 'ArrowDown' && S.hIdx != null) {
      e.preventDefault();
      S.hIdx += 1;
      if (S.hIdx >= S.hist.length) { S.hIdx = null; setInput(''); }
      else setInput(S.hist[S.hIdx]);
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
  [['1', 'Help', 'help'], ['2', 'About', 'cat about']].forEach((t) => $('tabs-left').appendChild(fkey(t[0], t[1], t[2])));
  [['4', 'Certs', 'cat certs'], ['5', 'StartX', 'startx'], ['6', 'ls -la', 'ls -la']].forEach((t) => $('tabs-right').appendChild(fkey(t[0], t[1], t[2])));

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
    b.addEventListener('click', () => { closeMenu(); run('vi ' + p.file); });
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
  let vimRoute = null;
  let pushed = false;
  let backTimer = null;

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

  function routeId() {
    const m = (window.location.hash || '').match(/^#vi\/([A-Za-z0-9._-]+)$/);
    return m ? decodeURIComponent(m[1]) : null;
  }
  function findProject(x) {
    const n = String(x || '').toLowerCase();
    return PROJECTS.find((p) => p.id === n || p.file === n || p.file.replace(/\.txt$/, '') === n);
  }
  function pushRoute(id) {
    if (!id) return;
    try {
      if (window.location.hash !== '#vi/' + id) { window.history.pushState(null, '', '#vi/' + id); pushed = true; }
    } catch (e) { /* file:// 등에서 막히면 주소만 안 바뀜 */ }
  }

  function openVim(name, lines, fromTerminal, route) {
    renderVim(lines);
    $('vim-title').textContent = 'vim — ' + name + '  (읽기 전용 · :q 또는 닫기)';
    $('vim-name').textContent = name;
    $('vim-pos').textContent = 'utf-8 · ' + lines.length + 'L · 1,1 Top';
    vimMsg.textContent = '';
    vimCmd.value = '';
    if (vim.hidden) vimReturn = fromTerminal ? input : document.activeElement;
    vimRoute = route || null;
    vim.hidden = false;
    document.body.style.overflow = 'hidden';
    vimCmd.focus();
    if (route) pushRoute(route);
  }
  function hideVim() {
    if (vim.hidden) return;
    vim.hidden = true;
    vimRoute = null;
    document.body.style.overflow = '';
    if (vimReturn && vimReturn.focus && vimReturn !== document.body) vimReturn.focus({ preventScroll: true });
    vimReturn = null;
  }
  function closeVim() {
    if (vimRoute) {
      try {
        if (pushed) {
          pushed = false;
          window.history.back();
          clearTimeout(backTimer);
          backTimer = setTimeout(hideVim, 400);
          return;
        }
        if ((window.location.hash || '').indexOf('#vi/') === 0) window.history.replaceState(null, '', window.location.pathname + window.location.search);
      } catch (e) { /* 무시 */ }
    }
    hideVim();
  }
  function openRoute() {
    const id = routeId();
    if (id) {
      const p = findProject(id);
      if (!p || (!vim.hidden && vimRoute === p.id)) return;
      finishBoot();
      pushed = false;
      openVim(p.file, p.md, false, null);
      vimRoute = p.id;
    } else if (!vim.hidden && vimRoute) {
      hideVim();
    }
  }
  window.addEventListener('hashchange', openRoute);
  window.addEventListener('popstate', openRoute);

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
    a.appendChild(el('p', 'proj-meta', '역할 · ' + p.role + ' · ' + p.period));
    const b = el('button', 'btn-vi', '자세히 보기  $ vi ' + p.id);
    b.type = 'button';
    b.addEventListener('click', () => openVim(p.file, p.md, false, p.id));
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

  /* =====================================================================
   * 10. 시작
   * ===================================================================== */
  if (findProject(routeId())) { finishBoot(); openRoute(); }
  else startBoot();
})();
