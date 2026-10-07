# AI_CODING_GUIDE.md

# Burger King UI Project - AI Coding Guide

이 문서는 `firstClass` 저장소의 현재 버거킹 로그인 UI를 기준으로, AI가 새 화면을 만들거나 기존 화면을 수정할 때 지켜야 할 코딩 기준을 정리한 문서이다.

## 1. 핵심 원칙

새 화면을 만들 때 기존 코드를 전부 새로 작성하지 않는다.

작업 순서:
```text
기존 파일 확인
↓
HTML 구조 분석
↓
CSS 구조 분석
↓
이미지 / 폰트 / 경로 확인
↓
재사용할 구조 선택
↓
필요한 부분만 수정
↓
CSS 추가
↓
경로와 연결 상태 확인
↓
오류 확인
```

반드시 지킬 것:
1. 기존 HTML 구조와 class naming을 우선한다.
2. 기존 `default.css`를 다른 reset CSS로 교체하지 않는다.
3. 특별한 이유 없이 React, Vue, Bootstrap, Tailwind 등을 도입하지 않는다.
4. 기존 이미지와 폰트는 먼저 재사용 가능성을 확인한다.
5. 존재하지 않는 파일이나 경로를 임의로 만들지 않는다.
6. 디자인을 보고 HTML을 만들 때 시각적인 모양보다 콘텐츠의 의미와 구조를 먼저 판단한다.
7. 수정할 때 무엇을, 왜 바꾸는지 설명한다.

## 2. 프로젝트 구조

```text
firstClass/
├─ index.html
├─ css/
│  └─ default.css
├─ font/
└─ m/
   ├─ login.html
   └─ img/
```

주요 기준 파일:
- 화면: `m/login.html`
- 공통 CSS: `css/default.css`
- 이미지: `m/img/`
- 기본 브랜치: `main`

현재 `login.html`에서 `font/css/*.css` 경로를 사용하고 있으나 저장소에서 해당 경로가 실제 존재하는지 먼저 확인한다. 임의로 경로를 생성하지 않는다.

## 3. HTML 기본 구조

새 화면도 다음 구조를 우선한다.

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/default.css">
    <title>버거킹</title>
    <style>
        /* 화면별 CSS */
    </style>
</head>
<body>
    <div id="wrap">
        <header>
            <h1>페이지 제목</h1>
            <button type="button" class="prev_btn">
                <span class="sr-only">이전버튼</span>
            </button>
        </header>

        <main>
            <!-- 화면 콘텐츠 -->
        </main>
    </div>
</body>
</html>
```

### 의미별 요소 사용

| 목적 | 요소 |
|---|---|
| 페이지 대표 제목 | `h1` |
| 주요 영역 제목 | `h2` |
| 사용자 입력 | `form`, `fieldset`, `label`, `input` |
| 폼 제출 | `button type="submit"` |
| 화면 내 동작 | `button type="button"` |
| 다른 화면 이동 | `a` |
| 단순 그룹화 | `div` |

페이지 이동을 `button`이나 `div`로 만들지 않는다.

## 4. Form / Input

현재 로그인 UI의 기본 패턴:

```html
<form action="">
    <fieldset>
        <legend class="sr-only">로그인화면</legend>

        <label for="email">이메일 로그인</label>
        <div class="input_box">
            <input
                type="email"
                id="email"
                name="email"
                placeholder="아이디(이메일)을 입력해 주세요."
            >
        </div>

        <div class="input_box rela">
            <input
                type="password"
                name="password"
                placeholder="비밀번호를 입력해 주세요"
            >
            <button type="button" class="pw_btn">
                <span class="sr-only">비밀번호 보기</span>
            </button>
        </div>

        <button type="submit" class="login_btn">로그인</button>
    </fieldset>
</form>
```

`label for`와 `input id`는 같은 값으로 연결한다.

현재 `.input_box.rela`는 `position: relative`, `.pw_btn`은 `position: absolute`를 사용한다. 비밀번호 입력 화면에서도 이 패턴을 우선 재사용한다.

## 5. Accessibility

공통 CSS의 `.sr-only`를 사용한다.

```html
<button type="button" class="prev_btn">
    <span class="sr-only">이전버튼</span>
</button>
```

아이콘만 보여주는 버튼에도 사용자가 어떤 동작을 하는지 설명하는 텍스트를 제공한다.

## 6. CSS 기준

현재 화면은 `:root`에서 CSS 변수를 사용한다.

```css
:root {
    --font: "Sandoll GothicNeoRound", sans-serif;
    --font-pre: "Pretendard Variable", sans-serif;
    --font-BKR: "BKR", sans-serif;

    --primary: #512314;
    --disabledBg: #DDCDBE;
    --focus: #D62302;
    --baseBorder: #D9CFC6;
    --baseBg: #FFFcf9;
    --button: #E9DDCD;
    --errorColor: #C54734;
    --text: #766053;
    --bg: #F4EBDC;
    --inputBg: #FFFCF9;
}
```

기존 변수로 해결할 수 있으면 새 색상을 만들지 않는다.

```css
color: var(--primary);
background-color: var(--bg);
border-color: var(--baseBorder);
```

버거킹의 다른 화면을 만들 때는 현재 색상과 폰트 체계를 우선 유지한다.

## 7. 반응형

현재 `#wrap`의 기준:

```css
#wrap {
    width: 100%;
    max-width: 1024px;
    min-width: 360px;
    min-height: 100dvb;
    margin: 0 auto;
}
```

Figma가 390px 모바일 화면이어도 전체 페이지를 `width: 390px`로 고정하지 않는다.

