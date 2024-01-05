import { db } from '../../models/index.js';

const { User } = db;

export class UsersRepository {
    readOneById = async (id) => {
        const user = await db.User.findOne({
            where: {
                id,
            },
        });
        return user;
    };

    createUser = async (hashCreateAuthData) => {
        const result = await db.User.create({
            ...hashCreateAuthData,
        });
        return result;
    };

    readOneByUserId = async (userId) => {
        const user = await db.User.findOne({
            where: {
                userId,
            },
        });
        return user;
    };
}
