import { Model, DataTypes } from 'sequelize';

export default class List extends Model {
    // 해당 모델의 정보를 초기화 하는 정적 메서드
    static init(sequelize) {
        return super.init(
            {
                listId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },
                boardId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                listName: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
                listOrder: {
                    type: DataTypes.FLOAT,
                    allowNull: false,
                },
            },
            {
                // 테이블에 추가적인 설정
                sequelize,
                timestamps: true,
                underscored: false,
                modelName: 'List',
                tableName: 'lists',
                paranoid: true,
                charset: 'utf8',
                collate: 'utf8_general_ci',
            },
        );
    }

    // 해당 모델의 관계를 정의하는 정적 메서드
    static associate(db) {
        db.List.belongsTo(db.Board, {
            foreignKey: 'boardId',
            targetKey: 'boardId',
        });
        db.List.hasMany(db.Card, {
            as: 'cards',
            foreignKey: 'listId',
            sourceKey: 'listId',
        });
    }
}
