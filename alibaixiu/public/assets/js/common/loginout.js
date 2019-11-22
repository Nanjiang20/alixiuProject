//  推出功能
$('#loginOut').on('click', function () {
    var isLoginOut = confirm('您确认要推出登陆吗？');
    if (isLoginOut) {
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function(){
                location.href = 'login.html'
            },
            error: function(){
                alert('退出失败')
            },
        });
    };
});