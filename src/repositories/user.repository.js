import { db } from '../../models/index.js';

const { User } = db;

export class UsersRepository {
    readOneById = async (userId) => {
        const user = await db.User.findOne({
            where: {
                userId,
            },
        });
        return user;
    };

    updateOneById = async (userId, data) => {
        const user = await this.readOneById(userId);

        const result = await User.update(
            {
                ...data,
            },
            {
                where: {
                    userId,
                },
            },
        );

        return result;
    };

    deleteOneById = async (userId) => {
        const result = await db.User.destroy({
            where: {
                userId,
            },
        });

        return result;
    };

    createUser = async (hashCreateAuthData) => {
        const result = await db.User.create({
            ...hashCreateAuthData,
        });
        return result;
    };

    readOneByEmail = async (email) => {
        const user = await db.User.findOne({
            where: {
                email,
            },
        });
        return user;
    };
}
