# AI_CODING_GUIDE.md

## 목적

이 문서는 firstClass 저장소의 현재 버거킹 UI 코드를 기준으로, 이후 새로운 화면이나 다른 브랜드 로그인 UI를 만들 때 기존 HTML/CSS 구조와 코딩 방식을 최대한 유지하기 위한 AI 코딩 가이드이다.

## 1. 기본 원칙

1. 기존 코드를 먼저 읽고 이해한다.
2. 기존 구조를 불필요하게 새 구조로 교체하지 않는다.
3. 사용자가 작성한 클래스명과 HTML 구조를 우선적으로 유지한다.
4. React, Vue, Bootstrap, Tailwind 등 새로운 기술이나 라이브러리를 임의로 추가하지 않는다.
5. 새 화면을 만들기 전에 폴더 구조, 파일 경로, 폰트, 이미지 연결 상태를 확인한다.
6. 기존 코드에 문제가 있어도 먼저 원인을 설명하고, 요청 없이 전체 구조를 갈아엎지 않는다.
7. 다른 브랜드를 만들 때 공통 UI 구조와 브랜드별 변경 요소를 구분한다.
8. Figma를 코드로 옮길 때 시각적인 결과뿐 아니라 HTML의 의미와 현재 프로젝트의 작성 방식을 함께 고려한다.

## 2. 현재 프로젝트 구조

현재 main 브랜치의 주요 구조:

```text
firstClass/
├─ index.html
├─ css/
│  └─ default.css
├─ font/
│  ├─ BKBulMatPro-Bold.ttf
│  ├─ PretendardVariable.woff2
│  └─ SDGothicNeoRound-*.woff
└─ m/
   ├─ login.html
   └─ img/
      ├─ back_icon.svg
      ├─ eye_icon.svg
      ├─ kakao.svg
      ├─ naver.svg
      ├─ apple.svg
      ├─ 삼성카드.svg
      └─ 기타 UI SVG
```

`m/login.html`은 `m/` 폴더 안에 있으므로 공통 CSS는 `../css/default.css`처럼 상대경로를 사용한다.

이미지는 현재 `m/img` 폴더를 기준으로 `url(img/파일명.svg)` 형태로 연결한다.

새 파일을 만들기 전에 실제 저장소의 파일 위치를 확인하고 상대경로를 계산한다.

## 3. 버거킹 로그인 기준 HTML 구조

현재 로그인 화면의 핵심 구조는 다음과 같다.

```html
<div id="wrap">
    <header>
        <h1>로그인</h1>
        <button class="prev_btn">
            <span class="sr-only">이전버튼</span>
        </button>
    </header>

    <main>
        <h2 class="title">
            <span>안녕하세요:)</span>
            <span>버거킹입이다.</span>
        </h2>

        <form action="">
            <fieldset>
                <legend class="sr-only">로그인화면</legend>

                <label for="email">이메일 로그인</label>

                <div class="input_box">
                    <input type="email" ...>
                </div>

                <div class="input_box rela">
                    <input type="password" ...>
                    <button type="button" class="pw_btn">
                        <span class="sr-only">비밀번호 보기</span>
                    </button>
                </div>

                <div class="login_option">...</div>

                <button type="submit" class="login_btn">
                    로그인
                </button>
            </fieldset>
        </form>

        <div class="login_link">...</div>

        <div class="sns_login">
            <p>...</p>
            <div class="sns_list">...</div>
        </div>
    </main>
</div>
```

## 4. 주요 클래스 역할

| 구조 | 역할 |
|---|---|
| `#wrap` | 전체 페이지 영역 |
| `header` | 화면 제목과 이전 버튼 |
| `main` | 주요 콘텐츠 |
| `.title` | 로그인 화면의 주요 문구 |
| `form` | 입력 및 제출 |
| `fieldset` | 로그인 관련 입력 그룹 |
| `.input_box` | 입력 요소 묶음 |
| `.rela` | 비밀번호 버튼 위치 기준 |
| `.pw_btn` | 비밀번호 보기 버튼 |
| `.login_option` | 자동 로그인 / 아이디 저장 |
| `.login_btn` | 로그인 주요 CTA |
| `.login_link` | 아이디 찾기 / 비밀번호 재설정 / 회원가입 |
| `.sns_login` | SNS 로그인 영역 |
| `.sns_list` | SNS 버튼 목록 |

새 화면에서 동일한 역할이 필요하면 기존 구조를 우선 재사용한다.

## 5. HTML 작성 규칙

### 기본 구조

새 한국어 화면은 다음 구조를 기본으로 검토한다.

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <div id="wrap">
        ...
    </div>
