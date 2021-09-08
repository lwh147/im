package com.im.entity;

/**
 * @ClassName outrecord
 * @Description 出库记录实体类
 * @Author lwh
 * @Date 2020/7/12 17:06
 * @Version 1.0
 **/
public class Outrecord {
    private int id;
    private String time;
    private String cid;
    private int num;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCid() {
        return cid;
    }

    public void setCid(String cid) {
        this.cid = cid;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }
}
