import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    id("application")
    id("org.springframework.boot") version "3.2.4"
    id("io.spring.dependency-management") version "1.1.4"
    kotlin("jvm") version "1.9.22"
    kotlin("plugin.spring") version "1.9.22"
    kotlin("plugin.jpa") version "1.9.22"
    id("org.jetbrains.kotlin.kapt") version "1.9.22"
}

java {
    toolchain {
        languageVersion.set(JavaLanguageVersion.of(17))
    }
}

repositories {
    mavenCentral()
}

dependencies {
    // ✅ Spring Web API
    implementation("org.springframework.boot:spring-boot-starter-web")

    // ✅ Spring Security + JWT
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("io.jsonwebtoken:jjwt-api:0.11.5")
    runtimeOnly("io.jsonwebtoken:jjwt-impl:0.11.5")
    runtimeOnly("io.jsonwebtoken:jjwt-jackson:0.11.5")

    // ✅ OAuth2 로그인
    implementation("org.springframework.boot:spring-boot-starter-oauth2-client")

    // ✅ JPA + QueryDSL
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("com.querydsl:querydsl-jpa:5.0.0:jakarta")
    kapt("com.querydsl:querydsl-apt:5.0.0:jakarta")

    // ✅ Redis
    implementation("org.springframework.boot:spring-boot-starter-data-redis")

    // ✅ Swagger
    implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.2.0")

    // ✅ AWS S3
    implementation("software.amazon.awssdk:s3:2.25.22")

    // ✅ Elasticsearch
    implementation("co.elastic.clients:elasticsearch-java:8.12.0")

    // ✅ 배치 + 스케줄링
    implementation("org.springframework.boot:spring-boot-starter-batch")
    implementation("net.javacrumbs.shedlock:shedlock-spring:5.7.0")
    implementation("net.javacrumbs.shedlock:shedlock-provider-jdbc-template:5.7.0")

    // ✅ HTML 파서
    implementation("org.jsoup:jsoup:1.17.1")

    // ✅ Jackson Kotlin
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")

    // ✅ Guava 유틸
    implementation("com.google.guava:guava:32.1.3-jre")

    // ✅ 암호화
    implementation("commons-codec:commons-codec:1.16.1")
    implementation("org.bouncycastle:bcprov-jdk18on:1.77")

    // ✅ Lombok (Java, Kotlin 혼합 환경)
    compileOnly("org.projectlombok:lombok:1.18.30")
    annotationProcessor("org.projectlombok:lombok:1.18.30")
    kapt("org.projectlombok:lombok:1.18.30")

    // ✅ 테스트
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.mockito:mockito-core:5.11.0")
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit5")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")

    // ✅ MySQL JDBC 드라이버 추가
    runtimeOnly("mysql:mysql-connector-java:8.0.33")
}

// ✅ QueryDSL 소스 경로 지정
sourceSets["main"].java.srcDir("build/generated/source/kapt/main")

// ✅ KAPT 설정
kapt {
    correctErrorTypes = true
}

// ✅ 실행 클래스 설정
val mainClassName = "com.jibangyoung.JibangyoungApplication"

tasks.named<org.springframework.boot.gradle.tasks.bundling.BootJar>("bootJar") {
    mainClass.set(mainClassName)
}
application {
    mainClass.set(mainClassName)
}

// ✅ 테스트 설정
tasks.test {
    useJUnitPlatform()
}

// ✅ Java 컴파일 설정
tasks.withType<JavaCompile> {
    options.encoding = "UTF-8"
}

// ✅ Kotlin 컴파일 설정
tasks.withType<KotlinCompile> {
    kotlinOptions {
        jvmTarget = "17"
        freeCompilerArgs = listOf("-Xjsr305=strict")
    }
}