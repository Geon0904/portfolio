# Geon Chang — 프로젝트 저장소

직접 만든 게임과 앱을 올려두고, 방문자가 브라우저에서 바로 실행해 볼 수 있는 개인 사이트예요.
GitHub Pages에 무료로 올려서 `https://geon0904.github.io` 주소로 운영해요.
맨 위 **KOR / ENG** 버튼으로 언어를 바꿀 수 있고, 처음 방문하면 브라우저 언어에 맞춰 자동으로 골라져요.

```
├── index.html          메인 페이지 (손댈 필요 없음)
├── config.js           ← 이름, 소개, 링크 (한/영)
├── projects.js         ← 프로젝트 목록 (새 프로젝트마다 한 줄~한 블록 추가)
├── profile/            ← 프로필 사진을 여기에 올리면 자동으로 바뀜
├── assets/
│   ├── style.css
│   └── main.js
└── projects/
    └── reaction-test/  예시 게임 (지워도 됨)
```

---

## 1. 처음 한 번: GitHub Pages에 올리기

1. GitHub에서 **New repository** → 저장소 이름을 정확히 `Geon0904.github.io` 로 만들어요. (Public)
   프로필 사진 자동 찾기가 이 저장소 이름을 기준으로 동작해요.
2. 저장소 화면에서 **Add file → Upload files** → 이 폴더 안의 파일과 폴더를 전부 끌어다 놓고 **Commit changes**.
3. **Settings → Pages** → Source를 `Deploy from a branch`, Branch를 `main` / `(root)`로 두고 Save.
4. 1~2분 뒤 `https://geon0904.github.io` 에 사이트가 열려요.

## 2. Netlify 앱 추가하기 (주소 한 줄)

`projects.js`를 열고 `window.PROJECTS = [` 바로 아래에 한 줄을 넣으면 끝이에요.

```js
window.PROJECTS = [
  { url: "https://my-app.netlify.app" },
  ...
```

- 제목은 주소에서 자동으로 만들어져요. (`my-app` → **My App**)
- 카드의 **열기** 버튼을 누르면 새 탭에서 앱이 열려요.
- 줄 끝의 쉼표 `,` 를 꼭 붙여주세요.

설명까지 넣고 싶으면:

```js
{
  url: "https://my-app.netlify.app",
  title:   { ko: "가계부", en: "Budget Buddy" },
  summary: { ko: "한 줄 소개", en: "One-line summary" },
  type: "app",                 // game | app | web | tool
  year: 2026,
  tags: ["React", "Netlify"],
  code: "https://github.com/Geon0904/my-app",
  thumb: ""                    // 앱 화면 캡처를 넣으면 썸네일로 쓰여요 (가로 16:10)
},
```

Vercel, itch.io, 앱스토어 링크도 같은 방법으로 넣으면 돼요.

## 3. 이 사이트에 직접 게임 올리기

`projects/` 안에 폴더를 만들고 빌드 결과물(`index.html` 포함)을 넣은 다음,
`url: "projects/폴더이름/index.html"` 로 추가해요.

| 만든 도구 | 넣을 파일 |
|---|---|
| HTML / JS | 폴더 그대로 |
| Unity | **WebGL** 빌드 폴더 전체 (Publishing Settings → Compression Format **Disabled** 또는 Decompression Fallback 켜기) |
| Godot | **Web** 으로 내보낸 파일 (파일 이름 `index.html`) |
| React / Vite | `base: "./"` 설정 후 `npm run build` → `dist` 안의 내용 |

## 4. 프로필 사진 바꾸기 (휴대폰에서도 돼요)

1. github.com → `Geon0904.github.io` 저장소 → **profile** 폴더
2. **Add file → Upload files** → 갤러리에서 사진 고르기 → **Commit changes**
3. 1~2분 뒤 새로고침하면 바뀌어 있어요.

파일 이름은 상관없고, 가장 최근에 올린 사진이 쓰여요. 사진이 없으면 이니셜(GC)이 나와요.

## 5. 문구 바꾸기

`config.js`에서 이름, 소개, 링크를 바꿔요. `{ ko: "...", en: "..." }` 형태로 쓰면 언어 버튼에 따라 바뀌어요.

## 6. 다른 사람이 수정하지 못하게

- 저장소 파일을 바꿀 수 있는 건 Geon0904 계정뿐이에요. Settings → Collaborators에 아무도 추가하지 마세요.
- 누가 수정 제안(Pull Request)을 보내도 직접 Merge하지 않으면 반영되지 않아요.
- GitHub 계정에 2단계 인증을 켜 두세요.
- 비밀번호나 API 키는 이 저장소에 절대 넣지 마세요. 전부 공개돼요.

## 7. 예시 지우기

직접 만든 프로젝트를 올렸으면 `projects/reaction-test/` 폴더와 `projects.js`의 예시 블록(`example: true`)을 지우세요.
