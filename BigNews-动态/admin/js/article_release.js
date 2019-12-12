$(function () {
    //图片预览效果
    $('#inputCover').on('change', function (e) {
        let img = this.files[0];
        let url = URL.createObjectURL(img)
        $('img.article_cover').attr('src', url);
    })
    //获取下拉菜单数据
    $.get(BigNew.category_list, function (res) {
        let html = template('drop-list', res.data)
        $('.category').html(html)
    })
    //添加日期插件
    jeDate("#testico", {
        format: "YYYY-MM-DD",
        isinitVal: true,
        isTime: false,
        minDate: "2014-09-19 00:00:00",
        zIndex: 333333
    })

    //修改数据——发布
    $('button.btn-release').on('click', function (e) {
        e.preventDefault();
        let form = $('#form')[0];
        let listData = new FormData(form);
        listData.append('content', editor.txt.html());
        listData.append('state', '已发布');
        $.post({
            url: BigNew.article_publish,
            data: listData,
            processData: false,
            contentType: false,
            success: function (res) {
                if (res.code == 200) {
                    // console.log(res.msg);
                    window.history.back();
                }
            }
        })
    })
    //修改数据——存为草稿
    $('button.btn-draft').on('click', function (e) {
        e.preventDefault();
        let form = $('#form')[0];
        let listData = new FormData(form);
        listData.append('content', editor.txt.html());
        $.post({
            url: BigNew.article_publish,
            data: listData,
            processData: false,
            contentType: false,
            success: function (res) {
                if (res.code == 200) {
                    // console.log(res.msg);

                    window.history.back();
                }
            }
        })
    })

})