$('#modifyPsdBtn').on('submit', function() {
    let result = $(this).serialize();
    console.log(result);
    $.ajax({
        type: 'put',
        url: '/users/password',
        data: result,
        success: function (response) {
            location.href = '/admin/login.html'
        }
    });
    return false;
})