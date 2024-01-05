import { Model, DataTypes } from 'sequelize';

export default class User extends Model {
    // 해당 모델의 정보를 초기화 하는 정적 메서드
    static init(sequelize) {
        return super.init(
            {
                userId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },
                email: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                    unique: true,
                },
                password: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                name: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
            },
            {
                // 테이블에 추가적인 설정
                sequelize,
                timestamps: true,
                underscored: false,
                modelName: 'User',
                tableName: 'users',
                paranoid: true,
                charset: 'utf8',
                collate: 'utf8_general_ci',
            },
        );
    }

    // 해당 모델의 관계를 정의하는 정적 메서드
    static associate(db) {
        db.User.hasMany(db.BoardMember, {
            as: 'boardMambers',
            foreignKey: 'userId',
            sourceKey: 'userId',
        });
        db.User.hasMany(db.Comment, {
            as: 'comments',
            foreignKey: 'userId',
            sourceKey: 'userId',
        });
    }
}
