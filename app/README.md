This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.js.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 🐳 Docker 환경 구성 가이드 (Docker Environment Configuration Guide)

이 Next.js 애플리케이션은 Docker를 활용하여 개발(Development) 및 운영(Production) 환경을 효율적으로 관리합니다. `package.json`에 정의된 스크립트를 통해 각 환경을 쉽게 설정하고 실행할 수 있습니다.

### `package.json` 스크립트 (Scripts)

`package.json` 파일에는 Next.js 애플리케이션의 개발 및 빌드, 실행을 위한 다양한 스크립트가 정의되어 있습니다. 특히 Docker Compose를 이용한 개발/운영 환경 관리 스크립트가 포함되어 있습니다.

```json
{
  "name": "project-mini",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build --turbopack",
    "start": "next start",
    "lint": "eslint",
    "start:dev": "docker compose up dev",
    "start:devB": "docker compose up dev -d",
    "start:prod": "docker compose up prod",
    "start:prodB": "docker compose up prod -d",
    "set:dev": "docker compose build dev",
    "set:prod": "docker compose build --no-cache prod",
    "unset:dev": "docker compose down --rmi all --volumes",
    "unset:prod": "docker compose down --rmi all --volumes"
  },
  "dependencies": {
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "next": "15.5.5"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@tailwindcss/postcss": "^4",
    "tailwindcss": "^4",
    "eslint": "^9",
    "eslint-config-next": "15.5.5",
    "@eslint/eslintrc": "^3"
  }
}
```

### 🛠️ 개발 환경 (Development Environment)

개발 환경은 빠른 개발 주기와 코드 변경 사항의 즉각적인 반영을 목표로 합니다.

- **`Dockerfile` 구성**: `Dockerfile`의 `builder` 스테이지를 활용하여 개발에 필요한 모든 의존성과 소스 코드를 포함합니다. 이는 개발 서버 실행에 필요한 모든 도구를 제공합니다.
- **`docker-compose.yml` (`dev` 서비스)**:
  - `build.target: builder`: `Dockerfile`의 `builder` 스테이지를 직접 사용하여 개발에 필요한 모든 도구와 소스 코드를 포함합니다.
  - `command: pnpm run dev`: Next.js 개발 서버를 실행하여 HMR(Hot Module Replacement)을 지원합니다. 코드 변경 시 컨테이너를 다시 빌드할 필요 없이 즉시 반영됩니다.
  - `volumes`: 로컬 프로젝트 디렉토리(`app/`)를 컨테이너 내부의 `/app` 경로에 마운트(Mount)합니다. 이를 통해 로컬에서 코드를 수정하면 컨테이너 내부의 파일도 함께 업데이트되어 개발 서버에 즉시 반영됩니다.
  - `environment: NODE_ENV=development`: `NODE_ENV` 환경 변수를 `development`로 설정하여 Next.js가 개발 모드로 동작하도록 합니다.
- **실행 명령어**: `package.json` 스크립트를 통해 개발 환경을 쉽게 시작할 수 있습니다.
  - `pnpm start:dev`: 개발 환경 컨테이너를 포그라운드(foreground)에서 실행합니다. (개발 서버 실행)
  - `pnpm start:devB`: 개발 환경 컨테이너를 백그라운드(background)에서 실행합니다. (개발 서버 실행)
  - `pnpm set:dev`: 개발 환경 이미지를 빌드합니다.
  - `pnpm unset:dev`: 개발 환경 컨테이너와 이미지를 모두 제거합니다.

### 🚀 운영 환경 (Production Environment)

운영 환경은 최적화된 성능, 안정성 및 보안을 목표로 합니다.

- **`Dockerfile` 구성**: `Dockerfile`의 `runner` 스테이지를 활용하여 최종 운영 이미지를 구성합니다. 이 스테이지는 `builder` 스테이지에서 생성된 빌드 결과물(`_next`), 정적 파일(`public`), 운영에 필요한 `node_modules` 및 `package.json` 파일만 복사하여 이미지 크기를 최소화하고 보안을 강화합니다.
- **`docker-compose.yml` (`prod` 서비스)**:
  - `build.context: .`: `Dockerfile` 전체를 빌드하며, 최종적으로 `runner` 스테이지에서 생성된 최적화된 운영 이미지를 사용합니다.
  - `command: pnpm run start`: 빌드된 Next.js 애플리케이션을 시작합니다.
  - `environment: NODE_ENV=production`: `NODE_ENV` 환경 변수를 `production`으로 설정하여 Next.js가 운영 모드로 동작하도록 합니다.
  - `volumes`는 설정되어 있지 않습니다. 이는 빌드된 이미지를 그대로 사용하여 일관된 운영 환경을 보장합니다.
- **실행 명령어**: `package.json` 스크립트를 통해 운영 환경을 쉽게 시작할 수 있습니다.
  - `pnpm start:prod`: 운영 환경 컨테이너를 포그라운드(foreground)에서 실행합니다. (운영 서버 실행)
  - `pnpm start:prodB`: 운영 환경 컨테이너를 백그라운드(background)에서 실행합니다. (운영 서버 실행)
  - `pnpm set:prod`: 운영 환경 이미지를 캐시 없이 빌드합니다.
  - `pnpm unset:prod`: 운영 환경 컨테이너와 이미지를 모두 제거합니다.

이러한 구성을 통해 개발 환경에서는 빠른 개발 및 테스트를 위한 유연성을 제공하고, 운영 환경에서는 최적화된 성능과 안정성을 보장합니다.
