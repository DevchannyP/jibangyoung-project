package com.jibangyoung;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class JibangyoungApplication {
    public static void main(String[] args) {
        SpringApplication.run(JibangyoungApplication.class, args);
    }
}
