# Project Protostar (Mini Frontend)

**Project Protostar**는 AI 기반의 커리어 관리 및 포트폴리오 구축을 돕는 웹 애플리케이션의 프론트엔드 프로젝트입니다. Next.js 15와 Tailwind CSS, shadcn/ui를 기반으로 구축되었으며, 반응형 디자인과 직관적인 사용자 경험(UX)을 최우선으로 고려하여 설계되었습니다.

## 🚀 Key Features

* **Responsive Sidebar Layout**: PC, 태블릿, 모바일 등 모든 디바이스에 최적화된 반응형 사이드바를 제공합니다. 모바일에서는 전체 화면 오버레이로, PC에서는 안정적인 고정 레이아웃으로 동작합니다.
* **Dynamic Header System**: 페이지 경로에 따라 자동으로 변경되는 동적 헤더 타이틀 시스템을 갖추고 있어, 사용자가 현재 위치를 직관적으로 파악할 수 있습니다.
* **Modern UI/UX**: `shadcn/ui`와 Tailwind CSS를 활용하여 깔끔하고 세련된 디자인 시스템을 구축했습니다.
* **Interactive Dashboard**: 대시보드, 채팅 기록(Chat History), 자료 관리(Materials), 설정(Settings) 등 다양한 기능을 통합 관리할 수 있는 구조를 마련했습니다.

## 🛠️ Tech Stack

* **Framework**: Next.js 15 (App Router)
* **Styling**: Tailwind CSS
* **UI Components**: shadcn/ui
* **Icons**: Lucide React
* **Language**: TypeScript

## 📦 Deployment & CI/CD

이 프로젝트는 안정적인 배포와 운영을 위해 자동화된 CI/CD 파이프라인을 갖추고 있습니다.

* **CI/CD Tool**: Jenkins
* **Workflow**:
    1. 개발자가 `main` 브랜치에 코드를 Push하거나 PR을 Merge합니다.
    2. Jenkins가 변경 사항을 감지하고 자동으로 빌드 프로세스를 시작합니다.
    3. 빌드가 성공하면 운영 서버로 **무중단 배포(Zero-downtime Deployment)**가 수행됩니다.
* **Infrastructure**: Docker 컨테이너 기반으로 운영되어 환경 일관성을 보장합니다.

## 🏃‍♂️ Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm start:dev
```

Open [http://localhost:5858](http://localhost:5858) with your browser to see the result.

## AI_Rules
Code generation and task execution must adhere to the guidelines established in [project-protostar/docs/guide](../../docs/guide).
