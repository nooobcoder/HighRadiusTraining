package com.example.springframeworkdi.services;

import org.springframework.stereotype.Service;

@Service
public class PropertyInjectedGreetingService implements  GreetingService{
    @Override
    public String sayGreeting() {
        return "Hello World - Property";
    }
}
