package com.nooobcoder;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class App {
    public static void main(String[] args) {
        ApplicationContext applicationContext = new AnnotationConfigApplicationContext(AppConfigProvider.class);
        Samsung s7 = applicationContext.getBean(Samsung.class);
        s7.config();

    }
}
