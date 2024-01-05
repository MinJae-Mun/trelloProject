import { Model, DataTypes } from 'sequelize';

export default class Comment extends Model {
    // 해당 모델의 정보를 초기화 하는 정적 메서드
    static init(sequelize) {
        return super.init(
            {
                commentId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },
                userId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                cardId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                description: {
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
        db.Comment.belongsTo(db.User, {
            foreignKey: 'userId',
            targetKey: 'userId',
        });
        db.Comment.belongsTo(db.Card, {
            foreignKey: 'cardId',
            targetKey: 'cardId',
        });
    }
}
