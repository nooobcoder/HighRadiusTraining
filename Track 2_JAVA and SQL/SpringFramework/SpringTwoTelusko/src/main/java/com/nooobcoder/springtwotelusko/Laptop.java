package com.nooobcoder.springtwotelusko;

import org.springframework.stereotype.Component;

@Component("laptop")
public class Laptop {
    private int lid;
    private String brand;

    @Override
    public String toString() {
        return "Laptop{" +
                "lid=" + lid +
                ", brand='" + brand + '\'' +
                '}';
    }

    public void compile() {
        System.out.println("Compiling.....");
    }

    public int getLid() {
        return lid;
    }

    public void setLid(int lid) {
        this.lid = lid;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }
}
