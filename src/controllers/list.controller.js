import { ListsService } from "../services/list.service.js";
export class ListsController {
  ListsService = new ListsService();

  // 리스트 생성
  createList = async (req, res) => {
    const { boardId } = req.body;
    try {
      const newList = await ListService.createList(boardId);
      res.status(201).json(newList);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // 리스트 조회
  getAllLists = async (req, res) => {
    try {
      const allLists = await ListService.getAllLists();
      res.status(200).json(allLists);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  //   static async getListById(req, res) {
  //     const { listId } = req.params;
  //     try {
  //       const list = await ListService.getListById(listId);
  //       if (list) {
  //         res.status(200).json(list);
  //       } else {
  //         res.status(404).json({ message: 'List not found' });
  //       }
  //     } catch (error) {
  //       res.status(500).json({ error: error.message });
  //     }
  //   }

  // 리스트 수정 List모델에 name 추가 필요
  updateListName = async (req, res) => {
    try {
      const { listId } = req.params;
      const { newName } = req.body;

      if (!listId) res.status(404).json({ message: '존재하지 않는 리스트입니다.' });

      if (!newName) res.status(404).json({ message: '존재하지 않는 이름입니다.' });

      const updatedList = await this.ListsService.updateListName(listId, newName);
      if (updatedList) {
        res.status(200).json(updatedList);
      } else {
        res.status(404).json({ message: 'List not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  deleteList = async (req, res) => {
    const { listId } = req.params;
    try {
      const deletedList = await ListService.deleteList(listId);
      if (deletedList) {
        res.status(200).json({ message: 'List deleted successfully' });
      } else {
        res.status(404).json({ message: 'List not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}