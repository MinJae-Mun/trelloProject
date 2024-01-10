import express from 'express';
import { UsersController } from '../controllers/user.controller.js';
import { isAuth } from '../../middlewares/authMiddleware.js';

const router = express.Router();

const usersController = new UsersController();

router.get('/users/me', isAuth, usersController.readMyInfo); // 내 정보 조회
router.patch('/users/me', isAuth, usersController.updateUserInfo); //내 정보 수정
router.delete('/users/me', isAuth, usersController.deleteMyId); //회원탈퇴

export { router as UserRouter };
