//  创建用户
$('#formData').on('submit', function () {
    let result = $(this).serialize()
    console.log(result)
    $.ajax({
        url: '/users',
        type: 'post',
        data: result,
        success: function () {
            location.reload()
        },
        error: function () {
            alert('警告：非法创建用户！')
        }
    });
    return false;
});

//  上传文件
$('#midifiyBox').on('change', '#avatarBtn', function () {
    console.log(this.files[0]);
    let formdata = new FormData();
    formdata.append('avatar', this.files[0]);
    $.ajax({
        url: '/upload',
        type: 'post',
        data: formdata,
        processData: false,
        contentType: false,
        success: function (response) {
            // console.log(response)
            $('#preview').attr('src', response[0].avatar)
            $('#hiddenAvatar').val(response[0].avatar)
        },
    });
});

//  用户列表渲染
$.ajax({
    type: 'get',
    url: '/users',
    success: function (response) {
        // console.log(response)
        var html = template('userTpl', { data: response });
        $('#usersBox').html(html);
    }
});

//  渲染修改表单
$('#usersBox').on('click', '.edit', function () {
    let id = $(this).attr('data-id')
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function (response) {
            // console.log(response)
            let html = template('modifiyTpl', response)
            // console.log(html)
            $('#midifiyBox').html(html)
        }
    });
});

//  修改用户资料
$('#midifiyBox').on('submit', '#modifiyForm', function () {
    let userMsg = $(this).serialize();
    let id = $(this).attr('data-id');
    console.log(userMsg, id)
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: userMsg,
        success: function (response) {
            location.reload()
        }
    })

    return false;
});

