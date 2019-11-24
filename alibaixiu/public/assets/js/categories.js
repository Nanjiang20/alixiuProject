//  点击添加按钮提交字体图标
$('#addCategory').on('submit', function () {
    let result = $(this).serialize();
    console.log(result);
    $.ajax({
        type: 'post',
        url: '/categories',
        data: result,
        success: function (response) {
            console.log(response)
            location.reload();
        }
    });
    return false;
});

// fa-glass 奇趣事
// $.ajax({
//     type: '',
//     url: '',

// });          template
//  页面图标列表渲染
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        // console.log(response);
        let html = template('categoryTpl', { data: response });
        $('#categoriesList').html(html);
    }
});

//  渲染修改页面模板
$('#categoriesList').on('click', '.edit', function () {
    let result = $(this).attr('data-id');
    console.log(result)
    $.ajax({
        type: 'get',
        url: '/categories/' + result,
        success: function (response) {
            // console.log(response);
            let html = template('modifyTpl', response)
            $('#formBox').html(html)
        }
    });
});

//  点击修改按钮修改图标信息
$('#formBox').on('submit', '#mdifyForm', function () {
    let id = $('#mdifyForm').attr('data-id');
    let result = $(this).serialize();
    // console.log(result)
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: result,
        success: function (response) {
            // console.log(response);
            location.reload();
        }
    });
    return false;
});

//  点击删除删除图标列表
$('#categoriesList').on('click', '.delete', function () {
    let id = $(this).attr('data-id');
    if (confirm('您确定要删除吗？')) {
        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function () {
                location.reload();
            }
        });
    }
    return false;
});

//  点击全选按钮选中所有复选框

$('#selectAll').on('change', function () {
    let isChecked = $(this).prop('checked');
    $('#categoriesList').find('input').prop('checked', isChecked)
    if (isChecked) {
        $('#modifyMany').show();
    } else {
        $('#modifyMany').hide();
    };
    // $('#categoriesList input:checked')
    // alert(isChecked);
});

//  点击复选框是否选中全选按钮
$('#categoriesList').on('change', '#select', function () {
    let inputs = $('#categoriesList').find('input');

    if (inputs.filter(':checked').length > 0) {
        $('#modifyMany').show();
    } else {
        $('#modifyMany').hide();
    };
    if (inputs.length == inputs.filter(':checked').length) {
        $('#selectAll').prop('checked', 'checked');
    } else {
        $('#selectAll').prop('checked', '');
    };
});

//  点击全选删除删除信息
$('#modifyMany').on('click', function () {
    let idList = [];
    let msg = $('#categoriesList').find('input').filter(':checked');
    // console.log(msg)
    msg.each( function (index, element) {
        idList.push($(element).attr('data-id'))
    });
    // console.log(idList)
    if (confirm('您确定要删除吗？')) {
        $.ajax({
            type: 'delete',
            url: '/categories/' + idList.join('-'),
            success: function() {
                location.reload();
            },
        });
    };
});