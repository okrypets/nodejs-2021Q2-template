import { Repository } from 'typeorm';
import { User } from '../entities/User.entity';
import bcrypt from 'bcrypt';
import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthGuard } from '../guard/auth.guard';
// import { getHashPassword } from "../helpers/hashHelpers";
// import envData from "../common/config";
// import jwt from 'jsonwebtoken';

@Injectable()
@UseGuards(AuthGuard)
export class LoginService {
  constructor(
    @InjectRepository(User)
    private readonly userRepopositary: Repository<User>
    ) {}

    // async validateUser(login: string, password: string): Promise<any> {
    //     const user = await this.userRepopositary.findOne({ login });
    //     if (user && user.password) {
    //         const userPasswordHash = await getHashPassword(user.password);
    //         bcrypt.compare(password, userPasswordHash, (_err, matches) => {
    //             if (matches) {
    //                 const token = jwt.sign({ id: user.id, login }, envData.JWT_SECRET_KEY as string, { expiresIn: 60 * 60 * 24 });
    //                 res.json({token: token
    //                 });
    //             } else {
    //                 res.status(502).send({ error: "Passwords do not match." })
    //             }
    //         });
    //     }
    //     return null;
    //   }

  async getUserByLogin(user: Partial<User>): Promise<User | false> {
    const { login, password } = user;
    const foundUser = await this.userRepopositary.findOne({ login });
    if (
      foundUser &&
      (await bcrypt.compare(String(password), String(foundUser?.password)))
    ) {
      return foundUser;
    }
    return false;
  }
}