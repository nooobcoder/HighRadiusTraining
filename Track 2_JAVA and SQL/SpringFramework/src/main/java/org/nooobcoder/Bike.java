package org.nooobcoder;

import org.springframework.stereotype.Component;

@Component
public class Bike implements Vehicle {
    public void drive() {
        System.out.println("Bike ki sawari sawar hai");
    }
}
