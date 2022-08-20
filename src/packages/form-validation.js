function handleBlur(e) {
    const username = document.getElementById('text');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const age = document.getElementById('age');
    if (username != null) {
        const usernameValue = username.value.trim();
        // 验证用户名
        if (usernameValue === '') {
            printError(username, '请输入用户名');
        } else {
            removeError(username);
        }
    }
    if (email != null) {
        const emailValue = email.value.trim();
        // 验证邮箱
        if (emailValue === '') {
            printError(email, '请输入邮箱');
        } else if (!validateEmail(emailValue)) {
            printError(email, '邮箱格式有误');
        } else {
            removeError(email);
        }
    }
    if (password != null) {
        const passwordValue = password.value.trim();
        // 验证密码
        if (passwordValue === '') {
            printError(password, '请输入密码');
        } else {
            removeError(password);
        }
    }
    if (age != null) {
        const ageValue = age.value.trim();
        // 验证密码
        if (ageValue === '') {
            printError(age, '年龄不能为空');
        } else {
            removeError(age);
        }
    }


    // 打印错误提示
    function printError(input, message) {
        const formControl = input.parentElement.parentElement;
        const errorMessage = formControl.querySelector('.error-message');
        formControl.classList.add('error');
        errorMessage.textContent = message;
    }

    // 删除错误提示（用户输入正确信息）
    function removeError(input) {
        const formControl = input.parentElement.parentElement;
        const errorMessage = formControl.querySelector('.error-message');
        errorMessage.textContent = '';
        formControl.classList.remove('error');
    }

    // 验证邮箱格式
    function validateEmail(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }
}




export {
    handleBlur
}