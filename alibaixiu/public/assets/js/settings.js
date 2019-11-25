//  获取上传文件信息
$('#logo').on('change', function() {
    let file = this.files[0];
    console.log(file)
    let formdata = new FormData();
    formdata.append('view', file);
    console.log(formdata)
    // $('#site_logo').val(formdata[0].view)
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formdata,
        success: function(response) {
            console.log(response)
        }
    });
    return false;
});