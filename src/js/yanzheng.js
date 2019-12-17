$('#login').validate({
    rules: {
        username: 'required',
        password: {
            required: true,
            minlength: 5,
            
        }
    },
    messages: {
        uesrname: '账户名和密码不匹配，请重新输入',
        password: {
            required: '请输入账号',
            minlength: '请输入密码'
        }
    },
    submitHandler: function (form) {
        $.post('../php/login.php', $(form).serialize(), function(res) {
            console.log(res);
            if (res.code === 1) {
                window.location.href = '../pages/login_shoye.html';
            } else {
                alert('用户名或者密码错误');
            }
        }, 'json')
    }
})