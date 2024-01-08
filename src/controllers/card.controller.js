import { CardService } from '../services/card.service.js';

export class CardController {
    cardService = new CardService();

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

    //카드 생성
    //타이틀 써야 생성 가능
    createCard = async (req, res, next) => {
        try {
            const { title } = req.body;

            const card = await this.cardService.createCard(title);
            return res.status(200).json({ data: card });
        } catch (err) {
            next(err);
        }
    };

    //카드 수정 & 카드 상세
    updateCard = async (req, res, next) => {
        try {
            const { title, description } = req.body;

            const card = await this.cardService.createCard(title, description);
            return res.status(200).json({ data: card });
        } catch (err) {
            next(err);
        }
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
// 카드 생성
//     * 컬럼 내부에 카드를 생성할 수 있어야 합니다.

// 카드 수정
//     * 카드 이름
//     * 카드 설명
//     * 카드 색상
//     * 작업자 할당????????
//     * 작업자 변경????????
