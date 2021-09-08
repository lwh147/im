package com.im.service;

import com.im.entity.Order;
import com.im.mapper.OrderMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @ClassName OrderService
 * @Description 订单类服务
 * @Author lwh
 * @Date 2020/7/15 14:23
 * @Version 1.0
 **/
@Service
public class OrderService {
    @Resource
    private OrderMapper orderMapper;
    private List<Order> olist;
    private boolean first = true;

    public List<Order> getOrder() {
        if (first) {
            freshOlist();
            first = false;
        }
        return olist;
    }

    public void freshOlist() {
        olist = orderMapper.getOrder();
    }

    public List<Order> getOrderByKeywords(String keywords) {
        return orderMapper.getOrderByKeywords(keywords);
    }

    public Order getOrderByOid(String oid) {
        return orderMapper.getOrderByOid(oid);
    }

    public List<Order> getOrderByDay(String time) {
        String adayString = "86400000";

        BigInteger adayInt = new BigInteger(adayString);
        BigInteger thatdayInt = new BigInteger(time);

        List<Order> resultList = new ArrayList<>();

        for (Order o : olist) {
            BigInteger orderdayInt = new BigInteger(o.getTime());
            BigInteger result = orderdayInt.subtract(thatdayInt);

            //大于零点
            if (result.compareTo(BigInteger.ZERO) >= 0)
                //小于24小时
                if (result.compareTo(adayInt) <= 0)
                    resultList.add(o);
        }

        return resultList;
    }

    public List<Order> getOrderByWeek() {
        String aweekString = "604800000";

        BigInteger aweekInt = new BigInteger(aweekString);
        BigInteger todayInt = new BigInteger(String.valueOf(new Date().getTime()));

        return countDifference(todayInt, aweekInt);
    }

    public List<Order> getOrderByMonth() {
        String amonthString = "2592000000";

        BigInteger amonthInt = new BigInteger(amonthString);
        BigInteger todayInt = new BigInteger(String.valueOf(new Date().getTime()));

        return countDifference(todayInt, amonthInt);
    }

    public List<Order> getOrderByYear() {
        String yearString = "31536000000";

        BigInteger yearInt = new BigInteger(yearString);
        BigInteger todayInt = new BigInteger(String.valueOf(new Date().getTime()));

        return countDifference(todayInt, yearInt);
    }

    public List<Order> countDifference(BigInteger a, BigInteger b) {
        List<Order> resultList = new ArrayList<>();

        for (Order o : olist) {
            BigInteger orderdayInt = new BigInteger(o.getTime());
            BigInteger result = orderdayInt.subtract(a);

            //过去的时间减去现在结果为负，但是绝对值小于指定时间跨度
            if (result.abs().compareTo(b) <= 0)
                resultList.add(o);
        }

        return resultList;
    }

    public void insertOrder(String oid, String time, String clist, String plist, String mark, float tprice, float tdisprice, float income) {
        orderMapper.insertOrder(oid, time, clist, plist, mark, tprice, tdisprice, income);
        freshOlist();
    }
}
