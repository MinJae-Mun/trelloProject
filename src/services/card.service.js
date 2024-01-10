import Card from '../../models/cards.js';
import { CardRepository } from '../repositories/card.repository.js';

export class CardService {
    cardRepository = new CardRepository();

    //카드 상세 조회
    findCardDetail = async (cardId) => {
        try {
            // 레포지토리에서 특정 카드의 상세 정보를 가져옵니다.
            const card = await this.cardRepository.findCardDetail(cardId);

            if (!card) throw new Error(' 카드가 없어요 ');

            return {
                id: card.id,
                // title,description 이 null이면 빈 값 할당
                title: card.title || '',
                description: card.description || '',
                comments: card.comments,
            };
        } catch (err) {
            console.error(err);
            throw new Error(
                '카드 세부 정보를 검색하는 동안 오류가 발생했습니다.',
            );
        }
    };

    //카드 생성(타이틀만 입력하면 생성)
    createCard = async (bmId, boardId, listId, title) => {
        const createCard = await Card.create({
            bmId,
            boardId,
            listId,
            title,
            roleId: null, //작업자 아이디 null 값으로 생성
        });
        return createCard;
    };

    //카드 수정 & 카드 상세 => 작업자 할당, 작업자 변경
    updateCard = async (cardId, updateFields) => {
        await Card.update(updateFields, { where: { id: cardId } });
    };

    //카드 이동
    moveCard = async () => {};

    //카드 삭제
    deleteCard = async () => {};
}

// 카드 수정
//     * 카드 이름
//     * 카드 설명
//     * 카드 색상
