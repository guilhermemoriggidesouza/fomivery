import bcrypt from 'bcrypt'
import { v4 } from 'uuid'

export default class User {
    constructor(public id: string, public email: string, public name: string, public password: string) {
    }

    static createUserWithHashedPass(email: string, password: string, name: string) {
        const hashPass = bcrypt.hashSync(password, 10)
        const id = v4()
        return new User(id, email, name, hashPass)
    }

    verifyPass(pass: string) {
        return bcrypt.compareSync(pass, this.password)
    }
}