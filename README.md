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

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Docker 환경 구분 (Dev vs. Prod)

이 프로젝트는 `Dockerfile`과 `docker-compose.yml`을 활용하여 개발(Development) 및 운영(Production) 환경을 구분합니다.

### Dockerfile

`Dockerfile`은 멀티 스테이지 빌드(Multi-stage build)를 사용하여 효율적인 이미지를 생성합니다.

*   **`builder` 스테이지**: 모든 의존성(개발 및 운영)을 설치하고 애플리케이션을 빌드합니다. 개발 환경(`dev` 서비스)은 이 스테이지를 직접 사용하여 코드 변경 사항을 즉시 반영할 수 있도록 합니다.
*   **`runner` 스테이지**: `builder` 스테이지에서 생성된 빌드 결과물(`_next`), 정적 파일(`public`), 운영에 필요한 `node_modules` 및 `package.json` 파일만 복사하여 최종 운영 이미지를 구성합니다. 이 스테이지는 최소한의 파일만 포함하여 이미지 크기를 최적화하고 보안을 강화합니다.

### docker-compose.yml

`docker-compose.yml` 파일은 두 가지 서비스(`dev`와 `prod`)를 정의하여 각 환경의 특성을 반영합니다.

*   **`dev` 서비스**:
    *   `build.target: builder`: `Dockerfile`의 `builder` 스테이지를 사용합니다. 이는 개발에 필요한 모든 도구와 소스 코드를 포함합니다.
    *   `command: pnpm run dev`: Next.js 개발 서버를 실행하여 HMR(Hot Module Replacement)을 지원합니다.
    *   `volumes`: 로컬 프로젝트 디렉토리를 컨테이너에 마운트하여 코드 변경 시 컨테이너를 다시 빌드할 필요 없이 즉시 반영되도록 합니다.
    *   `environment: NODE_ENV=development`: `NODE_ENV`를 `development`로 설정합니다.
*   **`prod` 서비스**:
    *   `build.context: .`: `Dockerfile` 전체를 빌드하며, 최종적으로 `runner` 스테이지에서 생성된 최적화된 운영 이미지를 사용합니다.
    *   `environment: NODE_ENV=production`: `NODE_ENV`를 `production`으로 설정합니다.
    *   `volumes`는 설정되어 있지 않아, 빌드된 이미지를 그대로 사용합니다.

이러한 구성을 통해 개발 환경에서는 빠른 개발 및 테스트를 위한 유연성을 제공하고, 운영 환경에서는 최적화된 성능과 안정성을 보장합니다.

### Docker Compose 명령어

`package.json`에 정의된 스크립트를 통해 Docker Compose 명령어를 편리하게 실행할 수 있습니다.

*   **`pnpm start:dev`**: 개발 환경 컨테이너를 포그라운드(foreground)에서 실행합니다. (개발 서버 실행)
*   **`pnpm start:devB`**: 개발 환경 컨테이너를 백그라운드(background)에서 실행합니다. (개발 서버 실행)
*   **`pnpm start:prod`**: 운영 환경 컨테이너를 포그라운드(foreground)에서 실행합니다. (운영 서버 실행)
*   **`pnpm start:prodB`**: 운영 환경 컨테이너를 백그라운드(background)에서 실행합니다. (운영 서버 실행)
*   **`pnpm set:dev`**: 개발 환경 이미지를 빌드합니다.
*   **`pnpm set:prod`**: 운영 환경 이미지를 캐시 없이 빌드합니다.
*   **`pnpm unset:dev`**: 개발 환경 컨테이너와 이미지를 모두 제거합니다.
*   **`pnpm unset:prod`**: 운영 환경 컨테이너와 이미지를 모두 제거합니다.