</body>
</html>
```

현재 `login.html`은 `lang="en"`이지만 기존 파일을 요청 없이 임의 수정하지 않는다.

### 제목

페이지 제목은 `h1`, 주요 콘텐츠 제목은 `h2`를 우선 사용한다.

### 폼

사용자 입력 화면은 현재 프로젝트처럼 `form`과 `fieldset`을 우선 사용한다.

### 입력

- 이메일: `input type="email"`
- 비밀번호: `input type="password"`
- 선택: `input type="checkbox"`
- 제출: `button type="submit"`

가능하면 `label`과 `input`의 `id`/`for` 관계를 연결한다.

### 버튼과 링크

동작 실행은 `button`, 페이지 이동은 `a`를 사용한다.

### 접근성

아이콘만 보이는 버튼이나 링크에는 현재 프로젝트의 `.sr-only` 방식을 사용해 의미를 전달한다.

## 6. CSS 작성 규칙

### 공통 CSS와 화면 CSS

현재 구조는 다음과 같다.

- `css/default.css`: 프로젝트 공통 초기화
- `m/login.html` 내부 `<style>`: 로그인 화면 전용 스타일

새 화면에서도 공통 스타일과 화면 전용 스타일을 구분한다.

### CSS 변수

현재 버거킹 로그인은 `:root`에서 폰트와 색상을 변수로 관리한다.

```css
:root {
    --primary: #512314;
    --baseBorder: #D9CFC6;
    --bg: #F4EBDC;
    --inputBg: #FFFCF9;
}
```

다른 브랜드를 만들 때도 브랜드 색상을 여러 선택자에 반복해서 직접 입력하기보다 변수로 관리하는 현재 방식을 우선한다.

브랜드 색상이나 폰트는 근거 없이 추측하지 않는다. 제공된 Figma 또는 공식 자료를 기준으로 한다.

### 단위

현재 로그인 화면은 `html { font-size: 62.5%; }`와 `rem` 단위를 사용한다. 새 화면에서는 특별한 이유가 없다면 기존 단위를 유지한다.

### 전체 화면

현재 `#wrap`은 `width: 100%`, `max-width: 1024px`, `min-width: 360px`, `min-height: 100dvb`, `margin: 0 auto`를 사용한다. 새 화면에서도 최상위 화면 영역은 기존 `#wrap` 구조를 우선 유지한다.

### 입력창

현재 이메일/비밀번호 입력창은 `width: 100%`, `height: 50px`, `padding: 0 20px`, `border-radius: 10px` 구조를 사용한다. 동일한 역할의 입력창이면 기존 스타일을 우선 재사용한다.

### 아이콘 버튼

현재 비밀번호 보기 버튼은 `.input_box.rela`를 위치 기준으로 하고 `.pw_btn`을 absolute로 배치한다. 새 화면에서도 기존 이미지와 구조를 재사용할 수 있는지 먼저 확인한다.

## 7. 다른 브랜드 로그인 UI 제작 순서

1. 버거킹 `login.html`의 기존 구조를 확인한다.
2. 공통 구조와 브랜드별 변경 요소를 나눈다.
3. HTML 구조는 가능한 한 유지한다.
4. 브랜드명, 문구, 색상, 폰트, 로고, 아이콘, SNS 종류 등을 필요한 만큼 변경한다.
5. CSS로 Figma의 크기, 위치, 색상, 여백을 맞춘다.
6. 이미지와 폰트 경로를 확인한다.
7. 모바일 화면에서 콘텐츠가 잘리지 않는지 확인한다.
8. 마지막으로 Figma와 실제 브라우저 결과를 비교한다.

### 유지 우선 요소

- `#wrap`
- `header`
- `h1`
- `main`
- `form`
- `fieldset`
- `label`
- `.input_box`
- 로그인 버튼 구조
- 로그인 링크 영역
- SNS 영역

### 브랜드에 따라 변경 가능한 요소

- 브랜드명
- 로고
- 제목 문구
- 색상
- 배경
- 폰트
- 아이콘
- SNS 종류
- 입력창 스타일
- 버튼 스타일
- 여백과 크기

## 8. 기존 코드 수정 원칙

기존 코드가 있는 경우 전체 코드를 새로 작성하지 않는다.

먼저 다음을 확인한다.

1. HTML 구조가 맞는가?
2. 클래스명과 CSS 선택자가 연결되어 있는가?
3. 이미지 경로가 맞는가?
4. 폰트 경로가 맞는가?
5. `default.css`가 연결되어 있는가?
6. 브라우저 기본 스타일 문제인가?
7. CSS 속성명이나 값에 오타가 있는가?
8. 화면 크기 때문에 발생한 문제인가?

