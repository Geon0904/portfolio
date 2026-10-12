/*
 * ─────────────────────────────────────────────
 *  프로젝트 목록  — 위에 있을수록 먼저 보여요
 * ─────────────────────────────────────────────
 *
 *  ▶ Netlify·Vercel 등에 배포한 앱은 주소 한 줄이면 끝이에요.
 *
 *      { url: "https://my-app.netlify.app" },
 *
 *    제목은 주소에서 자동으로 만들어져요 (my-app → My App).
 *    설명까지 넣고 싶으면:
 *
 *      {
 *        url: "https://my-app.netlify.app",
 *        title:   { ko: "할 일 관리", en: "Todo Manager" },
 *        summary: { ko: "한 줄 소개", en: "One-line summary" },
 *        type: "app",
 *        tags: ["React", "Netlify"],
 *        code: "https://github.com/Geon0904/my-app"
 *      },
 *
 *  ▶ 이 사이트에 직접 올린 게임은 projects/폴더이름/ 에 파일을 넣고
 *        url: "projects/폴더이름/index.html"
 *
 *  항목 설명 (url 말고는 전부 선택)
 *    url      실행 주소
 *    title    이름        — "글자" 또는 { ko, en }
 *    summary  한두 줄 소개 — "글자" 또는 { ko, en }
 *    type     "game" | "app" | "web" | "tool"   (없으면 app)
 *    year     만든 해
 *    tags     사용한 기술
 *    code     GitHub 저장소 주소
 *    thumb    썸네일 이미지 (없으면 자동, 넣는다면 가로 16:10이 예뻐요)
 *    example  예시 표시 — 직접 만든 프로젝트를 올리면 이 블록은 지워도 돼요.
 */
window.PROJECTS = [

  {
    url: "projects/reaction-test/index.html",
    title:   { ko: "반응속도 테스트", en: "Reaction Test" },
    summary: {
      ko: "초록색으로 바뀌는 순간 누르세요. 5번 측정해서 평균 반응속도를 알려주는 작은 게임이에요.",
      en: "Tap the moment it turns green. Five rounds, then you get your average reaction time."
    },
    type: "game",
    year: 2026,
    tags: ["HTML", "CSS", "JavaScript"],
    example: true
  }

];
