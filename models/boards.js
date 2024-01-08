import { Model, DataTypes } from 'sequelize';

export default class Board extends Model {
    // 해당 모델의 정보를 초기화 하는 정적 메서드
    static init(sequelize) {
        return super.init(
            {
                boardId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },
                title: {
                    type: DataTypes.STRING(255),
                    allowNull: false,
                },
            },
            {
                // 테이블에 추가적인 설정
                sequelize,
                timestamps: true,
                underscored: false,
                modelName: 'Board',
                tableName: 'boards',
                paranoid: true,
                charset: 'utf8',
                collate: 'utf8_general_ci',
            },
        );
    }

    // 해당 모델의 관계를 정의하는 정적 메서드
    static associate(db) {
        db.Board.hasMany(db.BoardMember, {
            as: 'boards',
            foreignKey: 'boardId',
            sourceKey: 'boardId',
        });
        db.Board.hasMany(db.List, {
            as: 'lists',
            foreignKey: 'boardId',
            sourceKey: 'boardId',
        });
    }
}
