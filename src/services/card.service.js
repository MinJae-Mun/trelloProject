import { CardRepository } from '../repositories/card.repository.js';

export class CardService {
    cardRepository = new CardRepository();

    //카드 상세 조회
    findCardDetail = async () => {
        
            const card = await this.cardService.findCardDetail();

            if(!card){
                return false;
            }

            card.sort((a,b)=> {
                return b.createAt-a.createAt;
            })
            return card.map(()).json({ data: card });
        }
    };

    //카드 액티비티 조회
    findActivityByCard = async () => {

    };


    //카드 액티비티에 comment 조회
    getCommentByCard = async () => {

    };


    //카드 생성
    //타이틀 써야 생성 가능
    createCard = async () => {

    };


    //카드 수정 & 카드 상세
    updateCard = async () => {

    };


    //카드 이동
    moveCard = async () => {

    };

    //카드 삭제
    deleteCard = async () => {

    };

// 카드 수정
//     * 카드 이름
//     * 카드 설명
//     * 카드 색상
//     * 작업자 할당????????
//     * 작업자 변경????????
