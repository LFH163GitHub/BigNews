$(function () {
    //页面一加载：请求分类列表渲染到下拉菜单
    $.get(BigNew.category_list, function (res) {
        let html = template('drop-list', res.data)
        $('#selCategory').html(html)
    })

    let valc = ''
    let vals = ''

    // 封装一个获取数据的方法
    function pageData(pages, callback) {
        $.get(BigNew.article_query, {
            page: pages,
            perpage: perpage,
            type: valc,
            state: vals
        }, function (res) {
            let html = template('artList', res.data);
            $('tbody').html(html)

            //我们获取到数据之后，我们还需要在这里写代码处理，所以我们使用一个函数，使用回调
            if ((res.data.data.length != 0 && callback != null)) {
                $('#pagination').show();
                $('#tips').hide();
                callback(res);
            } else if (res.data.data.length === 0) {
                if (mypage > 1) {
                    $('#pagination').twbsPagination('changeTotalPages', res.data.totalPage, mypage -
                        1)
                } else {
                    $('#pagination').hide();
                    $('#tips').show();
                }

            }
        })
    }

    //定义两个变量，用来表示页码和条数
    let mypage = 1;
    let perpage = 10;
    //页面一加载就展示文章条目数据
    pageData(mypage, function (res) {
        $('#pagination').twbsPagination({
            totalPages: res.data.totalPage,
            visiblePages: 6,
            first: '首页',
            prev: '上一页',
            next: '下一页',
            last: '尾页',
            onPageClick: function (event, page) {
                mypage = page
                pageData(mypage, null)
            }
        })
    })
    $('#btnSearch').on('click', function (e) {
        e.preventDefault();
        valc = $('#selCategory').val();
        vals = $('#selStatus').val();
        mypage = 1
        pageData(mypage, function (res) {
            $('#pagination').twbsPagination('changeTotalPages', res.data.totalPage, 1)
        })
    })

    //删除数据功能并停留当前页面
    $('tbody').on('click', '#del', function () {
        let getid = $(this).attr('data-id');
        if (confirm('你确定要删除吗！！')) {
            $.post(BigNew.article_delete, {
                id: getid
            }, function (del) {
                pageData(mypage, function (res) {
                    $('#pagination').twbsPagination('changeTotalPages', res.data
                        .totalPage, mypage)
                })
            })
        }
    })

})