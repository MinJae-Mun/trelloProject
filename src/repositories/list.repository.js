import { db } from '../../models/index.js';

const { List } = db;
export class ListsRepository {
  // 리스트 생성
  createList = async (boardId, listName) => {
    let num = 5;
    const existingLists = await db.List.findAll({
      where: {boardId}
    });
    console.log('보드아이디 확인', existingLists)
    if(existingLists) {
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
  getAllLists = async () => {
    const allLists = await db.List.findAll({
      attributes: ['listName'],
      order: [['listOrder','DESC']] // listOrder로 
    });
    return allLists;
  }

  // static async getListById(listId) {
  //   return db.List.findByPk(listId);
  // }


  // 리스트 수정(listId 찾기)
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
      {where: {
        listId: +listId,
      }},
    );

    return list;
  }

  // 리스트 삭제
  deleteList = async (listId) => {
    const list = await db.List.destroy({ where: { listId: +listId } })

    return list;
  }
}
