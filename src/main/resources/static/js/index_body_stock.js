//记录筛选框输入的信息
let jsonObj;

/**
 * 作者: lwh
 * 时间: 2020.7.16
 * 描述: 库存管理页面初始化
 */
function index_body_stock_init() {
    //获取商品列表
    getAllCommodities();

    //监听器注册
    searchBtnListenerRegister();

    //更改商品信息模态框初始化
    updateCinfoModelInit();
}

/**
 * 作者: lwh
 * 时间: 2020.7.17
 * 描述: 筛选按钮监听器注册
 */
function searchBtnListenerRegister() {
    $("#stock-selectForm").on("submit", function (e) {
            //阻止提交
            e.preventDefault();
            //获取数据
            let brand = $("#select-brandInput").val();
            let name = $("#select-nameInput").val();
            let model = $("#select-modelInput").val();
            let standard = $("#select-standardInput").val();
            jsonObj = {
                brand: brand,
                name: name,
                model: model,
                standard: standard
            };
            //根据条件查询
            if (brand === "" && name === "" && model === "" && standard === "")
                alert("请输入条件");
            else {
                if (brand !== "" && name !== "") {
                    if (model !== "" && standard !== "") {
                        getCommoditiesByAll();
                    } else if (model !== "" && standard === "") {
                        getCommoditiesByBrandNameModel();
                    } else {
                        getCommoditiesByBrandName();
                    }
                } else if (brand !== "" && name === "") {
                    getCommoditiesByBrand();
                } else if (brand === "" && name !== "") {
                    getCommoditiesByName();
                } else {
                    alert("请至少输入品牌或品名查询！");
                }
            }
        }
    );

    $("#stock-selectForm button:eq(1)").on("click", function () {
        getAllCommodities();
    });
}

/**
 * 作者: lwh
 * 时间: 2020.7.16
 * 描述: 加载所有商品
 */
function getAllCommodities() {
    $.ajax({
        url: "getAllCommodities",
        type: "get",
        async: true,
        dataType: "json",
        success: function (data) {
            showCommmodities(data);
        },
        error: function (error) {
            alert("----ajax请求所有商品出错！错误信息如下：----\n" + error.responseText);
        }
    })
}

/**
 * 作者: lwh
 * 时间: 2020.7.16
 * 描述: 根据所有加载商品
 */
function getCommoditiesByAll() {
    $.ajax({
        url: "getCommoditiesByAll",
        type: "post",
        data: JSON.stringify(jsonObj),
        contentType: "application/json;charset=utf-8",
        async: true,
        dataType: "json",
        success: function (data) {
            showCommmodities(data);
        },
        error: function (error) {
            alert("----ajax请求所有条件查询商品出错！错误信息如下：----\n" + error.responseText);
        }
    });
}

/**
 * 作者: lwh
 * 时间: 2020.7.16
 * 描述: 根据品牌加载商品
 */
function getCommoditiesByBrand() {
    $.ajax({
        url: "getCommoditiesByBrand",
        type: "post",
        data: JSON.stringify({
            brand: jsonObj.brand
        }),
        contentType: "application/json;charset=utf-8",
        async: true,
        dataType: "json",
        success: function (data) {
            showCommmodities(data);
        },
        error: function (error) {
            alert("----ajax请求按品牌查询商品出错！错误信息如下：----\n" + error.responseText);
        }
    });
}

/**
 * 作者: lwh
 * 时间: 2020.7.16
 * 描述: 根据品名加载商品
 */
function getCommoditiesByName() {
    $.ajax({
        url: "getCommoditiesByName",
        type: "post",
        data: JSON.stringify({
            name: jsonObj.name
        }),
        contentType: "application/json;charset=utf-8",
        async: true,
        dataType: "json",
        success: function (data) {
            showCommmodities(data);
        },
        error: function (error) {
            alert("----ajax请求按品名查询商品出错！错误信息如下：----\n" + error.responseText);
        }
    });
}

/**
 * 作者: lwh
 * 时间: 2020.7.16
 * 描述: 根据品牌及品名加载商品
 */
function getCommoditiesByBrandName() {
    $.ajax({
        url: "getCommoditiesByBrandName",
        type: "post",
        data: JSON.stringify({
            brand: jsonObj.brand,
            name: jsonObj.name
        }),
        contentType: "application/json;charset=utf-8",
        async: true,
        dataType: "json",
        success: function (data) {
            showCommmodities(data);
        },
        error: function (error) {
            alert("----ajax请求按品牌品名查询商品出错！错误信息如下：----\n" + error.responseText);
        }
    });
}

