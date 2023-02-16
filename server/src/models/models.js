import sequelize from "../../db.js";
import { DataTypes } from "sequelize";

export const User = sequelize.define("users", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING },
    roleId: {type: DataTypes.STRING },
});

export const Token = sequelize.define("tokens", {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    refreshToken: { type: DataTypes.TEXT, allowNull: false },
});

export const Tasks = sequelize.define("tasks", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    text: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    wasUpdated: { type: DataTypes.BOOLEAN, defaultValue: false },
})

User.hasOne(Token);
Token.belongsTo(User);


