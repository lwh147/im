package com.im.entity;

/**
 * @ClassName order
 * @Description 订单实体类
 * @Author lwh
 * @Date 2020/7/12 17:04
 * @Version 1.0
 **/
public class Order {
    private String oid;
    private String time;
    private String clist;
    private String plist;
    private String mark;
    private float tprice;
    private float tdisprice;
    private float income;

    public String getOid() {
        return oid;
    }

    public void setOid(String oid) {
        this.oid = oid;
    }

    public String getClist() {
        return clist;
    }

    public void setClist(String clist) {
        this.clist = clist;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getPlist() {
        return plist;
    }

    public void setPlist(String plist) {
        this.plist = plist;
    }

    public String getMark() {
        return mark;
    }

    public void setMark(String mark) {
        this.mark = mark;
    }

    public float getTprice() {
        return tprice;
    }

    public void setTprice(float tprice) {
        this.tprice = tprice;
    }

    public float getTdisprice() {
        return tdisprice;
    }

    public void setTdisprice(float tdisprice) {
        this.tdisprice = tdisprice;
    }

    public float getIncome() {
        return income;
    }

    public void setIncome(float income) {
        this.income = income;
    }
}
