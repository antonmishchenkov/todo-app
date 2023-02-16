import userService from "../services/userService.js";
import {validationResult} from "express-validator";
import ApiError from "../exceptions/apiError.js";

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(
                  ApiError.BadRequest("Ошибка при валидации", errors.array())
                );
            }
            const { email, password, username } = req.body;

            const userData = await userService.registration(email, password, username);
            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            });

            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const {emailOrUsername, password} = req.body;

            const userData = await userService.login(emailOrUsername, password);
            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            });

            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;

            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');

            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.query.refreshToken ? req.query : req.cookies;

            const userData = await userService.refresh(refreshToken);
            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            });

            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
}

export default new UserController();
