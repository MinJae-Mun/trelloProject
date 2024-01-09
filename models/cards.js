import { Model, DataTypes } from 'sequelize';

export default class Card extends Model {
    // 해당 모델의 정보를 초기화 하는 정적 메서드
    static init(sequelize) {
        return super.init(
            {
                cardId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },
                listId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                title: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                description: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                cardOrder: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
            },
            {
                // 테이블에 추가적인 설정
                sequelize,
                timestamps: true,
                underscored: false,
                modelName: 'Card',
                tableName: 'cards',
                paranoid: true,
                charset: 'utf8',
                collate: 'utf8_general_ci',
            },
        );
    }

    // 해당 모델의 관계를 정의하는 정적 메서드
    static associate(db) {
        db.Card.belongsTo(db.List, {
            foreignKey: 'listId',
            targetKey: 'listId',
        });
        db.Card.hasMany(db.Comment, {
            as: 'comments',
            foreignKey: 'cardId',
            sourceKey: 'cardId',
        });
    }
}
