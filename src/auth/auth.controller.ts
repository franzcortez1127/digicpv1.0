import { Controller, Post, Get, Body, Param } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "./dto/user";


@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/signin')
    signin(@Body() user: User) {
        return this.authService.signin(user);
    }

    @Post('/signup')
    signup(@Body() user: User) {
        return this.authService.signup(user);
    }

    @Get('/user')
    getUser(): Promise<User> {
        return this.authService.getUser(1);
    }

}