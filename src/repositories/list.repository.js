import { db } from '../../models/index.js';

const { List, Card } = db;
export class ListsRepository {
  // 리스트 생성
  createList = async (boardId, listName) => {
    let num = 5;

    // 리스트 유무 확인
    const existingLists = await db.List.findAll({
      where: { boardId }
    });
    console.log('타입 확인', typeof existingLists)

    if (existingLists) {
      num += existingLists.length;
    }
    const newList = await db.List.create({
      boardId: +boardId,
      listName,
      listOrder: num,
    },
    );

    return newList;
  };

  // 리스트 조회
  getAllLists = async (boardId) => {
    const allLists = await db.List.findAll({
      attributes: ['listName'],
      order: [['listOrder', 'DESC']], // listOrder로 
      include: [{model: Card, as: 'cards',attributes: ['title'],}],
      where: {
        boardId
      },
    });
    return allLists;
  }

  // static async getListById(listId) {
  //   return db.List.findByPk(listId);
  // }


  // 리스트 수정, 이동(listId 찾기)
  findListById = async (listId) => {
    const list = await db.List.findOne({
      attributes: ['listId'],
      where: {
        listId: +listId,
      },
    });

    return list;
  };

  // 리스트 수정
  updateListName = async (listId, listName) => {
    const list = await db.List.update(
      {
        listName,
      },
      {
        where: {
          listId: +listId,
        }
      },
    );

    return list;
  }

  // 리스트 이동
  moveList = async (boardId, listId, listOrder) => {

    // 현재 보드의 리스트 findAll
    const allLists = await db.List.findAll({
      where: { boardId }
    });

    // 리스트 이동 실행 조건 (map)
    // 리스트가 2개 이상일떄
    if (allLists.length >= 2) {

      //1. 맨 엎으로 이동 할 경우 가장 작은 listOrder의 값에 2로 나누어 수정
      // 가장 작은 리스트의 listOrder 찾기
      const minListOrder = Math.min(...allLists.map(list => list.listOrder));

      listOrder = minListOrder / 2;

      const moveListForefront = await db.List.update(
        {
          listOrder,
        },
        {
          where: {
            listId: +listId,
          }
        }
      )

      return moveListForefront;
    }

  };

  // 리스트 삭제
  deleteList = async (listId) => {
    const list = await db.List.destroy({ where: { listId: +listId } })

    return list;
  }
}
