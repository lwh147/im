package com.im.entity;

/**
 * @ClassName commodity
 * @Description 商品实体类
 * @Author lwh
 * @Date 2020/7/12 17:01
 * @Version 1.0
 **/
public class Commodity {
    private String cid;
    private String brand;
    private String name;
    private String model;
    private String standard;
    private int stock;
    private float oprice;
    private float iprice;

    public String getCid() {
        return cid;
    }

    public void setCid(String cid) {
        this.cid = cid;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getStandard() {
        return standard;
    }

    public void setStandard(String standard) {
        this.standard = standard;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public float getOprice() {
        return oprice;
    }

    public void setOprice(float oprice) {
        this.oprice = oprice;
    }

    public float getIprice() {
        return iprice;
    }

    public void setIprice(float iprice) {
        this.iprice = iprice;
    }
}
