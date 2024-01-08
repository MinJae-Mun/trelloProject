import { Model, DataTypes } from 'sequelize';

export default class BoardMember extends Model {
    // 해당 모델의 정보를 초기화 하는 정적 메서드
    static init(sequelize) {
        return super.init(
            {
                bmId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true,
                },
                userId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                boardId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
            },
            {
                // 테이블에 추가적인 설정
                sequelize,
                timestamps: true,
                underscored: false,
                modelName: 'BoardMember',
                tableName: 'board_members',
                paranoid: true,
                charset: 'utf8',
                collate: 'utf8_general_ci',
            },
        );
    }

    // 해당 모델의 관계를 정의하는 정적 메서드
    static associate(db) {
        db.BoardMember.belongsTo(db.User, {
            foreignKey: 'userId',
            targetKey: 'userId',
        });
        db.BoardMember.belongsTo(db.Board, {
            foreignKey: 'boardId',
            targetKey: 'boardId',
        });
    }
}
