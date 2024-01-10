import { db } from '../../models/index.js';

const { User } = db;

export class UsersRepository {
    readOneById = async (email) => {
        const user = await db.User.findOne({
            where: {
                email,
            },
            include: [
                {
                    model: db.BoardMember,
                },
            ],
        });
        return user;
    };

    updateOneById = async (email, data) => {
        const user = await this.readOneById(email);

        const result = await User.update(
            {
                ...data,
            },
            {
                where: {
                    email,
                },
            },
        );

        return result;
    };

    deleteOneById = async (email) => {
        const result = await db.User.destroy({
            where: {
                email,
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

    readOneByUserId = async (email) => {
        const user = await db.User.findOne({
            where: {
                email,
            },
        });
        return user;
    };
}
