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
  getAllLists = async (boardId) => {
    const allLists = await this.listsRepository.getAllLists(boardId);

    return allLists;
  }

  // getListById = async (listId) => {
  //   return listsRepository.getListById(listId);
  // }

  // 리스트 수정
  updateListName = async (listId, listName) => {
    const list = await this.listsRepository.findListById(listId);

    if (!list) throw new Error('리스트가 존재하지 않습니다.');

    await this.listsRepository.updateListName(listId, listName);

    const updatedList = await this.listsRepository.findListById(listId);

    return {
      listId: updatedList.listId,
      listName: updatedList.listName,
    };
  }

  // 리스트 이동
  moveList = async (boardId, listId, prevListId, nextListId) => {
    const list = await this.listsRepository.moveList(boardId, listId, prevListId, nextListId);

    const currentList = await this.listsRepository.findListById(listId);
    const prevList = await this.listsRepository.findListById(prevListId);
    const nextList = await this.listsRepository.findListById(nextListId);

    if (prevListId && nextListId) {
      const currentListOrder = (prevList.listOrder + nextList.listOrder) / 2
    } else if (prevListId) {
      const prevListOrder = prevList.listOrder + 1;
    } else if (nextListId) {
      const nextListOrder = nextList.listOrder / 2;
    }
    return {
      boardId,
      listId,
      listOrder: list.listOrder,
    }
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