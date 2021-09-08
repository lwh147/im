/**
 * 作者: lwh
 * 时间: 2020.7.16
 * 描述: 销售记录页面初始化
 */
function index_body_order_init() {
    //监听事件注册
    registeListener();
}

/**
 * 作者: lwh
 * 时间: 2020.7.16
 * 描述: 注册监听器
 */
function registeListener() {
    getAllOrders();
    getOrderByOid();
    getOrderByKeywords();
    getOrderByDay();
    getOrderByWeek();
    getOrderByMonth();
    getOrderByYear();
}

/**
 * 作者: lwh
 * 时间: 2020.7.16
 * 描述: 根据编号加载订单
 */
function getOrderByOid() {
    //监听器注册
    $("form#getOrderByInfo button:eq(0)").on("click", function () {
        listener();
    });

    //监听器定义
    function listener() {
        let oid = $("#oidInput").val();

        if (oid === "") {
            alert("请输入编号进行查询");
            $("#oidInput").focus();
            return;
        }

        let jsonStr = JSON.stringify({
            oid: oid
        });

        $.ajax({
            url: "getOrderByOid",
            type: "post",
            data: jsonStr,
            contentType: "application/json;charset=utf-8",
            async: true,
            dataType: "json",
            success: function (data) {
                showOrders(data);
            },
            error: function (error) {
                alert("----ajax请求指定编号订单出错！错误信息如下：----\n" + error.responseText);
            }
        });
    }
}

/**
 * 作者: lwh
 * 时间: 2020.7.16
 * 描述: 根据关键字
 */
function getOrderByKeywords() {
    //监听器注册
    $("form#getOrderByInfo button:eq(1)").on("click", function () {
        listener();
    });

    //监听器定义
    function listener() {
        let keywords = $("#keywordsInput").val();

        if (keywords === "") {
            alert("请输入关键字进行查询");
            $("#keywordsInput").focus();
            return;
        }

        let jsonStr = JSON.stringify({
            keywords: keywords
        });

        $.ajax({
            url: "getOrderByKeywords",
            type: "post",
            data: jsonStr,
            contentType: "application/json;charset=utf-8",
            async: true,
            dataType: "json",
            success: function (data) {
                showOrders(data);
            },
            error: function (error) {
                alert("----ajax请求包含关键字订单出错！错误信息如下：----\n" + error.responseText);
            }
        });
    }
}

/**
 * 作者: lwh
 * 时间: 2020.7.16
 * 描述: 根据天
 */
function getOrderByDay() {
    //监听器注册
    $("form#getOrderByTime button:eq(0)").on("click", function () {
        listener();
    });

    //监听器定义
    function listener() {
        let time = $("#timeInput").val();

        if (time === "") {
            alert("请选择日期进行查询");
            $("#timeInput").focus();
            return;
        }

        let date = new Date(time);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);

        let timestamp = date.getTime();

        let jsonStr = JSON.stringify({
            time: timestamp
        });

        $.ajax({
            url: "getOrderByDay",
            type: "post",
            data: jsonStr,
            contentType: "application/json;charset=utf-8",
            async: true,
            dataType: "json",
            success: function (data) {
                showOrders(data);
            },
            error: function (error) {
                alert("----ajax请求指定某天的订单出错！错误信息如下：----\n" + error.responseText);
            }
        });
    }
}

/**
 * 作者: lwh
 * 时间: 2020.7.16
 * 描述: 根据周
 */
function getOrderByWeek() {
    //监听器注册
    $("form#getOrderByTime button:eq(1)").on("click", function () {
        listener();
    });

    //监听器定义
    function listener() {
        $.ajax({
            url: "getOrderByWeek",
            type: "get",
            async: true,
            dataType: "json",
            success: function (data) {
                showOrders(data);
            },
            error: function (error) {
                alert("----ajax请求最近一周的订单出错！错误信息如下：----\n" + error.responseText);
            }
        });
    }
}

/**
 * 作者: lwh
 * 时间: 2020.7.16
 * 描述: 根据月
 */
