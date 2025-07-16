# --- Build Stage ---
FROM gradle:8.7.0-jdk17 AS builder
WORKDIR /app

# gradle, gradlew 및 빌드 관련 소스만 복사 (최소 파일만)
COPY backend/gradlew ./gradlew
COPY backend/gradle/ ./gradle
COPY backend/settings.gradle.kts .
COPY backend/build.gradle.kts .
COPY backend/gradle.properties .
COPY backend/src/ ./src

# gradlew 실행 권한 부여
RUN chmod +x ./gradlew

# 빌드 (테스트 생략, 필요시 -x test)
RUN ./gradlew build -x test

# --- Run Stage ---
FROM eclipse-temurin:17-jdk-alpine AS runner
WORKDIR /app

# 빌드된 JAR 복사
COPY --from=builder /app/build/libs/*.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]
