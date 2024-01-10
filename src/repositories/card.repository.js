import { db } from '../../models/index.js';
import { Sequelize } from 'sequelize';
//https://blog.jh8459.com/2022-02-15-TIL/
const op = Sequelize.Op;

const { Card, Comment } = db;

export class CardRepository {
    //카드 상세 조회
    //title, description null 로 추가, 코멘트 값 null로 추가, 현재 작업자 조회
    findCardDetail = async () => {
        try {
            const cardId = req.params.cardId;

            const card = await Card.findOne({
                where: { id: cardId },
                attributes: ['title', 'description'],
                include: [{ model: Comment, as: 'comments', required: false }],
            }); //as:코멘츠 관계 별칭 /required: false 코멘트 없어도 결과 나오게
            //필요시 코멘트 attributes: ['description'] 추가?
            return card;
        } catch (err) {
            throw err;
        }
    };

    //카드 생성 (생성할 때는 타이틀만..)
    createCard = async (bmId, boardId, listId, title) => {
        const createCard = await Card.create({ bmId, boardId, listId, title });
        return createCard;
    };

    //카드 수정 & 카드 상세
    updateCard = async (cardId, updateFields, roleId = null) => {
        // 업데이트할 데이터 객체를 생성합니다.
        const updateData = { ...updateFields };
        if (roleId !== null) {
            updateData.roleId = roleId; // 작업자 할당 또는 변경
        }

        // Card 모델을 사용하여 카드 정보를 업데이트합니다.
        const [updateCount] = await Card.update(updateData, {
            where: { id: cardId },
        });

        // 업데이트된 카드의 수를 확인합니다.
        if (updateCount === 0) {
            throw new Error('카드를 업데이트할 수 없습니다.');
        }

        // 업데이트된 카드 정보를 다시 조회합니다.
        const updatedCard = await this.findCardDetail(cardId);
        return updatedCard;
    };

    //카드 이동
    moveCard = async (req, res, next) => {
        try {
            const card = await this.cardService.moveCard();
            return res.status(200).json({ data: card });
        } catch (err) {
            next(err);
        }
    };

    //카드 삭제
    deleteCard = async (req, res, next) => {
        try {
            const card = await this.cardService.deleteCard();
            return res.status(200).json({ data: card });
        } catch (err) {
            next(err);
        }
    };
}
// 카드 수정
//     * 카드 이름
//     * 카드 설명
//     * 카드 색상
