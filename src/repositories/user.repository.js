import { db } from '../../models/index.js';
const { User } = db;
export class UsersRepository {
    createUser = async (hashCreateAuthData) => {
        const result = await db.User.create({
            ...hashCreateAuthData,
        });
        return result;
    };
    readOneByUserId = async (email) => {
        const user = await db.User.findOne({
            where: {
                email,
            },
        });
        return user;
    };
}
