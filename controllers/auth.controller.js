const { loginService, registerService } = require("../services/auth.service");

const ErrorService = require("../services/error.service");
const MessageService = require("../services/message.service");

module.exports.login = async (req, res) => {
    try {
        const userInfo = {
            username: req.body.username,
            password: req.body.password,
        };
        const signIn = await loginService(userInfo);
        return MessageService(res, signIn);
    } catch (error) {
        console.log(error);
        return ErrorService(res, { message: error.message });
    }
};

module.exports.register = async (req, res) => {
    try {
        const userInfo = {
            username: req.body.username,
            password: req.body.password,
            typeid: req.body.typeid,
        };

        const signUp = await registerService(userInfo);
        return MessageService(res, signUp);
    } catch (error) {
        console.log(error);
        return ErrorService(res, { message: error.message });
    }
};