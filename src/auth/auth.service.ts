import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./dto/user";
import * as argon from "argon2";

@Injectable({})
export class AuthService {

    constructor (
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async signin(user: User) {
        
        return await this.usersRepository.findOneBy({
            userName: user.userName,
            password: user.password
        });
    }

    async signup(user: User) {

        // generate password
        const hash = await argon.hash(user.password);

        // save username password
        return await this.usersRepository.create({
            userName: user.userName,
            password: hash
        });
    }

    async getUser(id: number): Promise<User> {
        return await this.usersRepository.findOneBy({ id });
    }

}