'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Boards extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Users : Boards (1:N)
            this.belongsTo(models.Users, {
                targetKey: 'userId',
                foreignKey: 'UserId',
            });
            // Boards : Lists (1:N)
            this.hasMany(models.Lists, {
                sourceKey: 'boardId',
                foreignKey: 'BoardId',
            });
            // Memberships : Boards (1:N)
            // this.belongsTo(models.Memberships, {
            //   sourceKey: 'boardId',
            //   foreignKey: 'BoardId',
            // });
        }
    }
    Boards.init(
        {
            boardId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            UserId: {
                allowNull: false, // NOT NULL
                type: DataTypes.INTEGER,
            },
            title: {
                allowNull: false, // NOT NULL
                type: DataTypes.STRING,
            },
            desc: {
                allowNull: false, // NOT NULL
                type: DataTypes.STRING,
            },
            createdAt: {
                allowNull: false, // NOT NULL
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                allowNull: false, // NOT NULL
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: 'Boards',
        },
    );
    return Boards;
};
