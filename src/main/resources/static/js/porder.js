/**
 * 作者: lwh
 * 时间: 2020.7.19
 * 描述: 打印订单信息
 */
$(document).ready(function () {
    getOrderInfo();
});

/**
 * 作者: lwh
 * 时间: 2020.7.19
 * 描述: 获取订单信息
 */
function getOrderInfo() {
    let oid = window.sessionStorage.getItem("oid");

    let jsonStr = JSON.stringify({
        oid: oid
    });

    $.ajax({
        url: "getShopInfo",
        type: "get",
        async: false,
        dataType: "json",
        success: function (data) {
            $("#order-title").text(data[0]);
            $("#order-foot-address").text("地址：" + data[1]);
            $("#order-foot-phone").text("电话：" + data[2] + "、" + data[3]);
        },
        error: function (error) {
            alert("----ajax请求加载店铺信息出错！错误信息如下：----\n" + error.responseText);
        }
    });

    $.ajax({
        url: "getOrderByOid",
        type: "post",
        data: jsonStr,
        contentType: "application/json;charset=utf-8",
        async: true,
        dataType: "json",
        success: function (data) {
            buildOrder(data);
        },
        error: function (error) {
            alert("----ajax请求指定编号订单出错！错误信息如下：----\n" + error.responseText);
        }
    });
}

/**
 * 作者: lwh
 * 时间: 2020.7.19
 * 描述: 创建订单样式
 */
function buildOrder(orderInfo) {
    if (isLoaded("order-detail-tbody")) {
        $("#order-detail-tbody").remove();
    }

    let html = "<tbody id='order-detail-tbody'>";

    let clist = orderInfo.clist.split("_");
    let plist = orderInfo.plist.split("_");

    $.each(clist, function (key, value) {
        let no = key + 1;
        let p = plist[key].replace(" ", "");

        let equalArr = p.split("=");
        let left = equalArr[0];
        let right = equalArr[1];
        right = right.replace("（", "").replace("）", "");

        let leftArr = left.split("*");
        let rightArr = right.split("-");

        let oprice = leftArr[0];
        let discount = leftArr[1];
        let num = leftArr[2];
        let lprice = rightArr[0];
        let dprice = rightArr[1];

        html += "<tr> " +
            "<td>" + no + "</td>" +
            "<td>" + value + "</td>" +
            "<td>" + num + "</td>" +
            "<td>" + oprice + "</td>" +
            "<td>" + discount + "</td>" +
            "<td>" + lprice + "</td>" +
            "<td>" + "-" + dprice + "</td>" +
            "</tr>";
    });

    html += "<tr>" +
        "<td>" + "优惠：" + "</td>" +
        "<td colspan='6'>-" + orderInfo.tdisprice + "元" + "</td>" +
        "</tr>" +
        "<tr>" +
        "<td>" + "合计：" + "</td>" +
        "<td colspan='6'>" + orderInfo.tprice + "元" + "</td>" +
        "</tr>";

    $("#order-id").text("订单编号：" + orderInfo.oid);
    $("#order-time").text("时间：" + timestampToTime(orderInfo.time, 0));
    $("#order-detail-table").append(html);

    window.print();
}