function getOrderByMonth() {
    //监听器注册
    $("form#getOrderByTime button:eq(2)").on("click", function () {
        listener();
    });

    //监听器定义
    function listener() {
        $.ajax({
            url: "getOrderByMonth",
            type: "get",
            async: true,
            dataType: "json",
            success: function (data) {
                showOrders(data);
            },
            error: function (error) {
                alert("----ajax请求最近一月的订单出错！错误信息如下：----\n" + error.responseText);
            }
        });
    }
}

/**
 * 作者: lwh
 * 时间: 2020.7.19
 * 描述: 根据年加载订单
 */
function getOrderByYear() {
    //监听器注册
    $("form#getOrderByTime button:eq(3)").on("click", function () {
        listener();
    });

    //监听器定义
    function listener() {
        $.ajax({
            url: "getOrderByYear",
            type: "get",
            async: true,
            dataType: "json",
            success: function (data) {
                showOrders(data);
            },
            error: function (error) {
                alert("----ajax请本年订单出错！错误信息如下：----\n" + error.responseText);
            }
        });
    }
}

/**
 * 作者: lwh
 * 时间: 2020.7.16
 * 描述: 加载所有订单
 */
function getAllOrders() {
    listener();

    //监听器注册
    $("form#getOrderByTime button:eq(4)").on("click", function () {
        listener();
    });

    //监听器定义
    function listener() {
        $.ajax({
            url: "getAllOrders",
            type: "get",
            async: true,
            dataType: "json",
            success: function (data) {
                showOrders(data);
            },
            error: function (error) {
                alert("----ajax请求所有订单出错！错误信息如下：----\n" + error.responseText);
            }
        });
    }
}

/**
 * 作者: lwh
 * 时间: 2020.7.16
 * 描述: 根据提供数据显示表格
 */
function showOrders(data) {
    if (isLoaded("allOrders-tbody"))
        $("#allOrders-tbody").remove();

    let html = "<tbody id='allOrders-tbody'>";
    let tincome = 0;

    if (data instanceof Array) {
        $.each(data, function (key, value) {
            html += generateRow(value);
            tincome += parseFloat(value.income);
        });
    } else if (data instanceof Object) {
        html += generateRow(data);
        tincome += parseFloat(data.income);
    }

    $("#totalIncome").text("总收入：" + tincome.toFixed(2) + "元");

    if (html === "<tbody id='allOrders-tbody'>")
        $("#noOrderTip").show();
    else {
        $("#noOrderTip").hide();
        $("#allOrders-table").append(html);
    }

    function generateRow(rowdata) {
        let rowhtml = "";
        let clist = rowdata.clist.split("_");
        let plist = rowdata.plist.split("_");

        rowhtml += "<tr> " +
            "<td>" + rowdata.oid + "</td>" +
            "<td>" + timestampToTime(rowdata.time, 0) + "</td>" +
            "<td>" + "<ul>";

        $.each(clist, function (key, value) {
            rowhtml += "<li>" +
                "<dl>" +
                "<dt>" + value + "</dt>" +
                "<dd>" + "小计：" + plist[key] + "</dd>" +
                "</dl>" +
                "</li>";
        });

        rowhtml += "</ul>" + "</td>" +
            "<td>" + "-" + rowdata.tdisprice + "</td>" +
            "<td>" + rowdata.tprice + "</td>" +
            "<td>" + rowdata.income + "</td>" +
            "<td>" + rowdata.mark + "</td>" +
            "<td class='operation'>" +
            "<button type='button' class='btn btn-primary btn-sm' onclick='porder(this)'>打印</button>" +
            "</td>" +
            "</tr>";

        return rowhtml;
    }
}

/**
 * 作者: lwh
 * 时间: 2020.7.19
 * 描述: 打印订单
 */
function porder(instance) {
    let oid = $(instance).parent().parent().children("td:eq(0)").text();

    saveData2Ses({oid: oid});
    window.open("porder", "_blank");
}