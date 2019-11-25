//  查询分类渲染到分类模板
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        // console.log(response)
        let html = template('titleTpl', { data: response });
        $('#category').html(html);
    },
});

//  监听表单提交按钮
$('#formBox').on('submit', '#modifyArticle', function () {
    let formdata = $(this).serialize();
    // console.log(formData);
    let id = $('#modifyArticle').attr('data-id');
    // console.log(id);
    $.ajax({
        type: 'put',
        url: '/posts/' + id,
        data: formdata,
        success: function (response) {
            console.log(response)
            location.href = '/admin/posts.html'
        }
    });
    return false;
});


//  用户提交文件获得图片地址
$('#feature').on('change', function () {
    let file = this.files[0];
    let formData = new FormData();
    formData.append('cover', file);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            // console.log(response)
            $('#thumbnail').val(response[0].cover)
        }
    });
    return false
});

//  监听提交事件并提交数据到数据库
$('#addArticle').on('submit', function () {
    let result = $(this).serialize();
    console.log(result)
    $.ajax({
        type: 'post',
        url: '/posts',
        data: result,
        success: function () {
            location.href = '/admin/posts.html'
        }
    });
    return false;
});

//  获取地址栏的url为name的函数
function getUrlParams(name) {
    let url = location.search.substr(1).split('&');
    for (var i = 0; i < url.length; i++) {
        let temp = url[i].split('=');
        if (temp != name) {
            // console.log(temp[1]);
            return temp[1];
        };
    };
    return null;
};
let id = getUrlParams(name);
// console.log(id)
if (id != null) {
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        success: function (response) {
            // .html(html)
            //  查询category数据 ,进一步渲染模板
            $.ajax({
                type: 'get',
                url: '/categories',
                success: function (category) {
                    response.categoryAll = category;
                    console.log(response)
                    // console.log(category);
                    let html = template('modifyTpl', response);
                    // console.log(html)
                    $('#formBox').html(html);
                },
            });
        }
    });
};

