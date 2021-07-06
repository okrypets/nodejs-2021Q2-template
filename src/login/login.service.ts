import { Repository } from 'typeorm';
import { User } from '../entities/User.entity';
import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthGuard } from '../guard/auth.guard';

@Injectable()
@UseGuards(AuthGuard)
export class LoginService {
  constructor(
    @InjectRepository(User)
    private readonly userRepopositary: Repository<User>
    ) {}

  async getUserByLogin(login: string): Promise<User | false> {
    const foundUser = await this.userRepopositary.findOne({ login: login });
    if (foundUser) {
        return foundUser;
    }
    return false;
  }
}