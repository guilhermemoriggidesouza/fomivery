"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Link from "next/link"

const loginSchema = z.object({
    email: z.string({ required_error: "Email está vazio" }).min(1, { message: "Email inválido" }),
    password: z.string({ required_error: "Senha está vazia" }).min(8, { message: "Senha inválida" })
})

export type LoginType = z.infer<typeof loginSchema>
export type LoginProps = { onSubmit: (e: LoginType) => void };

export default function Login({ onSubmit }: LoginProps) {
    const form = useForm<LoginType>({
        resolver: zodResolver(loginSchema),
    })
    return (
        <>
            <div className="bg-slate-200 p-12 h-screen flex justify-center items-center ">
                <div className="bg-white lg:w-1/3 w-full rounded-md">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="p-8">
                            <div className="my-5">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="my-5">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Senha</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Senha" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="w-full flex justify-center">
                                <Button className="mt-3" type="submit">Entrar</Button>
                            </div>
                        </form>
                    </Form>
                    <Link className="w-full block text-center mb-3 underline underline-offset-1" href="recover/pass">Esqueci minha senha</Link>
                </div>
            </div>
        </>
    )
}