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

---

# Project-mini Frontend 개발 Task List (프론트엔드 개발 Task List)
## 1. 개발 환경 설정 및 코드 품질 자동화 (Development Environment Setup & Code Quality Automation)

### 1.1. 코드 품질 도구 도입 (Introduction of Code Quality Tools)
- **ESLint 설정 강화**: 현재 `eslint.config.mjs` 파일이 존재하지만, Next.js 프로젝트에 맞는 규칙(rules)을 추가하고, Prettier와 같은 코드 포매터(formatter)와 연동하여 코드 스타일(code style)을 일관되게 유지합니다.
- **Prettier 도입**: 코드 포매팅(code formatting)을 자동화하여 코드 스타일(code style) 일관성을 확보합니다.
- **TypeScript 타입 체크(Type Check) 강화**: `tsconfig.json` 설정을 검토하고, 엄격한 타입(strict type) 검사를 통해 잠재적인 오류를 미리 방지합니다.

### 1.2. CI/CD 파이프라인(Pipeline) 연동 (CI/CD Pipeline Integration)
- **Jenkinsfile 업데이트**: 코드 품질 도구(ESLint, TypeScript) 실행 단계를 Jenkinsfile에 추가하여 빌드(build) 전에 자동으로 코드 품질을 검증하도록 합니다.
- **테스트(Test) 환경 구축**: Jest, React Testing Library 등 적절한 테스트 프레임워크(framework)를 도입하고, 간단한 단위 테스트(unit test) 및 통합 테스트(integration test)를 작성하여 코드 변경에 대한 안정성을 확보합니다. (현재 테스트 코드가 없는 것으로 보입니다.)

## 2. 핵심 페이지 개발 (Core Page Development)

### 2.1. 레이아웃(Layout) 및 내비게이션(Navigation) 구조 설계 (Layout & Navigation Structure Design)
- **기본 레이아웃(Layout) 컴포넌트(Component) 개선**: `src/app/layout.tsx` 파일을 수정하여 공통 헤더(header), 푸터(footer), 내비게이션 바(navigation bar) 등을 포함하는 기본 레이아웃(layout)을 정의합니다.
- **내비게이션 컴포넌트(Navigation Component) 구현**: 페이지 간 이동을 위한 내비게이션 링크(navigation link)를 포함하는 컴포넌트(component)를 구현합니다.

### 2.2. 로그인 페이지 (Login Page) (흉내만 내는)
- **UI/UX 디자인**: 간단한 로그인 폼(form)을 디자인합니다. (아이디, 비밀번호 입력 필드, 로그인 버튼)
- **클라이언트(Client) 측 유효성 검사(Validation)**: 입력 필드에 대한 기본적인 유효성 검사(validation)를 추가합니다.
- **상태 관리(State Management)**: 로그인 상태(로그인 여부, 사용자 정보 등)를 관리하는 방법을 구현합니다. (예: React Context API, Zustand 등)
- **로그인/로그아웃 기능 흉내**: 버튼 클릭 시 로그인/로그아웃 상태를 변경하고, 이에 따라 UI를 업데이트(update)합니다. (실제 서버(server) 연동 없이 클라이언트(client)에서만 처리)

### 2.3. 소개 페이지 (About Page) (MD 파일 기반)
- **Markdown(MD) 파일 파싱(Parsing) 및 렌더링(Rendering)**: Markdown(MD) 파일을 읽어와 HTML로 변환하여 페이지에 렌더링(rendering)하는 기능을 구현합니다. (예: `remark`, `rehype` 등 라이브러리(library) 활용)
- **사진 추가 및 관리**: 소개 페이지에 포함될 사진을 `public` 디렉토리(directory)에 추가하고, Next.js `Image` 컴포넌트(component)를 사용하여 최적화된 이미지(image)를 표시합니다.
- **동적 콘텐츠(Dynamic Content) 로딩**: Markdown(MD) 파일의 내용을 동적으로 로딩(loading)하여 페이지에 표시합니다.

