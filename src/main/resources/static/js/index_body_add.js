/**
 * 作者: lwh
 * 时间: 2020.7.16
 * 描述: 商品入库页面初始化
 */
function index_body_add_init() {
    //重置按钮的点击事件监听函数注册
    $("#index-body-add #resetButton").click(function () {
        $("#addForm").data("bootstrapValidator").resetForm("true");
    });

    $("#addForm").bootstrapValidator({
        message: "*输入不合法",
        feedbackIcons: {
            valid: "glyphicon glyphicon-ok",
            invalid: "glyphicon glyphicon-remove",
            validating: "glyphicon glyphicon-refresh"
        },
        fields: {
            brandInput: {
                message: "*品牌不合法",
                validators: {
                    notEmpty: {
                        message: "*品牌不能为空"
                    }
                }
            },
            nameInput: {
                message: "*名称不合法",
                validators: {
                    notEmpty: {
                        message: "*名称不能为空"
                    }
                }
            },
            modelInput: {
                validators: {
                    callback: {
                        callback: function () {
                            return true;
                        }
                    }
                }
            },
            standardInput: {
                validators: {
                    callback: {
                        callback: function () {
                            return true;
                        }
                    }
                }
            },
            stockInput: {
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
            ipriceInput: {
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
            },
            opriceInput: {
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
            }
        }
    }).on("success.form.bv", function (e) {
        //注册表单被提交后且验证成功的事件的监听函数以使用ajax提交表单数据
        //阻止正常提交表单
        e.preventDefault();
        //获取数据
        let jsonStr = JSON.stringify({
            cid: "#" + new Date().getTime(),
            brand: $("#brandInput").val(),
            name: $("#nameInput").val(),
            model: $("#modelInput").val(),
            standard: $("#standardInput").val(),
            stock: $("#stockInput").val(),
            oprice: $("#opriceInput").val(),
            iprice: $("#ipriceInput").val()
        });
        //使用ajax提交表单验证用户名密码
        $.ajax({
            url: "addCommodity",
            type: "post",
            data: jsonStr,
            contentType: "application/json;charset=utf-8",
            async: true,
            dataType: "json",
            success: function (data) {
                alert("添加成功！");
                let validator = $("#addForm").data("bootstrapValidator");
                validator.resetForm();
            },
            error: function (error) {
                alert("----ajax请求添加商品出错！错误信息如下：----\n" + error.responseText);
            }
        });
    });
}