package com.nooobcoder;

import org.springframework.stereotype.Component;

@Component
public class MediaTek implements MobileProcessor {
    @Override
    public void process() {
        System.out.println("2nd Best CPU in the world");
    }
}
