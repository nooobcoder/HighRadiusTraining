package com.nooobcoder;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfigProvider {
    @Bean
    public Samsung getPhone() {
        return new Samsung();
    }

    @Bean
    public MobileProcessor getProcessor(){
        return new Snapdragon();
    }
}
