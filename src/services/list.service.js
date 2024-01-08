import { ListsRepository } from "../repositories/pets.repository.js"


export class ListsService {
    petsRepository = new ListsRepository();

    // 리스트 생성
    static async createList(boardId) {
        return ListsRepository.createList(boardId);
      }
    
      static async getAllLists() {
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