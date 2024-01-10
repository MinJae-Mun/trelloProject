import { db } from '../../models/index.js';
// import { Sequelize } from 'sequelize';
//https://blog.jh8459.com/2022-02-15-TIL/
// const op = Sequelize.Op;

const { Card, Comment } = db;

export class CardRepository {
    //cardId 값 찾기 id가 존재하는지 확인하려고 사용. 어트리뷰트에 Id 값들 다 추가해야 하나요...
    findCardById = async (cardId) => {
        const card = await db.Card.findOne({
            attributes: ['listId', 'cardId'], // 낙: 여기에 boardId가 들어있었어요, 카드테이블에는 boardId가 없는데 추가 하면 오류가 나요
            where: {
                cardId: +cardId,
            },
        });

        return card;
    };

    //카드 상세 조회
    findCardDetail = async (cardId) => {
        try {
            const card = await Card.findOne({
                where: { cardId }, // 낙: 이렇게 잘못 되어있었어요 {id: cardId}
                attributes: ['title', 'description'],
                include: [{ model: Comment, as: 'comments', required: false }],
            }); //as:코멘츠 관계 별칭 /required: false 코멘트 없어도 결과 나오게 필요시 코멘트 어트리뷰트 추가
            return card;
        } catch (err) {
            throw err;
        }
    };

    //카드 생성 (생성할 때는 타이틀만..)
    createCard = async ({listId, title}) => {
        let num = 5;
        const existingCards = await Card.findAll({
            where: { listId },
        });

        if (existingCards) {
            num += existingCards.length;
        }
        const createCard = await Card.create({
            listId: +listId,
            title,
            cardOrder: num,
        });
        return createCard;
    };

    //카드 수정
    updateCard = async (cardId, updateData) => {
        const [updateCount] = await Card.update(updateData, {
            where: { cardId }, // 낙 : {id: carId} 라고 되어있어서 오류나요
        });

        if (updateCount === 0) {
            throw new Error('카드를 업데이트할 수 없습니다.'); // 이 에러는 레코드가 존재하지 않을 때만 발생
        }

        return await this.findCardDetail(cardId); // 업데이트된 상세 정보를 반환
    };

    // //카드 이동
    // moveCard = async (req, res, next) => {
    //     try {
    //         const card = await this.cardService.moveCard();
    // };

    //카드 삭제
    deleteCard = async (cardId) => {
        const deleteCount = await Card.destroy({
            where: { cardId }, // 낙 : { id: cardId } 이렇게 되어있어서 오류가 나요
        });

        if (deleteCount === 0) {
            throw new Error('삭제할 카드가 존재하지 않습니다.');
        }

        return deleteCount; // 삭제된 카드의 수를 반환
    };
}
