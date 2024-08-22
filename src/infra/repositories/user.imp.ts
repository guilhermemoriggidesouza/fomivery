import UserRepository from "~/application/repositories/user";
import User from "~/domain/user";
import { db } from "~/server/db";

export default class UserRepositoryImp implements UserRepository {
    async create(user: User): Promise<boolean> {
        let inserted = false
        const userDb = await db.user.create({
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password
            }
        })
        if (userDb) inserted = true
        return inserted
    }

    async findByEmail(email: string) {
        const user = await db.user.findFirst({ where: { email } })
        if (user) {
            const userDomain = new User(user.id, user.email, user.name, user.password)
            return userDomain
        }
    }
}