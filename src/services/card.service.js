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
    createCard = async (listId, title, description = null, role = null) => {
        const createCard = await this.cardRepository.createCard({
            listId,
            title,
            description,
            role,
        });
        return createCard;
    };

    //카드 수정
    updateCard = async (cardId, title, description, role) => {
        const card = await this.cardRepository.findCardById(cardId);

        if (!card) throw new Error('리스트가 존재하지 않습니다.');

        // description과 role은 선택이기 때문에, undefined인 경우 null로 처리
        const updateData = {
            title,
            description: description !== undefined ? description : null,
            role: role !== undefined ? role : null,
        };
        //const updatedCard = 이거 안 넣고 리턴 안보내고 하는 경우도 있음 테스트 해보기
        const updatedCard = await this.cardRepository.updateCard(
            cardId,
            updateData,
        );
        return updatedCard;
    };

    //카드 이동
    moveCard = async (boardId, listId, prev, next) => {
//const 

    };

    // 카드 삭제
    deleteCard = async (cardId) => {
        const card = await this.cardRepository.findCardById(cardId);

        if (!card) throw new Error('카드가 존재하지 않습니다.');

        await this.cardRepository.deleteCard(cardId);

        return { deletedCardId: cardId };
    };
}
