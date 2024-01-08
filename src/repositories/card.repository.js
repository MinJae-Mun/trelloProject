import { cardRepository } from '../repositories/card.repository.js';

export class CardRepository {
    constructor(card) {
        // 클래스의 인스턴스가 생성 될 때 외부에서 card 받을 수 있게 해줌
        this.card = card; // card 매개변수를 클래스의 속성으로 설정함
    }

    //카드 상세 조회
    findCardDetail = async (req, res, next) => {
        try {
            const card = await this.cardService.findCardDetail();
            return res.status(200).json({ data: card });
        } catch (err) {
            next(err);
        }
    };

    //카드 액티비티 조회
    findActivityByCard = async (req, res, next) => {
        try {
            const card = await this.cardService.findActivityByCard();
            return res.status(200).json({ data: card });
        } catch (err) {
            next(err);
        }
    };

    //카드 액티비티에 comment 조회
    getCommentByCard = async (req, res, next) => {
        try {
            const card = await this.cardService.getCommentByCard();
            return res.status(200).json({ data: card });
        } catch (err) {
            next(err);
        }
    };

    //카드 생성 (생성할 때는 타이틀만..)
    createCard = async ({ userId, listId, title }) => {
        const data = await card.create({ userId, listId, title });
        return data;
    };

    //카드 수정 & 카드 상세
    updateCard = async ({ id, userId, listId, title, description }) => {
        const data = await card.create(
            {
                id,
                userId,
                listId,
                title,
                description,
            },
            { where: { id: id } },
        );
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
//     * 작업자 할당????????
//     * 작업자 변경????????