/**
 * 作者: lwh
 * 时间: 2020.7.18
 * 描述: 根据品牌、品名及型号加载商品
 */
function getCommoditiesByBrandNameModel() {
    $.ajax({
        url: "getCommoditiesByBrandNameModel",
        type: "post",
        data: JSON.stringify({
            brand: jsonObj.brand,
            name: jsonObj.name,
            model: jsonObj.model
        }),
        contentType: "application/json;charset=utf-8",
        async: true,
        dataType: "json",
        success: function (data) {
            showCommmodities(data);
        },
        error: function (error) {
            alert("----ajax请求按品牌品名型号查询商品出错！错误信息如下：----\n" + error.responseText);
        }
    });
}

/**
 * 作者: lwh
 * 时间: 2020.7.16
 * 描述: 根据提供数据显示表格
 */
function showCommmodities(data) {
    if (isLoaded("allCommodities-tbody"))
        $("#allCommodities-tbody").remove();

    let html = "<tbody id='allCommodities-tbody'>";

    $.each(data, function (key, value) {
        if (value.stock <= 3)
            html += "<tr class='danger'>";
        else
            html += "<tr>";
        html +=
            "<td>" + value.cid + "</td>" +
            "<td>" + value.brand + "</td>" +
            "<td>" + value.name + "</td>" +
            "<td>" + value.model + "</td>" +
            "<td>" + value.standard + "</td>" +
            "<td>" + value.stock + "</td>" +
            "<td>" + value.oprice + "</td>" +
            "<td class='operation'>" +
            "<button type='button' class='btn btn-primary btn-sm' onclick='deleteCommodity(this)'>删除</button>" +
            "<button type='button' class='btn btn-primary btn-sm' onclick='updateCinfo(this)'>更改信息</button>" +
            "<button type='button' class='btn btn-primary btn-sm' onclick='addCart(this)'>添加购物车</button>" +
            "</td>" +
            "<td>" + value.iprice + "</td>" +
            "</tr>";
    });

    if (html === "<tbody id='allCommodities-tbody'>")
        $("#noCommodityTip").show();
    else {
        $("#noCommodityTip").hide();
        $("#allCommodities-table").append(html);
    }
}

/**
 * 作者: lwh
 * 时间: 2020.7.16
 * 描述: 更新商品信息
 */
function updateCinfo(instance) {
    let tr = $(instance).parent().parent();

    //获取商品信息
    let cinfo = {
        cid: $(tr).children("td:eq(0)").text(),
        brand: $(tr).children("td:eq(1)").text(),
        name: $(tr).children("td:eq(2)").text(),
        model: $(tr).children("td:eq(3)").text(),
        standard: $(tr).children("td:eq(4)").text(),
        stock: $(tr).children("td:eq(5)").text(),
        oprice: $(tr).children("td:eq(6)").text(),
        iprice: $(tr).children("td:eq(8)").text()
    };
    //显示要更改的商品信息
    $("#updateCinfoForm legend").text(cinfo.cid);
    $("#update-brandInput").val(cinfo.brand);
    $("#update-nameInput").val(cinfo.name);
    $("#update-modelInput").val(cinfo.model);
    $("#update-standardInput").val(cinfo.standard);
    $("#update-stockInput").val(cinfo.stock);
    $("#update-opriceInput").val(cinfo.oprice);
    $("#update-ipriceInput").val(cinfo.iprice);
    //显示更改模态框
    $("#updateCinfoModal").modal();
}

/**
 * 作者: lwh
 * 时间: 2020.7.17
 * 描述: 更新商品信息模态框初始化
 */
