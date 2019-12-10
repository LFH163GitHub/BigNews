//先写一个入口函数
$(function () {
    /* 思路：
    1.点击登陆，给登陆注册事件
    2.点击时获取用户名和密码
    3.判段非空
    4.发送Ajax请求
    5 登陆成功后进行本地储存一个通行证
    6.跳转
    */
    // 给登陆注册事件
    $('.input_sub').on('click', function (e) {
      e.preventDefault();
      // 点击时获取用户名和密码
      let username = $('.input_txt').val().trim();
      let userpwd = $('.input_pass').val().trim();
      // 判段非空
      if (username == '' || userpwd == '') {
        $('.modal-body').text('用户名或用户密码木有填写');
        $('#myModal').modal();
        return;
      }
      // 发送Ajax请求
      $.post('http://localhost:8080/api/v1/admin/user/login', {
        username: username,
        password: userpwd
      }, function (res) {
        $('.modal-body').text(res.msg);
        $('#myModal').modal();
        if (res.code === 200) {
          //登陆成功后进行本地储存
          window.localStorage.setItem('token',res.token)
          // 跳转
          $('#myModal').on('hidden.bs.modal', function (e) {
            window.location.href ='./index.html'
          })
        }
      })
    })
  })