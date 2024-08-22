import User from "~/domain/user"

export default interface UserRepository {
    create: (user: User) => Promise<Boolean>
    findByEmail: (email: string) => Promise<User | undefined>
}