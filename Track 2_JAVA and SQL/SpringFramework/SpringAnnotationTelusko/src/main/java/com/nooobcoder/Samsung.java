package com.nooobcoder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

// Default: non qualified, de-capitalised is the bean name. Eg, samsung
@Component
public class Samsung {
    @Autowired
    @Qualifier("mediaTek") // Specifying which class to be used by the interface
    MobileProcessor cpu;

    public MobileProcessor getCpu() {
        return cpu;
    }

    public void setCpu(MobileProcessor cpu) {
        this.cpu = cpu;
    }

    public void config() {
        System.out.println("Octa Core, 4GB Ram, 12MP Camera");
        cpu.process();
    }
}
