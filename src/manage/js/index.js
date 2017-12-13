layui.use(['jquery', 'element', 'layer'], function () {
    var $ = layui.jquery, element = layui.element, layer = layui.layer;
    $('.layui-tab-content').height($(window).height() - 145);
    //定义tab的添加方法
    var tab = {
        add: function (title, url, id) {
            element.tabAdd('hisiTab', {
                //将该菜单加入快捷菜单中
                title: '<i class="layui-icon j-ajax" data-href="/admin.php/admin/menu/quick.html?id=' + id + '">&#xe600;&nbsp;</i>' + title,
                content: '<iframe width="100%" height="100%" lay-id="' + id + '" frameborder="0" src="' + url + '" scrolling="yes" class="x-iframe"></iframe>',
                id: id
            });
        },
        //修改lay-filter为'hisiTab'中lay-id到指定属性
        change: function (id) {
            element.tabChange('hisiTab', id);
        }
    };
    $('.admin-nav-item').click(function (event) {
        var that = $(this);
        //如果已经存在该tab则直接切换
        if ($('iframe[src="' + that.attr('href') + '"]')[0]) {
            tab.change(that.attr('data-id'));
            event.stopPropagation();
            return false;
        }
        if ($('iframe').length == 10) {
            layer.msg('最多可打开10个标签页');
            return false;
        }
        that.css({color: '#fff'});
        tab.add(that.text(), that.attr('href'), that.attr('data-id'));
        tab.change(that.attr('data-id'));
        event.stopPropagation();
        return false;
    });
    $(document).on('click', '.layui-tab-close', function () {
        $('.layui-nav-child a[data-id="' + $(this).parent('li').attr('lay-id') + '"]').css({color: 'rgba(255,255,255,.7)'});
    });
});