package org.nooobcoder;

import org.springframework.stereotype.Component;

@Component
public class Car implements Vehicle {
    public void drive() {
        System.out.println("Gari chal rahi hai!");
    }
}
