package com.im.service;

import com.im.entity.Commodity;
import com.im.mapper.CommodityMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @ClassName CommodityService
 * @Description 商品类服务
 * @Author lwh
 * @Date 2020/7/15 14:23
 * @Version 1.0
 **/
@Service
public class CommodityService {
    @Resource
    private CommodityMapper commodityMapper;
    private List<Commodity> clist;
    private boolean first = true;

    public List<Commodity> getAllCommodities() {
        if (first) {
            freshClist();
            first = false;
        }
        return clist;
    }

    public void addNewCommocity(Commodity c) {
        commodityMapper.addNewCommodity(c.getCid(), c.getBrand(), c.getName(), c.getModel(), c.getStandard(), c.getStock(), c.getIprice(), c.getOprice());
        freshClist();
    }

    public void deleteCommodity(String cid) {
        commodityMapper.deleteCommodityByID(cid);
        freshClist();
    }

    public List<Commodity> getCommodityByAll(String brand, String name, String model, String standard) {
        return commodityMapper.getCommodityByAll(brand, name, model, standard);
    }

    public List<Commodity> getCommodityByBrandNameModel(String brand, String name, String model) {
        return commodityMapper.getCommodityByBrandNameModel(brand, name, model);
    }

    public List<Commodity> getCommodityByBrandName(String brand, String name) {
        return commodityMapper.getCommodityByBrandName(brand, name);
    }

    public List<Commodity> getCommodityByBrand(String brand) {
        return commodityMapper.getCommodityByBrand(brand);
    }

    public List<Commodity> getCommodityByName(String name) {
        return commodityMapper.getCommodityByName(name);
    }

    public void updateCinfo(Commodity c) {
        commodityMapper.updateCommodityInfo(c.getCid(), c.getBrand(), c.getName(), c.getModel(), c.getStandard(), c
                .getStock(), c.getOprice(), c.getIprice());
        freshClist();
    }

    public void freshClist() {
        clist = commodityMapper.getAllCommodities();
    }

}
