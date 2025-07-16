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
    implementation("com.querydsl:querydsl-jpa:5.0.0:jakarta")
    annotationProcessor("com.querydsl:querydsl-apt:5.0.0:jakarta")

    // ✅ JPA Entity 오류 방지용
    implementation("jakarta.persistence:jakarta.persistence-api:3.1.0")

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

    // ✅ MySQL
    runtimeOnly("mysql:mysql-connector-java:8.0.33")

    // ✅ Test
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.mockito:mockito-core:5.11.0")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")



    // ✅ JPA Entity 어노테이션 오류 방지 (컴파일러 인식용 추가)
    compileOnly("jakarta.persistence:jakarta.persistence-api:3.1.0")
    annotationProcessor("jakarta.persistence:jakarta.persistence-api:3.1.0")
}

// ✅ QueryDSL 소스 경로
sourceSets["main"].java.srcDir("build/generated/source/annotationProcessor/java/main")

// ✅ 메인 클래스 설정
val mainClassFqcn = "com.jibangyoung.JibangyoungApplication"

application {
    mainClass.set(mainClassFqcn)
}

tasks.named<org.springframework.boot.gradle.tasks.bundling.BootJar>("bootJar") {
    mainClass.set(mainClassFqcn)
}

// ✅ Java 컴파일 설정
tasks.withType<JavaCompile> {
    options.encoding = "UTF-8"
    options.compilerArgs.addAll(listOf("-parameters"))
}

// ✅ 테스트 플랫폼 설정
tasks.test {
    useJUnitPlatform()
}
