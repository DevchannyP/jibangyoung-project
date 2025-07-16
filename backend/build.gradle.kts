plugins {
    id("java")
    id("application")
    id("org.springframework.boot") version "3.2.4"
    id("io.spring.dependency-management") version "1.1.4"
}

group = "com.jibangyoung"
version = "1.0.0"

java {
    toolchain {
        languageVersion.set(JavaLanguageVersion.of(17))
    }
}

repositories {
    mavenCentral()
}

dependencies {
    // ✅ Spring Web + Security
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-security")

    // ✅ JWT
    implementation("io.jsonwebtoken:jjwt-api:0.11.5")
    runtimeOnly("io.jsonwebtoken:jjwt-impl:0.11.5")
    runtimeOnly("io.jsonwebtoken:jjwt-jackson:0.11.5")

    // ✅ OAuth2
    implementation("org.springframework.boot:spring-boot-starter-oauth2-client")

    // ✅ JPA + QueryDSL
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    // QueryDSL 5.0.0 for Jakarta EE 9+ requires jakarta.persistence-api 3.x
    // Spring Boot 3.x already uses Jakarta EE, so this is generally compatible.
    implementation("com.querydsl:querydsl-jpa:5.0.0:jakarta")
    annotationProcessor("com.querydsl:querydsl-apt:5.0.0:jakarta")
    // Note: querydsl-apt for jakarta automatically pulls in jakarta.persistence-api,
    // so explicit declaration of jakarta.persistence-api might be redundant or conflict.
    // Let's remove the redundant one below.

    // ✅ Redis, Swagger, AWS, Elasticsearch 등
    implementation("org.springframework.boot:spring-boot-starter-data-redis")
    implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.2.0")
    implementation("software.amazon.awssdk:s3:2.25.22")
    implementation("co.elastic.clients:elasticsearch-java:8.12.0")

    // ✅ Batch + Scheduler
    implementation("org.springframework.boot:spring-boot-starter-batch")
    implementation("net.javacrumbs.shedlock:shedlock-spring:5.7.0")
    implementation("net.javacrumbs.shedlock:shedlock-provider-jdbc-template:5.7.0")

    // ✅ 기타 유틸
    implementation("org.jsoup:jsoup:1.17.1")
    implementation("com.google.guava:guava:32.1.3-jre")
    implementation("commons-codec:commons-codec:1.16.1")
    implementation("org.bouncycastle:bcprov-jdk18on:1.77")

    // ✅ Lombok (Java)
    compileOnly("org.projectlombok:lombok:1.18.30")
    annotationProcessor("org.projectlombok:lombok:1.18.30")
    // Lombok for QueryDSL Q-class generation (IMPORTANT!)
    annotationProcessor("com.querydsl:querydsl-apt:5.0.0:jakarta:jpa") // Ensure JPA APT is applied with Lombok's APT

    // ✅ MySQL
    runtimeOnly("mysql:mysql-connector-java:8.0.33")

    // ✅ Test
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.mockito:mockito-core:5.11.0")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")

    // ✅ JPA Entity 어노테이션 오류 방지 (컴파일러 인식용 추가)
    // 이 부분은 querydsl-apt:5.0.0:jakarta 에 의해 이미 제공될 가능성이 높습니다.
    // Spring Boot 3.x 자체가 Jakarta EE 기반이므로, 대부분의 경우 명시적으로 추가할 필요가 없습니다.
    // 만약 컴파일 오류가 발생하면 다시 추가를 고려하세요.
    // compileOnly("jakarta.persistence:jakarta.persistence-api:3.1.0")
    // annotationProcessor("jakarta.persistence:jakarta.persistence-api:3.1.0")
}

// ✅ QueryDSL 소스 경로 (Kotlin DSL에서는 safer way)
// 기존 방식도 작동하지만, 더 명시적인 접근 방식을 선호합니다.
// generatedSourcesDir는 Kotlin DSL에서 일반적으로 사용되는 속성입니다.
tasks.withType<JavaCompile> {
    options.generatedSourceOutputDirectory.set(
        file("build/generated/source/annotationProcessor/java/main")
    )
}

// ✅ 메인 클래스 설정 (더 간결하고 명확하게)
val mainClassFqcn = "com.jibangyoung.JibangyoungApplication"

application {
    mainClass.set(mainClassFqcn)
}

// Spring Boot 3.x에서는 bootJar 태스크의 mainClass는 application 플러그의 mainClass를 따릅니다.
// 특별한 경우가 아니면 굳이 다시 설정할 필요는 없습니다.
// tasks.named<org.springframework.boot.gradle.tasks.bundling.BootJar>("bootJar") {
//     mainClass.set(mainClassFqcn)
// }

// ✅ Java 컴파일 설정
tasks.withType<JavaCompile> {
    options.encoding = "UTF-8"
    options.compilerArgs.addAll(listOf("-parameters"))
}

// ✅ 테스트 플랫폼 설정
tasks.test {
    useJUnitPlatform()
}