import { CardService } from '../services/card.service.js';

export class CardController {
    cardService = new CardService();

    //카드 상세 조회
    findCardDetail = async (req, res, next) => {
        try {
            const { cardId } = req.params;
            const userId = req.user.id;

            // 먼저 해당 카드가 있는지 확인
            const card = await this.cardService.findCardDetail(cardId);
            if (!card) {
                return res
                    .status(404)
                    .json({ message: '카드를 찾을 수 없습니다.' });
            }
            // 보드 멤버 여부 확인
            // const isBoardMember = await this.boardService.isMember(
            //     userId,
            //     card.bmId,
            // );
            // if (!isBoardMember) {
            //     return res
            //         .status(403)
            //         .json({ message: '보드 멤버가 아닙니다.' });
            // }

            // // 카드가 속한 리스트와 보드가 사용자와 관련이 있는지 확인
            // if (card.boardId !== BoardId || card.listId !== ListId) {
            //     return res
            //         .status(403)
            //         .json({ message: '접근 권한이 없습니다.' });
            // }

            return res.status(200).json({ data: card });
        } catch (err) {
            // 에러 처리 로직
            next(err);
        }
    };

    //카드 생성
    createCard = async (req, res, next) => {
        try {
            const { listId } = req.params;
            const { title } = req.body;

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

    updateCard = async (req, res, next) => {
        try {
            const { cardId } = req.params;
            const { title, description, role } = req.body;

            //양 끝 공백들 제거하는 메서드, 여러개의 공백만 있는 문자열 입력하는 것 막아줌
            if (title == null || title.trim() === '') {
                return res.status(400).json({
                    ok: false,
                    message: '타이틀만은 뭐라도 공백 제외 입력 필수',
                });
            }
            // 서비스 계층의 updateCard 함수를 호출합니다.
            const updatedCard = await this.cardService.updateCard(
                cardId,
                title,
                description,
                role,
            );

            // 업데이트된 카드 정보를 반환합니다.
            return res.status(200).json({ data: updatedCard });
        } catch (err) {
            next(err); // 에러 핸들링을 위한 next 호출
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
        const { cardId } = req.params;
        try {
            if (!cardId)
                res.status(404).json({
                    message: '카드가 존재하지 않습니다.',
                });

            const deletedCard = await this.cardService.deleteCard(cardId);

            res.status(200).json({
                message: '카드 삭제 성공',
                data: deletedCard,
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
}