원인을 찾은 뒤 필요한 부분만 수정한다.

## 9. 현재 코드에서 주의할 점

아래 내용은 현재 코드에서 실제로 확인되는 부분이다. AI는 사용자의 요청 없이 이를 임의로 수정하지 않는다.

### 변수명

현재 코드에는 `--placehokder`라는 변수명이 존재한다. 오타처럼 보이더라도 기존 코드 기준으로 사용되고 있으므로 새 코드에서 임의로 이름을 바꾸지 않는다.

### CSS 속성

현재 코드에는 `columns-gap: 4px`가 존재한다. 새 코드에서는 실제 의도와 사용 위치를 확인한 뒤 올바른 속성을 사용한다.

### 폰트 경로

현재 `login.html`은 다음 CSS 파일을 연결한다.

```text
../font/css/pretendardvariable.css
../font/css/bkbulmatpro.css
../font/css/sdgothic.css
```

하지만 현재 저장소 트리에서는 `font/css/` 폴더와 위 CSS 파일이 확인되지 않고 폰트 파일 자체가 확인된다.

따라서 폰트 문제가 생기면 먼저 경로와 실제 파일 존재 여부를 확인한다.

### 기존 문구

현재 `login.html`에는 버거킹 문구에 오타로 보이는 부분이 있다. AI는 사용자의 요청 없이 기존 콘텐츠를 임의로 수정하지 않는다.

## 10. 금지 사항

사용자가 요청하지 않는 한 다음 작업을 하지 않는다.

- React/Vue 등으로 변환
- Bootstrap/Tailwind 등 외부 UI 시스템 추가
- 기존 클래스명을 전부 변경
- 기존 HTML 구조를 전부 새로 작성
- 이미지 대신 임의의 아이콘 라이브러리 추가
- 실제 존재하지 않는 이미지 경로 생성
- 브랜드 색상이나 폰트를 근거 없이 추측
- 기존 코드를 이유 없이 리팩터링
- 오타를 설명 없이 수정
- 파일 구조를 임의로 변경

## 11. 코드 작성 전 체크리스트

### 파일

- [ ] HTML 파일 위치 확인
- [ ] CSS 파일 위치 확인
- [ ] 이미지 폴더 위치 확인
- [ ] 필요한 이미지 존재 여부 확인
- [ ] 폰트 파일과 연결 파일 존재 여부 확인

### HTML

- [ ] `#wrap` 구조 유지
- [ ] `header`/`main` 역할 구분
- [ ] heading 계층 확인
- [ ] `label`과 `input` 연결
- [ ] `button`과 `a` 역할 구분
- [ ] 아이콘에 접근성 텍스트 제공

### CSS

- [ ] `default.css`와 충돌 여부 확인
- [ ] 기존 CSS 변수 확인
- [ ] 기존 클래스 재사용 가능 여부 확인
- [ ] 불필요한 CSS 반복 방지
- [ ] 모바일 화면 확인

### 결과

- [ ] Figma 화면 크기 확인
- [ ] 콘텐츠 순서 확인
- [ ] 주요 여백과 크기 확인
- [ ] 버튼/입력 상태 확인
- [ ] 이미지 및 폰트 경로 확인

## 12. AI 작업 방식

새 화면 요청이 들어오면 다음 순서로 작업한다.

```text
현재 저장소 확인
→ 관련 HTML/CSS 확인
→ 기존 구조에서 재사용할 부분 찾기
→ 새 화면에서 달라지는 부분 정리
→ HTML 작성 또는 수정
→ CSS 작성 또는 수정
→ 경로 확인
→ Figma와 비교
→ 필요한 부분만 개선
```

오류 질문이 들어오면 바로 완성 코드를 주기보다 다음 순서로 설명한다.

```text
문제 위치
→ 발생 원인
→ 확인할 코드/경로
→ 수정 위치
→ 필요한 경우 수정 코드
```

## 13. 핵심 기준

이 프로젝트의 목표는 AI가 새로운 코드를 대신 만들어 주는 것이 아니라, 사용자가 작성한 버거킹 HTML/CSS 구조를 기준으로 새로운 화면을 확장하고 이해하는 것이다.

다른 브랜드 로그인 UI를 만들 때도 다음 원칙을 우선한다.

```text
기존 버거킹 구조
      ↓
공통 UI 구조 확인
      ↓
브랜드별 변경 요소 확인
      ↓
HTML 구조 유지
      ↓
CSS 스타일 변경
      ↓
Figma와 비교
      ↓
필요한 부분만 수정
```

결과보다 기존 코드의 구조와 작성 이유를 이해하는 것을 우선한다.
