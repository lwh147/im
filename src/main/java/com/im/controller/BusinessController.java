package com.im.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.im.entity.Commodity;
import com.im.service.CommodityService;
import com.im.service.OrderService;
import com.im.service.OutrecordService;
import org.springframework.util.ClassUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Objects;

/**
 * @ClassName BusinessController
 * @Description 业务请求处理
 * @Author lwh
 * @Date 2020/7/15 14:24
 * @Version 1.0
 **/
@RestController
public class BusinessController {
    @Resource
    private CommodityService commodityService;
    @Resource
    private OrderService orderService;
    @Resource
    private OutrecordService outrecordService;

    @RequestMapping("/adminValidate")
    public String adminValidate(@RequestBody String adminInfo, HttpSession session) throws Exception {
        String rootPath = Objects.requireNonNull(Objects.requireNonNull(ClassUtils.getDefaultClassLoader()).getResource("")).getPath();
        String filePath = rootPath + "static/src/Password.txt";
        String defaultAdminName = "";
        String defaultPassword = "";

        File file = new File(filePath);
        BufferedReader reader = null;

        try {
            reader = new BufferedReader(new FileReader(file));

            defaultAdminName = reader.readLine();
            defaultPassword = reader.readLine();

            reader.close();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e1) {
                    e1.printStackTrace();
                }
            }
        }

        JSONObject jsonObj = JSON.parseObject(adminInfo);

        String adminName = base64Decoder(jsonObj.getString("adminName"));
        String password = base64Decoder(jsonObj.getString("password"));

        if (defaultAdminName.equals(adminName) && defaultPassword.equals(password)) {
            session.setAttribute("logged", adminName);
            return adminInfo;
        }

        return JSON.toJSONString("0");
    }

    @RequestMapping("/isLogged")
    public String isLogged(HttpSession session) {
        if (session.getAttribute("logged") != null) {
            return JSON.toJSONString("1");
        }

        return JSON.toJSONString("0");
    }

    @RequestMapping("/purchase")
    public String purchase(@RequestBody String orderInfo) {
        JSONObject obj = JSON.parseObject(orderInfo);

        String oid = obj.getString("oid");
        String time = obj.getString("time");
        String mark = obj.getString("mark");
        String clist = "";
        String plist = "";
        float tprice = Float.parseFloat(obj.getString("tprice"));
        float tdisprice = Float.parseFloat(obj.getString("tdisprice"));
        float income = Float.parseFloat(obj.getString("income"));

        JSONArray carr = obj.getJSONArray("clist");

        String temp = insertOutRecord(carr, time);

        clist = temp.split("\\?")[0];
        plist = temp.split("\\?")[1];

        orderService.insertOrder(oid, time, clist, plist, mark, tprice, tdisprice, income);
        orderService.freshOlist();
        commodityService.freshClist();

        return JSON.toJSONString("1");
    }

    @RequestMapping("/getCommoditiesByAll")
    public String getCommoditiesByAll(@RequestBody String all) {
        JSONObject obj = JSON.parseObject(all);

        List<Commodity> clist = commodityService.getCommodityByAll(obj.getString("brand"), obj.getString("name"),
                obj.getString("model"), obj.getString("standard"));

        return JSON.toJSONString(clist);
    }

    @RequestMapping("/getAllCommodities")
    public String getAllCommodities() {
        return JSON.toJSONString(commodityService.getAllCommodities());
    }


    @RequestMapping("/getCommoditiesByBrandNameModel")
    public String getCommoditiesByBrandNameModel(@RequestBody String brandnamemodel) {
        JSONObject obj = JSON.parseObject(brandnamemodel);
        List<Commodity> clist = commodityService.getCommodityByBrandNameModel(obj.getString("brand"), obj.getString("name"), obj.getString("model"));
        return JSON.toJSONString(clist);
    }


    @RequestMapping("/getCommoditiesByBrandName")
    public String getCommoditiesByBrandName(@RequestBody String brandname) {
        JSONObject obj = JSON.parseObject(brandname);
        List<Commodity> clist = commodityService.getCommodityByBrandName(obj.getString("brand"), obj.getString("name"));
        return JSON.toJSONString(clist);
    }

    @RequestMapping("/getCommoditiesByBrand")
    public String getCommoditiesByBrand(@RequestBody String brand) {
        JSONObject obj = JSON.parseObject(brand);
        List<Commodity> clist = commodityService.getCommodityByBrand(obj.getString("brand"));
        return JSON.toJSONString(clist);
    }

    @RequestMapping("/getCommoditiesByName")
    public String getCommoditiesByName(@RequestBody String name) {
        JSONObject obj = JSON.parseObject(name);
        List<Commodity> clist = commodityService.getCommodityByName(obj.getString("name"));
        return JSON.toJSONString(clist);
    }

    @RequestMapping("/updateCinfo")
    public String updateCinfo(@RequestBody String newCinfo) {
        JSONObject obj = JSON.parseObject(newCinfo);
        Commodity c = new Commodity();

        c.setCid(obj.getString("cid"));
        c.setBrand(obj.getString("newbrand"));
        c.setName(obj.getString("newname"));
        c.setModel(obj.getString("newmodel"));
        c.setStandard(obj.getString("newstandard"));
        c.setStock(Integer.parseInt(obj.getString("newstock")));
        c.setOprice(Float.parseFloat(obj.getString("newoprice")));
        c.setIprice(Float.parseFloat(obj.getString("newiprice")));

        commodityService.updateCinfo(c);

        return JSON.toJSONString("1");
    }

    @RequestMapping("/deleteCommodity")
    public String deleteCommodity(@RequestBody String cid) {
        JSONObject obj = JSON.parseObject(cid);

        commodityService.deleteCommodity(obj.getString("cid"));

        return JSON.toJSONString("1");
    }

    @RequestMapping("/addCommodity")
    public String addCommodity(@RequestBody String cinfo) {
        JSONObject obj = JSON.parseObject(cinfo);
        Commodity c = new Commodity();

        c.setCid(obj.getString("cid"));

        if ("".equals(obj.getString("brand")))
            c.setBrand("/");
        else
            c.setBrand(obj.getString("brand"));

        c.setName(obj.getString("name"));

        if ("".equals(obj.getString("model")))
            c.setModel("/");
        else
            c.setModel(obj.getString("model"));

        if ("".equals(obj.getString("standard")))
            c.setStandard("/");
        else
            c.setStandard(obj.getString("standard"));

        c.setStock(Integer.parseInt(obj.getString("stock")));
        c.setIprice(Float.parseFloat(obj.getString("iprice")));
        c.setOprice(Float.parseFloat(obj.getString("oprice")));

        commodityService.addNewCommocity(c);

        return JSON.toJSONString("1");
    }

    @RequestMapping("/getAllOrders")
    public String getAllOrders() {
        return JSON.toJSONString(orderService.getOrder());
    }

    @RequestMapping("/getOrderByKeywords")
    public String getOrderByKeywords(@RequestBody String keywords) {
        JSONObject obj = JSON.parseObject(keywords);
        return JSON.toJSONString(orderService.getOrderByKeywords(obj.getString("keywords")));
    }

    @RequestMapping("/getOrderByOid")
    public String getOrderByOid(@RequestBody String oid) {
        JSONObject obj = JSON.parseObject(oid);
        return JSON.toJSONString(orderService.getOrderByOid(obj.getString("oid")));
    }

    @RequestMapping("/getOrderByDay")
    public String getOrderByDay(@RequestBody String time) {
        JSONObject obj = JSON.parseObject(time);
        return JSON.toJSONString(orderService.getOrderByDay(obj.getString("time")));
    }

    @RequestMapping("/getOrderByWeek")
    public String getOrderByWeek() {
        return JSON.toJSONString(orderService.getOrderByWeek());
    }

    @RequestMapping("/getOrderByMonth")
    public String getOrderByMonth() {
        return JSON.toJSONString(orderService.getOrderByMonth());
    }

    @RequestMapping("/getOrderByYear")
    public String getOrderByYear() {
        return JSON.toJSONString(orderService.getOrderByYear());
    }

    @RequestMapping("/getShopInfo")
    public String getShopInfo() {
        String rootPath = Objects.requireNonNull(Objects.requireNonNull(ClassUtils.getDefaultClassLoader()).getResource("")).getPath();
        String filePath = rootPath + "static/src/ShopInfo.txt";

        File file = new File(filePath);
        BufferedReader reader = null;
        List<String> slist = new ArrayList<>();

        try {
            reader = new BufferedReader(new FileReader(file));
            String tempStr;
            while ((tempStr = reader.readLine()) != null) {
                slist.add(tempStr);
            }
            reader.close();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e1) {
                    e1.printStackTrace();
                }
            }
        }

        return JSON.toJSONString(slist);
    }


    public String base64Decoder(String encodeString) throws IOException {
        return new String(Base64.getDecoder().decode(encodeString));
    }

    public String base64Encoder(String decodeString) {
        return Base64.getEncoder().encodeToString(decodeString.getBytes());
    }

    public String insertOutRecord(JSONArray carr, String time) {
        StringBuilder clistBuilder = new StringBuilder();
        StringBuilder plistBuilder = new StringBuilder();

        boolean flag = true;
        for (Object obj : carr) {
            JSONObject o = (JSONObject) obj;

            String cid = o.getString("cid");
            String brand = o.getString("brand");
            String name = o.getString("name");
            String model = o.getString("model");
            String standard = o.getString("standard");
            String oprice = o.getString("oprice");
            String discount = o.getString("discount");
            int num = o.getInteger("num");
            String lprice = o.getString("lprice");
            String dprice = o.getString("dprice");

            outrecordService.insertOurrecord(time, cid, num);

            String c = cid + "—" + brand + "—" + name + "—" + model + "—" + standard;
            String p = oprice + " * " + discount + " * " + num + " = " + lprice + "（-" + dprice + "）";

            if (flag) {
                clistBuilder.append(c);
                plistBuilder.append(p);
                flag = false;
            } else {
                clistBuilder.append("_").append(c);
                plistBuilder.append("_").append(p);
            }
        }
        return clistBuilder.toString() + "?" + plistBuilder.toString();
    }
}
