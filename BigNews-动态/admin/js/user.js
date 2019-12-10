$(function () {
    //发送ajax请求获取用户信息
    $.get(BigNew.user_detail, function (res) {
        // console.log(res);
        for (let key in res.data) {
            $('input.' + key).val(res.data[key])
        }
        $('img.user_pic').attr('src', res.data.userPic);
    })
    //图片预览效果
    $('#exampleInputFile').on('change', function (e) {
        let img = this.files[0];
        let url = URL.createObjectURL(img)
        $('img.user_pic').attr('src', url);
    })


    // $('#form').on('submit', function (e) {
    //     //禁用表单默认提交事件
    //     e.preventDefault();
    //     $.ajax({
    //         url: BigNew.user_edit,
    //         type: 'post',
    //         dataType: 'json',
    //         data: new FormData(this),
    //         contentType: false,
    //         processData: false,
    //         success: function (res) {
    //             if (res.code == 200) {
    //                 $.get(BigNew.user_info, function (resdata) {
    //                     parent.$('.user_info img').attr('src', resdata.data.userPic);
    //                     parent.$('.user_info span').html('欢迎&nbsp;&nbsp;' + resdata.data.nickname)
    //                     parent.$('.user_center_link>img').attr('src', resdata.data.userPic);
    //                 })
    //             }
    //         }
    //     });
    // });
    //修改按钮注册点击事件
    $('.btn-edit').on('click', function (e) {
        //禁用表单默认提交事件
        e.preventDefault();
        let form = $('#form')[0];
        let userData = new FormData(form);
        $.post({
            url: BigNew.user_edit,
            data:userData,
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.code == 200) {
                    $.get(BigNew.user_info, function (resdata) {
                        parent.$('.user_info img').attr('src', resdata.data.userPic);
                        parent.$('.user_info span').html('欢迎&nbsp;&nbsp;' + resdata.data.nickname)
                        parent.$('.user_center_link>img').attr('src', resdata.data.userPic);
                    })
                }
            }
        })
    })
})