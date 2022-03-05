package org.nooobcoder;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class App {
    public static void main(String[] args) {
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("ApplicationContext.xml");
        /*Vehicle obj = (Vehicle) applicationContext.getBean("bike");
        obj.drive();*/

        /*Tyre tyre = (Tyre) applicationContext.getBean("tyre");
        System.out.println(tyre);*/

        Vehicle obj = (Car) applicationContext.getBean("car");
        obj.drive();
    }
}
