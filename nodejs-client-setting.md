# Client Setting

## 1. Create React App을 사용한 프로젝트 생성 (Typescript)

해당 단계에서서 `tsconfig.js` 와 프로젝트 기본 구성 파일이 전부 생성됨

```bash
npx create-react-app client --template typescript
```

Create React App(cra)을 통해 react 프로젝트 생성 시 빌드 도구를 `webpack`을 사용하기 때문에
`postcss`의 버전이 낮게 고정되어 `tailwindcss`를 사용할 때 호환성을 위해 낮은 버전을 사용해야하는 이슈가 있다. 따라서 최신 기술 스택을 사용하기 위해서는 esbuild 또는 SWC 빌드 도구를 사용하는 `Vite` 사용이 권장된다. (2025.05.03 기준준)

## 2. Vite를 사용한 프로젝트 생성 (Typescript)

Vite는 더 빠른 개발 서버와 빌드 프로세스를 제공하는 최신 프론트엔드 도구입니다.

```bash
npm create vite@latest client -- --template react-ts
cd client
npm install
```

## Tailwindcss 설치하기

Vite에서는 `@tailwindcss/postcss` 패키지를 사용해야 하며, CSS 벤더 프리픽스를 자동으로 추가해주는 autoprefixer도 필요합니다.

```bash
npm install -D @tailwindcss/postcss autoprefixer
```

## tailwindcss 설정 파일 생성

프로젝트 root에 tailwindcss.config.js 파일을 생성

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

프로젝트 root에 postcss.config.js 파일 생성

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

`/src/index.css` 파일에 Tailwindcss 지시문을 추가

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 개발 서버 실행

```bash
npm run dev
```

Vite 개발 서버는 기본적으로 `http://localhost:5173`에서 실행됩니다.
