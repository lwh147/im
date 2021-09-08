//全局变量
//存储购物车信息
let clist = [];
//存储系统各组件的组件名称、组件id和组件请求url,并且默认该组件初始化函数为url+“_init()”
let systemComponents = {
    c0: {
        cname: "导航栏",           //组件名称
        cid: "index-navbar",       //组件id
        curl: "index_navbar",       //组件请求url
        cinit: "index_navbar_init()"  //组件初始化函数
    },
    c1: {
        cname: "页脚",
        cid: "index-foot",
        curl: "index_foot",
        cinit: ""
    },
    c2: {
        cname: "库存管理",
        cid: "index-body-stock",
        curl: "index_body_stock",
        cinit: "index_body_stock_init()"
    },
    c3: {
        cname: "销售记录",
        cid: "index-body-order",
        curl: "index_body_order",
        cinit: "index_body_order_init()"
    },
    c4: {
        cname: "商品入库",
        cid: "index-body-add",
        curl: "index_body_add",
        cinit: "index_body_add_init()"
    },
    c5: {
        cname: "购物车",
        cid: "index-body-cart",
        curl: "index_body_cart",
        cinit: "index_body_cart_init()"
    }
};
//记录当前用户处于的界面便于刷新
let currentComponent = 2;

/**
 * 作者: lwh
 * 时间: 2020.4.10
 * 描述: 管理系统主页初始化js
 */
$(document).ready(function () {
    //判断是否存在登录用户
    isLogged();

    //初始化全局变量
    getGlobalVars();

    //加载导航栏和页脚以及网页主体
    loadNavAndFoot();
});

/**
 * 作者: lwh
 * 时间: 2020.4.14
 * 描述: 判断是否存在登录用户
 */
function isLogged() {
    $.ajax({
        url: "isLogged",
        type: "get",
        async: false,
        dataType: "json",
        success: function (data) {
            if (data === "0")
                logout();
        },
        error: function (error) {
            alert("----ajax请求验证是否存在登录用户执行出错！错误信息如下：----\n" + error.responseText);
        }
    });
}

/**
 * 作者: lwh
 * 时间: 2020.4.13
 * 描述: 获取刷新网页前的操作信息
 */
function getGlobalVars() {
    //获取网页加载前进行的操作
    let cno = window.sessionStorage.getItem("cno");
    //如果为空加载首页，如果不为空说明刷新网页前处于非首页状态
    if (cno !== null)
        currentComponent = cno;
}

/**
 * 作者: lwh
 * 时间: 2020.7.8
 * 描述: 加载导航栏和页脚以及网页主体
 */
function loadNavAndFoot() {
    //加载导航栏
    loadSingleComponent(systemComponents.c0, "#index-navbar-container");
    //加载页脚
    loadSingleComponent(systemComponents.c1, "#index-foot-container");
    //加载当前正在访问的内容
    loadBody();
}

/**
 * 作者: lwh
 * 时间: 2020.7.8
 * 描述: 加载网页主体
 */
function loadBody() {
    let tabs = $("#index-navbar ul > li > a");
    $.each(tabs, function (key, value) {
        //触发对用组件的功能标签的点击事件便会重新加载用户刷新页面之前的组件
        if ($(value).text().replace(/\s/g, "") === eval("systemComponents.c" + currentComponent + ".cname")) {
            $(value).trigger("click");
        }
    });
}

/**
 * 作者: lwh
 * 时间: 2020.7.8
 * 描述: 登出
 */
function logout() {
    $(window).attr("location", "/im");
}