`width: 100%`, `max-width`, `min-width` 구조를 우선 유지한다.

## 8. CSS 작성 방식

현재 화면은 의미가 있는 class를 사용한다.

```css
.title { ... }
.input_box { ... }
.pw_btn { ... }
.login_btn { ... }
.login_link { ... }
.sns_login { ... }
.sns_list { ... }
```

좋은 예:
```html
<div class="password_rule">...</div>
```

피해야 할 예:
```html
<div class="box1">...</div>
```

기존 class로 해결할 수 있으면 새 class를 불필요하게 추가하지 않는다.

## 9. 기존 CSS 수정

수정 전에 다음을 확인한다.

1. selector가 어떤 HTML에 연결되는가?
2. 다른 화면에서도 사용하는 공통 스타일인가?
3. 변경하면 다른 화면에 영향을 주는가?
4. 새 화면에서만 필요한 스타일이라면 별도 class가 더 안전한가?

현재 `login.html`은 화면별 CSS를 `<head>`의 `<style>`에 작성하고 있으므로, 특별한 이유가 없다면 이 학습 방식을 유지한다.

## 10. 이미지 / 파일 경로

`m/login.html`에서 이미지 경로는 다음과 같이 작성한다.

```html
<img src="img/example.svg" alt="">
```

CSS에서는:

```css
background-image: url(img/example.svg);
```

새 이미지를 사용하기 전에 실제 저장소에 파일이 존재하는지 확인한다.

## 11. 새 화면 제작 절차

### STEP 1. 기존 파일 확인
- HTML
- CSS
- 이미지
- 폰트
- 파일 경로
- 화면 연결

### STEP 2. 가장 비슷한 기준 화면 선택
예:
- 비밀번호 화면 → `login.html`의 form / input
- SNS 로그인 → `login.html`의 `.sns_login`

### STEP 3. 구조 재사용
기존 HTML 구조를 복사하거나 확장하고 처음부터 완전히 다른 구조를 만들지 않는다.

### STEP 4. Figma와 차이 확인
- 콘텐츠
- 제목
- 입력창 개수
- 버튼
- 간격
- 색상
- 폰트
- 아이콘
- 이미지
- 상태

### STEP 5. 필요한 부분만 수정

### STEP 6. 최종 확인
- HTML nesting
- label / input 연결
- button type
- a / button 역할
- CSS 경로
- 이미지 경로
- class 이름
- 중복 CSS
- 반응형

## 12. 다른 브랜드에 적용할 때

버거킹 UI에서 재사용할 것은 **구조와 코딩 방식**이다.

유지:
- HTML 기본 구조
- form / fieldset
- label / input 연결
- button 사용 방식
- class 기반 CSS
- `sr-only`
- 반응형 기본 구조

브랜드에 따라 변경:
- 브랜드명
- 로고
- 색상
- 폰트
- 배경
- 아이콘
- 버튼 디자인
- 문구
- SNS 종류
- 이미지

버거킹의 `--primary`, `--bg`, `--font-BKR` 등을 다른 브랜드에 무조건 복사하지 않는다.

## 13. 오류 해결

오류가 생기면 코드를 전부 다시 작성하지 않는다.

확인 순서:
```text
HTML 문법
↓
CSS selector
↓
파일 경로
↓
이미지 경로
↓
CSS 연결
↓
폰트 연결
↓
Live Server / 브라우저
↓
실제 화면
```

이미지가 나오지 않으면 먼저 파일 존재 여부, HTML 파일 위치, 상대경로, 파일명과 확장자를 확인한다.

## 14. AI가 하지 말아야 할 것

- 기존 코드를 전부 갈아엎기
- 필요 없이 React / Vue / Bootstrap / Tailwind 도입
- 정적 UI에 불필요한 JavaScript 추가
- 존재하지 않는 이미지 / 폰트 / CSS 경로를 임의 생성
- 실제 연결 주소를 임의로 만들기
- 의미 없는 class를 계속 추가
- 디자인만 보고 모든 요소를 `div`로 만들기

## 15. 코드 설명 기준

AI가 수정하거나 추가할 때 최소한 다음을 설명한다.

- 무엇을 변경했는가?
- 왜 변경했는가?
- 기존 구조에서 무엇을 유지했는가?
- 새 class는 무엇인가?
- 파일 경로에 문제가 없는가?

## 16. 최종 체크리스트

### HTML
- [ ] doctype
- [ ] lang
- [ ] viewport
- [ ] `#wrap`
- [ ] header / main
- [ ] heading 계층
- [ ] form 필요 여부
- [ ] label / input 연결
- [ ] button type
- [ ] 이동은 `a`
- [ ] 아이콘 버튼에 `.sr-only`

### CSS
- [ ] `default.css` 연결
- [ ] 기존 변수 재사용
- [ ] 기존 class 재사용 여부
- [ ] 중복 CSS 확인
- [ ] 이미지 / 폰트 경로 확인
- [ ] 반응형 확인

### 프로젝트
- [ ] HTML 위치 확인
- [ ] CSS 위치 확인
- [ ] 이미지 존재 여부
- [ ] 폰트 존재 여부
- [ ] 상대경로 확인
- [ ] 다른 화면 영향 확인

## 17. 최종 원칙

> **새 화면을 만들더라도 기존 프로젝트의 HTML/CSS 작성 방식과 학습 흐름을 깨지 않는다.**

버거킹 로그인 UI는 새로운 화면을 만들 때 참고하는 **기준 화면(Reference UI)**이다.

**구조는 재사용하고, 브랜드 스타일은 구분한다.**
