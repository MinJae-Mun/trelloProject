import { ListsService } from "../services/list.service.js";
export class ListsController {
  ListsService = new ListsService();

  // 리스트 생성
  createList = async (req, res) => {
    // const { boardId } = req.params;
    const boardId = 1; // 임의로 boardId 집어넣기
    const { listName } = req.body;
    try {
      console.log('보드 아이디 확인: ',boardId)
      if (!boardId) res.status(404).json({ message: '존재하지 않는 보드입니다.' });

      const newList = await this.ListsService.createList(boardId, listName);

      return res.status(201).json({
        message: '리스트가 생성 되었습니다.',
        newList
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // 리스트 조회
  getAllLists = async (req, res) => {
    try {
      const allLists = await this.ListsService.getAllLists();
      return res.status(200).json({
        message: '리스트 조회 성공',
        data: allLists,
      });

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

  // 리스트 수정
  updateListName = async (req, res) => {
    try {
      const { listId } = req.params;
      const { listName } = req.body;

      if (!listId) res.status(404).json({ message: '리스트가 존재하지 않습니다.' });

      if (!listName) res.status(404).json({ message: '수정 할 이름을 입력해주세요.' });

      const updatedList = await this.ListsService.updateListName(listId, listName);
      if (updatedList) {
        res.status(200).json({
          message: '리스트가 수정되었습니다.',
          data: updatedList
        });

      } else {
        res.status(404).json({ message: '리스트를 찾지 못했습니다.' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // 리스트 삭제
  deleteList = async (req, res) => {
    const { listId } = req.params;
    try {
      if (!listId) res.status(404).json({ message: '리스트가 존재하지 않습니다.' });

      const deletedList = await this.ListsService.deleteList(listId);

      res.status(200).json({
        message: '리스트 삭제 성공',
        data: deletedList,
      })
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}