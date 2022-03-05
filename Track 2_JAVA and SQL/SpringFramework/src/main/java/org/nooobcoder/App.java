package org.nooobcoder;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class App {
    public static void main(String[] args) {
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("ApplicationContext.xml");
        Vehicle obj = (Vehicle) applicationContext.getBean("vehicle");
        obj.drive();

    }
}
