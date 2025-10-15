# Dockerfile

# ======= 1. 빌드 스테이지 ========
FROM node:22-alpine AS builder

# 작업 위치 설정 - 해당 컨테이너 위치 
WORKDIR /app

# pnpm 설치 
RUN npm install -g pnpm

# package.json, pnpm-lock.yaml 등 의존성 관련 파일만 복사
COPY package.json pnpm-lock.yaml ./

# 의존성 설치 
RUN pnpm install --prod

# 나머지 소스 코드 전체 복사 
COPY . .

# 애플리케이션 빌드
RUN pnpm run build


# ======= 2. 실행 스테이지 ========
FROM node:22-alpine AS runner

# 작업 디렉토리 설정 
WORKDIR /app

# 빌드 스테이지의 운영에 필요한 파일들만 복사 
# 1. 빌드 결과물 
COPY --from=builder /app/.next ./.next

# 2. 정적 파일
COPY --from=builder /app/public ./public

# 3. 운영용 의존성
COPY --from=builder /app/node_modules ./node_modules

# 4. package.json 파일
COPY --from=builder /app/package.json ./package.json

# 애플리케이션이 사용할 포트 노출 
EXPOSE 3000

# 컨테이너 시작 시 명령어
CMD ["node", "./node_modules/next/dist/bin/next", "start"]
