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
   *  profile 폴더에 사진을 올리기만 하면 가장 최근에 올린 사진이 자동으로 나와요.
   *  photoRepo 는 이 사이트가 올라가 있는 GitHub 저장소예요.
   *  특정 사진으로 고정하고 싶으면 photo 에 경로를 적으세요. 예) "profile/me.jpg"
   */
  photoRepo: "Geon0904/portfolio",
  photo: "",

  links: {
    github:    "https://github.com/Geon0904",
    linkedin:  "https://www.linkedin.com/in/geonc",
    naverBlog: "https://blog.naver.com/wkdrjs0904",
    email:     ""   // 공개해도 되는 메일 주소가 있으면 적어주세요.
  },

  blog: {
    intro: {
      ko: "개발하면서 배운 것, 만들면서 겪은 일들을 기록하고 있어요.",
      en: "Notes on what I learn and build, written in Korean."
    },
    // 대표 글을 보여주고 싶으면 아래처럼 추가하세요. (없으면 비워둬도 돼요)
    // { title: "글 제목", url: "https://blog.naver.com/wkdrjs0904/123456789", date: "2026-10-01" },
    posts: []
  }
};
