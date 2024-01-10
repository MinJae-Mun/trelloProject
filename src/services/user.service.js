import { UsersRepository } from '../repositories/user.repository.js';

export class UserService {
    userRepository = new UsersRepository();

    getUserById = async (email) => {
        const user = await this.userRepository.readOneByUserId(email);

        return {
            ok: true,
            message: '예약을 조회하셨습니다.',
            data: user,
        };
    };

    updateUserById = async (email, body) => {
        return await this.usersRepository.updateOneById(email, body);
    };

    deleteUserById = async (email) => {
        return await this.usersRepository.deleteOneById(email);
    };
}
