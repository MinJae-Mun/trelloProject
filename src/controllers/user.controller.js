import { UserService } from '../services/user.service.js';

export class UsersController {
    userService = new UserService();

    //유저정보조회
    readMyInfo = async (req, res, next) => {
        try {
            const userId = req.user.userId;

            const result = await this.userService.getUserById(userId);

            return res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    };

    //유저정보수정
    updateUserInfo = async (req, res, next) => {
        try {
            // session에서 email를 받아와야 함
            const userId = req.user.userId;
            //요청한 바디정보
            const body = req.body;
            //유정정보 업데이트하기
            await this.userService.updateUserById(userId, body);

            return res.status(200).json({
                ok: true,
                message: '사용자 정보 수정에 성공했습니다.',
            });
        } catch (error) {
            next(error);
        }
    };

    //유저삭제
    deleteMyId = async (req, res, next) => {
        try {
            // session에서 email를 받아와야 함
            const userId = req.user.userId;
            await this.userService.deleteUserById(userId);

            return res.status(200).json({
                ok: true,
                message: '사용자 정보 삭제에 성공했습니다.',
            });
        } catch (error) {
            next(error);
        }
    };
}
