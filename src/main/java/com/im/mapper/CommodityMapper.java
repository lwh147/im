package com.im.mapper;

import com.im.entity.Commodity;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @InterfaceName commodityDao
 * @Description 商品表操作接口
 * @Author lwh
 * @Date 2020/7/12 17:09
 * @Version 1.0
 **/
@Repository
public interface CommodityMapper {
    //增
    public void addNewCommodity(String cid, String brand, String name, String model, String standard, int stock, float iprice, float oprice);

    //删
    public void deleteCommodityByID(String cid);

    //查
    public List<Commodity> getAllCommodities();

    public List<Commodity> getCommodityByAll(String brand, String name, String model, String standard);

    public List<Commodity> getCommodityByBrandNameModel(String brand, String name, String model);

    public List<Commodity> getCommodityByBrandName(String brand, String name);

    public List<Commodity> getCommodityByBrand(String brand);

    public List<Commodity> getCommodityByName(String name);

    //改
    public void updateCommodityInfo(String cid, String newbrand, String newname, String newmodel, String newstandard, int newstock, float newoprice, float newiprice);
}
