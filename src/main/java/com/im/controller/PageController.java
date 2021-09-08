package com.im.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @ClassName test
 * @Description 页面请求处理
 * @Author lwh
 * @Date 2020/7/13 17:04
 * @Version 1.0
 **/
@Controller
public class PageController {
    @RequestMapping("/")
    public String root() {
        return "login";
    }

    @RequestMapping("/index")
    public String index() {
        return "index";
    }

    @RequestMapping("/login")
    public String login() {
        return "login";
    }

    @RequestMapping("/index_navbar")
    public String index_navbar() {
        return "index_navbar";
    }

    @RequestMapping("/index_foot")
    public String index_foot() {
        return "index_foot";
    }

    @RequestMapping("/index_body_add")
    public String index_body_add() {
        return "index_body_add";
    }

    @RequestMapping("/index_body_order")
    public String index_body_order() {
        return "index_body_order";
    }

    @RequestMapping("/index_body_stock")
    public String index_body_stock() {
        return "index_body_stock";
    }

    @RequestMapping("/index_body_cart")
    public String index_body_cart() {
        return "index_body_cart";
    }

    @RequestMapping("/porder")
    public String porder() {
        return "porder";
    }
}