function updateCinfoModelInit() {
    //表单验证
    $("#updateCinfoForm").bootstrapValidator({
        message: "*输入不合法",
        feedbackIcons: {
            valid: "glyphicon glyphicon-ok",
            invalid: "glyphicon glyphicon-remove",
            validating: "glyphicon glyphicon-refresh"
        },
        fields: {
            "update-brandInput": {
                message: "*品牌不合法",
                validators: {
                    notEmpty: {
                        message: "*品牌不能为空"
                    }
                }
            },
            "update-nameInput": {
                message: "*名称不合法",
                validators: {
                    notEmpty: {
                        message: "*名称不能为空"
                    }
                }
            },
            "update-modelInput": {
                validators: {
                    callback: {
                        callback: function () {
                            return true;
                        }
                    }
                }
            },
            "update-standardInput": {
                validators: {
                    callback: {
                        callback: function () {
                            return true;
                        }
                    }
                }
            },
            "update-stockInput": {
                message: "*库存不合法",
                validators: {
                    notEmpty: {
                        message: "*库存不能为空"
                    },
                    regexp: {
                        regexp: /^[0-9]+$/,
                        message: "*库存只能为正整数"
                    }
                }
            },
            "update-opriceInput": {
                message: "*单价不合法",
                validators: {
                    notEmpty: {
                        message: "*单价不能为空"
                    },
                    regexp: {
                        regexp: /^[0-9]+(\.?[0-9]+)?$/,
                        message: "*单价只能为正整数或含小数的正整数"
                    }
                }
            },
            "update-ipriceInput": {
                message: "*进价不合法",
                validators: {
                    notEmpty: {
                        message: "*进价不能为空"
                    },
                    regexp: {
                        regexp: /^[0-9]+(\.?[0-9]+)?$/,
                        message: "*进价只能为正整数或含小数的正整数"
                    }
                }
            }
        }
    });

    //更新按钮点击处理
    $("#updateCinfoModal .modal-footer button:eq(1)").on("click", function () {
        let validator = $("#updateCinfoForm").data("bootstrapValidator");
        validator.validate();
        if (validator.isValid()) {
            //获取数据
            let newCinfo = JSON.stringify({
                cid: $("#updateCinfoForm legend").text(),
                newbrand: $("#update-brandInput").val(),
                newname: $("#update-nameInput").val(),
                newmodel: $("#update-modelInput").val(),
                newstandard: $("#update-standardInput").val(),
                newstock: $("#update-stockInput").val(),
                newoprice: $("#update-opriceInput").val(),
                newiprice: $("#update-ipriceInput").val()
            });

            //使用ajax提交表单验证用户名密码
            $.ajax({
                url: "updateCinfo",
                type: "post",
                data: newCinfo,
                contentType: "application/json;charset=utf-8",
                async: true,
                dataType: "json",
                success: function (data) {
                    alert("更改成功！");
                    getAllCommodities();
                    $("#updateCinfoModal").modal("hide");
                },
                error: function (error) {
                    alert("----ajax请求更新商品信息出错！错误信息如下：----\n" + error.responseText);
                }
            });
        } else
            alert("请正确填写商品信息!");
    });

    //取消按钮点击处理
    $("#updateCinfoModal").on("hide.bs.modal", function (e) {
        let validator = $("#updateCinfoForm").data("bootstrapValidator");
        validator.resetForm("true");
    });
}

/**
 * 作者: lwh
 * 时间: 2020.7.16
 * 描述: 删除商品
 */
function deleteCommodity(instance) {
    let cid = $(instance).parent().parent().children("td:eq(0)").text();

    $.ajax({
        url: "deleteCommodity",
        type: "post",
        data: JSON.stringify({
            cid: cid
        }),
        contentType: "application/json;charset=utf-8",
        async: true,
        dataType: "json",
        success: function (data) {
            alert("删除成功！");
            getAllCommodities();
        },
        error: function (error) {
            alert("----ajax请求删除商品出错！错误信息如下：----\n" + error.responseText);
        }
    });
}

/**
 * 作者: lwh
 * 时间: 2020.7.16
 * 描述: 添加购物车
 */
function addCart(instance) {
    let tr = $(instance).parent().parent();

    let cid = $(tr).children("td:eq(0)").text();
    let stock = $(tr).children("td:eq(5)").text();
    let iprice = parseFloat($(tr).children("td:eq(8)").text());
    let oprice = $(tr).children("td:eq(6)").text();

    if (stock === "0") {
        alert("库存不足！");
        return;
    }

    let exist = false;

    $.each(clist, function (key, value) {
        if (value.cid === cid) {
            exist = true;

            if (value.num < parseInt(value.stock)) {
                value.num++;
                value.lprice = (parseFloat(value.oprice) * value.discount * value.num).toFixed(2);
                value.dprice = (parseFloat(value.oprice) * value.num - parseFloat(value.lprice)).toFixed(2);
            } else
                alert("库存不足！");

            return false;
        }
    });

    if (!exist) {
        let cinfo = {
            cid: cid,
            brand: $(tr).children("td:eq(1)").text(),
            name: $(tr).children("td:eq(2)").text(),
            model: $(tr).children("td:eq(3)").text(),
            standard: $(tr).children("td:eq(4)").text(),
            stock: stock,
            iprice: iprice,
            oprice: oprice,
            discount: "1.00",
            num: 1,
            lprice: oprice,
            dprice: "0.00"
        };
        clist.push(cinfo);
    }
}