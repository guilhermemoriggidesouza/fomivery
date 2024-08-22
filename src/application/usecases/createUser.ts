import User from "~/domain/user"
import { inject } from "~/infra/di"
import UserRepository from "~/infra/repositories/user.imp"

export type inputDTO = {
    email: string,
    password: string
    name: string
}
export type outputDTO = {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export default class LoginUseCase {
    @inject("userRepository")
    userRepository!: UserRepository

    async execute(input: inputDTO) {
        const user = User.createUserWithHashedPass(input.email, input.password, input.name)
        const userCreated = await this.userRepository.create(user)
        return userCreated
    }
}