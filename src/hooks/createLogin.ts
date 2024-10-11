import { z } from "zod"
import { api } from "~/trpc/react"

export const loginSchema = z.object({
    email: z.string({ required_error: "Email está vazio" }).min(1, { message: "Email inválido" }),
    password: z.string({ required_error: "Senha está vazia" }).min(8, { message: "Senha inválida" })
})
export type LoginType = z.infer<typeof loginSchema>

export default function useLogin() {
    const { mutate } = api.auth.login.useMutation()

    const login = async (e: LoginType) => {
        mutate(e)
    }

    return {
        login,
    }
}