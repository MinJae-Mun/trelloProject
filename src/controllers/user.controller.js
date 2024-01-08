// UsersService 불러오기
import { UsersService } from '../services/user.service.js';

//클라스로 만드는 부분
export class UsersController {
    //인스턴스 생성
    usersService = new UsersService();

    //내정보불러오기 요청과 응답을 해서 다음함수로(app.js에있는) 넘어간다
    readMyInfo = async (req, res, next) => {
        try {
            // session에서 userId를 받아와야 함
            // this. === UsersController.
            //try catch를 통하여 서버종료방지
            //try에서 안되면 catch로 넘겨준다.
            const me = await this.usersService.getUserById(req.user.userId);

            return res.status(200).json({
                ok: true,
                message: '프로필 조회에 성공했습니다.',
                data: me,
            });
        } catch (error) {
            next(error);
        }
    };
    //유저정보수정
    updateUserInfo = async (req, res, next) => {
        try {
            // session에서 userId를 받아와야 함
            const id = req.user.userId;
            //요청한 바디정보
            const body = req.body;
            //유정정보 업데이트하기
            await this.usersService.updateUserById(id, body);

            return res.status(200).json({
                ok: true,
                message: '유저 프로필 수정에 성공했습니다.',
            });
        } catch (error) {
            next(error);
        }
    };
    //내아이디 삭제하기
    deleteMyId = async (req, res, next) => {
        try {
            // session에서 userId를 받아와야 함
            const id = req.user.userId;
            await this.usersService.deleteUserById(id);

            return res.status(200).json({
                ok: true,
                message: '내 프로필 삭제에 성공했습니다.',
            });
        } catch (error) {
            next(error);
        }
    };
}
