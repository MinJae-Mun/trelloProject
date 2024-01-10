import { UsersRepository } from '../repositories/user.repository.js';

export class UserService {
    userRepository = new UsersRepository();

    getUserById = async (userId) => {
        const user = await this.userRepository.readOneById(userId);

        return {
            ok: true,
            message: '사용자 정보를 조회하셨습니다.',
            data: user,
        };
    };

    updateUserById = async (userId, body) => {
        return await this.userRepository.updateOneById(userId, body);
    };

    deleteUserById = async (userId) => {
        return await this.userRepository.deleteOneById(userId);
    };
}
