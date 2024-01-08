//레파지토리 불러오기
import { UsersRepository } from '../repositories/user.repository.js';
//클라스 이용해서 내보내기
export class UsersService {
    usersRepository = new UsersRepository();

    getUserById = async (userId) => {
        // 1. 인수로 로그인 세션을 받으면
        return await this.usersRepository.readOneById(userId); // 2. 세션에 저장되어있는 userId를 매개변수로 전달
    };

    updateUserById = async (userId, body) => {
        return await this.usersRepository.updateOneById(userId, body);
    };

    deleteUserById = async (userId) => {
        return await this.usersRepository.deleteOneById(userId);
    };
}
