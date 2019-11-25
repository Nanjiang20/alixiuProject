// 添加数据/comments
// $.ajax({
//     type: 'post',
//     url: '/comments',
//     data: {
//         post: "5ddb3911e147774e08538371",
//         author: "5dd9f2845a66305b6c647eb3",
//         content: "牛的一批",
//     }
// });

//  初始页面模板的渲染
$.ajax({
    type: 'get',
    url: '/comments',
    success: function (response) {
        // console.log(response);
        let html = template('commentTpl', response);
        // console.log(html);
        $('#commentsList').html(html);
        let page = template('pageTpl', response);
        $('#pageBox').html(page)
    },
});

//  分页功能
function changepage(page) {
    $.ajax({
        type: 'get',
        url: '/comments',
        data: { page },
        success: function (response) {
            // console.log(response)
            let html = template('commentTpl', response);
            $('#commentsList').html(html);
            // console.log(html)
            let page = template('pageTpl', response);
            $('#pageBox').html(page);
            // console.log(page)
        },
    });
};

//  审核按钮
$('#commentsList').on('click', '.status', function () {
    let status = $(this).attr('data-status')
    console.log(status)
    let id = $(this).attr('data-id')
    console.log(id)
    $.ajax({
        type: 'put',
        url: '/comments/' + id,
        data: {
            state: status == 0 ? 1 : 0
        },
        success: function () {
            location.reload();
        },
    });
    return false
});

//  删
$('#commentsList').on('click', '.delete', function () {
    if (confirm('确认要删？')) {
        let id = $(this).attr('data-id')
        $.ajax({
            type: 'delete',
            url: '/comments/' + id,
            data: {
                state: status == 0 ? 1 : 0
            },
            success: function () {
                location.reload();
            },
        });
    }
});
