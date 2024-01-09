import { db } from '../../models/index.js';
import { Sequelize } from 'sequelize';
import List from '../../models/lists.js';
//https://blog.jh8459.com/2022-02-15-TIL/
const op = Sequelize.Op;

const { Card, Comment } = db;

export class CardRepository {
    // constructor(card) {
    //     // 클래스의 인스턴스가 생성 될 때 외부에서 card 받을 수 있게 해줌
    //     this.card = card; // card 매개변수를 클래스의 속성으로 설정함
    // }

    //카드 상세 조회
    //title, description null 로 추가, 코멘트 값 null로 추가, 작업자 변경 가능,
    findCardDetail = async () => {
        try {
            const cardId = req.params.cardId;

            const card = await Card.findOne({
                where: { id: cardId },
                include: [{ model: List }, { model: Comment, as: 'comments' }],
            }); // 코멘츠는 카드 모델에서 코멘트 모델 가져오는 관계 이름임

            if (!card) {
                return res
                    .status(404)
                    .json({ message: '카드를 찾을 수 없어유' });
            }
            return res.status(200).json({ data: card });
        } catch (err) {
            next(err);
        }
    };

    //     //카드 액티비티 조회
    //     findActivityByCard = async (req, res, next) => {
    //         try {
    //             const card = await this.cardService.findActivityByCard();
    //             return res.status(200).json({ data: card });
    //         } catch (err) {
    //             next(err);
    //         }
    //     };

    //     //카드 액티비티에 comment 조회
    //     getCommentByCard = async (req, res, next) => {
    //         try {
    //             const card = await this.cardService.getCommentByCard();
    //             return res.status(200).json({ data: card });
    //         } catch (err) {
    //             next(err);
    //         }
    //     };

    //     //카드 생성 (생성할 때는 타이틀만..)
    //     createCard = async ({ userId, listId, title }) => {
    //         const data = await card.create({ userId, listId, title });
    //         return data;
    //     };

    //     //카드 수정 & 카드 상세
    //     updateCard = async ({ id, userId, listId, title, description }) => {
    //         const data = await card.create(
    //             {
    //                 id,
    //                 userId,
    //                 listId,
    //                 title,
    //                 description,
    //             },
    //             { where: { id: id } },
    //         );
    //     };

    //     //카드 이동
    //     moveCard = async (req, res, next) => {
    //         try {
    //             const card = await this.cardService.moveCard();
    //             return res.status(200).json({ data: card });
    //         } catch (err) {
    //             next(err);
    //         }
    //     };

    //     //카드 삭제
    //     deleteCard = async (req, res, next) => {
    //         try {
    //             const card = await this.cardService.deleteCard();
    //             return res.status(200).json({ data: card });
    //         } catch (err) {
    //             next(err);
    //         }
    //     };
    // }
}
// 카드 수정
//     * 카드 이름
//     * 카드 설명
//     * 카드 색상
//     * 작업자 할당????????
//     * 작업자 변경????????
