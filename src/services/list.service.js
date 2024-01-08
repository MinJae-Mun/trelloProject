import { ListsRepository } from "../repositories/list.repository.js"


export class ListsService {
    petsRepository = new ListsRepository();

    // 리스트 생성
    createList = async (boardId, listName) => {
      const newList = await this.ListsRepository.createList(
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
        return ListsRepository.getAllLists();
      }
    
      static async getListById(listId) {
        return ListsRepository.getListById(listId);
      }
    
      static async updateListName(listId, newName) {
        return ListsRepository.updateListName(listId, newName);
      }
    
      static async deleteList(listId) {
        return ListsRepository.deleteList(listId);
      }

}