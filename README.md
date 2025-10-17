# Project Mini Frontend

안녕하세요! 이 프로젝트는 Next.js 기반의 프론트엔드 애플리케이션과 Nginx 웹 서버를 Docker 환경에서 구동하는 예제입니다. 특히 블루/그린 배포 전략을 염두에 둔 구조로 설계되었습니다.

## 🚀 프로젝트 개요 (Project Overview)

이 프로젝트는 다음과 같은 주요 구성 요소로 이루어져 있습니다:

*   **Next.js 애플리케이션**: React 기반의 프론트엔드 애플리케이션으로, `app/` 디렉토리에 위치합니다.
*   **Nginx 웹 서버**: Next.js 애플리케이션으로의 트래픽을 라우팅하는 리버스 프록시(Reverse Proxy) 역할을 하며, `nginx/` 디렉토리에 위치합니다.
*   **Docker Compose**: Nginx와 Next.js 애플리케이션을 컨테이너(Container)로 쉽게 빌드하고 실행하기 위한 도구입니다.

## 📁 프로젝트 구조 (Project Structure)

프로젝트의 주요 디렉토리(Directory) 및 파일(File) 구조는 다음과 같습니다.

```
/project-mini-frontend
├── docker-compose.yml
├── .git/
├── app/
│   ├── .dockerignore
│   ├── .gitignore
│   ├── docker-compose.yml
│   ├── Dockerfile
│   ├── eslint.config.mjs
│   ├── next.config.ts
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── postcss.config.mjs
│   ├── README.md
│   ├── tsconfig.json
│   ├── .next/
│   ├── .pnpm-store/
│   ├── node_modules/
│   ├── public/
│   └── src/
│       └── app/
│           ├── favicon.ico
│           ├── globals.css
│           ├── layout.tsx
│           └── page.tsx
└── nginx/
    ├── Dockerfile
    └── nginx.conf
```

### 📦 루트 디렉토리 (Root Directory)

*   `docker-compose.yml`: Nginx와 Next.js 애플리케이션 서비스(Service)를 정의하고 연결하는 Docker Compose 설정 파일입니다. 블루/그린 배포를 위해 `app-blue`와 `app-green` 두 개의 Next.js 서비스가 정의되어 있습니다.

### 🌐 `nginx/` (Nginx 웹 서버)

*   `Dockerfile`: Nginx 이미지를 빌드하기 위한 Dockerfile입니다. 기본 Nginx Alpine 이미지를 사용하며, 커스텀 `nginx.conf` 파일을 컨테이너 내부로 복사합니다.
*   `nginx.conf`: Nginx 서버의 설정 파일입니다.
    *   `upstream nextjs_app`: Next.js 애플리케이션으로 트래픽을 전달하기 위한 서버 그룹을 정의합니다. 초기 설정은 `app-blue:3000`으로 트래픽을 전달하도록 되어 있습니다.
    *   `server`: 80번 포트(Port)로 들어오는 요청을 `nextjs_app` 업스트림으로 프록시(Proxy)합니다. 클라이언트의 원래 요청 정보를 유지하기 위한 헤더(Header) 설정이 포함되어 있습니다.

### 💻 `app/` (Next.js 애플리케이션)

*   `Dockerfile`: Next.js 애플리케이션을 빌드하고 실행하기 위한 Dockerfile입니다.
*   `package.json`: Next.js 프로젝트의 의존성(Dependencies) 및 스크립트(Scripts)를 정의합니다. `next dev`, `next build`, `next start`와 같은 Next.js 기본 스크립트 외에 `docker compose`를 이용한 개발/운영 환경 실행 스크립트가 포함되어 있습니다.
*   `next.config.ts`: Next.js 애플리케이션의 설정 파일입니다.
*   `src/app/`: Next.js 13+ 버전의 App Router 구조를 따르는 애플리케이션 소스 코드(Source Code)가 위치합니다.

## 🚀 시작하기 (Getting Started)

### 📋 사전 요구 사항 (Prerequisites)

이 프로젝트를 로컬(Local) 환경에서 실행하려면 다음 도구들이 설치되어 있어야 합니다.

*   [Docker](https://www.docker.com/get-started)
*   [Docker Compose](https://docs.docker.com/compose/install/) (Docker Desktop 설치 시 함께 포함됩니다.)

### ⚙️ 설치 (Installation)

1.  **저장소(Repository) 클론(Clone)**:
    ```bash
    git clone https://github.com/your-username/project-mini-frontend.git
    cd project-mini-frontend
    ```
    (위 `github.com/your-username/project-mini-frontend.git` 부분은 실제 저장소 URL로 변경해주세요.)

2.  **Next.js 애플리케이션 의존성 설치 (선택 사항)**:
    Docker를 사용하지 않고 로컬에서 Next.js 앱을 개발할 경우에만 필요합니다.
    ```bash
    cd app
    pnpm install # 또는 npm install, yarn install
    cd ..
    ```

### ▶️ 애플리케이션 실행 (Running the Application)

프로젝트 루트 디렉토리에서 다음 명령어를 사용하여 애플리케이션을 실행할 수 있습니다.

#### 개발 환경 (Development Environment)

Next.js 앱을 개발 모드(Development Mode)로 실행하고 Nginx를 통해 접근합니다.

```bash
docker compose up --build
```

이 명령어는 `nginx`, `app-blue`, `app-green` 서비스를 빌드하고 실행합니다. Nginx는 기본적으로 `app-blue`로 트래픽을 전달합니다.

#### 백그라운드(Background)에서 실행

```bash
docker compose up -d --build
```

애플리케이션이 성공적으로 실행되면, 웹 브라우저(Web Browser)에서 `http://localhost`로 접속하여 Next.js 애플리케이션을 확인할 수 있습니다.

## 🛠️ 주요 기술 스택 (Key Technologies)

*   **Next.js**: React 기반의 웹 애플리케이션 프레임워크(Framework)
*   **React**: 사용자 인터페이스(User Interface) 구축을 위한 JavaScript 라이브러리(Library)
*   **TypeScript**: JavaScript에 타입(Type)을 추가한 언어
*   **Tailwind CSS**: 유틸리티(Utility) 우선 CSS 프레임워크
*   **Nginx**: 고성능 웹 서버 및 리버스 프록시
*   **Docker**: 컨테이너 기반 가상화 플랫폼(Platform)
*   **Docker Compose**: 다중 컨테이너 Docker 애플리케이션 정의 및 실행 도구
