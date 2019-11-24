//  全局事件监测添加新用户数据
$('#userFrom').on('mousemove', function () {
    function addCheck2(elementId, reg, tip) {
        $(elementId).on('blur', function () {
            if (!reg.test($(elementId).val())) {
                $('.alert-danger').show().html(tip);
                return false;
            } else {
                $('.alert-danger').hide().html('');
            }
        });
    };
    addCheck2('#txtEmail', /^\w+@\w+(\.\w+)+$/, '请输入正确的EMail号格式');
    addCheck2('#txtNickName', /^[\u4E00-\u9FA5A-Za-z0-9_]{2,30}$/, '帐号不合法(字母开头，允许2-30字节，允许字母数字下划线)');
    addCheck2('#txtPassword', /^[a-zA-Z]\w{5,17}$/, '密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)');
});

//  点击事件创建用户
$('#userFrom').on('submit', function () {
    //  客户端验证
    let result = '';
    if ($('#txtEmail').val().trim().length == 0) {
        result += '请输入正确的EMail号格式' + '<br>';
    };
    if ($('#txtNickName').val().trim().length == 0) {
        result += '帐号不合法(字母开头，允许2-30字节，允许字母数字下划线)' + '<br>';
    };
    if ($('#txtPassword').val().trim().length == 0) {
        result += '密码(长度在6~18之间，只能包含字母、数字和下划线)';
    };
    $('.alert-danger').show().html(result);

    if (result) {
        return false
    };
    // 获取表单数据并提交至服务器
    let formData = $(this).serialize()
    // console.log(formData);
    $.ajax({
        url: '/users',
        type: 'post',
        data: formData,
        success: function () {
            location.reload()
        },
        error: function () {
            alert('警告：非法创建用户！')
        }
    });
    return false;
});

//  当用户选择文件时
$('#midifyBox').on('change', '#avatarBtn', function () {
    // console.log(this.files[0]);
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
            $('#preview').attr('src', response[0].avatar);
            $('#hiddenAvatar').val(response[0].avatar);
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
        // console.log(html)
        $('#usersBox').html(html);
    }
});

//  点击编辑按钮渲染修改表单
$('#usersBox').on('click', '.edit', function () {
    let id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function (response) {
            // console.log(response)
            let html = template('modifyTpl', response)
            // console.log(html)
            $('#midifyBox').html(html)
        }
    });
});

//  全局事件监测修改用户数据
$('#midifyBox').on('mousemove', function () {
    function addCheck2(elementId, reg, tip) {
        $(elementId).on('blur', function () {
            if (!reg.test($(elementId).val())) {
                $('.alert-danger').show().html(tip);
                return false;
            } else {
                $('.alert-danger').hide().html('');
            }
        });
    };
    addCheck2('#txtEmail', /^\w+@\w+(\.\w+)+$/, '请输入正确的EMail号格式');
    addCheck2('#txtNickName', /^[\u4E00-\u9FA5A-Za-z0-9_]{2,30}$/, '帐号不合法(字母开头，允许2-30字节，允许字母数字下划线)');
});

//  点击修改用户资料
$('#midifyBox').on('submit', '#modifyForm', function () {
    let initEmail = $('.edit').attr('data-email');
    let intNickName = $('.edit').attr('data-nickName');
    let a = $('#txtEmail').val();
    let b = $('#txtNickName').val();
    //  客户端验证
    let result = '';
    if ($('#txtEmail').val().trim().length == 0) {
        result += '请输入正确的EMail号格式' + '<br>';
    };
    if ($('#txtNickName').val().trim().length == 0) {
        result += '帐号不合法(字母开头，允许2-30字节，允许字母数字下划线)' + '<br>';
    };
    $('.alert-danger').show().html(result);
    // console.log(a)
    // console.log(b)
    // console.log(initEmail)
    // console.log(intNickName)
    if (a == initEmail || b == intNickName) {
        result = '未修改哦';
        $('.alert-danger').show().html(result);
    };
    if (result) {
        return false;
    };

    let userMsg = $(this).serialize();
    let id = $(this).attr('data-id');
    // console.log(userMsg, id)
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

//  删除功能
$('#usersBox').on('click', '.delete', function () {
    let istrue = confirm('确定要删除用户吗？')
    // alert(id)
    if (istrue) {
        let id = $(this).attr('data-id')
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function (response) {
                // console.log(response)
                location.reload()
            },
        });
        return false;
    }
});


// 获取全选按钮
let selectAll = $('#selectAll');
// 获取批量删除按钮
let deleteMany = $('#deleteMany');

// 点击全选按钮事件触发所有复选框选中
selectAll.on('change', function () {
    let status = $(this).prop('checked')
    // alert(status)
    if (status) {
        deleteMany.show();
    } else {
        deleteMany.hide();
    }
    $('#usersBox').find('input').prop('checked', status);
});

//  监听复选按钮改变是否选中全选按钮
$('#usersBox').on('change', '.userStatus', function () {
    let inputs = $('#usersBox').find('input')

    if (inputs.length == inputs.filter(':checked').length) {
        selectAll.prop('checked', true)
    } else {
        selectAll.prop('checked', false)
    }

    if (inputs.filter(':checked').length > 0) {
        deleteMany.show();
    } else {
        deleteMany.hide();
    }
});

//  为批量删除按钮添加点击事件
$('#deleteMany').on('click', function () {
    let ary = [];
    let checkedBox = $('#usersBox').find('input').filter(':checked');
    checkedBox.each(function (index, element) {
        ary.push($(element).attr('data-id'))
    });
    // console.log(ary)
    if (confirm('确定要删除吗')) {
        $.ajax({
            type: 'delete',
            url: '/users/' + ary.join('-'),
            success: function (response) {
                // console.log(response)
                location.reload()
            }
        });
    };
});
