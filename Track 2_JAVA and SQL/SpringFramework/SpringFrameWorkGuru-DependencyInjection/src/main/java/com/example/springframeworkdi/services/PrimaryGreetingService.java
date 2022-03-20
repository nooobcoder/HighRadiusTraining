package com.example.springframeworkdi.services;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

@Primary // When in confusion, this anno wires up this service as the default/primary.
@Service
public class PrimaryGreetingService implements GreetingService {
    @Override
    public String sayGreeting() {
        return "Hello World - Primary Bean";
    }
}
