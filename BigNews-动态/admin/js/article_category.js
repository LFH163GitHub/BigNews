$(function () {
    //获取文章列表数据
    getList();

    function getList() {
        $.get(BigNew.category_list, function (res) {
            let html = template('list', res.data)
            // console.log(html);
            $('tbody').html(html)
        })
    }
    //当点击取消按钮的时候，将表单中的数据全部重置
    $('#btn-cancel').on('click', function () {
        $('form')[0].reset();
    })
    //当模态框在显示的时候，我们需要知道是哪一个按钮被点击了
    $('#myModal').on('show.bs.modal', function (e) {
        let dom = e.relatedTarget;
        if (dom == $('#xinzengfenlei')[0]) {
            $('#exampleModalLabel').text('新增文章分类')
            $('#btn-confirm').text('新增').addClass('btn-success').removeClass('btn-primary');
            $('form')[0].reset();
        } else {
            $('#exampleModalLabel').text('编辑文章分类')
            $('#btn-confirm').text('编辑').addClass('btn-primary').removeClass('btn-success');
            // 当弹出编辑的模态框的时候，需要得到一个文章类别id，根据这个id，发送ajax请求获得具体的文章类别信息
            let cateId = $(dom).attr('data-id');
            $.get(BigNew.category_search, {
                id: cateId
            }, function (res) {
                if (res.code == 200) {
                    $('#recipient-name').val(res.data[0].name)
                    $('#message-text').val(res.data[0].slug)
                    $('#cateid').val(res.data[0].id)
                }
            })
        }

    })

    //当共用一个模态框时最后点击新增或编辑时不同的执行程序
    // $('#btn-confirm').on('click', function () {
    //     if ($(this).text() == '新增') {
    //         let name = $('#recipient-name').val()
    //         let slug = $('#message-text').val()
    //         if (name == '' || slug == '') {
    //             alert('请填写数据')
    //             return;
    //         }
    //         $.post({
    //             url: BigNew.category_add,
    //             data: {
    //                 name: name,
    //                 slug: slug
    //             },
    //             success: function (res) {
    //                 if (res.code == 201) {
    //                     $('#myModal').modal('hide')
    //                     getList();
    //                 }
    //             }
    //         })
    //     } else if ($(this).text() == '编辑') {
    //         let name = $('#recipient-name').val()
    //         let slug = $('#message-text').val()
    //         let id = $('#cateid').val()
    //         if (name == '' || slug == '') {
    //             alert('请填写需要编辑的数据')
    //             return;
    //         }
    //         $('#myModal').modal('hide')
    //         $.post({
    //             url: BigNew.category_edit,
    //             data: {
    //                 id: id,
    //                 name: name,
    //                 slug: slug
    //             },
    //             success: function (res) {
    //                 // console.log(res);
    //                 if (res.code == 200) {
    //                     $('#myModal').modal('hide')
    //                     getList();
    //                 }
    //             }
    //         })
    //     }
    // })
    //第二种的判断条件 直接判断这个按钮是否包含这个类
    $('#btn-confirm').on('click', function () {
        if ($(this).hasClass('btn-success')) {
            let name = $('#recipient-name').val()
            let slug = $('#message-text').val()
            if (name == '' || slug == '') {
                alert('请填写数据')
                return;
            }
            $.post({
                url: BigNew.category_add,
                data: {
                    name: name,
                    slug: slug
                },
                success: function (res) {
                    if (res.code == 201) {
                        $('#myModal').modal('hide')
                        getList();
                    }
                }
            })
        } else if ($(this).hasClass('btn-primary')) {
            let name = $('#recipient-name').val()
            let slug = $('#message-text').val()
            let id = $('#cateid').val()
            if (name == '' || slug == '') {
                alert('请填写需要编辑的数据')
                return;
            }
            $('#myModal').modal('hide')
            $.post({
                url: BigNew.category_edit,
                data: {
                    id: id,
                    name: name,
                    slug: slug
                },
                success: function (res) {
                    // console.log(res);
                    if (res.code == 200) {
                        $('#myModal').modal('hide')
                        getList();
                    }
                }
            })
        }
    })

    //点击删除按钮删除数据
    $('tbody').on('click', '#btn-del', function () {
        let delData = $(this).attr('data-id');
        let ans = confirm('你确定要删除吗！！！')
        if (ans) {
            $.post(BigNew.category_delete, { id: delData }, function (res) {
                // console.log(res);
                if (res.code == 204) {
                    getList();
                }

            })
        }
    })
})