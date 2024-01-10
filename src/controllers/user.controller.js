import { UserService } from '../services/user.service.js';

export class UsersController {
    userService = new UserService();

    //유저정보조회
    readMyInfo = async (req, res, next) => {
        try {
            const email = req.user.email;

            const result = await this.userService.getUserById(email);

            return res.status(200).json(result);
        } catch (err) {
            console.log(err);
            next(err);
        }
    };

    //유저정보수정
    updateUserInfo = async (req, res, next) => {
        try {
            // session에서 email를 받아와야 함
            const id = req.user.email;
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

    //유저삭제
    deleteMyId = async (req, res, next) => {
        try {
            // session에서 email를 받아와야 함
            const id = req.user.email;
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
