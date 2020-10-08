"use strict"
const userPage = new UserForm();
userPage.loginFormCallback = data => {
    ApiConnector.login(data, res => {
        if(res.success === true) {
            location.reload();
        } else {
            userPage.setLoginErrorMessage(res.error);
        }
    });
}
userPage.registerFormCallback = data => {
    ApiConnector.register(data, res => {
        if(res.success === true) {
            location.reload();
        } else {
            userPage.setRegisterErrorMessage(res.error);
        }
    });
}