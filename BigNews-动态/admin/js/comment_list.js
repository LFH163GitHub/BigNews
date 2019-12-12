$(function () {
    //发送ajax请求获取评论数据
    let mypage = 1;
    let perpage = 11;

    function getComData(pages, callback) {
      $.get(BigNew.comment_list, {
        page: pages,
        perpage: perpage
      }, function (res) {
        // console.log(res);

        let html = template('htl', res.data.data)
        $('tbody').html(html)
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
            $('#tips').text('没有数据啦！！').show();
          }
        }
      })
    }
    //调用函数加载数据
    getComData(mypage, function (res) {
      $('#pagination').twbsPagination({
        totalPages: res.data.totalPage,
        visiblePages: 6,
        first: '首页',
        prev: '上一页',
        next: '下一页',
        last: '尾页',
        onPageClick: function (event, page) {
          mypage = page
          getComData(mypage, null)
        }
      })
    })
    //给功能按钮注册点击事件
    //批准
    $('tbody').on('click', '.btn-pass', function () {
      let findId = $(this).attr('data-id')
      $.post(BigNew.comment_pass, {
        id: findId
      }, function (res) {
        getComData(mypage, null);
      })
    })
    //拒绝
    $('tbody').on('click', '.btn-nopass', function () {
      let findId = $(this).attr('data-id')
      $.post(BigNew.comment_reject, {
        id: findId
      }, function (res) {
        getComData(mypage, null);
      })
    })
    //删除
    $('tbody').on('click', '.btn-del', function () {
      let findId = $(this).attr('data-id')
      $.post(BigNew.comment_delete, {
        id: findId
      }, function (res) {
        if (confirm('您确定要删除吗？')) {
          getComData(mypage, function (res) {
            $('#pagination').twbsPagination('changeTotalPages', res.data.totalPage, mypage)
          });
        }
      })
    })
  })