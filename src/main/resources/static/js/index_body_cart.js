//记录购物车合计价钱
let total = 0;
//记录购物车优惠价钱
let totaldiscount = 0;
//打折用下拉列表
let discountSelect =
    "<option value='1.00'>不打折</option>" +
    "<option value='0.95'>95折</option>" +
    "<option value='0.9'>9折</option>" +
    "<option value='0.85'>85折</option>" +
    "<option value='0.8'>8折</option>" +
    "<option value='0.75'>75折</option>" +
    "<option value='0.7'>7折</option>" +
    "<option value='0.65'>65折</option>" +
    "<option value='0.6'>6折</option>" +
    "<option value='0.55'>55折</option>" +
    "<option value='0.5'>5折</option>" +
    "</select>";

/**
 * 作者: lwh
 * 时间: 2020.7.16
 * 描述: 购物车页面初始化
 */
function index_body_cart_init() {
    //加载商品
    loadCart();
}

/**
 * 作者: lwh
 * 时间: 2020.7.16
 * 描述: 加载购物车
 */
function loadCart() {
    if (isLoaded("cart-tbody")) {
        $("#cart-tbody").remove();
    }

    let html = "<tbody id='cart-tbody'>";

    $.each(clist, function (key, value) {
        let no = key + 1;

        html += "<tr> " +
            "<td>" + no + "</td>" +
            "<td>" + value.cid + "—" + value.brand + "—" + value.name + "—" + value.model + "—" + value.standard + "</td>" +
            "<td>" +
            "<input type='number' value='" + value.num + "' min='1' max='" + value.stock + "' onchange='littleCount(this, " + key + ", 0)' onkeydown='return false;'>" +
            "</td>" +
            "<td>" + value.oprice + "</td>" +
            "<td>" + "<select onchange='littleCount(this, " + key + ", 1)'>" + discountSelect + "</td>" +
            "<td>" + value.lprice + "</td>" +
            "<td>" + "- " + value.dprice + "</td>" +
            "<td class='operation'>" +
            "<button type='button' class='btn btn-primary btn-sm' onclick='deleteCartCommodity(this, " + key + ")'>删除</button>" +
            "</td>" +
            "</tr>";
    });

    if (html === "<tbody id='cart-tbody'>") {
        $("#cartEmptyTip").show();
        $("#markInputArea").hide();
    } else {
        $("#cartEmptyTip").hide();
        $("#cart-table").append(html);
        $("#markInputArea").show();
    }

    count();
}

/**
 * 作者: lwh
 * 时间: 2020.7.16
 * 描述: 删除购物车商品
 */
function deleteCartCommodity(instance, key) {
    $(instance).parent().parent().remove();

    clist.splice(key, 1);

    loadCart();
}

/**
 * 作者: lwh
 * 时间: 2020.7.16
 * 描述: 小计
 */
function littleCount(instance, key, type) {
    if (type === 0) {
        clist[key].num = $(instance).val();
        clist[key].lprice = (parseFloat(clist[key].oprice) * clist[key].discount * clist[key].num).toFixed(2);
        clist[key].dprice = (parseFloat(clist[key].oprice) * clist[key].num - parseFloat(clist[key].lprice)).toFixed(2);

        $(instance).parent().next().next().next().text(clist[key].lprice);
        $(instance).parent().next().next().next().next().text("-" + clist[key].dprice);
    } else {
        clist[key].discount = $(instance).val();
        clist[key].lprice = (parseFloat(clist[key].oprice) * parseFloat(clist[key].discount) * clist[key].num).toFixed(2);
        clist[key].dprice = (parseFloat(clist[key].oprice) * clist[key].num - parseFloat(clist[key].lprice)).toFixed(2);

        $(instance).parent().next().text(clist[key].lprice);
        $(instance).parent().next().next().text("-" + clist[key].dprice);
    }

    count();
}

/**
 * 作者: lwh
 * 时间: 2020.7.16
 * 描述: 合计
 */
function count() {
    total = 0;
    totaldiscount = 0;

    $.each(clist, function (key, value) {
        total += parseFloat(value.lprice);
        totaldiscount += parseFloat(value.dprice);
    });

    total = total.toFixed(2);
    totaldiscount = totaldiscount.toFixed(2);

    $("#totalprice").text("合计：" + total + " 元");
    $("#totaldiscount").text("优惠：- " + totaldiscount + " 元");

    if (total === "0.00")
        $("#purchase").attr("disabled", "disabled");
    else
        $("#purchase").removeAttr("disabled");
}

/**
 * 作者: lwh
 * 时间: 2020.7.16
 * 描述: 结算
 */
function purchase() {
    let mark = $("#markInput").val();

    if (mark === "") {
        if (confirm("确定不用备注吗？"))
            callback(mark);
        else
            $("#markInput").focus();
    } else {
        if (confirm("确定结算吗？"))
            callback(mark);
    }

    function callback(mark) {
        let time = new Date().getTime();
        let oid = "#" + timestampToTime(time, 1);
        let income = 0;

        $.each(clist, function (key, value) {
            income += parseFloat(value.lprice) - value.iprice * value.num;
        });

        let orderInfo = {
            oid: oid,
            time: time,
            mark: mark,
            tprice: total,
            tdisprice: totaldiscount,
            income: income.toFixed(2),
            clist: clist
        };

        $.ajax({
            url: "purchase",
            type: "post",
            data: JSON.stringify(orderInfo),
            contentType: "application/json;charset=utf-8",
            async: false,
            dataType: "json",
            success: function (data) {
                if (confirm("购买成功！订单号为：" + oid + "，是否打印订单？")) {
                    saveData2Ses({oid: oid});
                    window.open("porder", "_blank");
                }
                clist = [];
                total = "0.00";
                totaldiscount = "0.00";
                loadCart();
            },
            error: function (error) {
                alert("----ajax请求购买出错！错误信息如下：----\n" + error.responseText);
            }
        });
    }
}