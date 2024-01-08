import { db } from '../../models/index.js';

const { List } = db;
export class ListsRepository {
    // 리스트 생성
    static async createList(boardId) {
        return db.List.create({ boardId });
      }
    
      static async getAllLists() {
        return db.List.findAll();
      }
    
      static async getListById(listId) {
        return db.List.findByPk(listId);
      }
    
      static async updateListName(listId, newName) {
        const list = await db.List.findByPk(listId);
        if (list) {
          return db.List.update({ name: newName });
        }
        return null;
      }
    
      static async deleteList(listId) {
        return db.List.destroy({ where: { listId } });
      }
  }
  