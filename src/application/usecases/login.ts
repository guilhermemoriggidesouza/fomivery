import { inject } from "~/infra/di"
import UserRepository from "~/infra/repositories/user.imp"
export type inputDTO = {
    email: string,
    password: string
}
export type outputDTO = {
    id: string,
    sessionCreatedAt: Date
}

export default class LoginUseCase {
    @inject("userRepository")
    userRepository!: UserRepository

    async execute(input: inputDTO): Promise<outputDTO> {
        const user = await this.userRepository.findByEmail(input.email)
        if (!user) throw new Error("Não foi possível achar um usuário com esse email")
        if (!user.verifyPass(input.password)) {
            throw new Error("Senha errada")
        }
        return {
            id: user.id,
            sessionCreatedAt: new Date()
        }
    }
}