### 2.4. 미니 프로젝트 인덱스 페이지 (Mini-Projects Index Page)
- **프로젝트 목록 표시**: 다양한 미니 프로젝트(mini-project)의 목록을 카드(card) 형태로 표시합니다. (프로젝트 이름, 간단한 설명, 링크 등)
- **동적 라우팅(Dynamic Routing)**: 각 프로젝트 카드(card)를 클릭하면 해당 프로젝트의 상세 페이지로 이동하도록 동적 라우팅(dynamic routing)을 설정합니다.

### 2.5. 개별 미니 프로젝트 페이지 (Individual Mini-Project Pages)
- **프로젝트별 페이지 생성**: 각 미니 프로젝트(mini-project)에 대한 개별 페이지를 생성하고, 해당 프로젝트의 내용과 기능을 구현합니다. (예: 간단한 계산기, 투두 리스트(todo list) 등)

## 3. 배포 및 운영 (Deployment & Operations)

### 3.1. 무중단 배포(Blue/Green Deployment) 확인 및 개선 (Verification & Improvement)
- **배포 스크립트(Script) 검토**: `jenkinsfile` 및 `renew-ssl.sh` 스크립트(script)를 다시 한번 검토하여 무중단 배포(blue/green deployment)가 의도대로 동작하는지 확인합니다.
- **롤백(Rollback) 전략**: 배포 실패 시 자동으로 이전 버전으로 롤백(rollback)하는 전략을 수립하고, `jenkinsfile`에 반영합니다.

### 3.2. 성능 최적화(Performance Optimization)
- **이미지(Image) 최적화**: Next.js `Image` 컴포넌트(component)의 `priority`, `sizes` 등 속성(attribute)을 적절히 사용하여 이미지(image) 로딩 성능을 최적화합니다.
- **코드 스플리팅(Code Splitting)**: 필요한 경우 동적 임포트(dynamic import)를 사용하여 코드 스플리팅(code splitting)을 적용하고, 초기 로딩(loading) 시간을 단축합니다.

### 3.3. 모니터링(Monitoring) 및 로깅(Logging)
- **로그(Log) 수집 및 분석**: 애플리케이션(application) 로그(log)를 효과적으로 수집하고 분석할 수 있는 시스템(system)을 고려합니다. (예: ELK Stack, Grafana Loki 등)
- **성능 모니터링(Performance Monitoring)**: 웹 바이탈(Web Vitals) 등 사용자 경험(user experience) 지표를 모니터링(monitoring)하고, 성능 저하 요인을 식별합니다.

## 4. 추가 기능 및 개선 (Additional Features & Improvements)

### 4.1. SEO(검색 엔진 최적화) (Search Engine Optimization)
- **메타데이터(Metadata) 관리**: `next/head` 또는 `Metadata` API를 사용하여 각 페이지의 제목(title), 설명(description), 키워드(keywords) 등 메타데이터(metadata)를 동적으로 관리합니다.
- **Open Graph(OG) 및 Twitter Card 설정**: 소셜 미디어(social media) 공유 시 표시될 정보를 설정합니다.

### 4.2. 접근성(Accessibility) (A11y)
- **ARIA 속성(Attribute) 활용**: 시맨틱(semantic) HTML과 ARIA 속성(attribute)을 사용하여 웹 접근성(web accessibility)을 개선합니다.
- **키보드(Keyboard) 내비게이션(Navigation) 지원**: 키보드(keyboard)만으로도 모든 기능에 접근할 수 있도록 구현합니다.

### 4.3. 다국어(Internationalization) (i18n) 지원 (선택 사항)
- **Next.js i18n 설정**: Next.js의 내장 i18n 기능을 활용하여 다국어(i18n) 지원을 구현합니다.
- **콘텐츠 번역**: 각 페이지의 콘텐츠를 여러 언어로 번역하여 제공합니다.

---

이 Task List는 제안이며, 우선순위(priority)와 상세 내용은 프로젝트 진행 상황에 따라 조정될 수 있습니다. 각 항목을 진행하면서 필요한 경우 추가적인 논의를 통해 구체적인 구현 방안을 결정할 수 있습니다.
