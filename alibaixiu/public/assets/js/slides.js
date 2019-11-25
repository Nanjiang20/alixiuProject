//  页面一刷新 渲染轮播图页面
$.ajax({
    type: 'get',
    url: '/slides',
    success: function (response) {
        console.log(response);
        let html = template('slidersTpl',  {data: response})
        console.log(html)
        $('#slidersTplBox').html(html)
    }
});

//  监听上传文件按钮变化，向隐藏域添加图片地址
$('.file').on('change', function () {
    // console.log(this.files[0])
    let formdata = new FormData();
    formdata.append('view', this.files[0]);
    // console.log(formdata)
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formdata,
        processData: false,
        contentType: false,
        success: function (response) {
            // console.log(response)
            $('#hiddenInput').val(response[0].view)
        }
    });
});

//  监听表单提交
$('#addForm').on('submit', function() {
    let formdata = $(this).serialize();
    console.log(formdata)
    $.ajax({
        type: 'post',
        url: '/slides',
        data: formdata,
        success: function (response) {
            console.log(response)
            location.reload()
        }
    });
    return false;
});

//  delete
$('#slidersTplBox').on('click', '.delete', function () {
    if(confirm('确定要删？')){
        let id = $('.delete').attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/slides/' + id,
            success: function () {
                location.reload()
            },
        });
    };
});
// $.ajax({
//     type: '',
//     url: '',
//     data: {}
// });