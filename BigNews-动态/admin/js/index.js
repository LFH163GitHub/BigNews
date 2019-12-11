//获取用户信息
$(function () {
    $.ajax({
        url: 'http://localhost:8080/api/v1/admin/user/info',
        type: 'get',
        success: function (res) {
            $('.user_info img').attr('src', res.data.userPic);
            $('.user_info span').html('欢迎&nbsp;&nbsp;' + res.data.nickname)
            $('.user_center_link>img').attr('src', res.data.userPic);
        }
    })
})
//点击退出处理
$('.logout').on('click', function () {
    window.localStorage.removeItem('token');
    window.location.href = './login.html'
})

$('div.level01').on('click',function(){
    $(this).addClass('active').siblings().removeClass('active')
    if($(this).index()==1){
        $('ul.level02').slideToggle()
        $('ul.level02 li:eq(0) a')[0].click()
        $(this).find('b').toggleClass('rotate0')
    }else{
        $('ul.level02').slideUp()
    }
})
 
$('ul.level02 li').on('click',function(){
    $(this).addClass('active').siblings().removeClass('active')
})