import { UsersRepository } from '../repositories/user.repository.js';

export class UserService {
    userRepository = new UsersRepository();

    getUserById = async (userId) => {
        const user = await this.userRepository.readOneByUserId(userId);

        return {
            ok: true,
            message: '예약을 조회하셨습니다.',
            data: user,
        };
    };

    updateUserById = async (userId, body) => {
        return await this.usersRepository.updateOneById(userId, body);
    };

    deleteUserById = async (userId) => {
        return await this.usersRepository.deleteOneById(userId);
    };
}
