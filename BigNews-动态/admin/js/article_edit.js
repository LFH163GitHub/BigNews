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
        isTime: false,
        minDate: "2014-09-19 00:00:00",
        zIndex: 333333
    })
    //获取要修改的文章数据
    let findID = location.search.split('=')[1]
    // console.log(findID);
    $.get(BigNew.article_search, {
        id: findID
    }, function (res) {
        if (res.code == 200) {
            $('#inputTitle').val(res.data.title);
            $('#testico').val(res.data.date);
            $('img.article_cover').attr('src', res.data.cover)
            editor.txt.html(res.data.content)
        }
    })

    //修改数据——修改
    $('button.btn-edit').on('click', function (e) {
        e.preventDefault();
        let form = $('#form')[0];
        let listData = new FormData(form);
        listData.append('content', editor.txt.html());
        listData.append('state', '已发布');
        listData.append('id', findID)
        $.post({
            url: BigNew.article_edit,
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
        listData.append('id', findID)
        $.post({
            url: BigNew.article_edit,
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