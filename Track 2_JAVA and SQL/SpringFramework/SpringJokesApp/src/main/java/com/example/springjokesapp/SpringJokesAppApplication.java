package com.example.springjokesapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class SpringJokesAppApplication {

    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(SpringJokesAppApplication.class, args);
    }

}
