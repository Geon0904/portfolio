/*
 * ─────────────────────────────────────────────
 *  사이트 기본 정보  (이 파일만 고치면 돼요)
 * ─────────────────────────────────────────────
 *  - { ko: "...", en: "..." } 로 쓰면 KOR / ENG 선택에 따라 바뀌어요.
 *    한 언어만 쓰려면 "글자" 하나만 적어도 돼요.
 *  - 링크를 비워두면("") 그 링크는 자동으로 숨겨져요.
 */
window.SITE = {
  name: "Geon Chang",

  tagline: { ko: "프로젝트 저장소", en: "Project archive" },
  bio: {
    ko: "직접 만든 게임과 앱을 모아두는 곳이에요. 누르면 브라우저에서 바로 실행돼요.",
    en: "Games and apps I've built. Open any of them and it runs right in your browser."
  },

  /*
   * 프로필 사진
   *  ""        → 사진 관리 페이지(사이트주소/admin.html)에서 올린 사진을 써요.  ← 지금 설정
   *  "github"  → GitHub 프로필 사진을 그대로 써요.
   *  "profile/me.jpg" 처럼 경로를 적으면 그 사진으로 고정돼요.
   */
  photo: "",
  photoRepo: "Geon0904/portfolio",

  links: {
    github:    "https://github.com/Geon0904",
    linkedin:  "https://www.linkedin.com/in/geonc",
    naverBlog: "https://blog.naver.com/wkdrjs0904",
    email:     ""   // 공개해도 되는 메일 주소가 있으면 적어주세요.
  },

  blog: {
    intro: {
      ko: "생각하기, 기록하기, 그리고 공유하기",
      en: "Notes on what I learn, written in Korean."
    },
    // 대표 글을 보여주고 싶으면 아래처럼 추가하세요. (없으면 비워둬도 돼요)
    // { title: "글 제목", url: "https://blog.naver.com/wkdrjs0904/123456789", date: "2026-10-01" },
    posts: []
  }
};
