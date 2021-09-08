/**
 * 作者: lwh
 * 时间: 2020.4.13
 * 描述: 导航栏初始化
 */
function index_navbar_init() {
    //更新导航栏已登录管理员信息
    $("#index-navbar-adminName").text("您好，管理员");

    //为导航标签添加监听函数
    navbarTabListenerRegist();
}

/**
 * 作者: lwh
 * 时间: 2020.7.8
 * 描述: 导航栏标签监听函数注册
 */
function navbarTabListenerRegist() {
    //导航栏主要标签
    let navbar_navul = $("#index-navbar ul:eq(0)");

    //设置监听器
    $(navbar_navul).children().click(function () {
        //是否点击已经激活的菜单项
        if ($(this).hasClass("active"))
            return;
        //更改网页标题
        let cname = $(this).children().text();
        $("title").text(cname + "—商品出入库管理系统");
        //取消当前激活菜单项
        navbar_navul.children("li.active").removeClass("active");
        //激活点击项
        $(this).addClass("active");
        //根据名称查找组件并加载
        findComponentInfoAndLoad(cname);
    });

    function findComponentInfoAndLoad(cname) {
        //根据名称查找组件并加载
        let i = 0;
        $.each(systemComponents, function (key, value) {
            if (value.cname === cname) {
                //清空主体区域
                $("#index-body-container").empty();
                //加载对应组件
                loadSingleComponent(value, "#index-body-container");
                //更新当前用户所处界面
                currentComponent = i;
                let jsonObj = {cno: currentComponent};
                saveData2Ses(jsonObj);
                //return false;——跳出所有循环；相当于 javascript 中的 break 效果。
                //return true;——跳出当前循环，进入下一个循环；相当于 javascript 中的 continue 效果
                return false;
            }
            i++;
        });
    }
}