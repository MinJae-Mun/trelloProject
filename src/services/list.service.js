import { ListsRepository } from "../repositories/list.repository.js"


export class ListsService {
  listsRepository = new ListsRepository();

  // 리스트 생성
  createList = async (boardId, listName) => { 
    const newList = await this.listsRepository.createList(
      boardId,
      listName,
    );
    return {
      listName: newList.listName,
      createdAt: newList.createdAt,
      updatedAt: newList.updatedAt,
      deletedAt: newList.deletedAt,
    };
  };

  // 리스트 조회
  getAllLists = async () => {
    const allLists = await this.listsRepository.getAllLists();

    return allLists;
  }

  // getListById = async (listId) => {
  //   return listsRepository.getListById(listId);
  // }

  // 리스트 수정
  updateListName = async (listId, listName) => {
    const list = await this.listsRepository.findListById(listId);

    if (!list) throw new Error( '리스트가 존재하지 않습니다.');

    await this.listsRepository.updateListName(listId, listName);

    const updatedList = await this.listsRepository.findListById(listId);

    return {
      listId: updatedList.listId,
      listName: updatedList.listName,
    };
  }

  // 리스트 삭제
  deleteList = async (listId) => {
    const list = await this.listsRepository.findListById(listId);

    if (!list) throw new Error('리스트가 존재하지 않습니다.');

    await this.listsRepository.deleteList(listId);

    return {
      listId: list.listId,
      listName: list.listName,
      listOrder: list.listOrder,
    }
  }

}