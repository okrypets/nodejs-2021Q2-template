import { Post, Controller, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from '../guard/auth.guard';
import { getHashPassword } from "../helpers/hashHelpers";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import envData from "../common/config";
import { LoginService } from './login.service';

@Controller('/login')
@UseGuards(AuthGuard)
export class LoginController {
    constructor(private readonly loginService: LoginService) {}
    @Post('/')
    async login(@Req() req: Request, @Res() res: Response): Promise<void> {
        const { login, password } = req.body;
        const user = await this.loginService.getUserByLogin(login);
        console.log("LoginController", user)
        const bodyPasswordHash = await getHashPassword(password);
        if (user) {
            bcrypt.compare(password, bodyPasswordHash, (_err, matches) => {
                if (matches) {
                    const token = jwt.sign({ id: user.id, login }, envData.JWT_SECRET_KEY as string, { expiresIn: 60 * 60 * 24 });
                    res.json({token: token
                    });
                } else {
                    res.status(502).send({ error: "Passwords do not match." })
                }
            });
        } else {
            res.status(404).send({ error: "No such User in DB." })
        }
    }
}