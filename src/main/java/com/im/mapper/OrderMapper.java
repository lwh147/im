package com.im.mapper;

import com.im.entity.Order;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @InterfaceName orderDao
 * @Description 订单表操作接口
 * @Author lwh
 * @Date 2020/7/12 17:09
 * @Version 1.0
 **/
@Repository
public interface OrderMapper {
    //查
    public List<Order> getOrder();

    public Order getOrderByOid(String oid);

    public List<Order> getOrderByKeywords(String keywords);

    //增
    public void insertOrder(String oid, String time, String clist, String plist, String mark, float tprice, float tdisprice, float income);
}
