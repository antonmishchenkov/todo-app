import bcrypt from "bcrypt";
import { Op } from "sequelize";
import {User} from "../models/models.js";
import tokenService from "./tokenService.js";
import UserDto from "../dtos/userDTO.js";
import ApiError from "../exceptions/apiError.js";

class UserService {
    async registration(email, password, username, roleId = "customer") {
        let candidate = await User.findOne({where: {email: email}});
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с адресом ${email} уже существует`, [{errCode: "400-3"}]);
        }

        candidate = await User.findOne({where: {username: username}});
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с логином ${username} уже существует`, [{errCode: "400-3"}]);
        }

        const hashPassword = await bcrypt.hash(password, 3);

        const user = await User.create({
            email,
            password: hashPassword,
            username,
            roleId
        });

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto};
    }

    async login(emailOrUsername, password) {
        const user = await User.findOne({where: {[Op.or]: [{email: emailOrUsername}, {username: emailOrUsername}]}});
        if (!user) {
            throw ApiError.BadRequest("Пользователь с таким email или логином не найден", [{errCode: "400-1"}]);
        }

        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest("Неверный пароль", [{errCode: "400-2"}]);
        }

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto};
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);

        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }

        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);

        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }

        const user = await User.findOne({where: {id: userData.id}});
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto};
    }
}

export default new UserService();
