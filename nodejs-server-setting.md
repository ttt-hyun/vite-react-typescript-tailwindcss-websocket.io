# Server Setting

## 1. Installing Node Modules

```bash
# 프로젝트 초기화: package.json 파일을 기본값으로 생성
npm init -y 

# 개발 의존성
npm install -D typescript @types/node @types/express ts-node nodemon 

# 프로덕션 의존성
npm install express

# TypeScript 설정 파일 생성
npx tsc --init
```

## 2. Config Setting (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

## 3. Config Setting (package.json - scripts)

```json
"scripts": {
    "start": "node dist/server.js",
    "dev": "nodemon server.ts",
    "build": "tsc",
    "watch": "tsc --watch"
  },
```

## 4. Basic Express source scripting (server.ts)

```ts
import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 기본 라우트
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello TypeScript + Express!' });
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```