//  获取服务器文章列表信息渲染文章列表
$.ajax({
    type: 'get',
    url: '/posts',
    success: function (response) {
        console.log(response);
        // <!-- 文章列表模板 -->
        let html = template('articleTpl', response);
        $('#articleListBox').html(html);
        // <!-- 分页模板 -->
        let page = template('pageTpl', response);
        $('#pageBox').html(page);
    },
});

//  时间格式化
function getTime(date) {
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
};
// $value.state == 1 ? '已发布' : '未发布'

//  分页功能
function changepage(page) {
    $.ajax({
        type: 'get',
        url: '/posts',
        data: { page },
        success: function (response) {
            // <!-- 文章列表模板 -->
            let html = template('articleTpl', response);
            $('#articleListBox').html(html);
            // <!-- 分页模板 -->
            let page = template('pageTpl', response);
            $('#pageBox').html(page);
        },
    });
};

//  查询文章分类渲染分类模板
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        console.log(response)
        let classlyTpl = template('classlyTpl', { data: response })
        // console.log({data: response})
        $('#classlyTplBox').html(classlyTpl)
    }
});

//  监听分类表单提交事件
$('#classlyForm').on('submit', function () {
    let result = $(this).serialize()
    console.log(result)
    $.ajax({
        type: 'get',
        url: '/posts',
        data: result,
        success: function (response) {
            console.log(response);
            // <!-- 文章列表模板 -->
            let html = template('articleTpl', response);
            $('#articleListBox').html(html);
            // <!-- 分页模板 -->
            let page = template('pageTpl', response);
            $('#pageBox').html(page);
        }
    });
    return false;
});

$('#articleListBox').on('click', '.delete', function() {
    if (confirm('确定要删？')) {
        let id = $(this).attr('data-id');
        // console.log(id);
        $.ajax({
            type: 'delete',
            url: '/posts/' + id,
            success: function () {
                location.reload();
            }
        });
    }
});