import { CardService } from '../services/card.service.js';

export class CardController {
    cardService = new CardService();

    //카드 상세 조회
    findCardDetail = async (req, res, next) => {
        try {
            const { cardId } = req.params;

            const card = await this.cardService.findCardDetail(cardId);

            return res.status(200).json({ data: card });
        } catch (err) {
            next(err);
        }
    };

    //카드 생성
    createCard = async (req, res, next) => {
        try {
            const { bmId, boardId, listId, title } = req.body;

            if (!bmId) {
                return res.status(400).json({
                    ok: false,
                    message: '보드 멤버여야 함',
                });
            }
            if (!boardId) {
                return res.status(400).json({
                    ok: false,
                    message: '보드 안에 있어야함',
                });
            }
            if (!listId) {
                return res.status(400).json({
                    ok: false,
                    message: '리스트 안에 있어야함',
                });
            }
            if (!title) {
                return res.status(400).json({
                    ok: false,
                    message: '타이틀만 있으면 되는데 그게 없네',
                });
            }

            const createdCard = await this.cardService.createCard(
                bmId,
                boardId,
                listId,
                title,
            );
            return res.status(200).json({
                ok: true,
                message: '카드 작성 성공',
                data: createdCard,
            });
        } catch (err) {
            next(err);
        }
    };

    /** 카드 수정
     * title 수정,
     * description 값 수정,
     * 코멘트 값 수정,
     * 작업자 할당, 작업자 변경 가능
     * */

    //  작업자 할당: 특정 사용자를 카드의 작업자로 할당합니다.
    //  할당된 작업자 변경: 이미 할당된 작업자를 다른 사용자로 변경합니다.
    updateCard = async (req, res, next) => {
        try {
            const { bmId, boardId, listId, cardId, title, description } =
                req.body;

            if (!title) {
                return res.status(400).json({
                    ok: false,
                    message: '한가지 이상은 변경해야 합니다',
                });
            }

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
