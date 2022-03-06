package com.nooobcoder.springtwotelusko;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

// A POJO class
@Component
@Scope(value = "prototype")
public class Alien {
    private int aid;
    private String aname;
    private String tech;
    @Autowired
    @Qualifier("laptop")
    private Laptop laptop;

    public Laptop getLaptop() {
        return laptop;
    }

    public void setLaptop(Laptop laptop) {
        this.laptop = laptop;
    }

    public Alien() {
        System.out.println("Object Created");
    }

    public int getAid() {
        return aid;
    }

    public void setAid(int aid) {
        this.aid = aid;
    }

    public String getAname() {
        return aname;
    }

    public void setAname(String aname) {
        this.aname = aname;
    }

    public String getTech() {
        return tech;
    }

    public void setTech(String tech) {
        this.tech = tech;
    }

    public void show() {
        System.out.println("In show");
        laptop.compile();
    }
}
